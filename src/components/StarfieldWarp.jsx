// src/components/StarfieldWarp.jsx
import { useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import GLBSpaceship from "./GLBSpaceship";
import gsap from "gsap";
import WarpStars from "./WarpStars";
import { Stars, useTexture } from "@react-three/drei";
import * as THREE from 'three';

function AnimatedSpaceship() {
    const shipRef = useRef();

    useEffect(() => {
        if (shipRef.current) {
            gsap.fromTo(
                shipRef.current.position,
                { z: 196 },
                { z: -70, duration: 5, ease: "power3.in" } // fly forward
            );
            gsap.fromTo(
                shipRef.current.scale,
                { x: 0.5, y: 0.5, z: 0.5 },
                { x: 2, y: 2, z: 2, duration: 5, ease: "power3.in" } // scale up
            );
        }
    }, []);

    return (
        <group ref={shipRef}>
            <GLBSpaceship />
        </group>
    );
}

export default function StarfieldWarp({ onFinish, section }) {
    const containerRef = useRef();
    const [warpProgress, setWarpProgress] = useState(0);

    useEffect(() => {
        const el = containerRef.current;
        gsap.fromTo(el, { opacity: 0 }, { opacity: 1, duration: 0.6 });

        // Animate warpProgress from 0 → 1
        gsap.to({}, {
            duration: 1.5,
            onUpdate: function () {
                setWarpProgress(this.progress()); // 0 to 1
            },
        });

        const timer = setTimeout(() => {
            gsap.to(el, {
                opacity: 0,
                duration: 0.6,
                onComplete: onFinish
            });
        }, 2500); // total warp time

        return () => {
            clearTimeout(timer);
            gsap.killTweensOf("*"); // stop GSAP animations
        };
    }, [onFinish]);

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 z-[9999] bg-black pointer-events-none opacity-0"
        >
            <Canvas camera={{ position: [0, 0, 200], fov: 75 }}>
                <ambientLight intensity={2.5} />
                <Planet section={section} />
                <Stars
                    radius={100}
                    depth={50}
                    count={5000}
                    factor={4}
                    saturation={0}
                    fade
                    speed={1}
                />
                <WarpStars warpProgress={warpProgress} />
                <AnimatedSpaceship />
            </Canvas>
        </div>
    );
}

import { memo } from 'react'; // Add memo import

const Planet = memo(function Planet({ section }) {
    // if (!section) return
    let section_image = '/textures/sun.jpg';
    switch (section) {
        case 'About': section_image = '/textures/earth.jpg'; break;
        case 'Projects': section_image = '/textures/jupiter.jpg'; break;
        case 'Skills': section_image = '/textures/saturn.jpg'; break;
        case 'Experience': section_image = '/textures/uranus.jpg'; break;
        case 'Resume': section_image = '/textures/neptune.jpg'; break;
    }
    const sun_texture = useTexture(section_image);

    return (
        <>
            <mesh name="Sun" position={[0, 0, 0]} >
                <sphereGeometry args={[10, 180, 180]} />
                <meshStandardMaterial
                    map={sun_texture}
                    emissive={section ? '' : "#ffaa00"}
                    emissiveIntensity={2}
                    transparent
                />
            </mesh>
            {
                !section &&
                <mesh position={[0, 0, 0]}>
                    <sphereGeometry args={[12, 180, 180]} />
                    <meshStandardMaterial
                        color="#ffff00"
                        transparent
                        blending={THREE.AdditiveBlending}
                    />
                </mesh>
            }
        </>
    );
});
