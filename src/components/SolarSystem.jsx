import {  useTexture } from '@react-three/drei';
// Components
import Planet from './Planet';
// GSAP
import gsap from 'gsap';

// Three.js
import * as THREE from 'three';
import planets from '../data/planets';

export default function SolarSystem({ onPlanetClick }) {
  // Handle planet click
  const handlePlanetClick = (planet) => {
    console.log('planet', planet)
    let video_name = 'space-ship-earth';
    switch (planet.name) {
      case 'Earth':
        video_name = 'space-ship-earth'
        break;

      case 'Jupiter':
        video_name = 'space-ship-jupiter'
        break;
    
      case 'Saturn':
        video_name = 'space-ship-saturn'
        break;

      case 'Uranus':
        video_name = 'space-ship-uranus'
        break;

      case 'Neptune':
        video_name = 'space-ship-neptune'
        break;
    
      default:
        break;
    }
    // Create a video element for the warp effect
    const warpVideo = document.createElement('video');
    warpVideo.src = `/videos/${video_name}.mp4`;
    warpVideo.muted = true;
    warpVideo.autoplay = false;
    warpVideo.loop = false;
    warpVideo.playsInline = true; // Important for mobile Safari
  
    // Fullscreen & responsive styling
    warpVideo.style.position = 'fixed';
    warpVideo.style.top = '0';
    warpVideo.style.left = '0';
    warpVideo.style.width = '100%';
    warpVideo.style.height = '100%';
    warpVideo.style.objectFit = 'cover';
    warpVideo.style.zIndex = '9998';
    warpVideo.style.opacity = '0';
    warpVideo.style.pointerEvents = 'none';

    document.body.appendChild(warpVideo);

    // GSAP animation to show the video
    gsap.to(warpVideo, {
      opacity: 1,
      duration: 0.5,
      ease: 'power2.out',
      onStart: () => {
        warpVideo.play();
      },
      onComplete: () => {
        // This part would typically be coordinated with the camera animation's onComplete
        // For now, we'll just fade it out after a short delay.
        onPlanetClick(planet.id);
        gsap.to(warpVideo, {
          opacity: 0,
          delay: 1.5, // Keep video visible for 1.5 seconds
          duration: 0.5,
          onComplete: () => {
            warpVideo.pause();
            warpVideo.currentTime = 0;
            document.body.removeChild(warpVideo);
          }
        });
      }
    });

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