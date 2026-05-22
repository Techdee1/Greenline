'use client';

import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, Sky, PerspectiveCamera } from '@react-three/drei';

interface FarmSceneProps {
  children?: React.ReactNode;
  className?: string;
}

export function FarmScene({ children, className }: FarmSceneProps) {
  return (
    <div className={className}>
      <Canvas shadows dpr={[1, 2]}>
        <Suspense fallback={<LoadingFallback />}>
          {/* Camera */}
          <PerspectiveCamera makeDefault position={[14, 11, 14]} fov={48} />
          
          {/* Lighting */}
          <ambientLight intensity={0.25} />
          <directionalLight
            position={[10, 15, 10]}
            intensity={1.35}
            castShadow
            shadow-mapSize={[2048, 2048]}
            shadow-camera-far={50}
            shadow-camera-left={-20}
            shadow-camera-right={20}
            shadow-camera-top={20}
            shadow-camera-bottom={-20}
          />
          <spotLight
            position={[-12, 18, -8]}
            intensity={0.8}
            angle={0.35}
            penumbra={0.7}
            color="#F59E0B"
            castShadow
          />
          <hemisphereLight
            color="#87CEEB"
            groundColor="#8B4513"
            intensity={0.25}
          />

          {/* Environment */}
          <Sky
            distance={450000}
            sunPosition={[120, 25, 80]}
            inclination={0.5}
            azimuth={0.18}
          />
          <fog attach="fog" args={['#D9C7B0', 25, 70]} />
          
          {/* Controls */}
          <OrbitControls
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            maxPolarAngle={Math.PI / 2.2}
            minDistance={5}
            maxDistance={40}
            target={[0, 0, 0]}
          />
          
          {children}
        </Suspense>
      </Canvas>
    </div>
  );
}

function LoadingFallback() {
  return (
    <mesh position={[0, 0, 0]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#C65D3B" />
    </mesh>
  );
}
