import { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGSAP } from '@gsap/react';
import {
  Lightning, Gauge, ShieldCheck, ChartLineUp, Thermometer, ClipboardText,
} from '@phosphor-icons/react';

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

const capabilities = [
  { icon: Lightning, label: 'Primary & Secondary Injection Kits' },
  { icon: Gauge, label: 'Circuit Breaker Analyzers' },
  { icon: ShieldCheck, label: 'Insulation Resistance & Hi-Pot Testers' },
  { icon: ChartLineUp, label: 'Load Flow Analysis — ETAP & CYME' },
  { icon: Thermometer, label: 'Thermography & Partial Discharge' },
  { icon: ClipboardText, label: 'Asset Life Assessment Studies' },
];

function DesignerList() {
  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [openIndex, setOpenIndex] = useState(null);

  const active = divisions[activeIndex];
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
          color: '#9c6a1f',
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
    <div className="designer-layout">
      <div ref={containerRef} className="designer-list" style={{ position: 'relative' }}>
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
                onFocus={() => setActiveIndex(i)}
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
      </div>

      {/* Static preview panel — crossfades to match the hovered/focused
          division instead of a thumbnail chasing the cursor. */}
      <div className="designer-preview">
        <AnimatePresence mode="wait">
          <motion.img
            key={active.img}
            src={active.img}
            alt=""
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            aria-hidden="true"
          />
        </AnimatePresence>
        <div className="designer-preview-caption">{active.title}</div>
      </div>
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
        image="/assets/img/services-datacenter.png"
        imageAlt="ProPower data center critical power installation"
      />

      <div className="container" style={{ paddingBottom: '80px' }}>
        <RevealOnScroll style={{ maxWidth: '620px', marginBottom: '56px', borderTop: '2px solid var(--text-main)', paddingTop: '32px' }}>
          <span className="eyebrow">Browse the Portfolio</span>
          <p style={{ fontSize: '1.2rem', color: 'var(--text-main)', lineHeight: 1.6 }}>
            Every discipline below is delivered in-house under one accountable scope — select any to see exactly what it covers.
          </p>
        </RevealOnScroll>
        <DesignerList />
      </div>

      {/* In-house testing capability */}
      <div style={{ background: 'var(--bg-secondary)', padding: '120px 0' }}>
        <div className="container">
          <RevealOnScroll style={{ maxWidth: '640px', marginBottom: '56px' }}>
            <span className="eyebrow">In-House Capability</span>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', letterSpacing: '-0.03em', marginBottom: '20px' }}>
              Professional Testing &amp; Diagnostics
            </h2>
            <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
              Our own equipment and engineering studies mean fast, safe field commissioning with no third-party dependency.
            </p>
          </RevealOnScroll>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '60px', alignItems: 'center' }}>
            <RevealOnScroll delay={0.1}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
                {capabilities.map((cap) => (
                  <div
                    key={cap.label}
                    style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '18px 20px', background: 'var(--bg-white)', border: '1px solid var(--border-subtle)', borderRadius: '16px' }}
                  >
                    <cap.icon size={22} weight="duotone" color="var(--accent-gold)" style={{ flexShrink: 0 }} />
                    <span style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-main)', lineHeight: 1.3 }}>{cap.label}</span>
                  </div>
                ))}
              </div>
            </RevealOnScroll>
            <RevealOnScroll delay={0.2}>
              <div style={{ width: '100%', aspectRatio: '4/3', borderRadius: '24px', overflow: 'hidden', boxShadow: 'var(--shadow-md)' }}>
                <img src="/assets/img/hero-substation.png" alt="ProPower field testing and commissioning" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </div>

      <CTA />
    </main>
  );
}
