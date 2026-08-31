import RevealOnScroll from '../components/RevealOnScroll';
import GlassCard from '../components/GlassCard';
import CTA from '../components/CTA';

const sectors = [
  {
    title: 'Utilities & Government Organizations',
    desc: 'Electricity and utility authorities requiring power transmission and distribution, substations, electrical infrastructure, testing, commissioning, retrofit and maintenance services.',
    img: '/assets/img/hero-3d.jpg',
  },
  {
    title: 'EPC Contractors & Infrastructure Companies',
    desc: 'Engineering, procurement and construction companies requiring electrical contracting, power cabling, installation, testing & commissioning, protection and control, and project execution support.',
    img: '/assets/img/hero-wide.png',
  },
  {
    title: 'Industrial, Commercial & Critical Infrastructure',
    desc: 'Industrial facilities, commercial developments, data centers, airports, district cooling and other critical facilities requiring reliable electrical systems, automation, ELV, retrofit and maintenance solutions.',
    img: '/assets/img/services-datacenter.png',
  },
];

const personas = [
  'Engineering Managers', 'Facility Managers', 'Consultants & Project Owners', 'Procurement Heads', 'Infrastructure Developers',
];

export default function Industries() {
  return (
    <main id="main">

      {/* Clean White Header */}
      <div className="section container" style={{ paddingTop: '20vh', paddingBottom: '10vh' }}>
        <RevealOnScroll>
          <span className="eyebrow" style={{ color: 'var(--accent-gold)' }}>Sectors We Serve</span>
          <h1 style={{ fontSize: 'clamp(3rem, 8vw, 8rem)', fontWeight: 700, letterSpacing: '-0.04em', lineHeight: 1, color: 'var(--text-main)', marginTop: '16px' }}>
            CRITICAL<br/>INFRASTRUCTURE
          </h1>
          <p style={{ maxWidth: '680px', fontSize: '1.25rem', color: 'var(--text-secondary)', marginTop: '32px', lineHeight: 1.6 }}>
            Three primary client segments, one technically capable partner — from utility-grade grid infrastructure to mission-critical facility power.
          </p>
        </RevealOnScroll>
      </div>

      <div className="container" style={{ paddingBottom: '100px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '40px' }}>
          {sectors.map((sec, i) => (
            <GlassCard
              key={sec.title}
              delay={i * 0.12}
              style={{ borderRadius: '24px', overflow: 'hidden', background: 'var(--bg-white)', border: '1px solid var(--border-subtle)', display: 'flex', flexDirection: 'column', height: '100%' }}
            >
              <div style={{ height: '260px', width: '100%', overflow: 'hidden' }}>
                <img src={sec.img} alt={sec.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ padding: '40px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 700, opacity: 0.5 }}>{String(i + 1).padStart(2, '0')}</span>
                <h3 style={{ fontSize: '1.6rem', margin: '16px 0', letterSpacing: '-0.02em', lineHeight: 1.2 }}>{sec.title}</h3>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.65, margin: 0 }}>{sec.desc}</p>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>

      {/* Project references */}
      <div style={{ background: '#0a0a0a', color: '#fff', padding: '120px 0' }}>
        <div className="container">
          <RevealOnScroll>
            <span className="eyebrow" style={{ color: 'var(--accent-gold)' }}>Track Record</span>
            <h2 style={{ color: '#fff', fontSize: 'clamp(2rem, 4vw, 3rem)', letterSpacing: '-0.03em', marginBottom: '24px' }}>
              Project References Across the Region
            </h2>
            <p style={{ maxWidth: '760px', fontSize: '1.15rem', color: 'rgba(255,255,255,0.65)', lineHeight: 1.7 }}>
              Our project references include work associated with SEWA, DEWA and EtihadWE, as well as critical facilities such as airports, district cooling plants, data centers and major commercial and industrial clients — supported by ISO 9001:2015, ISO 14001:2015 and ISO 45001:2018 certified management systems.
            </p>
          </RevealOnScroll>
        </div>
      </div>

      {/* Personas */}
      <div className="section container" style={{ paddingTop: '120px', paddingBottom: '120px' }}>
        <RevealOnScroll>
          <span className="eyebrow">Who We Talk To</span>
          <h2 style={{ marginBottom: '48px', fontSize: 'clamp(2rem, 4vw, 3rem)', letterSpacing: '-0.03em' }}>Messaging Built for Decision-Makers</h2>
        </RevealOnScroll>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', borderTop: '2px solid var(--text-main)', paddingTop: '40px' }}>
          {personas.map((p, i) => (
            <RevealOnScroll key={p} delay={i * 0.06} variant="scale">
              <span style={{ display: 'inline-block', fontSize: '1.05rem', fontWeight: 600, color: 'var(--text-main)', padding: '14px 24px', background: 'var(--bg-secondary)', borderRadius: '999px' }}>
                {p}
              </span>
            </RevealOnScroll>
          ))}
        </div>
      </div>

      <CTA />
    </main>
  );
}
