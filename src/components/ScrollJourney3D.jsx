import { Suspense, useEffect, useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { motion, useScroll, useTransform } from 'framer-motion';
import useReducedMotion from '../hooks/useReducedMotion';
import RevealOnScroll from './RevealOnScroll';

const GOLD = '#c4903f';
const GOLD_LIGHT = '#e7c789';

const CAPTIONS = [
  {
    range: [0.02, 0.3],
    eyebrow: 'From Design…',
    title: 'Engineered for the grid.',
    body: 'LV/MV/HV electrical systems, substations & transformers up to 220kV.',
  },
  {
    range: [0.38, 0.66],
    eyebrow: '…Through Execution…',
    title: 'Built across the network.',
    body: 'Power transmission & distribution, protection & control, critical data center power.',
  },
  {
    range: [0.72, 0.98],
    eyebrow: '…To Commissioning.',
    title: 'Tested. Verified. Live.',
    body: 'In-house testing & commissioning, retrofit and maintenance — one accountable partner.',
  },
];

// A corridor of drifting nodes the camera flies through — represents the distributed grid.
function DataCorridor({ count = 700 }) {
  const ref = useRef(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const r = 3.2 + Math.random() * 3.6;
      arr[i * 3] = Math.cos(angle) * r;
      arr[i * 3 + 1] = Math.sin(angle) * r;
      arr[i * 3 + 2] = -Math.random() * 42;
    }
    return arr;
  }, [count]);

  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.z += delta * 0.025;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.045} color={GOLD_LIGHT} transparent opacity={0.5} sizeAttenuation depthWrite={false} />
    </points>
  );
}

// Faceted "substation" nodes positioned along the flight path.
function GridNodes() {
  const nodes = useMemo(() => {
    const arr = [];
    const depths = [-8, -16, -24, -32];
    depths.forEach((z, i) => {
      for (let j = 0; j < 3; j++) {
        const angle = (j / 3) * Math.PI * 2 + i * 0.6;
        const r = 4.3;
        arr.push({ x: Math.cos(angle) * r, y: Math.sin(angle) * r, z, key: `${i}-${j}` });
      }
    });
    return arr;
  }, []);

  return (
    <group>
      {nodes.map((n) => (
        <mesh key={n.key} position={[n.x, n.y, n.z]}>
          <icosahedronGeometry args={[0.4, 0]} />
          <meshStandardMaterial color="#141414" emissive={GOLD} emissiveIntensity={0.6} metalness={0.7} roughness={0.3} flatShading />
        </mesh>
      ))}
    </group>
  );
}

// The destination — an energy core that resolves into view as the journey completes.
function DestinationHub({ progressRef, reduced }) {
  const coreRef = useRef(null);
  const wireRef = useRef(null);

  useFrame((_, delta) => {
    const p = progressRef.current;
    if (!reduced) {
      if (coreRef.current) coreRef.current.rotation.y += delta * 0.2;
      if (wireRef.current) wireRef.current.rotation.y -= delta * 0.1;
    }
    const reveal = Math.min(Math.max((p - 0.55) / 0.4, 0), 1);
    const scale = 0.4 + reveal * 1.15;
    if (coreRef.current) coreRef.current.scale.setScalar(scale);
    if (wireRef.current) wireRef.current.scale.setScalar(scale * 1.35);
  });

  return (
    <group position={[0, 0, -38]}>
      <mesh ref={coreRef}>
        <icosahedronGeometry args={[1.3, 2]} />
        <meshStandardMaterial color="#141414" emissive={GOLD} emissiveIntensity={0.6} metalness={0.75} roughness={0.2} flatShading />
      </mesh>
      <mesh ref={wireRef}>
        <icosahedronGeometry args={[1.3, 1]} />
        <meshBasicMaterial color={GOLD_LIGHT} wireframe transparent opacity={0.3} />
      </mesh>
    </group>
  );
}

