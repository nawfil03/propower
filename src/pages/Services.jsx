import CTA from '../components/CTA';

export default function Services() {
  
  const divisions = [
    {
      title: "Substations & Power Grid",
      image: "/assets/img/hero-3d.jpg",
      items: [
        "Construction of Electrical Substations up to 132KV",
        "Upgradation & Modification Works up to 220KV",
        "LV, MV, HV & EHV Cable Laying, Jointing and Terminations",
        "Supply, Installation, Testing of Feeder pillars & streetlights"
      ]
    },
    {
      title: "Data Centers & Infrastructure",
      image: "/assets/img/services-datacenter.png",
      items: [
        "Complete turnkey solutions for Data Centers",
        "Electrical works for District cooling plants",
        "On-grid / Off-grid Solar Energy Solutions",
        "Substation Automation & Digitalization"
      ]
    },
    {
      title: "Testing, Commissioning & Maintenance",
      image: "/assets/img/hero-infrastructure.png",
      items: [
        "Electrical Installation, Testing and Commissioning",
        "Transformer Oil Filtration, Regeneration & Refurbishment",
        "Condition Monitoring & Health Assessment",
        "Annual & One Time Maintenance Contracts (AMC)"
      ]
    },
    {
      title: "Advanced Engineering Studies",
      image: "/assets/img/hero-wide.png",
      items: [
        "Power system Study / Load Flow analysis (ETAP & CYME)",
        "Thermography, Partial Discharge, Harmonic & Power Quality Analysis",
        "Design & Technical Support for Substations",
        "Retrofitting and Upgrading – Switchgear & Protection Relays"
      ]
    }
  ];

  return (
    <main id="main">
      
      {/* Clean White Header */}
      <div className="section container" style={{ paddingTop: '20vh', paddingBottom: '10vh' }}>
        <span className="eyebrow" style={{ color: 'var(--accent-gold)' }}>Capabilities</span>
        <h1 style={{ fontSize: 'clamp(3rem, 8vw, 8rem)', fontWeight: 700, letterSpacing: '-0.04em', lineHeight: 1, color: 'var(--text-main)', marginTop: '16px' }}>
          COMPREHENSIVE<br/>EPC SOLUTIONS
        </h1>
      </div>

      <div className="container" style={{ paddingBottom: '120px' }}>
        
        {divisions.map((div, i) => (
          <div key={i} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '60px', marginBottom: '120px', alignItems: 'center' }}>
            
            <div style={{ order: i % 2 === 0 ? 1 : 2 }}>
               <div style={{ width: '100%', height: '400px', borderRadius: '24px', overflow: 'hidden' }}>
                  <img src={div.image} alt={div.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
               </div>
            </div>

            <div style={{ order: i % 2 === 0 ? 2 : 1 }}>
              <h2 style={{ fontSize: '2.5rem', letterSpacing: '-0.02em', marginBottom: '32px' }}>{div.title}</h2>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {div.items.map((item, idx) => (
                  <li key={idx} style={{ fontSize: '1.15rem', color: 'var(--text-secondary)', marginBottom: '16px', display: 'flex', gap: '16px' }}>
                    <span style={{ color: 'var(--text-main)' }}>—</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

          </div>
        ))}

      </div>

      <CTA />
    </main>
  );
}
