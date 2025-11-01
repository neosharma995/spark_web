"use client";

import { useEffect, useRef } from "react";

export default function HeroParticles() {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w, h, raf;
    const DPR = Math.min(window.devicePixelRatio || 1, 2);

    const PARTICLES = 160; // adjust density
    const dots = [];

    // ---- theme handling ----
    let isLight = false;
    const computeIsLight = () => document.body.classList.contains("light-mode");

    const getTheme = () => {
      if (isLight) {
        return {
          gradientStops: ["rgba(255,255,255,0.95)", "rgba(245,246,248,1)"],
          dotFill: "rgba(10,12,16,1)",
          dotAlphaMin: 0.15,
          dotAlphaMax: 0.35,
        };
      }
      return {
        gradientStops: ["rgba(13,14,18,0.9)", "rgba(5,6,9,1)"],
        dotFill: "rgba(255,255,255,1)",
        dotAlphaMin: 0.2,
        dotAlphaMax: 0.7,
      };
    };

    const bodyObserver = new MutationObserver(() => {
      const newIsLight = computeIsLight();
      if (newIsLight !== isLight) {
        isLight = newIsLight;
        retuneDots();
      }
    });

    function resize() {
      w = canvas.width = Math.floor(window.innerWidth * DPR);
      h = canvas.height = Math.floor(window.innerHeight * DPR);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
    }

    function init() {
      dots.length = 0;
      const { dotAlphaMin, dotAlphaMax } = getTheme();
      for (let i = 0; i < PARTICLES; i++) {
        dots.push({
          x: Math.random() * w,
          y: Math.random() * h,
          r: (Math.random() * 1.2 + 0.6) * DPR,
          dx: (Math.random() - 0.5) * 0.35 * DPR,
          dy: (Math.random() - 0.5) * 0.35 * DPR,
          a: Math.random() * (dotAlphaMax - dotAlphaMin) + dotAlphaMin,
        });
      }
    }

    function retuneDots() {
      const { dotAlphaMin, dotAlphaMax } = getTheme();
      for (let i = 0; i < dots.length; i++) {
        dots[i].a = Math.random() * (dotAlphaMax - dotAlphaMin) + dotAlphaMin;
      }
    }

    function draw() {
      ctx.clearRect(0, 0, w, h);

      const { gradientStops, dotFill } = getTheme();
      const g = ctx.createRadialGradient(
        w * 0.5, h * 0.4, 0,
        w * 0.5, h * 0.4, Math.max(w, h) * 0.7
      );
      g.addColorStop(0, gradientStops[0]);
      g.addColorStop(1, gradientStops[1]);
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);

      ctx.fillStyle = dotFill;
      for (let i = 0; i < dots.length; i++) {
        const p = dots[i];
        p.x += p.dx;
        p.y += p.dy;
        if (p.x < 0 || p.x > w) p.dx *= -1;
        if (p.y < 0 || p.y > h) p.dy *= -1;

        ctx.globalAlpha = p.a;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(draw);
    }

    // boot
    isLight = computeIsLight();
    resize();
    init();
    draw();

    const onResize = () => {
      resize();
      for (let i = 0; i < dots.length; i++) {
        dots[i].x = Math.max(0, Math.min(w, dots[i].x));
        dots[i].y = Math.max(0, Math.min(h, dots[i].y));
      }
    };

    window.addEventListener("resize", onResize);
    bodyObserver.observe(document.body, { attributes: true, attributeFilter: ["class"] });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      bodyObserver.disconnect();
    };
  }, []);

  return <canvas ref={ref} className="hero-particles" aria-hidden="true" />;
}
