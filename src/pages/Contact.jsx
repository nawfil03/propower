import RevealOnScroll from '../components/RevealOnScroll';

export default function Contact() {
  return (
    <main id="main" style={{ paddingTop: '160px', paddingBottom: '120px' }}>
      <div className="container">
        
        <RevealOnScroll>
          <h1 style={{ fontSize: 'clamp(3rem, 10vw, 10rem)', fontWeight: 700, letterSpacing: '-0.06em', lineHeight: 0.9, marginBottom: '80px' }}>
            START A<br/>PROJECT
          </h1>
        </RevealOnScroll>

        <RevealOnScroll delay={0.2}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '80px', borderTop: '2px solid var(--text-main)', paddingTop: '60px' }}>
            
            <div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '16px' }}>Email</h3>
              <a href="mailto:info@propower.ae" style={{ fontSize: '2rem', fontWeight: 600, color: 'var(--text-secondary)', textDecoration: 'none' }}>
                info@propower.ae
              </a>
            </div>

            <div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '16px' }}>Mobile</h3>
              <a href="tel:+971564040765" style={{ fontSize: '2rem', fontWeight: 600, color: 'var(--text-secondary)', textDecoration: 'none' }}>
                +971 56 404 0765
              </a>
            </div>

            <div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '16px' }}>Landline</h3>
              <a href="tel:+97146657693" style={{ fontSize: '2rem', fontWeight: 600, color: 'var(--text-secondary)', textDecoration: 'none' }}>
                +971 4 665 7693
              </a>
            </div>

          </div>
        </RevealOnScroll>

      </div>
    </main>
  );
}