// Reads scroll progress from a ref each frame (no React re-renders) and dollies the camera through the scene.
function CameraRig({ progressRef }) {
  useFrame((state) => {
    const p = progressRef.current;
    const targetZ = 6 - p * 44;
    const targetX = Math.sin(p * Math.PI * 2) * 0.6;
    const targetY = Math.cos(p * Math.PI * 1.4) * 0.3;
    state.camera.position.z += (targetZ - state.camera.position.z) * 0.08;
    state.camera.position.x += (targetX - state.camera.position.x) * 0.05;
    state.camera.position.y += (targetY - state.camera.position.y) * 0.05;
    state.camera.lookAt(0, 0, state.camera.position.z - 10);
  });
  return null;
}

function Scene({ progressRef, reduced }) {
  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[0, 0, 4]} intensity={40} color={GOLD_LIGHT} />
      <pointLight position={[6, 4, -20]} intensity={30} color="#ffffff" />
      <fog attach="fog" args={['#050505', 8, 46]} />
      <CameraRig progressRef={progressRef} />
      <DataCorridor />
      <GridNodes />
      <DestinationHub progressRef={progressRef} reduced={reduced} />
    </>
  );
}

function Caption({ scrollYProgress, range, eyebrow, title, body, index }) {
  const [start, end] = range;
  const fadeIn = start + (end - start) * 0.25;
  const fadeOut = end - (end - start) * 0.25;
  const opacity = useTransform(scrollYProgress, [start, fadeIn, fadeOut, end], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [start, fadeIn, fadeOut, end], [24, 0, 0, -24]);

  return (
    <motion.div className={`scroll-journey-caption${index % 2 === 1 ? ' is-right' : ''}`} style={{ opacity, y }}>
      <div className="inner">
        <span className="eyebrow" style={{ background: 'rgba(196, 144, 63, 0.18)' }}>{eyebrow}</span>
        <h3>{title}</h3>
        <p>{body}</p>
      </div>
    </motion.div>
  );
}

function ScrollJourneyAnimated() {
  const containerRef = useRef(null);
  const progressRef = useRef(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  useEffect(() => {
    progressRef.current = scrollYProgress.get();
    return scrollYProgress.on('change', (v) => {
      progressRef.current = v;
    });
  }, [scrollYProgress]);

  return (
    <section ref={containerRef} className="scroll-journey" aria-label="How ProPower delivers a project, from design to commissioning">
      <div className="scroll-journey-sticky">
        <div className="scroll-journey-canvas" aria-hidden="true">
          <Canvas
            dpr={[1, 1.6]}
            camera={{ position: [0, 0, 6], fov: 50 }}
            gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
          >
            <Suspense fallback={null}>
              <Scene progressRef={progressRef} reduced={false} />
            </Suspense>
          </Canvas>
        </div>
        <div className="scroll-journey-vignette" />
        {CAPTIONS.map((c, i) => (
          <Caption key={c.title} scrollYProgress={scrollYProgress} index={i} {...c} />
        ))}
      </div>
    </section>
  );
}

// Static, non-pinned fallback for users who prefer reduced motion.
function ScrollJourneyStatic() {
  return (
    <div style={{ background: '#050505', padding: '120px 0' }}>
      <div className="container" style={{ display: 'grid', gap: '48px' }}>
        {CAPTIONS.map((c, i) => (
          <RevealOnScroll key={c.title} delay={i * 0.1}>
            <div style={{ maxWidth: '560px' }}>
              <span className="eyebrow" style={{ background: 'rgba(196, 144, 63, 0.18)' }}>{c.eyebrow}</span>
              <h3 style={{ color: '#fff', fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', letterSpacing: '-0.03em', margin: '16px 0' }}>{c.title}</h3>
              <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '1.1rem', lineHeight: 1.6 }}>{c.body}</p>
            </div>
          </RevealOnScroll>
        ))}
      </div>
    </div>
  );
}

export default function ScrollJourney3D() {
  const reduced = useReducedMotion();
  return reduced ? <ScrollJourneyStatic /> : <ScrollJourneyAnimated />;
}
