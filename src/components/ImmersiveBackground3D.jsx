import { Suspense, useEffect, useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useScroll } from 'framer-motion';
import * as THREE from 'three';
import useReducedMotion from '../hooks/useReducedMotion';

const GOLD = '#c4903f';
const GOLD_LIGHT = '#e7c789';
const ELECTRIC = '#5fd4ff';

const HUB_Z = -36;

// ── 1. Transmission Tower (Pylon) ──
function TransmissionTower({ position }) {
  const ref = useRef(null);
  const pylonGeometry = useMemo(() => {
    const points = [];
    const b = 0.8; // base width
    const t = 0.25; // top width
    const h = 4.0; // height
    
    // 4 Corner Legs
    points.push(new THREE.Vector3(-b, -h/2, -b), new THREE.Vector3(-t, h/2, -t));
    points.push(new THREE.Vector3(b, -h/2, -b), new THREE.Vector3(t, h/2, -t));
    points.push(new THREE.Vector3(b, -h/2, b), new THREE.Vector3(t, h/2, t));
    points.push(new THREE.Vector3(-b, -h/2, b), new THREE.Vector3(-t, h/2, t));
    
    // Cross rings and diagonal bracing
    const levels = 3;
    for (let i = 0; i <= levels; i++) {
      const y = -h/2 + (h * i) / levels;
      const w = b - (b - t) * (i / levels);
      
      // Horizontal frame
      points.push(new THREE.Vector3(-w, y, -w), new THREE.Vector3(w, y, -w));
      points.push(new THREE.Vector3(w, y, -w), new THREE.Vector3(w, y, w));
      points.push(new THREE.Vector3(w, y, w), new THREE.Vector3(-w, y, w));
      points.push(new THREE.Vector3(-w, y, w), new THREE.Vector3(-w, y, -w));
      
      // Diagonals
      if (i < levels) {
        const ny = -h/2 + (h * (i+1)) / levels;
        const nw = b - (b - t) * ((i+1) / levels);
        points.push(new THREE.Vector3(-w, y, -w), new THREE.Vector3(nw, ny, nw));
        points.push(new THREE.Vector3(w, y, -w), new THREE.Vector3(-nw, ny, nw));
      }
    }
    
    // Pylon Cross Arms
    const armY1 = h/2 - 1.0;
    const armW1 = 1.6;
    points.push(new THREE.Vector3(-armW1, armY1, 0), new THREE.Vector3(armW1, armY1, 0));
    
    const armY2 = h/2 - 0.2;
    const armW2 = 1.2;
    points.push(new THREE.Vector3(-armW2, armY2, 0), new THREE.Vector3(armW2, armY2, 0));

    const geo = new THREE.BufferGeometry().setFromPoints(points);
    return geo;
  }, []);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.15) * 0.15;
  });

  return (
    <group position={position} ref={ref}>
      <lineSegments geometry={pylonGeometry}>
        <lineBasicMaterial color={ELECTRIC} transparent opacity={0.35} />
      </lineSegments>
      {/* Insulator points */}
      <mesh position={[-1.4, 1.0, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 0.4, 6]} />
        <meshBasicMaterial color={GOLD} />
      </mesh>
      <mesh position={[1.4, 1.0, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 0.4, 6]} />
        <meshBasicMaterial color={GOLD} />
      </mesh>
    </group>
  );
}

// ── 2. Bushing Insulator Component (Substation Detail) ──
function Bushing({ position }) {
  return (
    <group position={position}>
      <mesh position={[0, 0.15, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 0.6, 8]} />
        <meshBasicMaterial color={GOLD_LIGHT} />
      </mesh>
      <mesh position={[0, 0, 0]}>
        <torusGeometry args={[0.12, 0.04, 8, 16]} />
        <meshStandardMaterial color="#1f1f2e" roughness={0.4} />
      </mesh>
      <mesh position={[0, 0.08, 0]}>
        <torusGeometry args={[0.1, 0.03, 8, 16]} />
        <meshStandardMaterial color="#1f1f2e" roughness={0.4} />
      </mesh>
      <mesh position={[0, 0.16, 0]}>
        <torusGeometry args={[0.08, 0.025, 8, 16]} />
        <meshStandardMaterial color="#1f1f2e" roughness={0.4} />
      </mesh>
    </group>
  );
}

