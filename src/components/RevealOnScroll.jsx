import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const variants = {
  fadeUp: {
    hidden: { opacity: 0, y: 60, filter: 'blur(12px)' },
    visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
  },
  fadeDown: {
    hidden: { opacity: 0, y: -60, filter: 'blur(12px)' },
    visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
  },
  fadeLeft: {
    hidden: { opacity: 0, x: -60, filter: 'blur(12px)' },
    visible: { opacity: 1, x: 0, filter: 'blur(0px)' },
  },
  fadeRight: {
    hidden: { opacity: 0, x: 60, filter: 'blur(12px)' },
    visible: { opacity: 1, x: 0, filter: 'blur(0px)' },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.85, filter: 'blur(12px)' },
    visible: { opacity: 1, scale: 1, filter: 'blur(0px)' },
  },
  blur: {
    hidden: { opacity: 0, y: 20, scale: 0.95, filter: 'blur(16px)' },
    visible: { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' },
  },
};

export default function RevealOnScroll({
  children,
  variant = 'fadeUp',
  delay = 0,
  duration = 0.7,
  threshold = 0.1,
  once = true,
  className = '',
  style = {},
  as = 'div',
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, amount: threshold });
  const MotionComponent = motion[as] || motion.div;

  return (
    <MotionComponent
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={variants[variant] || variants.fadeUp}
      transition={{
        duration: duration || 0.9,
        delay,
        ease: [0.32, 0.72, 0, 1],
      }}
      className={className}
      style={{
        ...style,
        willChange: 'opacity, transform',
      }}
    >
      {children}
    </MotionComponent>
  );
}
