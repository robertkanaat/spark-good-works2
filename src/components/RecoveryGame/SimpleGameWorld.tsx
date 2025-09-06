import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, Zap, Shield, Users, Star, Gift } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { GameState } from './RecoveryGame';

interface SimpleGameWorldProps {
  gameState: GameState;
  onChallengeComplete: (challenge: string, points: number) => void;
  onToolCollect: (tool: string) => void;
}

export const SimpleGameWorld: React.FC<SimpleGameWorldProps> = ({
  gameState,
  onChallengeComplete,
  onToolCollect,
}) => {
  const [hoveredChallenge, setHoveredChallenge] = useState<string | null>(null);
  const [hoveredTool, setHoveredTool] = useState<string | null>(null);

  const challenges = [
    { id: 'meditation', name: 'Meditation', icon: Heart, color: 'bg-green-500', position: { x: 20, y: 30 } },
    { id: 'exercise', name: 'Exercise', icon: Zap, color: 'bg-blue-500', position: { x: 70, y: 20 } },
    { id: 'gratitude', name: 'Gratitude', icon: Shield, color: 'bg-yellow-500', position: { x: 50, y: 60 } },
    { id: 'connection', name: 'Connection', icon: Users, color: 'bg-pink-500', position: { x: 15, y: 70 } },
  ];

  const tools = [
    { id: 'mindfulness', name: 'Mindfulness', position: { x: 35, y: 25 } },
    { id: 'resilience', name: 'Resilience', position: { x: 80, y: 50 } },
    { id: 'support', name: 'Support', position: { x: 25, y: 80 } },
    { id: 'wisdom', name: 'Wisdom', position: { x: 65, y: 75 } },
  ];

  return (
    <div className="relative h-[500px] bg-gradient-to-br from-indigo-900/20 via-purple-900/20 to-pink-900/20 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5" />
      
      {/* Animated background shapes */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-primary/10 rounded-full animate-pulse" />
      <div className="absolute top-20 right-20 w-16 h-16 bg-secondary/10 rounded-full animate-pulse delay-300" />
      <div className="absolute bottom-20 left-1/3 w-12 h-12 bg-primary/20 rounded-full animate-pulse delay-700" />
      
      {/* Level indicator */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-20">
        <Badge className="bg-gradient-to-r from-primary to-secondary text-white px-4 py-2 text-lg">
          <Star className="h-4 w-4 mr-2" />
          Level {gameState.level}
        </Badge>
      </div>

      {/* Recovery Path */}
      <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 1 }}>
        <defs>
          <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.3" />
            <stop offset="100%" stopColor="hsl(var(--secondary))" stopOpacity="0.3" />
          </linearGradient>
        </defs>
        <path
          d="M 50 50 Q 200 100 350 150 T 450 300"
          stroke="url(#pathGradient)"
          strokeWidth="4"
          fill="none"
          strokeDasharray="8,4"
          className="animate-pulse"
        />
      </svg>

      {/* Challenges */}
      {challenges.map((challenge) => {
        const isHovered = hoveredChallenge === challenge.id;
        const IconComponent = challenge.icon;
        
        return (
          <div
            key={challenge.id}
            className={cn(
              "absolute w-16 h-16 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 hover-scale shadow-lg",
              challenge.color,
              isHovered && "scale-125 shadow-xl"
            )}
            style={{
              left: `${challenge.position.x}%`,
              top: `${challenge.position.y}%`,
              zIndex: 10,
            }}
            onMouseEnter={() => setHoveredChallenge(challenge.id)}
            onMouseLeave={() => setHoveredChallenge(null)}
            onClick={() => onChallengeComplete(challenge.name, 100)}
          >
            <IconComponent className="h-8 w-8 text-white" />
            
            {/* Challenge tooltip */}
            {isHovered && (
              <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-card border border-border rounded-lg px-3 py-2 shadow-lg">
                <div className="text-sm font-semibold text-center">{challenge.name}</div>
                <div className="text-xs text-muted-foreground text-center">+100 points</div>
              </div>
            )}
          </div>
        );
      })}

      {/* Recovery Tools */}
      {tools.map((tool) => {
        const isCollected = gameState.recovery_tools.includes(tool.name);
        const isHovered = hoveredTool === tool.id;
        
        if (isCollected) return null;
        
        return (
          <div
            key={tool.id}
            className={cn(
              "absolute w-12 h-12 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center cursor-pointer transition-all duration-300 hover-scale shadow-lg animate-pulse",
              isHovered && "scale-125 shadow-xl"
            )}
            style={{
              left: `${tool.position.x}%`,
              top: `${tool.position.y}%`,
              zIndex: 10,
            }}
            onMouseEnter={() => setHoveredTool(tool.id)}
            onMouseLeave={() => setHoveredTool(null)}
            onClick={() => onToolCollect(tool.name)}
          >
            <Gift className="h-6 w-6 text-white" />
            
            {/* Tool tooltip */}
            {isHovered && (
              <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-card border border-border rounded-lg px-3 py-2 shadow-lg">
                <div className="text-sm font-semibold text-center">{tool.name}</div>
                <div className="text-xs text-muted-foreground text-center">+50 points</div>
              </div>
            )}
          </div>
        );
      })}

      {/* Instructions */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-center z-20">
        <p className="text-sm text-muted-foreground bg-card/80 backdrop-blur-sm rounded-lg px-4 py-2 border border-border">
          Click challenges to complete them • Collect golden recovery tools
        </p>
      </div>

      {/* Progress indicator */}
      <div className="absolute top-4 right-4 bg-card/80 backdrop-blur-sm rounded-lg p-3 border border-border">
        <div className="text-sm font-semibold">Progress</div>
        <div className="text-xs text-muted-foreground">
          Challenges: {gameState.challenges_completed}
        </div>
        <div className="text-xs text-muted-foreground">
          Tools: {gameState.recovery_tools.length}/4
        </div>
      </div>
    </div>
  );
};