// ── 3. Power Transformer ──
function PowerTransformer({ position }) {
  const ref = useRef(null);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.getElapsedTime() * 0.1;
    ref.current.position.y = position[1] + Math.sin(state.clock.getElapsedTime() * 0.4) * 0.1;
  });

  return (
    <group position={position} ref={ref}>
      {/* Main Tank */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1.8, 1.2, 1.2]} />
        <meshStandardMaterial color="#0e0e12" roughness={0.5} metalness={0.8} transparent opacity={0.5} />
      </mesh>
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1.81, 1.21, 1.21]} />
        <meshBasicMaterial color={ELECTRIC} wireframe transparent opacity={0.15} />
      </mesh>
      
      {/* Radiator Fins (Fitted Box Matrix) */}
      <mesh position={[-1.0, 0, 0]}>
        <boxGeometry args={[0.2, 1.0, 1.0]} />
        <meshStandardMaterial color="#08080a" roughness={0.6} />
      </mesh>
      <mesh position={[1.0, 0, 0]}>
        <boxGeometry args={[0.2, 1.0, 1.0]} />
        <meshStandardMaterial color="#08080a" roughness={0.6} />
      </mesh>

      {/* High-Voltage Bushings (Insulators on Top) */}
      <Bushing position={[-0.4, 0.6, 0.2]} />
      <Bushing position={[0, 0.6, 0.2]} />
      <Bushing position={[0.4, 0.6, 0.2]} />

      {/* Conservator Tank (Cylinder on Top) */}
      <mesh position={[0, 0.8, -0.3]} rotation={[0, 0, Math.PI/2]}>
        <cylinderGeometry args={[0.18, 0.18, 1.0, 12]} />
        <meshStandardMaterial color="#14141c" roughness={0.4} metalness={0.7} />
      </mesh>
    </group>
  );
}

// ── 4. Server Rack ──
function ServerRack({ position }) {
  const ledRef = useRef(null);
  const { positions, colors } = useMemo(() => {
    const pts = [];
    const cls = [];
    const cols = 3;
    const rows = 10;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        pts.push(
          (c - (cols - 1) / 2) * 0.2, 
          (r - (rows - 1) / 2) * 0.16, 
          0.41
        );
        const active = Math.random() > 0.4;
        cls.push(0, active ? 0.7 : 0.1, active ? 1.0 : 0.2);
      }
    }
    return { positions: new Float32Array(pts), colors: new Float32Array(cls) };
  }, []);

  useFrame((state) => {
    if (!ledRef.current) return;
    const colorAttr = ledRef.current.geometry.attributes.color;
    const t = state.clock.getElapsedTime();
    for (let i = 0; i < colorAttr.count; i++) {
      // Flicker status lights
      if (Math.sin(t * 8 + i * 2) > 0.3) {
        colorAttr.setY(i, 0.7);
        colorAttr.setZ(i, 1.0);
      } else {
        colorAttr.setY(i, 0.1);
        colorAttr.setZ(i, 0.2);
      }
    }
    colorAttr.needsUpdate = true;
  });

  return (
    <group position={position}>
      {/* Outer Cabinet */}
      <mesh>
        <boxGeometry args={[0.9, 2.0, 0.8]} />
        <meshStandardMaterial color="#08080a" roughness={0.8} metalness={0.9} transparent opacity={0.35} />
      </mesh>
      {/* Cabinet Frame Wireframe */}
      <mesh>
        <boxGeometry args={[0.91, 2.01, 0.81]} />
        <meshBasicMaterial color={ELECTRIC} wireframe transparent opacity={0.15} />
      </mesh>
      {/* Status LEDs */}
      <points ref={ledRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={positions.length / 3} array={positions} itemSize={3} />
          <bufferAttribute attach="attributes-color" count={colors.length / 3} array={colors} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial size={0.045} vertexColors transparent opacity={0.85} sizeAttenuation={false} />
      </points>
    </group>
  );
}

