import CTA from '../components/CTA';

export default function About() {
  return (
    <main id="main">
      
      {/* Clean White Header */}
      <div className="section container" style={{ paddingTop: '20vh', paddingBottom: '10vh' }}>
         <h1 style={{ fontSize: 'clamp(3rem, 8vw, 8rem)', fontWeight: 700, letterSpacing: '-0.04em', lineHeight: 1, color: 'var(--text-main)' }}>
          ENGINEERING<br/>THE FUTURE<br/>OF POWER
        </h1>
      </div>

      <div className="container" style={{ paddingBottom: '120px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '80px' }}>
          
          {/* Vision */}
          <div>
            <span className="eyebrow">Our Vision</span>
            <p style={{ fontSize: '1.5rem', lineHeight: 1.6, color: 'var(--text-main)', marginTop: '24px' }}>
              To establish The ProPower Engineering & Contracting LLC as a trusted and leading electrical engineering and contracting partner in the UAE and wider GCC, recognized for reliable, technically sound, and cost-effective power solutions.
            </p>
          </div>

          {/* 3-Year Goal */}
          <div>
            <span className="eyebrow">Strategic Direction</span>
            <p style={{ fontSize: '1.25rem', lineHeight: 1.6, color: 'var(--text-secondary)', marginTop: '24px', marginBottom: '24px' }}>
              Over the next three years, we aim to strengthen our position in power transmission, utility infrastructure, and testing & commissioning, while aggressively expanding our capabilities in data centers and automation.
            </p>
            <p style={{ fontSize: '1.25rem', lineHeight: 1.6, color: 'var(--text-secondary)' }}>
              Our ultimate goal is to build a technically capable organization capable of undertaking massive, complex projects, developing strategic OEM partnerships, and becoming the definitive preferred partner for utilities and EPC contractors.
            </p>
          </div>

        </div>

        {/* Inline image */}
        <div style={{ marginTop: '120px', width: '100%', height: '500px', borderRadius: '24px', overflow: 'hidden' }}>
           <img src="/assets/img/hero-wide.png" alt="ProPower Substation" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
      </div>

      {/* ISO standards section */}
      <div style={{ background: 'var(--bg-secondary)', padding: '120px 0', borderTop: '1px solid var(--border-subtle)' }}>
        <div className="container">
          <span className="eyebrow">Quality & Safety Standards</span>
          <h2 style={{ fontSize: '3rem', letterSpacing: '-0.03em', marginBottom: '60px' }}>Certified Operations</h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
            <div style={{ background: 'var(--bg-white)', padding: '40px', borderRadius: '20px', border: '1px solid var(--border-subtle)' }}>
              <h3 style={{ fontSize: '1.5rem', color: 'var(--accent-gold)', fontWeight: 700, marginBottom: '16px' }}>ISO 9001:2015</h3>
              <span style={{ fontWeight: 600, display: 'block', marginBottom: '12px' }}>Quality Management System</span>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.6 }}>
                Ensuring that our electrical installation, substation construction, and commissioning activities consistently meet customer expectations and regulatory requirements.
              </p>
            </div>

            <div style={{ background: 'var(--bg-white)', padding: '40px', borderRadius: '20px', border: '1px solid var(--border-subtle)' }}>
              <h3 style={{ fontSize: '1.5rem', color: 'var(--accent-gold)', fontWeight: 700, marginBottom: '16px' }}>ISO 14001:2015</h3>
              <span style={{ fontWeight: 600, display: 'block', marginBottom: '12px' }}>Environmental Management System</span>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.6 }}>
                Managing our environmental impacts responsibly, ensuring resource conservation and strict compliance during major field cable installation and substation works.
              </p>
            </div>

            <div style={{ background: 'var(--bg-white)', padding: '40px', borderRadius: '20px', border: '1px solid var(--border-subtle)' }}>
              <h3 style={{ fontSize: '1.5rem', color: 'var(--accent-gold)', fontWeight: 700, marginBottom: '16px' }}>ISO 45001:2018</h3>
              <span style={{ fontWeight: 600, display: 'block', marginBottom: '12px' }}>Occupational Health & Safety System</span>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.6 }}>
                Prioritizing the health, safety, and well-being of our workforce with rigorous risk assessment, protective protocols, and a zero-compromise safety policy in all high-voltage operations.
              </p>
            </div>
          </div>
        </div>
      </div>

      <CTA />
    </main>
  );
}
