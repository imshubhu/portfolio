import { useGLTF } from '@react-three/drei';

export default function GLBSpaceship() {
  const { scene } = useGLTF('/models/spaceship.glb');
  return <primitive object={scene} scale={0.5} />;
  // "Phantom" (https://skfb.ly/pzDDJ) by KLGaming is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/).
}