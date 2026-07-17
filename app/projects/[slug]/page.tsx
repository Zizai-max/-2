import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteHeader } from "../../components/SiteHeader";
import { getProject, projects } from "../../site-data";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  return project
    ? { title: project.title, description: project.intro }
    : { title: "项目未找到" };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const projectStyle = { "--project-accent": project.accent } as CSSProperties;

  return (
    <main className="case-page" style={projectStyle}>
      <SiteHeader variant="solid" />

      <section className="case-hero">
        <div className="case-hero-bg">
          <img src={project.coverImage} alt="" aria-hidden="true" />
        </div>
        <div className="case-hero-shade" />
        <div className="case-hero-inner shell">
          <div className="case-breadcrumb">
            <Link href="/#work">← ALL PROJECTS</Link>
            <span>{project.number} / 04</span>
          </div>
          <div className="case-title-block">
            <p>{project.category}</p>
            <h1>{project.title}</h1>
            <span>{project.englishTitle}</span>
          </div>
          <div className="case-hero-meta">
            <div><span>ROLE</span><b>{project.role}</b></div>
            <div><span>SCOPE</span><b>{project.scope}</b></div>
            <div><span>YEAR</span><b>{project.year}</b></div>
          </div>
        </div>
      </section>

      <section className="case-overview shell">
        <p className="orange-kicker">PROJECT OVERVIEW</p>
        <p className="case-intro">{project.intro}</p>
        <div className="overview-aside">
          <span>CASE {project.number}</span>
          <p>从问题定义到设计落地，以下内容呈现项目中的关键判断与方案演进。</p>
        </div>
      </section>

      {project.workflowGroups ? (
        <section className="project-workflow shell">
          <div className="project-workflow-head">
            <p className="orange-kicker">AI DESIGN WORKFLOW</p>
            <h3>让 AI 成为可复用的设计协作者</h3>
            <p>从研究、体验定义到视觉与原型开发，将 AI 的介入点沉淀为清晰、可复用、可验证的设计流程。</p>
          </div>
          <div className="workflow-skill-tags">
            {project.skillTags?.map((tag) => <span key={tag}>{tag}</span>)}
          </div>
          <div className="workflow-matrix">
            {project.workflowGroups.map((group, groupIndex) => (
              <article key={group.title}>
                <span>0{groupIndex + 1}</span>
                <h4>{group.title}</h4>
                <ul>{group.items.map((item) => <li key={item}>{item}</li>)}</ul>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      <div className="case-sections">
        {project.sections.map((section, sectionIndex) => (
          <section className="case-section" key={section.eyebrow}>
            <div className="case-section-head shell">
              <p className="orange-kicker">{section.eyebrow}</p>
              <h2>{section.title}</h2>
              <p>{section.description}</p>
            </div>
            <div className={`case-gallery shell gallery-${Math.min(section.images.length, 3)}`}>
              {section.images.map((image, imageIndex) => (
                <figure
                  className={imageIndex === 0 && section.images.length > 2 ? "gallery-featured" : ""}
                  key={image}
                >
                  <img src={image} alt={`${project.title} - ${section.title}设计展示 ${imageIndex + 1}`} />
                  <figcaption>{String(sectionIndex + 1).padStart(2, "0")}.{String(imageIndex + 1).padStart(2, "0")}</figcaption>
                </figure>
              ))}
            </div>
          </section>
        ))}
      </div>

    </main>
  );
}
