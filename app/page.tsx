import { SiteHeader } from "./components/SiteHeader";
import { ProjectExperience } from "./components/ProjectExperience";
import SplashCursor from "./components/SplashCursor";
import { withBasePath } from "./base-path";

const capabilities = ["用户研究", "体验策略", "交互设计", "视觉系统", "移动端 / iPad / Web 适配"];

export default function Home() {
  return (
    <main>
      <SiteHeader />

      <section className="home-hero" id="top" aria-labelledby="hero-title">
        <img
          className="hero-background"
          src={withBasePath("/portfolio/pages/home-hero-background-2026.png")}
          alt=""
          aria-hidden="true"
        />
        <div className="hero-darken" />
        <SplashCursor
          DYE_RESOLUTION={720}
          DENSITY_DISSIPATION={3.2}
          SPLAT_RADIUS={0.18}
          SPLAT_FORCE={5200}
          RAINBOW_MODE={false}
          COLOR="#ff724c"
          COLOR_SECONDARY="#7657ff"
        />
        <div className="light-ribbon ribbon-one" />
        <div className="light-ribbon ribbon-two" />
        <div className="grain" />

        <div className="home-hero-inner shell">
          <div className="hero-topline">
            <span>DESIGN PORTFOLIO</span>
          </div>
          <h1 id="hero-title" className="portfolio-title" aria-label="Portfolio">
            <span>PORTFOLIO</span>
          </h1>
          <div className="hero-composition">
            <p className="hero-cn">移动端增长体验与视觉系统设计</p>
            <div className="hero-role-list">
              <div>
                <span>用户体验设计师</span>
                <strong>UX Designer</strong>
              </div>
              <div>
                <span>作品集</span>
                <strong>Portfolio</strong>
              </div>
              <p><span>UX</span><span>UI</span></p>
            </div>
          </div>
          <nav className="hero-projects" aria-label="首页项目入口">
            <span>项目设计</span>
            <a href={withBasePath("/projects/fan-benefits")}>百度粉丝成长与签到激励体系</a>
            <a href={withBasePath("/projects/wenxin-tutor")}>百度AI伴学文心老师</a>
            <a href={withBasePath("/projects/member-redesign")}>会员勋章重构设计</a>
          </nav>
        </div>
      </section>

      <section className="profile-section" id="about" aria-labelledby="about-title">
        <div className="section-marker shell">
          <span>01 / ABOUT</span>
          <span>ZHU XINGMENG</span>
        </div>
        <div className="profile-layout shell">
          <figure className="portfolio-portrait">
            <div className="portrait-frame">
              <img src={withBasePath("/portfolio/portrait.jpg")} alt="朱星梦个人肖像" />
            </div>
            <figcaption>PORTRAIT · 2026</figcaption>
          </figure>
          <div className="profile-content">
            <p className="orange-kicker">PERSONAL INTRODUCTION</p>
            <h2 id="about-title">
              用扎实的体验逻辑，
              <br />创造<span>有温度</span>的界面。
            </h2>
            <p className="profile-lead">
              我是朱星梦，一名专注于移动端产品体验与视觉呈现的 UX/UI 设计师。
              关注从需求理解、方案设计到交付落地的完整流程，也具备 iPad 与网页端适配经验。
            </p>
            <p className="profile-body">
              我相信清晰的体验秩序与有记忆点的视觉表达可以同时成立。工作中重视与产品、
              研发的协作沟通，善于从真实用户问题出发，将复杂需求转化为可理解、可执行的设计方案。
            </p>
            <div className="profile-ai-note">
              <span>AI COLLABORATION</span>
              <p>
                我是一名关注用户体验与AI协作的UX/UI设计师。除了用户研究、场景分析、交互设计和视觉设计，
                我也在探索如何将AI融入完整设计流程。我能够搭建面向设计任务的AI Skills，将研究方法、执行规则、
                证据约束和输出模板沉淀为可复用工作流，并使用AI辅助视觉探索和交互原型开发。对我而言，AI不是替代
                设计判断的工具，而是提升研究效率、扩大方案探索范围并加速验证的设计协作者。
              </p>
            </div>
            <div className="capability-list" aria-label="专业能力">
              {capabilities.map((capability, index) => (
                <span key={capability}><small>0{index + 1}</small>{capability}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="resume-strip shell">
          <div className="resume-title">
            <p className="orange-kicker">EXPERIENCE &amp; EDUCATION</p>
            <h3>从学习到真实业务，<br />持续扩展设计边界。</h3>
          </div>
          <div className="resume-list">
            <article>
              <time>工作经历</time>
              <div><h4>2025 — 2026 · 百度 · 搜索垂页及垂类体验设计组</h4><p>阿拉丁及创新搜索组 · UX/UI 设计</p></div>
              <span>WORK</span>
            </article>
            <article>
              <time>在校经历</time>
              <div><h4>2021 — 2025 · 长春科技学院 · 视觉艺术学院</h4><p>媒体交互设计 · UI / UX · 全日制本科</p></div>
              <span>EDU</span>
            </article>
            <article>
              <time>爱好</time>
              <div><h4>旅行 · 户外运动 · 手工 · 摄影</h4><p>从艺术、空间与日常生活中持续积累设计感知。</p></div>
              <span>LIFE</span>
            </article>
          </div>
        </div>
      </section>

      <section className="work-index" id="work" aria-labelledby="work-title">
        <div className="section-marker shell marker-dark">
          <span>02 / SELECTED PROJECTS</span>
          <span>FOUR CASE STUDIES · UX / UI</span>
        </div>
        <div className="work-index-heading shell">
          <h2 id="work-title">SELECTED PROJECTS</h2>
          <div className="work-heading-bottom">
            <strong>项目经历</strong>
            <p>从 AI 应用、粉丝关系、智能教育到会员体系，呈现我对体验策略、交互细节和视觉系统的完整思考。点击任一项目，进入独立案例。</p>
          </div>
        </div>

        <ProjectExperience />
      </section>

      <section className="home-contact" id="thanks" aria-labelledby="contact-title">
        <div className="light-ribbon footer-ribbon" />
        <div className="home-contact-inner shell">
          <p className="orange-kicker">END OF PORTFOLIO · 2026</p>
          <h2 id="contact-title">THANK<br /><span>YOU.</span></h2>
          <div className="home-contact-links">
            <div className="footer-contact-stack">
              <a href="mailto:3495386475@qq.com"><span><small>邮箱</small>3495386475@qq.com</span><b>↗</b></a>
              <p><span><small>微信 / 手机</small>15755860966</span><b>＋</b></p>
            </div>
            <a href={withBasePath("/downloads/zhu-xingmeng-resume.png")} download="朱星梦-产品设计师简历.png">
              下载简历 <b>↓</b>
            </a>
          </div>
          <div className="footer-meta">
            <span>朱星梦 · UX/UI DESIGNER</span>
            <span>© 2026 PORTFOLIO</span>
          </div>
        </div>
      </section>
    </main>
  );
}
