import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const heroImages = [
  {
    src: '/assets/img/hero-wide.png',
    title: 'High-Voltage Substation Engineering',
    subtitle: 'Turnkey T&D Solutions up to 132kV across UAE & GCC',
    badge: 'ISO 9001:2015 Certified',
  },
  {
    src: '/assets/img/hero-substation.png',
    title: 'Power Transmission & Distribution',
    subtitle: 'LV / MV / HV / EHV Cabling, Jointing & Substation Automation',
    badge: 'SEWA · DEWA · EtihadWE Aligned',
  },
  {
    src: '/assets/img/hero-engineer.png',
    title: 'In-House Testing & Commissioning',
    subtitle: 'Primary/Secondary Injection, Breaker Analysis & Protection Relays',
    badge: 'ISO 45001:2018 Safety Standards',
  },
  {
    src: '/assets/img/services-datacenter.png',
    title: 'Critical Power & Data Center Solutions',
    subtitle: 'UPS, Battery Systems, Power Distribution & Life Safety Works',
    badge: 'Turnkey Infrastructure Capability',
  },
];

export default function HeroImageCarousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const current = heroImages[index];

  return (
    <div className="hero-showcase-card">
      <AnimatePresence mode="wait">
        <motion.img
          key={current.src}
          src={current.src}
          alt={current.title}
          initial={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          exit={{ opacity: 0, scale: 0.98, filter: 'blur(6px)' }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </AnimatePresence>

      <div className="hero-showcase-overlay">
        <div className="hero-showcase-content">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="hero-showcase-badge" style={{ marginBottom: 16 }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2l7 3v6c0 4.97-3 8.5-7 11-4-2.5-7-6.03-7-11V5l7-3z" />
                  <path d="M9 12l2 2 4-4" />
                </svg>
                <span>{current.badge}</span>
              </div>
              <h3 style={{ fontSize: '1.6rem', color: '#ffffff', marginBottom: 6, textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>
                {current.title}
              </h3>
              <p style={{ color: 'rgba(255, 255, 255, 0.85)', fontSize: '1.05rem', margin: 0, textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>
                {current.subtitle}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Dots */}
          <div style={{ display: 'flex', gap: 8, zIndex: 10 }}>
            {heroImages.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                aria-label={`Go to slide ${i + 1}`}
                style={{
                  width: i === index ? 32 : 10,
                  height: 10,
                  borderRadius: 5,
                  background: i === index ? '#c4903f' : 'rgba(255, 255, 255, 0.4)',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                  padding: 0,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
