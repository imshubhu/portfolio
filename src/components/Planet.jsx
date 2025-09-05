// src/components/Planet.jsx
import { useRef, useMemo, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html, useTexture } from '@react-three/drei';
import * as THREE from 'three';

export default function Planet({
  id,
  name,
  size,
  distance,
  texture,
  bumpMap,
  orbitalPeriod,
  rotationPeriod,
  moon = [],
  onPlanetClick,
  glowColor = '#ffffff',
}) {
  const planetRef = useRef();
  const orbitRef = useRef();
  const glowMesh = useRef(); // ✅ Dedicated ref for glow
  const [hovered, setHovered] = useState(false);

  // Glow material
  const glowMaterial = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: new THREE.Color(glowColor),
        transparent: true,
        opacity: 0.6,
        side: THREE.FrontSide,
        blending: THREE.AdditiveBlending, // ✅ Makes glow brighter
      }),
    [glowColor]
  );

  // Load textures
  const mapTexture = useTexture(texture, (t) => {
    t.flipY = false;
    t.colorSpace = THREE.SRGBColorSpace;
  });

  const bumpTexture = bumpMap
    ? useTexture(bumpMap, (t) => {
      t.flipY = false;
      t.colorSpace = THREE.SRGBColorSpace;
    })
    : null;

  // Planet material
  const planetMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      map: mapTexture,
      bumpMap: bumpTexture,
      bumpScale: bumpTexture ? 0.05 : 0,
      roughness: 0.7,
      metalness: 0.05,
    });
  }, [mapTexture, bumpTexture]);

  // Animation loop
  useFrame((state, delta) => {
    if (orbitRef.current) {
      orbitRef.current.rotation.y += delta / orbitalPeriod;
    }
    if (planetRef.current) {
      planetRef.current.rotation.y += delta / rotationPeriod;
    }

    // ✅ Pulse glow only if hovered and glowMesh exists
    if (glowMesh.current && hovered) {
      const time = state.clock.getElapsedTime();
      const pulse = 0.2 * Math.sin(time * 5) + 0.8; // Smooth pulse
      const scale = 1.2 * pulse;
      glowMesh.current.scale.set(scale, scale, scale);
      glowMaterial.opacity = 0.5 * pulse + 0.3; // Fade between 0.3–0.8
    }
  });

  return (
    <group ref={orbitRef}>
      {/* Main Planet */}
      <mesh
        ref={planetRef}
        name={name}
        position={[distance, 0, 0]}
        rotation-x={Math.PI / 1}
        onClick={(e) => {
          e.stopPropagation();
          onPlanetClick();
        }}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        scale={size} // ✅ Apply size here
      >
        <sphereGeometry args={[1, 64, 64]} /> {/* Base radius = 1 */}
        <primitive object={planetMaterial} attach="material" />
      </mesh>

      {/* Saturn's Rings */}
      {name === 'Saturn' && (
        <mesh rotation-x={Math.PI / 2.1} position={[distance, 0, 0]} scale={[0.8, 0.2, 2.2]}>
          <ringGeometry args={[size * 1.7, size * 2.8, 64]} />
          <meshStandardMaterial
            map={useTexture('/textures/saturn_ring.png')}
            transparent
            opacity={0.8}
            roughness={0.7}
            side={THREE.DoubleSide}
          />
        </mesh>
      )}

      {/* ✅ Glow Effect (only when hovered) */}
      {hovered && (
        <mesh
          ref={glowMesh}
          position={[distance, 0, 0]} // Same orbit position
          scale={[size * 1.1, size * 1.1, size * 1.1]} // Slightly larger than planet
        >
          <sphereGeometry args={[size * 1.1, size * 1.1, size * 1.1]} /> {/* Radius 1, scaled by size */}
          {/* <primitive attach="material" object={glowMaterial} /> */}
          <meshStandardMaterial
            color={glowColor}
            transparent
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      )}

      {/* ✅ Tooltip */}
      {hovered && (
        <Html center>
          <div
            style={{
              padding: '6px 12px',
              background: 'rgba(0, 0, 0, 0.7)',
              color: 'white',
              borderRadius: '6px',
              fontSize: '12px',
              border: '1px solid cyan',
              whiteSpace: 'nowrap',
            }}
          >
            🚀 Dock to {id}
          </div>
        </Html>
      )}
    </group>
  );
}
{/* <mesh ref={planetRef} scale={[1.3, 1.3, 1.3]}>
                    <Html >
                        <div className="bg-black bg-opacity-70 text-white px-3 py-1 rounded text-sm border border-cyan-500 animate-pulse">
                            🚀 Dock to {id}
                        </div>
                    </Html>
                </mesh> */}
{/* {
moon.map((mo) => (
<Moon
key={mo.name}
{...mo}
onHover={onHover}
onFocus={onFocus}
/>
))
} */}