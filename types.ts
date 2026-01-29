export type Ecosystem = 'Solana' | 'BSC' | 'Base' | 'Monad' | 'TON' | 'Ethereum' | 'Arbitrum';
export type Sector = 'DeFi' | 'SocialFi' | 'GameFi' | 'Infra' | 'DePin' | 'NFT' | 'DAO';
export type Language = 'en' | 'zh-CN' | 'zh-TW' | 'ru';

export interface ForgeConfig {
  mode: 'TARGETED' | 'RANDOM';
  ecosystems: Ecosystem[];
  sectors: Sector[];
  quantity: number;
  degenLevel: number; // 0 - 100
  userContext?: string;
}

export interface Idea {
  id: string;
  title: string;
  tagline: string;
  description: string;
  ecosystem: string;
  sector: string;
  degenScore: number;
  features: string[];
  status: 'GENERATED' | 'VERIFYING' | 'VERIFIED' | 'FAILED';
  verificationResult?: VerificationResult;
  blueprint?: Blueprint;
}

export interface VerificationResult {
  isUnique: boolean;
  similarProjects: Array<{ name: string; url?: string; description?: string }>;
  pivotSuggestion?: string;
  notes?: string;
}

export interface Blueprint {
  overview: string;
  tokenomics: string;
  roadmap: string;
  technicalArchitecture: string;
  contractCode?: string;
  frontendSnippet?: string;
  deploymentUrl?: string;
}

export interface LogMessage {
  id: string;
  text: string;
  type: 'info' | 'success' | 'warning' | 'error';
  timestamp: number;
}
