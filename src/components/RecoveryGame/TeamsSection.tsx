import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Users, Crown, Shield, Heart, Star, Search, Plus } from 'lucide-react';

interface TeamsSectionProps {
  currentTeam?: string;
  onJoinTeam: (teamName: string) => void;
}

export const TeamsSection: React.FC<TeamsSectionProps> = ({ currentTeam, onJoinTeam }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);

  const teams = [
    {
      name: "Phoenix Rising",
      description: "Rising from the ashes stronger than before",
      members: 124,
      level: "Elite",
      icon: "🔥",
      color: "from-orange-500 to-red-500",
      focus: "Motivation & Inspiration",
      challenges_completed: 2847,
    },
    {
      name: "New Beginnings",
      description: "Every day is a fresh start on the recovery journey",
      members: 98,
      level: "Advanced",
      icon: "🌅",
      color: "from-blue-500 to-cyan-500",
      focus: "Daily Habits & Routines",
      challenges_completed: 2103,
    },
    {
      name: "Strength United",
      description: "Together we are stronger than our struggles",
      members: 156,
      level: "Master",
      icon: "💪",
      color: "from-purple-500 to-pink-500",
      focus: "Peer Support & Community",
      challenges_completed: 3421,
    },
    {
      name: "Hope Warriors",
      description: "Fighting for hope and healing every day",
      members: 87,
      level: "Advanced",
      icon: "⚔️",
      color: "from-green-500 to-emerald-500",
      focus: "Mental Health & Wellness",
      challenges_completed: 1876,
    },
    {
      name: "Mindful Hearts",
      description: "Cultivating mindfulness and emotional wellness",
      members: 72,
      level: "Intermediate",
      icon: "🧘",
      color: "from-teal-500 to-blue-500",
      focus: "Meditation & Mindfulness",
      challenges_completed: 1654,
    },
    {
      name: "Recovery Rangers",
      description: "Exploring new paths to recovery and growth",
      members: 63,
      level: "Intermediate",
      icon: "🏔️",
      color: "from-indigo-500 to-purple-500",
      focus: "Adventure & Outdoor Activities",
      challenges_completed: 1432,
    },
  ];

  const filteredTeams = teams.filter(team =>
    team.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    team.focus.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getLevelBadge = (level: string) => {
    const colors = {
      "Elite": "bg-gradient-to-r from-yellow-400 to-orange-500",
      "Master": "bg-gradient-to-r from-purple-500 to-pink-500",
      "Advanced": "bg-gradient-to-r from-blue-500 to-cyan-500",
      "Intermediate": "bg-gradient-to-r from-green-500 to-emerald-500",
    };
    return colors[level as keyof typeof colors] || "bg-gray-500";
  };

  const getLevelIcon = (level: string) => {
    switch (level) {
      case "Elite": return <Crown className="h-4 w-4" />;
      case "Master": return <Shield className="h-4 w-4" />;
      case "Advanced": return <Star className="h-4 w-4" />;
      default: return <Heart className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Current Team */}
      {currentTeam && (
        <Card className="bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              Your Team: {currentTeam}
            </CardTitle>
            <CardDescription>
              You're part of an amazing recovery community!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <div className="text-2xl">🔥</div>
              <div>
                <div className="font-semibold">Team Challenge Progress</div>
                <div className="text-sm text-muted-foreground">
                  Help your team complete 500 challenges this week
                </div>
              </div>
              <Badge variant="secondary">347/500</Badge>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Search and Create */}
      <div className="flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search teams by name or focus area..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button
          onClick={() => setShowCreateForm(!showCreateForm)}
          variant="outline"
          className="flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Create Team
        </Button>
      </div>

      {/* Create Team Form */}
      {showCreateForm && (
        <Card className="border-primary/20">
          <CardHeader>
            <CardTitle>Create New Team</CardTitle>
            <CardDescription>Start your own recovery support community</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input placeholder="Team name" />
            <Input placeholder="Team description" />
            <Input placeholder="Focus area (e.g., Meditation, Exercise)" />
            <div className="flex gap-2">
              <Button className="bg-primary/10 hover:bg-primary/20 text-primary border-primary/20" variant="outline">
                Create Team
              </Button>
              <Button variant="ghost" onClick={() => setShowCreateForm(false)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Available Teams */}
      <div className="grid gap-4 md:grid-cols-2">
        {filteredTeams.map((team, index) => (
          <Card key={index} className="hover-scale border-primary/10 bg-gradient-to-br from-card to-muted/20">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="text-2xl">{team.icon}</div>
                  <div>
                    <CardTitle className="text-lg">{team.name}</CardTitle>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge className={`text-white text-xs ${getLevelBadge(team.level)}`}>
                        {getLevelIcon(team.level)}
                        <span className="ml-1">{team.level}</span>
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        <Users className="h-3 w-3 mr-1" />
                        {team.members}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
              <CardDescription className="mt-2">{team.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Focus:</span>
                  <span className="font-medium">{team.focus}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Challenges completed:</span>
                  <span className="font-medium">{team.challenges_completed.toLocaleString()}</span>
                </div>
              </div>

              {/* Recent Members */}
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Recent members:</span>
                <div className="flex -space-x-2">
                  {Array.from({ length: 5 }, (_, i) => (
                    <Avatar key={i} className="h-6 w-6 border-2 border-background">
                      <AvatarFallback className="text-xs bg-primary/10 text-primary">
                        {String.fromCharCode(65 + i)}
                      </AvatarFallback>
                    </Avatar>
                  ))}
                </div>
                <span className="text-xs text-muted-foreground">+{team.members - 5} more</span>
              </div>

              <Button
                onClick={() => onJoinTeam(team.name)}
                disabled={currentTeam === team.name}
                className="w-full"
                variant={currentTeam === team.name ? "secondary" : "default"}
              >
                {currentTeam === team.name ? "Current Team" : "Join Team"}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredTeams.length === 0 && (
        <Card className="text-center py-8">
          <CardContent>
            <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-semibold mb-2">No teams found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search or create a new team.
            </p>
            <Button onClick={() => setShowCreateForm(true)}>
              Create New Team
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};