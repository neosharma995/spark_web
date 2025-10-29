"use client";

import { useEffect, useRef } from "react";

export default function HeroParticles() {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let w, h, raf;
    const DPR = Math.min(window.devicePixelRatio || 1, 2);

    const PARTICLES = 160; // adjust density
    const dots = [];

    function resize() {
      w = canvas.width = Math.floor(window.innerWidth * DPR);
      h = canvas.height = Math.floor(window.innerHeight * DPR);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
    }

    function init() {
      dots.length = 0;
      for (let i = 0; i < PARTICLES; i++) {
        dots.push({
          x: Math.random() * w,
          y: Math.random() * h,
          r: (Math.random() * 1.2 + 0.6) * DPR,
          dx: (Math.random() - 0.5) * 0.35 * DPR,
          dy: (Math.random() - 0.5) * 0.35 * DPR,
          a: Math.random() * 0.5 + 0.2, // alpha
        });
      }
    }

    function draw() {
      ctx.clearRect(0, 0, w, h);

      // faint vignette/gradient
      const g = ctx.createRadialGradient(w * 0.5, h * 0.4, 0, w * 0.5, h * 0.4, Math.max(w, h) * 0.7);
      g.addColorStop(0, "rgba(13,14,18,0.9)");
      g.addColorStop(1, "rgba(5,6,9,1)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);

      ctx.fillStyle = "rgba(255,255,255,0.9)";
      dots.forEach(p => {
        p.x += p.dx;
        p.y += p.dy;
        if (p.x < 0 || p.x > w) p.dx *= -1;
        if (p.y < 0 || p.y > h) p.dy *= -1;

        ctx.globalAlpha = p.a;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(draw);
    }

    const onResize = () => { resize(); init(); };
    resize(); init(); draw();
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return <canvas ref={ref} className="hero-particles" aria-hidden="true" />;
}
