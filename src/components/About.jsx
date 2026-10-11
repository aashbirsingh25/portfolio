import { useState, useRef, useEffect } from "react";
import { Code2, Palette, Zap } from "lucide-react";
import Reveal from "./Reveal";

const stack = ["Custom design", "Animation", "AI integration", "Performance", "Responsive", "SEO-ready"];

const highlights = [
  { Icon: Palette, label: "Design-led", note: "Clean, modern interfaces that feel considered — not templated." },
  { Icon: Zap, label: "Fast & smooth", note: "Snappy load times and buttery scroll animation on every device." },
  { Icon: Code2, label: "AI-integrated", note: "Assistants built into the site to do real work for the business." },
];

const stats = [
  { to: 4, suffix: "", label: "Projects shipped" },
  { to: 2, suffix: "", label: "Core niches" },
  { to: 100, suffix: "%", label: "Built front to back" },
];

function useCountUp(target, run, duration = 1400) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!run) return;
    let raf;
    const start = performance.now();
    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration);
      setVal(Math.round(target * (1 - Math.pow(1 - t, 3))));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, run, duration]);
  return val;
}

function Stat({ to, suffix, label, run }) {
  const val = useCountUp(to, run);
  return (
    <div className="about-stat">
      <div className="about-stat-num">{val}{suffix}</div>
      <div className="about-stat-label">{label}</div>
    </div>
  );
}

function About() {
  const [run, setRun] = useState(false);
  const statsRef = useRef(null);
  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setRun(true); obs.disconnect(); }
    }, { threshold: 0.4 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="about" className="about">
      <div className="container">
        <div className="about-grid">
          <Reveal>
            <div>
              <span className="eyebrow">About</span>
              <h2 className="about-title">
                I don&apos;t just make it look good. I make it work for your business.
              </h2>
              <p>
                I&apos;m a web developer focused on business websites. I like projects where
                good design meets something useful under the hood — which is why I pair
                every build with practical AI: an assistant that answers customers and
                books work while the owner gets on with their day.
              </p>
              <p>
                Each project in this portfolio was designed, built, and shipped by me,
                front to back.
              </p>
              <div className="about-stack">
                {stack.map((s, i) => <span key={i} className="chip">{s}</span>)}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="about-highlights">
              {highlights.map((h, i) => (
                <div className="about-hl" key={i}>
                  <div className="about-hl-icon"><h.Icon /></div>
                  <div>
                    <div className="about-hl-label">{h.label}</div>
                    <p>{h.note}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        <div className="about-stats" ref={statsRef}>
          {stats.map((s, i) => <Stat key={i} {...s} run={run} />)}
        </div>
      </div>
    </section>
  );
}

export default About;
