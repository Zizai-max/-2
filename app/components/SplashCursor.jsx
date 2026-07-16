"use client";

import { useEffect, useRef } from "react";

function hexToRgb(hex) {
  const value = hex.replace("#", "");
  const normalized = value.length === 3 ? value.split("").map((char) => char + char).join("") : value;
  return {
    r: parseInt(normalized.slice(0, 2), 16),
    g: parseInt(normalized.slice(2, 4), 16),
    b: parseInt(normalized.slice(4, 6), 16),
  };
}

export default function SplashCursor({
  DYE_RESOLUTION = 720,
  DENSITY_DISSIPATION = 3.5,
  SPLAT_RADIUS = 0.2,
  SPLAT_FORCE = 6000,
  COLOR_UPDATE_SPEED = 10,
  RAINBOW_MODE = false,
  COLOR = "#ff704c",
  COLOR_SECONDARY = "#7657ff",
}) {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const context = canvas.getContext("2d", { alpha: true });
    if (!context) return undefined;

    let active = true;
    let pointer = { x: 0, y: 0, previousX: 0, previousY: 0, initialized: false };
    let particles = [];
    let hue = 18;
    const primary = hexToRgb(COLOR);
    const secondary = hexToRgb(COLOR_SECONDARY);

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, DYE_RESOLUTION > 900 ? 2 : 1.5);
      canvas.width = Math.max(1, Math.floor(rect.width * ratio));
      canvas.height = Math.max(1, Math.floor(rect.height * ratio));
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    };

    const createSplat = (x, y, forceX = 0, forceY = 0, amount = 7) => {
      for (let index = 0; index < amount; index += 1) {
        const mix = Math.random();
        const color = RAINBOW_MODE
          ? `hsl(${(hue + index * 13) % 360} 92% 66%)`
          : `rgb(${Math.round(primary.r * (1 - mix) + secondary.r * mix)} ${Math.round(primary.g * (1 - mix) + secondary.g * mix)} ${Math.round(primary.b * (1 - mix) + secondary.b * mix)})`;
        particles.push({
          x: x + (Math.random() - 0.5) * 22,
          y: y + (Math.random() - 0.5) * 22,
          vx: forceX * 0.018 + (Math.random() - 0.5) * 1.6,
          vy: forceY * 0.018 + (Math.random() - 0.5) * 1.6,
          radius: 34 + Math.random() * 72 + SPLAT_RADIUS * 70,
          life: 1,
          decay: 0.006 + Math.random() * 0.008 + DENSITY_DISSIPATION * 0.0008,
          color,
        });
      }
      if (particles.length > 110) particles = particles.slice(-110);
    };

    const onPointerMove = (event) => {
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      if (!pointer.initialized) {
        pointer.previousX = x;
        pointer.previousY = y;
        pointer.initialized = true;
      }
      const dx = x - pointer.previousX;
      const dy = y - pointer.previousY;
      pointer = { x, y, previousX: x, previousY: y, initialized: true };
      const strength = Math.min(Math.hypot(dx, dy) * (SPLAT_FORCE / 6000), 34);
      if (strength > 0.8) createSplat(x, y, dx, dy, Math.max(2, Math.round(strength / 5)));
    };

    const onPointerDown = (event) => {
      const rect = canvas.getBoundingClientRect();
      createSplat(event.clientX - rect.left, event.clientY - rect.top, 0, 0, 14);
    };

    const draw = () => {
      if (!active) return;
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      context.clearRect(0, 0, width, height);
      context.globalCompositeOperation = "screen";

      particles.forEach((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.vx *= 0.982;
        particle.vy *= 0.982;
        particle.radius *= 1.004;
        particle.life -= particle.decay;

        const gradient = context.createRadialGradient(
          particle.x,
          particle.y,
          0,
          particle.x,
          particle.y,
          particle.radius,
        );
        gradient.addColorStop(0, particle.color.replace("rgb(", "rgb(").replace(")", ` / ${Math.max(0, particle.life * 0.24)})`));
        gradient.addColorStop(0.42, particle.color.replace("rgb(", "rgb(").replace(")", ` / ${Math.max(0, particle.life * 0.1)})`));
        gradient.addColorStop(1, "transparent");
        context.fillStyle = gradient;
        context.beginPath();
        context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        context.fill();
      });

      particles = particles.filter((particle) => particle.life > 0.02);
      hue = (hue + COLOR_UPDATE_SPEED * 0.02) % 360;
      animationRef.current = requestAnimationFrame(draw);
    };

    resize();
    createSplat(canvas.clientWidth * 0.72, canvas.clientHeight * 0.5, -8, 4, 18);
    createSplat(canvas.clientWidth * 0.32, canvas.clientHeight * 0.72, 7, -3, 14);
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerdown", onPointerDown, { passive: true });
    draw();

    return () => {
      active = false;
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerdown", onPointerDown);
    };
  }, [COLOR, COLOR_SECONDARY, COLOR_UPDATE_SPEED, DENSITY_DISSIPATION, DYE_RESOLUTION, RAINBOW_MODE, SPLAT_FORCE, SPLAT_RADIUS]);

  return (
    <div className="splash-cursor-layer" aria-hidden="true">
      <canvas ref={canvasRef} />
    </div>
  );
}
