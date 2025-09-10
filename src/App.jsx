import { useEffect, useState, useRef } from 'react';
import HeroScene from './components/HeroScene';
import ModalDock from './components/ModalDock';
import Footer from './components/Footer';
import StarfieldWarp from './components/StarfieldWarp';

function App() {
  const [activeSection, setActiveSection] = useState(null);
  const [showWarp, setShowWarp] = useState(false);
  const sectionToOpen = useRef(null); // temp storage

  // cheat-code listener (unchanged)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'l') localStorage.__code_astronaut = 'l';
      else if (localStorage.__code_astronaut === 'l' && e.key === 'a') localStorage.__code_astronaut = 'la';
      else if (localStorage.__code_astronaut === 'la' && e.key === 'u') localStorage.__code_astronaut = 'lau';
      else if (localStorage.__code_astronaut === 'lau' && e.key === 'n') localStorage.__code_astronaut = 'laun';
      else if (localStorage.__code_astronaut === 'laun' && e.key === 'c') localStorage.__code_astronaut = 'launch';
      else if (localStorage.__code_astronaut === 'launch' && e.key === 'h') {
        alert('🚀 UFO Abducted Your Resume! Secret project unlocked: https://github.com/imshubhu');
        localStorage.removeItem('__code_astronaut');
      } else {
        localStorage.removeItem('__code_astronaut');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

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
        <HeroScene onPlanetClick={handlePlanetClick} />
      }

      {/* Modal only after warp finishes */}
      {activeSection && (
        <ModalDock section={activeSection} onClose={closeModal} />
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
