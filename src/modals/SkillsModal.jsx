// src/modals/SkillsModal.jsx
import { useState } from 'react';

const SkillsModal = () => {
  const [selected, setSelected] = useState(null);

  const skills = [
    { name: 'React', level: 95, color: '#61DAFB', icon: '⚛️' },
    { name: 'Next.js', level: 90, color: '#000000', icon: '▲' },
    { name: 'Angular', level: 80, color: '#DD0031', icon: '🅰️' },
    { name: 'Redux', level: 85, color: '#764ABC', icon: 'Ⓡ' },
    { name: 'Node.js', level: 92, color: '#68A063', icon: '🟢' },
    { name: 'NestJS', level: 88, color: '#E0234E', icon: '🦅' },
    { name: 'Express.js', level: 90, color: '#000000', icon: '⚡' },
    { name: 'MongoDB', level: 85, color: '#47B84D', icon: '🍃' },
    { name: 'PostgreSQL', level: 80, color: '#336791', icon: '🐘' },
    { name: 'MySQL', level: 78, color: '#4479A1', icon: '🐬' },
    { name: 'Redis', level: 75, color: '#DC382D', icon: '🔴' },
    { name: 'Docker', level: 82, color: '#2496ED', icon: '🐳' },
    { name: 'AWS', level: 70, color: '#FF9900', icon: '☁️' },
    { name: 'Firebase', level: 70, color: '#FFCA28', icon: '🔥' },
    { name: 'CI/CD', level: 75, color: '#007ACC', icon: '⚙️' },
    { name: 'Jest', level: 80, color: '#C21325', icon: '🃏' },
    { name: 'WebSockets', level: 85, color: '#000000', icon: '💬' },
    { name: 'MQTT', level: 70, color: '#66BB6A', icon: '📡' },
    { name: 'RabbitMQ', level: 70, color: '#FF6600', icon: '🐇' },
  ];

  return (
    <div>
      <h3 className="text-2xl font-bold text-cyan-300 !mb-1">🔧 Skill Rings</h3>
      <p className="text-gray-400 text-sm mb-5">Rotate the ring to scan a technology.</p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 overflow-auto h-[60vh]">
        {skills.map((skill) => (
          <div
            key={skill.name}
            className={`!p-3 rounded border transition-all cursor-pointer ${
              selected === skill.name
                ? 'bg-cyan-950 border-cyan-500'
                : 'border-gray-600 hover:border-gray-400'
            }`}
            onClick={() => setSelected(skill.name)}
          >
            <div className="flex items-center gap-2 !mb-2">
              <span>{skill.icon}</span>
              <strong>{skill.name}</strong>
            </div>

            {/* Energy Bar */}
            {/* <div className="w-full bg-gray-700 rounded-full !h-2 !mb-1">
              <motion.div
                className="h-2 rounded-full"
                style={{ width: selected === skill.name ? `${skill.level}%` : '0%' }}
                animate={{ width: `${skill.level}%` }}
                transition={{ duration: 1 }}
                // style={{ backgroundColor: skill.color }}
              />
            </div>

            <span className="text-xs text-gray-400">{skill.level}% Proficiency</span> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillsModal;