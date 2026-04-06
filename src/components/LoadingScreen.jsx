import { useProgress } from '@react-three/drei';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoadingScreen() {
  const { progress, active } = useProgress();
  const [show, setShow] = useState(true);
  const [displayProgress, setDisplayProgress] = useState(0);

  useEffect(() => {
    // Smooth progress simulation that guarantees reaching 100
    const targetProgress = !active && progress === 100 ? 100 : Math.max(progress, 15);
    
    // Smooth interpolation
    const interval = setInterval(() => {
      setDisplayProgress(prev => {
        if (prev >= targetProgress) return targetProgress;
        return prev + 1;
      });
    }, 20);

    return () => clearInterval(interval);
  }, [progress, active]);

  useEffect(() => {
    let timeout;
    // Enforce minimum display time and wait for 100%
    if (!active && displayProgress >= 100) {
      timeout = setTimeout(() => setShow(false), 1500); // Minimum 1.5s after 100%
    }
    return () => clearTimeout(timeout);
  }, [active, displayProgress]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div 
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#050010] scanlines"
        >
          <div className="text-center z-10 flex flex-col items-center">
            <div className="spinner mb-8"></div>
            
            <h2 className="glitch-text text-4xl font-bold mb-4 tracking-widest text-shadow-[0_0_15px_#00f3ff]">
              INITIALIZING_
            </h2>
            
            <div className="w-80 h-2 bg-dark-surface rounded-full overflow-hidden border border-neon-blue/30 relative shadow-[0_0_10px_#00f3ff]">
              <motion.div 
                className="absolute top-0 left-0 h-full bg-neon-blue shadow-[0_0_15px_#00f3ff]"
                style={{ width: `${displayProgress}%` }}
                layout
              />
            </div>
            
            <p className="mt-6 text-neon-blue font-mono uppercase tracking-[0.3em]">
              {Math.floor(displayProgress)}% SYSTEM LOADED
            </p>
          </div>
          
          <div className="vignette"></div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
