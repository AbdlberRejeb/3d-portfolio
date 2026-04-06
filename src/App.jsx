import { Suspense, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { motion, useScroll, useSpring } from 'framer-motion';
import Scene3D from './components/Scene3D';
import LoadingScreen from './components/LoadingScreen';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';

function CheckWebGLFallback() {
  useEffect(() => {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (!gl) {
      alert("WebGL is not supported in your browser. The 3D experience will not render.");
    }
  }, []);
  return null;
}

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="w-full min-h-screen text-white relative font-sans">
      <CheckWebGLFallback />
      
      {/* Background and Overlays */}
      <div className="space-gradient"></div>
      <div className="lens-flare"></div>
      <div className="vignette"></div>
      <div className="scanlines"></div>
      
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-neon-blue origin-left z-50 shadow-[0_0_15px_#00f3ff]"
        style={{ scaleX }}
      />
      
      <Suspense fallback={<LoadingScreen />}>
        {/* Fixed Navbar on top of everything */}
        <Navbar />

        {/* Fixed 3D Canvas bridging background and scroll logic */}
        <div className="fixed inset-0 z-[-10] pointer-events-auto">
          <Canvas 
            camera={{ position: [0, 2, 12], fov: 50 }}
            dpr={[1, 2]}
            gl={{ alpha: true, antialias: true }}
          >
            <Scene3D scrollYProgress={scrollYProgress} />
          </Canvas>
        </div>

        {/* DOM Overlay synchronized via native layout */}
        <div className="relative z-10 w-full flex flex-col pointer-events-auto">
          <Hero />
          <About />
          <Projects />
          <Skills />
          <Contact />
        </div>
      </Suspense>
    </div>
  );
}
