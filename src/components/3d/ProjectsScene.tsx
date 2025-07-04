
import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, Box, Float } from '@react-three/drei';
import { Group, Mesh } from 'three';
import * as THREE from 'three';

const ProjectGlobe = () => {
  const globeRef = useRef<Mesh>(null);
  const pointsRef = useRef<Group>(null);

  useFrame((state) => {
    if (globeRef.current) {
      globeRef.current.rotation.y += 0.005;
    }
    if (pointsRef.current) {
      pointsRef.current.rotation.y += 0.003;
    }
  });

  const projectPoints = [
    { pos: [2, 1, 1], color: "#ff6b6b" },
    { pos: [-2, 0.5, 1.5], color: "#4ecdc4" },
    { pos: [1, -1.5, 1.8], color: "#ffe66d" },
    { pos: [-1.5, 2, 0.5], color: "#ff8b94" },
    { pos: [0, -2, -1.5], color: "#95e1d3" },
  ];

  return (
    <Float speed={1} rotationIntensity={0.5} floatIntensity={2}>
      <group>
        <Sphere ref={globeRef} args={[2, 32, 32]}>
          <meshStandardMaterial
            color="#1a1a2e"
            transparent
            opacity={0.1}
            wireframe
          />
        </Sphere>
        
        <group ref={pointsRef}>
          {projectPoints.map((point, index) => (
            <Box
              key={index}
              position={point.pos as [number, number, number]}
              args={[0.1, 0.1, 0.1]}
            >
              <meshStandardMaterial
                color={point.color}
                emissive={point.color}
                emissiveIntensity={0.5}
              />
            </Box>
          ))}
        </group>
      </group>
    </Float>
  );
};

const FloatingProjects = () => {
  return (
    <>
      {Array.from({ length: 6 }).map((_, index) => (
        <Float
          key={index}
          speed={1 + index * 0.2}
          rotationIntensity={1}
          floatIntensity={2}
        >
          <Box
            position={[
              (Math.random() - 0.5) * 12,
              (Math.random() - 0.5) * 8,
              (Math.random() - 0.5) * 8
            ]}
            args={[0.5, 0.8, 0.1]}
          >
            <meshStandardMaterial
              color={`hsl(${index * 60}, 70%, 60%)`}
              emissive={`hsl(${index * 60}, 70%, 20%)`}
            />
          </Box>
        </Float>
      ))}
    </>
  );
};

const ProjectsScene = () => {
  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#ffffff" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ff6b6b" />
      
      <ProjectGlobe />
      <FloatingProjects />
    </>
  );
};

export default ProjectsScene;
