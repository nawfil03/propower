import { useRef } from 'react';
import { useGSAP } from '@gsap/react';

import CTA from '../components/CTA';
import RevealOnScroll from '../components/RevealOnScroll';
import GlassCard from '../components/GlassCard';
import SectionHero from '../components/SectionHero';
import { gsap } from '../lib/gsap';

const strengths = [
  {
    num: '01',
    title: 'Technical Expertise & Integrated Capabilities',
    desc: 'Strong technical capabilities across LV/MV electrical systems, power transmission and distribution, substations, protection & control, power cabling, automation, data center and specialized electrical solutions.',
  },
  {
    num: '02',
    title: 'Project Execution & Testing Capability',
    desc: 'Ability to support projects from electrical installation and system modification through retrofit, testing & commissioning and maintenance, backed by dedicated site teams and professional electrical testing equipment.',
  },
  {
    num: '03',
    title: 'Utility & Critical Infrastructure Experience',
    desc: 'Experience supporting utility, industrial, commercial and critical infrastructure projects, with project references involving SEWA, DEWA, EtihadWE, airports, district cooling, data centers and other major facilities.',
  },
];

export default function About() {
  const strengthsRef = useRef(null);

  // Presents the three stated strengths in sequence, each rising into place
  // and its number stepping forward as its "turn" is reached in the scroll.
  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const cards = strengthsRef.current.querySelectorAll('.strength-card');
      const nums = strengthsRef.current.querySelectorAll('.strength-num');
      gsap.set(cards, { opacity: 0, y: 50, scale: 0.94 });
      gsap.set(nums, { scale: 0.85 });
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: strengthsRef.current,
          start: 'top 78%',
          end: 'bottom 55%',
          scrub: 0.5,
        },
      });
      cards.forEach((card, i) => {
        tl.to(card, { opacity: 1, y: 0, scale: 1, duration: 1, ease: 'power2.out' }, i * 0.55)
          .to(nums[i], { scale: 1, duration: 1, ease: 'power2.out' }, i * 0.55);
      });
    });
    return () => mm.revert();
  }, { scope: strengthsRef });

  return (
    <main id="main">

      <SectionHero
        eyebrow="About ProPower"
        title={'ENGINEERING\nTHE FUTURE OF POWER'}
        lead="A UAE-based electrical engineering and contracting partner built for utility, EPC and critical infrastructure work — from first line diagram to final commissioning."
        badgeLabel="Founded on Engineering Discipline"
        badgeValue="UAE & GCC"
        image="/assets/img/hero-engineer.png"
        imageAlt="ProPower field engineering team"
      />

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
           <img src="/assets/img/about-team.png" alt="ProPower project team on site" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
      </div>

      {/* Key Strengths */}
      <div style={{ background: 'var(--bg-secondary)', padding: '140px 0', borderTop: '1px solid var(--border-subtle)', borderBottom: '1px solid var(--border-subtle)' }}>
        <div className="container">
          <RevealOnScroll>
            <span className="eyebrow">What Sets Us Apart</span>
            <h2 style={{ marginBottom: '60px', fontSize: 'clamp(2.5rem, 5vw, 4rem)', letterSpacing: '-0.03em' }}>Key Strengths</h2>
          </RevealOnScroll>
          <div ref={strengthsRef} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px' }}>
            {strengths.map((s) => (
              <GlassCard
                key={s.num}
                animateEntrance={false}
                className="card card-3d strength-card"
                style={{ borderTop: '3px solid var(--accent-gold)', background: 'var(--bg-white)', borderRadius: '18px', padding: '32px 28px', height: '100%', boxShadow: 'var(--shadow-sm)' }}
              >
                <span className="strength-num" style={{ display: 'inline-block', fontSize: '2.5rem', fontWeight: 800, color: 'var(--accent-gold)', fontFamily: 'var(--font-display)' }}>{s.num}</span>
                <h3 style={{ color: 'var(--text-main)', fontSize: '1.5rem', margin: '20px 0 16px', letterSpacing: '-0.02em' }}>{s.title}</h3>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.65, margin: 0, fontSize: '1rem' }}>{s.desc}</p>
              </GlassCard>
            ))}
          </div>
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
