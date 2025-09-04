import { motion } from 'framer-motion';
import React from 'react';
const River = ({
    children,
    width = 800,
    height = 200,
    duration = 15,
    primaryColor = '#4fc3f7',
    rippleColor = 'rgba(255, 255, 255, 0.3)',
    splash = false
}) => {
    // River bed path (curved river shape)
    const riverPath = `
      M0,${height * 0.4}
      C ${width * 0.2},0 ${width * 0.4},${height} ${width * 0.6},${height * 0.4}
      C ${width * 0.8},0 ${width},${height * 0.6} ${width},${height * 0.4}
      L${width},${height}
      C ${width * 0.8},${height + 20} ${width * 0.6},${height - 20} ${width * 0.4},${height}
      C ${width * 0.2},${height + 20} 0,${height - 20} 0,${height}
      Z
    `;

    // Generate wave path (double width for seamless animation)
    const generateWavePath = (totalWidth, yOffset, amplitude, frequency, phase) => {
        let path = `M0,${yOffset} `;
        for (let x = 0; x <= totalWidth; x++) {
            const y = yOffset + amplitude * Math.sin(frequency * x + phase);
            path += `L${x},${y} `;
        }
        path += `L${totalWidth},${yOffset} Z`;
        return path;
    };

    const waterLevel = height * 0.35;
    const waveAmplitude = 4;
    const waveFrequency = 0.015;

    // Create two wave paths with different phases for natural ripple effect
    const wavePath1 = generateWavePath(
        width * 2,
        waterLevel,
        waveAmplitude,
        waveFrequency,
        0
    );

    const wavePath2 = generateWavePath(
        width * 2,
        waterLevel,
        waveAmplitude * 1.3,
        waveFrequency * 0.9,
        Math.PI / 2
    );

    return (
        // <div style={{ width, height: 'calc(100vh - 22rem)', position: 'relative' }}>
        <div style={{ width, height: 'calc(100vh - 22rem)', position: 'relative' }}>
            <svg
                width="100%"
                height="100%"
                viewBox={`0 0 ${width} ${height}`}
                preserveAspectRatio="xMidYMid slice"
            >
                <defs>
                    <clipPath id="river-clip">
                        <path d={riverPath} />
                    </clipPath>

                    {/* Add subtle water texture pattern */}
                    <pattern id="water-pattern" width="10" height="10" patternUnits="userSpaceOnUse">
                        <path d="M0,5 L10,0 L10,10 L0,5" fill="rgba(255,255,255,0.02)" />
                    </pattern>
                </defs>

                {/* Base water color with subtle texture */}
                <rect width="100%" height="100%" fill={primaryColor} />
                <rect width="100%" height="100%" fill="url(#water-pattern)" />

                {/* Animated water surface ripples */}
                <g clipPath="url(#river-clip)">
                    <path
                        d={wavePath1}
                        fill={rippleColor}
                        style={{
                            animation: `waveFlow ${duration}s linear infinite`,
                        }}
                    />
                    <path
                        d={wavePath2}
                        fill={rippleColor}
                        style={{
                            animation: `waveFlow ${duration * 1.2}s linear infinite`,
                            animationDelay: `-${duration * 0.3}s`
                        }}
                    />
                </g>
            </svg>

            {/* CSS Animations */}
            <style>
                {`
            @keyframes waveFlow {
              from { transform: translateX(0); }
              to { transform: translateX(-${width}px); }
            }
            
            /* Add gentle shimmer effect to water */
            svg {
              filter: url(#shimmer);
            }
            
            @keyframes shimmer {
              0% { filter: brightness(1); }
              50% { filter: brightness(1.1); }
              100% { filter: brightness(1); }
            }
          `}
            </style>
            {children}
            {splash && (
                <motion.div
                    className="absolute bottom-24 left-1/2 w-24 h-24 rounded-full border-4 border-white"
                    initial={{ scale: 0, opacity: 0.8 }}
                    animate={{ scale: [0, 1.2, 1.5], opacity: [0.8, 0.4, 0] }}
                    transition={{ duration: 1, ease: "easeOut" }}
                />
            )}
            {/* SVG Filter for subtle shimmer effect */}
            <svg width="0" height="0" style={{ position: 'absolute' }}>
                <filter id="shimmer">
                    <feTurbulence type="fractalNoise" baseFrequency="0.01" numOctaves="2" result="turb" />
                    <feDisplacementMap in="SourceGraphic" in2="turb" scale="2" xChannelSelector="R" yChannelSelector="G" />
                    <feGaussianBlur stdDeviation="0.5" result="blur" />
                    <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>
            </svg>
        </div>
    );
};

export default React.memo(River);