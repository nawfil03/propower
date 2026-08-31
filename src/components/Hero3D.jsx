import { Suspense, useEffect, useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import useReducedMotion from '../hooks/useReducedMotion';

const GOLD = '#c4903f';
const GOLD_LIGHT = '#e7c789';
const ELECTRIC = '#5fd4ff';

// Grid nodes rendered as a single Points draw call — represents a distributed power network.
function GridParticles({ reduced, count = 420, radius = 4 }) {
  const pointsRef = useRef(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const phi = Math.acos(2 * Math.random() - 1);
      const theta = Math.random() * Math.PI * 2;
      const r = radius * (0.82 + Math.random() * 0.34);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, [count, radius]);

  useFrame((_, delta) => {
    if (reduced || !pointsRef.current) return;
    pointsRef.current.rotation.y += delta * 0.045;
    pointsRef.current.rotation.x += delta * 0.012;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.032} color={GOLD_LIGHT} transparent opacity={0.6} sizeAttenuation depthWrite={false} />
    </points>
  );
}

// Substation-style energy core: faceted crystal + wireframe shell + ring bus orbits.
function EnergyCore({ reduced }) {
  const coreRef = useRef(null);
  const wireRef = useRef(null);
  const ring1 = useRef(null);
  const ring2 = useRef(null);
  const ring3 = useRef(null);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    if (!reduced) {
      if (coreRef.current) coreRef.current.rotation.y += delta * 0.16;
      if (wireRef.current) wireRef.current.rotation.y -= delta * 0.09;
      if (ring1.current) ring1.current.rotation.z = t * 0.22;
      if (ring2.current) ring2.current.rotation.z = t * 0.18;
      if (ring3.current) ring3.current.rotation.z = t * 0.14;
      if (coreRef.current) coreRef.current.scale.setScalar(1 + Math.sin(t * 1.4) * 0.03);
    }
  });

  return (
    <group>
      <mesh ref={coreRef}>
        <icosahedronGeometry args={[1.15, 2]} />
        <meshStandardMaterial
          color="#141414"
          emissive={GOLD}
          emissiveIntensity={0.55}
          metalness={0.75}
          roughness={0.22}
          flatShading
        />
      </mesh>
      <mesh ref={wireRef} scale={1.42}>
        <icosahedronGeometry args={[1.15, 1]} />
        <meshBasicMaterial color={GOLD_LIGHT} wireframe transparent opacity={0.22} />
      </mesh>
      <mesh ref={ring1} rotation={[Math.PI / 2.3, 0, 0]}>
        <torusGeometry args={[2.1, 0.006, 8, 96]} />
        <meshBasicMaterial color={GOLD} transparent opacity={0.5} />
      </mesh>
      <mesh ref={ring2} rotation={[Math.PI / 3.1, Math.PI / 5, 0]}>
        <torusGeometry args={[2.55, 0.006, 8, 96]} />
        <meshBasicMaterial color={ELECTRIC} transparent opacity={0.4} />
      </mesh>
      <mesh ref={ring3} rotation={[0, Math.PI / 2.5, Math.PI / 6]}>
        <torusGeometry args={[3.0, 0.004, 8, 96]} />
        <meshBasicMaterial color={GOLD} transparent opacity={0.18} />
      </mesh>
    </group>
  );
}

// Subtle pointer-driven parallax tilt on the whole assembly; frozen under reduced motion.
function Rig({ reduced }) {
  const groupRef = useRef(null);
  const target = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (reduced) return;
    const onMove = (e) => {
      target.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      target.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, [reduced]);

  useFrame(() => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += (target.current.x * 0.3 - groupRef.current.rotation.y) * 0.04;
    groupRef.current.rotation.x += (-target.current.y * 0.15 - groupRef.current.rotation.x) * 0.04;
  });

  return (
    <group ref={groupRef}>
      <EnergyCore reduced={reduced} />
      <GridParticles reduced={reduced} />
    </group>
  );
}

export default function Hero3D({ className = '' }) {
  const reduced = useReducedMotion();

  return (
    <div className={className} aria-hidden="true" style={{ position: 'absolute', inset: 0 }}>
      <Canvas
        dpr={[1, 1.75]}
        camera={{ position: [0, 0, 6.4], fov: 42 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[5, 4, 5]} intensity={65} color={GOLD_LIGHT} />
        <pointLight position={[-5, -3, -4]} intensity={20} color={ELECTRIC} />
        <Suspense fallback={null}>
          <Rig reduced={reduced} />
        </Suspense>
      </Canvas>
    </div>
  );
}
