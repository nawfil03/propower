import { Suspense, useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import useReducedMotion from '../hooks/useReducedMotion';
import RevealOnScroll from './RevealOnScroll';

const GOLD = '#c4903f';
const GOLD_LIGHT = '#e7c789';
const ELECTRIC = '#5fd4ff';

const COLS = 7;
const ROWS = 3;
const SPACING_X = 2.6;
const SPACING_Y = 2.3;

function gridPosition(col, row, jitter) {
  return [
    (col - (COLS - 1) / 2) * SPACING_X,
    (row - (ROWS - 1) / 2) * SPACING_Y,
    jitter,
  ];
}

// A substation network map: nodes on a loose grid, wired to their neighbors.
function NetworkLattice() {
  const { nodes, geometry } = useMemo(() => {
    const nodeList = [];
    const rand = (seed) => {
      const x = Math.sin(seed * 999) * 10000;
      return x - Math.floor(x);
    };
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        const jitter = (rand(r * COLS + c) - 0.5) * 1.6;
        nodeList.push({ col: c, row: r, pos: gridPosition(c, r, jitter), key: `${r}-${c}` });
      }
    }

    const segments = [];
    nodeList.forEach((n) => {
      const right = nodeList.find((o) => o.row === n.row && o.col === n.col + 1);
      const down = nodeList.find((o) => o.col === n.col && o.row === n.row + 1);
      if (right && rand(n.col * 7 + n.row) > 0.18) segments.push(n.pos, right.pos);
      if (down) segments.push(n.pos, down.pos);
    });

    const positions = new Float32Array(segments.length * 3);
    segments.forEach((p, idx) => {
      positions[idx * 3] = p[0];
      positions[idx * 3 + 1] = p[1];
      positions[idx * 3 + 2] = p[2];
    });
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    return { nodes: nodeList, geometry: geo };
  }, []);

  const trunks = useMemo(() => {
    const arr = [];
    for (let i = 0; i < geometry.attributes.position.count; i += 2) {
      const a = new THREE.Vector3().fromBufferAttribute(geometry.attributes.position, i);
      const b = new THREE.Vector3().fromBufferAttribute(geometry.attributes.position, i + 1);
      arr.push({ a, b, phase: Math.random() });
    }
    return arr;
  }, [geometry]);

  const pulseRefs = useRef([]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    trunks.forEach((trunk, idx) => {
      const mesh = pulseRefs.current[idx];
      if (!mesh) return;
      const progress = (t * 0.22 + trunk.phase) % 1;
      mesh.position.lerpVectors(trunk.a, trunk.b, progress);
      mesh.material.opacity = Math.sin(progress * Math.PI);
    });
  });

  return (
    <group>
      <lineSegments geometry={geometry}>
        <lineBasicMaterial color={ELECTRIC} transparent opacity={0.35} />
      </lineSegments>
      {nodes.map((n) => (
        <mesh key={n.key} position={n.pos}>
          <icosahedronGeometry args={[0.26, 0]} />
          <meshStandardMaterial color="#141414" emissive={GOLD} emissiveIntensity={0.6} metalness={0.7} roughness={0.3} flatShading />
        </mesh>
      ))}
      {trunks.map((trunk, idx) => (
        <mesh key={idx} ref={(el) => { pulseRefs.current[idx] = el; }}>
          <sphereGeometry args={[0.05, 8, 8]} />
          <meshBasicMaterial color={ELECTRIC} transparent />
        </mesh>
      ))}
    </group>
  );
}

function DriftField({ count = 500 }) {
  const ref = useRef(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 26;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 12;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 10 - 4;
    }
    return arr;
  }, [count]);

  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.z += delta * 0.008;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.03} color={GOLD_LIGHT} transparent opacity={0.4} sizeAttenuation depthWrite={false} />
    </points>
  );
}

function Rig({ reduced }) {
  const groupRef = useRef(null);

  useFrame((state) => {
    if (reduced || !groupRef.current) return;
    const t = state.clock.getElapsedTime();
    groupRef.current.rotation.y = Math.sin(t * 0.07) * 0.12;
    groupRef.current.rotation.x = Math.cos(t * 0.05) * 0.04;
    groupRef.current.position.y = Math.sin(t * 0.1) * 0.2;
  });

  return (
    <group ref={groupRef}>
      <NetworkLattice />
      <DriftField />
    </group>
  );
}

function GridScene() {
  const reduced = useReducedMotion();
  return (
    <Canvas
      dpr={[1, 1.6]}
      camera={{ position: [0, 0, 11], fov: 45 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
    >
      <ambientLight intensity={0.45} />
      <pointLight position={[0, 4, 8]} intensity={45} color={GOLD_LIGHT} />
      <pointLight position={[-8, -3, 4]} intensity={25} color={ELECTRIC} />
      <fog attach="fog" args={['#050505', 12, 24]} />
      <Suspense fallback={null}>
        <Rig reduced={reduced} />
      </Suspense>
    </Canvas>
  );
}

export default function LiveGridPulse() {
  return (
    <section className="live-grid" aria-label="ProPower engineered network, illustrative">
      <div className="live-grid-canvas" aria-hidden="true">
        <GridScene />
      </div>
      <div className="live-grid-vignette" />
      <div className="container live-grid-content">
        <RevealOnScroll>
          <span className="eyebrow">The Grid, Engineered</span>
          <h2 style={{ color: '#fff', margin: '20px 0' }}>Power that never stops moving</h2>
          <p style={{ color: 'rgba(255,255,255,0.65)', maxWidth: '620px', margin: '0 auto', fontSize: '1.2rem', lineHeight: 1.7 }}>
            From switchgear to substation, every system we deliver is engineered for continuous, reliable operation — designed, tested and maintained by one accountable team.
          </p>
        </RevealOnScroll>
      </div>
    </section>
  );
}
