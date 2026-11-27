import { useEffect, useRef } from "react";

type Point = { x: number; y: number; r: number; vx: number; vy: number };

/** Animated scatter/line motif drawn on a canvas behind the hero greeting. */
export default function DataNetCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const maybeCanvas = canvasRef.current;
    const maybeCtx = maybeCanvas?.getContext("2d");
    if (!maybeCanvas || !maybeCtx) return;
    const canvas: HTMLCanvasElement = maybeCanvas;
    const ctx: CanvasRenderingContext2D = maybeCtx;
    let w = 0;
    let h = 0;
    let points: Point[] = [];
    let frameId = 0;
    const dpr = window.devicePixelRatio || 1;

    function resize() {
      w = canvas.width = canvas.offsetWidth * dpr;
      h = canvas.height = canvas.offsetHeight * dpr;
    }

    function initPoints() {
      points = [];
      const count = 36;
      for (let i = 0; i < count; i++) {
        points.push({
          x: Math.random() * w,
          y: Math.random() * h,
          r: Math.random() * 2 + 0.8,
          vy: (Math.random() - 0.5) * 0.15,
          vx: (Math.random() - 0.5) * 0.12,
        });
      }
    }

    function draw() {
      ctx.clearRect(0, 0, w, h);
      ctx.strokeStyle = "rgba(201,162,39,0.14)";
      ctx.lineWidth = 1;
      for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
          const dx = points[i].x - points[j].x;
          const dy = points[i].y - points[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < w * 0.1) {
            ctx.beginPath();
            ctx.moveTo(points[i].x, points[i].y);
            ctx.lineTo(points[j].x, points[j].y);
            ctx.stroke();
          }
        }
      }
      ctx.fillStyle = "rgba(242,239,233,0.5)";
      points.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * dpr, 0, Math.PI * 2);
        ctx.fill();
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;
      });
      frameId = requestAnimationFrame(draw);
    }

    function setup() {
      resize();
      initPoints();
    }

    setup();
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    draw();
    if (prefersReducedMotion) cancelAnimationFrame(frameId);

    window.addEventListener("resize", setup);
    return () => {
      window.removeEventListener("resize", setup);
      cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        opacity: 0.4,
      }}
    />
  );
}