// ── 5. Data Center Rack Row ──
function DataCenterRow({ position }) {
  const ref = useRef(null);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.1) * 0.15;
  });

  return (
    <group position={position} ref={ref}>
      <ServerRack position={[-0.55, 0, 0]} />
      <ServerRack position={[0.55, 0, 0]} />
    </group>
  );
}

// ── 6. Holographic Testing Oscilloscope Wave ──
function TestingWave({ position }) {
  const lineRef = useRef(null);
  const count = 50;
  
  const points = useMemo(() => {
    const arr = [];
    for (let i = 0; i <= count; i++) {
      const x = (i / count - 0.5) * 2.8;
      arr.push(new THREE.Vector3(x, 0, 0));
    }
    return arr;
  }, []);

  const geo = useMemo(() => {
    return new THREE.BufferGeometry().setFromPoints(points);
  }, [points]);

  useFrame((state) => {
    if (!lineRef.current) return;
    const pos = lineRef.current.geometry.attributes.position;
    const t = state.clock.getElapsedTime();
    for (let i = 0; i <= count; i++) {
      const x = (i / count - 0.5) * 2.8;
      // High frequency testing pulse wave (simulating electrical calibration)
      const y = Math.sin(x * 6 - t * 12) * 0.35 * Math.sin(t * 1.5);
      pos.setY(i, y);
    }
    pos.needsUpdate = true;
  });

  return (
    <group position={position}>
      {/* Outer Calibration Ring */}
      <mesh>
        <torusGeometry args={[1.1, 0.012, 8, 64]} />
        <meshBasicMaterial color={GOLD} transparent opacity={0.25} />
      </mesh>
      {/* AC/DC Waveform */}
      <line geometry={geo} ref={lineRef}>
        <lineBasicMaterial color={ELECTRIC} linewidth={2.5} />
      </line>
      {/* Electrodes */}
      <mesh position={[-1.3, 0, 0]}>
        <sphereGeometry args={[0.07, 8, 8]} />
        <meshBasicMaterial color={GOLD} />
      </mesh>
      <mesh position={[1.3, 0, 0]}>
        <sphereGeometry args={[0.07, 8, 8]} />
        <meshBasicMaterial color={GOLD} />
      </mesh>
    </group>
  );
}

// ── 7. Data Particle Corridor (Unified background stars) ──
function DataCorridor({ count = 1000 }) {
  const ref = useRef(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const r = 2.0 + Math.random() * 3.0;
      arr[i * 3] = Math.cos(angle) * r;
      arr[i * 3 + 1] = Math.sin(angle) * r;
      arr[i * 3 + 2] = -Math.random() * 45;
    }
    return arr;
  }, [count]);

  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.z += delta * 0.015;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.04} color={GOLD_LIGHT} transparent opacity={0.35} sizeAttenuation depthWrite={false} />
    </points>
  );
}

