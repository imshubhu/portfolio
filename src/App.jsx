import React, { useState, useEffect, useCallback, useMemo } from "react";
import River from "./components/River";
import Fish from "./components/Fish";
import Fisherman from "./components/Fisherman";
import ShowModel from "./components/ShowModel";
import { Modal } from "./components/Modal";

// ✅ Move fishes outside (doesn’t change per render)
const FISHES = [
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "resume", label: "Resume" },
];

export default function App() {
  const [selected, setSelected] = useState(null);
  const [isFishing, setIsFishing] = useState(false);
  const [caughtFish, setCaughtFish] = useState(null);
  const [splash, setSplash] = useState(false);
  const [dimensions, setDimensions] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 1280,
    height: typeof window !== "undefined" ? window.innerHeight : 720,
  });

  // ✅ Responsive width/height tracking
  useEffect(() => {
    function handleResize() {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ✅ Stable fish click handler
  const handleFishClick = useCallback((id) => {
    setIsFishing(true);
    setCaughtFish(id);
    setSplash(true);

    setTimeout(() => setSplash(false), 1000);
    setTimeout(() => {
      setSelected(id);
      setIsFishing(false);
      setCaughtFish(null);
    }, 1200);
  }, []);

  // ✅ Stable close handler
  const closeModal = useCallback(() => {
    setSelected(null);
  }, []);

  // ✅ Find selected fish label only when needed
  const selectedFishLabel = useMemo(
    () => (selected ? FISHES.find((f) => f.id === selected)?.label : ""),
    [selected]
  );

  return (
    <div className="min-h-screen bg-[#0e4872] text-white relative overflow-hidden">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/10 border-b border-white/20 shadow-lg p-6 md:p-10 max-w-6xl mx-auto text-center md:text-left rounded-b-2xl">
        {/* Name with gradient */}
        <h1 className="text-3xl md:text-5xl font-extrabold drop-shadow-lg">
          <span className="bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
            Shubham Lohar
          </span>{" "}
          <span className="text-white">— MERN Developer</span>
        </h1>

        {/* Subtext with icons */}
        <p className="mt-3 text-gray-200 text-base md:text-lg flex items-center justify-center md:justify-start gap-2">
          <span>🎣</span> Click a fish → fisherman catches it → modal opens <span>🐟</span>
        </p>

        {/* Decorative underline */}
        <div className="mt-4 h-1 w-32 md:w-48 bg-gradient-to-r from-cyan-400 to-blue-600 rounded-full mx-auto md:mx-0"></div>
      </header>



      {/* Content area */}
      <div className="relative w-full pt-40">
        {/* River (background water) */}
        <River
          width={dimensions.width}
          height={Math.min(400, dimensions.height * 0.5)}
          splash={splash}
          primaryColor="#1be0ef"
        >
          {FISHES.map((f, i) => (
            <Fish
              key={f.id}
              id={f.id}
              label={f.label}
              index={i}
              onClick={handleFishClick}
              caught={caughtFish === f.id}
              width={dimensions.width}
              height={dimensions.height / 1.5}
            />
          ))}
        </River>

        {/* Fisherman (overlays river at top-right) */}
        <div className="absolute top-[-21px] right-[7rem] md:right-0 z-20">
          <div className="w-40 md:w-72">
            <Fisherman isFishing={isFishing} />
          </div>
        </div>
      </div>

      {/* Modal */}
      <Modal open={!!selected} onClose={closeModal} title={selectedFishLabel}>
        <ShowModel selected={selected} />
      </Modal>
    </div>
  );
}
