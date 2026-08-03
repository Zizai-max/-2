"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { withBasePath } from "../base-path";

type SiteHeaderProps = {
  variant?: "overlay" | "solid";
};

export function SiteHeader({ variant = "overlay" }: SiteHeaderProps) {
  const [activeNav, setActiveNav] = useState<string | null>(variant === "overlay" ? "top" : null);

  useEffect(() => {
    const sections = ["top", "about", "work", "thanks"]
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section));

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSection = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visibleSection?.target.id) setActiveNav(visibleSection.target.id);
      },
      { rootMargin: "-24% 0px -56%", threshold: [0.05, 0.2, 0.5] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const navItems = [
    { id: "top", label: "首页封面" },
    { id: "about", label: "个人简介" },
    { id: "work", label: "项目经历" },
    { id: "thanks", label: "联系与致谢" },
  ];

  return (
    <header className={`site-header ${variant === "solid" ? "site-header-solid" : ""}`}>
      <Link className="brand" href="/" aria-label="返回作品集首页">
        作品集
      </Link>
      <nav className="desktop-nav" aria-label="主导航">
        {navItems.map((item) => (
          <Link
            key={item.id}
            className={activeNav === item.id ? "is-active" : ""}
            aria-current={activeNav === item.id ? "location" : undefined}
            onClick={() => setActiveNav(item.id)}
            href={`/#${item.id}`}
          >
            {item.label}
          </Link>
        ))}
      </nav>
      <details className="contact-menu">
        <summary className="contact-chip">
          <span className="status-dot" /> 联系我
        </summary>
        <div className="contact-popover">
          <p>CONTACT</p>
          <a href="mailto:3495386475@qq.com"><small>邮箱</small><span>3495386475@qq.com</span></a>
          <div><small>微信 / 手机</small><span>15755860966</span></div>
          <a className="contact-resume" href={withBasePath("/downloads/zhu-xingmeng-resume.png")} download="朱星梦-产品设计师简历.png">
            <small>RESUME</small><span>下载简历 ↓</span>
          </a>
        </div>
      </details>
    </header>
  );
}
