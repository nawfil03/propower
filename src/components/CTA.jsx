import { Link } from 'react-router-dom';
import RevealOnScroll from './RevealOnScroll';
import MagneticButton from './MagneticButton';

export default function CTA() {
  return (
    <div className="section" style={{ padding: '150px 32px', background: 'var(--bg-main)', borderTop: '1px solid var(--border-subtle)', textAlign: 'center' }}>
      <RevealOnScroll>
        <h2 style={{ fontSize: 'clamp(3rem, 6vw, 6rem)', fontWeight: 700, letterSpacing: '-0.04em', lineHeight: 1, marginBottom: '40px' }}>
          READY TO ENERGIZE<br />YOUR NEXT PROJECT?
        </h2>
        <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', marginBottom: '60px', maxWidth: '600px', margin: '0 auto 60px' }}>
          Partner with ProPower to deliver mission-critical electrical infrastructure across the UAE and GCC.
        </p>
        <MagneticButton>
          <Link to="/contact" className="btn btn-primary has-custom-cursor" style={{ fontSize: '1.25rem', padding: '16px 40px' }}>
            Start a Conversation
          </Link>
        </MagneticButton>
      </RevealOnScroll>
    </div>
  );
}
