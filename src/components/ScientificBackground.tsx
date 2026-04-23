import { useEffect, useRef, useState } from "react";

/** Matches reference particle_network_animation.html — steering + proximity edges + glow; tuned slower. */
type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  phase: number;
  speed: number;
  angle: number;
  turnRate: number;
  pulsePhase: number;
};

const SLOW = {
  /** vs reference: lower turn + accel + speed cap */
  turnScale: 0.52,
  steerFreq: 0.00022,
  steerAmp: 0.0042,
  accel: 0.005,
  speedMin: 0.1,
  speedMax: 0.32,
  initV: 0.3,
  pulseFreq: 0.001,
  /** ms between simulation steps — higher = calmer motion */
  minFrameMs: 20,
};

/** Raise lightness for softer, lighter dots while keeping token hue/saturation */
function lighterShade(hslSpace: string, deltaL: number): string {
  const m = hslSpace.trim().match(/^([\d.]+)\s+([\d.]+)%\s+([\d.]+)%$/);
  if (!m) return hslSpace;
  const l = Math.min(94, Math.max(0, parseFloat(m[3]) + deltaL));
  return `${m[1]} ${m[2]}% ${l}%`;
}

function makeNodes(n: number, w: number, h: number): Particle[] {
  return Array.from({ length: n }, () => ({
    x: Math.random() * w,
    y: Math.random() * h,
    vx: (Math.random() - 0.5) * 0.6 * SLOW.initV,
    vy: (Math.random() - 0.5) * 0.6 * SLOW.initV,
    r: 1.6 + Math.random() * 2.1,
    phase: Math.random() * Math.PI * 2,
    speed: SLOW.speedMin + Math.random() * (SLOW.speedMax - SLOW.speedMin),
    angle: Math.random() * Math.PI * 2,
    turnRate: (Math.random() - 0.5) * 0.018 * SLOW.turnScale,
    pulsePhase: Math.random() * Math.PI * 2,
  }));
}

function ParticleCanvas({ reducedMotion }: { reducedMotion: boolean }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let ro: ResizeObserver | null = null;
    let stopped = false;

    const simRef = {
      w: 0,
      h: 0,
      nodes: [] as Particle[],
    };

    const syncSize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = wrap.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = Math.min(52, Math.max(22, Math.round((w * h) / 24000)));
      simRef.w = w;
      simRef.h = h;
      simRef.nodes = makeNodes(n, w, h);
    };

    const tokenColors = () => {
      const root = document.documentElement;
      const cs = getComputedStyle(root);
      const primary = cs.getPropertyValue("--primary").trim();
      const muted = cs.getPropertyValue("--muted-foreground").trim();
      const dark =
        root.classList.contains("dark") || window.matchMedia("(prefers-color-scheme: dark)").matches;
      return { primary, muted, dark };
    };

    const maxDist = 128;
    const maxDist2 = maxDist * maxDist;

    const updateNodes = (t: number) => {
      const { nodes, w, h } = simRef;
      const pad = 52;
      for (const p of nodes) {
        p.angle += p.turnRate + Math.sin(t * SLOW.steerFreq + p.phase) * SLOW.steerAmp;
        p.vx += Math.cos(p.angle) * SLOW.accel;
        p.vy += Math.sin(p.angle) * SLOW.accel;
        const spd = Math.hypot(p.vx, p.vy);
        if (spd > p.speed) {
          p.vx = (p.vx / spd) * p.speed;
          p.vy = (p.vy / spd) * p.speed;
        }
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < -pad) p.x = w + pad;
        else if (p.x > w + pad) p.x = -pad;
        if (p.y < -pad) p.y = h + pad;
        else if (p.y > h + pad) p.y = -pad;
      }
    };

    const draw = (t: number) => {
      const { w, h, nodes } = simRef;
      const { primary, muted, dark } = tokenColors();

      ctx.clearRect(0, 0, w, h);

      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = b.x - a.x;
          const dy = b.y - a.y;
          const d2 = dx * dx + dy * dy;
          if (d2 > maxDist2) continue;
          const d = Math.sqrt(d2);
          const alpha = Math.pow(1 - d / maxDist, 1.6) * (dark ? 0.4 : 0.34);
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = `hsl(${muted} / ${alpha.toFixed(3)})`;
          ctx.lineWidth = 0.65 + alpha * 0.48;
          ctx.stroke();
        }
      }

      const primaryLight = lighterShade(primary, dark ? 10 : 14);
      const glowInner = dark ? `hsl(${primaryLight} / 0.18)` : `hsl(${primaryLight} / 0.1)`;
      const nodeFill = dark ? `hsl(${primaryLight} / 0.72)` : `hsl(${primaryLight} / 0.42)`;

      for (const p of nodes) {
        const pulse = 1 + 0.16 * Math.sin(t * SLOW.pulseFreq + p.pulsePhase);
        const r = p.r * pulse;

        ctx.beginPath();
        ctx.arc(p.x, p.y, r + 4, 0, Math.PI * 2);
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, r + 4);
        grad.addColorStop(0, glowInner);
        grad.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = grad;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
        ctx.fillStyle = nodeFill;
        ctx.fill();
      }
    };

    const paintStill = () => {
      syncSize();
      draw(performance.now());
    };

    if (reducedMotion) {
      paintStill();
      ro = new ResizeObserver(paintStill);
      ro.observe(wrap);
      return () => ro?.disconnect();
    }

    let then = 0;
    const loop = (now: number) => {
      if (stopped) return;
      raf = requestAnimationFrame(loop);
      const dt = now - then;
      if (dt < SLOW.minFrameMs) return;
      then = now;
      updateNodes(now);
      draw(now);
    };

    syncSize();
    ro = new ResizeObserver(() => {
      syncSize();
    });
    ro.observe(wrap);

    then = performance.now();
    raf = requestAnimationFrame(loop);

    return () => {
      stopped = true;
      cancelAnimationFrame(raf);
      ro?.disconnect();
    };
  }, [reducedMotion]);

  return (
    <div ref={wrapRef} className="absolute inset-0 z-[1] h-full w-full">
      <canvas ref={canvasRef} className="block h-full w-full" aria-hidden />
    </div>
  );
}

export const ScientificBackground = () => {
  const [reducedMotion, setReducedMotion] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const fn = () => setReducedMotion(mq.matches);
    mq.addEventListener("change", fn);
    return () => mq.removeEventListener("change", fn);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      <div className="scientific-bg-stack">
        <div className="scientific-bg-layer scientific-bg-layer-primary" />
        <div className="scientific-bg-layer scientific-bg-layer-muted" />
      </div>
      <ParticleCanvas reducedMotion={reducedMotion} />
    </div>
  );
};
