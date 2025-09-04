import { motion, AnimatePresence } from 'framer-motion';
export function Modal({ open, onClose, title, children }) {
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
                <h3 className="text-xl font-semibold text-gray-600">{title}</h3>
                <button onClick={onClose} className="text-gray-600 hover:text-gray-900 cursor-pointer">✕</button>
              </div>
              <div className="mt-4 text-sm text-gray-700">{children}</div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  }