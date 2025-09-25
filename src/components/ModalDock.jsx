// Components/ModalDock.jsx
import { AnimatePresence, motion } from 'framer-motion';
import { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import AboutModal from '../modals/AboutModal';
import ProjectsModal from '../modals/ProjectsModal';
import SkillsModal from '../modals/SkillsModal';
import ExperienceModal from '../modals/ExperienceModal';
import ResumeModal from '../modals/ResumeModal';

const sections = ["About", "Projects", "Skills", "Experience", "Resume"];

const ModalDock = ({ section, onClose, onChange }) => {
  const [direction, setDirection] = useState(0); // -1 = left, 1 = right
  const touchStartX = useRef(null);
  const touchStartY = useRef(null);

  const renderContent = () => {
    switch (section) {
      case 'About': return <AboutModal />;
      case 'Projects': return <ProjectsModal />;
      case 'Skills': return <SkillsModal />;
      case 'Experience': return <ExperienceModal />;
      case 'Resume': return <ResumeModal />;
      default: return <AboutModal />;
    }
  };

  const handlePrev = useCallback(() => {
    const currentIndex = sections.indexOf(section);
    const prevIndex = (currentIndex - 1 + sections.length) % sections.length;
    setDirection(-1);
    onChange(sections[prevIndex]);
  }, [section, onChange]);

  const handleNext = useCallback(() => {
    const currentIndex = sections.indexOf(section);
    const nextIndex = (currentIndex + 1) % sections.length;
    setDirection(1);
    onChange(sections[nextIndex]);
  }, [section, onChange]);

  // Keyboard Navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") handlePrev();
      else if (e.key === "ArrowRight") handleNext();
      else if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handlePrev, handleNext, onClose]);

  // Touch/Swipe Support (horizontal nav + mobile sheet close)
  useEffect(() => {
    const handleTouchStart = (e) => {
      touchStartX.current = e.touches[0].clientX;
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchEnd = (e) => {
      if (touchStartX.current === null || touchStartY.current === null) return;

      const touchEndX = e.changedTouches[0].clientX;
      const touchEndY = e.changedTouches[0].clientY;
      const deltaX = touchEndX - touchStartX.current;
      const deltaY = touchEndY - touchStartY.current;

      const swipeThreshold = 50; // px

      // horizontal nav
      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        if (deltaX > swipeThreshold) handlePrev();
        else if (deltaX < -swipeThreshold) handleNext();
      } else {
        // vertical: close on swipe down (mobile sheet)
        if (deltaY > swipeThreshold) onClose();
      }

      touchStartX.current = null;
      touchStartY.current = null;
    };

    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchend", handleTouchEnd);

    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [handlePrev, handleNext]);

  // Animation variants (desktop slide, mobile bottom sheet)
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;
  const variants = isMobile
    ? {
        enter: () => ({ y: 40, opacity: 0 }),
        center: { y: 0, opacity: 1 },
        exit: () => ({ y: 60, opacity: 0 }),
      }
    : {
        enter: (dir) => ({ x: dir > 0 ? 300 : -300, opacity: 0 }),
        center: { x: 0, opacity: 1 },
        exit: (dir) => ({ x: dir > 0 ? -300 : 300, opacity: 0 }),
      };

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        className="fixed inset-0 bg-black bg-opacity-90 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4"
        role="dialog"
        aria-modal="true"
        aria-label={`${section} Module`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          key={section} // Important for AnimatePresence to detect changes
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className={`bg-gray-950 border border-cyan-500 rounded-t-xl sm:rounded-xl p-4 sm:p-6 w-full ${isMobile ? 'max-w-none' : 'max-w-lg sm:max-w-2xl md:max-w-3xl'} max-h-[90vh] overflow-hidden relative ${isMobile ? 'self-end' : ''}`}
          style={{
            background: 'radial-gradient(circle at top right, #0a2e38, #000)',
            boxShadow: '0 0 40px rgba(6, 182, 212, 0.4), inset 0 0 20px rgba(6, 182, 212, 0.1)',
          }}
          onClick={(e) => e.stopPropagation()}
          tabIndex={-1}
        >
          {/* Mobile grabber */}
          {isMobile && (
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-12 h-1.5 bg-cyan-700/60 rounded-full" />
          )}
          {/* Close and Arrows */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 sm:top-4 sm:right-4 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-red-900 hover:bg-red-700 text-white flex items-center justify-center text-xl z-20 transition cursor-pointer"
          >
            ✕
          </button>

          <button
            onClick={handlePrev}
            className="hidden md:flex absolute top-1/2 -left-6 -translate-y-1/2 
             w-12 h-12 rounded-full bg-cyan-900/60 hover:bg-cyan-700/80 
             text-cyan-300 items-center justify-center 
             shadow-lg backdrop-blur-sm transition z-20 cursor-pointer"
          >
            <ChevronLeft size={28} strokeWidth={2.5} />
          </button>

          <button
            onClick={handleNext}
            className="hidden md:flex absolute top-1/2 -right-6 -translate-y-1/2 
             w-12 h-12 rounded-full bg-cyan-900/60 hover:bg-cyan-700/80 
             text-cyan-300 items-center justify-center 
             shadow-lg backdrop-blur-sm transition z-20 cursor-pointer"
          >
            <ChevronRight size={28} strokeWidth={2.5} />
          </button>

          {/* Header */}
          <div className="relative z-10 border-b border-gray-700 !p-4 sm:!p-5 mb-3 sm:mb-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-cyan-300 flex items-center gap-3">
              <span className="inline-block w-3 h-3 bg-cyan-400 rounded-full animate-pulse"></span>
              {section} Module
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Docking sequence complete... Initializing {section.toLowerCase()} database.
            </p>
          </div>

          {/* Content */}
          <div id='model-content' className="relative z-10 text-gray-200 !p-4 sm:!p-5 overflow-y-auto max-h-[calc(90vh - 9.5rem)]">
            {renderContent()}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ModalDock;
