
import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Box, Text, Float } from '@react-three/drei';
import { Group } from 'three';

const CodeBlock = ({ position, rotation }: {
  position: [number, number, number];
  rotation?: [number, number, number];
}) => {
  const groupRef = useRef<Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.005;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
      <group ref={groupRef} position={position} rotation={rotation}>
        {/* Code blocks */}
        {Array.from({ length: 8 }).map((_, i) => (
          <Box
            key={i}
            position={[0, i * 0.3 - 1.2, 0]}
            args={[3, 0.2, 0.1]}
          >
            <meshStandardMaterial
              color={i % 2 === 0 ? "#00ff41" : "#0066cc"}
              emissive={i % 2 === 0 ? "#003311" : "#001133"}
              transparent
              opacity={0.8}
            />
          </Box>
        ))}
      </group>
    </Float>
  );
};

const DataFlow = () => {
  const particlesRef = useRef<Group>(null);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.children.forEach((child, index) => {
        child.position.x = Math.sin(state.clock.elapsedTime + index) * 3;
        child.position.z = Math.cos(state.clock.elapsedTime + index) * 3;
      });
    }
  });

  return (
    <group ref={particlesRef}>
      {Array.from({ length: 20 }).map((_, i) => (
        <Box key={i} position={[0, 0, 0]} args={[0.1, 0.1, 0.1]}>
          <meshStandardMaterial
            color="#ff6b6b"
            emissive="#330000"
          />
        </Box>
      ))}
    </group>
  );
};

const ExperienceScene = () => {
  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]} intensity={1} color="#00ff41" />
      <pointLight position={[-5, -5, -5]} intensity={0.5} color="#ff6b6b" />
      
      <CodeBlock position={[-3, 0, 0]} />
      <CodeBlock position={[3, 0, 0]} rotation={[0, Math.PI, 0]} />
      
      <DataFlow />
      
      <Float speed={3} rotationIntensity={2} floatIntensity={1}>
        <Text
          position={[0, 3, 0]}
          fontSize={0.5}
          color="#00ff41"
          anchorX="center"
          anchorY="middle"
        >
          Full Stack Development
        </Text>
      </Float>
    </>
  );
};

export default ExperienceScene;
