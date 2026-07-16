"use client";

import type { CSSProperties } from "react";
import { useEffect, useState } from "react";
import { projects } from "../site-data";

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

  const closeToThanks = () => {
    setActiveIndex(null);
    window.setTimeout(() => document.querySelector("#thanks")?.scrollIntoView({ behavior: "smooth" }), 50);
  };

  return (
    <>
      <div className="project-entry-list shell">
        {projects.map((project, index) => (
          <button className="project-entry" type="button" onClick={() => openProject(index)} key={project.slug}>
            <div className="entry-image">
              <img src={project.coverImage} alt="" aria-hidden="true" />
              <span className="entry-overlay" />
            </div>
            <span className="entry-copy">
              <span className="entry-number">{project.number} / {project.year}</span>
              <span className="entry-text">
                <span className="entry-category">{project.category}</span>
                <strong>{project.title}</strong>
                <span>{project.englishTitle}</span>
              </span>
              <span className="entry-arrow" aria-hidden="true">↗</span>
            </span>
          </button>
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

            {activeProject.sections.map((section, sectionIndex) => (
              <section className="viewer-section" key={section.eyebrow}>
                <div className="viewer-section-head shell">
                  <p className="orange-kicker">{section.eyebrow}</p>
                  <h3>{section.title}</h3>
                  <p>{section.description}</p>
                </div>
                <div className="viewer-gallery shell">
                  {section.images.map((image, imageIndex) => (
                    <figure className={imageIndex === 0 && section.images.length > 2 ? "viewer-featured" : ""} key={image}>
                      <img src={image} alt={`${activeProject.title} - ${section.title} ${imageIndex + 1}`} />
                      <figcaption>{String(sectionIndex + 1).padStart(2, "0")}.{String(imageIndex + 1).padStart(2, "0")}</figcaption>
                    </figure>
                  ))}
                </div>
              </section>
            ))}

            <section className="viewer-next">
              <div className="shell">
                <p>{activeIndex < projects.length - 1 ? "NEXT PROJECT" : "END OF PROJECTS"}</p>
                {activeIndex < projects.length - 1 ? (
                  <button type="button" onClick={() => setActiveIndex(activeIndex + 1)}>
                    <span>{String(activeIndex + 2).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}</span>
                    <strong>{projects[activeIndex + 1].title}</strong>
                    <b>点击继续 ↗</b>
                  </button>
                ) : (
                  <button type="button" onClick={closeToThanks}>
                    <span>THANK YOU</span>
                    <strong>谢谢观看</strong>
                    <b>进入收尾页 ↗</b>
                  </button>
                )}
              </div>
            </section>
          </div>
        </div>
      ) : null}
    </>
  );
}
