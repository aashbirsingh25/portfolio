import { motion, useScroll, useSpring } from "framer-motion";

// ScrollProgress: a thin bar across the top that fills with page scroll.
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });
  return <motion.div className="scroll-progress" style={{ scaleX }} />;
}

export default ScrollProgress;
