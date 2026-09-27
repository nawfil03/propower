import { motion, useScroll } from 'framer-motion';

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        height: '4px',
        width: '100%',
        background: '#ffffff',
        mixBlendMode: 'difference',
        transformOrigin: '0%',
        scaleX: scrollYProgress,
        zIndex: 2000,
        pointerEvents: 'none',
      }}
    />
  );
}
