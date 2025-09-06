import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Heart, Zap, Trophy, Target } from 'lucide-react';
import type { GameState } from './RecoveryGame';

interface GameStatsProps {
  gameState: GameState;
}

export const GameStats: React.FC<GameStatsProps> = ({ gameState }) => {
  return (
    <Card className="mb-6 bg-gradient-to-r from-primary/5 via-card to-secondary/5 border-primary/20">
      <CardContent className="p-4">
        <div className="grid gap-4 md:grid-cols-4">
          {/* Level & Score */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Trophy className="h-4 w-4 text-primary" />
              <span className="font-semibold">Level {gameState.level}</span>
            </div>
            <div className="text-sm text-muted-foreground">Score: {gameState.score.toLocaleString()}</div>
            <Progress 
              value={(gameState.score % 1000) / 10} 
              className="h-2"
            />
          </div>

          {/* Health */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Heart className="h-4 w-4 text-red-500" />
              <span className="font-semibold">Health</span>
            </div>
            <div className="text-sm text-muted-foreground">{gameState.health}/100</div>
            <Progress 
              value={gameState.health} 
              className="h-2"
            />
          </div>

          {/* Energy */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-yellow-500" />
              <span className="font-semibold">Energy</span>
            </div>
            <div className="text-sm text-muted-foreground">{gameState.energy}/100</div>
            <Progress 
              value={gameState.energy} 
              className="h-2"
            />
          </div>

          {/* Challenges */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Target className="h-4 w-4 text-blue-500" />
              <span className="font-semibold">Challenges</span>
            </div>
            <div className="text-sm text-muted-foreground">{gameState.challenges_completed} completed</div>
            <Progress 
              value={gameState.challenges_completed * 5} 
              className="h-2"
            />
          </div>
        </div>

        {/* Recovery Tools & Achievements */}
        <div className="mt-4 pt-4 border-t border-border">
          <div className="flex flex-wrap gap-2 mb-2">
            <span className="text-sm font-medium">Recovery Tools:</span>
            {gameState.recovery_tools.length > 0 ? (
              gameState.recovery_tools.map((tool, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {tool}
                </Badge>
              ))
            ) : (
              <span className="text-xs text-muted-foreground">None collected yet</span>
            )}
          </div>
          
          {gameState.achievements.length > 0 && (
            <div className="flex flex-wrap gap-2">
              <span className="text-sm font-medium">Achievements:</span>
              {gameState.achievements.map((achievement, index) => (
                <Badge key={index} variant="default" className="text-xs">
                  {achievement}
                </Badge>
              ))}
            </div>
          )}

          {gameState.streak_days > 0 && (
            <div className="mt-2">
              <Badge variant="outline" className="text-xs">
                🔥 {gameState.streak_days} day streak
              </Badge>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};