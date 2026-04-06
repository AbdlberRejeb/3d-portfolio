import { Suspense, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { ScrollControls, Scroll } from '@react-three/drei';
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
  return (
    <div className="w-full h-screen bg-dark-bg text-white overflow-hidden scanlines relative font-sans">
      <CheckWebGLFallback />
      
      <Suspense fallback={<LoadingScreen />}>
        {/* Fixed Navbar on top of everything */}
        <Navbar />

        {/* 3D Canvas bridging background and scroll logic */}
        <Canvas 
          className="absolute inset-0 block pointer-events-auto"
          style={{ zIndex: 0 }}
          camera={{ position: [0, 0, 10], fov: 50 }}
          dpr={[1, 2]} // Optimize pixel ratio
        >
          {/* ScrollControls manages both 3D useScroll tracking and HTML scrolling overlay */}
          <ScrollControls pages={6} damping={0.2} distance={1}>
            
            {/* The 3D Scene which uses the useScroll camera hook */}
            <Scene3D />

            {/* DOM Overlay synchronized with ScrollControls */}
            <Scroll html style={{ width: '100vw' }}>
              <div className="flex flex-col">
                <Hero />
                <About />
                <Projects />
                <Skills />
                <Contact />
              </div>
            </Scroll>
            
          </ScrollControls>
        </Canvas>
      </Suspense>
    </div>
  );
}
