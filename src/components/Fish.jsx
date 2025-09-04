import { motion } from "framer-motion";
import React from "react";

// function Fish({ id, label, index, onClick, caught, width, height }) {
//   // Responsive random start positions (based on viewport width/height))
//   const startX = Math.floor(Math.random() * (width * 0.6)) + width * 0.2;
//   const startY = Math.floor(Math.random() * (height * 0.3)) + 20;
//   const swimDirection = index % 2 === 1 ? 1 : -1;

//   return (
//     <motion.div
//       className="absolute cursor-pointer flex flex-col items-center"
//       style={{ top: `${startY}px` }}
//       initial={{ x: startX, y: startY }}
//       animate={
//         caught
//           ? { x: width * 0.75, y: height * 0.2, scale: 0.3, opacity: 0 }
//           : {
//               x: [startX, startX + swimDirection * (width * 0.15), startX],
//               y: [startY, startY - 10, startY + 10, startY],
//             }
//       }
//       transition={
//         caught
//           ? { duration: 1.2, ease: "easeInOut" }
//           : { repeat: Infinity, duration: 6 + index }
//       }
//       onClick={() => onClick(id)}
//       whileHover={!caught ? { scale: 1.1 } : {}}
//     >
//       <img
//         src={`/fish${(index % 5) + 1}.svg`} // ✅ cycles if more fishes than SVGs
//         alt={label}
//         className={`w-14 md:w-20 h-auto ${
//           swimDirection === -1 ? "scale-x-[-1]" : ""
//         }`}
//       />
//       <p className="text-center text-xs md:text-sm text-white font-semibold drop-shadow-md -mt-3">
//         {label}
//       </p>
//     </motion.div>
//   );
// }

function Fish({ id, label, index, onClick, caught, width, height }) {
    // define safe zones
    const isMobile = width < 768;
  
    // on mobile, keep fish away from right dock (last 30% width, top 40%)
    const maxSafeX = isMobile ? width * 0.65 : width * 0.8;
    const minSafeX = width * 0.1;
  
    const startX = Math.floor(Math.random() * (maxSafeX - minSafeX)) + minSafeX;
    const startY = Math.floor(Math.random() * (height * 0.3)) + (isMobile ? 80 : 20);
  
    const swimDirection = index % 2 === 1 ? 1 : -1;
  
    return (
      <motion.div
        className="absolute cursor-pointer flex flex-col items-center"
        style={{ top: `${startY}px` }}
        initial={{ x: startX, y: startY }}
        animate={
          caught
            ? { x: width * 0.75, y: height * 0.2, scale: 0.3, opacity: 0 }
            : {
                x: [startX, startX + swimDirection * (width * 0.15), startX],
                y: [startY, startY - 10, startY + 10, startY],
              }
        }
        transition={
          caught
            ? { duration: 1.2, ease: "easeInOut" }
            : { repeat: Infinity, duration: 6 + index }
        }
        onClick={() => onClick(id)}
        whileHover={!caught ? { scale: 1.1 } : {}}
      >
        <img
          src={`/fish${(index % 5) + 1}.svg`}
          alt={label}
          className={`w-14 md:w-20 h-auto ${
            swimDirection === -1 ? "scale-x-[-1]" : ""
          }`}
        />
        <p className="text-center text-xs md:text-sm text-white font-semibold drop-shadow-md -mt-3">
          {label}
        </p>
      </motion.div>
    );
  }
  

export default React.memo(Fish);
