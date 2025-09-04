// fisher-portfolio-images.jsx
// Replace SVG Fisherman & Fish with Realistic PNG/Illustration Images + rod/line animation + caught fish + splash + alternating swim directions
// Requires: React, Tailwind CSS, framer-motion

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// 🎣 Fisherman Image with Rod/Line
function Fisherman({ isFishing }) {
  return (
    <div className="relative w-64 h-64">
      {/* Fisherman illustration */}
      <img src="/fisherman.svg" alt="Fisherman" className="w-full h-full object-contain" />
      {/* Fishing rod line overlay */}
      <motion.div
        className="absolute top-16 left-40 w-px bg-black"
        style={{ height: 120 }}
        animate={isFishing ? { height: 60 } : { height: 120 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      />
    </div>
  );
}

// 🌊 River Background
function River({ children, splash }) {
  return (
    <div className="absolute left-0 right-0 bottom-0 h-64 overflow-hidden bg-blue-500">
      <svg viewBox="0 0 1440 320" className="absolute bottom-0 w-full h-full">
        <motion.path
          fill="#3b82f6"
          fillOpacity="0.9"
          d="M0,224L48,218.7C96,213,192,203,288,192C384,181,480,171,576,176C672,181,768,203,864,218.7C960,235,1056,245,1152,229.3C1248,213,1344,171,1392,149.3L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          animate={{ x: [0, -40, 0] }}
          transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
        />
      </svg>
      {children}
      {splash && (
        <motion.div
          className="absolute bottom-24 left-1/2 w-24 h-24 rounded-full border-4 border-white"
          initial={{ scale: 0, opacity: 0.8 }}
          animate={{ scale: [0, 1.2, 1.5], opacity: [0.8, 0.4, 0] }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      )}
    </div>
  );
}

// 🐟 Fish Image with swim + catch animation
function Fish({ id, label, index, onClick, caught }) {
  // Increased horizontal spread for initial positions
  const startX = index % 2 === 0 ? 0 : 400; // Changed from 5 and 80 to 0 and 95
  // Increased vertical spread for initial positions
  const startY = 5 + index * 18; // Changed from 10 + index * 12, and lowered base to give more room
  const swimDirection = index % 2 === 0 ? 1 : -1;

  return (
    <motion.div
      className="absolute cursor-pointer flex flex-col items-center"
      initial={{ x: `${startX}%`, y: `${startY}%` }}
      animate={
        caught
          ? { x: "75%", y: "20%", scale: 0.3, opacity: 0 }
          : {
              // Increased horizontal swim distance
              x: [`${startX}%`, `${startX + 20 * swimDirection}%`, `${startX}%`], // Changed from 10 to 20
              // Increased vertical bobbing distance
              y: [`${startY}%`, `${startY - 5}%`, `${startY + 5}%`, `${startY}%`], // Changed from 3 to 5
            }
      }
      transition={
        caught
          ? { duration: 1.2, ease: "easeInOut" }
          : { repeat: Infinity, duration: 7 + index }
      }
      onClick={() => onClick(id)}
      whileHover={!caught ? { scale: 1.1 } : {}}
    >
      <img
        src={`/fish${index + 1}.svg`}
        alt={label}
        className={`w-20 h-auto ${swimDirection === -1 ? 'scale-x-[-1]' : ''}`}
      />
      <p className="text-center text-sm text-white font-semibold drop-shadow-md">{label}</p>
    </motion.div>
  );
}

// Modal Component
function Modal({ open, onClose, title, children }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
        >
          <motion.div
            initial={{ scale: 0.9, y: 30 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 30 }}
            className="bg-white max-w-2xl w-full rounded-2xl shadow-2xl p-6"
          >
            <div className="flex justify-between items-start">
              <h3 className="text-xl font-semibold">{title}</h3>
              <button onClick={onClose} className="text-gray-600 hover:text-gray-900">✕</button>
            </div>
            <div className="mt-4 text-sm text-gray-700">{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Main App
export default function App() {
  const fishes = [
    { id: 'about', label: 'About Fish' },
    { id: 'projects', label: 'Project Fish' },
    { id: 'skills', label: 'Skill Fish' },
    { id: 'experience', label: 'Experience Fish' },
    { id: 'resume', label: 'Resume Fish' },
  ];

  const [selected, setSelected] = useState(null);
  const [isFishing, setIsFishing] = useState(false);
  const [caughtFish, setCaughtFish] = useState(null);
  const [splash, setSplash] = useState(false);

  function handleFishClick(id) {
    setIsFishing(true);
    setCaughtFish(id);
    setSplash(true);
    setTimeout(() => setSplash(false), 1000);
    setTimeout(() => {
      setSelected(id);
      setIsFishing(false);
      setCaughtFish(null);
    }, 1200);
  }

  function closeModal() {
    setSelected(null);
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-900 via-sky-800 to-sky-700 text-white relative overflow-hidden">
      <header className="p-8 max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold">Fisher Portfolio — MERN Developer</h1>
        <p className="mt-2 text-gray-200">Click a fish → fisherman catches it → modal opens.</p>
      </header>

      <main className="relative z-10 p-8 max-w-6xl mx-auto" style={{ paddingBottom: 220 }}>
        <div className="flex items-end justify-between">
          <div className="max-w-lg">
            <h2 className="text-2xl font-semibold">Welcome!</h2>
            <p className="mt-3 text-gray-200">Fish act as navigation to portfolio content.</p>
          </div>

          <div className="pointer-events-none">
            <Fisherman isFishing={isFishing} />
          </div>
        </div>
      </main>

      <River splash={splash}>
        {fishes.map((f, i) => (
          <Fish
            key={f.id}
            id={f.id}
            label={f.label}
            index={i}
            onClick={handleFishClick}
            caught={caughtFish === f.id}
          />
        ))}
      </River>

      <Modal open={!!selected} onClose={closeModal} title={selected ? fishes.find(f => f.id === selected).label : ''}>
        {selected === 'about' && <p>About Me: MERN stack developer passionate about building scalable apps.</p>}
        {selected === 'projects' && <p>Projects: Showcase of my MERN applications.</p>}
        {selected === 'skills' && <p>Skills: React, Node.js, Express, MongoDB, Docker, Tailwind.</p>}
        {selected === 'experience' && <p>Experience: Software Developer at X Company.</p>}
        {selected === 'resume' && <p>Resume: <a href="#" className="underline">Download PDF</a></p>}
      </Modal>
    </div>
  );
}
