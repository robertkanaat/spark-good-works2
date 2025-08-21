import { Card, CardContent } from "@/components/ui/card";
import { Quote, Lightbulb, Heart } from "lucide-react";
import joePolishImage from "@/assets/experts/joe-polish.png";

const OurStorySection = () => {
  return (
    <section className="relative py-24 overflow-hidden" id="our-story">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-pulse opacity-30" />
      <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-primary/10 rounded-full blur-3xl animate-pulse delay-1000 opacity-40" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-card/80 backdrop-blur-sm rounded-full border border-primary/20 mb-6">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
            <span className="text-foreground font-bold tracking-wider uppercase text-sm">
              Our Founder
            </span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-black text-foreground mb-8 leading-tight">
            Meet{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-primary to-orange-500">
              Joe Polish
            </span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            From addiction's darkest depths to becoming a beacon of hope—discover the personal journey that sparked a movement.
          </p>
        </div>
        
        {/* Main Content - Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Left Column - Story */}
          <div className="space-y-8">
            <Card className="bg-gradient-to-br from-card/90 via-card/80 to-primary/5 backdrop-blur-sm border border-primary/10 shadow-2xl">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                    <Heart className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground">The Journey</h3>
                </div>
                
                <div className="space-y-4 text-foreground/90 leading-relaxed">
                  <p className="text-lg">
                    Joe Polish's life was profoundly shaped by his struggles with addiction. By age 18, 
                    addiction had nearly taken everything—his health, relationships, and hope for the future.
                  </p>
                  
                  <p>
                    In those darkest moments, Joe discovered a life-changing truth: 
                    <span className="font-semibold text-primary"> the root of his addiction wasn't a moral failing, 
                    but a response to unresolved pain.</span>
                  </p>
                  
                  <p>
                    This realization became his catalyst for healing. As he navigated recovery, Joe witnessed 
                    the stigma and isolation that deepens addiction's cycle of shame—and knew something had to change.
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-orange-500/10 via-primary/5 to-card/80 backdrop-blur-sm border border-orange-500/20 shadow-2xl">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-orange-500/20 rounded-full flex items-center justify-center">
                    <Lightbulb className="w-5 h-5 text-orange-500" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground">The Mission</h3>
                </div>
                
                <div className="space-y-4 text-foreground/90 leading-relaxed">
                  <p>
                    Joe's entrepreneurial success taught him the power of connection and community. 
                    He envisioned applying these principles to transform addiction support.
                  </p>
                  
                  <p className="font-medium text-orange-600 dark:text-orange-400">
                    "What if those struggling could access a supportive, non-judgmental network? 
                    A place where understanding replaces shame?"
                  </p>
                  
                  <p>
                    Driven by these questions, Joe founded Genius Recovery—creating a new paradigm 
                    where empathy conquers stigma and hope illuminates the path to healing.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Right Column - Image & Quote */}
          <div className="space-y-8">
            {/* Professional Photo */}
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary via-orange-500 to-primary rounded-2xl blur opacity-30 animate-pulse"></div>
              <div className="relative bg-card rounded-2xl p-1 border border-primary/20">
                <img 
                  src={joePolishImage} 
                  alt="Joe Polish - Founder of Genius Recovery" 
                  className="w-full h-[500px] object-cover rounded-xl"
                />
              </div>
            </div>
            
            {/* Signature Quote */}
            <Card className="bg-gradient-to-br from-primary/10 via-primary/5 to-orange-500/10 backdrop-blur-md border border-primary/20 shadow-2xl">
              <CardContent className="p-8 text-center">
                <Quote className="w-12 h-12 text-primary mx-auto mb-6" />
                <blockquote className="text-xl font-medium text-foreground mb-6 italic leading-relaxed">
                  "Addiction isn't a failure—it's a response to pain. When we address the trauma, 
                  we unlock the potential for true healing."
                </blockquote>
                <div className="text-primary font-bold text-lg">
                  — Joe Polish, Founder
                </div>
                <div className="text-sm text-muted-foreground mt-2">
                  Genius Recovery
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* Impact Section */}
        <div className="text-center">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-card/80 backdrop-blur-sm rounded-full border border-orange-500/20 mb-8">
            <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
            <span className="text-foreground font-bold tracking-wider uppercase text-sm">
              The Impact
            </span>
          </div>
          
          <h3 className="text-3xl md:text-4xl font-black text-foreground mb-8 leading-tight">
            Transforming{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-500">
              Lives & Perspectives
            </span>
          </h3>
          
          <div className="max-w-4xl mx-auto">
            <Card className="bg-gradient-to-r from-primary/5 via-card/80 to-orange-500/5 backdrop-blur-sm border border-primary/10 shadow-xl">
              <CardContent className="p-8 md:p-12">
                <p className="text-xl text-foreground leading-relaxed mb-6">
                  Genius Recovery embodies Joe's vision for compassionate addiction support—a space where 
                  people from all walks of life unite, free from stigma, to understand addiction and support each other.
                </p>
                
                <p className="text-lg text-foreground/90 leading-relaxed">
                  Through Genius Recovery, Joe hopes people find the strength and resources to rebuild their lives, 
                  while society learns to view addiction through a lens of empathy and compassion. 
                  <span className="font-semibold text-primary"> He believes that with the right support, 
                  education, and connection, recovery is possible for everyone.</span>
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurStorySection;