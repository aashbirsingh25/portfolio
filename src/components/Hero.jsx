import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, Sparkles } from "lucide-react";
import Magnetic from "./ui/Magnetic";

// Hero: layered parallax. As you scroll, the headline rises and fades, a huge
// ghost wordmark drifts behind at a different speed, and the whole block eases
// away — so the first screen feels like depth, not a flat banner.
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};
const line = {
  hidden: { opacity: 0, y: 44 },
  show: { opacity: 1, y: 0, transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] } },
};

function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  // Different layers move at different rates = parallax depth.
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const ghostX = useTransform(scrollYProgress, [0, 1], [0, -220]);
  const ghostOpacity = useTransform(scrollYProgress, [0, 0.6], [0.06, 0]);
  const cueOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  return (
    <header className="hero" id="top" ref={ref}>
      <motion.div className="hero-ghost" style={{ x: ghostX, opacity: ghostOpacity }} aria-hidden="true">
        AASHBIR
      </motion.div>

      <div className="container">
        <motion.div
          className="hero-inner"
          variants={container}
          initial="hidden"
          animate="show"
          style={{ y: contentY, opacity: contentOpacity }}
        >
          <motion.div variants={line} className="hero-badge">
            <Sparkles /> Websites for business · AI integration
          </motion.div>

          <motion.h1 variants={line}>
            A website that <span className="grad">sells while you sleep</span>.
          </motion.h1>

          <motion.p variants={line}>
            I&apos;m Aashbir Singh — I design business websites that don&apos;t just
            look stunning, they bring in customers: an AI assistant built in to
            answer, capture, and book every lead, 24/7. Your best salesperson,
            working around the clock.
          </motion.p>

          <motion.div variants={line} className="hero-cta">
            <Magnetic><a href="#work" className="btn">View my work</a></Magnetic>
            <Magnetic><a href="#contact" className="btn btn-ghost">Start a project</a></Magnetic>
          </motion.div>
        </motion.div>
      </div>

      <motion.a href="#services" className="hero-scroll" aria-label="Scroll down" style={{ opacity: cueOpacity }}>
        <ArrowDown size={18} />
      </motion.a>
    </header>
  );
}

export default Hero;
