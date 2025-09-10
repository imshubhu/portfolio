// src/components/HeroScene.jsx
import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls, Stars } from '@react-three/drei';
import SolarSystem from './SolarSystem';
import { Bloom, EffectComposer } from '@react-three/postprocessing';
import * as THREE from 'three';

const HeroScene = ({ onPlanetClick }) => {
    return (
        <div className="relative w-full h-screen bg-black">

            {/* Three.js Canvas */}
            <Canvas
                camera={{
                    position: [0, 50, 150],
                    fov: 60,
                    near: 1,
                    far: 1000
                }}
            >
                <color attach="background" args={['#000000']} />
                {/* Ambient Light */}
                <ambientLight intensity={0.2} />

                <Stars
                    radius={100}
                    depth={50}
                    count={window.innerWidth < 768 ? 1000 : 5000}
                    factor={4}
                    saturation={0}
                    fade
                    speed={1}
                />
                {/* Main 3D Scene */}
                <SolarSystem onPlanetClick={onPlanetClick} />

                <Environment
                    preset="sunset"
                    background={false}
                    resolution={256}
                />

                <OrbitControls
                    enableZoom={true}
                    enablePan={false}
                    enableRotate={true}
                    zoomSpeed={0.6}
                    rotateSpeed={0.8}
                    touches={{
                        ONE: THREE.TOUCH.ROTATE,
                        TWO: THREE.TOUCH.DOLLY_PAN,
                    }}
                />


                {window.innerWidth > 768 && (
                    <EffectComposer>
                        <Bloom intensity={0.6} />
                    </EffectComposer>
                )}


                {/* Preload textures */}
                {/* <Preload all /> */}
            </Canvas>

            {/* UI Overlay (Title) */}
            <div className="absolute w-full top-1/9 md:top-1/7 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center z-10 pointer-events-auto">
                <h1 className="text-2xl md:text-6xl font-bold text-cyan-300 mb-2 drop-shadow-lg">
                    Captain Shubham Lohar
                </h1>
                <p className="text-sm md:text-lg text-gray-300 drop-shadow">Full Stack Astronaut</p>
            </div>
        </div>
    );
};

export default HeroScene;