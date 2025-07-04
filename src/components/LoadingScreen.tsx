
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const LoadingScreen = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black flex items-center justify-center z-50"
    >
      <div className="text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-32 h-32 mb-8 mx-auto relative"
        >
          <div className="absolute inset-0 border-4 border-cyan-500/30 rounded-full"></div>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 border-4 border-transparent border-t-cyan-500 rounded-full"
          ></motion.div>
          <div className="absolute inset-4 flex items-center justify-center">
            <span className="text-2xl">🚀</span>
          </div>
        </motion.div>
        
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-3xl font-bold text-white mb-4"
        >
          Initializing Portfolio
        </motion.h2>
        
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          className="w-64 h-2 bg-gray-800 rounded-full mx-auto mb-4 overflow-hidden"
        >
          <div className="h-full bg-gradient-to-r from-cyan-500 to-purple-500"></div>
        </motion.div>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-gray-400"
        >
          {progress}% Complete
        </motion.p>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;
