import { Link } from 'react-router-dom';
import RevealOnScroll from './RevealOnScroll';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer" style={{ padding: '150px 0 40px', background: 'var(--bg-main)', borderTop: '1px solid var(--border-subtle)' }}>
      <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        
        {/* Elegant Designer Logo */}
        <RevealOnScroll>
          <div style={{
            width: '100%',
            marginBottom: '80px',
            textAlign: 'center',
            display: 'flex',
            justifyContent: 'center',
            padding: '0 20px'
          }}>
            <span className="logo-chip" style={{ padding: '14px 28px' }}>
              <img src="/assets/img/logo-final.svg" alt="ProPower Logo" style={{ width: '100%', maxWidth: '220px', height: 'auto' }} />
            </span>
          </div>
        </RevealOnScroll>

        <div className="footer-grid" style={{ width: '100%', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '60px' }}>
          <RevealOnScroll delay={0.1}>
            <div className="footer-col">
              <h4>Headquarters</h4>
              <p style={{ fontSize: '0.95rem', lineHeight: 1.6, color: 'var(--text-secondary)' }}>
                The ProPower Engineering &amp; Contracting L.L.C.<br />
                Leading Power Solutions across the UAE &amp; GCC
              </p>
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={0.2}>
            <div className="footer-col">
              <h4>Connect</h4>
              <ul>
                <li><a href="mailto:info@propower.ae">info@propower.ae</a></li>
                <li><a href="tel:+971564040765">+971 56 404 0765</a></li>
                <li><a href="tel:+97146657693">+971 4 665 7693</a></li>
              </ul>
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={0.3}>
            <div className="footer-col">
              <h4>Navigation</h4>
              <ul>
                <li><Link to="/about">About Us</Link></li>
                <li><Link to="/services">Capabilities</Link></li>
                <li><Link to="/industries">Industries</Link></li>
                <li><Link to="/contact">Get in Touch</Link></li>
                <li><Link to="/terms">Terms &amp; Conditions</Link></li>
                <li><Link to="/privacy">Privacy Policy</Link></li>
              </ul>
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={0.4}>
             <div className="footer-col">
              <h4>Certifications</h4>
              <ul style={{ gap: '8px' }}>
                <li style={{ fontSize: '0.85rem', fontWeight: 600 }}>ISO 9001:2015</li>
                <li style={{ fontSize: '0.85rem', fontWeight: 600 }}>ISO 14001:2015</li>
                <li style={{ fontSize: '0.85rem', fontWeight: 600 }}>ISO 45001:2018</li>
              </ul>
            </div>
          </RevealOnScroll>
        </div>

        <div className="footer-bottom" style={{ width: '100%', borderTop: '1px solid var(--border-subtle)', paddingTop: '32px', marginTop: '48px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
            © {year} ProPower Engineering &amp; Contracting L.L.C. All rights reserved.
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', fontSize: '0.85rem' }}>
            <Link to="/terms" style={{ color: 'var(--text-secondary)', textDecoration: 'none', transition: 'color 0.2s ease' }}>
              Terms &amp; Conditions
            </Link>
            <span style={{ color: 'var(--border-subtle)' }}>•</span>
            <Link to="/privacy" style={{ color: 'var(--text-secondary)', textDecoration: 'none', transition: 'color 0.2s ease' }}>
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
