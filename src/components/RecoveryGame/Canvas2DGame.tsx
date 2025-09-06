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
  const playerRef = useRef<Player>({ x: 400, y: 450, width: 40, height: 30 });
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
      const newWidth = Math.max(600, rect.width - 32);
      const newHeight = Math.max(400, Math.min(600, window.innerHeight * 0.6));
      setCanvasSize({ width: newWidth, height: newHeight });
      playerRef.current = { ...playerRef.current, x: newWidth / 2, y: newHeight - 80 };
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
      x: playerRef.current.x, // Use current player position from ref
      y: playerRef.current.y - 10,
      vy: -10, // Faster projectiles
      active: true,
    };
    projectilesRef.current.push(newProjectile);
    console.log('🚀 Shot projectile from player position:', playerRef.current.x, playerRef.current.y);
  }, []); // No dependencies needed since we use ref

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

    // Calculate difficulty based on time elapsed (progressive difficulty)
    const timeElapsed = 60 - timeLeft;
    const difficultyLevel = Math.floor(timeElapsed / 10) + 1; // Increases every 10 seconds
    const spawnRate = Math.min(0.02 + (difficultyLevel * 0.01), 0.08); // Increases spawn rate
    const objectSpeed = 1 + (difficultyLevel * 0.3); // Increases falling speed

    // Update player movement (smoother with easing)
    const currentPlayer = playerRef.current;
    let newX = currentPlayer.x;
    let newY = currentPlayer.y;
    const speed = 7; // Increased speed for more fluid movement
    
    if (keysRef.current.has('a') || keysRef.current.has('arrowleft')) {
      newX = Math.max(currentPlayer.width / 2, currentPlayer.x - speed);
    }
    if (keysRef.current.has('d') || keysRef.current.has('arrowright')) {
      newX = Math.min(canvas.width - currentPlayer.width / 2, currentPlayer.x + speed);
    }
    if (keysRef.current.has('w') || keysRef.current.has('arrowup')) {
      newY = Math.max(currentPlayer.height / 2, currentPlayer.y - speed);
    }
    if (keysRef.current.has('s') || keysRef.current.has('arrowdown')) {
      newY = Math.min(canvas.height - currentPlayer.height / 2, currentPlayer.y + speed);
    }
    
    // Update player ref directly
    playerRef.current = { ...currentPlayer, x: newX, y: newY };

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw animated background
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, '#0a0a1a');
    gradient.addColorStop(0.3, '#1a1a3a');
    gradient.addColorStop(0.7, '#2a2a4a');
    gradient.addColorStop(1, '#1a1a2a');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw stars for background effect
    ctx.fillStyle = 'rgba(255,255,255,0.1)';
    for (let i = 0; i < 20; i++) {
      const x = (Date.now() * 0.01 + i * 50) % canvas.width;
      const y = (i * 30) % canvas.height;
      ctx.fillRect(x, y, 1, 1);
    }

    // Update projectiles (faster movement)
    projectilesRef.current = projectilesRef.current.map(projectile => ({
      ...projectile,
      y: projectile.y + projectile.vy,
    })).filter(projectile => projectile.y > -20 && projectile.active);

    // Update game objects with progressive difficulty
    gameObjectsRef.current = gameObjectsRef.current.map(obj => {
      if (obj.collected) return obj;
      return {
        ...obj,
        x: obj.x + obj.vx,
        y: obj.y + (obj.vy * objectSpeed), // Apply difficulty speed multiplier
      };
    }).filter(obj => !obj.collected && obj.y < canvas.height + 50);

    // Check projectile collisions with temptations
    projectilesRef.current.forEach(projectile => {
      gameObjectsRef.current.forEach(obj => {
        if (obj.collected || obj.type !== 'temptation' || !projectile.active) return;
        
        const distance = Math.sqrt(
          Math.pow(projectile.x - obj.x, 2) + Math.pow(projectile.y - obj.y, 2)
        );
        
        if (distance <= obj.size + 8) {
          console.log('💥 Shot down:', obj.name);
          obj.collected = true;
          projectile.active = false;
          const bonusPoints = obj.points + (difficultyLevel * 10); // Bonus points for higher difficulty
          setScore(s => s + bonusPoints);
          onChallengeComplete(`Shot down ${obj.name} (Level ${difficultyLevel})`, bonusPoints);
        }
      });
    });

    // Check player collision with recovery tools  
    gameObjectsRef.current.forEach(obj => {
      if (obj.collected || obj.type !== 'tool') return;
      
      const distance = Math.sqrt(
        Math.pow(playerRef.current.x - obj.x, 2) + Math.pow(playerRef.current.y - obj.y, 2)
      );
      
      if (distance <= obj.size + playerRef.current.width / 2 + 5) {
        console.log('✨ Collected tool:', obj.name);
        obj.collected = true;
        const bonusPoints = obj.points + (difficultyLevel * 5);
        setScore(s => s + bonusPoints);
        onToolCollect(obj.name);
        onChallengeComplete(`Collected ${obj.name} (Level ${difficultyLevel})`, bonusPoints);
      }
    });

    // Filter out inactive projectiles
    projectilesRef.current = projectilesRef.current.filter(p => p.active);

    // Draw player ship with glow effect
    const player = playerRef.current;
    ctx.save();
    ctx.fillStyle = '#00aaff';
    ctx.shadowColor = '#00aaff';
    ctx.shadowBlur = 15;
    
    // Draw ship body (more detailed)
    ctx.beginPath();
    ctx.moveTo(player.x, player.y - player.height / 2);
    ctx.lineTo(player.x - player.width / 2, player.y + player.height / 2);
    ctx.lineTo(player.x - player.width / 4, player.y + player.height / 4);
    ctx.lineTo(player.x + player.width / 4, player.y + player.height / 4);
    ctx.lineTo(player.x + player.width / 2, player.y + player.height / 2);
    ctx.closePath();
    ctx.fill();
    
    // Draw ship engine glow
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(player.x - 3, player.y + 5, 6, 12);
    ctx.fillStyle = '#00ddff';
    ctx.fillRect(player.x - 2, player.y + 8, 4, 8);
    
    ctx.restore();

    // Draw projectiles with trail effect
    projectilesRef.current.forEach(projectile => {
      ctx.save();
      
      // Draw trail
      ctx.fillStyle = 'rgba(255, 255, 0, 0.3)';
      for (let i = 1; i <= 3; i++) {
        ctx.beginPath();
        ctx.arc(projectile.x, projectile.y + (i * 8), 3 - i, 0, Math.PI * 2);
        ctx.fill();
      }
      
      // Draw main projectile
      ctx.fillStyle = '#ffff00';
      ctx.shadowColor = '#ffff00';
      ctx.shadowBlur = 10;
      ctx.beginPath();
      ctx.arc(projectile.x, projectile.y, 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    });

    // Draw game objects with enhanced effects
    gameObjectsRef.current.forEach(obj => {
      if (obj.collected) return;
      
      ctx.save();
      const glowColor = obj.type === 'temptation' ? '#ff4444' : '#44ff44';
      ctx.shadowColor = glowColor;
      ctx.shadowBlur = 20 + Math.sin(Date.now() * 0.005) * 5; // Pulsing glow
      
      // Draw object circle with better colors
      ctx.fillStyle = obj.type === 'temptation' 
        ? `rgba(255, 51, 51, ${0.8 + Math.sin(Date.now() * 0.01) * 0.2})` 
        : `rgba(51, 255, 51, ${0.8 + Math.sin(Date.now() * 0.01) * 0.2})`;
      ctx.beginPath();
      ctx.arc(obj.x, obj.y, obj.size, 0, Math.PI * 2);
      ctx.fill();
      
      // Draw animated border
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 3;
      ctx.setLineDash([5, 5]);
      ctx.lineDashOffset = -Date.now() * 0.01; // Animated dash
      ctx.stroke();
      ctx.setLineDash([]); // Reset dash
      
      ctx.restore();
      
      // Draw emoji
      ctx.font = `${obj.size * 0.7}px Arial`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = '#ffffff';
      ctx.fillText(obj.emoji, obj.x, obj.y - 2);
      
      // Draw name
      ctx.font = '11px Arial';
      ctx.fillStyle = '#ffffff';
      ctx.strokeStyle = 'rgba(0,0,0,0.8)';
      ctx.lineWidth = 3;
      ctx.strokeText(obj.name, obj.x, obj.y + obj.size + 15);
      ctx.fillText(obj.name, obj.x, obj.y + obj.size + 15);
    });

    // Spawn new objects with progressive difficulty
    if (Math.random() < spawnRate) {
      gameObjectsRef.current.push(createGameObject());
    }

    // Draw difficulty indicator
    ctx.save();
    ctx.fillStyle = `rgba(255, 255, 255, 0.8)`;
    ctx.font = 'bold 14px Arial';
    ctx.textAlign = 'right';
    ctx.fillText(`Difficulty Level: ${difficultyLevel}`, canvas.width - 20, 25);
    ctx.restore();

    // Update timer
    setTimeLeft(prev => {
      const newTime = prev - (1/60);
      if (newTime <= 0) {
        setIsPlaying(false);
        onChallengeComplete(`Recovery Shooter Completed - Level ${difficultyLevel}`, score + (difficultyLevel * 100));
        return 0;
      }
      return newTime;
    });

    animationRef.current = requestAnimationFrame(gameLoop);
  }, [isPlaying, createGameObject, onChallengeComplete, onToolCollect, score, timeLeft]);

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
    // Reset player to center and bottom
    playerRef.current = { 
      x: canvasSize.width / 2, 
      y: canvasSize.height - 80, 
      width: 40, 
      height: 30 
    };
    
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
            <p>• A/D or Arrow Keys: Move ship left/right</p>
            <p>• W/S or Up/Down Arrows: Move ship up/down</p>
            <p>• Spacebar or Click: Shoot projectiles</p>
            <p>• Difficulty increases every 10 seconds!</p>
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

  // Game Over Screen
  if (!isPlaying && timeLeft === 0) {
    const finalLevel = Math.floor((60 - timeLeft) / 10) + 1;
    return (
      <div ref={containerRef} className="relative h-[500px] bg-gradient-to-br from-indigo-900/20 via-purple-900/20 to-pink-900/20 flex flex-col items-center justify-center border-2 border-primary/20 rounded-lg">
        <div className="text-center space-y-6 max-w-md">
          <div className="space-y-2">
            <h3 className="text-3xl font-bold gradient-text">Game Complete!</h3>
            <div className="space-y-1">
              <p className="text-xl font-semibold text-primary">Final Score: {score}</p>
              <p className="text-muted-foreground">Reached Level: {finalLevel}</p>
            </div>
          </div>
          
          <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
            <p className="text-sm text-muted-foreground">
              Great job on your recovery journey! You've successfully navigated through challenges and collected valuable tools.
            </p>
          </div>

          <div className="flex gap-3">
            <Button 
              onClick={startGame}
              size="lg"
              className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90"
            >
              <Play className="h-5 w-5 mr-2" />
              Play Again
            </Button>
          </div>
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
          <p>• WASD or Arrow Keys: Move ship</p>
          <p>• Spacebar/Click: Shoot</p>
          <p>• Shoot red bad habits</p>
          <p>• Fly into green recovery tools</p>
          <p>• Difficulty increases over time!</p>
        </div>
      </div>
    </div>
  );
};