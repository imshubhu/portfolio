import {  useTexture } from '@react-three/drei';
// Components
import Planet from './Planet';

// Three.js
import * as THREE from 'three';
import planets from '../data/planets';

export default function SolarSystem({ onPlanetClick }) {
  // Handle planet click
  const handlePlanetClick = (planet) => {
    console.log('planet', planet)
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
  return (
    <>
      {/* Sun body */}
      <mesh name="Sun" position={[0, 0, 0]} >
        <sphereGeometry args={[10, 128, 128]} />
        <meshStandardMaterial 
          map={sun_texture} 
          emissive="#ffaa00"
          emissiveIntensity={2}
          transparent
        />
      </mesh>
      
      {/* Sun glow */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[12, 128, 128]} />
        <meshStandardMaterial 
          color="#ffff00"
          transparent
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </>
  );
}