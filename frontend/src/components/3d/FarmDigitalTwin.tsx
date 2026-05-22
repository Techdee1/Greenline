'use client';

import { FarmScene } from './FarmScene';
import { Ground } from './Ground';
import { CropField } from './CropField';

interface FarmDigitalTwinProps {
  growthStage?: number;  // 0-1
  healthPercentage?: number; // 0-100, affects stress visualization
  className?: string;
}

export function FarmDigitalTwin({ 
  growthStage = 0.8, 
  healthPercentage = 87,
  className = 'w-full h-full' 
}: FarmDigitalTwinProps) {
  const rows = 6;
  const plantsPerRow = 8;
  const spacing = 1.2;

  // Convert health percentage to stress values
  // Higher health = lower stress
  const baseStress = (100 - healthPercentage) / 100;
  
  // Generate stress map for plants
  // Some variation but centered around the base stress
  const stressMap = generateStressMap(80, baseStress);
  
  return (
    <FarmScene className={className}>
      <Ground size={18} />
      <ZaiPitField rows={rows} plantsPerRow={plantsPerRow} spacing={spacing} />
      <CropField
        rows={rows}
        plantsPerRow={plantsPerRow}
        spacing={spacing}
        growthStage={growthStage}
        stressMap={stressMap}
      />
      
      {/* Farm elements */}
      <WaterTank position={[8, 0, -6]} />
      <Shed position={[-8, 0, 6]} />
      <SensorPost position={[0, 0, 5]} />
      <SensorPost position={[3.5, 0, -4.5]} />
      <SensorPost position={[-4, 0, -3.5]} />
    </FarmScene>
  );
}

// Generate a stress map with natural clustering
function generateStressMap(count: number, baseStress: number): number[] {
  const map: number[] = [];
  const clusterCenters: Array<{ x: number; y: number; intensity: number }> = [];
  
  // Create a few stress clusters (like disease spread patterns)
  const numClusters = Math.floor(baseStress * 5);
  for (let i = 0; i < numClusters; i++) {
    clusterCenters.push({
      x: Math.random() * 10,
      y: Math.random() * 8,
      intensity: 0.3 + Math.random() * 0.5,
    });
  }
  
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 10; col++) {
      let stress = baseStress * 0.5; // Base stress
      
      // Add influence from clusters
      for (const cluster of clusterCenters) {
        const distance = Math.sqrt(
          Math.pow(col - cluster.x, 2) + Math.pow(row - cluster.y, 2)
        );
        const influence = Math.max(0, 1 - distance / 3) * cluster.intensity;
        stress = Math.min(1, stress + influence);
      }
      
      // Add small random variation
      stress = Math.max(0, Math.min(1, stress + (Math.random() - 0.5) * 0.1));
      
      map.push(stress);
    }
  }
  
  return map;
}

interface ZaiPitFieldProps {
  rows: number;
  plantsPerRow: number;
  spacing: number;
}

function ZaiPitField({ rows, plantsPerRow, spacing }: ZaiPitFieldProps) {
  const totalWidth = (plantsPerRow - 1) * spacing;
  const totalDepth = (rows - 1) * spacing;
  const offsetX = -totalWidth / 2;
  const offsetZ = -totalDepth / 2;

  return (
    <group>
      {Array.from({ length: rows * plantsPerRow }).map((_, index) => {
        const row = Math.floor(index / plantsPerRow);
        const col = index % plantsPerRow;
        const x = offsetX + col * spacing;
        const z = offsetZ + row * spacing;

        return <ZaiPit key={index} position={[x, 0, z]} />;
      })}
    </group>
  );
}

