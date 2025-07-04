
import React from 'react';
import { motion } from 'framer-motion';

interface NavigationProps {
  currentSection: number;
}

const Navigation: React.FC<NavigationProps> = ({ currentSection }) => {
  const sections = ['Hero', 'Skills', 'Experience', 'Projects'];

  const scrollToSection = (index: number) => {
    const element = document.querySelector(`section:nth-of-type(${index + 1})`);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="fixed top-8 left-1/2 transform -translate-x-1/2 z-50"
    >
      <div className="bg-black/20 backdrop-blur-md border border-gray-700/50 rounded-full px-6 py-3">
        <ul className="flex space-x-6">
          {sections.map((section, index) => (
            <li key={section}>
              <button
                onClick={() => scrollToSection(index)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  currentSection === index
                    ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/25'
                    : 'text-gray-400 hover:text-white hover:bg-white/10'
                }`}
              >
                {section}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </motion.nav>
  );
};

export default Navigation;
