import { useEffect, useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import { ShieldCheck, Lightning, PlugsConnected, Wrench, CheckCircle, ArrowRight } from '@phosphor-icons/react';
import { gsap } from '../lib/gsap';
import GlassCard from './GlassCard';

const TOTAL_FRAMES = 300;

// Helper to construct padded frame file paths
const getFrameUrl = (index) => {
  const pad = String(index + 1).padStart(3, '0');
  return `/assets/sequence/ezgif-frame-${pad}.jpg`;
};

// Milestone Details data synced with scroll progress
const milestones = [
  {
    range: [0, 0.25],
    icon: Lightning,
    tag: 'Phase 01 · Grid Connection',
    title: 'High-Voltage Substation Infrastructure',
    desc: 'Turnkey 220kV / 132kV substation civil works, GIS switchgear assembly, and power transformer installation across UAE & GCC utilities.',
    stats: [{ label: 'Voltage Class', val: 'Up to 220kV' }, { label: 'Utility Approval', val: 'DEWA / SEWA' }],
  },
  {
    range: [0.25, 0.50],
    icon: PlugsConnected,
    tag: 'Phase 02 · Transmission Matrix',
    title: 'Power Transmission & EHV Cabling',
    desc: 'Underground high-voltage cable laying, precision jointing, termination, and distribution feeder automation for critical grid stability.',
    stats: [{ label: 'Cabling Standards', val: 'EHV / MV Certified' }, { label: 'Feeder Automation', val: 'SCADA Aligned' }],
  },
  {
    range: [0.50, 0.75],
    icon: Wrench,
    tag: 'Phase 03 · Field Diagnostics',
    title: 'Primary & Secondary Injection Testing',
    desc: 'In-house testing kits for protection relay calibration, circuit breaker timing analysis, and high-potential insulation verification.',
    stats: [{ label: 'Test Equipment', val: 'Calibrated In-House' }, { label: 'Protection Relays', val: 'Micom / SEL / ABB' }],
  },
  {
    range: [0.75, 1.0],
    icon: ShieldCheck,
    tag: 'Phase 04 · Turnkey Execution',
    title: 'Mission-Critical Power Commissioning',
    desc: 'Full-spectrum energization, 24/7 facility power support, data center UPS integration, and ISO 9001 / 14001 / 45001 compliance.',
    stats: [{ label: 'ISO Standards', val: '9001 · 14001 · 45001' }, { label: 'Reliability', val: '100% Guaranteed' }],
  },
];

export default function ScrollFrameSequence() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const imagesRef = useRef([]);
  const frameObj = useRef({ currentFrame: 0 });
  
  const [progress, setProgress] = useState(0);
  const [loadedCount, setLoadedCount] = useState(0);
  const [isReady, setIsReady] = useState(false);

  // Preload frames with priority batching
  useEffect(() => {
    let isCancelled = false;
    const images = new Array(TOTAL_FRAMES);
    let loaded = 0;

    // Load initial 25 priority frames first for instant rendering
    const loadFrame = (i) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.src = getFrameUrl(i);
        img.onload = () => {
          images[i] = img;
          loaded++;
          if (!isCancelled) setLoadedCount(loaded);
          resolve();
        };
        img.onerror = () => {
          images[i] = img;
          loaded++;
          if (!isCancelled) setLoadedCount(loaded);
          resolve();
        };
      });
    };

    const loadSequence = async () => {
      // Priority batch 1 (first 30 frames)
      const priorityPromises = [];
      for (let i = 0; i < 30; i++) {
        priorityPromises.push(loadFrame(i));
      }
      await Promise.all(priorityPromises);
      if (!isCancelled) setIsReady(true);

      // Remaining frames loaded in chunks
      for (let i = 30; i < TOTAL_FRAMES; i += 20) {
        if (isCancelled) break;
        const chunk = [];
        for (let j = i; j < Math.min(i + 20, TOTAL_FRAMES); j++) {
          chunk.push(loadFrame(j));
        }
        await Promise.all(chunk);
      }
    };

    imagesRef.current = images;
    loadSequence();

    return () => {
      isCancelled = true;
    };
  }, []);

  // Render canvas frame on index change or resize
  const renderFrame = (index) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const imgIndex = Math.min(TOTAL_FRAMES - 1, Math.max(0, Math.floor(index)));
    const img = imagesRef.current[imgIndex];

    if (img && img.complete && img.naturalWidth !== 0) {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();

      // Ensure canvas internal buffer dimensions match container with DPR
      if (canvas.width !== rect.width * dpr || canvas.height !== rect.height * dpr) {
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
      }

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, rect.width, rect.height);

      // Cover scaling math (like object-fit: cover)
      const imgWidth = img.naturalWidth;
      const imgHeight = img.naturalHeight;
      const imgRatio = imgWidth / imgHeight;
      const canvasRatio = rect.width / rect.height;

      let drawWidth, drawHeight, offsetX, offsetY;

      if (canvasRatio > imgRatio) {
        drawWidth = rect.width;
        drawHeight = rect.width / imgRatio;
        offsetX = 0;
        offsetY = (rect.height - drawHeight) / 2;
      } else {
        drawWidth = rect.height * imgRatio;
        drawHeight = rect.height;
        offsetX = (rect.width - drawWidth) / 2;
        offsetY = 0;
      }

      ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
      ctx.restore();
    }
  };

  // GSAP ScrollTrigger timeline pin
  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=250%',
          scrub: 0.5,
          pin: true,
          pinType: 'transform',
          onUpdate: (self) => {
            const p = self.progress;
            setProgress(p);
            const targetFrame = p * (TOTAL_FRAMES - 1);
            frameObj.current.currentFrame = targetFrame;
            requestAnimationFrame(() => renderFrame(targetFrame));
          },
        },
      });

      tl.to(frameObj.current, {
        currentFrame: TOTAL_FRAMES - 1,
        ease: 'none',
      });
    });

    return () => mm.revert();
  }, { scope: containerRef });

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      renderFrame(frameObj.current.currentFrame);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Initial draw when ready
  useEffect(() => {
    if (isReady) {
      renderFrame(0);
    }
  }, [isReady]);

  return (
    <div ref={containerRef} className="sequence-pin-container">
      {/* Background Canvas */}
      <canvas ref={canvasRef} className="sequence-canvas" />

      {/* Dark Vignette Gradient Overlays */}
      <div className="sequence-overlay-top" />
      <div className="sequence-overlay-bottom" />

      {/* Header Tag */}
      <div className="sequence-header-tag">
        <span className="eyebrow" style={{ color: 'var(--accent-gold-light)' }}>
          Interactive Engineering Sequence
        </span>
        <h2 style={{ color: '#ffffff', fontSize: 'clamp(1.5rem, 3vw, 2.75rem)', letterSpacing: '-0.03em', margin: '4px 0 0' }}>
          Precision Substation &amp; Power Execution
        </h2>
      </div>

      {/* Progress Bar & Frame Count */}
      <div className="sequence-progress-bar-wrap">
        <div className="sequence-progress-track">
          <div className="sequence-progress-fill" style={{ width: `${Math.round(progress * 100)}%` }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '6px', fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.6)', fontWeight: 600 }}>
          <span>Frame {Math.min(TOTAL_FRAMES, Math.floor(progress * (TOTAL_FRAMES - 1)) + 1)} / {TOTAL_FRAMES}</span>
          <span>{Math.round(progress * 100)}% COMPLETE</span>
        </div>
      </div>

      {/* Synced Floating Detail Cards - Mathematically linked to scroll progress */}
      <div className="sequence-details-container">
        {milestones.map((m, idx) => {
          const Icon = m.icon;
          const [start, end] = m.range;
          const midStart = start === 0 ? start : start + 0.05;
          const midEnd = end === 1.0 ? end : end - 0.05;

          let opacity = 0;
          let y = 60;
          let scale = 0.95;

          if (progress >= start && progress <= end) {
            if (progress < midStart) {
              const t = (progress - start) / 0.05;
              opacity = t;
              y = 60 * (1 - t);
              scale = 0.95 + (0.05 * t);
            } else if (progress > midEnd) {
              const t = (progress - midEnd) / 0.05;
              opacity = 1 - t;
              y = -60 * t;
              scale = 1 + (0.05 * t);
            } else {
              opacity = 1;
              y = 0;
              scale = 1;
            }
          }

          // Don't render completely hidden items to save DOM performance
          if (opacity === 0 && (progress < start || progress > end)) {
            return null;
          }

          return (
            <div
              key={m.tag}
              style={{ 
                position: 'absolute', 
                top: 0, left: 0, width: '100%',
                opacity, 
                transform: `translateY(${y}px) scale(${scale})`, 
                pointerEvents: opacity > 0.5 ? 'auto' : 'none',
                zIndex: opacity > 0.5 ? 10 : 1
              }}
            >
              <GlassCard animateEntrance={false} className="sequence-detail-card">
              <div className="sequence-card-header">
                <div className="sequence-icon-badge">
                  <Icon size={22} color="var(--accent-gold)" weight="duotone" />
                </div>
                <span className="sequence-tag-text">{m.tag}</span>
              </div>

              <h3 className="sequence-card-title" style={{ transform: `translateX(${(1 - opacity) * 30}px)`, opacity: opacity }}>{m.title}</h3>
              <p className="sequence-card-desc" style={{ transform: `translateX(${(1 - opacity) * 40}px)`, opacity: opacity }}>{m.desc}</p>

              <div className="sequence-stats-grid">
                {m.stats.map((st, i) => (
                  <div key={st.label} className="sequence-stat-item" style={{ transform: `translateY(${(1 - opacity) * (20 + i * 10)}px)`, opacity: opacity }}>
                    <span className="sequence-stat-val">{st.val}</span>
                    <span className="sequence-stat-lbl">{st.label}</span>
                  </div>
                ))}
              </div>
              </GlassCard>
            </div>
          );
        })}
      </div>
    </div>
  );
}
