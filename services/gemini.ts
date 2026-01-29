import { GoogleGenAI, Type, Schema } from "@google/genai";
import { ForgeConfig, Idea, VerificationResult, Blueprint, Language } from "../types";
import { PROMPT_LANG_MAP } from "../locales";

const getClient = (customApiKey?: string) => {
  // Priority: User's custom key > Environment variable
  const apiKey = customApiKey || process.env.API_KEY;
  if (!apiKey) throw new Error("API_KEY not found. Please provide a key in settings or .env");
  return new GoogleGenAI({ apiKey });
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
      status: 'GENERATED'
    }));

  } catch (error) {
    console.error("Gemini Generation Error:", error);
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
    // Fallback if search fails
    return {
      isUnique: true,
      similarProjects: [],
      notes: "Verification unavailable. Proceed with caution."
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
