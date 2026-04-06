import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Environment, Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

export default function Scene3D({ scrollYProgress }) {
  const torusRef = useRef();
  const icosahedronRef = useRef();
  const orbsGroupRef = useRef();
  const starfieldRef = useRef();
  const nebulaRef = useRef();
  const gridRef = useRef();
  const debrisRef = useRef();

  // Generate Starfield (Layer 2)
  const starCount = window.innerWidth < 768 ? 200 : 600;
  const starPositions = useMemo(() => {
    const positions = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 150; // x
      positions[i * 3 + 1] = (Math.random() - 0.5) * 150; // y
      positions[i * 3 + 2] = -50 - Math.random() * 50; // z (-50 to -100)
    }
    return positions;
  }, [starCount]);

  const starSizes = useMemo(() => {
    const sizes = new Float32Array(starCount);
    for (let i = 0; i < starCount; i++) {
      sizes[i] = Math.random() * 1.5 + 0.5;
    }
    return sizes;
  }, [starCount]);

  // Generate Debris (Layer 6)
  const debrisCount = window.innerWidth < 768 ? 10 : 25;
  const debrisMeshes = useMemo(() => {
    const meshes = [];
    const colors = ['#ff00aa', '#b000ff', '#00f3ff'];
    const geometries = [
      new THREE.BoxGeometry(0.5, 0.5, 0.5),
      new THREE.TetrahedronGeometry(0.5),
      new THREE.IcosahedronGeometry(0.4, 0)
    ];

    for (let i = 0; i < debrisCount; i++) {
      meshes.push({
        position: [
          (Math.random() - 0.5) * 40,
          (Math.random() - 0.5) * 40,
          (Math.random() - 0.5) * 20 + 10 // z: 0 to 20
        ],
        rotation: [Math.random() * Math.PI, Math.random() * Math.PI, 0],
        speed: (Math.random() * 0.02) + 0.005,
        geometry: geometries[Math.floor(Math.random() * geometries.length)],
        color: colors[Math.floor(Math.random() * colors.length)],
        isWireframe: Math.random() > 0.5,
        phase: Math.random() * Math.PI * 2
      });
    }
    return meshes;
  }, [debrisCount]);

  useFrame((state, delta) => {
    // Scroll progress from framer-motion (0 to 1)
    const progress = scrollYProgress ? scrollYProgress.get() : 0;
    
    // Parallax Camera mapping based on scroll
    // 0%: (0, 2, 12) looking at (0,0,0)
    // 50%: (3, 1, 14) looking at (-1, 0, 0)
    // 100%: (0, 4, 16) looking at (0, 1, 0)
    if (progress <= 0.5) {
      const t = progress * 2;
      state.camera.position.set(
        THREE.MathUtils.lerp(0, 3, t),
        THREE.MathUtils.lerp(2, 1, t),
        THREE.MathUtils.lerp(12, 14, t)
      );
      state.camera.lookAt(THREE.MathUtils.lerp(0, -1, t), 0, 0);
    } else {
      const t = (progress - 0.5) * 2;
      state.camera.position.set(
        THREE.MathUtils.lerp(3, 0, t),
        THREE.MathUtils.lerp(1, 4, t),
        THREE.MathUtils.lerp(14, 16, t)
      );
      state.camera.lookAt(THREE.MathUtils.lerp(-1, 0, t), THREE.MathUtils.lerp(0, 1, t), 0);
    }

    // Dynamic rotation speed
    const baseSpeed = 0.002;
    const dynamicSpeed = baseSpeed + (progress * 0.015);

    // Core objects rotation
    if (torusRef.current) {
      torusRef.current.rotation.x += dynamicSpeed;
      torusRef.current.rotation.y += dynamicSpeed;
    }

    if (icosahedronRef.current) {
      icosahedronRef.current.rotation.x -= dynamicSpeed * 1.5;
      icosahedronRef.current.rotation.y -= dynamicSpeed * 1.5;
      icosahedronRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.5;
    }

    if (orbsGroupRef.current) {
      orbsGroupRef.current.rotation.y += dynamicSpeed * 0.8;
    }

    // Starfield drift and twinkle
    if (starfieldRef.current) {
      starfieldRef.current.rotation.y -= dynamicSpeed * 0.1;
      starfieldRef.current.position.y = progress * 10; // Pan upward
      
      const time = state.clock.elapsedTime;
      starfieldRef.current.material.opacity = 0.8 + Math.sin(time * 2) * 0.2;
    }

    // Nebula morph
    if (nebulaRef.current) {
      nebulaRef.current.rotation.z += 0.001;
      nebulaRef.current.children.forEach((cloud, i) => {
        cloud.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 0.5 + i) * 0.1);
      });
    }

    // Grid floor pulse and parallax
    if (gridRef.current) {
      gridRef.current.position.y = -5 - (progress * 5); // Parallax sink down
      const pulse = (Math.sin(state.clock.elapsedTime * 2) + 1) / 2; // 0 to 1
      gridRef.current.material.opacity = 0.3 + (pulse * 0.3);
    }

    // Floating Debris
    if (debrisRef.current) {
      debrisRef.current.children.forEach((mesh, i) => {
        const d = debrisMeshes[i];
        mesh.rotation.x += d.speed;
        mesh.rotation.y += d.speed;
        mesh.position.y = d.position[1] + Math.sin(state.clock.elapsedTime + d.phase) * 2;
      });
    }
  });

  return (
    <>
      <Environment preset="city" />
      <ambientLight intensity={0.2} />
      <directionalLight position={[10, 10, 5]} intensity={1} color="#ffffff" />
      <fog attach="fog" args={['#050010', 10, 80]} />

      {/* Layer 2: Starfield */}
      <Points ref={starfieldRef} positions={starPositions} stride={3} frustumCulled={false}>
        <PointMaterial 
          transparent 
          color="#aaccff" 
          size={1} 
          sizeAttenuation={true} 
          depthWrite={false} 
          opacity={0.8}
        />
      </Points>

      {/* Layer 3: Nebula Clouds */}
      <group ref={nebulaRef} position={[0, 0, -40]}>
        <mesh position={[-15, 10, 0]}>
          <sphereGeometry args={[20, 32, 32]} />
          <meshBasicMaterial color="#7000ff" transparent opacity={0.15} depthWrite={false} blending={THREE.AdditiveBlending} />
        </mesh>
        <mesh position={[10, -5, 5]}>
          <sphereGeometry args={[25, 32, 32]} />
          <meshBasicMaterial color="#ff00aa" transparent opacity={0.12} depthWrite={false} blending={THREE.AdditiveBlending} />
        </mesh>
        <mesh position={[0, 15, -10]}>
          <sphereGeometry args={[18, 32, 32]} />
          <meshBasicMaterial color="#00f3ff" transparent opacity={0.1} depthWrite={false} blending={THREE.AdditiveBlending} />
        </mesh>
      </group>

      {/* Layer 4: Digital Grid Floor */}
      <gridHelper 
        ref={gridRef}
        args={[100, 40, '#00f3ff', '#00f3ff']} 
        position={[0, -5, -20]} 
      />

      {/* Layer 5: Main Core Objects */}
      <group position={[0, 0, 0]}>
        <mesh ref={torusRef}>
          <torusKnotGeometry args={[1.5, 0.4, 128, 32]} />
          <meshStandardMaterial 
            color="#00f3ff" 
            wireframe 
            emissive="#00f3ff"
            emissiveIntensity={1}
            transparent
            opacity={0.8}
          />
        </mesh>

        <mesh ref={icosahedronRef}>
          <icosahedronGeometry args={[0.8, 0]} />
          <meshStandardMaterial 
            color="#b000ff" 
            emissive="#b000ff"
            emissiveIntensity={1.5}
            wireframe={false}
          />
          <pointLight color="#b000ff" intensity={3} distance={15} />
        </mesh>

        <group ref={orbsGroupRef}>
          {[0, Math.PI / 2, Math.PI, (Math.PI * 3) / 2].map((angle, index) => {
            const radius = 3.5;
            return (
              <mesh key={index} position={[Math.cos(angle) * radius, 0, Math.sin(angle) * radius]}>
                <sphereGeometry args={[0.2, 32, 32]} />
                <meshStandardMaterial color="#ff00aa" emissive="#ff00aa" emissiveIntensity={1.5} />
              </mesh>
            );
          })}
        </group>
      </group>

      {/* Layer 6: Floating Debris */}
      <group ref={debrisRef}>
        {debrisMeshes.map((d, i) => (
          <mesh key={i} position={d.position} geometry={d.geometry}>
            <meshStandardMaterial 
              color={d.color}
              emissive={d.isWireframe ? d.color : '#000000'}
              emissiveIntensity={d.isWireframe ? 1 : 0}
              wireframe={d.isWireframe}
            />
          </mesh>
        ))}
      </group>
    </>
  );
}
