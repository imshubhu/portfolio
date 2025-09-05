// src/App.jsx
import { useEffect, useState } from 'react';
import HeroScene from './components/HeroScene';
import ModalDock from './components/ModalDock';
import Footer from './components/Footer';
import gsap from 'gsap';

function App() {
  const [activeSection, setActiveSection] = useState(null);

  // In App.jsx or HeroScene.jsx
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'l') localStorage.__code_astronaut = 'l';
      else if (localStorage.__code_astronaut === 'l' && e.key === 'a') localStorage.__code_astronaut = 'la';
      else if (localStorage.__code_astronaut === 'la' && e.key === 'u') localStorage.__code_astronaut = 'lau';
      else if (localStorage.__code_astronaut === 'lau' && e.key === 'n') localStorage.__code_astronaut = 'laun';
      else if (localStorage.__code_astronaut === 'laun' && e.key === 'c') localStorage.__code_astronaut = 'launch';
      else if (localStorage.__code_astronaut === 'launch' && e.key === 'h') {
        alert('🚀 UFO Abducted Your Resume! Secret project unlocked: https://github.com/alex/cosmic-cv');
        localStorage.removeItem('__code_astronaut');
      } else {
        localStorage.removeItem('__code_astronaut');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  function closeModal(){
        // Create a video element for the warp effect

        console.log('active', activeSection)
        let video_name = 'space-ship-leaving';

        switch (activeSection) {
          case 'Projects':
            video_name = 'space-ship-leaving-jupiter'
            break;
          case 'About':
            video_name = 'space-ship-leaving-earth'
            break;
          case 'Skills':
            video_name = 'space-ship-leaving-saturn'
            break;
          case 'Experience':
            video_name = 'space-ship-leaving-uranus'
            break;
          case 'Resume':
            video_name = 'space-ship-leaving-neptune'
            break;
        
          default:
            break;
        }

        const warpVideo = document.createElement('video');
        warpVideo.src = `/videos/${video_name}.mp4`; // Assuming a warp video path
        warpVideo.muted = true;
        warpVideo.autoplay = false;
        warpVideo.loop = false;
        warpVideo.playsInline = true; // Important for mobile Safari
      
        // Fullscreen & responsive styling
        warpVideo.style.position = 'fixed';
        warpVideo.style.top = '0';
        warpVideo.style.left = '0';
        warpVideo.style.width = '100%';
        warpVideo.style.height = '100%';
        warpVideo.style.objectFit = 'cover';
        warpVideo.style.zIndex = '9998';
        warpVideo.style.opacity = '0';
        warpVideo.style.pointerEvents = 'none';
    
        document.body.appendChild(warpVideo);
    
        // GSAP animation to show the video
        gsap.to(warpVideo, {
          opacity: 1,
          duration: 0.5,
          ease: 'power2.out',
          onStart: () => {
            warpVideo.play();
          },
          onComplete: () => {
            // This part would typically be coordinated with the camera animation's onComplete
            // For now, we'll just fade it out after a short delay.
            setActiveSection(null)
            gsap.to(warpVideo, {
              opacity: 0,
              delay: 1.5, // Keep video visible for 1.5 seconds
              duration: 0.5,
              onComplete: () => {
                warpVideo.pause();
                warpVideo.currentTime = 0;
                document.body.removeChild(warpVideo);
              }
            });
          }
        });
  }

  return (
    <div className="overflow-hidden bg-black text-white relative w-full h-screen">
      {/* Background Stars */}
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-950 via-black to-black"></div>
      <div className="stars"></div>

      {/* Main Scene */}
      <HeroScene onPlanetClick={setActiveSection} />

      {/* Docked Modal */}
      {activeSection && (
        <ModalDock section={activeSection} onClose={() => closeModal()} />
      )}

      <Footer />
    </div>
  );
}

export default App;