import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Play, MessageCircle, Heart, Star } from "lucide-react";
import aiCompanionPreview from "@/assets/ai-companion-preview.jpg";

const AICompanion = () => {
  useEffect(() => {
    document.title = "AI Companion - 24/7 Recovery Support & Guidance | Genius Recovery";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Meet your AI recovery companion. Get 24/7 personalized support, guidance, and resources on your addiction recovery journey. Always available when you need help most.');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = 'Meet your AI recovery companion. Get 24/7 personalized support, guidance, and resources on your addiction recovery journey. Always available when you need help most.';
      document.head.appendChild(meta);
    }
  }, []);

  const [isVideoOpen, setIsVideoOpen] = useState(false);
  
  const testimonials = [
    {
      name: "Anna's Story",
      description: "Anna describes her addiction as not just substance use, but the overwhelming mental burden of self-obsession and anxiety. Her recovery included recognizing distortions in her thinking, learning to manage her anxious thoughts, and challenging extreme emotions. She stresses the importance of patience and realizing that feelings aren't always facts.",
      videoUrl: "#"
    },
    {
      name: "Tony's Story", 
      description: "Tony's journey through recovery involved learning to be honest with himself and others. He discovered the importance of community support and finding purpose beyond addiction. His story emphasizes the power of connection and accountability in maintaining sobriety.",
      videoUrl: "#"
    },
    {
      name: "Maria's Story",
      description: "Maria found recovery through understanding the root causes of her addiction. She learned to process trauma healthily and developed coping strategies that didn't involve substances. Her story highlights the importance of professional support and self-compassion.",
      videoUrl: "#"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10 py-20">
          <div className="container mx-auto px-4 text-center">
            <div className="mb-4">
              <span className="text-primary/70 text-lg font-medium tracking-wide">Genius Recovery</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
              AI COMPANION
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-12">
              Please watch this brief video below on the Genius Recovery AI Companion
            </p>
            
            {/* Video Section */}
            <div className="max-w-4xl mx-auto mb-12 relative">
              {/* Background decoration */}
              <div className="absolute top-10 left-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
              <div className="absolute bottom-10 right-10 w-40 h-40 bg-accent/10 rounded-full blur-3xl" />
              
              <div className="relative group cursor-pointer" onClick={() => setIsVideoOpen(true)}>
                {/* Video thumbnail container */}
                <div 
                  className="relative aspect-video bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl overflow-hidden shadow-2xl transition-all duration-500 group-hover:shadow-primary/25 group-hover:scale-[1.02] bg-cover bg-center"
                  style={{ backgroundImage: `url(${aiCompanionPreview})` }}
                >
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
                  
                  {/* Play button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative">
                      {/* Pulse rings */}
                      <div className="absolute inset-0 bg-white/20 rounded-full animate-ping" />
                      <div className="absolute inset-0 bg-white/10 rounded-full animate-pulse" />
                      
                      {/* Main play button */}
                      <Button
                        size="lg"
                        className="w-20 h-20 rounded-full bg-white/90 hover:bg-white text-primary hover:text-primary shadow-2xl transition-all duration-300 group-hover:scale-110"
                      >
                        <Play className="w-8 h-8 ml-1" fill="currentColor" />
                      </Button>
                    </div>
                  </div>

                  {/* Video info overlay */}
                  <div className="absolute bottom-6 left-6 right-6 text-white">
                    <h3 className="text-2xl font-bold mb-2">Genius Recovery AI Companion</h3>
                    <p className="text-white/90">Discover your personalized recovery support companion</p>
                  </div>
                </div>

                {/* Decorative elements */}
                <div className="absolute -top-4 -left-4 w-8 h-8 bg-primary/30 rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-accent/30 rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              </div>

              <div className="text-center mt-8">
                <p className="text-muted-foreground">
                  Click to watch the AI companion introduction
                </p>
              </div>
            </div>
            
            {/* Chat CTA */}
            <div className="bg-card rounded-xl p-8 shadow-lg max-w-2xl mx-auto">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Chat With The Genius Recovery AI Clone Now
              </h2>
              <Button 
                size="lg" 
                className="group"
                onClick={() => {
                  // Find and click the Delphi bubble trigger
                  const delphiButton = document.querySelector('#delphi-bubble-trigger') as HTMLElement ||
                                      document.querySelector('#delphi-bubble-container button') as HTMLElement ||
                                      document.querySelector('[data-delphi-trigger]') as HTMLElement;
                  if (delphiButton) {
                    delphiButton.click();
                  }
                }}
              >
                <MessageCircle className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                Start Conversation
              </Button>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Star className="w-6 h-6 text-primary" />
                <span className="text-primary font-semibold tracking-wide text-lg">TESTIMONIALS</span>
                <Star className="w-6 h-6 text-primary" />
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                Real Stories of Recovery
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Hear from individuals who have found hope and healing through their recovery journey
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="p-6 hover:shadow-xl transition-all duration-300 group border-2 hover:border-primary/20">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <Heart className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground">{testimonial.name}</h3>
                  </div>
                  
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {testimonial.description}
                  </p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-gradient-to-br from-secondary/10 to-primary/5">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                Why Choose AI Companion?
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Experience personalized support available 24/7 to help you on your recovery journey
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="text-center group">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors">
                  <MessageCircle className="w-10 h-10 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-4">24/7 Support</h3>
                <p className="text-muted-foreground">
                  Access support whenever you need it, day or night. Your AI companion is always available to listen and provide guidance.
                </p>
              </div>
              
              <div className="text-center group">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors">
                  <Heart className="w-10 h-10 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-4">Personalized Care</h3>
                <p className="text-muted-foreground">
                  Receive tailored advice and support based on your unique recovery journey and personal circumstances.
                </p>
              </div>
              
              <div className="text-center group">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors">
                  <Star className="w-10 h-10 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-4">Evidence-Based</h3>
                <p className="text-muted-foreground">
                  Built on proven recovery principles and therapeutic approaches to provide you with effective support strategies.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Start Your Conversation?
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Take the first step towards personalized recovery support. Your AI companion is ready to help you navigate your journey.
            </p>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Take the first step towards personalized recovery support. Your AI companion is ready to help you navigate your journey.
            </p>
            <Button 
              size="lg" 
              variant="secondary" 
              className="group"
              onClick={() => {
                // Find and click the Delphi bubble trigger
                const delphiButton = document.querySelector('#delphi-bubble-trigger') as HTMLElement ||
                                    document.querySelector('#delphi-bubble-container button') as HTMLElement ||
                                    document.querySelector('[data-delphi-trigger]') as HTMLElement;
                if (delphiButton) {
                  delphiButton.click();
                }
              }}
            >
              <MessageCircle className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
              Begin Chat Now
            </Button>
          </div>
        </section>
      </main>
      
      {/* Video Modal */}
      <Dialog open={isVideoOpen} onOpenChange={setIsVideoOpen}>
        <DialogContent className="max-w-4xl w-[95vw] p-0 bg-black border-0">
          <DialogHeader className="sr-only">
            <DialogTitle>AI Companion Introduction Video</DialogTitle>
            <DialogDescription>
              Watch our video introducing the Genius Recovery AI Companion
            </DialogDescription>
          </DialogHeader>
          <div className="aspect-video w-full">
            <iframe
              src="https://player.vimeo.com/video/1063903692?autoplay=1&title=0&byline=0&portrait=0"
              width="100%"
              height="100%"
              frameBorder="0"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          </div>
        </DialogContent>
      </Dialog>
      
      <Footer />
    </div>
  );
};

export default AICompanion;