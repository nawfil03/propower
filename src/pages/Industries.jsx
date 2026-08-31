import CTA from '../components/CTA';

export default function Industries() {
  const sectors = [
    { 
      title: "Utilities & Power Grids", 
      desc: "Serving major utility providers across the UAE and GCC with highly reliable infrastructure.",
      img: "/assets/img/hero-3d.jpg"
    },
    { 
      title: "EPC Contractors", 
      desc: "Partnering with major EPCs as a definitive technical authority on electrical works.",
      img: "/assets/img/hero-wide.png"
    },
    { 
      title: "Data Centers", 
      desc: "End-to-end turnkey power solutions for mission-critical IT infrastructure.",
      img: "/assets/img/services-datacenter.png"
    },
    { 
      title: "Industrial Plants", 
      desc: "Heavy-duty electrical transmission and automation for continuous manufacturing.",
      img: "/assets/img/hero-infrastructure.png"
    }
  ];

  return (
    <main id="main">
      
      {/* Clean White Header */}
      <div className="section container" style={{ paddingTop: '20vh', paddingBottom: '10vh' }}>
        <span className="eyebrow" style={{ color: 'var(--accent-gold)' }}>Sectors</span>
        <h1 style={{ fontSize: 'clamp(3rem, 8vw, 8rem)', fontWeight: 700, letterSpacing: '-0.04em', lineHeight: 1, color: 'var(--text-main)', marginTop: '16px' }}>
          CRITICAL<br/>INFRASTRUCTURE
        </h1>
      </div>

      <div className="container" style={{ paddingBottom: '120px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '40px' }}>
          {sectors.map((sec, i) => (
            <div key={i} style={{ borderRadius: '24px', overflow: 'hidden', background: 'var(--bg-white)', border: '1px solid var(--border-subtle)', display: 'flex', flexDirection: 'column' }}>
              <div style={{ height: '300px', width: '100%', overflow: 'hidden' }}>
                <img src={sec.img} alt={sec.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ padding: '40px' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 700, opacity: 0.5 }}>{String(i + 1).padStart(2, '0')}</span>
                <h3 style={{ fontSize: '2rem', margin: '16px 0', letterSpacing: '-0.02em' }}>{sec.title}</h3>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>{sec.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <CTA />
    </main>
  );
}
