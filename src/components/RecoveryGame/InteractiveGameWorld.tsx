import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, Zap, Shield, Users, Star, Gift, X, Plus, Target, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { GameState } from './RecoveryGame';

interface InteractiveGameWorldProps {
  gameState: GameState;
  onChallengeComplete: (challenge: string, points: number) => void;
  onToolCollect: (tool: string) => void;
}

interface FallingItem {
  id: string;
  type: 'temptation' | 'tool' | 'challenge';
  x: number;
  y: number;
  speed: number;
  icon: React.ReactNode;
  name: string;
  points: number;
  color: string;
}

interface PlayerPosition {
  x: number;
  y: number;
}

export const InteractiveGameWorld: React.FC<InteractiveGameWorldProps> = ({
  gameState,
  onChallengeComplete,
  onToolCollect,
}) => {
  const [gameActive, setGameActive] = useState(false);
  const [fallingItems, setFallingItems] = useState<FallingItem[]>([]);
  const [playerPos, setPlayerPos] = useState<PlayerPosition>({ x: 50, y: 85 });
  const [score, setScore] = useState(0);
  const [gameTime, setGameTime] = useState(30);
  const [combo, setCombo] = useState(0);
  const gameLoopRef = useRef<NodeJS.Timeout>();
  const spawnRef = useRef<NodeJS.Timeout>();
  const gameAreaRef = useRef<HTMLDivElement>(null);

  const temptationItems = [
    { name: 'Alcohol', icon: '🍷', color: 'bg-red-500', points: -50 },
    { name: 'Cigarettes', icon: '🚬', color: 'bg-gray-500', points: -50 },
    { name: 'Drugs', icon: '💊', color: 'bg-purple-500', points: -50 },
    { name: 'Gambling', icon: '🎰', color: 'bg-yellow-600', points: -50 },
  ];

  const recoveryItems = [
    { name: 'Meditation', icon: <Heart className="h-4 w-4" />, color: 'bg-green-500', points: 100 },
    { name: 'Exercise', icon: <Zap className="h-4 w-4" />, color: 'bg-blue-500', points: 150 },
    { name: 'Support', icon: <Users className="h-4 w-4" />, color: 'bg-purple-500', points: 125 },
    { name: 'Therapy', icon: <Shield className="h-4 w-4" />, color: 'bg-teal-500', points: 200 },
  ];

  const spawnItem = useCallback(() => {
    if (!gameActive) return;

    const isTemptation = Math.random() < 0.4; // 40% chance for temptations
    const items = isTemptation ? temptationItems : recoveryItems;
    const item = items[Math.floor(Math.random() * items.length)];
    
    const newItem: FallingItem = {
      id: Math.random().toString(36).substr(2, 9),
      type: isTemptation ? 'temptation' : (Math.random() < 0.7 ? 'tool' : 'challenge'),
      x: Math.random() * 80 + 10, // Keep items within bounds
      y: -5,
      speed: Math.random() * 2 + 1.5,
      icon: typeof item.icon === 'string' ? item.icon : item.icon,
      name: item.name,
      points: isTemptation ? -50 : (item.points || 100),
      color: item.color,
    };

    setFallingItems(prev => [...prev, newItem]);
  }, [gameActive]);

  const movePlayer = useCallback((direction: 'left' | 'right') => {
    setPlayerPos(prev => {
      const newX = direction === 'left' 
        ? Math.max(5, prev.x - 8) 
        : Math.min(95, prev.x + 8);
      return { ...prev, x: newX };
    });
  }, []);

  const handleItemClick = useCallback((item: FallingItem) => {
    if (item.type === 'temptation') {
      // Throw away temptation - good!
      setScore(prev => prev + 75);
      setCombo(prev => prev + 1);
      onChallengeComplete(`Resisted ${item.name}`, 75);
    } else {
      // Collect recovery item
      setScore(prev => prev + item.points);
      setCombo(prev => prev + 1);
      
      if (item.type === 'tool') {
        onToolCollect(item.name);
      } else {
        onChallengeComplete(item.name, item.points);
      }
    }

    // Remove the item
    setFallingItems(prev => prev.filter(i => i.id !== item.id));
  }, [onChallengeComplete, onToolCollect]);

  const gameLoop = useCallback(() => {
    setFallingItems(prev => {
      return prev
        .map(item => ({ ...item, y: item.y + item.speed }))
        .filter(item => {
          if (item.y > 100) {
            // Item fell off screen
            if (item.type !== 'temptation') {
              // Missed a good item - reset combo
              setCombo(0);
            }
            return false;
          }
          return true;
        });
    });
  }, []);

  const startGame = () => {
    setGameActive(true);
    setScore(0);
    setCombo(0);
    setGameTime(30);
    setFallingItems([]);
    setPlayerPos({ x: 50, y: 85 });

    // Start game loops
    gameLoopRef.current = setInterval(gameLoop, 50);
    spawnRef.current = setInterval(spawnItem, 1500);

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

    setTimeout(() => clearInterval(timer), 30000);
  };

  const endGame = () => {
    setGameActive(false);
    if (gameLoopRef.current) clearInterval(gameLoopRef.current);
    if (spawnRef.current) clearInterval(spawnRef.current);
    
    // Award final bonus based on performance
    const bonusPoints = combo * 10;
    if (bonusPoints > 0) {
      onChallengeComplete(`Game Completion Bonus (${combo}x combo)`, bonusPoints);
    }
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!gameActive) return;
      
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        movePlayer('left');
      } else if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        movePlayer('right');
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [gameActive, movePlayer]);

  useEffect(() => {
    return () => {
      if (gameLoopRef.current) clearInterval(gameLoopRef.current);
      if (spawnRef.current) clearInterval(spawnRef.current);
    };
  }, []);

  if (!gameActive && fallingItems.length === 0) {
    return (
      <div className="relative h-[500px] bg-gradient-to-br from-indigo-900/20 via-purple-900/20 to-pink-900/20 flex flex-col items-center justify-center">
        <div className="text-center space-y-6 max-w-md">
          <div className="space-y-2">
            <h3 className="text-2xl font-bold gradient-text">Recovery Challenge Arena</h3>
            <p className="text-muted-foreground">
              Test your recovery skills in this interactive mini-game!
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="p-3 bg-green-500/10 rounded-lg border border-green-500/20">
              <div className="flex items-center gap-2 mb-1">
                <Heart className="h-4 w-4 text-green-500" />
                <span className="font-semibold text-green-500">Collect Good</span>
              </div>
              <p className="text-xs text-muted-foreground">Meditation, Exercise, Support</p>
            </div>
            
            <div className="p-3 bg-red-500/10 rounded-lg border border-red-500/20">
              <div className="flex items-center gap-2 mb-1">
                <X className="h-4 w-4 text-red-500" />
                <span className="font-semibold text-red-500">Throw Away Bad</span>
              </div>
              <p className="text-xs text-muted-foreground">Alcohol, Drugs, Cigarettes</p>
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">
              Use arrow keys or A/D to move • Click items to interact
            </p>
            <p className="text-xs text-muted-foreground">
              Build combos for bonus points!
            </p>
          </div>

          <Button 
            onClick={startGame}
            size="lg"
            className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90"
          >
            <Target className="h-5 w-5 mr-2" />
            Start Recovery Challenge
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div 
      ref={gameAreaRef}
      className="relative h-[500px] bg-gradient-to-br from-indigo-900/20 via-purple-900/20 to-pink-900/20 overflow-hidden border-2 border-primary/20 rounded-lg"
    >
      {/* Game UI */}
      <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-30">
        <div className="flex gap-4">
          <Badge className="bg-primary/10 text-primary border-primary/20">
            Time: {gameTime}s
          </Badge>
          <Badge className="bg-secondary/10 text-secondary border-secondary/20">
            Score: {score}
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

      {/* Falling Items */}
      {fallingItems.map(item => (
        <div
          key={item.id}
          className={cn(
            "absolute w-12 h-12 rounded-full flex items-center justify-center cursor-pointer transition-transform hover:scale-110 shadow-lg z-20",
            item.color,
            item.type === 'temptation' && "animate-pulse border-2 border-red-500"
          )}
          style={{
            left: `${item.x}%`,
            top: `${item.y}%`,
            transform: 'translate(-50%, -50%)',
          }}
          onClick={() => handleItemClick(item)}
        >
          {typeof item.icon === 'string' ? (
            <span className="text-2xl">{item.icon}</span>
          ) : (
            <div className="text-white">{item.icon}</div>
          )}
          
          {/* Item tooltip */}
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-card/90 backdrop-blur-sm border border-border rounded px-2 py-1 text-xs whitespace-nowrap">
            {item.type === 'temptation' ? 'Throw away!' : `+${item.points}`}
          </div>
        </div>
      ))}

      {/* Player */}
      <div
        className="absolute w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center shadow-lg z-10 transition-all duration-200"
        style={{
          left: `${playerPos.x}%`,
          top: `${playerPos.y}%`,
          transform: 'translate(-50%, -50%)',
        }}
      >
        <Users className="h-8 w-8 text-white" />
      </div>

      {/* Movement Controls */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-30">
        <Button
          variant="outline"
          size="sm"
          onMouseDown={() => movePlayer('left')}
          className="border-primary/20"
        >
          ← Left
        </Button>
        <Button
          variant="outline"
          size="sm"
          onMouseDown={() => movePlayer('right')}
          className="border-primary/20"
        >
          Right →
        </Button>
      </div>

      {/* Instructions */}
      <div className="absolute bottom-4 right-4 bg-card/80 backdrop-blur-sm rounded-lg p-2 border border-border text-xs z-30">
        <p>Arrow keys or A/D to move</p>
        <p>Click items to interact</p>
      </div>
    </div>
  );
};