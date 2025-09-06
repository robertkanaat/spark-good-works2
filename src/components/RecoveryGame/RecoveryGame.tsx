import React, { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Text, Environment, Stars } from '@react-three/drei';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Trophy, Users, Target, Zap, Heart, Shield } from 'lucide-react';
import { GameScene } from './GameScene';
import { GameStats } from './GameStats';
import { Leaderboard } from './Leaderboard';
import { TeamsSection } from './TeamsSection';
import { toast } from 'sonner';

export interface GameState {
  level: number;
  score: number;
  health: number;
  energy: number;
  challenges_completed: number;
  recovery_tools: string[];
  achievements: string[];
  team?: string;
  streak_days: number;
}

export const RecoveryGame: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>({
    level: 1,
    score: 0,
    health: 100,
    energy: 80,
    challenges_completed: 0,
    recovery_tools: [],
    achievements: [],
    streak_days: 0,
  });

  const [isGameActive, setIsGameActive] = useState(false);
  const [showGame, setShowGame] = useState(false);

  useEffect(() => {
    // Load game state from localStorage
    const savedState = localStorage.getItem('recoveryGameState');
    if (savedState) {
      setGameState(JSON.parse(savedState));
    }
  }, []);

  useEffect(() => {
    // Save game state to localStorage
    localStorage.setItem('recoveryGameState', JSON.stringify(gameState));
  }, [gameState]);

  const startGame = () => {
    setIsGameActive(true);
    setShowGame(true);
    toast.success("Recovery Journey started! Navigate through the challenges!");
  };

  const completeChallenge = (challenge: string, points: number) => {
    setGameState(prev => ({
      ...prev,
      score: prev.score + points,
      challenges_completed: prev.challenges_completed + 1,
      energy: Math.min(prev.energy + 10, 100),
      level: Math.floor((prev.challenges_completed + 1) / 5) + 1,
    }));
    
    toast.success(`Challenge "${challenge}" completed! +${points} points`);
  };

  const collectTool = (tool: string) => {
    setGameState(prev => ({
      ...prev,
      recovery_tools: [...prev.recovery_tools, tool],
      score: prev.score + 50,
    }));
    
    toast.success(`Recovery tool "${tool}" collected!`);
  };

  const joinTeam = (teamName: string) => {
    setGameState(prev => ({
      ...prev,
      team: teamName,
    }));
    
    toast.success(`Joined team "${teamName}"!`);
  };

  if (showGame) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="container mx-auto px-4 py-8">
          {/* Game Header */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold gradient-text">Recovery Journey</h1>
              <p className="text-muted-foreground">Navigate challenges and build resilience</p>
            </div>
            <Button 
              variant="outline" 
              onClick={() => setShowGame(false)}
              className="border-primary/20"
            >
              Return to Overview
            </Button>
          </div>

          {/* Game Stats Bar */}
          <GameStats gameState={gameState} />

          {/* 3D Game Scene */}
          <Card className="mb-8 overflow-hidden bg-gradient-to-br from-card via-card/95 to-muted/20 border-primary/10">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                Recovery World - Level {gameState.level}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="h-[500px] w-full">
                <Canvas camera={{ position: [0, 5, 10], fov: 60 }}>
                  <Suspense fallback={null}>
                    <Environment preset="sunset" />
                    <Stars />
                    <GameScene 
                      gameState={gameState}
                      onChallengeComplete={completeChallenge}
                      onToolCollect={collectTool}
                    />
                    <OrbitControls enablePan={false} enableZoom={true} enableRotate={true} />
                  </Suspense>
                </Canvas>
              </div>
              <div className="p-4 bg-gradient-to-r from-primary/5 to-secondary/5">
                <p className="text-sm text-muted-foreground text-center">
                  Click and drag to explore • Scroll to zoom • Click objects to interact
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Game Tabs */}
          <Tabs defaultValue="challenges" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="challenges">Daily Challenges</TabsTrigger>
              <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
              <TabsTrigger value="teams">Teams</TabsTrigger>
            </TabsList>

            <TabsContent value="challenges" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {[
                  { name: "Mindful Meditation", description: "Complete a 10-minute meditation", points: 100, icon: Heart, difficulty: "Easy" },
                  { name: "Gratitude Practice", description: "Write down 3 things you're grateful for", points: 75, icon: Shield, difficulty: "Easy" },
                  { name: "Physical Activity", description: "Exercise for 30 minutes", points: 150, icon: Zap, difficulty: "Medium" },
                  { name: "Social Connection", description: "Reach out to a supportive friend", points: 125, icon: Users, difficulty: "Medium" },
                  { name: "Skill Building", description: "Learn something new for recovery", points: 200, icon: Target, difficulty: "Hard" },
                  { name: "Service to Others", description: "Help someone in their recovery", points: 250, icon: Trophy, difficulty: "Hard" },
                ].map((challenge, index) => (
                  <Card key={index} className="hover-scale border-primary/10 bg-gradient-to-br from-card to-muted/20">
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <challenge.icon className="h-6 w-6 text-primary" />
                        <Badge variant={challenge.difficulty === 'Easy' ? 'secondary' : challenge.difficulty === 'Medium' ? 'default' : 'destructive'}>
                          {challenge.difficulty}
                        </Badge>
                      </div>
                      <CardTitle className="text-lg">{challenge.name}</CardTitle>
                      <CardDescription>{challenge.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-primary">+{challenge.points} points</span>
                        <Button 
                          size="sm" 
                          onClick={() => completeChallenge(challenge.name, challenge.points)}
                          className="bg-primary/10 hover:bg-primary/20 text-primary border-primary/20"
                          variant="outline"
                        >
                          Complete
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="leaderboard">
              <Leaderboard currentUserScore={gameState.score} />
            </TabsContent>

            <TabsContent value="teams">
              <TeamsSection currentTeam={gameState.team} onJoinTeam={joinTeam} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Game Preview Card */}
      <Card className="overflow-hidden bg-gradient-to-br from-primary/5 via-card to-secondary/5 border-primary/20">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl gradient-text mb-2">Recovery Journey Game</CardTitle>
              <CardDescription className="text-base">
                Embark on an interactive 3D journey through recovery challenges, collect tools, and build resilience with your community.
              </CardDescription>
            </div>
            <Trophy className="h-12 w-12 text-primary opacity-60" />
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Game Features */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="text-center p-4 rounded-lg bg-primary/5 border border-primary/10">
              <Target className="h-8 w-8 text-primary mx-auto mb-2" />
              <h3 className="font-semibold mb-1">Daily Challenges</h3>
              <p className="text-sm text-muted-foreground">Complete recovery-focused tasks</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-secondary/5 border border-secondary/10">
              <Users className="h-8 w-8 text-secondary mx-auto mb-2" />
              <h3 className="font-semibold mb-1">Team Support</h3>
              <p className="text-sm text-muted-foreground">Join recovery teams</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-primary/5 border border-primary/10">
              <Zap className="h-8 w-8 text-primary mx-auto mb-2" />
              <h3 className="font-semibold mb-1">Progress Tracking</h3>
              <p className="text-sm text-muted-foreground">Monitor your journey</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-secondary/5 border border-secondary/10">
              <Trophy className="h-8 w-8 text-secondary mx-auto mb-2" />
              <h3 className="font-semibold mb-1">Achievements</h3>
              <p className="text-sm text-muted-foreground">Unlock recovery milestones</p>
            </div>
          </div>

          {/* Current Progress */}
          {gameState.challenges_completed > 0 && (
            <div className="p-4 rounded-lg bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20">
              <h3 className="font-semibold mb-3">Your Progress</h3>
              <div className="grid gap-3 md:grid-cols-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Level {gameState.level}</span>
                    <span>{gameState.score} points</span>
                  </div>
                  <Progress value={(gameState.score % 1000) / 10} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Challenges</span>
                    <span>{gameState.challenges_completed}</span>
                  </div>
                  <Progress value={gameState.challenges_completed * 10} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Tools Collected</span>
                    <span>{gameState.recovery_tools.length}</span>
                  </div>
                  <Progress value={gameState.recovery_tools.length * 20} className="h-2" />
                </div>
              </div>
            </div>
          )}

          {/* Start Game Button */}
          <div className="text-center">
            <Button 
              onClick={startGame}
              size="lg"
              className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-primary-foreground px-8 py-4"
            >
              {gameState.challenges_completed > 0 ? 'Continue Journey' : 'Start Recovery Journey'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};