import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Target, Play, Pause } from 'lucide-react';
import type { GameState } from './RecoveryGame';

interface Canvas2DGameProps {
  gameState: GameState;
  onChallengeComplete: (challenge: string, points: number) => void;
  onToolCollect: (tool: string) => void;
}

interface GameObject {
  id: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  type: 'tool' | 'temptation';
  name: string;
  emoji: string;
  points: number;
  size: number;
  collected: boolean;
}

export const Canvas2DGame: React.FC<Canvas2DGameProps> = ({
  gameState,
  onChallengeComplete,
  onToolCollect,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>();
  const gameObjectsRef = useRef<GameObject[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [canvasSize, setCanvasSize] = useState({ width: 800, height: 500 });

  const tools = [
    { name: 'Meditation', emoji: '🧘', points: 100 },
    { name: 'Exercise', emoji: '💪', points: 120 },
    { name: 'Support', emoji: '🤝', points: 110 },
    { name: 'Therapy', emoji: '🗣️', points: 150 },
  ];

  const temptations = [
    { name: 'Alcohol', emoji: '🍺', points: 100 },
    { name: 'Cigarettes', emoji: '🚬', points: 75 },
    { name: 'Drugs', emoji: '💊', points: 150 },
    { name: 'Gambling', emoji: '🎰', points: 125 },
  ];

  // Resize canvas to fit container
  const updateCanvasSize = useCallback(() => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const newWidth = Math.max(600, rect.width - 32); // Account for padding
      const newHeight = Math.max(400, Math.min(600, window.innerHeight * 0.6));
      setCanvasSize({ width: newWidth, height: newHeight });
      console.log('📐 Canvas resized to:', newWidth, 'x', newHeight);
    }
  }, []);

  useEffect(() => {
    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);
    return () => window.removeEventListener('resize', updateCanvasSize);
  }, [updateCanvasSize]);

  const createGameObject = useCallback((): GameObject => {
    const isTemptation = Math.random() < 0.3;
    const items = isTemptation ? temptations : tools;
    const item = items[Math.floor(Math.random() * items.length)];
    
    return {
      id: Math.random().toString(36).substr(2, 9),
      x: Math.random() * (canvasSize.width - 100) + 50,
      y: -50,
      vx: (Math.random() - 0.5) * 4,
      vy: 1 + Math.random() * 2,
      type: isTemptation ? 'temptation' : 'tool',
      name: item.name,
      emoji: item.emoji,
      points: item.points,
      size: 25,
      collected: false,
    };
  }, [canvasSize.width]);

  const handleCanvasClick = useCallback((event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isPlaying) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    
    const clickX = (event.clientX - rect.left) * scaleX;
    const clickY = (event.clientY - rect.top) * scaleY;
    
    console.log('🖱️ Click at:', clickX, clickY);

    let hitSomething = false;
    gameObjectsRef.current = gameObjectsRef.current.map(obj => {
      if (obj.collected || hitSomething) return obj;
      
      const distance = Math.sqrt(
        Math.pow(clickX - obj.x, 2) + Math.pow(clickY - obj.y, 2)
      );
      
      if (distance <= obj.size + 10) {
        console.log('🎯 Hit object:', obj.name, 'Distance:', distance);
        hitSomething = true;
        setScore(s => s + obj.points);
        
        if (obj.type === 'temptation') {
          onChallengeComplete(`Resisted ${obj.name}`, obj.points);
        } else {
          onToolCollect(obj.name);
          onChallengeComplete(`Used ${obj.name}`, obj.points);
        }
        
        return { ...obj, collected: true };
      }
      return obj;
    });
  }, [isPlaying, onChallengeComplete, onToolCollect]);

  const gameLoop = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx || !isPlaying) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw background
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, '#0f0f23');
    gradient.addColorStop(0.5, '#1a1a3a');
    gradient.addColorStop(1, '#0f0f23');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Update game objects
    gameObjectsRef.current = gameObjectsRef.current.map(obj => {
      if (obj.collected) return obj;
      
      return {
        ...obj,
        x: obj.x + obj.vx,
        y: obj.y + obj.vy,
        vy: obj.vy + 0.1, // gravity
      };
    }).filter(obj => !obj.collected && obj.y < canvas.height + 100);

    // Draw objects
    gameObjectsRef.current.forEach(obj => {
      if (obj.collected) return;
      
      // Draw glow effect
      ctx.save();
      const glowColor = obj.type === 'temptation' ? '#ff4444' : '#44ff44';
      ctx.shadowColor = glowColor;
      ctx.shadowBlur = 20;
      
      // Draw object circle
      ctx.fillStyle = obj.type === 'temptation' ? '#ff3333' : '#33ff33';
      ctx.beginPath();
      ctx.arc(obj.x, obj.y, obj.size, 0, Math.PI * 2);
      ctx.fill();
      
      // Draw border
      ctx.strokeStyle = obj.type === 'temptation' ? '#ffffff' : '#ffffff';
      ctx.lineWidth = 2;
      ctx.stroke();
      
      ctx.restore();
      
      // Draw emoji
      ctx.font = `${obj.size * 0.8}px Arial`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = '#ffffff';
      ctx.fillText(obj.emoji, obj.x, obj.y);
      
      // Draw name
      ctx.font = '12px Arial';
      ctx.fillStyle = '#ffffff';
      ctx.fillText(obj.name, obj.x, obj.y + obj.size + 15);
    });

    // Spawn new objects
    if (Math.random() < 0.015) {
      gameObjectsRef.current.push(createGameObject());
      console.log('✨ Spawned new object, total:', gameObjectsRef.current.length);
    }

    // Update timer
    setTimeLeft(prev => {
      const newTime = prev - (1/60); // Assuming 60fps
      if (newTime <= 0) {
        setIsPlaying(false);
        onChallengeComplete(`Recovery Catcher Completed`, score);
        return 0;
      }
      return newTime;
    });

    animationRef.current = requestAnimationFrame(gameLoop);
  }, [isPlaying, createGameObject, onChallengeComplete, score]);

  useEffect(() => {
    if (isPlaying) {
      console.log('🎮 Starting game loop');
      animationRef.current = requestAnimationFrame(gameLoop);
    } else {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        console.log('⏹️ Stopped game loop');
      }
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPlaying, gameLoop]);

  const startGame = () => {
    console.log('🚀 Starting Recovery Catcher game');
    setIsPlaying(true);
    setScore(0);
    setTimeLeft(60);
    gameObjectsRef.current = [];
    
    // Spawn initial objects
    setTimeout(() => {
      for (let i = 0; i < 3; i++) {
        gameObjectsRef.current.push(createGameObject());
      }
      console.log('🎯 Spawned initial objects:', gameObjectsRef.current.length);
    }, 1000);
  };

  const pauseGame = () => {
    setIsPlaying(false);
  };

  if (!isPlaying && timeLeft === 60) {
    return (
      <div ref={containerRef} className="relative h-[500px] bg-gradient-to-br from-indigo-900/20 via-purple-900/20 to-pink-900/20 flex flex-col items-center justify-center border-2 border-primary/20 rounded-lg">
        <div className="text-center space-y-6 max-w-md">
          <div className="space-y-2">
            <h3 className="text-2xl font-bold gradient-text">Recovery Catcher</h3>
            <p className="text-muted-foreground">
              Click on falling recovery tools to collect them and resist temptations!
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="p-3 bg-green-500/10 rounded-lg border border-green-500/20">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                <span className="font-semibold text-green-500">Recovery Tools</span>
              </div>
              <p className="text-xs text-muted-foreground">Click to collect and gain points</p>
            </div>
            
            <div className="p-3 bg-red-500/10 rounded-lg border border-red-500/20">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                <span className="font-semibold text-red-500">Temptations</span>
              </div>
              <p className="text-xs text-muted-foreground">Click to resist and overcome</p>
            </div>
          </div>

          <Button 
            onClick={startGame}
            size="lg"
            className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90"
          >
            <Play className="h-5 w-5 mr-2" />
            Start Recovery Catcher
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="relative w-full">
      {/* Game UI */}
      <div className="flex justify-between items-center mb-4 px-4">
        <div className="flex gap-4">
          <Badge className="bg-primary/10 text-primary border-primary/20">
            Time: {Math.ceil(timeLeft)}s
          </Badge>
          <Badge className="bg-secondary/10 text-secondary border-secondary/20">
            Score: {score}
          </Badge>
          <Badge className="bg-green-500/10 text-green-500 border-green-500/20">
            Objects: {gameObjectsRef.current.filter(obj => !obj.collected).length}
          </Badge>
        </div>
        
        <div className="flex gap-2">
          {isPlaying ? (
            <Button variant="outline" size="sm" onClick={pauseGame}>
              <Pause className="h-4 w-4 mr-1" />
              Pause
            </Button>
          ) : (
            <Button variant="outline" size="sm" onClick={startGame}>
              <Play className="h-4 w-4 mr-1" />
              Resume
            </Button>
          )}
        </div>
      </div>

      {/* Game Canvas */}
      <div className="relative border-2 border-primary/20 rounded-lg overflow-hidden w-full">
        <canvas
          ref={canvasRef}
          width={canvasSize.width}
          height={canvasSize.height}
          onClick={handleCanvasClick}
          className="cursor-pointer bg-gradient-to-b from-slate-900 to-slate-800 w-full h-auto block"
          style={{ maxWidth: '100%', height: 'auto' }}
        />
        
        {/* Instructions overlay */}
        <div className="absolute top-4 left-4 bg-black/70 text-white text-sm p-3 rounded backdrop-blur-sm">
          <p className="font-semibold mb-1">How to Play:</p>
          <p>• Click on falling objects to interact</p>
          <p>• Green = Recovery tools (collect them!)</p>
          <p>• Red = Temptations (resist by clicking!)</p>
        </div>
      </div>
    </div>
  );
};