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
      animate={{ opacity: isDone ? 0 : 1, scale: isDone ? 1.06 : 1 }}
      transition={{ duration: 0.6, ease: [0.22, 0.61, 0.36, 1] }}
    >
      <motion.div
        className="preloader-mark"
        initial={{ scale: 0.5, opacity: 0, rotate: -20 }}
        animate={{ scale: 1, opacity: 1, rotate: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <img src="/assets/img/favicon.svg" alt="" aria-hidden="true" />
      </motion.div>
      <motion.div
        className="preloader-progress-track"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.4 }}
      >
        <motion.div
          className="preloader-progress-fill"
          animate={{ width: `${Math.min(count, 100)}%` }}
          transition={{ duration: 0.15, ease: 'easeOut' }}
        />
      </motion.div>
      <span className="preloader-counter">{Math.min(count, 100)}%</span>
    </motion.div>
  );
}
