// src/components/ModalDock.jsx
import { AnimatePresence } from 'framer-motion';
import AboutModal from '../modals/AboutModal';
import ProjectsModal from '../modals/ProjectsModal';
import SkillsModal from '../modals/SkillsModal';
import ExperienceModal from '../modals/ExperienceModal';
import ResumeModal from '../modals/ResumeModal';

const ModalDock = ({ section, onClose }) => {
  if (!section) return null;

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

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black bg-opacity-90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="bg-gray-950 border border-cyan-500 rounded-xl p-6 max-w-3xl w-full max-h-[90vh] overflow-hidden relative"
          initial={{ scale: 0.8, y: 60, rotateX: 20 }}
          animate={{ scale: 1, y: 0, rotateX: 0 }}
          exit={{ scale: 0.8, y: 40, opacity: 0 }}
          style={{
            background: 'radial-gradient(circle at top right, #0a2e38, #000)',
            boxShadow: '0 0 40px rgba(6, 182, 212, 0.4), inset 0 0 20px rgba(6, 182, 212, 0.1)',
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* === Scan Line Animation (Top to Bottom) === */}
          <motion.div
            className="absolute inset-0 pointer-events-auto"
            initial={{ y: '-100%' }}
            animate={{ y: '100%' }}
            transition={{ duration: 1.5, repeat: 1, repeatType: 'reverse', ease: 'linear' }}
            style={{
              background: 'linear-gradient(transparent, rgba(6, 182, 212, 0.3), transparent)',
              zIndex: 10,
            }}
          />

          {/* === Close Button === */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-red-900 hover:bg-red-700 text-white flex items-center justify-center text-xl z-20 transition cursor-pointer"
            aria-label="Close"
          >
            ✕
          </button>

          {/* === Header === */}
          <div className="relative z-10 border-b border-gray-700 !p-5 mb-4">
            <h2 className="text-3xl font-bold text-cyan-300 flex items-center gap-3">
              <span className="inline-block w-3 h-3 bg-cyan-400 rounded-full animate-pulse"></span>
              {section} Module
            </h2>
            <p className="text-sm text-gray-400 mt-1">
              Docking sequence complete... Initializing {section.toLowerCase()} database.
            </p>
          </div>

          {/* === Content === */}
          <div className="relative z-10 text-gray-200 !p-5">
            {renderContent()}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ModalDock;