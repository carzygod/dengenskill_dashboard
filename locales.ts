import { Language } from './types';

export const LANG_NAMES: Record<Language, string> = {
  en: "English",
  'zh-CN': "简体中文",
  'zh-TW': "繁體中文",
  ru: "Русский"
};

export const PROMPT_LANG_MAP: Record<Language, string> = {
  en: "English",
  'zh-CN': "Simplified Chinese",
  'zh-TW': "Traditional Chinese",
  ru: "Russian"
};

export const TRANSLATIONS = {
  en: {
    navbar: {
      title: "DEGENSKILLS",
      subtitle: "v0.1.0",
      status: "SYSTEM_ONLINE"
    },
    config: {
      lab: "THE LAB",
      mode_targeted: "TARGETED",
      mode_chaos: "CHAOS",
      ecosystem: "ECOSYSTEM",
      sector: "SECTOR",
      quantity: "QUANTITY",
      degen_factor: "DEGEN FACTOR",
      mint: "MINT IDEAS",
      forging: "FORGING...",
      cook: "LET HIM COOK",
      cooking: "COOKING...",
      random_desc: "Surrender control. Let the agent combine random paradigms into something totally unexpected.",
      degen_safe: "Institutional (Safe)",
      degen_balanced: "Innovative (Balanced)",
      degen_chaos: "Ponzi / Degen (Chaos)",
      context_label: "ADDITIONAL CONTEXT (OPTIONAL)",
      context_placeholder: "e.g. A gamified yield aggregator on Solana...",
      connect_wallet: "CONNECT WALLET"
    },
    card: {
      degen: "DEGEN",
      verify: "VERIFY VIABILITY",
      analyzing: "ANALYZING CHAIN...",
      build: "BUILD BLUEPRINT",
      conflicts: "VIEW CONFLICTS"
    },
    modal: {
      blueprint_mode: "BLUEPRINT_MODE",
      tab_docs: "// DOCUMENTATION",
      tab_builder: "// THE_BUILDER",
      exec_summary: "Executive Summary",
      tokenomics: "Tokenomics",
      roadmap: "Roadmap",
      tech_arch: "Technical Architecture",
      step_contract: "CONTRACT",
      step_frontend: "FRONTEND",
      step_deploy: "DEPLOY",
      build_logs: "BUILD_LOGS",
      gen_assets: "GENERATED_ASSETS",
      init_builder: "INITIALIZE AUTO-BUILDER",
      view_deploy: "1-CLICK DEPLOY (DEV WIP)",
      architecting: "ARCHITECTING BLUEPRINT...",
      waiting: "Waiting for command...",
      no_assets: "[NO ASSETS GENERATED]"
    },
    settings: {
      title: "SYSTEM CONFIGURATION",
      api_label: "GEMINI API KEY",
      api_placeholder: "Enter your custom API key...",
      api_desc: "Leave empty to use the default provided key. Your key is stored locally in your browser.",
      save: "SAVE CONFIGURATION",
      cancel: "CANCEL"
    },
    terminal: {
      process: "AGENT_THOUGHT_PROCESS // DEGENSKILLS_CORE",
      thinking: "_PROCESSING_NEURAL_PATHWAYS..."
    },
    app: {
      protocols: "GENERATED_PROTOCOLS",
      count: "COUNT",
      awaiting: "AWAITING INPUT PARAMETERS...",
      view_mode: "VIEW",
      view_grid: "GRID",
      view_carousel: "3D DECK",
      logs: {
        init: "Initializing DEGENSKILLS protocol...",
        scan: "Scanning {n} ecosystems for arbitrage opportunities...",
        analyze: "Analyzing {sectors} saturation levels...",
        synth: "Idea #{n} synthesized successfully.",
        batch: "Batch generation complete.",
        fail: "Generation failed. Connection severed.",
        verify_start: "Initiating deep chain scan for: {title}...",
        verify_success: "[{title}] verified UNIQUE. Alpha detected.",
        verify_collision: "[{title}] COLLISION detected. {n} similar protocols found.",
        verify_fail: "Verification failed for {title}"
      }
    }
  },
  'zh-CN': {
    navbar: {
      title: "DEGENSKILLS",
      subtitle: "v0.1.0",
      status: "系统在线"
    },
    config: {
      lab: "实验室",
      mode_targeted: "定向锻造",
      mode_chaos: "混乱模式",
      ecosystem: "生态系统",
      sector: "赛道选择",
      quantity: "生成数量",
      degen_factor: "疯狂指数 (DEGEN)",
      mint: "铸造创意",
      forging: "锻造中...",
      cook: "开始烹饪",
      cooking: "烹饪中...",
      random_desc: "放弃控制。让 Agent 随机混合不同的范式，创造意想不到的组合。",
      degen_safe: "机构级 (安全)",
      degen_balanced: "创新级 (平衡)",
      degen_chaos: "土狗 / 庞氏 (混乱)",
      context_label: "额外背景 (可选)",
      context_placeholder: "例如：Solana 上的游戏化收益聚合器...",
      connect_wallet: "连接钱包"
    },
    card: {
      degen: "疯狂度",
      verify: "验证可行性",
      analyzing: "链上分析中...",
      build: "构建蓝图",
      conflicts: "查看冲突"
    },
    modal: {
      blueprint_mode: "蓝图模式",
      tab_docs: "// 项目文档",
      tab_builder: "// 构建者",
      exec_summary: "执行摘要",
      tokenomics: "代币经济学",
      roadmap: "路线图",
      tech_arch: "技术架构",
      step_contract: "智能合约",
      step_frontend: "前端开发",
      step_deploy: "部署上线",
      build_logs: "构建日志",
      gen_assets: "生成资产",
      init_builder: "启动自动构建器",
      view_deploy: "一键部署 (功能开发中)",
      architecting: "正在规划蓝图...",
      waiting: "等待指令...",
      no_assets: "[未生成资产]"
    },
    settings: {
      title: "系统配置",
      api_label: "GEMINI API 密钥",
      api_placeholder: "输入您的自定义 API 密钥...",
      api_desc: "留空以使用默认提供的密钥。您的密钥将存储在本地浏览器中。",
      save: "保存配置",
      cancel: "取消"
    },
    terminal: {
      process: "AGENT_思维过程 // DEGENSKILLS_CORE",
      thinking: "_处理神经网络路径..."
    },
    app: {
      protocols: "已生成协议",
      count: "数量",
      awaiting: "等待输入参数...",
      view_mode: "视图",
      view_grid: "网格",
      view_carousel: "3D 立体",
      logs: {
        init: "正在初始化 DEGENSKILLS 协议...",
        scan: "正在扫描 {n} 个生态系统的套利机会...",
        analyze: "正在分析 {sectors} 赛道的饱和度...",
        synth: "创意 #{n} 合成成功。",
        batch: "批量生成完成。",
        fail: "生成失败。连接已断开。",
        verify_start: "正在对 {title} 进行深度链上扫描...",
        verify_success: "[{title}] 验证唯一。发现 Alpha。",
        verify_collision: "[{title}] 检测到冲突。发现 {n} 个类似协议。",
        verify_fail: "验证 {title} 失败"
      }
    }
  },
  'zh-TW': {
    navbar: {
      title: "DEGENSKILLS",
      subtitle: "v0.1.0",
      status: "系統在線"
    },
    config: {
      lab: "實驗室",
      mode_targeted: "定向鍛造",
      mode_chaos: "混亂模式",
      ecosystem: "生態系統",
      sector: "賽道選擇",
      quantity: "生成數量",
      degen_factor: "瘋狂指數 (DEGEN)",
      mint: "鑄造創意",
      forging: "鍛造中...",
      cook: "開始烹飪",
      cooking: "烹飪中...",
      random_desc: "放棄控制。讓 Agent 隨機混合不同的範式，創造意想不到的組合。",
      degen_safe: "機構級 (安全)",
      degen_balanced: "創新級 (平衡)",
      degen_chaos: "土狗 / 龐氏 (混亂)",
      context_label: "額外背景 (可選)",
      context_placeholder: "例如：Solana 上的遊戲化收益聚合器...",
      connect_wallet: "連接錢包"
    },
    card: {
      degen: "瘋狂度",
      verify: "驗證可行性",
      analyzing: "鏈上分析中...",
      build: "構建藍圖",
      conflicts: "查看衝突"
    },
    modal: {
      blueprint_mode: "藍圖模式",
      tab_docs: "// 項目文檔",
      tab_builder: "// 構建者",
      exec_summary: "執行摘要",
      tokenomics: "代幣經濟學",
      roadmap: "路線圖",
      tech_arch: "技術架構",
      step_contract: "智能合約",
      step_frontend: "前端開發",
      step_deploy: "部署上線",
      build_logs: "構建日誌",
      gen_assets: "生成資產",
      init_builder: "啟動自動構建器",
      view_deploy: "查看部署 (模擬)",
      architecting: "正在規劃藍圖...",
      waiting: "等待指令...",
      no_assets: "[未生成資產]"
    },
    settings: {
      title: "系統配置",
      api_label: "GEMINI API 密鑰",
      api_placeholder: "輸入您的自定義 API 密鑰...",
      api_desc: "留空以使用默認提供的密鑰。您的密鑰將存儲在本地瀏覽器中。",
      save: "保存配置",
      cancel: "取消"
    },
    terminal: {
      process: "AGENT_思維過程 // DEGENSKILLS_CORE",
      thinking: "_處理神經網絡路徑..."
    },
    app: {
      protocols: "已生成協議",
      count: "數量",
      awaiting: "等待輸入參數...",
      view_mode: "視圖",
      view_grid: "網格",
      view_carousel: "3D 立體",
      logs: {
        init: "正在初始化 DEGENSKILLS 協議...",
        scan: "正在掃描 {n} 個生態系統的套利機會...",
        analyze: "正在分析 {sectors} 賽道的飽和度...",
        synth: "創意 #{n} 合成成功。",
        batch: "批量生成完成。",
        fail: "生成失敗。連接已斷開。",
        verify_start: "正在對 {title} 進行深度鏈上掃描...",
        verify_success: "[{title}] 驗證唯一。發現 Alpha。",
        verify_collision: "[{title}] 檢測到衝突。發現 {n} 個類似協議。",
        verify_fail: "驗證 {title} 失敗"
      }
    }
  },
  'ru': {
    navbar: {
      title: "DEGENSKILLS",
      subtitle: "v0.1.0",
      status: "СИСТЕМА_ОНЛАЙН"
    },
    config: {
      lab: "ЛАБОРАТОРИЯ",
      mode_targeted: "ЦЕЛЕВОЙ",
      mode_chaos: "ХАОС",
      ecosystem: "ЭКОСИСТЕМА",
      sector: "СЕКТОР",
      quantity: "КОЛИЧЕСТВО",
      degen_factor: "ФАКТОР ДЕГЕНА",
      mint: "СОЗДАТЬ ИДЕИ",
      forging: "КОВКА...",
      cook: "ГОТОВИТЬ",
      cooking: "ПРИГОТОВЛЕНИЕ...",
      random_desc: "Отпустите контроль. Позвольте агенту смешать случайные парадигмы в нечто совершенно неожиданное.",
      degen_safe: "Институциональный (Безопасно)",
      degen_balanced: "Инновационный (Сбалансированно)",
      degen_chaos: "Понци / Деген (Хаос)",
      context_label: "ДОПОЛНИТЕЛЬНЫЙ КОНТЕКСТ (ОПЦИОНАЛЬНО)",
      context_placeholder: "напр. Геймифицированный агрегатор доходности на Solana...",
      connect_wallet: "ПОДКЛЮЧИТЬ КОШЕЛЕК"
    },
    card: {
      degen: "ДЕГЕН",
      verify: "ПРОВЕРИТЬ",
      analyzing: "АНАЛИЗ...",
      build: "СОЗДАТЬ ЧЕРТЕЖ",
      conflicts: "КОНФЛИКТЫ"
    },
    modal: {
      blueprint_mode: "РЕЖИМ_ЧЕРТЕЖА",
      tab_docs: "// ДОКУМЕНТАЦИЯ",
      tab_builder: "// СТРОИТЕЛЬ",
      exec_summary: "Резюме",
      tokenomics: "Токеномика",
      roadmap: "Дорожная карта",
      tech_arch: "Архитектура",
      step_contract: "КОНТРАКТ",
      step_frontend: "ФРОНТЕНД",
      step_deploy: "ДЕПЛОЙ",
      build_logs: "ЛОГИ_СБОРКИ",
      gen_assets: "АКТИВЫ",
      init_builder: "ЗАПУСТИТЬ АВТО-БИЛДЕР",
      view_deploy: "СМОТРЕТЬ ДЕПЛОЙ",
      architecting: "ПРОЕКТИРОВАНИЕ...",
      waiting: "Ожидание команды...",
      no_assets: "[НЕТ АКТИВОВ]"
    },
    settings: {
      title: "КОНФИГУРАЦИЯ СИСТЕМЫ",
      api_label: "GEMINI API КЛЮЧ",
      api_placeholder: "Введите ваш API ключ...",
      api_desc: "Оставьте пустым для использования ключа по умолчанию. Ключ хранится локально.",
      save: "СОХРАНИТЬ",
      cancel: "ОТМЕНА"
    },
    terminal: {
      process: "МЫСЛИТЕЛЬНЫЙ_ПРОЦЕСС // DEGENSKILLS_CORE",
      thinking: "_ОБРАБОТКА_НЕЙРОННЫХ_ПУТЕЙ..."
    },
    app: {
      protocols: "ПРОТОКОЛЫ",
      count: "СЧЕТ",
      awaiting: "ОЖИДАНИЕ ПАРАМЕТРОВ...",
      view_mode: "ВИД",
      view_grid: "СЕТКА",
      view_carousel: "3D КОЛОДА",
      logs: {
        init: "Инициализация протокола DEGENSKILLS...",
        scan: "Сканирование {n} экосистем...",
        analyze: "Анализ насыщения секторов {sectors}...",
        synth: "Идея #{n} синтезирована успешно.",
        batch: "Пакетная генерация завершена.",
        fail: "Сбой генерации. Связь прервана.",
        verify_start: "Глубокое сканирование сети для: {title}...",
        verify_success: "[{title}] уникален. Alpha обнаружена.",
        verify_collision: "[{title}] КОЛЛИЗИЯ. Найдено {n} похожих протоколов.",
        verify_fail: "Ошибка проверки {title}"
      }
    }
  }
};
