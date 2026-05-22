'use client';

import { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Grid, Text, Float, Line, Environment } from '@react-three/drei';
import * as THREE from 'three';

interface HolographicTwinProps {
  stressIndex?: number; // 0-100
  className?: string;
  showLabels?: boolean;
}

// Color based on stress level - holographic style
const getHologramColor = (stress: number): string => {
  if (stress <= 20) return '#22C55E'; // Green - healthy
  if (stress <= 40) return '#84CC16'; // Lime - low risk
  if (stress <= 60) return '#FBBF24'; // Amber - moderate
  if (stress <= 80) return '#F97316'; // Orange - high risk
  return '#EF4444'; // Red - critical
};

export function HolographicTwin({ 
  stressIndex = 25, 
  className = 'w-full h-full',
  showLabels = true 
}: HolographicTwinProps) {
  const color = getHologramColor(stressIndex);
  
  return (
    <div className={className}>
      <Canvas
        camera={{ position: [7.5, 6.5, 7.5], fov: 36 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.2} />
        <pointLight position={[8, 10, 6]} intensity={0.9} color={color} />
        <pointLight position={[-8, 6, -6]} intensity={0.5} color="#67E8F9" />
        <spotLight position={[0, 12, 0]} intensity={1.1} angle={0.4} penumbra={0.6} color={color} />
        
        <HolographicScene color={color} stressIndex={stressIndex} showLabels={showLabels} />
        
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.7}
          maxPolarAngle={Math.PI / 2.2}
          minPolarAngle={Math.PI / 4}
        />
        
        <Environment preset="night" />
      </Canvas>
    </div>
  );
}

interface SceneProps {
  color: string;
  stressIndex: number;
  showLabels: boolean;
}

function HolographicScene({ color, stressIndex, showLabels }: SceneProps) {
  return (
    <group>
      {/* Holographic grid base */}
      <Grid
        args={[10, 10]}
        cellSize={0.5}
        cellThickness={0.3}
        cellColor={color}
        sectionSize={2}
        sectionThickness={0.5}
        sectionColor={color}
        fadeDistance={20}
        fadeStrength={1}
        followCamera={false}
        position={[0, -0.01, 0]}
      />
      
      {/* Field boundary wireframe */}
      <FieldBoundary color={color} />
      
      {/* Crop zone visualization */}
      <CropZones color={color} stressIndex={stressIndex} />
      
      {/* Sensor nodes */}
      <SensorNode position={[-2, 0, -2]} color={color} label="Node A" showLabel={showLabels} />
      <SensorNode position={[2, 0, -2]} color={color} label="Node B" showLabel={showLabels} />
      <SensorNode position={[0, 0, 2]} color={color} label="Node C" showLabel={showLabels} />

      {/* Zai pit layout rings */}
      <ZaiPitRings color={color} />

      {showLabels && (
        <Text
          position={[0, 0.2, -4.6]}
          fontSize={0.2}
          color={color}
          anchorX="center"
          anchorY="middle"
        >
          Zai Pit Layout
        </Text>
      )}
      {showLabels && (
        <Text
          position={[3.8, 0.25, 4.2]}
          fontSize={0.16}
          color={color}
          anchorX="center"
          anchorY="middle"
        >
          Musa's Farm Unit
        </Text>
      )}
      
      {/* Data streams */}
      <DataStream from={[-2, 0.5, -2]} to={[0, 1.5, 0]} color={color} />
      <DataStream from={[2, 0.5, -2]} to={[0, 1.5, 0]} color={color} />
      <DataStream from={[0, 0.5, 2]} to={[0, 1.5, 0]} color={color} />
      
      {/* Central hub */}
      <Float speed={2} rotationIntensity={0.1} floatIntensity={0.3}>
        <CentralHub color={color} stressIndex={stressIndex} />
      </Float>
      
      {/* Stress indicator ring */}
      <StressRing stressIndex={stressIndex} color={color} />
    </group>
  );
}

function FieldBoundary({ color }: { color: string }) {
  const points = useMemo(() => [
    new THREE.Vector3(-3.5, 0, -3.5),
    new THREE.Vector3(3.5, 0, -3.5),
    new THREE.Vector3(3.5, 0, 3.5),
    new THREE.Vector3(-3.5, 0, 3.5),
    new THREE.Vector3(-3.5, 0, -3.5),
  ], []);
  
  return (
    <Line
      points={points}
      color={color}
      lineWidth={2}
      dashed
      dashSize={0.2}
      gapSize={0.1}
    />
  );
}

