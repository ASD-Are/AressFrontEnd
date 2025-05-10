// SnakeModel.jsx
import React, { Suspense, useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

function Snake() {
  const ref = useRef();
  const mixerRef = useRef();
  const { scene, animations } = useGLTF('/snake.glb');
  const [animationPlayed, setAnimationPlayed] = useState(false);

  // Setup mixer + animation
  useEffect(() => {
    if (ref.current && animations.length) {
      mixerRef.current = new THREE.AnimationMixer(ref.current);
      const action = mixerRef.current.clipAction(animations[0]);
      action.setLoop(THREE.LoopOnce); // ✅ Play once only
      action.clampWhenFinished = true; // ✅ Hold last frame
      action.play();

      // Detect when animation finishes
      action.paused = false;
      action.enabled = true;
      mixerRef.current.addEventListener('finished', () => {
        setAnimationPlayed(true); // ✅ Stop movement too
      });

      scene.traverse((child) => {
        if (child.isMesh) {
          child.material.color = new THREE.Color(0xcccccc); // soft light gray
          child.material.emissive = new THREE.Color(0x333333); // subtle glow
          child.material.emissiveIntensity = 0.3;
        }
      });
    }
  }, [animations]);

  // Animate position until finished
  useFrame((state, delta) => {
    mixerRef.current?.update(delta);
    if (!animationPlayed && ref.current) {
      // Move snake diagonally up-left
      ref.current.position.x -= 0.015; // move left
      ref.current.position.y -= 0.015; // move down

      // Optionally: stop after moving a bit manually (safety stop)
      if (ref.current.position.y > 4) {
        setAnimationPlayed(true);
      }
    }
  });

  return (
    <primitive
    ref={ref}
    object={scene}
    scale={1}
    position={[5, 5, -6]} // top-right
    rotation={[0.5, -Math.PI / 2.5, 0.2]} // slightly rotated
  />
  );
}

const SnakeModel = () => {
  return (
    <Canvas Canvas className="snake-canvas" style={{ height: 1000, width: 1000 }}>
      <ambientLight intensity={1} />
      <directionalLight position={[9, 9, 9]} />
      <Suspense fallback={null}>
        <Snake />
      </Suspense>
    </Canvas>
  );
};

export default SnakeModel;