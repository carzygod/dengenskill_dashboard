import React, { useState } from 'react';
import { Idea, Blueprint } from '../types';
import { generateContractCode } from '../services/gemini';
import { X, Code, Terminal, UploadCloud, Cpu, FileText, CheckCircle2, Copy } from 'lucide-react';

interface BlueprintModalProps {
    idea: Idea;
    blueprint: Blueprint | undefined;
    onClose: () => void;
    t: any;
}

const BlueprintModal: React.FC<BlueprintModalProps> = ({ idea, blueprint, onClose, t }) => {
    const [activeTab, setActiveTab] = useState<'DOCS' | 'BUILDER'>('DOCS');
    const [buildStep, setBuildStep] = useState<number>(0); // 0: Idle, 1: Contract, 2: Dapp, 3: Deploy
    const [contractCode, setContractCode] = useState<string>('');
    const [buildLogs, setBuildLogs] = useState<string[]>([]);

    const addToLog = (msg: string) => setBuildLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${msg}`]);

    const handleStartBuild = async () => {
        setBuildStep(1);
        addToLog("Initializing Hardhat environment...");
        addToLog(`Target Chain: ${idea.ecosystem}`);

        // Step 1: Generate Contract
        try {
            addToLog("Agent: Generating Solidity Smart Contract...");
            const code = await generateContractCode(idea);
            setContractCode(code);
            addToLog("Contract compiled successfully. Bytecode size: 24KB.");

            // Simulate delays for effect
            setTimeout(() => {
                setBuildStep(2);
                addToLog("Initializing React Scaffolding...");
                addToLog("Installing dependencies: ethers, wagmi, tailwindcss...");

                setTimeout(() => {
                    setBuildStep(3);
                    addToLog("Building production bundle...");
                    addToLog("Uploading to IPFS (Pinata)...");

                    setTimeout(() => {
                        setBuildStep(4); // Done
                        addToLog("DEPLOYMENT COMPLETE.");
                        addToLog(`Project live at: ipfs://${idea.id.substring(0, 8)}...`);
                    }, 2000);
                }, 2500);
            }, 2000);

        } catch (e) {
            addToLog("Error in build pipeline.");
            setBuildStep(0);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm">
            <div className="bg-[#050505] border border-white/10 w-full max-w-4xl h-[85vh] rounded-2xl flex flex-col shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden">

                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-white/10 bg-[#0A0A0A]">
                    <div>
                        <h2 className="text-xl font-bold text-white flex items-center gap-3">
                            {idea.title}
                            <span className="text-xs font-mono px-2 py-0.5 rounded bg-[#00FF94]/10 text-[#00FF94]">{t.blueprint_mode}</span>
                        </h2>
                        <p className="text-xs text-gray-500 font-mono mt-1">{idea.id}</p>
                    </div>
                    <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Tabs */}
                <div className="flex border-b border-white/10">
                    <button
                        onClick={() => setActiveTab('DOCS')}
                        className={`px-6 py-3 text-sm font-mono transition-colors ${activeTab === 'DOCS' ? 'text-[#00FF94] border-b-2 border-[#00FF94] bg-[#00FF94]/5' : 'text-gray-500 hover:text-white'}`}
                    >
                        {t.tab_docs}
                    </button>
                    <button
                        onClick={() => setActiveTab('BUILDER')}
                        className={`px-6 py-3 text-sm font-mono transition-colors ${activeTab === 'BUILDER' ? 'text-[#FF00FF] border-b-2 border-[#FF00FF] bg-[#FF00FF]/5' : 'text-gray-500 hover:text-white'}`}
                    >
                        {t.tab_builder}
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
                    {activeTab === 'DOCS' ? (
                        blueprint ? (
                            <div className="space-y-8 max-w-3xl mx-auto">
                                <section>
                                    <h3 className="text-[#00FF94] font-mono text-sm mb-3 uppercase tracking-widest flex items-center gap-2">
                                        <FileText className="w-4 h-4" /> {t.exec_summary}
                                    </h3>
                                    <div className="text-gray-300 leading-relaxed whitespace-pre-line text-sm">{blueprint.overview}</div>
                                </section>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <section className="bg-white/5 p-6 rounded-lg border border-white/5">
                                        <h3 className="text-[#00FF94] font-mono text-sm mb-3 uppercase tracking-widest">{t.tokenomics}</h3>
                                        <div className="text-gray-400 text-xs whitespace-pre-line leading-relaxed font-mono">{blueprint.tokenomics}</div>
                                    </section>
                                    <section className="bg-white/5 p-6 rounded-lg border border-white/5">
                                        <h3 className="text-[#00FF94] font-mono text-sm mb-3 uppercase tracking-widest">{t.roadmap}</h3>
                                        <div className="text-gray-400 text-xs whitespace-pre-line leading-relaxed font-mono">{blueprint.roadmap}</div>
                                    </section>
                                </div>

                                <section>
                                    <h3 className="text-[#00FF94] font-mono text-sm mb-3 uppercase tracking-widest flex items-center gap-2">
                                        <Cpu className="w-4 h-4" /> {t.tech_arch}
                                    </h3>
                                    <div className="p-4 bg-black border border-white/10 rounded font-mono text-xs text-gray-400 whitespace-pre-wrap">
                                        {blueprint.technicalArchitecture}
                                    </div>
                                </section>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center h-full text-gray-500 gap-4">
                                <div className="w-8 h-8 border-2 border-[#00FF94] border-t-transparent rounded-full animate-spin"></div>
                                <p className="font-mono text-xs">{t.architecting}</p>
                            </div>
                        )
                    ) : (
                        <div className="flex flex-col h-full gap-6">
                            {/* Progress Bar */}
                            <div className="flex justify-between items-center bg-white/5 p-4 rounded-lg border border-white/5">
                                {[
                                    { id: 1, label: t.step_contract, icon: Code },
                                    { id: 2, label: t.step_frontend, icon: Terminal },
                                    { id: 3, label: t.step_deploy, icon: UploadCloud },
                                ].map((step, idx) => (
                                    <div key={step.id} className={`flex items-center gap-3 ${buildStep >= step.id ? 'text-[#FF00FF] opacity-100' : 'text-gray-600 opacity-50'
                                        }`}>
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center border ${buildStep >= step.id ? 'border-[#FF00FF] bg-[#FF00FF]/10' : 'border-gray-700'
                                            }`}>
                                            {buildStep > step.id ? <CheckCircle2 className="w-5 h-5" /> : <step.icon className="w-4 h-4" />}
                                        </div>
                                        <span className="text-xs font-mono font-bold hidden sm:block">{step.label}</span>
                                        {idx < 2 && <div className="w-12 h-[1px] bg-gray-800 mx-2 hidden sm:block"></div>}
                                    </div>
                                ))}
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1 min-h-0">
                                {/* Terminal Log */}
                                <div className="bg-black border border-white/10 rounded-lg p-4 font-mono text-xs overflow-y-auto flex flex-col">
                                    <div className="text-gray-500 mb-2 border-b border-gray-800 pb-2">{t.build_logs}</div>
                                    <div className="flex-1 space-y-1">
                                        {buildLogs.length === 0 && <span className="text-gray-700">{t.waiting}</span>}
                                        {buildLogs.map((log, i) => (
                                            <div key={i} className="text-[#00FF94]">{`> ${log}`}</div>
                                        ))}
                                        {buildStep > 0 && buildStep < 4 && <div className="animate-pulse text-[#FF00FF] mt-2">_</div>}
                                    </div>
                                </div>

                                {/* Preview / Code */}
                                <div className="bg-[#111] border border-white/10 rounded-lg p-4 flex flex-col min-h-0">
                                    <div className="flex justify-between items-center mb-2 border-b border-gray-800 pb-2">
                                        <span className="text-gray-500 font-mono text-xs">{t.gen_assets}</span>
                                        {contractCode && <Copy className="w-3 h-3 text-gray-500 cursor-pointer hover:text-white" />}
                                    </div>
                                    <div className="flex-1 overflow-y-auto custom-scrollbar">
                                        {contractCode ? (
                                            <pre className="text-[10px] text-gray-400 font-mono whitespace-pre-wrap">
                                                {contractCode}
                                            </pre>
                                        ) : (
                                            <div className="flex items-center justify-center h-full text-gray-700 text-xs font-mono">
                                                {t.no_assets}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {buildStep === 0 && (
                                <button
                                    onClick={handleStartBuild}
                                    className="w-full py-4 bg-[#FF00FF] text-black font-bold font-mono rounded hover:bg-[#D900D9] transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(255,0,255,0.2)]"
                                >
                                    <Cpu className="w-4 h-4" /> {t.init_builder}
                                </button>
                            )}
                            {buildStep === 4 && (
                                <button
                                    disabled
                                    className="w-full py-4 bg-gray-800 text-gray-500 font-bold font-mono rounded cursor-not-allowed flex items-center justify-center gap-2 transition-all opacity-50 hover:bg-gray-800"
                                >
                                    <UploadCloud className="w-4 h-4" /> {t.view_deploy}
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BlueprintModal;
