// src/hooks/useCameraAnimation.js
import { useEffect } from 'react';
import { useThree } from '@react-three/fiber';

export function useCameraAnimation(activePlanet) {
  const { camera, invalidate } = useThree();

  useEffect(() => {
    if (activePlanet) {
      // Reset camera to focus on planet
      camera.position.set(0, 0, 15);
      camera.lookAt(0, 0, 0);
      invalidate();
    }
  }, [activePlanet, camera, invalidate]);
}