import { useRef, useState } from "react";
import { cn } from "../../lib/utils";

// TiltCard: Aceternity-style 3D card. Tracks the pointer over the card and
// applies a perspective tilt, with inner layers lifting on the Z axis.
// Adapted to this project's stack (plain React + inline transforms + Tailwind
// utility classes for the glare), no shadcn primitives required.
export default function TiltCard({ children, className, intensity = 10 }) {
  const ref = useRef(null);
  const [t, setT] = useState({ rx: 0, ry: 0, gx: 50, gy: 50, active: false });

  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    setT({
      rx: (0.5 - py) * intensity * 2,
      ry: (px - 0.5) * intensity * 2,
      gx: px * 100,
      gy: py * 100,
      active: true,
    });
  };

  const reset = () => setT((s) => ({ ...s, rx: 0, ry: 0, active: false }));

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      className={cn("tilt-card", className)}
      style={{
        transform: `perspective(900px) rotateX(${t.rx}deg) rotateY(${t.ry}deg)`,
        transition: t.active ? "transform 0.05s linear" : "transform 0.5s ease",
      }}
    >
      <div
        className="tilt-glare"
        style={{
          background: `radial-gradient(360px circle at ${t.gx}% ${t.gy}%, rgba(255,255,255,0.14), transparent 60%)`,
          opacity: t.active ? 1 : 0,
        }}
      />
      <div className="tilt-inner" style={{ transform: t.active ? "translateZ(40px)" : "translateZ(0)" }}>
        {children}
      </div>
    </div>
  );
}
