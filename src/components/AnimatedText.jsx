import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export default function AnimatedText({
  text,
  as = 'h2',
  className = '',
  delay = 0,
  staggerChildren = 0.035,
  once = true,
  style = {},
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, amount: 0.3 });
  const Tag = as;

  const words = text.split(' ');

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren,
        delayChildren: delay,
      },
    },
  };

  const wordVariants = {
    hidden: { y: '110%', opacity: 0 },
    visible: {
      y: '0%',
      opacity: 1,
      transition: {
        duration: 0.7,
        ease: [0.22, 0.61, 0.36, 1],
      },
    },
  };

  return (
    <Tag ref={ref} className={className} style={style}>
      <motion.span
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3em' }}
        aria-label={text}
      >
        {words.map((word, i) => (
          <span
            key={i}
            style={{
              display: 'inline-block',
              overflow: 'hidden',
              paddingBottom: '0.08em',
              marginBottom: '-0.08em',
              lineHeight: 1.15,
            }}
          >
            <motion.span
              variants={wordVariants}
              style={{ display: 'inline-block' }}
            >
              {word}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}
