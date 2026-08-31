import { lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Lightning, Buildings, PlugsConnected, Gauge, Broadcast, FireSimple,
  HouseLine, Wrench, Path, ShieldCheck, GlobeHemisphereEast, HardHat,
} from '@phosphor-icons/react';

import RevealOnScroll from '../components/RevealOnScroll';
import MagneticButton from '../components/MagneticButton';
import GlassCard from '../components/GlassCard';
import VideoScrub from '../components/VideoScrub';
import CTA from '../components/CTA';

const Hero3D = lazy(() => import('../components/Hero3D'));
const ScrollJourney3D = lazy(() => import('../components/ScrollJourney3D'));

// ── 1. Hero ──
function Hero() {
  return (
    <div className="section" style={{ padding: '20vh 32px 10vh' }}>
      <div className="container hero-grid" style={{ display: 'grid', gridTemplateColumns: '1.05fr 0.95fr', gap: '64px', alignItems: 'center' }}>
        <div>
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="eyebrow"
          >
            UAE &amp; GCC · LV / MV / HV Electrical EPC
          </motion.span>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 style={{ fontSize: 'clamp(3rem, 6.2vw, 6.5rem)', fontWeight: 700, letterSpacing: '-0.04em', lineHeight: 0.94, color: 'var(--text-main)', marginTop: '20px' }}>
              ENGINEERING<br/>
              <span style={{ color: 'var(--accent-gold)' }}>CRITICAL</span><br/>
              POWER
            </h1>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', maxWidth: '560px', margin: '28px 0 0', lineHeight: 1.6 }}
          >
            A single-source partner for electrical contracting, power transmission &amp; distribution, substations, testing &amp; commissioning, and operation &amp; maintenance — trusted across utility, EPC, industrial and data center projects in the UAE and wider GCC.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            style={{ marginTop: '40px', display: 'flex', gap: '16px', flexWrap: 'wrap' }}
          >
            <Link to="/services" className="btn btn-primary" style={{ fontSize: '1rem' }}>
              Our Capabilities <span className="btn-arrow">→</span>
            </Link>
            <Link to="/contact" className="btn btn-ghost" style={{ fontSize: '1rem' }}>
              Start a Project
            </Link>
          </motion.div>
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
          <div className="hero-3d-badge">
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span className="dot" />
              <span>Grid Systems, Modeled Live</span>
            </div>
            <span style={{ color: 'var(--accent-gold-light)' }}>Up to 220kV</span>
          </div>
        </motion.div>
      </div>
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
        <div className="showcase-overlay" style={{ position: 'absolute', bottom: '32px', left: '32px', right: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: '16px' }}>
          <div>
            <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Core Discipline</span>
            <h3 style={{ color: '#fff', fontSize: '1.75rem', marginTop: '8px' }}>Substation &amp; Grid Infrastructure, up to 220kV</h3>
          </div>
          <div className="showcase-badges" style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            {['DEWA', 'SEWA', 'EtihadWE'].map(badge => (
              <span key={badge} style={{
                padding: '7px 14px',
                background: 'rgba(255,255,255,0.15)',
                backdropFilter: 'blur(10px)',
                borderRadius: '999px',
                color: '#fff',
                fontSize: '11px',
                fontWeight: 600,
                whiteSpace: 'nowrap',
                border: '1px solid rgba(255,255,255,0.2)'
              }}>
                {badge} Reference
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
    { title: 'Substations & Grid up to 220kV', img: '/assets/img/hero-3d.jpg', span: 'span 2', rowSpan: 'span 2' },
    { title: 'Power Transmission & Distribution', img: '/assets/img/hero-infrastructure.png', span: 'span 2', rowSpan: 'span 1' },
    { title: 'Data Center Critical Power', img: '/assets/img/services-datacenter.png', span: 'span 1', rowSpan: 'span 1' },
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

// ── 4b. Full-Spectrum Solution Areas ──
function SolutionAreas() {
  const areas = [
    { icon: PlugsConnected, title: 'Electrical Engineering & Contracting', desc: 'LV/MV electrical systems, installations, power cabling, panels & infrastructure.' },
    { icon: Lightning, title: 'Power, Utility & Energy', desc: 'Transmission & distribution, substations & transformers, protection & control, solar.' },
    { icon: Buildings, title: 'Data Center Solutions', desc: 'Critical power systems, UPS & battery systems, distribution, monitoring & commissioning.' },
    { icon: Gauge, title: 'Industrial Automation', desc: 'Instrumentation, automation & control, PLC / SCADA / HMI, monitoring & measurement.' },
    { icon: Broadcast, title: 'ELV & Communication', desc: 'Structured cabling, communication networks, CCTV, access control & ELV systems.' },
    { icon: FireSimple, title: 'Fire & Life Safety', desc: 'Fire alarm & detection systems, emergency lighting, life safety solutions.' },
    { icon: HouseLine, title: 'Residential & Commercial', desc: 'Electrical systems, lighting, power distribution, ELV & building solutions.' },
    { icon: Wrench, title: 'Retrofit, Testing & Maintenance', desc: 'System upgradation, modification & retrofit, testing & commissioning, AMC.' },
    { icon: Path, title: 'Infrastructure & Specialized', desc: 'Infrastructure projects, project support & execution, specialized engineering.' },
  ];

  return (
    <div className="section" style={{ background: 'var(--bg-white)', padding: '140px 0' }}>
      <div className="container">
        <RevealOnScroll>
          <span className="eyebrow">Complete Portfolio</span>
          <h2 style={{ maxWidth: '760px', marginBottom: '20px', fontSize: 'clamp(2.5rem, 5vw, 4rem)', letterSpacing: '-0.03em' }}>
            Nine Solution Areas, One Accountable Partner
          </h2>
          <p style={{ maxWidth: '640px', fontSize: '1.15rem', color: 'var(--text-secondary)', marginBottom: '64px' }}>
            From supply and installation through testing, commissioning and maintenance — every discipline under a single scope of responsibility.
          </p>
        </RevealOnScroll>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2px', background: 'var(--border-subtle)', borderRadius: '24px', overflow: 'hidden' }}>
          {areas.map((a, i) => (
            <GlassCard
              key={a.title}
              delay={(i % 3) * 0.08}
              style={{ background: 'var(--bg-white)', padding: '40px 32px', borderRadius: 0 }}
            >
              <div style={{ width: '52px', height: '52px', borderRadius: '14px', background: 'rgba(196, 144, 63, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
                <a.icon size={26} weight="duotone" color="var(--accent-gold)" />
              </div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '10px', letterSpacing: '-0.01em' }}>{a.title}</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.55, margin: 0 }}>{a.desc}</p>
            </GlassCard>
          ))}
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
            <GlassCard
              key={i}
              delay={i * 0.15}
              style={{ background: 'var(--bg-white)', padding: '48px', borderRadius: '24px', border: '1px solid var(--border-subtle)', height: '100%', display: 'flex', flexDirection: 'column' }}
            >
              <span style={{ fontSize: '3.5rem', fontWeight: 800, color: 'var(--accent-gold)', opacity: 0.8, fontFamily: 'var(--font-display)', lineHeight: 1 }}>
                {d.num}
              </span>
              <h3 style={{ fontSize: '1.75rem', margin: '24px 0 16px', letterSpacing: '-0.02em' }}>{d.title}</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0, fontSize: '1.05rem' }}>{d.desc}</p>
            </GlassCard>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── 5b. Who We Serve ──
function WhoWeServe() {
  const segments = [
    {
      icon: GlobeHemisphereEast,
      title: 'Utilities & Government',
      desc: 'Electricity and utility authorities requiring transmission & distribution, substations, testing, commissioning, retrofit and maintenance.',
    },
    {
      icon: HardHat,
      title: 'EPC Contractors & Infrastructure',
      desc: 'Engineering, procurement and construction firms requiring electrical contracting, cabling, installation, protection & control and execution support.',
    },
    {
      icon: ShieldCheck,
      title: 'Industrial, Commercial & Critical Facilities',
      desc: 'Industrial plants, commercial developments, data centers, airports and district cooling requiring reliable, resilient electrical systems.',
    },
  ];

  return (
    <div className="section" style={{ padding: '140px 0', background: '#0a0a0a', color: '#fff' }}>
      <div className="container">
        <RevealOnScroll>
          <span className="eyebrow" style={{ color: 'var(--accent-gold)' }}>Who We Serve</span>
          <h2 style={{ marginBottom: '60px', fontSize: 'clamp(2.5rem, 5vw, 4rem)', letterSpacing: '-0.03em', color: '#fff' }}>
            Built for Mission-Critical Clients
          </h2>
        </RevealOnScroll>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>
          {segments.map((s, i) => (
            <GlassCard
              key={s.title}
              delay={i * 0.12}
              className="card card-3d card-3d-dark"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '24px', padding: '44px 36px', height: '100%' }}
            >
              <s.icon size={32} weight="duotone" color="var(--accent-gold-light)" />
              <h3 style={{ color: '#fff', fontSize: '1.4rem', margin: '24px 0 12px', letterSpacing: '-0.01em' }}>{s.title}</h3>
              <p style={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.6, margin: 0, fontSize: '1rem' }}>{s.desc}</p>
            </GlassCard>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── 6. Stats Strip ──
function StatsStrip() {
  const stats = [
    { num: '220', unit: 'kV', label: 'Grid Capability' },
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
  const approvals = ['DEWA', 'SEWA', 'EtihadWE', 'ISO 9001:2015', 'ISO 14001:2015', 'ISO 45001:2018'];
  return (
    <div style={{ padding: '60px 0', borderTop: '1px solid var(--border-subtle)', borderBottom: '1px solid var(--border-subtle)' }}>
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'center', gap: '32px', flexWrap: 'wrap', alignItems: 'center' }}>
          <span style={{ fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--text-muted)', marginRight: '16px' }}>Project References &amp; Certifications</span>
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
      <Suspense fallback={null}>
        <ScrollJourney3D />
      </Suspense>
      <SolutionAreas />
      <VideoScrub
        src="/assets/vid/electricity.mp4"
        eyebrow="The Grid, Live"
        title="Power that never stops moving"
        body="From switchgear to substation, our systems are built for continuous, reliable delivery — engineered, tested and maintained by one accountable team."
      />
      <KeyDifferentiators />
      <WhoWeServe />
      <StatsStrip />
      <CTA />
    </main>
  );
}
