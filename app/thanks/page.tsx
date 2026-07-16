import Link from "next/link";

export default function ThanksPage() {
  return (
    <main className="thanks-page">
      <div className="thanks-grid" />
      <div className="light-ribbon thanks-ribbon-one" />
      <div className="light-ribbon thanks-ribbon-two" />
      <div className="grain" />

      <div className="thanks-nav shell">
        <Link className="brand" href="/" aria-label="返回作品集首页">ZX<span>®</span></Link>
        <Link href="/">BACK TO HOME ↗</Link>
      </div>

      <div className="thanks-content shell">
        <p>END OF PORTFOLIO · 2026</p>
        <h1>THANK<br /><span>YOU.</span></h1>
        <div className="thanks-bottom">
          <p>感谢你的时间与观看。<br />期待在下一个项目里，与优秀的团队一起创造新的价值。</p>
          <a href="mailto:3495386475@qq.com">LET&apos;S TALK <b>↗</b></a>
        </div>
      </div>
    </main>
  );
}
