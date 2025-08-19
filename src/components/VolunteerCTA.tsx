import { ArrowRight, Heart, Users, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const VolunteerCTA = () => {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Enhanced background with multi-color gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-primary/10 to-orange-500/10" />
      <div className="absolute inset-0 bg-gradient-to-tl from-pink-500/5 via-transparent to-blue-500/5" />
      
      {/* Floating multi-colored hearts */}
      <div className="absolute top-16 left-16 opacity-60">
        <Heart className="w-6 h-6 text-purple-500 animate-bounce" style={{ animationDelay: '0s', animationDuration: '3s' }} />
      </div>
      <div className="absolute top-32 right-20 opacity-50">
        <Heart className="w-4 h-4 text-pink-500 animate-bounce" style={{ animationDelay: '1s', animationDuration: '2.5s' }} />
      </div>
      <div className="absolute bottom-24 left-24 opacity-70">
        <Heart className="w-5 h-5 text-red-500 animate-bounce" style={{ animationDelay: '2s', animationDuration: '4s' }} />
      </div>
      <div className="absolute bottom-40 right-16 opacity-40">
        <Heart className="w-3 h-3 text-orange-500 animate-bounce" style={{ animationDelay: '0.5s', animationDuration: '3.5s' }} />
      </div>
      <div className="absolute top-1/2 left-8 opacity-50">
        <Heart className="w-4 h-4 text-blue-500 animate-bounce" style={{ animationDelay: '1.5s', animationDuration: '2.8s' }} />
      </div>
      
      {/* Floating sparkles */}
      <div className="absolute top-20 right-32 opacity-30">
        <Sparkles className="w-6 h-6 text-purple-400 animate-pulse" style={{ animationDelay: '0.5s' }} />
      </div>
      <div className="absolute bottom-16 left-32 opacity-40">
        <Sparkles className="w-5 h-5 text-pink-400 animate-pulse" style={{ animationDelay: '2s' }} />
      </div>
      
      <div className="container mx-auto px-4 relative">
        <div className="max-w-4xl mx-auto">
          <Card className="overflow-hidden bg-gradient-to-r from-background/95 to-background/90 backdrop-blur-sm border-purple-200/30 shadow-2xl shadow-purple-500/10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              {/* Content side */}
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 rounded-full bg-gradient-to-r from-purple-500/20 to-primary/20">
                    <Users className="w-6 h-6 text-purple-600" />
                  </div>
                  <span className="text-sm font-semibold bg-gradient-to-r from-purple-600 to-primary bg-clip-text text-transparent uppercase tracking-wide">
                    Make a Difference
                  </span>
                </div>
                
                <h2 className="text-3xl lg:text-4xl font-bold leading-tight mb-4">
                  Join Our Mission to 
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-primary to-orange-500">
                    {" "}Save Lives
                  </span>
                </h2>
                
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  Your time and skills can transform someone's recovery journey. Whether you have 1 hour or 10 hours a week, there's a meaningful way for you to contribute to our life-saving mission.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    size="lg" 
                    className="group bg-gradient-to-r from-purple-600 via-primary to-orange-500 hover:from-purple-700 hover:via-primary/90 hover:to-orange-600 shadow-lg hover:shadow-xl hover:shadow-purple-500/25 transition-all duration-300"
                    onClick={() => window.location.href = '/volunteer'}
                  >
                    Start Volunteering
                    <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    size="lg"
                    className="border-purple-300/50 hover:bg-purple-50/50 hover:border-purple-400/60 transition-all duration-300"
                    onClick={() => window.location.href = '/about'}
                  >
                    Learn Our Story
                  </Button>
                </div>
              </div>
              
              {/* Enhanced visual side */}
              <div className="relative bg-gradient-to-br from-purple-500/5 via-primary/5 to-orange-500/5 p-8 lg:p-12 flex items-center justify-center">
                <div className="relative">
                  {/* Central heart with rainbow gradient */}
                  <div className="w-32 h-32 bg-gradient-to-br from-purple-500 via-primary via-pink-500 to-orange-500 rounded-full flex items-center justify-center shadow-2xl shadow-purple-500/30 animate-pulse">
                    <Heart className="w-16 h-16 text-white fill-white animate-bounce" style={{ animationDuration: '2s' }} />
                  </div>
                  
                  {/* Floating multi-colored hearts around center */}
                  <div className="absolute -top-6 -right-6 w-10 h-10 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center animate-bounce shadow-lg" style={{ animationDelay: '0.5s', animationDuration: '3s' }}>
                    <Heart className="w-5 h-5 text-white fill-white" />
                  </div>
                  
                  <div className="absolute -bottom-6 -left-6 w-8 h-8 bg-gradient-to-br from-pink-400 to-pink-600 rounded-full flex items-center justify-center animate-bounce shadow-lg" style={{ animationDelay: '1s', animationDuration: '2.5s' }}>
                    <Heart className="w-4 h-4 text-white fill-white" />
                  </div>
                  
                  <div className="absolute top-2 -left-8 w-6 h-6 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center animate-bounce shadow-lg" style={{ animationDelay: '1.5s', animationDuration: '3.5s' }}>
                    <Heart className="w-3 h-3 text-white fill-white" />
                  </div>
                  
                  <div className="absolute -bottom-2 -right-10 w-7 h-7 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center animate-bounce shadow-lg" style={{ animationDelay: '2s', animationDuration: '4s' }}>
                    <Heart className="w-3.5 h-3.5 text-white fill-white" />
                  </div>
                  
                  {/* Floating sparkles around hearts */}
                  <div className="absolute top-4 right-4 w-6 h-6 flex items-center justify-center animate-pulse" style={{ animationDelay: '0.3s' }}>
                    <Sparkles className="w-4 h-4 text-purple-400" />
                  </div>
                  
                  <div className="absolute bottom-4 left-4 w-6 h-6 flex items-center justify-center animate-pulse" style={{ animationDelay: '1.8s' }}>
                    <Sparkles className="w-4 h-4 text-pink-400" />
                  </div>
                  
                  {/* Enhanced ripple effects with colors */}
                  <div className="absolute inset-0 rounded-full border-2 border-purple-400/40 animate-ping" />
                  <div className="absolute inset-0 rounded-full border border-pink-400/30 animate-ping" style={{ animationDelay: '1s' }} />
                  <div className="absolute inset-0 rounded-full border border-orange-400/20 animate-ping" style={{ animationDelay: '2s' }} />
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default VolunteerCTA;