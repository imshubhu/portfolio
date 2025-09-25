// src/components/HeroScene.jsx
import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls, Stars } from '@react-three/drei';
import SolarSystem from './SolarSystem';
import { Bloom, EffectComposer } from '@react-three/postprocessing';
import * as THREE from 'three';

const HeroScene = ({ onPlanetClick, paused = false }) => {
    return (
        <div className="relative w-full h-screen bg-black">

            {/* Three.js Canvas */}
            <Canvas
                dpr={[1, 1.75]}
                camera={{
                    position: [0, 50, window.innerWidth > 768 ? 150 : 350],
                    fov: 60,
                    near: 1,
                    far: 500
                }}
            >
                <color attach="background" args={['#000000']} />
                {/* Ambient Light */}
                <ambientLight intensity={0.2} />

                <Stars
                    radius={100}
                    depth={50}
                    count={window.innerWidth < 768 ? 800 : 4000}
                    factor={4}
                    saturation={0}
                    fade
                    speed={1}
                />
                {/* Main 3D Scene */}
                <SolarSystem onPlanetClick={onPlanetClick} paused={paused} />

                <Environment
                    preset="sunset"
                    background={false}
                    resolution={256}
                />

                <OrbitControls
                    enableZoom={true}
                    enablePan={false}
                    enableRotate={!paused}
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

            </Canvas>

            {/* UI Overlay (Title) */}
            <div className="absolute w-full top-8 md:top-16 left-1/2 -translate-x-1/2 text-center z-10 pointer-events-auto px-4">
                <h1 className="text-2xl sm:text-4xl md:text-6xl font-bold text-cyan-300 mb-1 md:mb-2 drop-shadow-lg">
                    Captain Shubham Lohar
                </h1>
                <p className="text-xs sm:text-sm md:text-lg text-gray-300 drop-shadow">Full Stack Astronaut</p>
            </div>
        </div>
    );
};

export default HeroScene;