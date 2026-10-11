import { Monitor, Bot } from "lucide-react";
import Reveal from "./Reveal";

// Services: the two niches, stated plainly.
const services = [
  {
    Icon: Monitor,
    title: "Websites for businesses",
    desc: "Fast, responsive, on-brand sites — from salons and restaurants to real-estate agencies. Smooth animation, clean design, built to convert visitors into customers.",
    points: ["Custom responsive design", "Scroll & motion animation", "Booking & lead forms"],
  },
  {
    Icon: Bot,
    title: "AI integration",
    desc: "An assistant built into your site that answers questions 24/7, captures leads, and books appointments — so the website works even when you're asleep.",
    points: ["In-site chat assistant", "Lead capture & routing", "Trained on your business"],
  },
];

function Services() {
  return (
    <section id="services" className="services">
      <div className="container">
        <Reveal>
          <span className="eyebrow">What I do</span>
          <h2 className="section-title">Two things, done well</h2>
          <p className="section-subtitle">
            I focus on building business websites — and making them smarter with AI.
          </p>
        </Reveal>
        <div className="services-grid">
          {services.map((s, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div className="service-card">
                <div className="service-icon"><s.Icon /></div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
                <ul className="service-points">
                  {s.points.map((p, j) => <li key={j}>{p}</li>)}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Services;
