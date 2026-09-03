import RevealOnScroll from './RevealOnScroll';
import MagneticButton from './MagneticButton';
import AnimatedText from './AnimatedText';

export default function CTA() {
  return (
    <div className="section" style={{ padding: '150px 32px', background: 'var(--bg-main)', borderTop: '1px solid var(--border-subtle)', textAlign: 'center' }}>
      <AnimatedText
        as="h2"
        text={'READY TO ENERGIZE\nYOUR NEXT PROJECT?'}
        align="center"
        style={{ fontSize: 'clamp(3rem, 6vw, 6rem)', fontWeight: 700, letterSpacing: '-0.04em', lineHeight: 1, marginBottom: '40px' }}
      />
      <RevealOnScroll delay={0.2}>
        <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', marginBottom: '60px', maxWidth: '600px', margin: '0 auto 60px' }}>
          Partner with ProPower to deliver mission-critical electrical infrastructure across the UAE and GCC.
        </p>
        <MagneticButton to="/contact" style={{ fontSize: '1.25rem', padding: '16px 40px' }}>
          Start a Conversation
        </MagneticButton>
      </RevealOnScroll>
    </div>
  );
}
