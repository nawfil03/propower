import { useEffect, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import useReducedMotion from '../hooks/useReducedMotion';
import { gsap } from '../lib/gsap';

// Real project photography flown through 3D space as the page scrolls —
// each frame tied to the section it appears behind, in place of abstract
// procedural geometry. CSS 3D transforms driven by GSAP; no WebGL, so no
// texture/lighting artifacts on real photos.
const FRAMES = [
  { src: '/assets/img/hero-wide.png', label: 'Substation Commissioning', side: 'left' },
  { src: '/assets/img/hero-infrastructure.png', label: 'Transmission & Distribution', side: 'right' },
  { src: '/assets/img/services-datacenter.png', label: 'Data Center Critical Power', side: 'left' },
  { src: '/assets/img/hero-substation.png', label: 'Testing & Commissioning', side: 'right' },
  { src: '/assets/img/hero-engineer.png', label: 'Field Engineering Team', side: 'left' },
];

export default function PhotoJourney3D() {
  const reduced = useReducedMotion();
  const stageRef = useRef(null);
  const frameRefs = useRef([]);

  useGSAP(() => {
    if (reduced) return;
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const frames = frameRefs.current.filter(Boolean);
      const slot = 1 / frames.length;

      frames.forEach((el, i) => {
        const dir = i % 2 === 0 ? -1 : 1;
        gsap.set(el, { xPercent: -50, yPercent: -50, z: -2600, opacity: 0, rotateY: dir * 22, scale: 0.7 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: document.body,
            start: `${slot * i * 100}% top`,
            end: `${slot * (i + 1) * 100}% top`,
            scrub: 0.6,
          },
        });
        tl.to(el, { z: -400, opacity: 1, rotateY: 0, scale: 1, ease: 'none' }, 0)
          .to(el, { z: 700, opacity: 0, rotateY: -dir * 18, scale: 1.15, ease: 'none' }, 0.65);
      });
    });
    return () => mm.revert();
  }, { scope: stageRef, dependencies: [reduced] });

  useEffect(() => {
    if (!reduced) return;
    frameRefs.current.forEach((el, i) => {
      if (!el) return;
      gsap.set(el, { xPercent: -50, yPercent: -50, z: 0, opacity: i === 0 ? 1 : 0, rotateY: 0, scale: 1 });
    });
  }, [reduced]);

  return (
    <div className="photo-journey" aria-hidden="true">
      <div ref={stageRef} className="photo-journey-stage">
        {FRAMES.map((f, i) => (
          <div
            key={f.src}
            ref={(el) => { frameRefs.current[i] = el; }}
            className={`photo-journey-frame is-${f.side}`}
          >
            <img src={f.src} alt="" />
            <span className="photo-journey-caption">{f.label}</span>
          </div>
        ))}
      </div>
      <div className="photo-journey-vignette" />
    </div>
  );
}
