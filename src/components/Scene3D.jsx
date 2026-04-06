import { useRef, useState, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Environment, Points, PointMaterial, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { useScrollCamera } from '../hooks/useScrollCamera';

export default function Scene3D() {
  const torusRef = useRef();
  const icosahedronRef = useRef();
  const orbsGroupRef = useRef();
  const particlesRef = useRef();
  
  const [hovered, setHovered] = useState(false);

  // useScrollCamera custom hook (needs to be inside ScrollControls)
  useScrollCamera();

  // Generate particles
  const particlesCount = window.innerWidth < 768 ? 200 : 500;
  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20; // x
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20; // y
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20; // z
    }
    return positions;
  }, [particlesCount]);

  useFrame((state, delta) => {
    // Subtle rotation animation
    const baseSpeed = 0.005;
    // Rotate faster if hovered
    const speed = hovered ? baseSpeed * 3 : baseSpeed;

    if (torusRef.current) {
      torusRef.current.rotation.x += speed;
      torusRef.current.rotation.y += speed;
    }

    if (icosahedronRef.current) {
      icosahedronRef.current.rotation.x -= speed * 1.5;
      icosahedronRef.current.rotation.y -= speed * 1.5;
      // Floating effect
      icosahedronRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.5;
    }

    if (orbsGroupRef.current) {
      orbsGroupRef.current.rotation.y += speed * 0.5;
    }

    if (particlesRef.current) {
      particlesRef.current.rotation.y -= speed * 0.2;
    }
  });

  const handlePointerOver = () => {
    document.body.style.cursor = 'pointer';
    setHovered(true);
  };

  const handlePointerOut = () => {
    document.body.style.cursor = 'auto';
    setHovered(false);
  };

  const handleClick = (name) => {
    console.log(`[Scene log] Clicked 3D object: ${name}`);
  };

  return (
    <>
      <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
      <Environment preset="city" />

      {/* Main Lighting */}
      <ambientLight intensity={0.2} />
      <directionalLight position={[10, 10, 5]} intensity={1} color="#ffffff" />
      
      {/* Interactable Core Objects */}
      <group 
        onPointerOver={handlePointerOver} 
        onPointerOut={handlePointerOut}
      >
        {/* Torus Knot */}
        <mesh 
          ref={torusRef} 
          onClick={() => handleClick('TorusKnot')}
        >
          <torusKnotGeometry args={[1.5, 0.4, 128, 32]} />
          <meshStandardMaterial 
            color="#00f3ff" 
            wireframe 
            emissive="#00f3ff"
            emissiveIntensity={hovered ? 2 : 0.5}
            transparent
            opacity={0.8}
          />
        </mesh>

        {/* Inner Icosahedron */}
        <mesh 
          ref={icosahedronRef} 
          onClick={() => handleClick('Icosahedron')}
        >
          <icosahedronGeometry args={[0.8, 0]} />
          <meshStandardMaterial 
            color="#b000ff" 
            emissive="#b000ff"
            emissiveIntensity={hovered ? 2 : 0.8}
            wireframe={false}
          />
          {hovered && <pointLight color="#b000ff" intensity={5} distance={10} />}
        </mesh>
      </group>

      {/* Orbiting Orbs */}
      <group ref={orbsGroupRef}>
        {[0, Math.PI / 2, Math.PI, (Math.PI * 3) / 2].map((angle, index) => {
          const radius = 3.5;
          return (
            <mesh key={index} position={[Math.cos(angle) * radius, 0, Math.sin(angle) * radius]} onClick={() => handleClick(`Orb_${index}`)}>
              <sphereGeometry args={[0.2, 32, 32]} />
              <meshStandardMaterial color="#ff00aa" emissive="#ff00aa" emissiveIntensity={1.5} />
            </mesh>
          );
        })}
      </group>

      {/* Particle System */}
      <Points ref={particlesRef} positions={particlesPosition} stride={3} frustumCulled={false}>
        <PointMaterial 
          transparent 
          color="#00f3ff" 
          size={0.05} 
          sizeAttenuation={true} 
          depthWrite={false} 
        />
      </Points>

      {/* Abstract Wireframe Floor */}
      <mesh position={[0, -4, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[50, 50, 20, 20]} />
        <meshBasicMaterial color="#b000ff" wireframe transparent opacity={0.15} />
      </mesh>
    </>
  );
}
