import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ExternalLink } from "lucide-react";
import { projects } from "../data/projects";
import TiltCard from "./ui/TiltCard";

gsap.registerPlugin(ScrollTrigger);

// Work: GSAP ScrollTrigger pinned horizontal gallery. The section pins to the
// viewport and the track is scrubbed sideways with scroll — the real
// agency-grade version (scrubbed, snappy, resize-safe). Each panel's inner
// content also parallaxes slightly for depth. Disabled under 900px (vertical).
function Work() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 901px)", () => {
        const track = trackRef.current;
        const panels = gsap.utils.toArray(".work-panel", track);
        const getScroll = () => track.scrollWidth - window.innerWidth;

        const tween = gsap.to(track, {
          x: () => -getScroll(),
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: () => "+=" + getScroll(),
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
            anticipatePin: 1,
          },
        });

        // Subtle per-panel entrance as each scrolls into the center.
        panels.forEach((panel) => {
          const card = panel.querySelector(".work-card, .work-intro-inner");
          if (!card) return;
          gsap.from(card, {
            opacity: 0,
            y: 60,
            scrollTrigger: {
              trigger: panel,
              containerAnimation: tween,
              start: "left center",
              end: "center center",
              scrub: true,
            },
          });
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="work" className="work" ref={sectionRef}>
      <div className="work-track" ref={trackRef}>
        <div className="work-panel work-intro">
          <div className="work-intro-inner">
            <span className="eyebrow">Selected work</span>
            <h2 className="work-heading">
              Imagine this, <span className="grad">but yours</span> →
            </h2>
            <p>
              Demos, not limits. Your site would be fully custom — bigger, and
              built entirely around your brand, your customers, and your goals.
            </p>
          </div>
        </div>

        {projects.map((p, i) => (
          <div className="work-panel" key={p.id}>
            <WorkCard p={p} index={i} />
          </div>
        ))}
      </div>
    </section>
  );
}

function WorkCard({ p, index }) {
  return (
    <article className="work-card" style={{ "--accent": p.accent }}>
      <TiltCard className="work-media" intensity={8}>
        <img src={p.image} alt={`${p.name} — ${p.type}`} loading="lazy" />
        <span className="work-media-glow" />
        <span className="work-index">0{index + 1}</span>
      </TiltCard>
      <div className="work-body">
        <span className="work-type" style={{ color: p.accent }}>{p.type}</span>
        <h3>{p.name}</h3>
        <p>{p.blurb}</p>
        <ul className="work-tags">
          {p.tags.map((t, j) => <li key={j}>{t}</li>)}
        </ul>
        <div className="work-links">
          {p.live && (
            <a href={p.live} target="_blank" rel="noreferrer" className="work-link">
              <ExternalLink size={16} /> Visit live site
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

export default Work;
