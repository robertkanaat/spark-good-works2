import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Target, Play, Pause, Zap } from 'lucide-react';
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

interface Projectile {
  id: string;
  x: number;
  y: number;
  vy: number;
  active: boolean;
}

interface Player {
  x: number;
  y: number;
  width: number;
  height: number;
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
  const projectilesRef = useRef<Projectile[]>([]);
  const keysRef = useRef<Set<string>>(new Set());
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [canvasSize, setCanvasSize] = useState({ width: 800, height: 500 });
  const [player, setPlayer] = useState<Player>({ x: 400, y: 450, width: 40, height: 30 });

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
      const newWidth = Math.max(600, rect.width - 32);
      const newHeight = Math.max(400, Math.min(600, window.innerHeight * 0.6));
      setCanvasSize({ width: newWidth, height: newHeight });
      setPlayer(prev => ({ ...prev, x: newWidth / 2, y: newHeight - 80 }));
      console.log('📐 Canvas resized to:', newWidth, 'x', newHeight);
    }
  }, []);

  useEffect(() => {
    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);
    return () => window.removeEventListener('resize', updateCanvasSize);
  }, [updateCanvasSize]);

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      keysRef.current.add(e.key.toLowerCase());
      if (e.key === ' ' && isPlaying) {
        e.preventDefault();
        shootProjectile();
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      keysRef.current.delete(e.key.toLowerCase());
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [isPlaying]);

  const shootProjectile = useCallback(() => {
    const newProjectile: Projectile = {
      id: Math.random().toString(36).substr(2, 9),
      x: player.x,
      y: player.y - 10,
      vy: -8,
      active: true,
    };
    projectilesRef.current.push(newProjectile);
    console.log('🚀 Shot projectile');
  }, [player.x, player.y]);

  const createGameObject = useCallback((): GameObject => {
    const isTemptation = Math.random() < 0.6; // 60% bad habits to shoot
    const items = isTemptation ? temptations : tools;
    const item = items[Math.floor(Math.random() * items.length)];
    
    return {
      id: Math.random().toString(36).substr(2, 9),
      x: Math.random() * (canvasSize.width - 100) + 50,
      y: -50,
      vx: (Math.random() - 0.5) * 2,
      vy: 1 + Math.random() * 1.5,
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
    shootProjectile();
  }, [isPlaying, shootProjectile]);

  const gameLoop = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx || !isPlaying) return;

    // Update player movement
    setPlayer(prev => {
      let newX = prev.x;
      const speed = 5;
      
      if (keysRef.current.has('a') || keysRef.current.has('arrowleft')) {
        newX = Math.max(prev.width / 2, prev.x - speed);
      }
      if (keysRef.current.has('d') || keysRef.current.has('arrowright')) {
        newX = Math.min(canvas.width - prev.width / 2, prev.x + speed);
      }
      
      return { ...prev, x: newX };
    });

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw background
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, '#0a0a1a');
    gradient.addColorStop(0.7, '#1a1a3a');
    gradient.addColorStop(1, '#2a2a4a');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Update projectiles
    projectilesRef.current = projectilesRef.current.map(projectile => ({
      ...projectile,
      y: projectile.y + projectile.vy,
    })).filter(projectile => projectile.y > -10);

    // Update game objects
    gameObjectsRef.current = gameObjectsRef.current.map(obj => {
      if (obj.collected) return obj;
      return {
        ...obj,
        x: obj.x + obj.vx,
        y: obj.y + obj.vy,
      };
    }).filter(obj => !obj.collected && obj.y < canvas.height + 50);

    // Check projectile collisions with temptations
    projectilesRef.current.forEach(projectile => {
      gameObjectsRef.current.forEach(obj => {
        if (obj.collected || obj.type !== 'temptation') return;
        
        const distance = Math.sqrt(
          Math.pow(projectile.x - obj.x, 2) + Math.pow(projectile.y - obj.y, 2)
        );
        
        if (distance <= obj.size + 5) {
          console.log('💥 Shot down:', obj.name);
          obj.collected = true;
          projectile.active = false;
          setScore(s => s + obj.points);
          onChallengeComplete(`Shot down ${obj.name}`, obj.points);
        }
      });
    });

    // Check player collision with recovery tools
    gameObjectsRef.current.forEach(obj => {
      if (obj.collected || obj.type !== 'tool') return;
      
      const distance = Math.sqrt(
        Math.pow(player.x - obj.x, 2) + Math.pow(player.y - obj.y, 2)
      );
      
      if (distance <= obj.size + player.width / 2) {
        console.log('✨ Collected tool:', obj.name);
        obj.collected = true;
        setScore(s => s + obj.points);
        onToolCollect(obj.name);
        onChallengeComplete(`Collected ${obj.name}`, obj.points);
      }
    });

    // Filter out inactive projectiles
    projectilesRef.current = projectilesRef.current.filter(p => p.active);

    // Draw player ship
    ctx.save();
    ctx.fillStyle = '#00aaff';
    ctx.shadowColor = '#00aaff';
    ctx.shadowBlur = 10;
    
    // Draw ship body
    ctx.beginPath();
    ctx.moveTo(player.x, player.y - player.height / 2);
    ctx.lineTo(player.x - player.width / 2, player.y + player.height / 2);
    ctx.lineTo(player.x + player.width / 2, player.y + player.height / 2);
    ctx.closePath();
    ctx.fill();
    
    // Draw ship details
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(player.x - 2, player.y - 5, 4, 8);
    
    ctx.restore();

    // Draw projectiles
    projectilesRef.current.forEach(projectile => {
      ctx.save();
      ctx.fillStyle = '#ffff00';
      ctx.shadowColor = '#ffff00';
      ctx.shadowBlur = 5;
      ctx.beginPath();
      ctx.arc(projectile.x, projectile.y, 3, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    });

    // Draw game objects
    gameObjectsRef.current.forEach(obj => {
      if (obj.collected) return;
      
      ctx.save();
      const glowColor = obj.type === 'temptation' ? '#ff4444' : '#44ff44';
      ctx.shadowColor = glowColor;
      ctx.shadowBlur = 15;
      
      // Draw object circle
      ctx.fillStyle = obj.type === 'temptation' ? '#ff3333' : '#33ff33';
      ctx.beginPath();
      ctx.arc(obj.x, obj.y, obj.size, 0, Math.PI * 2);
      ctx.fill();
      
      // Draw border
      ctx.strokeStyle = '#ffffff';
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
      ctx.font = '10px Arial';
      ctx.fillStyle = '#ffffff';
      ctx.fillText(obj.name, obj.x, obj.y + obj.size + 12);
    });

    // Spawn new objects
    if (Math.random() < 0.02) {
      gameObjectsRef.current.push(createGameObject());
    }

    // Update timer
    setTimeLeft(prev => {
      const newTime = prev - (1/60);
      if (newTime <= 0) {
        setIsPlaying(false);
        onChallengeComplete(`Recovery Shooter Completed`, score);
        return 0;
      }
      return newTime;
    });

    animationRef.current = requestAnimationFrame(gameLoop);
  }, [isPlaying, createGameObject, onChallengeComplete, onToolCollect, score, player]);

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
    console.log('🚀 Starting Recovery Shooter game');
    setIsPlaying(true);
    setScore(0);
    setTimeLeft(60);
    gameObjectsRef.current = [];
    projectilesRef.current = [];
    keysRef.current.clear();
    setPlayer(prev => ({ ...prev, x: canvasSize.width / 2 }));
    
    // Spawn initial objects
    setTimeout(() => {
      for (let i = 0; i < 2; i++) {
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
            <h3 className="text-2xl font-bold gradient-text">Recovery Shooter</h3>
            <p className="text-muted-foreground">
              Shoot down bad habits and collect recovery tools by flying into them!
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="p-3 bg-red-500/10 rounded-lg border border-red-500/20">
              <div className="flex items-center gap-2 mb-1">
                <Zap className="w-4 h-4 text-red-500" />
                <span className="font-semibold text-red-500">Bad Habits</span>
              </div>
              <p className="text-xs text-muted-foreground">Shoot them down with projectiles</p>
            </div>
            
            <div className="p-3 bg-green-500/10 rounded-lg border border-green-500/20">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                <span className="font-semibold text-green-500">Recovery Tools</span>
              </div>
              <p className="text-xs text-muted-foreground">Fly into them to collect</p>
            </div>
          </div>

          <div className="text-xs text-muted-foreground space-y-1">
            <p>• A/D or Arrow Keys: Move ship</p>
            <p>• Spacebar or Click: Shoot</p>
          </div>

          <Button 
            onClick={startGame}
            size="lg"
            className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90"
          >
            <Zap className="h-5 w-5 mr-2" />
            Start Recovery Shooter
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
          <p className="font-semibold mb-1">Controls:</p>
          <p>• A/D or ←/→: Move ship</p>
          <p>• Spacebar/Click: Shoot</p>
          <p>• Shoot red bad habits</p>
          <p>• Fly into green recovery tools</p>
        </div>
      </div>
    </div>
  );
};