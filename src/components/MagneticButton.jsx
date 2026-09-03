import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const MotionLink = motion(Link);

// A single element that is itself the button — never wrap a <Link> or
// <button> inside this (or you get two overlapping .btn shapes nested in
// each other). Pass `to` for in-app routes, `href` for external links,
// or neither for a plain <button>.
export default function MagneticButton({
  children,
  className = 'btn btn-primary',
  to,
  href,
  onClick,
  style = {},
  strength = 0.2,
  ...props
}) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 20 });
  const springY = useSpring(y, { stiffness: 300, damping: 20 });

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const dx = e.clientX - rect.left - rect.width / 2;
    const dy = e.clientY - rect.top - rect.height / 2;
    x.set(dx * strength);
    y.set(dy * strength);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const Component = to ? MotionLink : href ? motion.a : motion.button;
  const linkProps = to ? { to } : href ? { href } : {};

  return (
    <Component
      ref={ref}
      {...linkProps}
      onClick={onClick}
      className={className}
      style={{ ...style, x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileTap={{ scale: 0.96 }}
      {...props}
    >
      {children}
    </Component>
  );
}
