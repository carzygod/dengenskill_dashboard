# Degenskills: Crypto Venture Architect

A cyberpunk-themed, AI-powered "Founder in a Box" tool designed to ideate, verify, and architect the next generation of Web3 projects. This application leverages **Google Gemini** to generate high-quality crypto project concepts, check them for uniqueness against real-world data, and generate technical blueprints (whitepapers, solidity contracts).

![Banner](https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6)

## 🧠 Project Logic & Core Features

The application operates on a three-stage pipeline: **Forge (Ideation)** -> **Oracle (Verification)** -> **Architect (Blueprinting)**.

### 1. The Forge: Idea Generation
Users can configure the "Forge" to generate project ideas based on specific parameters:
- **Modes**:
  - **Targeted**: precise control over target ecosystems and sectors.
  - **Random**: chaotic, high-variance "wildcard" ideas.
- **Parameters**: 
  - **Ecosystems**: Solana, BSC, Base, Monad, TON, Ethereum, Arbitrum.
  - **Sectors**: DeFi, SocialFi, GameFi, Infra, DePin, NFT, DAO.
  - **Degen Level (0-100)**: Controls the "risk/innovation" temperature.
    - *Low Level*: Focuses on Real World Assets (RWA), infrastructure, and institutional DeFi.
    - *High Level*: Focuses on meme mechanics, high-yield experiments, and "ponzi-nomics".
- **AI Model**: Uses `gemini-3-flash-preview` with structured JSON schemas to ensure consistent output formats (Title, Tagline, Description, Features).

### 2. The Oracle: Verification System
Once an idea is generated, it can be verified for uniqueness:
- **Collision Detection**: The AI performs a Google Search (via Gemini tools) to find existing projects with similar names, mechanisms, or value propositions.
- **Pivot Suggestions**: If a collision is found, the AI suggests specific pivots (e.g., "Add a privacy layer", "Rebrand to X").
- **Verification Statuses**:
  - `VERIFIED`: Unique idea, confirmed safe to proceed.
  - `WARNING`: Similar projects exist (listed with URLs).
  - `FAILED`: Verification process error.

### 3. The Architect: Blueprint Generation
For any generated idea, the user can "View Blueprint" to generate a full technical whitepaper on the fly:
- **Executive Summary & Vision**
- **Tokenomics**: Allocation, vesting schedules, and utility.
- **Roadmap**: 4-phase execution plan.
- **Technical Architecture**: Smart contract structure, frontend requirements, and indexing needs.
- **Code Generation**: auto-generates a starter **Solidity Smart Contract** and **Frontend React Snippet** for the project.

## 🛠 Tech Stack

- **Frontend Framework**: React 19 + Vite
- **Language**: TypeScript
- **Styling**: 
  - Tailwind CSS (Utility classes)
  - Custom CSS (Cyber-grid backgrounds, Scanlines, Neon glows) via `index.html`
- **AI Integration**: `@google/genai` SDK (Gemini 1.5 / 3 Flash)
- **Icons**: Lucide React
- **Animation**: Framer Motion
- **Internationalization**: Fully localized support for English (en), Chinese (zh-CN, zh-TW), and Russian (ru).

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- A Google Gemini API Key

### Installation

1. **Clone and Install**
   ```bash
   npm install
   ```

2. **Configure Environment**
   Create a `.env.local` file in the root directory:
   ```env
   GEMINI_API_KEY=your_api_key_here
   ```
   *Alternatively, you can enter your API key directly in the application Settings UI.*

3. **Run Locally**
   ```bash
   npm run dev
   ```
   Access the app at `http://localhost:5173`

## 📂 Project Structure

- **`App.tsx`**: Main application controller. Handles state for ideas, logs, and UI layout.
- **`services/gemini.ts`**: Core AI logic. Contains the `generateIdeas`, `verifyIdea`, and `generateBlueprint` functions with specific prompt engineering.
- **`types.ts`**: TypeScript definitions for `Idea`, `ForgeConfig`, `Blueprint`, etc.
- **`locales.ts`**: Translation strings for all supported languages.
- **`components/`**: Reusable UI components (IdeaCard, TerminalOutput, ConfigPanel, etc.).
- **`index.html`**: Contains the "Cyberpunk" global styles (`.cyber-grid`, `.scanline`, `.neon-text`).
