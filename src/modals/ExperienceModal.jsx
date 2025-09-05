// src/modals/ExperienceModal.jsx
const ExperienceModal = () => {
    const jobs = [
      {
        company: 'Implies Solution | Surat',
        role: 'Sr. Full Stack Developer',
        period: 'Oct 2023 – Present',
        logo: '🌌',
        desc: [
            'Built IoT pipelines with Next.js, NestJS, Redis & RabbitMQ.',
            'Optimized product performance, reduced server load with caching.',
            'Mentored juniors and led code reviews.',
        ],
      },
      {
        company: 'DayDreamSoft Infotech LLP | Surat',
        role: 'Full Stack Developer',
        period: 'Oct 2020 – Oct 2023',
        logo: '🚀',
        desc: [
            'Developed full-stack apps using MERN/MEAN stack.',
            'Modernized legacy codebases, improving performance by 30%.',
            'Deployed apps using Docker and optimized APIs.',
        ],
      },
    ];
  
    return (
      <div>
        <h3 className="text-2xl font-bold text-cyan-300 mb-1">🌠 Experience Nebula</h3>
        <p className="text-gray-400 text-sm !mb-5">Navigate the star clusters of my career.</p>
  
        <div className="space-y-5">
          {jobs.map((job, i) => (
            <div key={i} className=" border-cyan-500 !pl-5 relative !mb-4">
              {/* <div className="absolute -left-2 top-0 w-4 h-4 bg-cyan-400 rounded-full animate-pulse"></div> */}
              <div className="flex items-center gap-2 !mb-1">
                <span className="text-2xl">{job.logo}</span>
                <h4 className="font-bold text-lg">{job.company}</h4>
              </div>
              <p className="text-cyan-300">{job.role}</p>
              <p className="text-sm text-gray-400">{job.period}</p>
              <ul>
                {
                    job.desc.map((d, key) => (
                        <div className="flex items-center gap-1">
                            <div className="h-2.5 w-2.5 bg-cyan-400 rounded-full animate-pulse"></div>
                            <li className="text-gray-300 mt-2 text-sm" key={i-key}>{d}</li>
                        </div>
                    ))
                }
              </ul>
              {/* <p className="text-gray-300 mt-2 text-sm">{job.desc}</p> */}
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default ExperienceModal;