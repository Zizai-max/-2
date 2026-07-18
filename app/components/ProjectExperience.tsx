"use client";

import type { CSSProperties } from "react";
import { useEffect, useState } from "react";
import { projects } from "../site-data";
import BorderGlow from "./BorderGlow";

export function ProjectExperience() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const activeProject = activeIndex === null ? null : projects[activeIndex];

  useEffect(() => {
    if (activeIndex === null) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveIndex(null);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [activeIndex]);

  const openProject = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <>
      <div className="project-entry-list shell">
        {projects.map((project, index) => (
          <BorderGlow
            key={project.slug}
            className="project-glow"
            glowColor={index % 2 === 0 ? "18 92 68" : "264 86 72"}
            colors={index % 2 === 0
              ? ["#ff8454", "#a56cff", "#ffc07b"]
              : ["#9d78ff", "#ff6f91", "#63b8ff"]}
            animated={index === 0}
          >
            <button className="project-entry" type="button" onClick={() => openProject(index)}>
              <div className="entry-image">
                <img src={project.coverImage} alt="" aria-hidden="true" />
                <span className="entry-overlay" />
              </div>
              <span className={`entry-copy${project.workflowGroups ? " entry-copy-workflow" : ""}`}>
                <span className="entry-number">{project.number} / {project.year}</span>
                <span className="entry-text">
                  <span className="entry-category">{project.category}</span>
                  <strong>{project.title}</strong>
                  <span>{project.englishTitle}</span>
                </span>
                {project.workflowGroups ? (
                  <span className="entry-workflow">
                    <span className="entry-skill-tags">
                      {project.skillTags?.map((tag) => <b key={tag}>{tag}</b>)}
                    </span>
                    {project.workflowGroups.map((group) => (
                      <span className="entry-workflow-group" key={group.title}>
                        <strong>{group.title}</strong>
                        <small>{group.items.join(" · ")}</small>
                      </span>
                    ))}
                  </span>
                ) : null}
                <span className="entry-arrow" aria-hidden="true">↗</span>
              </span>
            </button>
          </BorderGlow>
        ))}
      </div>

      {activeProject && activeIndex !== null ? (
        <div
          className="project-viewer"
          role="dialog"
          aria-modal="true"
          aria-label={`${activeProject.title}项目详情`}
          style={{ "--project-accent": activeProject.accent } as CSSProperties}
        >
          <div className="viewer-toolbar">
            <button type="button" onClick={() => setActiveIndex(null)} aria-label="返回项目入口">← 返回项目入口</button>
            <span>{activeProject.number} / {String(projects.length).padStart(2, "0")} · PROJECT VIEW</span>
            <button type="button" onClick={() => setActiveIndex(null)} aria-label="关闭项目详情">CLOSE ×</button>
          </div>

          <div className="viewer-scroll">
            <section className="viewer-hero">
              <img className="viewer-hero-image" src={activeProject.coverImage} alt="" aria-hidden="true" />
              <div className="viewer-hero-shade" />
              <div className="viewer-hero-inner shell">
                <p>{activeProject.category}</p>
                <h2>{activeProject.title}</h2>
                <span>{activeProject.englishTitle}</span>
                <div className="viewer-meta">
                  <div><small>ROLE</small><b>{activeProject.role}</b></div>
                  <div><small>SCOPE</small><b>{activeProject.scope}</b></div>
                  <div><small>YEAR</small><b>{activeProject.year}</b></div>
                </div>
              </div>
            </section>

            <section className="viewer-overview shell">
              <p className="orange-kicker">PROJECT OVERVIEW</p>
              <p>{activeProject.intro}</p>
            </section>

            {activeProject.workflowGroups ? (
              <section className="project-workflow shell">
                <div className="project-workflow-head">
                  <p className="orange-kicker">AI DESIGN WORKFLOW</p>
                  <h3>让 AI 成为可复用的设计协作者</h3>
                  <p>从研究、体验定义到视觉与原型开发，将 AI 的介入点沉淀为清晰、可复用、可验证的设计流程。</p>
                </div>
                <div className="workflow-skill-tags">
                  {activeProject.skillTags?.map((tag) => <span key={tag}>{tag}</span>)}
                </div>
                <div className="workflow-matrix">
                  {activeProject.workflowGroups.map((group, groupIndex) => (
                    <article key={group.title}>
                      <span>0{groupIndex + 1}</span>
                      <h4>{group.title}</h4>
                      <ul>{group.items.map((item) => <li key={item}>{item}</li>)}</ul>
                    </article>
                  ))}
                </div>
              </section>
            ) : null}

            {activeProject.sections.map((section, sectionIndex) => (
              <section className="viewer-section" key={section.eyebrow}>
                <div className="viewer-section-head shell">
                  <p className="orange-kicker">{section.eyebrow}</p>
                  <h3>{section.title}</h3>
                  <p>{section.description}</p>
                </div>
                <div className={`viewer-gallery shell${activeProject.galleryStyle ? ` gallery-${activeProject.galleryStyle}` : ""}`}>
                  {section.images.map((image, imageIndex) => (
                    <figure className={imageIndex === 0 && section.images.length > 2 ? "viewer-featured" : ""} key={image}>
                      <img src={image} alt={`${activeProject.title} - ${section.title} ${imageIndex + 1}`} />
                      <figcaption>{String(sectionIndex + 1).padStart(2, "0")}.{String(imageIndex + 1).padStart(2, "0")}</figcaption>
                    </figure>
                  ))}
                </div>
              </section>
            ))}

          </div>
        </div>
      ) : null}
    </>
  );
}
