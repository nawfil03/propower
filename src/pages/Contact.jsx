import RevealOnScroll from '../components/RevealOnScroll';
import SectionHero from '../components/SectionHero';

export default function Contact() {
  return (
    <main id="main" style={{ paddingBottom: '120px' }}>
      <SectionHero
        eyebrow="Get In Touch"
        title={'START A\nPROJECT'}
        lead="Tell us about your substation, transmission, data center or maintenance requirement — our engineering team responds directly, no call center."
        badgeLabel="Direct Engineering Contact"
        badgeValue="UAE Based"
      />

      <div className="container">
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
