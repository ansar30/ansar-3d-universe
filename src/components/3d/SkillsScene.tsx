
import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Box, Sphere, Float } from '@react-three/drei';
import { Mesh } from 'three';
import * as THREE from 'three';

const SkillOrb = ({ position, color, label, size = 1 }: {
  position: [number, number, number];
  color: string;
  label: string;
  size?: number;
}) => {
  const meshRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005;
      meshRef.current.position.y += Math.sin(state.clock.elapsedTime + position[0]) * 0.01;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={0.5}>
      <group position={position}>
        <Sphere ref={meshRef} args={[size, 32, 32]}>
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={0.2}
            transparent
            opacity={0.8}
          />
        </Sphere>
        <Text
          position={[0, -size - 0.5, 0]}
          fontSize={0.3}
          color="white"
          anchorX="center"
          anchorY="middle"
        >
          {label}
        </Text>
      </group>
    </Float>
  );
};

const ConnectionLine = ({ start, end }: {
  start: [number, number, number];
  end: [number, number, number];
}) => {
  const lineRef = useRef<THREE.Line>(null);

  const points = useMemo(() => {
    return [new THREE.Vector3(...start), new THREE.Vector3(...end)];
  }, [start, end]);

  useFrame((state) => {
    if (lineRef.current) {
      const material = lineRef.current.material as THREE.LineBasicMaterial;
      material.opacity = 0.3 + Math.sin(state.clock.elapsedTime) * 0.2;
    }
  });

  return (
    <line ref={lineRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={points.length}
          array={new Float32Array(points.flatMap(p => [p.x, p.y, p.z]))}
          itemSize={3}
        />
      </bufferGeometry>
      <lineBasicMaterial color="#00ffff" transparent opacity={0.5} />
    </line>
  );
};

const SkillsScene = () => {
  const skills = [
    { pos: [-4, 2, 0] as [number, number, number], color: "#61dafb", label: "React", size: 1.2 },
    { pos: [4, 2, 0] as [number, number, number], color: "#68d391", label: "Node.js", size: 1.1 },
    { pos: [0, 4, 0] as [number, number, number], color: "#f56565", label: "MongoDB", size: 1 },
    { pos: [-2, -2, 2] as [number, number, number], color: "#9f7aea", label: "TypeScript", size: 0.9 },
    { pos: [2, -2, 2] as [number, number, number], color: "#ed8936", label: "Express", size: 0.8 },
    { pos: [0, 0, -3] as [number, number, number], color: "#38b2ac", label: "CSS", size: 0.7 },
  ];

  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#00ffff" />
      
      {skills.map((skill, index) => (
        <SkillOrb
          key={skill.label}
          position={skill.pos}
          color={skill.color}
          label={skill.label}
          size={skill.size}
        />
      ))}

      {/* Connection lines between skills */}
      <ConnectionLine start={[-4, 2, 0]} end={[4, 2, 0]} />
      <ConnectionLine start={[0, 4, 0]} end={[0, 0, -3]} />
      <ConnectionLine start={[-4, 2, 0]} end={[0, 4, 0]} />
      <ConnectionLine start={[4, 2, 0]} end={[0, 4, 0]} />
    </>
  );
};

export default SkillsScene;
