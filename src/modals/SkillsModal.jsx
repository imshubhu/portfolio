// src/modals/SkillsModal.jsx
import { useState } from 'react';

const SkillsModal = () => {
  const [hovered, setHovered] = useState(null);

  const skills = [
    { name: 'React', color: '#61DAFB', icon: '⚛️' },
    { name: 'Next.js', color: '#000000', icon: '▲' },
    { name: 'Angular', color: '#DD0031', icon: '🅰️' },
    { name: 'Redux', color: '#764ABC', icon: 'Ⓡ' },
    { name: 'Node.js', color: '#68A063', icon: '🟢' },
    { name: 'NestJS', color: '#E0234E', icon: '🦅' },
    { name: 'Express.js', color: '#000000', icon: '⚡' },
    { name: 'MongoDB', color: '#47B84D', icon: '🍃' },
    { name: 'PostgreSQL', color: '#336791', icon: '🐘' },
    { name: 'MySQL', color: '#4479A1', icon: '🐬' },
    { name: 'Redis', color: '#DC382D', icon: '🔴' },
    { name: 'Docker', color: '#2496ED', icon: '🐳' },
    { name: 'AWS', color: '#FF9900', icon: '☁️' },
    { name: 'Firebase', color: '#FFCA28', icon: '🔥' },
    { name: 'CI/CD', color: '#007ACC', icon: '⚙️' },
    { name: 'Jest', color: '#C21325', icon: '🃏' },
    { name: 'WebSockets', color: '#000000', icon: '💬' },
    { name: 'MQTT', color: '#66BB6A', icon: '📡' },
    { name: 'RabbitMQ', color: '#FF6600', icon: '🐇' },
  ];

  return (
    <div>
      <h3 className="text-2xl font-bold text-cyan-300 !mb-1">🔧 Skill Rings</h3>
      <p className="text-gray-400 text-sm mb-5">Rotate the ring to scan a technology.</p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 overflow-auto h-[60vh]">
        {skills.map((skill) => (
          <div
            key={skill.name}
            className={`relative overflow-hidden !p-3 rounded border transition-all cursor-pointer select-none h-20 md:h-fit`}
            onMouseEnter={() => setHovered(skill.name)}
            onMouseLeave={() => setHovered(null)}
            onTouchStart={() => setHovered(skill.name)}
            onTouchEnd={() => setHovered(null)}
            style={{
              backgroundColor: hovered === skill.name ? skill.color : 'transparent',
            }}
          >
            {hovered === skill.name && (
              <div className="absolute inset-0 bg-black/20 pointer-events-none" />
            )}
            <div className="flex items-center justify-center !mb-2 h-16">
              <span
                className="transition-all duration-300 ease-out"
                style={{
                  fontSize: hovered === skill.name ? '2.25rem' : '1.25rem',
                  transform: hovered === skill.name ? 'scale(1.15)' : 'scale(1)',
                }}
              >
                {skill.icon}
              </span>
            </div>
            <div
              className={`text-center transition-opacity duration-200 ${
                hovered === skill.name ? 'opacity-0' : 'opacity-100'
              }`}
            >
              <strong>{skill.name}</strong>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillsModal;