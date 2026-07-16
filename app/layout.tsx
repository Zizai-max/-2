import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.SITE_URL ?? "http://localhost:3000"),
  title: {
    default: "朱星梦 — UX / UI Designer",
    template: "%s · 朱星梦作品集",
  },
  description: "朱星梦的 UX/UI 设计作品集，包含百度粉丝权益、AI 伴学文心老师与会员体验焕新三个项目。",
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
  openGraph: {
    title: "朱星梦 — UX / UI Designer",
    description: "移动端产品体验与视觉界面 · Portfolio 2026",
    images: [{ url: "/og.png", width: 1732, height: 909, alt: "朱星梦 UX/UI 设计作品集" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "朱星梦 — UX / UI Designer",
    description: "Designing beyond the screen.",
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>{children}</body>
    </html>
  );
}
