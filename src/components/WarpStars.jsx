import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function WarpStars({ count = 5000, warpProgress = 0 }) {
  const ref = useRef();

  // positions for line start & end
  const positions = new Float32Array(count * 6);
  const colors = new Float32Array(count * 6);

  const colorOptions = [
    new THREE.Color("#ffffff"), // white
    new THREE.Color("#00ffff"), // cyan
    new THREE.Color("#ff00ff"), // magenta
    new THREE.Color("#87ceeb"), // light blue
    new THREE.Color("#ffff99"), // pale yellow
  ];

  for (let i = 0; i < count; i++) {
    const x = (Math.random() - 0.5) * 400;
    const y = (Math.random() - 0.5) * 400;
    const z = Math.random() * 800;

    const len = 5 + Math.random() * 15; // varied streak length
    positions.set([x, y, z, x, y, z + len], i * 6);

    const c = colorOptions[Math.floor(Math.random() * colorOptions.length)];
    colors.set([c.r, c.g, c.b, c.r, c.g, c.b], i * 6);
  }

  useFrame(() => {
    const arr = ref.current.geometry.attributes.position.array;
    for (let i = 0; i < count; i++) {
      arr[i * 6 + 2] -= 25; // start z
      arr[i * 6 + 5] -= 25; // end z

      // reset when out of view
      if (arr[i * 6 + 2] < 1) {
        const x = (Math.random() - 0.5) * 400;
        const y = (Math.random() - 0.5) * 400;
        const z = 800;
        const len = 5 + Math.random() * 15;
        arr.set([x, y, z, x, y, z + len], i * 6);
      }
    }
    ref.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <lineSegments ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={colors.length / 3}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <lineBasicMaterial
        vertexColors
        transparent
        opacity={warpProgress}
        blending={THREE.AdditiveBlending}
      />
    </lineSegments>
  );
}
