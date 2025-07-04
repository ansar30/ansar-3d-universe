
import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, Stars, Text3D, Float } from '@react-three/drei';
import { Mesh, BufferGeometry, Material } from 'three';
import * as THREE from 'three';

const ParticleField = () => {
  const mesh = useRef<Mesh<BufferGeometry, Material>>(null);
  const light = useRef<THREE.PointLight>(null);

  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < 2000; i++) {
      temp.push({
        position: [
          (Math.random() - 0.5) * 50,
          (Math.random() - 0.5) * 50,
          (Math.random() - 0.5) * 50
        ],
        scale: Math.random() * 0.5 + 0.1
      });
    }
    return temp;
  }, []);

  useFrame((state, delta) => {
    if (mesh.current) {
      mesh.current.rotation.x += delta * 0.1;
      mesh.current.rotation.y += delta * 0.05;
    }
    if (light.current) {
      light.current.intensity = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.5;
    }
  });

  return (
    <>
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      
      <pointLight ref={light} position={[0, 0, 0]} color="#00ffff" intensity={1} />
      
      <Float speed={2} rotationIntensity={1} floatIntensity={2}>
        <mesh ref={mesh}>
          <sphereGeometry args={[8, 32, 32]} />
          <meshStandardMaterial
            color="#1a1a2e"
            transparent
            opacity={0.3}
            wireframe
          />
        </mesh>
      </Float>

      {particles.map((particle, index) => (
        <Float key={index} speed={1 + Math.random()} rotationIntensity={0.5}>
          <mesh position={particle.position as [number, number, number]} scale={particle.scale}>
            <sphereGeometry args={[0.1, 8, 8]} />
            <meshStandardMaterial
              color={index % 3 === 0 ? "#00ffff" : index % 3 === 1 ? "#ff00ff" : "#ffff00"}
              emissive={index % 3 === 0 ? "#003333" : index % 3 === 1 ? "#330033" : "#333300"}
            />
          </mesh>
        </Float>
      ))}
    </>
  );
};

const HeroScene = () => {
  return (
    <>
      <ParticleField />
      <ambientLight intensity={0.3} />
      <directionalLight position={[10, 10, 5]} intensity={1} color="#ffffff" />
    </>
  );
};

export default HeroScene;
