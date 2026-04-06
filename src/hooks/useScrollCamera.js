import { useScroll } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';

export function useScrollCamera() {
  const scroll = useScroll();
  const cameraTarget = useRef(new THREE.Vector3(0, 0, 0));
  const cameraPosition = useRef(new THREE.Vector3(0, 0, 10));

  useFrame((state, delta) => {
    if (!scroll) return;

    const offset = scroll.offset; // 0 to 1

    // Camera paths based on scroll position
    // Scroll 0%: position (0, 0, 10), looking at (0, 0, 0)
    // Scroll 50%: position (2, 1, 12), looking at (0, 0, 0)
    // Scroll 100%: position (0, 3, 14), looking at (0, 1, 0)

    if (offset < 0.5) {
      // Interpolate from 0 to 0.5 -> mapped to 0 to 1
      const t = offset * 2;
      cameraPosition.current.lerpVectors(
        new THREE.Vector3(0, 0, 10),
        new THREE.Vector3(2, 1, 12),
        t
      );
      cameraTarget.current.lerpVectors(
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(0, 0, 0),
        t
      );
    } else {
      // Interpolate from 0.5 to 1.0 -> mapped to 0 to 1
      const t = (offset - 0.5) * 2;
      cameraPosition.current.lerpVectors(
        new THREE.Vector3(2, 1, 12),
        new THREE.Vector3(0, 3, 14),
        t
      );
      cameraTarget.current.lerpVectors(
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(0, 1, 0),
        t
      );
    }

    // Apply damping for smooth transition
    state.camera.position.lerp(cameraPosition.current, 0.05);
    state.camera.lookAt(cameraTarget.current);
  });

  return null;
}
