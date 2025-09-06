import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Trophy, Medal, Award, Crown } from 'lucide-react';

interface LeaderboardProps {
  currentUserScore: number;
}

export const Leaderboard: React.FC<LeaderboardProps> = ({ currentUserScore }) => {
  // Mock leaderboard data - in real app, this would come from backend
  const leaderboardData = [
    { name: "Sarah M.", score: 15420, level: 12, streak: 45, team: "Phoenix Rising" },
    { name: "Michael R.", score: 12350, level: 10, streak: 32, team: "New Beginnings" },
    { name: "Emily J.", score: 11890, level: 9, streak: 28, team: "Strength United" },
    { name: "David L.", score: 9760, level: 8, streak: 21, team: "Phoenix Rising" },
    { name: "Lisa K.", score: 8920, level: 7, streak: 19, team: "Hope Warriors" },
    { name: "You", score: currentUserScore, level: 1, streak: 0, team: "None" },
  ].sort((a, b) => b.score - a.score);

  const getRankIcon = (index: number) => {
    switch (index) {
      case 0: return <Crown className="h-5 w-5 text-yellow-500" />;
      case 1: return <Trophy className="h-5 w-5 text-gray-400" />;
      case 2: return <Medal className="h-5 w-5 text-amber-600" />;
      default: return <Award className="h-5 w-5 text-muted-foreground" />;
    }
  };

  const getRankBadge = (index: number) => {
    switch (index) {
      case 0: return <Badge className="bg-gradient-to-r from-yellow-400 to-yellow-600">Champion</Badge>;
      case 1: return <Badge className="bg-gradient-to-r from-gray-300 to-gray-500">Master</Badge>;
      case 2: return <Badge className="bg-gradient-to-r from-amber-400 to-amber-600">Expert</Badge>;
      default: return <Badge variant="outline">Player</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Weekly Challenge */}
      <Card className="bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-primary" />
            Weekly Challenge
          </CardTitle>
          <CardDescription>
            Complete 20 daily challenges this week to earn the "Consistency Champion" badge
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">Progress: 12/20 challenges</div>
            <Badge variant="secondary">4 days left</Badge>
          </div>
        </CardContent>
      </Card>

      {/* Global Leaderboard */}
      <Card className="border-primary/10">
        <CardHeader>
          <CardTitle>Global Leaderboard</CardTitle>
          <CardDescription>Top recovery journey participants worldwide</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {leaderboardData.map((player, index) => (
              <div
                key={index}
                className={`flex items-center gap-4 p-4 rounded-lg border transition-colors ${
                  player.name === "You" 
                    ? "bg-primary/5 border-primary/20" 
                    : "bg-muted/30 border-border hover:bg-muted/50"
                }`}
              >
                <div className="flex items-center gap-2 min-w-[60px]">
                  {getRankIcon(index)}
                  <span className="font-bold text-lg">#{index + 1}</span>
                </div>
                
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-primary/10 text-primary">
                    {player.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`font-semibold ${player.name === "You" ? "text-primary" : ""}`}>
                      {player.name}
                    </span>
                    {getRankBadge(index)}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>Level {player.level}</span>
                    <span>🔥 {player.streak} days</span>
                    <span>Team: {player.team}</span>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="font-bold text-lg">{player.score.toLocaleString()}</div>
                  <div className="text-sm text-muted-foreground">points</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Team Leaderboard */}
      <Card className="border-secondary/10">
        <CardHeader>
          <CardTitle>Team Leaderboard</CardTitle>
          <CardDescription>Top performing recovery teams this month</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { name: "Phoenix Rising", members: 124, avgScore: 8420, totalScore: 1044080 },
              { name: "New Beginnings", members: 98, avgScore: 7890, totalScore: 773220 },
              { name: "Strength United", members: 156, avgScore: 6750, totalScore: 1053000 },
              { name: "Hope Warriors", members: 87, avgScore: 7120, totalScore: 619440 },
            ].map((team, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 rounded-lg bg-muted/30 border border-border"
              >
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    {getRankIcon(index)}
                    <span className="font-bold">#{index + 1}</span>
                  </div>
                  <div>
                    <div className="font-semibold">{team.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {team.members} members • Avg: {team.avgScore.toLocaleString()} pts
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold">{team.totalScore.toLocaleString()}</div>
                  <div className="text-sm text-muted-foreground">total points</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};