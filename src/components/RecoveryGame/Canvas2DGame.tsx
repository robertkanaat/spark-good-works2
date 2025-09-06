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
  const animationRef = useRef<number>();
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameObjects, setGameObjects] = useState<GameObject[]>([]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameStartTime, setGameStartTime] = useState<number>(0);

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

  const createGameObject = useCallback((): GameObject => {
    const isTemptation = Math.random() < 0.4; // 40% chance for temptations
    const items = isTemptation ? temptations : tools;
    const item = items[Math.floor(Math.random() * items.length)];
    
    const canvas = canvasRef.current;
    if (!canvas) throw new Error('Canvas not available');

    return {
      id: Math.random().toString(36).substr(2, 9),
      x: Math.random() * (canvas.width - 60) + 30,
      y: -30,
      vx: (Math.random() - 0.5) * 2,
      vy: 2 + Math.random() * 3,
      type: isTemptation ? 'temptation' : 'tool',
      name: item.name,
      emoji: item.emoji,
      points: item.points,
      size: 30,
      collected: false,
    };
  }, []);

  const handleCanvasClick = useCallback((event: MouseEvent) => {
    if (!isPlaying) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const clickY = event.clientY - rect.top;

    setGameObjects(prev => prev.map(obj => {
      if (obj.collected) return obj;
      
      const distance = Math.sqrt(
        Math.pow(clickX - obj.x, 2) + Math.pow(clickY - obj.y, 2)
      );
      
      if (distance <= obj.size) {
        console.log('🎯 Clicked on:', obj.name);
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
    }));
  }, [isPlaying, onChallengeComplete, onToolCollect]);

  const gameLoop = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx || !isPlaying) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw background
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, '#1a1a2e');
    gradient.addColorStop(1, '#16213e');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Update and draw game objects
    setGameObjects(prev => {
      const updated = prev.map(obj => {
        if (obj.collected) return obj;
        
        return {
          ...obj,
          x: obj.x + obj.vx,
          y: obj.y + obj.vy,
          vy: obj.vy + 0.1, // gravity
        };
      }).filter(obj => !obj.collected && obj.y < canvas.height + 50);

      // Draw objects
      updated.forEach(obj => {
        if (obj.collected) return;
        
        // Draw glow effect
        ctx.save();
        ctx.shadowColor = obj.type === 'temptation' ? '#ff4444' : '#44ff44';
        ctx.shadowBlur = 15;
        
        // Draw object circle
        ctx.fillStyle = obj.type === 'temptation' ? '#ff6666' : '#66ff66';
        ctx.beginPath();
        ctx.arc(obj.x, obj.y, obj.size, 0, Math.PI * 2);
        ctx.fill();
        
        // Draw border
        ctx.strokeStyle = obj.type === 'temptation' ? '#ff0000' : '#00ff00';
        ctx.lineWidth = 3;
        ctx.stroke();
        
        ctx.restore();
        
        // Draw emoji
        ctx.font = '20px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = '#ffffff';
        ctx.fillText(obj.emoji, obj.x, obj.y);
        
        // Draw name
        ctx.font = '10px Arial';
        ctx.fillStyle = '#ffffff';
        ctx.fillText(obj.name, obj.x, obj.y + 45);
      });

      return updated;
    });

    // Update timer
    const elapsed = (Date.now() - gameStartTime) / 1000;
    const newTimeLeft = Math.max(0, 30 - elapsed);
    setTimeLeft(newTimeLeft);
    
    if (newTimeLeft <= 0) {
      setIsPlaying(false);
      onChallengeComplete(`Canvas Game Completed`, score);
      return;
    }

    // Spawn new objects occasionally
    if (Math.random() < 0.02) { // 2% chance each frame
      setGameObjects(prev => [...prev, createGameObject()]);
    }

    animationRef.current = requestAnimationFrame(gameLoop);
  }, [isPlaying, gameStartTime, score, createGameObject, onChallengeComplete]);

  useEffect(() => {
    if (isPlaying) {
      animationRef.current = requestAnimationFrame(gameLoop);
    } else {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPlaying, gameLoop]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.addEventListener('click', handleCanvasClick);
      return () => canvas.removeEventListener('click', handleCanvasClick);
    }
  }, [handleCanvasClick]);

  const startGame = () => {
    setIsPlaying(true);
    setScore(0);
    setTimeLeft(30);
    setGameObjects([]);
    setGameStartTime(Date.now());
    
    // Spawn initial objects
    const initialObjects = Array.from({ length: 3 }, () => createGameObject());
    setGameObjects(initialObjects);
  };

  const pauseGame = () => {
    setIsPlaying(false);
  };

  if (!isPlaying && timeLeft === 30) {
    return (
      <div className="relative h-[400px] bg-gradient-to-br from-indigo-900/20 via-purple-900/20 to-pink-900/20 flex flex-col items-center justify-center border-2 border-primary/20 rounded-lg">
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
              <p className="text-xs text-muted-foreground">Click to collect points</p>
            </div>
            
            <div className="p-3 bg-red-500/10 rounded-lg border border-red-500/20">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                <span className="font-semibold text-red-500">Temptations</span>
              </div>
              <p className="text-xs text-muted-foreground">Click to resist them</p>
            </div>
          </div>

          <Button 
            onClick={startGame}
            size="lg"
            className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90"
          >
            <Play className="h-5 w-5 mr-2" />
            Start Game
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Game UI */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex gap-4">
          <Badge className="bg-primary/10 text-primary border-primary/20">
            Time: {Math.ceil(timeLeft)}s
          </Badge>
          <Badge className="bg-secondary/10 text-secondary border-secondary/20">
            Score: {score}
          </Badge>
          <Badge className="bg-green-500/10 text-green-500 border-green-500/20">
            Objects: {gameObjects.filter(obj => !obj.collected).length}
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
      <div className="relative border-2 border-primary/20 rounded-lg overflow-hidden">
        <canvas
          ref={canvasRef}
          width={600}
          height={400}
          className="cursor-pointer bg-gradient-to-b from-slate-900 to-slate-800"
        />
        
        {/* Instructions overlay */}
        <div className="absolute top-2 left-2 bg-black/50 text-white text-xs p-2 rounded">
          Click on falling objects to collect them!
        </div>
      </div>
    </div>
  );
};