"use client";

import Link from "next/link";
import { useState } from "react";

type SiteHeaderProps = {
  variant?: "overlay" | "solid";
};

export function SiteHeader({ variant = "overlay" }: SiteHeaderProps) {
  const [activeNav, setActiveNav] = useState("top");

  return (
    <header className={`site-header ${variant === "solid" ? "site-header-solid" : ""}`}>
      <Link className="brand" href="/" aria-label="返回作品集首页">
        作品集
      </Link>
      <nav className="desktop-nav" aria-label="主导航">
        <Link className={activeNav === "top" ? "is-active" : ""} onClick={() => setActiveNav("top")} href="/#top">首页封面</Link>
        <Link className={activeNav === "about" ? "is-active" : ""} onClick={() => setActiveNav("about")} href="/#about">个人简介</Link>
        <Link className={activeNav === "work" ? "is-active" : ""} onClick={() => setActiveNav("work")} href="/#work">项目经历</Link>
        <Link className={activeNav === "thanks" ? "is-active" : ""} onClick={() => setActiveNav("thanks")} href="/#thanks">联系与致谢</Link>
      </nav>
      <details className="contact-menu">
        <summary className="contact-chip">
          <span className="status-dot" /> 联系我
        </summary>
        <div className="contact-popover">
          <p>CONTACT</p>
          <a href="mailto:3495386475@qq.com"><small>邮箱</small><span>3495386475@qq.com</span></a>
          <div><small>微信</small><span>3495386475</span></div>
        </div>
      </details>
    </header>
  );
}
