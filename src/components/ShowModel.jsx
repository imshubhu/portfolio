function ShowModel({ selected }) {
    return (
        <>
            {/* About */}
            {selected === 'about' && (
                <div className="space-y-3 text-gray-700">
                    <p className="text-lg font-medium">
                        👋 Hi, I'm <span className="font-bold text-blue-600">Shubham Lohar</span>
                    </p>
                    <p>
                        Full Stack Developer with <strong>5+ years</strong> of experience building scalable,
                        high-performance applications using <span className="font-semibold">React, Angular,
                            Next.js, Node.js, and NestJS</span>. Passionate about problem-solving, clean code,
                        and delivering impactful products.
                    </p>
                </div>
            )}

            {/* Projects */}
            {selected === 'projects' && (
                <div className="grid gap-4 md:grid-cols-2">
                    {[
                        { name: "Rivio", desc: "Monitoring & automation platform for real-time data tracking." },
                        { name: "Iot-Pot (SaaS)", desc: "IoT real-time analytics & alert system (Next.js, NestJS, Postgres, MQTT, RabbitMQ)." },
                        { name: "StackOS", desc: "Decentralized cloud platform for deploying apps & blockchain nodes." },
                        { name: "Manifest E", desc: "Event creation platform with timezone support & poster generation." },
                        { name: "Monotype Freelance", desc: "Improved logging microservices & integrated Adobe Analytics." },
                    ].map((p, i) => (
                        <div key={i} className="p-4 border rounded-2xl shadow hover:shadow-lg transition">
                            <h3 className="font-bold text-blue-600 text-lg">{p.name}</h3>
                            <p className="text-sm text-gray-600 mt-1">{p.desc}</p>
                        </div>
                    ))}
                </div>
            )}

            {/* Skills */}
            {selected === 'skills' && (
                <div className="flex flex-wrap gap-3">
                    {[
                        "React", "Next.js", "Angular", "Redux", "Node.js", "NestJS", "Express.js",
                        "MongoDB", "PostgreSQL", "MySQL", "Redis", "Docker", "AWS",
                        "Firebase", "CI/CD", "Jest", "WebSockets", "MQTT", "RabbitMQ"
                    ].map((skill, i) => (
                        <span
                            key={i}
                            className="px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-700 font-medium shadow-sm"
                        >
                            {skill}
                        </span>
                    ))}
                </div>
            )}

            {/* Experience */}
            {selected === 'experience' && (
                <div className="space-y-4">
                    <div className="p-4 border-l-4 border-blue-500 bg-blue-50 rounded">
                        <h4 className="font-bold text-gray-800">Sr. Full Stack Developer – Implies Solution</h4>
                        <p className="text-sm text-gray-600">Oct 2023 – Present | Surat</p>
                        <ul className="list-disc list-inside text-gray-700 mt-2 space-y-1">
                            <li>Built IoT pipelines with Next.js, NestJS, Redis & RabbitMQ.</li>
                            <li>Optimized product performance, reduced server load with caching.</li>
                            <li>Mentored juniors and led code reviews.</li>
                        </ul>
                    </div>

                    <div className="p-4 border-l-4 border-green-500 bg-green-50 rounded">
                        <h4 className="font-bold text-gray-800">Full Stack Developer – DayDreamSoft Infotech LLP</h4>
                        <p className="text-sm text-gray-600">Oct 2020 – Oct 2023 | Surat</p>
                        <ul className="list-disc list-inside text-gray-700 mt-2 space-y-1">
                            <li>Developed full-stack apps using MERN/MEAN stack.</li>
                            <li>Modernized legacy codebases, improving performance by 30%.</li>
                            <li>Deployed apps using Docker and optimized APIs.</li>
                        </ul>
                    </div>
                </div>
            )}

            {/* Resume */}
            {selected === 'resume' && (
                <div className="text-center">
                    <a
                        href="/Shubham_Lohar_Resume.pdf"
                        className="px-5 py-2 bg-blue-600 text-white font-medium rounded-lg shadow hover:bg-blue-700 transition"
                        download
                    >
                        📄 Download Resume
                    </a>
                </div>
            )}

        </>
    )
}

export default ShowModel;