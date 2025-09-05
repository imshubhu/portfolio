// src/components/MobileNav.jsx
import { useState } from 'react';

const MobileNav = ({ onPlanetClick }) => {
  const planets = ['about', 'projects', 'skills', 'experience', 'resume'];

  return (
    <div className="lg:hidden fixed inset-0 pointer-events-none">
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 space-y-6 pointer-events-auto">
        {planets.map((p) => (
          <button
            key={p}
            onClick={() => onPlanetClick(p)}
            className="block w-48 py-3 bg-gray-800 border border-cyan-500 rounded text-white capitalize hover:bg-cyan-900 transition"
          >
            🚀 {p}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MobileNav;