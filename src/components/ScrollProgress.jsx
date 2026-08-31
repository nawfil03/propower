import { useEffect, useState } from 'react';
import { motion, useScroll } from 'framer-motion';

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      className="scroll-progress"
      style={{ width: scrollYProgress.get() * 100 + '%' }}
    >
      <motion.div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          height: '3px',
          width: '100%',
          background: 'linear-gradient(90deg, #c4903f, #5fd4c4)',
          transformOrigin: '0%',
          scaleX: scrollYProgress,
          zIndex: 1200,
          pointerEvents: 'none',
        }}
      />
    </motion.div>
  );
}
