export type ProjectSection = {
  eyebrow: string;
  title: string;
  description: string;
  images: string[];
  galleryStyle?: "three-up" | "contained";
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
  galleryStyle?: "contained";
  intro: string;
  role: string;
  scope: string;
  skillTags?: string[];
  workflowGroups?: Array<{
    title: string;
    items: string[];
  }>;
  sections: ProjectSection[];
};

export const projects: Project[] = [
  {
    slug: "ai-application",
    number: "01",
    title: "AI Workflow Designer",
    englishTitle: "AI-assisted Experience Design",
    category: "AI 应用 / 智能交互 / 产品体验",
    year: "2026",
    accent: "#b58cff",
    coverImage: "/portfolio/pages/p18.jpg",
    intro:
      "围绕 AI 学习应用的首页体验，探索人格化角色、任务推荐与多模态提问的组合方式，让智能能力以更轻松、更易理解的方式进入真实学习场景。",
    role: "UX / UI Designer",
    scope: "AI 产品概念、首页框架、交互探索、视觉方案、体验验证",
    skillTags: ["AI工作流", "AI skills搭建", "vibe coding"],
    workflowGroups: [
      {
        title: "UX设计",
        items: ["前期需求分析", "用户研究辅助", "竞品分析", "用户场景与交互流程", "可用性测试辅助", "UX文案情感化"],
      },
      {
        title: "UI设计",
        items: ["视觉探索", "界面方案生成", "图片与素材处理", "设计稿转代码"],
      },
    ],
    sections: [
      {
        eyebrow: "",
        title: "AI协作设计工作流实践",
        description:
          "从 UX Research Skill 的研究方法沉淀，到 LiblibAI 辅助视觉探索，再到 Vibe Coding 快速完成交互原型；进一步拆解 Agent 模型与设计生产链路，将 AI 能力组织为可复用、可验证的完整设计协作流程。",
        galleryStyle: "contained",
        images: [
          "/portfolio/ai-application/01-ux-research-skill.png",
          "/portfolio/ai-application/02-liblib-image.png",
          "/portfolio/ai-application/03-vibe-coding.png",
          "/portfolio/ai-application/04-design-production-workflow.png",
          "/portfolio/ai-application/05-agent-model.png",
        ],
      },
    ],
  },
  {
    slug: "fan-benefits",
    number: "02",
    title: "粉丝成长与签到激励体系升级",
    englishTitle: "From Task-driven Flower Gifting to a Sustainable Fan Relationship System",
    category: "粉丝体验 / 权益体系 / 移动端",
    year: "2026",
    accent: "#ff8759",
    coverImage: "/portfolio/pages/p03.jpg",
    galleryStyle: "contained",
    intro:
      "围绕粉丝与明星关系链，重构权益触达、等级成长与签到机制，让分散的互动行为形成可感知、可持续的陪伴体验。",
    role: "UX / UI Designer",
    scope: "需求分析、竞品研究、体验策略、交互设计、视觉呈现",
    sections: [
      {
        eyebrow: "01 / USER SCENARIOS",
        title: "六个典型用户场景",
        description:
          "从粉丝与明星互动的真实动机出发，归纳权益获取、内容参与、日常签到与情感表达等典型场景，为后续体验框架建立清晰的用户语境。",
        images: ["/portfolio/fan-growth/01-user-scenarios.png"],
      },
      {
        eyebrow: "02 / USER JOURNEY",
        title: "用户旅程地图",
        description:
          "沿着用户从进入、理解、参与到持续回访的完整路径，梳理关键行为、情绪变化和体验断点，定位签到激励与粉丝成长体系的核心机会。",
        images: ["/portfolio/fan-growth/02-user-journey.png"],
      },
      {
        eyebrow: "03 / COMPETITIVE RESEARCH",
        title: "从市场全景到重点竞品",
        description:
          "先通过竞品全景对比建立市场认知，再聚焦代表性产品拆解关键 UX 机制，为权益层级、激励节奏与情感反馈提供设计依据。",
        images: [
          "/portfolio/fan-growth/03-competitor-landscape.png",
          "/portfolio/fan-growth/04-competitor-ux.png",
        ],
      },
      {
        eyebrow: "04 / SOLUTION",
        title: "粉丝成长与签到激励体系升级",
        description:
          "将前期研究结论收束为完整方案，从任务驱动的送花行为出发，重构成长等级、签到反馈与长期关系维护机制，形成更可持续的粉丝体验系统。",
        images: ["/portfolio/fan-growth/05-fan-growth-system.png"],
      },
      {
        eyebrow: "05 / GROWTH PATH",
        title: "粉丝成长脉络",
        description:
          "梳理粉丝从初次互动到持续参与的成长路径，明确不同阶段的目标、行为与反馈，让等级变化与关系沉淀形成可理解的长期脉络。",
        images: ["/portfolio/fan-growth/06-fan-growth-path.png"],
      },
      {
        eyebrow: "06 / KEY INTERACTION",
        title: "送花弹窗体验设计",
        description:
          "围绕送花这一高频情感表达行为，优化信息层级、操作反馈与视觉氛围，使关键互动既保持效率，也具备更清晰的情绪价值。",
        images: [
          "/portfolio/fan-growth/07-flower-popup.png",
          "/portfolio/fan-growth/07-signin-calendar.png",
          "/portfolio/fan-growth/07-fan-followup-01.png",
          "/portfolio/fan-growth/07-fan-followup-02.png",
          "/portfolio/fan-growth/07-fan-followup-03.png",
          "/portfolio/fan-growth/07-fan-followup-04.png",
        ],
      },
      {
        eyebrow: "07 / OTHER DIRECTIONS",
        title: "其他方案探索",
        description:
          "在核心方案之外保留不同的信息组织与视觉表达方向，通过并行探索对比体验重点，为最终设计判断提供更完整的方案依据。",
        images: ["/portfolio/fan-growth/08-other-solutions.png"],
      },
      {
        eyebrow: "08 / AI VISUAL EXPLORATION",
        title: "AI探索UI视觉设计",
        description:
          "围绕粉丝成长、签到激励与长期关系建立，使用 AI 并行探索不同的界面视觉方向。从任务成长、陪伴叙事到游戏化与数据反馈，在统一业务目标下比较信息密度、情感氛围与激励感知，辅助最终视觉判断。",
        galleryStyle: "three-up",
        images: [
          "/portfolio/fan-growth/ai-ui-exploration/visual-01.png",
          "/portfolio/fan-growth/ai-ui-exploration/visual-02.png",
          "/portfolio/fan-growth/ai-ui-exploration/visual-03.png",
          "/portfolio/fan-growth/ai-ui-exploration/visual-04.png",
          "/portfolio/fan-growth/ai-ui-exploration/visual-05.png",
          "/portfolio/fan-growth/ai-ui-exploration/visual-06.png",
          "/portfolio/fan-growth/ai-ui-exploration/visual-07.png",
          "/portfolio/fan-growth/ai-ui-exploration/visual-08.png",
          "/portfolio/fan-growth/ai-ui-exploration/visual-09.png",
          "/portfolio/fan-growth/ai-ui-exploration/visual-10.png",
          "/portfolio/fan-growth/ai-ui-exploration/visual-11.png",
          "/portfolio/fan-growth/ai-ui-exploration/visual-12.png",
          "/portfolio/fan-growth/ai-ui-exploration/visual-13.png",
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
        eyebrow: "01 / TRUST & ONBOARDING",
        title: "从首次理解到角色信任",
        description:
          "以清晰的首页价值表达和人格化的文心老师作为体验起点，降低用户理解 AI 能力的门槛。通过轻量问候、任务入口与状态反馈，让用户在第一次进入时就知道可以做什么，并逐步建立对学习伙伴的信任。",
        galleryStyle: "contained",
        images: [
          "/portfolio/wenxin-tutor/01.png",
          "/portfolio/wenxin-tutor/02.png",
          "/portfolio/wenxin-tutor/03.png",
          "/portfolio/wenxin-tutor/04.png",
          "/portfolio/wenxin-tutor/05.png",
        ],
      },
      {
        eyebrow: "02 / INTELLIGENT INTERACTION",
        title: "让智能交互过程清晰可控",
        description:
          "围绕提问、思考、生成与结果反馈建立一致的交互节奏，减少 AI 过程中的不确定感。用户能够理解系统正在做什么、为什么需要等待，并在每一步获得明确的继续路径与可恢复操作。",
        galleryStyle: "contained",
        images: [
          "/portfolio/wenxin-tutor/06.png",
          "/portfolio/wenxin-tutor/07.png",
          "/portfolio/wenxin-tutor/08.png",
          "/portfolio/wenxin-tutor/09.png",
          "/portfolio/wenxin-tutor/10.png",
        ],
      },
      {
        eyebrow: "03 / LEARNING LOOP",
        title: "从一次问答到持续学习闭环",
        description:
          "将对话、语音、图片与学习资料组织为可回看、可继续的学习记录，并通过入口引导与跨场景衔接支持后续任务。让每一次提问不止解决当下问题，也能沉淀为长期可复用的学习资产。",
        galleryStyle: "contained",
        images: [
          "/portfolio/wenxin-tutor/11.png",
          "/portfolio/wenxin-tutor/12.png",
          "/portfolio/wenxin-tutor/13.png",
          "/portfolio/wenxin-tutor/14.png",
          "/portfolio/wenxin-tutor/15.png",
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
        eyebrow: "MEMBER EXPERIENCE SYSTEM",
        title: "会员权益体验与视觉系统",
        description:
          "从权益展示、价值感知与福利传达到购买转化、购后承接和临期召回，完整呈现会员体验链路；同时沉淀图标规范、等级差异化与标题字体设计，建立统一且可扩展的会员视觉语言。",
        galleryStyle: "contained",
        images: [
          "/portfolio/member-redesign/00-process-01.png",
          "/portfolio/member-redesign/00-process-02.png",
          "/portfolio/member-redesign/00-process-03.png",
          "/portfolio/member-redesign/00-process-04.png",
          "/portfolio/member-redesign/00-process-05.png",
          "/portfolio/member-redesign/00-process-06.png",
          "/portfolio/member-redesign/00-process-07.png",
          "/portfolio/member-redesign/00-process-08.png",
          "/portfolio/member-redesign/01-middle-09.png",
          "/portfolio/member-redesign/01-middle-10.png",
          "/portfolio/member-redesign/01-middle-11.png",
          "/portfolio/member-redesign/01-middle-12.png",
          "/portfolio/member-redesign/01-middle-13.png",
          "/portfolio/member-redesign/01-middle-14.png",
          "/portfolio/member-redesign/01-middle-15.png",
          "/portfolio/member-redesign/01-middle-16.png",
          "/portfolio/member-redesign/01-middle-17.png",
          "/portfolio/member-redesign/01-middle-18.png",
          "/portfolio/member-redesign/01-middle-19.png",
          "/portfolio/member-redesign/01-middle-20.png",
          "/portfolio/member-redesign/10-followup-21.png",
          "/portfolio/member-redesign/10-followup-22.png",
          "/portfolio/member-redesign/10-followup-23.png",
          "/portfolio/member-redesign/10-followup-24.png",
          "/portfolio/member-redesign/10-followup-25.png",
          "/portfolio/member-redesign/10-followup-26.png",
          "/portfolio/member-redesign/10-followup-27.png",
          "/portfolio/member-redesign/10-followup-28.png",
          "/portfolio/member-redesign/10-followup-29.png",
          "/portfolio/member-redesign/10-followup-30.png",
          "/portfolio/member-redesign/10-followup-31.png",
          "/portfolio/member-redesign/10-followup-32.png",
        ],
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
