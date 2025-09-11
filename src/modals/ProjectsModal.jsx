// src/modals/ProjectsModal.jsx
import { useState } from 'react';
import { motion } from 'framer-motion';

const ProjectsModal = () => {
  const [active, setActive] = useState(0);

  const projects = [
    {
      name: 'Rivio',
      tech: ['React', 'Node.js', 'Mysql', 'Socket'],
      desc: 'Monitoring & automation platform for real-time data tracking.',
      live: 'https://rivio.io',
    },
    {
      name: 'Iot-Pot (SaaS)',
      tech: ['Next.js', 'NestJS', 'Postgres', 'MQTT', 'RabbitMQ'],
      desc: 'IoT real-time analytics & alert system.',
      live: 'app.iotpot.app',
    },
    {
      name: "StackOS",
      tech: ['React', 'Web3', 'Ethereum'], // Added for consistency
      desc: "Decentralized cloud platform for deploying apps & blockchain nodes.",
      // live: '', // Added for consistency
    },
    {
      name: "Manifest E",
      tech: ['Angular', 'Php'], // Added for consistency
      desc: "Event creation platform with timezone support & poster generation.",
      // live: '', // Added for consistency
    },
    {
      name: "Monotype Freelance",
      tech: ['Vue', 'Node', 'Logger', 'Analytics'], // Added for consistency
      desc: "Improved logging microservices & integrated Adobe Analytics.",
      live: 'https://www.monotype.com/', // Added for consistency
    },
  ];

  return (
    <div>
      <h3 className="text-2xl font-bold text-cyan-300 !mb-1">🛸 Project Probes</h3>
      <p className="text-gray-400 text-sm !mb-5">Launch a probe to view details.</p>

      {/* <div className="!space-y-4 !overflow-auto h-[50vh]"> */}
      <div className="!space-y-4">
        {projects.map((proj, i) => (
          <motion.div
            key={i}
            className={`!p-4 rounded border cursor-pointer transition-all ${
              i === active
                ? 'bg-cyan-950 border-cyan-500 shadow-lg shadow-cyan-500/20'
                : 'border-gray-600 hover:border-gray-400'
            }`}
            onClick={() => setActive(i)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.1 }}
          >
            <h4 className="font-bold text-lg">{proj.name}</h4>
            <p className="text-gray-300 text-sm !mb-2">{proj.desc}</p>
            <div className="flex flex-wrap gap-2 !mb-3">
              {proj.tech.map((t) => (
                <span
                  key={t}
                  className="text-xs !px-2 !py-1 bg-gray-700 rounded text-cyan-300"
                >
                  {t}
                </span>
              ))}
            </div>
            {
              proj.live && 
              <div className="flex gap-2">
                <a
                  href={proj.live}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs !px-3 !py-1 bg-purple-700 hover:bg-purple-600 rounded"
                >
                  🌐 Live Demo
                </a>
              </div>
            }
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsModal;