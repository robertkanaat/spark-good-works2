import React, { Suspense, useState, useEffect, useCallback, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Text, Environment, Stars } from '@react-three/drei';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, Zap, Shield, Users, Star, Target, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { GameState } from './RecoveryGame';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

interface ThreeDGameWorldProps {
  gameState: GameState;
  onChallengeComplete: (challenge: string, points: number) => void;
  onToolCollect: (tool: string) => void;
}

interface GameItem {
  id: string;
  type: 'temptation' | 'tool';
  position: [number, number, number];
  name: string;
  points: number;
  color: string;
  emoji: string;
}

interface PlayerPosition {
  x: number;
  z: number;
}

// Simple 3D Item Component
const GameItem3D: React.FC<{
  item: GameItem;
  onCollect: (item: GameItem) => void;
  playerPos: PlayerPosition;
}> = ({ item, onCollect, playerPos }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [collected, setCollected] = useState(false);

  useFrame((state) => {
    if (meshRef.current && !collected) {
      meshRef.current.rotation.y += 0.02;
      meshRef.current.position.y = item.position[1] + Math.sin(state.clock.elapsedTime * 3) * 0.2;
      
      // Check collision with player
      const distance = Math.sqrt(
        Math.pow(meshRef.current.position.x - playerPos.x, 2) + 
        Math.pow(meshRef.current.position.z - playerPos.z, 2)
      );
      
      if (distance < 1.5 && !collected) {
        setCollected(true);
        onCollect(item);
      }
    }
  });

  if (collected) return null;

  return (
    <group position={item.position}>
      <mesh ref={meshRef}>
        <boxGeometry args={[0.8, 0.8, 0.8]} />
        <meshStandardMaterial 
          color={item.type === 'temptation' ? '#ef4444' : '#22c55e'} 
          emissive={item.type === 'temptation' ? '#7f1d1d' : '#15803d'}
          emissiveIntensity={0.2}
        />
      </mesh>
      <Text
        position={[0, 1.2, 0]}
        fontSize={0.4}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
      >
        {item.emoji}
      </Text>
    </group>
  );
};

// Player Character Component
const Player3D: React.FC<{ position: PlayerPosition }> = ({ position }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime) * 0.1;
    }
  });

  return (
    <group position={[position.x, 0.5, position.z]}>
      <mesh ref={meshRef}>
        <capsuleGeometry args={[0.5, 1]} />
        <meshStandardMaterial color="#3b82f6" emissive="#1e40af" emissiveIntensity={0.1} />
      </mesh>
      <Text
        position={[0, 2, 0]}
        fontSize={0.3}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
      >
        🧘‍♂️
      </Text>
    </group>
  );
};

// 3D Scene Component
const Scene3D: React.FC<{
  items: GameItem[];
  playerPos: PlayerPosition;
  onCollect: (item: GameItem) => void;
  level: number;
}> = ({ items, playerPos, onCollect, level }) => {
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <pointLight position={[0, 5, 0]} intensity={0.5} color="#8b5cf6" />

      {/* Ground */}
      <mesh position={[0, -0.5, 0]} receiveShadow>
        <boxGeometry args={[20, 1, 20]} />
        <meshStandardMaterial color="#1f2937" />
      </mesh>

      {/* Recovery Path */}
      {Array.from({ length: 10 }, (_, i) => (
        <mesh key={i} position={[i * 2 - 10, 0, 0]}>
          <cylinderGeometry args={[0.3, 0.3, 0.1]} />
          <meshStandardMaterial color="#8b5cf6" emissive="#6d28d9" emissiveIntensity={0.2} />
        </mesh>
      ))}

      {/* Player */}
      <Player3D position={playerPos} />

      {/* Game Items */}
      {items.map((item) => (
        <GameItem3D
          key={item.id}
          item={item}
          playerPos={playerPos}
          onCollect={onCollect}
        />
      ))}

      {/* Level indicator */}
      <Text
        position={[0, 5, -8]}
        fontSize={1.5}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
      >
        Level {level}
      </Text>
    </>
  );
};

export const ThreeDGameWorld: React.FC<ThreeDGameWorldProps> = ({
  gameState,
  onChallengeComplete,
  onToolCollect,
}) => {
  const [gameActive, setGameActive] = useState(false);
  const [items, setItems] = useState<GameItem[]>([]);
  const [playerPos, setPlayerPos] = useState<PlayerPosition>({ x: 0, z: 0 });
  const [score, setScore] = useState(0);
  const [gameTime, setGameTime] = useState(45);
  const [combo, setCombo] = useState(0);

  const temptations = [
    { name: 'Alcohol', emoji: '🍺', points: 100 }, // Points for resisting
    { name: 'Cigarettes', emoji: '🚬', points: 75 },
    { name: 'Drugs', emoji: '💊', points: 150 },
    { name: 'Gambling', emoji: '🎰', points: 125 },
  ];

  const tools = [
    { name: 'Meditation', emoji: '🧘', points: 100 },
    { name: 'Exercise', emoji: '💪', points: 120 },
    { name: 'Support', emoji: '🤝', points: 110 },
    { name: 'Therapy', emoji: '🗣️', points: 150 },
  ];

  const spawnItem = useCallback(() => {
    if (!gameActive) return;

    const isTemptation = Math.random() < 0.5;
    const itemList = isTemptation ? temptations : tools;
    const item = itemList[Math.floor(Math.random() * itemList.length)];
    
    const newItem: GameItem = {
      id: Math.random().toString(36).substr(2, 9),
      type: isTemptation ? 'temptation' : 'tool',
      position: [
        (Math.random() - 0.5) * 16, // Random X position
        2, // Fixed Y position
        (Math.random() - 0.5) * 16  // Random Z position
      ],
      name: item.name,
      points: item.points,
      color: isTemptation ? '#ef4444' : '#22c55e',
      emoji: item.emoji,
    };

    setItems(prev => [...prev, newItem]);
  }, [gameActive]);

  const handleCollect = useCallback((item: GameItem) => {
    setScore(prev => prev + item.points);
    setCombo(prev => prev + 1);
    
    if (item.type === 'temptation') {
      onChallengeComplete(`Resisted ${item.name}`, item.points);
    } else {
      onToolCollect(item.name);
      onChallengeComplete(`Used ${item.name}`, item.points);
    }

    // Remove the item
    setItems(prev => prev.filter(i => i.id !== item.id));
  }, [onChallengeComplete, onToolCollect]);

  const movePlayer = useCallback((direction: 'up' | 'down' | 'left' | 'right') => {
    setPlayerPos(prev => {
      const speed = 1;
      switch (direction) {
        case 'up': return { ...prev, z: Math.max(-8, prev.z - speed) };
        case 'down': return { ...prev, z: Math.min(8, prev.z + speed) };
        case 'left': return { ...prev, x: Math.max(-8, prev.x - speed) };
        case 'right': return { ...prev, x: Math.min(8, prev.x + speed) };
        default: return prev;
      }
    });
  }, []);

  const startGame = () => {
    setGameActive(true);
    setScore(0);
    setCombo(0);
    setGameTime(45);
    setItems([]);
    setPlayerPos({ x: 0, z: 0 });

    // Spawn items periodically
    const spawnInterval = setInterval(spawnItem, 2000);

    // Game timer
    const timer = setInterval(() => {
      setGameTime(prev => {
        if (prev <= 1) {
          endGame();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    setTimeout(() => {
      clearInterval(spawnInterval);
      clearInterval(timer);
    }, 45000);
  };

  const endGame = () => {
    setGameActive(false);
    const bonusPoints = combo * 15;
    if (bonusPoints > 0) {
      onChallengeComplete(`3D Game Completion Bonus (${combo}x combo)`, bonusPoints);
    }
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!gameActive) return;
      
      switch (e.key.toLowerCase()) {
        case 'w':
        case 'arrowup':
          movePlayer('up');
          break;
        case 's':
        case 'arrowdown':
          movePlayer('down');
          break;
        case 'a':
        case 'arrowleft':
          movePlayer('left');
          break;
        case 'd':
        case 'arrowright':
          movePlayer('right');
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [gameActive, movePlayer]);

  if (!gameActive) {
    return (
      <div className="relative h-[500px] bg-gradient-to-br from-indigo-900/20 via-purple-900/20 to-pink-900/20 flex flex-col items-center justify-center">
        <div className="text-center space-y-6 max-w-md">
          <div className="space-y-2">
            <h3 className="text-2xl font-bold gradient-text">3D Recovery World</h3>
            <p className="text-muted-foreground">
              Navigate your character to collect recovery tools and resist temptations!
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="p-3 bg-green-500/10 rounded-lg border border-green-500/20">
              <div className="flex items-center gap-2 mb-1">
                <Heart className="h-4 w-4 text-green-500" />
                <span className="font-semibold text-green-500">Collect Tools</span>
              </div>
              <p className="text-xs text-muted-foreground">Walk into green items</p>
            </div>
            
            <div className="p-3 bg-red-500/10 rounded-lg border border-red-500/20">
              <div className="flex items-center gap-2 mb-1">
                <Shield className="h-4 w-4 text-red-500" />
                <span className="font-semibold text-red-500">Resist Temptations</span>
              </div>
              <p className="text-xs text-muted-foreground">Walk into red items to resist</p>
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">
              WASD or Arrow Keys to move • Walk into items to collect them
            </p>
            <p className="text-xs text-muted-foreground">
              Drag to rotate camera • Scroll to zoom
            </p>
          </div>

          <Button 
            onClick={startGame}
            size="lg"
            className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90"
          >
            <Target className="h-5 w-5 mr-2" />
            Enter 3D Recovery World
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-[500px] bg-gradient-to-br from-indigo-900/20 via-purple-900/20 to-pink-900/20 overflow-hidden border-2 border-primary/20 rounded-lg">
      {/* Game UI */}
      <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-30">
        <div className="flex gap-4">
          <Badge className="bg-primary/10 text-primary border-primary/20">
            Time: {gameTime}s
          </Badge>
          <Badge className="bg-secondary/10 text-secondary border-secondary/20">
            Score: {score}
          </Badge>
          <Badge className="bg-green-500/10 text-green-500 border-green-500/20">
            Items: {items.length}
          </Badge>
          {combo > 1 && (
            <Badge className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20 animate-pulse">
              {combo}x Combo!
            </Badge>
          )}
        </div>
        
        <Button 
          variant="outline" 
          size="sm"
          onClick={endGame}
          className="border-red-500/20 text-red-500 hover:bg-red-500/10"
        >
          End Game
        </Button>
      </div>

      {/* 3D Canvas */}
      <div className="h-full w-full">
        <Canvas camera={{ position: [8, 8, 8], fov: 60 }}>
          <Suspense fallback={null}>
            <Environment preset="sunset" />
            <Stars />
            <Scene3D 
              items={items}
              playerPos={playerPos}
              onCollect={handleCollect}
              level={gameState.level}
            />
            <OrbitControls 
              enablePan={false} 
              enableZoom={true} 
              enableRotate={true}
              maxDistance={15}
              minDistance={5}
            />
          </Suspense>
        </Canvas>
      </div>

      {/* Movement Controls */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-30">
        <div className="grid grid-cols-3 gap-1">
          <div></div>
          <Button variant="outline" size="sm" onMouseDown={() => movePlayer('up')}>↑</Button>
          <div></div>
          <Button variant="outline" size="sm" onMouseDown={() => movePlayer('left')}>←</Button>
          <Button variant="outline" size="sm" onMouseDown={() => movePlayer('down')}>↓</Button>
          <Button variant="outline" size="sm" onMouseDown={() => movePlayer('right')}>→</Button>
        </div>
      </div>

      {/* Instructions */}
      <div className="absolute bottom-4 right-4 bg-card/80 backdrop-blur-sm rounded-lg p-2 border border-border text-xs z-30">
        <p>WASD or arrows to move</p>
        <p>Walk into items to collect</p>
        <p>Drag to rotate camera</p>
      </div>
    </div>
  );
};