import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Preloader() {
  const [isDone, setIsDone] = useState(false);
  const [count, setCount] = useState(0);
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    // Skip if already shown this session
    try {
      if (sessionStorage.getItem('pp_intro_shown')) {
        setIsDone(true);
        setShouldRender(false);
        return;
      }
    } catch (e) {}

    const interval = setInterval(() => {
      setCount((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.floor(Math.random() * 8) + 3;
      });
    }, 40);

    const timer = setTimeout(() => {
      setIsDone(true);
      try { sessionStorage.setItem('pp_intro_shown', '1'); } catch (e) {}
      setTimeout(() => setShouldRender(false), 700);
    }, 1400);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, []);

  if (!shouldRender) return null;

  return (
    <motion.div
      className={`preloader ${isDone ? 'is-done' : ''}`}
      initial={{ opacity: 1 }}
      animate={{ opacity: isDone ? 0 : 1 }}
      transition={{ duration: 0.6, ease: [0.22, 0.61, 0.36, 1] }}
    >
      <svg viewBox="0 0 64 64">
        <path
          className="p-bolt"
          d="M35 10 L18 34 H29 L26 54 L47 26 H35 L38 10 Z"
        />
      </svg>
      <span className="preloader-counter">{Math.min(count, 100)}%</span>
    </motion.div>
  );
}
