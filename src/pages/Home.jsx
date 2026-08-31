import { useEffect, Suspense, lazy } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Lightning, Buildings, PlugsConnected, Gauge, Broadcast, FireSimple,
  HouseLine, Wrench, Path, ShieldCheck, GlobeHemisphereEast, HardHat,
} from '@phosphor-icons/react';

import RevealOnScroll from '../components/RevealOnScroll';
import MagneticButton from '../components/MagneticButton';
import GlassCard from '../components/GlassCard';
import CountUp from '../components/CountUp';
import CTA from '../components/CTA';

const ImmersiveBackground3D = lazy(() => import('../components/ImmersiveBackground3D'));

// ── 1. Hero (Centered and immersive) ──
function Hero() {
  return (
    <div className="section" style={{ minHeight: '90vh', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '180px 24px 80px', position: 'relative' }}>
      <div style={{ maxWidth: '880px', margin: '0 auto', zIndex: 5 }}>
        <motion.span
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="eyebrow"
          style={{ background: 'rgba(196, 144, 63, 0.15)', color: 'var(--accent-gold-light)', border: '1px solid rgba(196, 144, 63, 0.25)' }}
        >
          UAE &amp; GCC · LV / MV / HV Electrical EPC
        </motion.span>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 style={{ fontSize: 'clamp(3rem, 7.5vw, 7.5rem)', fontWeight: 700, letterSpacing: '-0.04em', lineHeight: 0.92, color: '#ffffff', marginTop: '24px' }}>
            ENGINEERING<br/>
            <span style={{ color: 'var(--accent-gold)' }}>CRITICAL</span><br/>
            POWER
          </h1>
        </motion.div>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          style={{ fontSize: '1.3rem', color: 'rgba(255,255,255,0.7)', margin: '32px auto 0', maxWidth: '680px', lineHeight: 1.6 }}
        >
          A single-source partner for electrical contracting, power transmission &amp; distribution, substations, testing &amp; commissioning, and operation &amp; maintenance — trusted across utility, EPC, industrial and data center projects.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          style={{ marginTop: '48px', display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}
        >
          <Link to="/services" className="btn btn-primary" style={{ fontSize: '1rem', background: '#ffffff', color: '#000000', fontWeight: 600 }}>
            Our Capabilities <span className="btn-arrow">→</span>
          </Link>
          <Link to="/contact" className="btn btn-ghost" style={{ fontSize: '1rem', borderColor: 'rgba(255,255,255,0.2)', color: '#ffffff' }}>
            Start a Project
          </Link>
        </motion.div>
      </div>
      
      {/* Scroll Down Indicator */}
      <div style={{ position: 'absolute', bottom: '40px', left: '50%', transform: 'translateX(-50%)', opacity: 0.5, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
        <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.2em', color: 'rgba(255,255,255,0.5)' }}>Scroll Journey</span>
        <motion.div 
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          style={{ width: '2px', height: '24px', background: 'var(--accent-gold)' }}
        />
      </div>
    </div>
  );
}

// ── 2. Full-Width Showcase Image (Styled as a floating showcase card) ──
function ShowcaseImage() {
  return (
    <div className="container" style={{ padding: '40px 32px' }}>
      <motion.div 
        initial={{ opacity: 0, y: 60, scale: 0.96 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        style={{ 
          width: '100%', 
          height: '60vh', 
          minHeight: '400px', 
          borderRadius: '28px', 
          overflow: 'hidden', 
          position: 'relative',
          border: '1px solid rgba(255,255,255,0.1)',
          boxShadow: '0 24px 48px rgba(0,0,0,0.5)'
        }}
      >
        <img 
          src="/assets/img/hero-wide.png" 
          alt="ProPower Substation Project" 
          style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.6) 100%)' }} />
        <div className="showcase-overlay" style={{ position: 'absolute', bottom: '32px', left: '32px', right: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: '16px' }}>
          <div>
            <span style={{ color: 'var(--accent-gold-light)', fontSize: '0.85rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Featured Substation</span>
            <h3 style={{ color: '#fff', fontSize: '1.75rem', marginTop: '8px', letterSpacing: '-0.02em' }}>High-Voltage Grid Infrastructure, up to 220kV</h3>
          </div>
          <div className="showcase-badges" style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            {['DEWA', 'SEWA', 'EtihadWE'].map(badge => (
              <span key={badge} style={{
                padding: '7px 14px',
                background: 'rgba(255,255,255,0.12)',
                backdropFilter: 'blur(8px)',
                borderRadius: '999px',
                color: '#fff',
                fontSize: '11px',
                fontWeight: 600,
                whiteSpace: 'nowrap',
                border: '1px solid rgba(255,255,255,0.15)'
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

// ── 3. Vision Text (Floating, transparent background) ──
function VisionText() {
  return (
    <div className="section container" style={{ padding: '12vh 32px', background: 'transparent' }}>
      <RevealOnScroll>
        <p style={{ fontSize: 'clamp(1.75rem, 3.5vw, 3.5rem)', fontWeight: 600, letterSpacing: '-0.02em', lineHeight: 1.25, color: '#ffffff', maxWidth: '1200px' }}>
          We deliver end-to-end electrical power transmission, distribution, substation, testing, commissioning and maintenance solutions across the UAE and GCC.
        </p>
      </RevealOnScroll>
    </div>
  );
}

// ── 4. Core Disciplines — Floating Glass Bento Grid ──
function CoreDisciplines() {
  const items = [
    { title: 'Substations & Grid up to 220kV', img: '/assets/img/hero-3d.jpg', span: 'span 2', rowSpan: 'span 2' },
    { title: 'Power Transmission & Distribution', img: '/assets/img/hero-infrastructure.png', span: 'span 2', rowSpan: 'span 1' },
    { title: 'Data Center Critical Power', img: '/assets/img/services-datacenter.png', span: 'span 1', rowSpan: 'span 1' },
    { title: 'Testing & Commissioning', img: '/assets/img/hero-substation.png', span: 'span 1', rowSpan: 'span 1' },
  ];

  return (
    <div className="section" style={{ padding: '100px 0', background: 'transparent' }}>
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
                borderRadius: '20px', overflow: 'hidden', position: 'relative', background: 'rgba(20,20,20,0.6)', cursor: 'pointer',
                border: '1px solid rgba(255,255,255,0.08)',
                backdropFilter: 'blur(10px)'
              }}
            >
              <img src={item.img} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.4, transition: 'opacity 0.4s ease' }} 
                onMouseEnter={e => e.target.style.opacity = 0.65}
                onMouseLeave={e => e.target.style.opacity = 0.4}
              />
              <div style={{ position: 'absolute', bottom: '28px', left: '28px', right: '28px', zIndex: 10 }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--accent-gold)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{String(i + 1).padStart(2, '0')}</span>
                <h3 style={{ color: '#fff', fontSize: item.rowSpan === 'span 2' ? '2.25rem' : '1.35rem', lineHeight: 1.15, margin: '8px 0 0', letterSpacing: '-0.02em' }}>
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

// ── 5. Full-Spectrum Solution Areas (9 Cards styled in premium dark glass) ──
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
    <div className="section" style={{ background: 'transparent', padding: '100px 0' }}>
      <div className="container">
        <RevealOnScroll>
          <span className="eyebrow">Complete Portfolio</span>
          <h2 style={{ maxWidth: '760px', marginBottom: '20px', fontSize: 'clamp(2.5rem, 5vw, 4rem)', letterSpacing: '-0.03em', color: '#ffffff' }}>
            Nine Solution Areas, One Accountable Partner
          </h2>
          <p style={{ maxWidth: '640px', fontSize: '1.15rem', color: 'rgba(255,255,255,0.65)', marginBottom: '64px' }}>
            From supply and installation through testing, commissioning and maintenance — every discipline under a single scope of responsibility.
          </p>
        </RevealOnScroll>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
          {areas.map((a, i) => (
            <GlassCard
              key={a.title}
              delay={(i % 3) * 0.08}
              style={{ background: 'rgba(15,15,15,0.5)', padding: '40px 32px', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.06)', backdropFilter: 'blur(12px)' }}
            >
              <div style={{ width: '52px', height: '52px', borderRadius: '14px', background: 'rgba(196, 144, 63, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
                <a.icon size={26} weight="duotone" color="var(--accent-gold)" />
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '12px', color: '#ffffff', letterSpacing: '-0.01em' }}>{a.title}</h3>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.95rem', lineHeight: 1.55, margin: 0 }}>{a.desc}</p>
            </GlassCard>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── 6. Key Differentiators ──
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
      desc: 'Our engineering teams possess extensive reference qualifications and direct project experience aligned with DEWA, SEWA, EtihadWE, and regional electrical grid regulations.'
    },
    {
      num: '03',
      title: 'Single-Source Integration',
      desc: 'From initial panel layout and heavy power cabling to final protection relay testing and annual maintenance contracts (AMC), we eliminate vendor fragmentation.'
    }
  ];

  return (
    <div className="section" style={{ background: 'transparent', padding: '100px 0' }}>
      <div className="container">
        <RevealOnScroll>
          <span className="eyebrow">Strategic Value</span>
          <h2 style={{ marginBottom: '60px', fontSize: 'clamp(2.5rem, 5vw, 4rem)', letterSpacing: '-0.03em', color: '#ffffff' }}>Why ProPower</h2>
        </RevealOnScroll>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px' }}>
          {diffs.map((d, i) => (
            <GlassCard
              key={i}
              delay={i * 0.15}
              style={{ background: 'rgba(15,15,15,0.5)', padding: '48px', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.06)', height: '100%', display: 'flex', flexDirection: 'column', backdropFilter: 'blur(12px)' }}
            >
              <span style={{ fontSize: '3.5rem', fontWeight: 800, color: 'var(--accent-gold)', opacity: 0.8, fontFamily: 'var(--font-display)', lineHeight: 1 }}>
                {d.num}
              </span>
              <h3 style={{ fontSize: '1.75rem', margin: '24px 0 16px', letterSpacing: '-0.02em', color: '#ffffff' }}>{d.title}</h3>
              <p style={{ color: 'rgba(255,255,255,0.65)', lineHeight: 1.6, margin: 0, fontSize: '1.05rem' }}>{d.desc}</p>
            </GlassCard>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── 7. Who We Serve ──
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
    <div className="section" style={{ padding: '100px 0', background: 'transparent' }}>
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
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '24px', padding: '44px 36px', height: '100%', backdropFilter: 'blur(12px)' }}
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

// ── 8. Stats Strip (Clean transparent block) ──
function StatsStrip() {
  const stats = [
    { value: 220, suffix: 'kV', label: 'Grid Capability' },
    { value: 50, suffix: '+', label: 'Major Projects' },
    { value: 3, suffix: '', label: 'ISO Certifications' },
    { value: 5, suffix: '+', label: 'Utility Approvals' },
  ];

  return (
    <div className="section container" style={{ paddingTop: '100px', paddingBottom: '100px', background: 'transparent' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '48px', borderTop: '2px solid rgba(255,255,255,0.1)', paddingTop: '60px' }}>
        {stats.map((s, i) => (
          <RevealOnScroll key={i} delay={i * 0.1}>
            <div>
              <span style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', fontWeight: 700, letterSpacing: '-0.04em', color: '#ffffff', lineHeight: 1 }}>
                <CountUp end={s.value} duration={1600} /><span style={{ color: 'var(--accent-gold)' }}>{s.suffix}</span>
              </span>
              <p style={{ marginTop: '12px', fontSize: '1rem', color: 'rgba(255,255,255,0.6)', fontWeight: 500 }}>{s.label}</p>
            </div>
          </RevealOnScroll>
        ))}
      </div>
    </div>
  );
}

// ── 9. Approvals Row ──
function ApprovalsRow() {
  const approvals = ['DEWA', 'SEWA', 'EtihadWE', 'ISO 9001:2015', 'ISO 14001:2015', 'ISO 45001:2018'];
  return (
    <div style={{ padding: '60px 0', borderTop: '1px solid rgba(255,255,255,0.08)', borderBottom: '1px solid rgba(255,255,255,0.08)', background: 'transparent' }}>
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'center', gap: '32px', flexWrap: 'wrap', alignItems: 'center' }}>
          <span style={{ fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', marginRight: '16px' }}>Project References &amp; Certifications</span>
          {approvals.map(a => (
            <span key={a} style={{ fontSize: '0.9rem', fontWeight: 600, color: 'rgba(255,255,255,0.8)', padding: '8px 20px', background: 'rgba(255,255,255,0.04)', borderRadius: '999px', border: '1px solid rgba(255,255,255,0.06)' }}>
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
  useEffect(() => {
    document.body.classList.add('page-home');
    return () => {
      document.body.classList.remove('page-home');
    };
  }, []);

  return (
    <main id="main" style={{ position: 'relative' }}>
      <Suspense fallback={null}>
        <ImmersiveBackground3D />
      </Suspense>
      <Hero />
      <ShowcaseImage />
      <VisionText />
      <ApprovalsRow />
      <CoreDisciplines />
      <SolutionAreas />
      <KeyDifferentiators />
      <WhoWeServe />
      <StatsStrip />
      <CTA />
    </main>
  );
}
