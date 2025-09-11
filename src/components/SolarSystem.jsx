import {  useTexture } from '@react-three/drei';
// Components
import Planet from './Planet';

// Three.js
import * as THREE from 'three';
import planets from '../data/planets';

export default function SolarSystem({ onPlanetClick }) {
  // Handle planet click
  const handlePlanetClick = (planet) => {
    onPlanetClick(planet.id);
  };

  return (
    <group>
      <Sun />
      {planets.map((planet) => (
        <Planet
          key={planet.id}
          {...planet}
          onPlanetClick={() => handlePlanetClick(planet)}
        />
      ))}
    </group>
  );
}

function Sun() {
  const sun_texture = useTexture('/textures/sun.jpg')
  const segments = window.innerWidth < 768 ? 32 : 128;
  return (
    <>
      {/* Sun body */}
      <mesh name="Sun" position={[0, 0, 0]} >
        <sphereGeometry args={[10, segments, segments]} />
        <meshStandardMaterial 
          map={sun_texture} 
          emissive="#ffaa00"
          emissiveIntensity={2}
          transparent
        />
      </mesh>
      
      {/* Sun glow */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[12, segments, segments]} />
        <meshStandardMaterial 
          color="#ffff00"
          transparent
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </>
  );
}