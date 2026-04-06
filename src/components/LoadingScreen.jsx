import { useProgress } from '@react-three/drei';
import { useEffect, useState } from 'react';

export default function LoadingScreen() {
  const { progress, active } = useProgress();
  const [show, setShow] = useState(true);

  useEffect(() => {
    let timeout;
    if (!active && progress === 100) {
      // Minimum display time logic could be handled here or outside, 
      // ensuring minimum time before fading out
      timeout = setTimeout(() => setShow(false), 1000);
    }
    return () => clearTimeout(timeout);
  }, [active, progress]);

  if (!show) return null;

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center bg-dark-bg transition-opacity duration-1000 ${!active && progress === 100 ? 'opacity-0' : 'opacity-100'}`}>
      <div className="text-center">
        <h2 className="glitch-text text-4xl font-bold mb-4">INITIALIZING_</h2>
        <div className="w-64 h-2 bg-dark-surface rounded-full overflow-hidden border border-neon-blue/30">
          <div 
            className="h-full bg-neon-blue shadow-[0_0_10px_#00f3ff] transition-all duration-300"
            style={{ width: `${Math.max(10, progress)}%` }}
          />
        </div>
        <p className="mt-4 text-neon-blue font-mono">{Math.floor(progress)}% SYSTEM LOADED</p>
      </div>
    </div>
  );
}
