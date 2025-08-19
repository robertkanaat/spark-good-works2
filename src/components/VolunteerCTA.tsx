import { ArrowRight, Heart, Users, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const VolunteerCTA = () => {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-orange-500/10" />
      
      {/* Decorative elements */}
      <div className="absolute top-10 left-10 opacity-20">
        <Sparkles className="w-8 h-8 text-primary animate-pulse" />
      </div>
      <div className="absolute bottom-10 right-10 opacity-20">
        <Heart className="w-12 h-12 text-orange-500 animate-pulse" style={{ animationDelay: '1s' }} />
      </div>
      
      <div className="container mx-auto px-4 relative">
        <div className="max-w-4xl mx-auto">
          <Card className="overflow-hidden bg-gradient-to-r from-background/95 to-background/90 backdrop-blur-sm border-primary/20 shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              {/* Content side */}
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 rounded-full bg-primary/10">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                  <span className="text-sm font-semibold text-primary uppercase tracking-wide">
                    Make a Difference
                  </span>
                </div>
                
                <h2 className="text-3xl lg:text-4xl font-bold leading-tight mb-4">
                  Join Our Mission to 
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-500">
                    {" "}Save Lives
                  </span>
                </h2>
                
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  Your time and skills can transform someone's recovery journey. Whether you have 1 hour or 10 hours a week, there's a meaningful way for you to contribute to our life-saving mission.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    size="lg" 
                    className="group bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-lg hover:shadow-xl transition-all duration-300"
                    onClick={() => window.location.href = '/volunteer'}
                  >
                    Start Volunteering
                    <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    size="lg"
                    className="border-primary/30 hover:bg-primary/5"
                    onClick={() => window.location.href = '/about'}
                  >
                    Learn Our Story
                  </Button>
                </div>
              </div>
              
              {/* Visual side */}
              <div className="relative bg-gradient-to-br from-primary/5 to-orange-500/5 p-8 lg:p-12 flex items-center justify-center">
                <div className="relative">
                  {/* Central icon */}
                  <div className="w-32 h-32 bg-gradient-to-br from-primary to-orange-500 rounded-full flex items-center justify-center shadow-2xl">
                    <Heart className="w-16 h-16 text-white" />
                  </div>
                  
                  {/* Floating elements */}
                  <div className="absolute -top-4 -right-4 w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center animate-bounce" style={{ animationDelay: '0.5s' }}>
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                  
                  <div className="absolute -bottom-4 -left-4 w-10 h-10 bg-orange-500/20 rounded-full flex items-center justify-center animate-bounce" style={{ animationDelay: '1s' }}>
                    <Sparkles className="w-5 h-5 text-orange-500" />
                  </div>
                  
                  {/* Ripple effect */}
                  <div className="absolute inset-0 rounded-full border-2 border-primary/30 animate-ping" />
                  <div className="absolute inset-0 rounded-full border border-primary/20 animate-ping" style={{ animationDelay: '1s' }} />
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