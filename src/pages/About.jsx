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
        lead="ProPower Engineering & Contracting LLC, established nearly 10 years ago, is a leading integrated engineering solutions provider in the UAE, specializing in electrical engineering, power systems, data centers, automation, ELV, fire & life safety, and infrastructure solutions."
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
              To establish ProPower Engineering & Contracting LLC as a trusted and leading electrical engineering and contracting partner in the UAE and wider GCC, recognized for reliable, technically sound, and cost-effective power solutions.
            </p>
          </div>

          {/* Strategic Direction */}
          <div>
            <span className="eyebrow">Strategic Direction</span>
            <p style={{ fontSize: '1.25rem', lineHeight: 1.6, color: 'var(--text-secondary)', marginTop: '24px', marginBottom: '24px' }}>
              Over the next three years, we aim to strengthen our position in power transmission, utility infrastructure, and testing & commissioning, while aggressively expanding our capabilities in data centers and automation.
            </p>
            <p style={{ fontSize: '1.25rem', lineHeight: 1.6, color: 'var(--text-secondary)' }}>
              Our ultimate goal is to build a technically capable organization undertaking massive, complex projects, developing strategic OEM partnerships, and becoming the definitive preferred partner for utilities and EPC contractors across the region.
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
                style={{ height: '100%' }}
              >
                <div style={{ borderTop: '3px solid var(--accent-gold)', display: 'flex', flexDirection: 'column', height: '100%' }}>
                  <span className="strength-num" style={{ display: 'inline-block', fontSize: '2.5rem', fontWeight: 800, color: 'var(--accent-gold)', fontFamily: 'var(--font-display)' }}>{s.num}</span>
                  <h3 style={{ color: 'var(--text-main)', fontSize: '1.5rem', margin: '20px 0 16px', letterSpacing: '-0.02em' }}>{s.title}</h3>
                  <p style={{ color: 'var(--text-secondary)', lineHeight: 1.65, margin: 0, fontSize: '1rem' }}>{s.desc}</p>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </div>

      {/* ISO standards section */}
      
      {/* Testing Equipment & Tools */}
      <div style={{ background: 'var(--bg-main)', padding: '120px 0' }}>
        <div className="container">
          <RevealOnScroll>
            <span className="eyebrow">Professional Arsenal</span>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', letterSpacing: '-0.03em', marginBottom: '20px' }}>Testing Equipment & Tools</h2>
            <p style={{ maxWidth: '660px', fontSize: '1.1rem', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '56px' }}>
              Our in-house inventory of professional testing and diagnostic equipment enables fast, safe field commissioning with zero third-party dependency.
            </p>
          </RevealOnScroll>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2px', borderRadius: '24px', overflow: 'hidden' }}>
            {[
              { name: 'Omicron CPC100', desc: 'Primary Injection Test Set' },
              { name: 'Omicron CMC356', desc: 'Secondary Injection Test Kit' },
              { name: 'Meggar Programma TM1800', desc: 'Circuit Breaker Timing Analyzer' },
              { name: 'Meggar MIT1025', desc: 'Insulation Resistance Tester' },
              { name: 'Meggar SPI2500', desc: 'Hi-Pot Cable Tester' },
              { name: 'Meggar DLRO600', desc: 'Digital Low Resistance Ohm-Meter' },
              { name: 'Fluke 1760', desc: 'Three-Phase Power Quality Recorder' },
              { name: 'Fluke Ti400+', desc: 'Infrared Thermal Imager' },
              { name: 'Vanguard ATRT 03', desc: 'Automatic Transformer Turns Ratio Tester' },
              { name: 'Dranetz HDPQ', desc: 'Power Quality Analyzer & Monitor' },
              { name: 'ETAP / CYME Software', desc: 'Load Flow, Short Circuit & Arc Flash Analysis' },
            ].map((eq, i) => (
              <RevealOnScroll key={i} delay={i * 0.04}>
                <div style={{ 
                  background: 'var(--bg-secondary)', 
                  padding: '28px 32px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '20px',
                  transition: 'background 0.3s ease',
                }}
                onMouseOver={(e) => e.currentTarget.style.background = 'rgba(196,144,63,0.08)'}
                onMouseOut={(e) => e.currentTarget.style.background = 'var(--bg-secondary)'}
                >
                  <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--accent-gold)', letterSpacing: '0.06em', fontFamily: 'var(--font-display)', minWidth: '28px' }}>{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <span style={{ display: 'block', fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-main)', letterSpacing: '-0.01em' }}>{eq.name}</span>
                    <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{eq.desc}</span>
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </div>
      <div style={{ background: 'var(--bg-secondary)', padding: '120px 0', borderTop: '1px solid var(--border-subtle)' }}>
        <div className="container">
          <span className="eyebrow">Quality & Safety Standards</span>
          <h2 style={{ fontSize: '3rem', letterSpacing: '-0.03em', marginBottom: '60px' }}>Certified Operations</h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
            <GlassCard className="cert-card card-3d">
              <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <div style={{ position: 'relative', height: '380px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderBottom: '1px solid var(--border-subtle)', overflow: 'hidden', background: 'var(--bg-secondary)' }}>
                  <img src="/assets/img/iso-9001.jpg" style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'cover', filter: 'blur(30px)', opacity: 0.5 }} alt="" />
                  <img src="/assets/img/iso-9001.jpg" style={{ position: 'relative', height: '85%', width: 'auto', boxShadow: '0 20px 40px rgba(0,0,0,0.15)', borderRadius: '6px', zIndex: 1, transition: 'transform 0.5s var(--ease-apple)' }} 
                    onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.06) translateY(-8px)'}
                    onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1) translateY(0)'}
                    alt="ISO 9001:2015 Certificate" />
                </div>
                <div style={{ padding: '32px' }}>
                  <h3 style={{ fontSize: '1.5rem', color: 'var(--text-main)', fontWeight: 700, marginBottom: '8px' }}>ISO 9001:2015</h3>
                  <span style={{ fontWeight: 600, display: 'block', marginBottom: '12px', color: 'var(--accent-gold)' }}>Quality Management System</span>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6, margin: 0 }}>
                    Ensuring that our electrical installation, substation construction, and commissioning activities consistently meet customer expectations and regulatory requirements.
                  </p>
                </div>
              </div>
            </GlassCard>

            <GlassCard className="cert-card card-3d">
              <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <div style={{ position: 'relative', height: '380px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderBottom: '1px solid var(--border-subtle)', overflow: 'hidden', background: 'var(--bg-secondary)' }}>
                  <img src="/assets/img/iso-14001.jpg" style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'cover', filter: 'blur(30px)', opacity: 0.5 }} alt="" />
                  <img src="/assets/img/iso-14001.jpg" style={{ position: 'relative', height: '85%', width: 'auto', boxShadow: '0 20px 40px rgba(0,0,0,0.15)', borderRadius: '6px', zIndex: 1, transition: 'transform 0.5s var(--ease-apple)' }} 
                    onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.06) translateY(-8px)'}
                    onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1) translateY(0)'}
                    alt="ISO 14001:2015 Certificate" />
                </div>
                <div style={{ padding: '32px' }}>
                  <h3 style={{ fontSize: '1.5rem', color: 'var(--text-main)', fontWeight: 700, marginBottom: '8px' }}>ISO 14001:2015</h3>
                  <span style={{ fontWeight: 600, display: 'block', marginBottom: '12px', color: 'var(--accent-gold)' }}>Environmental Management System</span>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6, margin: 0 }}>
                    Managing our environmental impacts responsibly, ensuring resource conservation and strict compliance during major field cable installation and substation works.
                  </p>
                </div>
              </div>
            </GlassCard>

            <GlassCard className="cert-card card-3d">
              <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <div style={{ position: 'relative', height: '380px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderBottom: '1px solid var(--border-subtle)', overflow: 'hidden', background: 'var(--bg-secondary)' }}>
                  <img src="/assets/img/iso-45001.jpg" style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'cover', filter: 'blur(30px)', opacity: 0.5 }} alt="" />
                  <img src="/assets/img/iso-45001.jpg" style={{ position: 'relative', height: '85%', width: 'auto', boxShadow: '0 20px 40px rgba(0,0,0,0.15)', borderRadius: '6px', zIndex: 1, transition: 'transform 0.5s var(--ease-apple)' }} 
                    onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.06) translateY(-8px)'}
                    onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1) translateY(0)'}
                    alt="ISO 45001:2018 Certificate" />
                </div>
                <div style={{ padding: '32px' }}>
                  <h3 style={{ fontSize: '1.5rem', color: 'var(--text-main)', fontWeight: 700, marginBottom: '8px' }}>ISO 45001:2018</h3>
                  <span style={{ fontWeight: 600, display: 'block', marginBottom: '12px', color: 'var(--accent-gold)' }}>Occupational Health & Safety System</span>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6, margin: 0 }}>
                    Prioritizing the health, safety, and well-being of our workforce with rigorous risk assessment, protective protocols, and a zero-compromise safety policy in all high-voltage operations.
                  </p>
                </div>
              </div>
            </GlassCard>
          </div>
        </div>
      </div>

      <CTA />
    </main>
  );
}