// ── 8. Energy Hub (CTA Final Destination Core) ──
function DestinationHub({ progressRef, reduced }) {
  const coreRef = useRef(null);
  const wireRef = useRef(null);
  const ringRef = useRef(null);

  useFrame((state, delta) => {
    const p = progressRef.current;
    if (!reduced) {
      if (coreRef.current) coreRef.current.rotation.y += delta * 0.12;
      if (wireRef.current) wireRef.current.rotation.y -= delta * 0.07;
      if (ringRef.current) ringRef.current.rotation.z = state.clock.getElapsedTime() * 0.1;
    }
    const reveal = Math.min(Math.max((p - 0.7) / 0.28, 0), 1);
    const scale = 0.3 + reveal * 1.25;
    if (coreRef.current) coreRef.current.scale.setScalar(scale);
    if (wireRef.current) wireRef.current.scale.setScalar(scale * 1.3);
    if (ringRef.current) ringRef.current.scale.setScalar(scale * 1.75);
  });

  return (
    <group position={[0, 0, HUB_Z]}>
      <mesh ref={coreRef}>
        <icosahedronGeometry args={[1.35, 2]} />
        <meshStandardMaterial color="#0e0e12" emissive={GOLD} emissiveIntensity={0.65} metalness={0.8} roughness={0.2} flatShading />
      </mesh>
      <mesh ref={wireRef}>
        <icosahedronGeometry args={[1.35, 1]} />
        <meshBasicMaterial color={GOLD_LIGHT} wireframe transparent opacity={0.22} />
      </mesh>
      <mesh ref={ringRef} rotation={[Math.PI / 2.2, 0, 0]}>
        <torusGeometry args={[2.2, 0.012, 8, 96]} />
        <meshBasicMaterial color={ELECTRIC} transparent opacity={0.45} />
      </mesh>
    </group>
  );
}

// ── Camera Rig dollying down through the custom models ──
function CameraRig({ progressRef, reduced }) {
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (reduced) return;
    const onMove = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, [reduced]);

  useFrame((state) => {
    const p = progressRef.current;
    
    // Dolly camera forward along Z-axis based on scroll percentage
    const targetZ = Math.max(8 - p * 42, HUB_Z + 6.0);
    const targetX = Math.sin(p * Math.PI * 2.2) * 1.0 + mouse.current.x * 0.35;
    const targetY = Math.cos(p * Math.PI * 1.6) * 0.4 - mouse.current.y * 0.25;
    
    state.camera.position.z += (targetZ - state.camera.position.z) * 0.07;
    state.camera.position.x += (targetX - state.camera.position.x) * 0.05;
    state.camera.position.y += (targetY - state.camera.position.y) * 0.05;
    
    state.camera.lookAt(0, 0, state.camera.position.z - 12);
  });
  return null;
}

function Scene({ progressRef, reduced }) {
  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[0, 0, 5]} intensity={45} color={GOLD_LIGHT} />
      <pointLight position={[6, 4, -18]} intensity={30} color={ELECTRIC} />
      <fog attach="fog" args={['#050505', 10, 42]} />
      <CameraRig progressRef={progressRef} reduced={reduced} />
      
      {/* Background Star corridor */}
      <DataCorridor />
      
      {/* ── Scroll Section Custom Models ── */}
      {/* Z = 0: Transmission Pylon (Hero / Grid Intro) */}
      <TransmissionTower position={[1.8, -0.5, 0]} />
      
      {/* Z = -8: Power Substation Transformer (Core Disciplines) */}
      <PowerTransformer position={[-1.8, 0, -8]} />
      
      {/* Z = -18: Data Center Server Racks (Solution Areas) */}
      <DataCenterRow position={[1.9, 0, -18]} />
      
      {/* Z = -28: Calibration / Wave Arc (Testing & Differentiators) */}
      <TestingWave position={[-1.8, 0, -28]} />
      
      {/* Z = -36: Glowing Grid Energy Core (CTA Resolve) */}
      <DestinationHub progressRef={progressRef} reduced={reduced} />
    </>
  );
}

export default function ImmersiveBackground3D() {
  const progressRef = useRef(0);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    progressRef.current = scrollYProgress.get();
    return scrollYProgress.on('change', (v) => {
      progressRef.current = v;
    });
  }, [scrollYProgress]);

  if (reduced) return null;

  return (
    <div 
      className="immersive-3d-bg" 
      aria-hidden="true" 
      style={{ 
        position: 'fixed', 
        inset: 0, 
        zIndex: -1, 
        pointerEvents: 'none', 
        background: '#050505' 
      }}
    >
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 8], fov: 48 }}
        gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
      >
        <Suspense fallback={null}>
          <Scene progressRef={progressRef} reduced={reduced} />
        </Suspense>
      </Canvas>
    </div>
  );
}
