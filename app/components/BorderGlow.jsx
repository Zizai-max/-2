"use client";

import { useCallback, useEffect, useRef } from "react";
import "./BorderGlow.css";

function parseHSL(value) {
  const match = value.match(/([\d.]+)\s*([\d.]+)%?\s*([\d.]+)%?/);
  if (!match) return { h: 20, s: 88, l: 68 };
  return { h: Number(match[1]), s: Number(match[2]), l: Number(match[3]) };
}

function glowVariables(glowColor, intensity) {
  const { h, s, l } = parseHSL(glowColor);
  const levels = [100, 60, 45, 30, 18, 10];
  const keys = ["", "-60", "-45", "-30", "-18", "-10"];
  return Object.fromEntries(levels.map((opacity, index) => [
    `--glow-color${keys[index]}`,
    `hsl(${h}deg ${s}% ${l}% / ${Math.min(opacity * intensity, 100)}%)`,
  ]));
}

export default function BorderGlow({
  children,
  className = "",
  edgeSensitivity = 28,
  glowColor = "18 90 68",
  backgroundColor = "#111111",
  borderRadius = 32,
  glowRadius = 28,
  glowIntensity = 0.82,
  coneSpread = 24,
  animated = false,
  colors = ["#ff8454", "#b06cff", "#ffbf77"],
  fillOpacity = 0.28,
}) {
  const cardRef = useRef(null);

  const updatePointer = useCallback((event) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const dx = x - centerX;
    const dy = y - centerY;
    const kx = dx === 0 ? Infinity : centerX / Math.abs(dx);
    const ky = dy === 0 ? Infinity : centerY / Math.abs(dy);
    const edge = Math.min(Math.max(1 / Math.min(kx, ky), 0), 1);
    let angle = Math.atan2(dy, dx) * (180 / Math.PI) + 90;
    if (angle < 0) angle += 360;
    card.style.setProperty("--edge-proximity", (edge * 100).toFixed(3));
    card.style.setProperty("--cursor-angle", `${angle.toFixed(3)}deg`);
  }, []);

  useEffect(() => {
    if (!animated || !cardRef.current) return undefined;
    const card = cardRef.current;
    card.classList.add("sweep-active");
    card.style.setProperty("--edge-proximity", "100");
    card.style.setProperty("--cursor-angle", "210deg");
    const timer = window.setTimeout(() => card.classList.remove("sweep-active"), 1500);
    return () => window.clearTimeout(timer);
  }, [animated]);

  const gradientVars = {
    "--gradient-one": `radial-gradient(at 80% 55%, ${colors[0]} 0px, transparent 52%)`,
    "--gradient-two": `radial-gradient(at 15% 12%, ${colors[1]} 0px, transparent 52%)`,
    "--gradient-three": `radial-gradient(at 50% 95%, ${colors[2]} 0px, transparent 52%)`,
  };

  return (
    <div
      ref={cardRef}
      onPointerMove={updatePointer}
      className={`border-glow-card ${className}`}
      style={{
        "--card-bg": backgroundColor,
        "--edge-sensitivity": edgeSensitivity,
        "--border-radius": `${borderRadius}px`,
        "--glow-padding": `${glowRadius}px`,
        "--cone-spread": coneSpread,
        "--fill-opacity": fillOpacity,
        ...glowVariables(glowColor, glowIntensity),
        ...gradientVars,
      }}
    >
      <span className="edge-light" />
      <div className="border-glow-inner">{children}</div>
    </div>
  );
}
