import { GoogleGenAI, Type, Schema } from "@google/genai";
import { ForgeConfig, Idea, VerificationResult, Blueprint, Language } from "../types";
import { PROMPT_LANG_MAP } from "../locales";

// Custom Error Class
export class GeminiError extends Error {
  code?: string;
  constructor(message: string, code?: string) {
    super(message);
    this.name = 'GeminiError';
    this.code = code;
  }
}

const getClient = (customApiKey?: string) => {
  // Priority: User's custom key > Environment variable
  const apiKey = customApiKey || process.env.API_KEY;
  if (!apiKey) throw new GeminiError("API_KEY not found. Please provide a key in settings or .env", "NO_API_KEY");
  return new GoogleGenAI({ apiKey });
};

const handleGeminiError = (error: any) => {
  console.error("Gemini API Error:", error);

  const msg = error.message || "";

  // Check for 429
  if (msg.includes("429") || msg.includes("Too Many Requests") || msg.includes("Resource has been exhausted")) {
    throw new GeminiError("High traffic. The AI brain is overheated. Please wait a moment and try again.", "RATE_LIMIT_429");
  }

  // Check for 401
  if (msg.includes("401") || msg.includes("API key not valid")) {
    throw new GeminiError("Invalid API Key. Please check your settings.", "INVALID_KEY_401");
  }

  // Default
  throw new GeminiError("Transformation failed. The connection to the datastream was interrupted.", "UNKNOWN_ERROR");
};


export const generateIdeas = async (config: ForgeConfig, lang: Language, apiKey?: string): Promise<Idea[]> => {
  const ai = getClient(apiKey);
  const langName = PROMPT_LANG_MAP[lang];

  let prompt = "";
  if (config.mode === 'RANDOM') {
    prompt = `You are a chaotic crypto venture architect. Generate ${config.quantity} completely random, wild, and potentially high-growth Web3 project ideas. Mix ecosystems and sectors randomly. The 'degen' level should vary wildly.
    IMPORTANT: Output the content in ${langName} language.`;
  } else {
    prompt = `You are a precision crypto venture architect. Generate ${config.quantity} Web3 project ideas.
    Target Ecosystems: ${config.ecosystems.join(', ')}.
    Target Sectors: ${config.sectors.join(', ')}.
    Risk/Innovation Level (0=Safe, 100=Wild): ${config.degenLevel}.
    
    For high degen levels, focus on meme-mechanics, high-yield, or experimental ponzi-nomics.
    For low degen levels, focus on real-world assets, infrastructure, and institutional grade DeFi.
    
    ${config.userContext ? `ADDITIONAL CONTEXT FROM USER (Prioritize this): ${config.userContext}` : ''}
    
    IMPORTANT: Output the title, description, tagline, and features in ${langName} language.
    `;
  }

  const responseSchema: Schema = {
    type: Type.ARRAY,
    items: {
      type: Type.OBJECT,
      properties: {
        title: { type: Type.STRING },
        tagline: { type: Type.STRING },
        description: { type: Type.STRING },
        ecosystem: { type: Type.STRING },
        sector: { type: Type.STRING },
        degenScore: { type: Type.INTEGER },
        features: {
          type: Type.ARRAY,
          items: { type: Type.STRING }
        }
      },
      required: ["title", "tagline", "description", "ecosystem", "sector", "degenScore", "features"]
    }
  };

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        systemInstruction: `You are an expert Web3 venture builder. You understand DeFi, DePin, GameFi deep mechanics. Be concise, punchy, and technical. Respond in ${langName}.`,
      },
    });

    if (!response.text) return [];

    const rawIdeas = JSON.parse(response.text);

    return rawIdeas.map((idea: any) => ({
      ...idea,
      id: crypto.randomUUID(),
      status: 'GENERATED',
      language: lang
    }));

  } catch (error) {
    handleGeminiError(error);
    throw error;
  }
};

