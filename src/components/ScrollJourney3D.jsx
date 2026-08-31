import { Suspense, useEffect, useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { motion, useScroll, useTransform } from 'framer-motion';
import * as THREE from 'three';
import useReducedMotion from '../hooks/useReducedMotion';
import RevealOnScroll from './RevealOnScroll';

const GOLD = '#c4903f';
const GOLD_LIGHT = '#e7c789';
const ELECTRIC = '#5fd4ff';

// Shared grid geometry — four "ring bus" stations, three nodes each, the camera flies through.
const RING_DEPTHS = [-4, -12, -20, -28];
const RING_RADIUS = 4.3;
const HUB_Z = -34;

function nodePosition(i, j) {
  const angle = (j / 3) * Math.PI * 2 + i * 0.6;
  return [Math.cos(angle) * RING_RADIUS, Math.sin(angle) * RING_RADIUS, RING_DEPTHS[i]];
}

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

// A dense corridor of drifting points the camera flies through — the distributed grid.
function DataCorridor({ count = 1100 }) {
  const ref = useRef(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const r = 1.6 + Math.random() * 2.4;
      arr[i * 3] = Math.cos(angle) * r;
      arr[i * 3 + 1] = Math.sin(angle) * r;
      arr[i * 3 + 2] = -Math.random() * 36;
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
      <pointsMaterial size={0.05} color={GOLD_LIGHT} transparent opacity={0.55} sizeAttenuation depthWrite={false} />
    </points>
  );
}

// Faceted "substation" nodes positioned along the flight path.
function GridNodes() {
  const nodes = useMemo(() => {
    const arr = [];
    RING_DEPTHS.forEach((_, i) => {
      for (let j = 0; j < 3; j++) {
        arr.push({ pos: nodePosition(i, j), key: `${i}-${j}` });
      }
    });
    return arr;
  }, []);

  return (
    <group>
      {nodes.map((n) => (
        <mesh key={n.key} position={n.pos}>
          <icosahedronGeometry args={[0.42, 0]} />
          <meshStandardMaterial color="#141414" emissive={GOLD} emissiveIntensity={0.65} metalness={0.7} roughness={0.3} flatShading />
        </mesh>
      ))}
    </group>
  );
}

// The literal wiring — ring-bus triangles at each station, trunk lines running between stations.
function GridLattice() {
  const geometry = useMemo(() => {
    const segments = [];
    RING_DEPTHS.forEach((_, i) => {
      for (let j = 0; j < 3; j++) {
        segments.push(nodePosition(i, j), nodePosition(i, (j + 1) % 3));
      }
      if (i < RING_DEPTHS.length - 1) {
        for (let j = 0; j < 3; j++) {
          segments.push(nodePosition(i, j), nodePosition(i + 1, j));
        }
      }
    });
    const positions = new Float32Array(segments.length * 3);
    segments.forEach((p, idx) => {
      positions[idx * 3] = p[0];
      positions[idx * 3 + 1] = p[1];
      positions[idx * 3 + 2] = p[2];
    });
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geo;
  }, []);

  return (
    <lineSegments geometry={geometry}>
      <lineBasicMaterial color={ELECTRIC} transparent opacity={0.4} />
    </lineSegments>
  );
}

// Small emissive pulses that travel the trunk lines — current flowing through the network.
function EnergyPulses() {
  const trunks = useMemo(() => {
    const arr = [];
    for (let i = 0; i < RING_DEPTHS.length - 1; i++) {
      for (let j = 0; j < 3; j++) {
        arr.push({
          start: new THREE.Vector3(...nodePosition(i, j)),
          end: new THREE.Vector3(...nodePosition(i + 1, j)),
          phase: Math.random(),
        });
      }
    }
    return arr;
  }, []);

  const refs = useRef([]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    trunks.forEach((trunk, idx) => {
      const mesh = refs.current[idx];
      if (!mesh) return;
      const progress = (t * 0.35 + trunk.phase) % 1;
      mesh.position.lerpVectors(trunk.start, trunk.end, progress);
    });
  });

  return (
    <group>
      {trunks.map((_, idx) => (
        <mesh key={idx} ref={(el) => { refs.current[idx] = el; }}>
          <sphereGeometry args={[0.075, 8, 8]} />
          <meshBasicMaterial color={ELECTRIC} />
        </mesh>
      ))}
    </group>
  );
}

// The destination — an energy core with an orbiting ring bus that resolves into view.
function DestinationHub({ progressRef, reduced }) {
  const coreRef = useRef(null);
  const wireRef = useRef(null);
  const ringRef = useRef(null);

  useFrame((state, delta) => {
    const p = progressRef.current;
    if (!reduced) {
      if (coreRef.current) coreRef.current.rotation.y += delta * 0.2;
      if (wireRef.current) wireRef.current.rotation.y -= delta * 0.1;
      if (ringRef.current) ringRef.current.rotation.z = state.clock.getElapsedTime() * 0.15;
    }
    const reveal = Math.min(Math.max((p - 0.55) / 0.4, 0), 1);
    const scale = 0.4 + reveal * 1.15;
    if (coreRef.current) coreRef.current.scale.setScalar(scale);
    if (wireRef.current) wireRef.current.scale.setScalar(scale * 1.35);
    if (ringRef.current) ringRef.current.scale.setScalar(scale * 1.8);
  });

  return (
    <group position={[0, 0, HUB_Z]}>
      <mesh ref={coreRef}>
        <icosahedronGeometry args={[1.3, 2]} />
        <meshStandardMaterial color="#141414" emissive={GOLD} emissiveIntensity={0.6} metalness={0.75} roughness={0.2} flatShading />
      </mesh>
      <mesh ref={wireRef}>
        <icosahedronGeometry args={[1.3, 1]} />
        <meshBasicMaterial color={GOLD_LIGHT} wireframe transparent opacity={0.3} />
      </mesh>
      <mesh ref={ringRef} rotation={[Math.PI / 2.3, 0, 0]}>
        <torusGeometry args={[2, 0.012, 8, 96]} />
        <meshBasicMaterial color={ELECTRIC} transparent opacity={0.55} />
      </mesh>
    </group>
  );
}

// Reads scroll progress from a ref each frame (no React re-renders) and dollies the camera through the scene.
function CameraRig({ progressRef }) {
  useFrame((state) => {
    const p = progressRef.current;
    // Stop well short of the destination hub (HUB_Z) so the camera never flies into the mesh.
    const targetZ = Math.max(6 - p * 40, HUB_Z + 6);
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
      <pointLight position={[6, 4, -20]} intensity={26} color={ELECTRIC} />
      <fog attach="fog" args={['#050505', 8, 40]} />
      <CameraRig progressRef={progressRef} />
      <gridHelper args={[100, 30, ELECTRIC, '#141414']} position={[0, -9, -18]} />
      <DataCorridor />
      <GridLattice />
      <GridNodes />
      <EnergyPulses />
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
