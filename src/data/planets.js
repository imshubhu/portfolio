// src/data/planets.js

const rotatePeriod = 10

const planets = [
    {
        id: 'About',
        name: "Earth",
        size: 3,
        distance: 60,       // Increased distance
        texture: "/textures/earth.jpg",
        // orbitalPeriod: 1,
        orbitalPeriod: 1 * rotatePeriod,
        rotationPeriod: 1 * rotatePeriod,
        glowColor: '#d1d5db',
        moon: [
            {
                name: "Moon",
                size: 1 * 0.27,
                positionSize: 1 * 2.5,
                distance: 30,       // Increased distance
                texture: "/textures/moon.jpg",
                orbitalPeriod: 1 * rotatePeriod,
                rotationPeriod: 0.2,
            }
        ]
    },
    {
        id: 'Projects',
        name: "Jupiter",
        size: 6,            // Reduced size for better scale
        distance: 110,       // Adjusted distance
        texture: "/textures/jupiter.jpg",
        // orbitalPeriod: 11.86,
        orbitalPeriod: 11.86 * rotatePeriod,
        rotationPeriod: 0.41 * rotatePeriod,
        glowColor: '#C9966B',
        moon: [
            {
                name: "Io",
                size: 2 * 0.28,
                positionSize: 2 * 4.5,
                distance: 60,       // Increased distance
                texture: "/textures/moon.jpg",
                orbitalPeriod: 0.005 * rotatePeriod,
                rotationPeriod: 1.77,
            },
            {
                name: "Europa",
                size: 2 * 0.24,
                positionSize: 2 * 5.5,
                distance: 60,       // Increased distance
                texture: "/textures/moon.jpg",
                orbitalPeriod: 0.01 * rotatePeriod,
                rotationPeriod: 3.55,
            },
        ]
    },
    {
        id: 'Skills',
        name: "Saturn",
        size: 5,            // Reduced size
        distance: 140,       // Adjusted distance
        texture: "/textures/saturn.jpg",
        // orbitalPeriod: 29.46,
        orbitalPeriod: 29.46 * rotatePeriod,
        rotationPeriod: 0.44 * rotatePeriod,
        glowColor: '#E6D8AD',
        moon: [
            {
                name: "Titan",
                size: 2 * 0.2,
                positionSize: 2 * 5,
                distance: 80,       // Increased distance
                texture: "/textures/moon.jpg",
                orbitalPeriod: 0.04 * rotatePeriod,
                rotationPeriod: 3.95,
            },
        ]
    },
    {
        id: 'Experience',
        name: "Uranus",
        size: 2.5,          // Slightly larger
        distance: 180,      // Adjusted distance
        texture: "/textures/uranus.jpg",
        glowColor: '#AFDBF5',
        // orbitalPeriod: 84.01,
        orbitalPeriod: 84.01 * rotatePeriod,
        rotationPeriod: -0.72 * rotatePeriod,
        moon: [
            {
                name: "Titania",
                size: 2 * 0.12,
                positionSize: 2 * 2.5,
                distance: 100,       // Increased distance
                texture: "/textures/moon.jpg",
                orbitalPeriod: 0.05 * rotatePeriod,
                rotationPeriod: 1,
            },
        ]
    },
    {
        id: 'Resume',
        name: "Neptune",
        size: 2.4,          // Slightly larger
        distance: 220,      // Adjusted distance
        texture: "/textures/neptune.jpg",
        glowColor: '#4B70DD',
        // orbitalPeriod: 164.8,
        orbitalPeriod: 164.8 * rotatePeriod,
        rotationPeriod: 0.67 * rotatePeriod,
        moon: [
            {
                name: "Triton",
                size: 2 * 0.1,
                positionSize: 2 * 2,
                distance: 120,       // Increased distance
                texture: "/textures/moon.jpg",
                orbitalPeriod: 0.02 * rotatePeriod,
                rotationPeriod: -2,
            },
        ]
    }
];

export default planets;