function ZaiPit({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      {/* Berm ring */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]} receiveShadow>
        <torusGeometry args={[0.38, 0.08, 10, 28]} />
        <meshStandardMaterial color="#9B7656" roughness={0.9} />
      </mesh>
      {/* Pit depression */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.06, 0]} receiveShadow>
        <cylinderGeometry args={[0.24, 0.34, 0.12, 24]} />
        <meshStandardMaterial color="#4B3226" roughness={0.95} />
      </mesh>
      {/* Mulch ring */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.015, 0]}>
        <ringGeometry args={[0.18, 0.28, 20]} />
        <meshStandardMaterial color="#A37A4E" roughness={0.85} opacity={0.7} transparent />
      </mesh>
      {/* Moisture glow */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.03, 0]}>
        <circleGeometry args={[0.2, 18]} />
        <meshStandardMaterial color="#2F5E52" roughness={0.6} metalness={0.1} opacity={0.45} transparent />
      </mesh>
    </group>
  );
}

// Farm decoration components
function WaterTank({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      {/* Tank body */}
      <mesh position={[0, 0.75, 0]} castShadow>
        <cylinderGeometry args={[0.8, 0.8, 1.5, 16]} />
        <meshStandardMaterial color="#6B7B8C" roughness={0.4} metalness={0.6} />
      </mesh>
      {/* Tank top */}
      <mesh position={[0, 1.55, 0]} castShadow>
        <coneGeometry args={[0.85, 0.3, 16]} />
        <meshStandardMaterial color="#5A6A7A" roughness={0.4} metalness={0.6} />
      </mesh>
      {/* Stand legs */}
      {[0, Math.PI / 2, Math.PI, Math.PI * 1.5].map((angle, i) => (
        <mesh
          key={i}
          position={[
            Math.cos(angle) * 0.5,
            0,
            Math.sin(angle) * 0.5,
          ]}
          castShadow
        >
          <boxGeometry args={[0.1, 0.15, 0.1]} />
          <meshStandardMaterial color="#4A3728" roughness={0.8} />
        </mesh>
      ))}
    </group>
  );
}

function Shed({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      {/* Shed body */}
      <mesh position={[0, 0.6, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.5, 1.2, 2]} />
        <meshStandardMaterial color="#8B7355" roughness={0.8} />
      </mesh>
      {/* Roof */}
      <mesh position={[0, 1.4, 0]} rotation={[0, 0, 0]} castShadow>
        <boxGeometry args={[2.8, 0.15, 2.3]} />
        <meshStandardMaterial color="#5D4037" roughness={0.7} />
      </mesh>
      {/* Peak roof */}
      <mesh position={[0, 1.6, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <cylinderGeometry args={[0.3, 0.3, 2.8, 3]} />
        <meshStandardMaterial color="#C65D3B" roughness={0.6} />
      </mesh>
      {/* Door */}
      <mesh position={[0, 0.4, 1.01]} castShadow>
        <boxGeometry args={[0.6, 0.8, 0.05]} />
        <meshStandardMaterial color="#4A3728" roughness={0.9} />
      </mesh>
    </group>
  );
}

function SensorPost({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      {/* Post */}
      <mesh position={[0, 0.5, 0]} castShadow>
        <cylinderGeometry args={[0.03, 0.04, 1, 8]} />
        <meshStandardMaterial color="#4A3728" roughness={0.7} />
      </mesh>
      {/* Sensor unit */}
      <mesh position={[0, 1.05, 0]} castShadow>
        <boxGeometry args={[0.15, 0.1, 0.1]} />
        <meshStandardMaterial color="#E8DFD0" roughness={0.3} metalness={0.2} />
      </mesh>
      {/* Solar panel */}
      <mesh position={[0, 1.15, 0.02]} rotation={[-0.3, 0, 0]} castShadow>
        <boxGeometry args={[0.12, 0.01, 0.08]} />
        <meshStandardMaterial color="#1a1a2e" roughness={0.2} metalness={0.8} />
      </mesh>
      {/* LED indicator */}
      <mesh position={[0.05, 1.05, 0.06]}>
        <sphereGeometry args={[0.015, 8, 8]} />
        <meshStandardMaterial 
          color="#4A7C59" 
          emissive="#4A7C59"
          emissiveIntensity={0.5}
        />
      </mesh>
    </group>
  );
}
