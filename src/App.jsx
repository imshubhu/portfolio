import { useState, useRef } from 'react';
import HeroScene from './components/HeroScene';
import ModalDock from './components/ModalDock';
import Footer from './components/Footer';
import StarfieldWarp from './components/StarfieldWarp';

function App() {
  const [activeSection, setActiveSection] = useState(null);
  const [showWarp, setShowWarp] = useState(false);
  const sectionToOpen = useRef(null); // temp storage

  function handlePlanetClick(value) {
    sectionToOpen.current = value; // store clicked section
    setShowWarp(true);             // start warp
  }

  function closeModal() {
    setActiveSection(null);
    sectionToOpen.current = null;
    setShowWarp(true)
  }

  return (
    <div className="overflow-hidden bg-black text-white relative w-full min-h-screen">
      {/* Background Stars */}
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-950 via-black to-black"></div>
      <div className="stars"></div>

      {/* Main Scene */}
      {
        !showWarp &&
        <HeroScene onPlanetClick={handlePlanetClick} paused={Boolean(activeSection)} />
      }

      {/* Modal only after warp finishes */}
      {activeSection && (
        <ModalDock section={activeSection} onClose={closeModal} onChange={setActiveSection}  />
      )}

      {/* Warp effect overlay */}
      {showWarp && (
        <StarfieldWarp
          section={sectionToOpen.current}
          onFinish={() => {
            setActiveSection(sectionToOpen.current); // open modal after warp ends
            setShowWarp(false);
          }}
        />
      )}

      <Footer />
    </div>
  );
}

export default App;
