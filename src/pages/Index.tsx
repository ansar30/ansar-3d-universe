
import React, { Suspense, useRef, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { motion, useScroll, useTransform } from 'framer-motion';
import HeroScene from '../components/3d/HeroScene';
import SkillsScene from '../components/3d/SkillsScene';
import ExperienceScene from '../components/3d/ExperienceScene';
import ProjectsScene from '../components/3d/ProjectsScene';
import LoadingScreen from '../components/LoadingScreen';
import Navigation from '../components/Navigation';
import ScrollIndicator from '../components/ScrollIndicator';

const Index = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const [isLoading, setIsLoading] = useState(true);
  const [currentSection, setCurrentSection] = useState(0);

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [1, 0.8, 0.8, 0]);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange(value => {
      if (value < 0.25) setCurrentSection(0);
      else if (value < 0.5) setCurrentSection(1);
      else if (value < 0.75) setCurrentSection(2);
      else setCurrentSection(3);
    });
    return unsubscribe;
  }, [scrollYProgress]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div ref={containerRef} className="relative">
      <Navigation currentSection={currentSection} />
      <ScrollIndicator progress={scrollYProgress} />
      
      {/* Background Canvas */}
      <div className="fixed inset-0 z-0">
        <Canvas
          camera={{ position: [0, 0, 10], fov: 75 }}
          dpr={[1, 2]}
          gl={{ alpha: true, antialias: true }}
        >
          <Suspense fallback={null}>
            <ambientLight intensity={0.2} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            <pointLight position={[-10, -10, -10]} intensity={0.5} color="#00ffff" />
            
            {currentSection === 0 && <HeroScene />}
            {currentSection === 1 && <SkillsScene />}
            {currentSection === 2 && <ExperienceScene />}
            {currentSection === 3 && <ProjectsScene />}
          </Suspense>
        </Canvas>
      </div>

      {/* Content Sections */}
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-center"
          >
            <motion.h1 
              className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent"
              animate={{ 
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] 
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity, 
                ease: "linear" 
              }}
            >
              MOHAMMED THAMEEM ANSAR
            </motion.h1>
            <motion.p 
              className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1 }}
            >
              Full Stack Developer crafting the future through code, one pixel at a time
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.5 }}
            >
              <button className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full text-white font-semibold hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300">
                Explore Portfolio
              </button>
              <button className="px-8 py-3 border border-cyan-500 rounded-full text-cyan-400 font-semibold hover:bg-cyan-500/10 transition-all duration-300">
                Download CV
              </button>
            </motion.div>
          </motion.div>
        </section>

        {/* Skills Section */}
        <section className="min-h-screen flex items-center justify-center px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="max-w-6xl mx-auto"
          >
            <h2 className="text-5xl font-bold text-center mb-16 text-white">
              Technical <span className="text-cyan-400">Arsenal</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Frontend",
                  skills: ["React.js", "TypeScript", "Next.js", "Tailwind CSS", "Material UI"],
                  color: "from-blue-500 to-cyan-500"
                },
                {
                  title: "Backend",
                  skills: ["Node.js", "Express.js", "NestJS", "MongoDB", "MySQL"],
                  color: "from-green-500 to-emerald-500"
                },
                {
                  title: "Tools & Others",
                  skills: ["Vite", "Sequelize", "Knex", "Git", "Agile/Scrum"],
                  color: "from-purple-500 to-pink-500"
                }
              ].map((category, index) => (
                <motion.div
                  key={category.title}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  className="relative group"
                >
                  <div className={`absolute inset-0 bg-gradient-to-r ${category.color} rounded-xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-300`}></div>
                  <div className="relative bg-gray-900/80 backdrop-blur-sm border border-gray-700 rounded-xl p-6 hover:border-cyan-500/50 transition-all duration-300">
                    <h3 className="text-2xl font-bold mb-4 text-white">{category.title}</h3>
                    <ul className="space-y-2">
                      {category.skills.map((skill, skillIndex) => (
                        <motion.li
                          key={skill}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: skillIndex * 0.1 }}
                          className="text-gray-300 hover:text-cyan-400 transition-colors duration-200"
                        >
                          {skill}
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Experience Section */}
        <section className="min-h-screen flex items-center justify-center px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="max-w-6xl mx-auto"
          >
            <h2 className="text-5xl font-bold text-center mb-16 text-white">
              Professional <span className="text-cyan-400">Journey</span>
            </h2>
            <div className="space-y-12">
              {[
                {
                  title: "Software Engineer",
                  company: "Kaay Labs, Chennai",
                  period: "May 2023 - Present",
                  description: "Developed and maintained web applications using React.js, Node.js and MongoDB. Optimized application performance and reduced load times by 40%.",
                  achievements: ["React.js & Node.js development", "Cross-functional collaboration", "Performance optimization", "Code reviews"]
                },
                {
                  title: "System Engineer",
                  company: "TATA Consultancy Services (TCS), Chennai",
                  period: "Mar 2021 - Dec 2022",
                  description: "Collaborated with international clients from US and UK. Developed enterprise-level applications using Java, Spring Boot, and Oracle.",
                  achievements: ["International client collaboration", "Enterprise application development", "Production issue resolution", "Agile methodology"]
                }
              ].map((job, index) => (
                <motion.div
                  key={job.title}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  className="relative"
                >
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-cyan-500 to-purple-500"></div>
                  <div className={`flex ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
                    <div className="w-full md:w-1/2 bg-gray-900/80 backdrop-blur-sm border border-gray-700 rounded-xl p-6 hover:border-cyan-500/50 transition-all duration-300">
                      <h3 className="text-2xl font-bold text-white mb-2">{job.title}</h3>
                      <h4 className="text-lg text-cyan-400 mb-2">{job.company}</h4>
                      <p className="text-gray-400 mb-4">{job.period}</p>
                      <p className="text-gray-300 mb-4">{job.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {job.achievements.map((achievement, achIndex) => (
                          <span key={achIndex} className="px-3 py-1 bg-cyan-500/20 text-cyan-400 text-sm rounded-full">
                            {achievement}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Projects Section */}
        <section className="min-h-screen flex items-center justify-center px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="max-w-6xl mx-auto"
          >
            <h2 className="text-5xl font-bold text-center mb-16 text-white">
              Featured <span className="text-cyan-400">Projects</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((project, index) => (
                <motion.div
                  key={project}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className="group relative bg-gray-900/80 backdrop-blur-sm border border-gray-700 rounded-xl p-6 hover:border-cyan-500/50 transition-all duration-300 cursor-pointer"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative">
                    <div className="w-full h-40 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-lg mb-4 flex items-center justify-center">
                      <span className="text-4xl">🚀</span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Project {project}</h3>
                    <p className="text-gray-400 mb-4">Innovative full-stack solution built with modern technologies</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded">React</span>
                      <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded">Node.js</span>
                      <span className="px-2 py-1 bg-purple-500/20 text-purple-400 text-xs rounded">MongoDB</span>
                    </div>
                    <button className="w-full py-2 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg text-white font-semibold hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300">
                      View Project
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Contact Section */}
        <section className="min-h-screen flex items-center justify-center px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-5xl font-bold mb-8 text-white">
              Let's Build Something <span className="text-cyan-400">Amazing</span>
            </h2>
            <p className="text-xl text-gray-300 mb-12">
              Ready to transform your ideas into digital reality? Let's connect and create the future together.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <a
                href="mailto:your-email@example.com"
                className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full text-white font-semibold hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300"
              >
                Get In Touch
              </a>
              <div className="flex gap-4">
                <a href="#" className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center hover:bg-cyan-500/20 transition-colors duration-200">
                  <span className="text-cyan-400">💼</span>
                </a>
                <a href="#" className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center hover:bg-cyan-500/20 transition-colors duration-200">
                  <span className="text-cyan-400">📧</span>
                </a>
                <a href="#" className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center hover:bg-cyan-500/20 transition-colors duration-200">
                  <span className="text-cyan-400">📱</span>
                </a>
              </div>
            </div>
          </motion.div>
        </section>
      </div>

      {/* Gradient Overlays */}
      <div className="fixed inset-0 pointer-events-none z-5">
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-transparent to-purple-500/5"></div>
      </div>
    </div>
  );
};

export default Index;
