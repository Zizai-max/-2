export type ProjectSection = {
  eyebrow: string;
  title: string;
  description: string;
  images: string[];
};

export type Project = {
  slug: string;
  number: string;
  title: string;
  englishTitle: string;
  category: string;
  year: string;
  accent: string;
  coverImage: string;
  intro: string;
  role: string;
  scope: string;
  sections: ProjectSection[];
};

export const projects: Project[] = [
  {
    slug: "ai-application",
    number: "01",
    title: "AI 应用体验设计",
    englishTitle: "AI Application Experience Design",
    category: "AI 应用 / 智能交互 / 产品体验",
    year: "2026",
    accent: "#b58cff",
    coverImage: "/portfolio/pages/p18.jpg",
    intro:
      "围绕 AI 学习应用的首页体验，探索人格化角色、任务推荐与多模态提问的组合方式，让智能能力以更轻松、更易理解的方式进入真实学习场景。",
    role: "UX / UI Designer",
    scope: "AI 产品概念、首页框架、交互探索、视觉方案、体验验证",
    sections: [
      {
        eyebrow: "01 / CONCEPT",
        title: "把 AI 能力转译为可感知的应用体验",
        description:
          "从学习陪伴的真实任务出发，将复杂的模型能力拆解为角色沟通、问题推荐和拍照讲题等清晰入口，建立用户第一次进入应用时的理解路径。",
        images: ["/portfolio/pages/p17.jpg", "/portfolio/pages/p18.jpg"],
      },
      {
        eyebrow: "02 / INTERACTION",
        title: "探索更自然的首页信息组织",
        description:
          "围绕内容卡片、提问入口与角色反馈进行多轮方案对比，在信息效率、亲和感和操作聚焦之间寻找平衡。",
        images: ["/portfolio/pages/p19.jpg", "/portfolio/pages/p20.jpg"],
      },
      {
        eyebrow: "03 / VISUAL",
        title: "用轻量视觉强化智能感知",
        description:
          "通过渐变色、柔和光感和克制的动态反馈建立 AI 产品氛围，同时保持学习场景需要的清晰度与可信度。",
        images: ["/portfolio/pages/p21.jpg"],
      },
    ],
  },
  {
    slug: "fan-benefits",
    number: "02",
    title: "百度粉丝权益体系及签到日历",
    englishTitle: "Baidu Fan Benefits & Check-in Calendar",
    category: "粉丝体验 / 权益体系 / 移动端",
    year: "2026",
    accent: "#ff8759",
    coverImage: "/portfolio/pages/p03.jpg",
    intro:
      "围绕粉丝与明星关系链，重构权益触达、等级成长与签到机制，让分散的互动行为形成可感知、可持续的陪伴体验。",
    role: "UX / UI Designer",
    scope: "需求分析、竞品研究、体验策略、交互设计、视觉呈现",
    sections: [
      {
        eyebrow: "01 / DEFINE",
        title: "从业务目标到用户价值",
        description:
          "项目从粉丝使用动机与现有权益断点出发，梳理核心任务、增长目标及关键体验指标，明确“提升权益感知、降低参与门槛、加强情感连接”的设计方向。",
        images: ["/portfolio/pages/p04.jpg", "/portfolio/pages/p05.jpg"],
      },
      {
        eyebrow: "02 / RESEARCH",
        title: "让分散的权益形成完整链路",
        description:
          "通过竞品机制对比与典型行为拆解，定位等级、补签、送花与签到日历之间的关系，并将复杂规则转译成清晰的用户路径。",
        images: ["/portfolio/pages/p06.jpg", "/portfolio/pages/p07.jpg", "/portfolio/pages/p08.jpg"],
      },
      {
        eyebrow: "03 / EXPERIENCE",
        title: "建立更有陪伴感的粉丝体验",
        description:
          "优化粉丝权益入口和成长反馈，新增签到日历视图，并升级送花弹窗、彩蛋反馈与信息层级，在效率与情感表达之间取得平衡。",
        images: [
          "/portfolio/pages/p10.jpg",
          "/portfolio/pages/p11.jpg",
          "/portfolio/pages/p12.jpg",
          "/portfolio/pages/p13.jpg",
          "/portfolio/pages/p14.jpg",
          "/portfolio/pages/p15.jpg",
          "/portfolio/pages/p16.jpg",
        ],
      },
    ],
  },
  {
    slug: "wenxin-tutor",
    number: "03",
    title: "AI 伴学文心老师",
    englishTitle: "Baidu AI Tutor · Wenxin",
    category: "AI 教育 / 对话体验 / 移动端",
    year: "2026",
    accent: "#9d78ff",
    coverImage: "/portfolio/pages/p22.jpg",
    intro:
      "将 AI 能力转化为亲切、可信的伴学体验，围绕首页人格化表达、思考过程、语音对话与学习资料沉淀，构建完整的学习陪伴链路。",
    role: "UX / UI Designer",
    scope: "概念设计、体验框架、对话交互、视觉方案、动效规范",
    sections: [
      {
        eyebrow: "01 / PERSONA",
        title: "先建立关系，再开始学习",
        description:
          "首页以“文心老师”的人格化形象作为体验锚点，通过轻量问候、动态提示与可变状态建立亲和力，让 AI 不只是工具，而是一位随时可以交流的学习伙伴。",
        images: [
          "/portfolio/pages/p18.jpg",
          "/portfolio/pages/p19.jpg",
          "/portfolio/pages/p20.jpg",
          "/portfolio/pages/p21.jpg",
          "/portfolio/pages/p22.jpg",
        ],
      },
      {
        eyebrow: "02 / THINKING",
        title: "把 AI 的思考变得可理解",
        description:
          "围绕思考过程、加载反馈和结果呈现建立统一节奏。用户能够理解系统正在做什么、为什么需要等待，以及下一步可以如何继续。",
        images: ["/portfolio/pages/p23.jpg", "/portfolio/pages/p24.jpg", "/portfolio/pages/p25.jpg"],
      },
      {
        eyebrow: "03 / CONVERSATION",
        title: "从聊天到持续学习闭环",
        description:
          "补全语音形态、长对话、图片保存、入口引导及与 AI 助手协同的细节，让一次问答自然沉淀为可回看、可继续的学习资料。",
        images: [
          "/portfolio/pages/p26.jpg",
          "/portfolio/pages/p27.jpg",
          "/portfolio/pages/p28.jpg",
          "/portfolio/pages/p29.jpg",
          "/portfolio/pages/p30.jpg",
        ],
      },
    ],
  },
  {
    slug: "member-redesign",
    number: "04",
    title: "焕新会员设计语言",
    englishTitle: "Member Badge Redesign",
    category: "会员体系 / 视觉系统 / 品牌体验",
    year: "2026",
    accent: "#ff713f",
    coverImage: "/portfolio/pages/p32.jpg",
    intro:
      "以“闪亮新星”为核心概念，重新定义会员等级、勋章、权益卡片与购买页面的视觉语言，让成长身份更鲜明、会员价值更可感知。",
    role: "UX / UI Designer",
    scope: "视觉概念、图标规范、等级命名、权益卡片、购买页设计",
    sections: [
      {
        eyebrow: "01 / LANGUAGE",
        title: "从等级数字到身份表达",
        description:
          "新的会员语言以星体、节奏与旋律为灵感，通过更具记忆点的等级命名和差异化色彩，为成长体系建立统一的叙事基础。",
        images: ["/portfolio/pages/p31.jpg", "/portfolio/pages/p32.jpg", "/portfolio/pages/p34.jpg"],
      },
      {
        eyebrow: "02 / SYSTEM",
        title: "建立可扩展的视觉资产",
        description:
          "以统一几何母体规范图标、勋章和等级资产，在保持识别度的同时，为后续会员权益和更多业务场景预留扩展空间。",
        images: ["/portfolio/pages/p33.jpg", "/portfolio/pages/p35.jpg", "/portfolio/pages/p37.jpg"],
      },
      {
        eyebrow: "03 / APPLICATION",
        title: "让会员价值在关键场景被看见",
        description:
          "将新视觉系统落地到购买页、等级卡片与完整页面矩阵中，利用头图氛围、层级关系和权益信息强化用户的第一印象与升级意愿。",
        images: ["/portfolio/pages/p36.jpg", "/portfolio/pages/p38.jpg"],
      },
    ],
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export function getNextProject(slug: string) {
  const index = projects.findIndex((project) => project.slug === slug);
  return index >= 0 && index < projects.length - 1 ? projects[index + 1] : null;
}
