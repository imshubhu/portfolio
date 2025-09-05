// src/modals/AboutModal.jsx
import { motion } from 'framer-motion';

const AboutModal = () => {

  function scanGithub(){
    window.open('https://github.com/imshubhu', '__blank')
  }

  return (
    <div>
      <div className="flex items-center gap-4 mb-5">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-2xl font-bold text-white">
          👨‍🚀
        </div>
        <div>
        👋 Hi, I'm <span className="font-bold text-blue-600">Shubham Lohar</span>
          <p className="text-cyan-400">MERN Stack Astronaut • Full-Stack Explorer</p>
        </div>
      </div>

      {/* <p className="text-gray-300 leading-relaxed mb-4">
        <strong>Captain's Log, Stardate 207.4</strong>
        <br />
        Still debugging async waterfall issues across 3 galaxies... but my coffee is strong and my code is stronger.
        I build scalable web apps with MongoDB, Express, React, and Node.js — and I love every second of it.
      </p> */}
      <p className="text-gray-300 leading-relaxed !mt-3 !mb-4">
        Full Stack Developer with <strong>5+ years</strong> of experience building scalable,
        high-performance applications using <span className="font-semibold">React, Angular,
          Next.js, Node.js, and NestJS</span>. Passionate about problem-solving, clean code,
        and delivering impactful products.
      </p>
      {/* 
      <div className="grid grid-cols-2 gap-3 text-sm mt-5">
        <div className="bg-gray-800 p-3 rounded border border-gray-600">
          <strong className="text-cyan-300">Age:</strong> 29
        </div>
        <div className="bg-gray-800 p-3 rounded border border-gray-600">
          <strong className="text-cyan-300">Status:</strong> Hiring ✅
        </div>
        <div className="bg-gray-800 p-3 rounded border border-gray-600">
          <strong className="text-cyan-300">Location:</strong> Earth 🌍
        </div>
        <div className="bg-gray-800 p-3 rounded border border-gray-600">
          <strong className="text-cyan-300">Fuel:</strong> Coffee ☕
        </div>
      </div> */}

      <div className="mt-6 flex gap-3">
        <button className="px-5 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 rounded-lg font-semibold transition">
          📮 Beam Me a Message
        </button>
        <button className="px-5 py-2 cursor-pointer border border-gray-600 hover:border-cyan-500 rounded-lg transition" onClick={() => scanGithub()}>
          🛰️ Scan GitHub
        </button>
      </div>
    </div>
  );
};

export default AboutModal;