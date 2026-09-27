import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useGSAP } from '@gsap/react';
import {
  Lightning, Buildings, PlugsConnected, Gauge, Broadcast, FireSimple,
  HouseLine, Wrench, Path, ShieldCheck, GlobeHemisphereEast, HardHat,
  CheckCircle, ArrowRight
} from '@phosphor-icons/react';

import RevealOnScroll from '../components/RevealOnScroll';
import MagneticButton from '../components/MagneticButton';
import GlassCard from '../components/GlassCard';
import CountUp from '../components/CountUp';
import CTA from '../components/CTA';
import { gsap } from '../lib/gsap';

// ── 1. Hero (Advanced Parallax & Cinematic Fade) ──
function Hero() {
  const bgRef = useRef(null);
  const contentRef = useRef(null);
  const heroRef = useRef(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
      
      tl.to(bgRef.current, { scale: 0.85, opacity: 0.2, filter: 'blur(10px)', ease: 'none' }, 0)
        .to(contentRef.current, { y: -150, opacity: 0, scale: 0.95, ease: 'none' }, 0);
    });
    return () => mm.revert();
  }, { scope: heroRef });

  return (
    <div ref={heroRef} className="section hero-section" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '160px 24px 100px', position: 'relative', overflow: 'hidden', background: '#000' }}>
      <div className="hero-backdrop">
        <img ref={bgRef} src="/assets/img/hero-infrastructure.png" alt="" aria-hidden="true" style={{ width: '100%', height: '100%', objectFit: 'cover', transformOrigin: 'center center' }} />
      </div>

      <div ref={contentRef} style={{ maxWidth: '1120px', margin: '0 auto', zIndex: 5, position: 'relative' }}>
        
        {/* Telemetry Badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', padding: '8px 18px', borderRadius: '999px', background: 'rgba(10, 10, 15, 0.65)', border: '1px solid rgba(196, 144, 63, 0.35)', backdropFilter: 'blur(12px)', marginBottom: '24px' }}
        >
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981', boxShadow: '0 0 10px #10b981' }} />
          <span style={{ fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.12em', color: 'var(--accent-gold-light)', textTransform: 'uppercase' }}>
            UAE &amp; GCC · LV / MV / HV / EHV ELECTRICAL EPC
          </span>
        </motion.div>

        {/* Brisk Display Headline */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 style={{ fontSize: 'clamp(2.5rem, 5.8vw, 5.8rem)', fontWeight: 800, letterSpacing: '-0.035em', lineHeight: 1.02, color: '#ffffff', textShadow: '0 4px 24px rgba(0,0,0,0.6)' }}>
            END-TO-END<br/>
            <span style={{ background: 'linear-gradient(135deg, #f5c878 0%, #c4903f 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              POWER &amp; INFRASTRUCTURE
            </span><br/>
            SOLUTIONS
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          style={{ fontSize: 'clamp(1.05rem, 1.8vw, 1.25rem)', color: 'rgba(255,255,255,0.88)', margin: '28px auto 0', maxWidth: '880px', lineHeight: 1.65, fontWeight: 400 }}
        >
          Single-source Electrical EPC, power transmission &amp; distribution services, power cable laying works, substation construction, Testing &amp; commissioning, and critical asset Maintenance—alongside specialized expertise in protection, SCADA/SCMS, and fiber optic solutions across the UAE &amp; GCC region.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.38, ease: [0.16, 1, 0.3, 1] }}
          style={{ marginTop: '44px', display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}
        >
          <Link to="/services" className="btn btn-primary" style={{ fontSize: '1rem', background: '#ffffff', color: '#000000', fontWeight: 700, padding: '16px 36px', borderRadius: '999px' }}>
            Explore Capabilities <span className="btn-arrow">→</span>
          </Link>
          <Link to="/contact" className="btn btn-ghost" style={{ fontSize: '1rem', borderColor: 'rgba(255,255,255,0.3)', color: '#ffffff', padding: '16px 36px', borderRadius: '999px', backdropFilter: 'blur(10px)' }}>
            Direct Engineering Contact
          </Link>
        </motion.div>
      </div>
      
      {/* Scroll Down Indicator */}
      <div style={{ position: 'absolute', bottom: '36px', left: '50%', transform: 'translateX(-50%)', opacity: 0.6, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
        <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.22em', color: 'rgba(255,255,255,0.6)', fontWeight: 600 }}>Scroll Sequence</span>
        <motion.div 
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          style={{ width: '2px', height: '24px', background: 'var(--accent-gold)' }}
        />
      </div>
    </div>
  );
}

// ── 2. Featured Project — Pinned Scroll Showcase ──
function ShowcaseImage() {
  const sectionRef = useRef(null);
  const headlineRef = useRef(null);
  const frameRef = useRef(null);
  const captionRef = useRef(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.set(frameRef.current, { scale: 0.6, borderRadius: 40 });
      gsap.set(captionRef.current, { opacity: 0, y: 24 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=110%',
          scrub: 0.6,
          pin: true,
          pinType: 'transform',
        },
      });
      tl.to(headlineRef.current, { opacity: 0, y: -24, ease: 'none' }, 0)
        .to(frameRef.current, { scale: 1, borderRadius: 28, ease: 'none' }, 0)
        .to(captionRef.current, { opacity: 1, y: 0, ease: 'none' }, 0.6);
    });
    return () => mm.revert();
  }, {});

  return (
    <div ref={sectionRef} className="showcase-pin">
      <div ref={headlineRef} className="showcase-pin-headline">
        <span className="eyebrow" style={{ justifyContent: 'center' }}>Utility Reference</span>
        <h2 style={{ fontSize: 'clamp(2.2rem, 5vw, 4rem)', fontWeight: 700 }}>Substation &amp; Power Grid Matrix</h2>
      </div>
      <div className="showcase-pin-stage">
        <div ref={frameRef} className="showcase-pin-frame">
          <img
            src="/assets/img/hero-industries.jpg"
            alt="ProPower Substation Grid Infrastructure"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div className="showcase-pin-gradient" />
          <div ref={captionRef} className="showcase-overlay" style={{ position: 'absolute', bottom: '36px', left: '36px', right: '36px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: '20px', flexWrap: 'wrap' }}>
            <div>
              <span style={{ color: 'var(--accent-gold-light)', fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' }}>Turnkey Capability</span>
              <h3 style={{ color: '#fff', fontSize: 'clamp(1.4rem, 2.5vw, 2.25rem)', marginTop: '8px', letterSpacing: '-0.02em', fontWeight: 700 }}>High-Voltage Grid Infrastructure up to 220kV</h3>
            </div>
            <div className="showcase-badges" style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {['DEWA', 'SEWA', 'EtihadWE'].map(badge => (
                <span key={badge} style={{
                  padding: '8px 16px',
                  background: 'rgba(10,10,15,0.75)',
                  backdropFilter: 'blur(12px)',
                  borderRadius: '999px',
                  color: '#fff',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  whiteSpace: 'nowrap',
                  border: '1px solid rgba(196, 144, 63, 0.3)'
                }}>
                  {badge} Approved
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── 3. Vision Text (Cinematic Text Reveal) ──
function VisionText() {
  const sectionRef = useRef(null);
  const textContainerRef = useRef(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const lines = textContainerRef.current.querySelectorAll('.vision-line-inner');
      
      gsap.fromTo(lines, 
        { y: '100%', opacity: 0, rotateX: -45, transformOrigin: 'top center' },
        {
          y: '0%', opacity: 1, rotateX: 0,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 65%',
            end: 'center 45%',
            scrub: 1,
          }
        }
      );
    });
    return () => mm.revert();
  }, { scope: sectionRef });

  return (
    <div ref={sectionRef} className="section container" style={{ padding: '15vh 32px', display: 'flex', alignItems: 'center', minHeight: '60vh', background: 'transparent' }}>
      <div ref={textContainerRef} style={{ fontSize: 'clamp(2rem, 4vw, 3.75rem)', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.2, maxWidth: '1200px', perspective: '1000px' }}>
        {[
          "We deliver end-to-end electrical",
          "power transmission, distribution,",
          "substation, testing, commissioning",
          "and maintenance solutions",
          "across the UAE and GCC."
        ].map((line, i) => (
          <div key={i} className="vision-line" style={{ overflow: 'hidden', display: 'block', paddingBottom: '0.1em' }}>
            <div className="vision-line-inner" style={{ display: 'block' }}>{line}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── 4. Core Disciplines Bento Grid (Dynamic 3D Stagger) ──
function CoreDisciplines() {
  const containerRef = useRef(null);
  const items = [
    { title: 'Substations & Grid up to 220kV', img: '/assets/img/hero-services.jpg', span: 'span 2', rowSpan: 'span 2' },
    { title: 'Power Transmission & Distribution', img: '/assets/img/hero-industries.jpg', span: 'span 2', rowSpan: 'span 1' },
    { title: 'Data Center Critical Power', img: '/assets/img/services-datacenter.png', span: 'span 1', rowSpan: 'span 1' },
    { title: 'Testing & Commissioning', img: '/assets/img/hero-contact.jpg', span: 'span 1', rowSpan: 'span 1' },
  ];

  useGSAP(() => {
    const cards = containerRef.current.querySelectorAll('.core-card');
    
    gsap.from(cards, {
      y: 100,
      scale: 0.9,
      opacity: 0,
      rotateX: 10,
      stagger: 0.1,
      ease: 'power3.out',
      duration: 1,
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80%',
        end: 'top 40%',
        scrub: 1
      }
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="section" style={{ padding: '100px 0', background: 'transparent', perspective: '1200px' }}>
      <div className="container">
        <div style={{ marginBottom: '60px' }}>
          <span className="eyebrow">Solutions Portfolio</span>
          <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4.25rem)', letterSpacing: '-0.03em', color: 'var(--text-main)', fontWeight: 700 }}>Core Disciplines</h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gridAutoRows: '280px', gap: '20px' }}>
          {items.map((item, i) => (
            <GlassCard 
              key={i}
              className="core-card card-3d"
              animateEntrance={false}
              style={{ 
                gridColumn: item.span, gridRow: item.rowSpan,
                cursor: 'pointer'
              }}
            >
              <img src={item.img} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.5, transition: 'transform 0.8s var(--ease-apple), opacity 0.4s ease' }} 
                className="core-card-img"
              />
              <div style={{ position: 'absolute', bottom: '28px', left: '28px', right: '28px', zIndex: 10 }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--accent-gold-light)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>{String(i + 1).padStart(2, '0')}</span>
                <h3 style={{ color: 'var(--text-main)', fontSize: item.rowSpan === 'span 2' ? '2.25rem' : '1.35rem', lineHeight: 1.15, margin: '8px 0 0', letterSpacing: '-0.02em', fontWeight: 700 }}>
                  {item.title}
                </h3>
              </div>
            </GlassCard>
          ))}
        </div>

        <div style={{ marginTop: '50px', textAlign: 'center' }}>
          <MagneticButton to="/services" style={{ background: 'var(--accent-gold)', color: '#ffffff', fontWeight: 700, padding: '16px 36px', borderRadius: '999px' }}>
            View Full Capabilities Portfolio
          </MagneticButton>
        </div>
      </div>
    </div>
  );
}

// ── 5. Solution Areas Grid (Dynamic 3D Stagger) ──
function SolutionAreas() {
  const gridRef = useRef(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const cards = gridRef.current.querySelectorAll('.solution-card');
      gsap.from(cards, {
        opacity: 0,
        scale: 0.92,
        y: 40,
        rotateY: 15,
        duration: 0.8,
        ease: 'power3.out',
        stagger: { each: 0.1, from: 'start', grid: 'auto' },
        scrollTrigger: {
          trigger: gridRef.current,
          start: 'top 85%',
        },
      });
    });
    return () => mm.revert();
  }, { scope: gridRef });

  const areas = [
    { icon: PlugsConnected, title: 'Electrical Engineering & Contracting', desc: 'LV/MV electrical systems, power cabling, distribution panels, busbar trunking, earthing & lightning protection.' },
    { icon: Lightning, title: 'Power, Utility & Energy', desc: 'Transmission & distribution up to 220kV, substations, transformers, protection & control, solar energy.' },
    { icon: Buildings, title: 'Data Center Solutions', desc: 'Critical power systems, UPS & battery banks, power distribution units, remote monitoring & BMS integration.' },
    { icon: Gauge, title: 'Industrial Automation', desc: 'Instrumentation, PLC / SCADA / HMI programming, automation panels, VFD & motor control centers.' },
    { icon: Broadcast, title: 'ELV & Communication', desc: 'Structured cabling (Cat6/Cat6A/Fiber), CCTV, access control, public address & audio-visual systems.' },
    { icon: FireSimple, title: 'Fire & Life Safety', desc: 'Fire alarm & detection, VESDA early smoke detection, emergency lighting & suppression integration.' },
    { icon: HouseLine, title: 'Residential & Commercial', desc: 'Villa & building electrical fit-out, smart home automation, high-efficiency lighting & load management.' },
    { icon: Wrench, title: 'Retrofit, Testing & Maintenance', desc: 'Panel retrofit up to 220kV, primary/secondary injection testing, relay calibration & 24/7 AMC.' },
    { icon: Path, title: 'Infrastructure & Specialized', desc: 'Infrastructure EPC, heavy HV cable installation, temporary power, load flow analysis (ETAP/CYME).' },
  ];

  return (
    <div className="section" style={{ background: 'transparent', padding: '100px 0', perspective: '1500px' }}>
      <div className="container">
        <div style={{ marginBottom: '60px' }}>
          <span className="eyebrow">Complete Portfolio</span>
          <h2 style={{ maxWidth: '780px', marginBottom: '16px', fontSize: 'clamp(2.5rem, 5vw, 4.25rem)', letterSpacing: '-0.03em', color: 'var(--text-main)', fontWeight: 700 }}>
            Nine Solution Areas, One Accountable Scope
          </h2>
          <p style={{ maxWidth: '660px', fontSize: '1.15rem', color: 'var(--text-secondary)' }}>
            From engineering supply and cabling through field testing, commissioning and maintenance — every discipline under single-source accountability.
          </p>
        </div>

        <div ref={gridRef} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
          {areas.map((a) => (
            <GlassCard
              key={a.title}
              animateEntrance={false}
              className="card card-3d solution-card"
              style={{ background: 'var(--bg-secondary)', padding: '40px 32px', borderRadius: '24px', border: '1px solid var(--border-subtle)' }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <div style={{ width: '52px', height: '52px', borderRadius: '14px', background: 'rgba(156, 106, 31, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
                  <a.icon size={26} weight="duotone" color="var(--accent-gold)" />
                </div>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '12px', color: 'var(--text-main)', letterSpacing: '-0.01em', fontWeight: 700 }}>{a.title}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.55, margin: 0 }}>{a.desc}</p>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── 6. Key Differentiators (Dynamic 3D Stagger) ──
function KeyDifferentiators() {
  const containerRef = useRef(null);
  
  useGSAP(() => {
    const cards = containerRef.current.querySelectorAll('.diff-card');
    gsap.from(cards, {
      y: 60,
      opacity: 0,
      stagger: 0.15,
      ease: 'back.out(1.4)',
      duration: 0.8,
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80%',
      }
    });
  }, { scope: containerRef });

  const diffs = [
    {
      num: '01',
      title: 'In-House Testing Equipment',
      desc: 'We operate our own primary/secondary injection test sets, breaker timing analyzers, and high-potential insulation testers for immediate, safe field deployment.'
    },
    {
      num: '02',
      title: 'Utility & Grid Integrity',
      desc: 'Our engineering teams possess direct project experience aligned with DEWA, SEWA, EtihadWE, and regional electrical grid regulations.'
    },
    {
      num: '03',
      title: 'Single-Source Accountability',
      desc: 'From initial design and heavy cabling to final protection relay testing and annual maintenance contracts (AMC), we eliminate vendor fragmentation.'
    }
  ];

  return (
    <div ref={containerRef} className="section" style={{ background: 'transparent', padding: '100px 0' }}>
      <div className="container">
        <div style={{ marginBottom: '60px' }}>
          <span className="eyebrow">Strategic Value</span>
          <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4.25rem)', letterSpacing: '-0.03em', color: 'var(--text-main)', fontWeight: 700 }}>Why ProPower</h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>
          {diffs.map((d, i) => (
            <GlassCard
              key={i}
              className="diff-card card-3d"
              animateEntrance={false}
              style={{ height: '100%' }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <span style={{ fontSize: '3.5rem', fontWeight: 800, color: 'var(--accent-gold)', opacity: 0.85, fontFamily: 'var(--font-display)', lineHeight: 1 }}>
                  {d.num}
                </span>
                <h3 style={{ fontSize: '1.65rem', margin: '24px 0 16px', letterSpacing: '-0.02em', color: 'var(--text-main)', fontWeight: 700 }}>{d.title}</h3>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0, fontSize: '1.05rem' }}>{d.desc}</p>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── 7. Who We Serve (Pinned Horizontal Scroll on Desktop, Native on Mobile) ──
function WhoWeServe() {
  const pinWrapperRef = useRef(null);
  const trackRef = useRef(null);
  const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' ? window.innerWidth < 768 : false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    
    // Only apply pinned scroll on Desktop
    mm.add('(min-width: 768px) and (prefers-reduced-motion: no-preference)', () => {
      const track = trackRef.current;
      const cards = gsap.utils.toArray('.serve-card');
      
      const scrollTween = gsap.to(track, {
        x: () => -(track.scrollWidth - window.innerWidth),
        ease: 'none',
        scrollTrigger: {
          trigger: pinWrapperRef.current,
          pin: true,
          scrub: 1,
          start: 'top top',
          end: () => `+=${track.scrollWidth - window.innerWidth}`,
          invalidateOnRefresh: true,
        }
      });
      
      cards.forEach(card => {
        gsap.fromTo(card.querySelector('.serve-icon-wrap'), 
          { scale: 0.5, opacity: 0 },
          { 
            scale: 1, opacity: 1, ease: 'back.out(1.5)',
            scrollTrigger: {
              trigger: card,
              containerAnimation: scrollTween,
              start: 'left 80%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      });
    });

    return () => mm.revert();
  }, { scope: pinWrapperRef });

  const segments = [
    {
      icon: GlobeHemisphereEast,
      title: 'Utilities & Government',
      desc: 'Electricity and utility authorities requiring transmission & distribution, substations, testing, commissioning, retrofit and maintenance.',
    },
    {
      icon: HardHat,
      title: 'EPC Contractors & Infrastructure',
      desc: 'Engineering, procurement and construction firms requiring electrical contracting, cabling, installation, protection & control and execution support.',
    },
    {
      icon: ShieldCheck,
      title: 'Industrial & Critical Facilities',
      desc: 'Industrial plants, commercial developments, data centers, airports and district cooling requiring reliable, resilient electrical power systems.',
    },
  ];

  return (
    <section 
      ref={pinWrapperRef} 
      style={{ 
        width: '100%',
        background: 'var(--bg-main)', 
        overflow: 'hidden'
      }}
    >
      <div
        style={{ 
          width: '100%',
          height: isMobile ? 'auto' : '100vh',
          minHeight: isMobile ? '100dvh' : '100vh',
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'center', 
          padding: isMobile ? '80px 0' : '0',
          willChange: 'transform'
        }}
      >
      <div className="container" style={{ marginBottom: '40px' }}>
        <span className="eyebrow">Who We Serve</span>
        <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4.25rem)', letterSpacing: '-0.03em', color: 'var(--text-main)', fontWeight: 700, maxWidth: '600px' }}>
          Built for Mission-Critical Infrastructure
        </h2>
      </div>

      <div 
        className="who-we-serve-track-container"
        style={{ 
          width: '100%',
          overflowX: isMobile ? 'auto' : 'visible',
          WebkitOverflowScrolling: 'touch',
          scrollbarWidth: 'none', // hide scrollbar Firefox
          msOverflowStyle: 'none' // hide scrollbar IE
        }}
      >
        <div 
          ref={trackRef} 
          style={{ 
            display: 'flex', 
            width: isMobile ? 'max-content' : 'max-content', 
            paddingLeft: 'max(32px, calc((100vw - var(--container-width)) / 2 + 32px))', 
            paddingRight: 'max(32px, calc((100vw - var(--container-width)) / 2 + 32px))', 
            gap: isMobile ? '20px' : '32px', 
            flexWrap: 'nowrap',
            paddingBottom: isMobile ? '24px' : '0'
          }}
        >
          {segments.map((s, i) => (
            <GlassCard
              key={s.title}
              className="serve-card card-3d"
              animateEntrance={false}
              style={{ 
                width: isMobile ? '85vw' : '400px', 
                maxWidth: '400px',
                flexShrink: 0
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div className="serve-icon-wrap" style={{ width: '64px', height: '64px', borderRadius: '16px', background: 'var(--bg-white)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 0 32px 0', boxShadow: 'var(--shadow-sm)' }}>
                  <s.icon size={36} weight="duotone" color="var(--accent-gold)" />
                </div>
                <h3 style={{ color: 'var(--text-main)', fontSize: '1.6rem', margin: '0 0 16px', letterSpacing: '-0.01em', fontWeight: 700 }}>{s.title}</h3>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0, fontSize: '1.1rem' }}>{s.desc}</p>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
      </div>
    </section>
  );
}

// ── 8. Major Project References ──
function MajorProjects() {
  const containerRef = useRef(null);

  const references = [
    {
      id: 'dewa',
      logo: '/assets/img/official_logos/dewa.png',
      logoAlt: 'DEWA',
      scope: 'Electrical Infrastructure, Power Cabling & Associated Services',
    },
    {
      id: 'etihadwe',
      logo: '/assets/img/official_logos/etihadwe.png',
      logoAlt: 'EtihadWE',
      scope: 'Substation Electrical Works & Power System Services',
    },
    {
      id: 'sewa',
      logo: '/assets/img/official_logos/sewa.png',
      logoAlt: 'SEWA',
      scope: 'Electrical Upgradation, Modification & Associated Works',
    },
    {
      id: 'khazna',
      logo: '/assets/img/official_logos/khazna.png',
      logoAlt: 'Khazna Data Center',
      scope: 'Electrical Cabling, Earthing & Critical Facility Services',
    },
    {
      id: 'empower',
      logo: '/assets/img/official_logos/empower.png',
      logoAlt: 'Empower',
      scope: 'Electrical Systems, Power Cabling & Associated Works',
    },
    {
      id: 'zayed_airport',
      logo: '/assets/img/official_logos/zayed_airport.svg',
      logoAlt: 'Zayed International Airport',
      scope: 'Cable Testing, Earthing & Electrical Services',
    },
  ];

  useGSAP(() => {
    const cards = containerRef.current.querySelectorAll('.project-ref-card');
    gsap.from(cards, {
      y: 30,
      opacity: 0,
      stagger: 0.1,
      ease: 'power2.out',
      duration: 0.7,
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80%',
      },
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="section" style={{ padding: '120px 0', background: 'var(--bg-main)' }}>
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '48px', flexWrap: 'wrap', gap: '24px' }}>
          <div style={{ maxWidth: '640px' }}>
            <span className="eyebrow">Execution Track Record</span>
            <h2 style={{ fontSize: 'clamp(2.25rem, 4vw, 3.5rem)', letterSpacing: '-0.025em', color: 'var(--text-main)', fontWeight: 700, margin: '8px 0 12px' }}>
              Major Project References
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.6, margin: 0 }}>
              Specific engineering contracts delivered across power transmission, substations, critical data centers, and aviation facilities.
            </p>
          </div>
          <Link to="/contact" className="btn btn-ghost" style={{ borderRadius: '999px', padding: '12px 28px' }}>
            Inquire for Scope
          </Link>
        </div>

        <div className="project-references-grid">
          {references.map((item) => (
            <div key={item.id} className="project-ref-card">
              <div className="project-ref-logo-tile">
                <img src={item.logo} alt={item.logoAlt} loading="lazy" />
              </div>
              <p className="project-ref-scope">{item.scope}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── 9. Stats Strip ──
function StatsStrip() {
  const stats = [
    { value: 220, suffix: 'kV', label: 'Grid Capability' },
    { value: 10, suffix: '+', label: 'Years Experience' },
    { value: 3, suffix: '', label: 'ISO Certifications' },
    { value: 9, suffix: '', label: 'Solution Disciplines' },
  ];

  return (
    <div className="section" style={{ padding: '60px 16px', background: 'var(--bg-main)' }}>
      <div className="container" style={{ 
        background: '#0a0a0e', 
        borderRadius: '32px', 
        padding: '60px 24px',
        boxShadow: '0 24px 48px rgba(0,0,0,0.15)',
        border: '1px solid rgba(196, 144, 63, 0.25)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Subtle radial ambient */}
        <div style={{ position: 'absolute', top: '50%', left: '50%', width: '150%', height: '150%', background: 'radial-gradient(circle at center, rgba(196, 144, 63, 0.12) 0%, transparent 60%)', transform: 'translate(-50%, -50%)', pointerEvents: 'none' }} />
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px', position: 'relative', zIndex: 1 }}>
          {stats.map((s, i) => (
            <RevealOnScroll key={i} delay={i * 0.1}>
              <div style={{ 
                textAlign: 'center', 
                padding: '32px 24px', 
                background: 'rgba(255,255,255,0.02)', 
                borderRadius: '24px', 
                backdropFilter: 'blur(10px)', 
                border: '1px solid rgba(255,255,255,0.06)',
                transition: 'transform 0.4s ease, border-color 0.4s ease'
              }}
              onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-8px)'; e.currentTarget.style.borderColor = 'rgba(196,144,63,0.4)'; }}
              onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'; }}
              >
                <span style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: 800, letterSpacing: '-0.02em', color: '#ffffff', lineHeight: 1, fontFamily: 'var(--font-display)', display: 'block' }}>
                  <CountUp end={s.value} duration={1600} /><span style={{ color: 'var(--accent-gold)' }}>{s.suffix}</span>
                </span>
                <p style={{ marginTop: '16px', fontSize: '0.9rem', color: 'rgba(255,255,255,0.65)', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', margin: '16px 0 0' }}>{s.label}</p>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── 9. Major Approvals (Statutory & Regulatory Pre-Qualifications) ──
function ApprovalsRamp() {
  const approvals = [
    {
      id: 'dewa',
      name: 'DEWA',
      label: 'Dubai Electricity & Water Authority',
      type: 'Utility Approval',
      logo: '/assets/img/official_logos/dewa.png'
    },
    {
      id: 'etihadwe',
      name: 'EtihadWE',
      label: 'Etihad Water & Electricity',
      type: 'Federal Utility',
      logo: '/assets/img/official_logos/etihadwe.png'
    },
    {
      id: 'sewa',
      name: 'SEWA',
      label: 'Sharjah Electricity, Water & Gas',
      type: 'Utility Approval',
      logo: '/assets/img/official_logos/sewa.png'
    },
    {
      id: 'rta',
      name: 'RTA',
      label: 'Roads & Transport Authority Dubai',
      type: 'Govt. Infrastructure',
      logo: '/assets/img/official_logos/rta.png'
    },
    {
      id: 'dpworld',
      name: 'DP World',
      label: 'Global Ports & Logistics',
      type: 'Major Enterprise',
      logo: '/assets/img/official_logos/dpworld.svg'
    },
    {
      id: 'khazna',
      name: 'Khazna Data Centers',
      label: 'Hyperscale Mission-Critical DC',
      type: 'Critical Infrastructure',
      logo: '/assets/img/official_logos/khazna.png?v=5'
    },
    {
      id: 'empower',
      name: 'Empower',
      label: 'District Cooling Energy Solutions',
      type: 'Energy Utility',
      logo: '/assets/img/official_logos/empower.png'
    },
    {
      id: 'dubai_airports',
      name: 'Dubai Airports',
      label: 'DXB & DWC Aviation Hubs',
      type: 'Aviation Infrastructure',
      logo: '/assets/img/official_logos/dubai_airports.png?v=5'
    },
    {
      id: 'sharjah_airport',
      name: 'Sharjah Airport',
      label: 'Sharjah International Airport',
      type: 'Aviation Infrastructure',
      logo: '/assets/img/official_logos/sharjah_airport.svg'
    },
    {
      id: 'dubai_municipality',
      name: 'Dubai Municipality',
      label: 'Civic Infrastructure Authority',
      type: 'Govt. Municipal Authority',
      logo: '/assets/img/official_logos/dubai_municipality.svg'
    }
  ];

  // Tripled for seamless infinite loop
  const items = [...approvals, ...approvals, ...approvals];

  return (
    <section className="approvals-ramp-section" id="approvals">
      <div className="container" style={{ marginBottom: '36px' }}>
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto' }}>
          <span className="eyebrow" style={{ marginBottom: '12px', display: 'inline-block', color: 'var(--accent-gold, #C4903F)', fontWeight: 700, letterSpacing: '0.12em' }}>
            Statutory &amp; Regulatory Pre-Qualifications
          </span>
          <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.75rem)', letterSpacing: '-0.025em', color: '#0B1B2B', fontWeight: 800, margin: '0 0 14px', lineHeight: 1.2 }}>
            Major Authority Approvals
          </h2>
          <p style={{ color: 'var(--text-secondary, #4A5568)', fontSize: '1.05rem', lineHeight: '1.6', margin: 0 }}>
            Approved and pre-qualified electrical contractor across major UAE government utilities and infrastructure authorities.
          </p>
        </div>
      </div>

      <div className="approvals-ramp-track">
        <div className="approvals-ramp-inner">
          {items.map((item, idx) => (
            <div key={`${item.id}-${idx}`} className="approval-ramp-tile">
              <div className="approval-ramp-img-wrap">
                <img src={item.logo} alt={item.name} loading="eager" />
              </div>
              <div className="approval-ramp-meta">
                <span className="approval-ramp-type">{item.type}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── MAIN REVAMPED HOME PAGE ──
export default function Home() {
  useEffect(() => {
    document.body.classList.add('page-home');
    return () => {
      document.body.classList.remove('page-home');
    };
  }, []);

  return (
    <main id="main" style={{ position: 'relative' }}>
      <Hero />
      <ShowcaseImage />
      <VisionText />
      <ApprovalsRamp />
      <CoreDisciplines />
      <SolutionAreas />
      <KeyDifferentiators />
      <WhoWeServe />
      <MajorProjects />
      <StatsStrip />
      <CTA />
    </main>
  );
}
