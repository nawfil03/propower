import { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import { useGSAP } from '@gsap/react';

import RevealOnScroll from '../components/RevealOnScroll';
import SectionHero from '../components/SectionHero';
import CTA from '../components/CTA';
import { gsap } from '../lib/gsap';

const divisions = [
  {
    title: 'Electrical Engineering & Contracting',
    img: '/assets/img/hero-engineer.png',
    items: ['LV/MV electrical systems', 'Electrical installations', 'Power cabling solutions', 'Panels and electrical infrastructure'],
  },
  {
    title: 'Power, Utility & Energy Solutions',
    img: '/assets/img/hero-3d.jpg',
    items: ['Power transmission & distribution', 'Substations & transformers up to 220kV', 'Protection & control systems', 'On-grid / off-grid solar energy solutions'],
  },
  {
    title: 'Data Center Solutions',
    img: '/assets/img/services-datacenter.png',
    items: ['Critical power systems', 'UPS & battery systems', 'Power distribution', 'Monitoring, testing & commissioning'],
  },
  {
    title: 'Industrial Automation & Instrumentation',
    img: '/assets/img/hero-infrastructure.png',
    items: ['Industrial instrumentation', 'Automation & control systems', 'PLC, SCADA & HMI', 'Monitoring & measurement'],
  },
  {
    title: 'ELV & Communication Systems',
    img: '/assets/img/blueprint-panel.svg',
    items: ['Structured cabling', 'Communication networks', 'CCTV systems', 'Access control & ELV solutions'],
  },
  {
    title: 'Fire & Life Safety Systems',
    img: '/assets/img/hero-substation.png',
    items: ['Fire alarm systems', 'Emergency lighting', 'Fire detection systems', 'Life safety solutions'],
  },
  {
    title: 'Residential & Commercial Solutions',
    img: '/assets/img/about-team.png',
    items: ['Electrical systems', 'Lighting solutions', 'Power distribution', 'ELV & building solutions'],
  },
  {
    title: 'Retrofit, Testing & Maintenance',
    img: '/assets/img/hero-wide.png',
    items: ['System upgradation up to 220kV', 'Modification & retrofit', 'Testing & commissioning', 'Preventive & corrective maintenance (AMC)'],
  },
  {
    title: 'Infrastructure & Specialized Solutions',
    img: '/assets/img/hero-circuit.svg',
    items: ['Infrastructure projects', 'Electrical infrastructure', 'Project support & execution', 'Specialized engineering solutions'],
  },
];

function DesignerList() {
  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(null);
  const [openIndex, setOpenIndex] = useState(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 30, mass: 0.5 });
  const springY = useSpring(y, { stiffness: 300, damping: 30, mass: 0.5 });

  const IMAGE_W = 380;
  const IMAGE_H = 240;

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    x.set(e.clientX - rect.left - IMAGE_W / 2);
    y.set(e.clientY - rect.top - IMAGE_H - 70);
  };

  const active = activeIndex !== null ? divisions[activeIndex] : null;
  const wireFillRef = useRef(null);

  // The "wire" is a literal visualization of the page's own message — nine
  // separate disciplines wired into one continuous, accountable system —
  // scrubbed to scroll position as the list itself is read top to bottom.
  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.fromTo(
        wireFillRef.current,
        { height: '0%' },
        {
          height: '100%',
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 35%',
            end: 'bottom 65%',
            scrub: 0.3,
          },
        }
      );

      const nums = containerRef.current.querySelectorAll('.list-item-num');
      nums.forEach((num) => {
        gsap.to(num, {
          color: '#c4903f',
          scale: 1.15,
          duration: 0.3,
          scrollTrigger: {
            trigger: num,
            start: 'top 62%',
            end: 'bottom 45%',
            toggleActions: 'play reverse play reverse',
          },
        });
      });
    });
    return () => mm.revert();
  }, { scope: containerRef });

  return (
    <div
      ref={containerRef}
      className="designer-list"
      onMouseMove={handleMouseMove}
      style={{ position: 'relative' }}
    >
      <div className="designer-wire-track" aria-hidden="true">
        <div ref={wireFillRef} className="designer-wire-fill" />
      </div>
      {divisions.map((div, i) => {
        const isOpen = openIndex === i;
        return (
          <div key={div.title}>
            <div
              className="designer-list-item"
              onMouseEnter={() => setActiveIndex(i)}
              onMouseLeave={() => setActiveIndex(null)}
              onClick={() => setOpenIndex(isOpen ? null : i)}
              role="button"
              tabIndex={0}
              aria-expanded={isOpen}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setOpenIndex(isOpen ? null : i); } }}
              style={{ cursor: 'pointer', flexWrap: 'wrap' }}
            >
              <span className="list-item-num">{String(i + 1).padStart(2, '0')}</span>
              <span className="list-item-title" style={{ flex: 1, padding: '0 24px' }}>{div.title}</span>
              <motion.span
                animate={{ rotate: isOpen ? 45 : 0 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                style={{ fontSize: '2rem', fontWeight: 300, color: 'var(--text-muted)', flexShrink: 0 }}
                aria-hidden="true"
              >
                +
              </motion.span>
            </div>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  style={{ overflow: 'hidden', borderBottom: '1px solid var(--border-subtle)' }}
                >
                  <ul style={{ listStyle: 'none', padding: '8px 0 36px', margin: 0, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '12px 32px' }}>
                    {div.items.map((item) => (
                      <li key={item} style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', display: 'flex', gap: '14px' }}>
                        <span style={{ color: 'var(--accent-gold)' }}>—</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}

      {/* Cursor-follow image reveal — desktop only, decorative */}
      <motion.div
        className="reveal-image-container"
        style={{ x: springX, y: springY, width: IMAGE_W, height: IMAGE_H }}
        animate={{ opacity: active ? 1 : 0, scale: active ? 1 : 0.9 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        aria-hidden="true"
      >
        {active && <img src={active.img} alt="" />}
      </motion.div>
    </div>
  );
}

export default function Services() {
  return (
    <main id="main">

      <SectionHero
        eyebrow="Capabilities"
        title={'COMPREHENSIVE\nEPC SOLUTIONS'}
        lead="Nine integrated solution areas covering electrical contracting, power & utility infrastructure, data centers, automation, ELV, fire & life safety, and retrofit & maintenance — supply through commissioning, under one accountable scope."
        badgeLabel="Solutions Portfolio"
        badgeValue="9 Disciplines"
      />

      <div className="container" style={{ paddingBottom: '80px' }}>
        <DesignerList />
      </div>

      {/* In-house testing capability */}
      <div style={{ background: 'var(--bg-secondary)', padding: '120px 0' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '60px', alignItems: 'center' }}>
          <RevealOnScroll>
            <span className="eyebrow">In-House Capability</span>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', letterSpacing: '-0.03em', marginBottom: '24px' }}>
              Professional Testing &amp; Diagnostics
            </h2>
            <p style={{ fontSize: '1.15rem', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '20px' }}>
              We maintain our own primary &amp; secondary injection kits, circuit breaker analyzers, insulation resistance and high-potential testers, enabling fast, safe field commissioning without third-party dependency.
            </p>
            <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
              Advanced studies — power system / load flow analysis (ETAP &amp; CYME), thermography, partial discharge, harmonic and power quality analysis, and life assessment studies for electrical assets — support engineering decisions across every project phase.
            </p>
          </RevealOnScroll>
          <RevealOnScroll delay={0.15}>
            <div style={{ width: '100%', aspectRatio: '4/3', borderRadius: '24px', overflow: 'hidden' }}>
              <img src="/assets/img/hero-substation.png" alt="ProPower field testing and commissioning" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          </RevealOnScroll>
        </div>
      </div>

      <CTA />
    </main>
  );
}
