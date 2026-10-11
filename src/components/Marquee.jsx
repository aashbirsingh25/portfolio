import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// Marquee: a big word strip that drifts as you scroll past it — scroll-linked
// motion (not just a CSS loop), so it reacts to how you scroll.
const WORDS = ["WEBSITES", "AI INTEGRATION", "BRAND SITES", "WEB APPS", "LEAD CAPTURE"];

function Marquee() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x = useTransform(scrollYProgress, [0, 1], ["5%", "-30%"]);

  return (
    <div className="marquee" ref={ref} aria-hidden="true">
      <motion.div className="marquee-track" style={{ x }}>
        {[...WORDS, ...WORDS, ...WORDS].map((w, i) => (
          <span className="marquee-item" key={i}>
            {w}<span className="marquee-dot">◆</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}

export default Marquee;
