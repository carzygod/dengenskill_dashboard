import React from 'react';
import { ForgeConfig, Ecosystem, Sector } from '../types';
import { ECOSYSTEMS, SECTORS } from '../constants';
import { Settings2, Dice5, Zap } from 'lucide-react';

interface ConfigPanelProps {
  config: ForgeConfig;
  setConfig: React.Dispatch<React.SetStateAction<ForgeConfig>>;
  onGenerate: () => void;
  isGenerating: boolean;
  t: any;
}

const ConfigPanel: React.FC<ConfigPanelProps> = ({ config, setConfig, onGenerate, isGenerating, t }) => {

  const toggleSelection = <T extends string>(list: T[], item: T): T[] => {
    return list.includes(item) ? list.filter(i => i !== item) : [...list, item];
  };

  const getDegenLabel = (level: number) => {
    if (level < 30) return t.degen_safe;
    if (level < 80) return t.degen_balanced;
    return t.degen_chaos;
  };

  return (
    <div className="bg-[#0A0A0A] border border-white/5 rounded-xl p-6 relative overflow-hidden group">
      {/* Decorative Glow */}
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#00FF94]/5 rounded-full blur-3xl pointer-events-none"></div>

      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-xl font-bold flex items-center gap-2 text-white">
          <Settings2 className="w-5 h-5 text-[#00FF94]" />
          <span className="tracking-wider">{t.lab}</span>
        </h2>

        <div className="flex bg-black/50 rounded-lg p-1 border border-white/10">
          <button
            onClick={() => setConfig(prev => ({ ...prev, mode: 'TARGETED' }))}
            className={`px-4 py-1.5 text-xs font-mono rounded-md transition-all ${config.mode === 'TARGETED' ? 'bg-[#00FF94] text-black font-bold' : 'text-gray-400 hover:text-white'
              }`}
          >
            {t.mode_targeted}
          </button>
          <button
            onClick={() => setConfig(prev => ({ ...prev, mode: 'RANDOM' }))}
            className={`px-4 py-1.5 text-xs font-mono rounded-md transition-all ${config.mode === 'RANDOM' ? 'bg-[#FF00FF] text-black font-bold' : 'text-gray-400 hover:text-white'
              }`}
          >
            {t.mode_chaos}
          </button>
        </div>
      </div>

      {config.mode === 'TARGETED' ? (
        <div className="space-y-6">
          {/* Ecosystems */}
          <div className="space-y-2">
            <label className="text-xs font-mono text-gray-500 uppercase tracking-widest">{t.ecosystem}</label>
            <div className="flex flex-wrap gap-2">
              {ECOSYSTEMS.map(chain => (
                <button
                  key={chain}
                  onClick={() => setConfig(prev => ({ ...prev, ecosystems: toggleSelection(prev.ecosystems, chain) }))}
                  className={`px-3 py-1.5 rounded border text-xs font-mono transition-all ${config.ecosystems.includes(chain)
                      ? 'border-[#00FF94] bg-[#00FF94]/10 text-[#00FF94]'
                      : 'border-white/10 text-gray-400 hover:border-white/20'
                    }`}
                >
                  {chain}
                </button>
              ))}
            </div>
          </div>

          {/* Sectors */}
          <div className="space-y-2">
            <label className="text-xs font-mono text-gray-500 uppercase tracking-widest">{t.sector}</label>
            <div className="flex flex-wrap gap-2">
              {SECTORS.map(sec => (
                <button
                  key={sec}
                  onClick={() => setConfig(prev => ({ ...prev, sectors: toggleSelection(prev.sectors, sec) }))}
                  className={`px-3 py-1.5 rounded border text-xs font-mono transition-all ${config.sectors.includes(sec)
                      ? 'border-[#00FF94] bg-[#00FF94]/10 text-[#00FF94]'
                      : 'border-white/10 text-gray-400 hover:border-white/20'
                    }`}
                >
                  {sec}
                </button>
              ))}
            </div>
          </div>

          {/* Sliders */}
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-gray-500">{t.quantity}</span>
                <span className="text-[#00FF94]">{config.quantity}</span>
              </div>
              <input
                type="range" min="1" max="5"
                value={config.quantity}
                onChange={(e) => setConfig(prev => ({ ...prev, quantity: parseInt(e.target.value) }))}
                className="w-full h-1 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-[#00FF94]"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-gray-500">{t.degen_factor}</span>
                <span className={`${config.degenLevel > 80 ? 'text-[#FF00FF] animate-pulse' : 'text-[#00FF94]'}`}>
                  {config.degenLevel}%
                </span>
              </div>
              <input
                type="range" min="0" max="100" step="10"
                value={config.degenLevel}
                onChange={(e) => setConfig(prev => ({ ...prev, degenLevel: parseInt(e.target.value) }))}
                className={`w-full h-1 bg-gray-800 rounded-lg appearance-none cursor-pointer ${config.degenLevel > 80 ? 'accent-[#FF00FF]' : 'accent-[#00FF94]'
                  }`}
              />
              <div className="text-[10px] text-gray-500 text-right">
                {getDegenLabel(config.degenLevel)}
              </div>
            </div>
          </div>

          {/* User Context Input */}
          <div className="space-y-2">
            <label className="text-xs font-mono text-gray-500 uppercase tracking-widest">{t.context_label}</label>
            <textarea
              value={config.userContext || ''}
              onChange={(e) => setConfig(prev => ({ ...prev, userContext: e.target.value }))}
              placeholder={t.context_placeholder}
              className="w-full h-20 bg-black/30 border border-white/10 rounded-lg p-3 text-xs font-mono text-gray-300 focus:border-[#00FF94] focus:outline-none resize-none placeholder-gray-700"
            />
          </div>

          <button
            onClick={onGenerate}
            disabled={isGenerating}
            className="w-full py-4 bg-[#00FF94] text-black font-bold font-mono rounded hover:bg-[#00CC76] transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed group-hover:shadow-[0_0_20px_rgba(0,255,148,0.4)]"
          >
            {isGenerating ? <Zap className="animate-spin w-4 h-4" /> : <Zap className="w-4 h-4" />}
            {isGenerating ? t.forging : t.mint}
          </button>

        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 space-y-8">
          <div className="text-center space-y-2">
            <Dice5 className="w-12 h-12 text-[#FF00FF] mx-auto opacity-80" />
            <p className="text-sm text-gray-400 max-w-xs mx-auto">
              {t.random_desc}
            </p>
          </div>

          <div className="w-full max-w-xs space-y-2">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-gray-500">{t.quantity}</span>
              <span className="text-[#FF00FF]">{config.quantity}</span>
            </div>
            <input
              type="range" min="1" max="5"
              value={config.quantity}
              onChange={(e) => setConfig(prev => ({ ...prev, quantity: parseInt(e.target.value) }))}
              className="w-full h-1 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-[#FF00FF]"
            />
          </div>

          <button
            onClick={onGenerate}
            disabled={isGenerating}
            className="w-full max-w-xs py-5 bg-gradient-to-r from-[#FF00FF] to-[#BD00FF] text-white font-bold font-mono rounded hover:brightness-110 transition-all flex items-center justify-center gap-2 disabled:opacity-50 shadow-[0_0_20px_rgba(255,0,255,0.3)]"
          >
            {isGenerating ? t.cooking : t.cook}
          </button>
        </div>
      )}
    </div>
  );
};

export default ConfigPanel;