export const verifyIdea = async (idea: Idea, lang: Language, apiKey?: string): Promise<VerificationResult> => {
  const ai = getClient(apiKey);
  const langName = PROMPT_LANG_MAP[lang];

  const prompt = `Research and verify the uniqueness of this Web3 project idea:
  Title: ${idea.title}
  Description: ${idea.description}
  Ecosystem: ${idea.ecosystem}
  
  Search for existing projects with similar names or mechanisms. 
  If similar projects exist, list them.
  If it's unique, confirm it.
  If there is a collision, suggest a pivot.
  
  IMPORTANT: Provide the 'notes' and 'pivotSuggestion' in ${langName}.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
      },
    });

    const text = response.text || "";
    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];

    const isUnique = !text.toLowerCase().includes("similar to") && !text.toLowerCase().includes("collision");

    const similarProjects = groundingChunks
      .map((chunk: any) => {
        if (chunk.web) {
          return { name: chunk.web.title, url: chunk.web.uri };
        }
        return null;
      })
      .filter((item: any) => item !== null);

    return {
      isUnique,
      similarProjects: similarProjects,
      notes: text,
      pivotSuggestion: isUnique ? undefined : "Consider rebranding or adding a privacy layer."
    };

  } catch (error) {
    console.error("Verification Error:", error);
    // Silent fail for verification loops is usually better, but for 429 we might want to alert if it's manual
    // For now, let's just log but NOT throw to avoid interrupting the batch
    return {
      isUnique: true,
      similarProjects: [],
      notes: "Verification unavailable due to network or rate limit."
    };
  }
};

export const generateBlueprint = async (idea: Idea, lang: Language, apiKey?: string): Promise<Blueprint> => {
  const ai = getClient(apiKey);
  const langName = PROMPT_LANG_MAP[lang];

  const prompt = `Create a comprehensive technical whitepaper blueprint for the following Web3 project:
  Title: ${idea.title}
  Tagline: ${idea.tagline}
  Description: ${idea.description}
  Sector: ${idea.sector}
  Chain: ${idea.ecosystem}
  
  Include:
  1. Executive Summary
  2. Tokenomics (Allocations, Vesting, Utility)
  3. Roadmap (Phases 1-4)
  4. Technical Architecture (Contracts, Frontend, Indexing)
  
  IMPORTANT: Output ALL content in ${langName} language.
  `;

  const responseSchema: Schema = {
    type: Type.OBJECT,
    properties: {
      overview: { type: Type.STRING },
      tokenomics: { type: Type.STRING },
      roadmap: { type: Type.STRING },
      technicalArchitecture: { type: Type.STRING },
    },
    required: ["overview", "tokenomics", "roadmap", "technicalArchitecture"]
  };

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema
      }
    });

    if (!response.text) throw new Error("No blueprint generated");

    return JSON.parse(response.text) as Blueprint;
  } catch (error) {
    handleGeminiError(error);
    throw error;
  }
};

export const translateIdea = async (idea: Idea, targetLang: Language, apiKey?: string): Promise<Idea> => {
  const ai = getClient(apiKey);
  const langName = PROMPT_LANG_MAP[targetLang];

  const prompt = `Translate the following Web3 project idea into ${langName}.
  Maintain the original tone, style, and technical accuracy.
  
  Input:
  Title: ${idea.title}
  Tagline: ${idea.tagline}
  Description: ${idea.description}
  Features: ${idea.features.join(', ')}
  
  Return a JSON object with: title, tagline, description, features (array of strings).
  `;

  const responseSchema: Schema = {
    type: Type.OBJECT,
    properties: {
      title: { type: Type.STRING },
      tagline: { type: Type.STRING },
      description: { type: Type.STRING },
      features: {
        type: Type.ARRAY,
        items: { type: Type.STRING }
      }
    },
    required: ["title", "tagline", "description", "features"]
  };

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema
      }
    });

    if (!response.text) throw new Error("Translation failed");

    const translated = JSON.parse(response.text);

    return {
      ...idea,
      ...translated,
      language: targetLang
    };

  } catch (error) {
    handleGeminiError(error);
    throw error;
  }
};

export const generateContractCode = async (idea: Idea, apiKey?: string): Promise<string> => {
  const ai = getClient(apiKey);
  const prompt = `Write a Solidity smart contract for: ${idea.title}. 
  Context: ${idea.description}. 
  Chain: ${idea.ecosystem}.
  Standards: ERC20 or ERC721 or custom logic as appropriate.
  Return ONLY the code.`;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt
  });

  return response.text || "// Error generating contract";
};
