import type { Metadata } from "next";
import { withBasePath } from "./base-path";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.SITE_URL ?? "http://localhost:3000"),
  title: {
    default: "朱星梦 — UX / UI Designer",
    template: "%s · 朱星梦作品集",
  },
  description: "朱星梦的 UX/UI 设计作品集，包含百度粉丝权益、AI 伴学文心老师与会员体验焕新三个项目。",
  icons: { icon: withBasePath("/favicon.svg"), shortcut: withBasePath("/favicon.svg") },
  openGraph: {
    title: "朱星梦 — UX / UI Designer",
    description: "移动端产品体验与视觉界面 · Portfolio 2026",
    images: [{ url: withBasePath("/og.png"), width: 1732, height: 909, alt: "朱星梦 UX/UI 设计作品集" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "朱星梦 — UX / UI Designer",
    description: "Designing beyond the screen.",
    images: [withBasePath("/og.png")],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