function CropZones({ color, stressIndex }: { color: string; stressIndex: number }) {
  const zoneRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (zoneRef.current) {
      zoneRef.current.children.forEach((child, i) => {
        const mesh = child as THREE.Mesh;
        if (mesh.material && 'opacity' in mesh.material) {
          (mesh.material as THREE.MeshBasicMaterial).opacity = 
            0.1 + Math.sin(state.clock.elapsedTime * 2 + i * 0.5) * 0.05;
        }
      });
    }
  });
  
  const zones = useMemo(() => {
    const positions: [number, number, number][] = [];
    for (let x = -2; x <= 2; x += 1) {
      for (let z = -2; z <= 2; z += 1) {
        positions.push([x, 0.01, z]);
      }
    }
    return positions;
  }, []);
  
  return (
    <group ref={zoneRef}>
      {zones.map((pos, i) => (
        <mesh key={i} position={pos} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[0.85, 0.85]} />
          <meshBasicMaterial 
            color={color} 
            transparent 
            opacity={0.1}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
    </group>
  );
}

interface SensorNodeProps {
  position: [number, number, number];
  color: string;
  label: string;
  showLabel: boolean;
}

function SensorNode({ position, color, label, showLabel }: SensorNodeProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 3) * 0.1);
    }
  });
  
  return (
    <group position={position}>
      {/* Base */}
      <mesh position={[0, 0.05, 0]}>
        <cylinderGeometry args={[0.15, 0.2, 0.1, 6]} />
        <meshBasicMaterial color={color} transparent opacity={0.4} wireframe />
      </mesh>
      
      {/* Antenna */}
      <mesh position={[0, 0.4, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 0.7, 8]} />
        <meshBasicMaterial color={color} transparent opacity={0.6} />
      </mesh>
      
      {/* Signal indicator */}
      <mesh ref={meshRef} position={[0, 0.8, 0]}>
        <octahedronGeometry args={[0.08, 0]} />
        <meshBasicMaterial color={color} transparent opacity={0.8} />
      </mesh>
      
      {/* Label */}
      {showLabel && (
        <Text
          position={[0, 1, 0]}
          fontSize={0.15}
          color={color}
          anchorX="center"
          anchorY="middle"
        >
          {label}
        </Text>
      )}
    </group>
  );
}

function DataStream({ from, to, color }: { from: [number, number, number]; to: [number, number, number]; color: string }) {
  const particlesRef = useRef<THREE.Points>(null);
  
  const { positions, count } = useMemo(() => {
    const count = 8;
    const positions = new Float32Array(count * 3);
    return { positions, count };
  }, []);
  
  useFrame((state) => {
    if (particlesRef.current) {
      const geo = particlesRef.current.geometry;
      const positions = geo.attributes.position.array as Float32Array;
      
      for (let i = 0; i < count; i++) {
        const t = (state.clock.elapsedTime * 0.5 + i / count) % 1;
        positions[i * 3] = from[0] + (to[0] - from[0]) * t;
        positions[i * 3 + 1] = from[1] + (to[1] - from[1]) * t + Math.sin(t * Math.PI) * 0.3;
        positions[i * 3 + 2] = from[2] + (to[2] - from[2]) * t;
      }
      
      geo.attributes.position.needsUpdate = true;
    }
  });
  
  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color={color}
        size={0.08}
        transparent
        opacity={0.8}
        sizeAttenuation
      />
    </points>
  );
}

function CentralHub({ color, stressIndex }: { color: string; stressIndex: number }) {
  const ringRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (ringRef.current) {
      ringRef.current.rotation.z = state.clock.elapsedTime * 0.5;
    }
  });
  
  return (
    <group position={[0, 1.5, 0]}>
      {/* Outer ring */}
      <mesh ref={ringRef}>
        <torusGeometry args={[0.4, 0.02, 8, 32]} />
        <meshBasicMaterial color={color} transparent opacity={0.65} />
      </mesh>
      
      {/* Inner sphere */}
      <mesh>
        <icosahedronGeometry args={[0.2, 1]} />
        <meshBasicMaterial color={color} transparent opacity={0.4} wireframe />
      </mesh>
      
      {/* Center core */}
      <mesh>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshBasicMaterial color={color} transparent opacity={0.85} />
      </mesh>
    </group>
  );
}

function StressRing({ stressIndex, color }: { stressIndex: number; color: string }) {
  const segments = 32;
  const filledSegments = Math.floor((stressIndex / 100) * segments);
  
  return (
    <group position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      {Array.from({ length: segments }).map((_, i) => {
        const angle = (i / segments) * Math.PI * 2;
        const x = Math.cos(angle) * 4;
        const z = Math.sin(angle) * 4;
        const isFilled = i < filledSegments;
        
        return (
          <mesh key={i} position={[x, z, 0]}>
            <boxGeometry args={[0.15, 0.15, 0.02]} />
            <meshBasicMaterial 
              color={color} 
              transparent 
              opacity={isFilled ? 0.75 : 0.18}
            />
          </mesh>
        );
      })}
    </group>
  );
}

function ZaiPitRings({ color }: { color: string }) {
  const positions = useMemo(() => {
    const layout: Array<[number, number, number]> = [];
    for (let x = -2; x <= 2; x += 1) {
      for (let z = -2; z <= 2; z += 1) {
        layout.push([x, 0.02, z]);
      }
    }
    return layout;
  }, []);

  return (
    <group>
      {positions.map((pos, i) => (
        <mesh key={i} position={pos} rotation={[-Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.22, 0.02, 8, 20]} />
          <meshBasicMaterial color={color} transparent opacity={0.4} />
        </mesh>
      ))}
    </group>
  );
}

// Simplified 2D indicator for mobile/fallback
export function HolographicIndicator({ stressIndex = 25, className = '' }: { stressIndex?: number; className?: string }) {
  const color = getHologramColor(stressIndex);
  const size = 120;
  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (stressIndex / 100) * circumference;
  
  return (
    <div className={`relative ${className}`} style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={45}
          fill="none"
          stroke="currentColor"
          strokeWidth={3}
          className="text-black/5"
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={45}
          fill="none"
          stroke={color}
          strokeWidth={3}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          style={{ 
            transition: 'stroke-dashoffset 0.5s ease-out',
            filter: `drop-shadow(0 0 6px ${color}40)`,
          }}
        />
      </svg>
      
      {/* Center content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-semibold" style={{ color }}>
          {stressIndex}
        </span>
        <span className="text-[10px] text-[var(--color-stone)]">
          Stress Index
        </span>
      </div>
    </div>
  );
}

export default HolographicTwin;
