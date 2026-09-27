import { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

export default function GlassCard({
  children,
  className = 'card card-3d',
  delay = 0,
  style = {},
  animateEntrance = true,
}) {
  const ref = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const rotateX = useSpring(useTransform(mouseY, [0, 1], [2.5, -2.5]), {
    stiffness: 220,
    damping: 24,
  });
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-3, 3]), {
    stiffness: 220,
    damping: 24,
  });

  const rafId = useRef(null);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const clientX = e.clientX;
    const clientY = e.clientY;
    if (rafId.current) cancelAnimationFrame(rafId.current);
    rafId.current = requestAnimationFrame(() => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      mouseX.set((clientX - rect.left) / rect.width);
      mouseY.set((clientY - rect.top) / rect.height);
    });
  };

  const handleMouseLeave = () => {
    if (rafId.current) cancelAnimationFrame(rafId.current);
    mouseX.set(0.5);
    mouseY.set(0.5);
    setIsHovered(false);
  };

  const spotlightX = useTransform(mouseX, (v) => `${v * 100}%`);
  const spotlightY = useTransform(mouseY, (v) => `${v * 100}%`);

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        ...style,
        rotateX: isHovered ? rotateX : 0,
        rotateY: isHovered ? rotateY : 0,
        transformPerspective: 800,
        willChange: 'transform',
        backfaceVisibility: 'hidden',
        '--mx': spotlightX,
        '--my': spotlightY,
      }}
      {...(animateEntrance ? {
        initial: { opacity: 0, y: 40 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.15 },
        transition: { duration: 0.9, delay, ease: [0.32, 0.72, 0, 1] },
      } : {})}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      <div className="card-3d-inner">
        {children}
      </div>
    </motion.div>
  );
}
