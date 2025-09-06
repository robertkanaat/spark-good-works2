import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Box, Sphere, Cylinder } from '@react-three/drei';
import * as THREE from 'three';
import type { GameState } from './RecoveryGame';

interface GameSceneProps {
  gameState: GameState;
  onChallengeComplete: (challenge: string, points: number) => void;
  onToolCollect: (tool: string) => void;
}

const FloatingChallenge: React.FC<{
  position: [number, number, number];
  color: string;
  label: string;
  onClick: () => void;
}> = ({ position, color, label, onClick }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.2;
    }
  });

  return (
    <group position={position}>
      <Box
        ref={meshRef}
        args={[1, 1, 1]}
        onClick={onClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        scale={hovered ? 1.2 : 1}
      >
        <meshStandardMaterial color={hovered ? '#60a5fa' : color} />
      </Box>
      <Text
        position={[0, 1.5, 0]}
        fontSize={0.3}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
      >
        {label}
      </Text>
    </group>
  );
};

const RecoveryTool: React.FC<{
  position: [number, number, number];
  tool: string;
  onClick: () => void;
}> = ({ position, tool, onClick }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [collected, setCollected] = useState(false);

  useFrame((state) => {
    if (meshRef.current && !collected) {
      meshRef.current.rotation.x += 0.02;
      meshRef.current.rotation.z += 0.01;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 3) * 0.1;
    }
  });

  const handleClick = () => {
    setCollected(true);
    onClick();
  };

  if (collected) return null;

  return (
    <group position={position}>
      <Sphere
        ref={meshRef}
        args={[0.3, 16, 16]}
        onClick={handleClick}
      >
        <meshStandardMaterial color="#fbbf24" emissive="#f59e0b" emissiveIntensity={0.2} />
      </Sphere>
      <Text
        position={[0, 0.8, 0]}
        fontSize={0.2}
        color="#fbbf24"
        anchorX="center"
        anchorY="middle"
      >
        {tool}
      </Text>
    </group>
  );
};

const RecoveryPath: React.FC = () => {
  const pathRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (pathRef.current) {
      pathRef.current.children.forEach((child, index) => {
        const offset = index * 0.2;
        child.position.y = Math.sin(state.clock.elapsedTime * 2 + offset) * 0.05;
      });
    }
  });

  return (
    <group ref={pathRef}>
      {Array.from({ length: 20 }, (_, i) => (
        <Cylinder
          key={i}
          position={[i * 2 - 20, -0.5, 0]}
          args={[0.2, 0.2, 0.1, 8]}
        >
          <meshStandardMaterial color="#8b5cf6" />
        </Cylinder>
      ))}
    </group>
  );
};

export const GameScene: React.FC<GameSceneProps> = ({
  gameState,
  onChallengeComplete,
  onToolCollect,
}) => {
  const challenges = [
    { name: "Meditation", color: "#22c55e", position: [-4, 2, 0] as [number, number, number] },
    { name: "Exercise", color: "#3b82f6", position: [4, 2, -2] as [number, number, number] },
    { name: "Gratitude", color: "#f59e0b", position: [0, 3, 2] as [number, number, number] },
    { name: "Connection", color: "#ec4899", position: [-6, 1, 3] as [number, number, number] },
  ];

  const tools = [
    { name: "Mindfulness", position: [-2, 1, -1] as [number, number, number] },
    { name: "Resilience", position: [2, 1.5, 1] as [number, number, number] },
    { name: "Support", position: [0, 1, -3] as [number, number, number] },
  ];

  return (
    <>
      {/* Ambient lighting */}
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <pointLight position={[0, 10, 0]} intensity={0.5} color="#8b5cf6" />

      {/* Recovery Path */}
      <RecoveryPath />

      {/* Ground */}
      <Box position={[0, -1, 0]} args={[40, 0.2, 40]}>
        <meshStandardMaterial color="#1f2937" />
      </Box>

      {/* Challenges */}
      {challenges.map((challenge, index) => (
        <FloatingChallenge
          key={index}
          position={challenge.position}
          color={challenge.color}
          label={challenge.name}
          onClick={() => onChallengeComplete(challenge.name, 100)}
        />
      ))}

      {/* Recovery Tools */}
      {tools.map((tool, index) => (
        <RecoveryTool
          key={index}
          position={tool.position}
          tool={tool.name}
          onClick={() => onToolCollect(tool.name)}
        />
      ))}

      {/* Level indicator */}
      <Text
        position={[0, 8, -5]}
        fontSize={2}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
      >
        Level {gameState.level}
      </Text>

      {/* Floating particles for ambiance */}
      {Array.from({ length: 50 }, (_, i) => (
        <Sphere
          key={i}
          position={[
            (Math.random() - 0.5) * 40,
            Math.random() * 15 + 5,
            (Math.random() - 0.5) * 40
          ]}
          args={[0.02, 8, 8]}
        >
          <meshBasicMaterial color="#8b5cf6" opacity={0.6} transparent />
        </Sphere>
      ))}
    </>
  );
};