
import React from 'react';
import { motion, MotionValue } from 'framer-motion';

interface ScrollIndicatorProps {
  progress: MotionValue<number>;
}

const ScrollIndicator: React.FC<ScrollIndicatorProps> = ({ progress }) => {
  return (
    <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-50">
      <div className="w-1 h-32 bg-gray-800 rounded-full relative">
        <motion.div
          className="w-full bg-gradient-to-b from-cyan-500 to-purple-500 rounded-full origin-top"
          style={{ scaleY: progress }}
        />
      </div>
      <div className="mt-4 text-center">
        <div className="w-6 h-6 border-2 border-cyan-500 rounded-full flex items-center justify-center">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1 h-2 bg-cyan-500 rounded-full"
          />
        </div>
      </div>
    </div>
  );
};

export default ScrollIndicator;
