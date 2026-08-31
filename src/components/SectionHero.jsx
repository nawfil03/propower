import { lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import AnimatedText from './AnimatedText';

const Hero3D = lazy(() => import('./Hero3D'));

// Shared two-column page header — headline + lead on the left, the signature
// 3D energy-core visual on the right — reused across every top-level page so
// the "engineered grid" motif is a site-wide identity, not a Home-only moment.
export default function SectionHero({ eyebrow, title, lead, badgeLabel, badgeValue, children }) {
  return (
    <div className="section" style={{ padding: '20vh 32px 8vh' }}>
      <div className="container hero-grid" style={{ display: 'grid', gridTemplateColumns: '1.05fr 0.95fr', gap: '64px', alignItems: 'center' }}>
        <div>
          {eyebrow && (
            <motion.span
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="eyebrow"
              style={{ color: 'var(--accent-gold)' }}
            >
              {eyebrow}
            </motion.span>
          )}
          <AnimatedText
            as="h1"
            text={title}
            delay={0.1}
            style={{ fontSize: 'clamp(2.75rem, 5.5vw, 5.5rem)', fontWeight: 700, letterSpacing: '-0.04em', lineHeight: 0.98, color: 'var(--text-main)', marginTop: eyebrow ? '16px' : 0 }}
          />
          {lead && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', maxWidth: '560px', margin: '28px 0 0', lineHeight: 1.6 }}
            >
              {lead}
            </motion.p>
          )}
          {children && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
              style={{ marginTop: '36px' }}
            >
              {children}
            </motion.div>
          )}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="hero-3d-frame"
        >
          <div className="hero-3d-grid-overlay" />
          <Suspense fallback={null}>
            <Hero3D />
          </Suspense>
          {(badgeLabel || badgeValue) && (
            <div className="hero-3d-badge">
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span className="dot" />
                <span>{badgeLabel}</span>
              </div>
              {badgeValue && <span style={{ color: 'var(--accent-gold-light)' }}>{badgeValue}</span>}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
