'use client';

import { useRef } from 'react';
import * as THREE from 'three';

interface GroundProps {
  size?: number;
}

export function Ground({ size = 20 }: GroundProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  return (
    <group>
      {/* Main farm ground */}
      <mesh
        ref={meshRef}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -0.01, 0]}
        receiveShadow
      >
        <planeGeometry args={[size, size, 32, 32]} />
        <meshStandardMaterial
          color="#6A4A3C"
          roughness={0.95}
          metalness={0.05}
        />
      </mesh>

      {/* Tilled soil rows pattern (visual enhancement) */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0, 0]}
        receiveShadow
      >
        <planeGeometry args={[size * 0.8, size * 0.8, 1, 1]} />
        <meshStandardMaterial
          color="#5A3F2F"
          roughness={0.98}
          metalness={0.02}
        />
      </mesh>

      {/* Border grass/vegetation */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -0.02, 0]}
        receiveShadow
      >
        <ringGeometry args={[size * 0.45, size * 0.55, 32]} />
        <meshStandardMaterial
          color="#6B7A54"
          roughness={0.85}
          metalness={0.05}
        />
      </mesh>

      {/* Farm boundary markers */}
      {[
        [-size * 0.4, 0, -size * 0.4],
        [size * 0.4, 0, -size * 0.4],
        [-size * 0.4, 0, size * 0.4],
        [size * 0.4, 0, size * 0.4],
      ].map((pos, i) => (
        <mesh key={i} position={pos as [number, number, number]} castShadow>
          <cylinderGeometry args={[0.1, 0.15, 0.5, 8]} />
          <meshStandardMaterial color="#8B4513" roughness={0.7} />
        </mesh>
      ))}
    </group>
  );
}
