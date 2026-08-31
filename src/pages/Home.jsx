import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';

import RevealOnScroll from '../components/RevealOnScroll';
import MagneticButton from '../components/MagneticButton';
import CTA from '../components/CTA';

// ── 1. Hero ──
function Hero() {
  return (
    <div className="section" style={{ padding: '22vh 32px 12vh', textAlign: 'center' }}>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <h1 style={{ fontSize: 'clamp(3.5rem, 11vw, 11rem)', fontWeight: 700, letterSpacing: '-0.04em', lineHeight: 0.9, color: 'var(--text-main)' }}>
          ENGINEERING<br/>
          <span style={{ color: 'var(--accent-gold)' }}>CRITICAL</span><br/>
          POWER
        </h1>
      </motion.div>
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        style={{ fontSize: '1.35rem', color: 'var(--text-secondary)', maxWidth: '700px', margin: '48px auto 0', lineHeight: 1.6 }}
      >
        Delivering mission-critical electrical infrastructure across the UAE and GCC since inception.
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        style={{ marginTop: '48px', display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}
      >
        <Link to="/services" className="btn btn-primary" style={{ fontSize: '1rem' }}>
          Our Capabilities <span className="btn-arrow">→</span>
        </Link>
        <Link to="/contact" className="btn btn-ghost" style={{ fontSize: '1rem' }}>
          Start a Project
        </Link>
      </motion.div>
    </div>
  );
}

// ── 2. Full-Width Showcase Image ──
function ShowcaseImage() {
  return (
    <div className="container" style={{ paddingBottom: '0' }}>
      <motion.div 
        initial={{ opacity: 0, y: 60, scale: 0.96 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        style={{ width: '100%', height: '60vh', minHeight: '400px', borderRadius: '28px', overflow: 'hidden', position: 'relative' }}
      >
        <img 
          src="/assets/img/hero-wide.png" 
          alt="ProPower Substation Project" 
          style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 50%, rgba(0,0,0,0.4) 100%)' }} />
        <div style={{ position: 'absolute', bottom: '40px', left: '40px', right: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div>
            <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Featured Project</span>
            <h3 style={{ color: '#fff', fontSize: '1.75rem', marginTop: '8px' }}>400kV Substation — Abu Dhabi</h3>
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            {['DEWA', 'ADDC', 'SEWA'].map(badge => (
              <span key={badge} style={{ 
                padding: '8px 16px', 
                background: 'rgba(255,255,255,0.15)', 
                backdropFilter: 'blur(10px)',
                borderRadius: '999px', 
                color: '#fff', 
                fontSize: '12px', 
                fontWeight: 600,
                border: '1px solid rgba(255,255,255,0.2)'
              }}>
                {badge} Approved
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// ── 3. Vision Text ──
function VisionText() {
  return (
    <div className="section container" style={{ padding: '15vh 32px' }}>
      <RevealOnScroll>
        <p style={{ fontSize: 'clamp(1.75rem, 3.5vw, 3.5rem)', fontWeight: 600, letterSpacing: '-0.02em', lineHeight: 1.25, color: 'var(--text-main)', maxWidth: '1200px' }}>
          We deliver end-to-end electrical power transmission, distribution, substation, testing, commissioning and maintenance solutions across the UAE and GCC.
        </p>
      </RevealOnScroll>
    </div>
  );
}

// ── 4. Core Disciplines — Dark Contrast Block ──
function CoreDisciplines() {
  const items = [
    { title: 'Substations up to 400kV', img: '/assets/img/hero-3d.jpg', span: 'span 2', rowSpan: 'span 2' },
    { title: 'Transmission & Distribution', img: '/assets/img/hero-infrastructure.png', span: 'span 2', rowSpan: 'span 1' },
    { title: 'Data Center Infrastructure', img: '/assets/img/services-datacenter.png', span: 'span 1', rowSpan: 'span 1' },
    { title: 'Testing & Commissioning', img: '/assets/img/hero-substation.png', span: 'span 1', rowSpan: 'span 1' },
  ];

  return (
    <div style={{ padding: '140px 0', background: '#0a0a0a', color: '#fff' }}>
      <div className="container">
        <RevealOnScroll>
          <span className="eyebrow" style={{ color: 'var(--accent-gold)' }}>Solutions Portfolio</span>
          <h2 style={{ marginBottom: '60px', fontSize: 'clamp(2.5rem, 5vw, 4rem)', letterSpacing: '-0.03em', color: '#fff' }}>Core Disciplines</h2>
        </RevealOnScroll>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gridAutoRows: '280px', gap: '20px' }}>
          {items.map((item, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -8 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              style={{ 
                gridColumn: item.span, gridRow: item.rowSpan,
                borderRadius: '20px', overflow: 'hidden', position: 'relative', background: '#111', cursor: 'pointer',
                border: '1px solid rgba(255,255,255,0.08)'
              }}
            >
              <img src={item.img} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.45, transition: 'opacity 0.4s ease' }} 
                onMouseEnter={e => e.target.style.opacity = 0.7}
                onMouseLeave={e => e.target.style.opacity = 0.45}
              />
              <div style={{ position: 'absolute', bottom: '28px', left: '28px', right: '28px' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--accent-gold)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{String(i + 1).padStart(2, '0')}</span>
                <h3 style={{ color: '#fff', fontSize: item.rowSpan === 'span 2' ? '2.25rem' : '1.35rem', lineHeight: 1.15, margin: '8px 0 0' }}>
                  {item.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>

        <div style={{ marginTop: '60px', textAlign: 'center' }}>
          <MagneticButton>
            <Link to="/services" className="btn btn-primary has-custom-cursor" style={{ background: 'var(--accent-gold)', color: '#000', fontWeight: 700 }}>
              View All Capabilities
            </Link>
          </MagneticButton>
        </div>
      </div>
    </div>
  );
}

// ── 5. Key Differentiators ──
function KeyDifferentiators() {
  const diffs = [
    {
      num: '01',
      title: 'In-House Testing Setup',
      desc: 'We operate our own advanced injection test kits, primary/secondary calibration sets, breaker analyzers, and high-potential insulation testers, ensuring swift and safe field commissionings.'
    },
    {
      num: '02',
      title: 'Utility & Grid Integrity',
      desc: 'Our engineering teams possess extensive reference qualifications and direct project experience aligned with DEWA, SEWA, ADDC, and regional electrical grid regulations.'
    },
    {
      num: '03',
      title: 'Single-Source Integration',
      desc: 'From initial panel layout and heavy power cabling to final protection relay testing and annual maintenance contracts (AMC), we eliminate vendor fragmentation.'
    }
  ];

  return (
    <div className="section" style={{ background: 'var(--bg-secondary)', padding: '140px 0' }}>
      <div className="container">
        <RevealOnScroll>
          <span className="eyebrow">Strategic Value</span>
          <h2 style={{ marginBottom: '60px', fontSize: 'clamp(2.5rem, 5vw, 4rem)', letterSpacing: '-0.03em' }}>Why ProPower</h2>
        </RevealOnScroll>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px' }}>
          {diffs.map((d, i) => (
            <RevealOnScroll key={i} delay={i * 0.15}>
              <div style={{ background: 'var(--bg-white)', padding: '48px', borderRadius: '24px', border: '1px solid var(--border-subtle)', height: '100%', display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '3.5rem', fontWeight: 800, color: 'var(--accent-gold)', opacity: 0.8, fontFamily: 'var(--font-display)', lineHeight: 1 }}>
                  {d.num}
                </span>
                <h3 style={{ fontSize: '1.75rem', margin: '24px 0 16px', letterSpacing: '-0.02em' }}>{d.title}</h3>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0, fontSize: '1.05rem' }}>{d.desc}</p>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── 6. Stats Strip ──
function StatsStrip() {
  const stats = [
    { num: '132', unit: 'kV', label: 'Substation Capacity' },
    { num: '50+', unit: '', label: 'Major Projects' },
    { num: '3', unit: '', label: 'ISO Certifications' },
    { num: '5+', unit: '', label: 'Utility Approvals' },
  ];

  return (
    <div className="section container" style={{ paddingTop: '120px', paddingBottom: '120px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '48px', borderTop: '2px solid var(--text-main)', paddingTop: '60px' }}>
        {stats.map((s, i) => (
          <RevealOnScroll key={i} delay={i * 0.1}>
            <div>
              <span style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', fontWeight: 700, letterSpacing: '-0.04em', color: 'var(--text-main)', lineHeight: 1 }}>
                {s.num}<span style={{ color: 'var(--accent-gold)' }}>{s.unit}</span>
              </span>
              <p style={{ marginTop: '12px', fontSize: '1rem', color: 'var(--text-secondary)', fontWeight: 500 }}>{s.label}</p>
            </div>
          </RevealOnScroll>
        ))}
      </div>
    </div>
  );
}

// ── 7. Approvals Row ──
function ApprovalsRow() {
  const approvals = ['DEWA', 'SEWA', 'FEWA', 'ADDC', 'AADC', 'ISO 9001', 'ISO 14001', 'ISO 45001'];
  return (
    <div style={{ padding: '60px 0', borderTop: '1px solid var(--border-subtle)', borderBottom: '1px solid var(--border-subtle)' }}>
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'center', gap: '32px', flexWrap: 'wrap', alignItems: 'center' }}>
          <span style={{ fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--text-muted)', marginRight: '16px' }}>Approved by</span>
          {approvals.map(a => (
            <span key={a} style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-secondary)', padding: '8px 20px', background: 'var(--bg-secondary)', borderRadius: '999px' }}>
              {a}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}


// ── MAIN PAGE ──
export default function Home() {
  return (
    <main id="main">
      <Hero />
      <ShowcaseImage />
      <VisionText />
      <ApprovalsRow />
      <CoreDisciplines />
      <KeyDifferentiators />
      <StatsStrip />
      <CTA />
    </main>
  );
}
