import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Play, MessageCircle, Heart, Star } from "lucide-react";

const AICompanion = () => {
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
            <div className="max-w-4xl mx-auto mb-12">
              <div className="relative bg-card rounded-lg overflow-hidden shadow-2xl">
                <div className="aspect-video bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mb-4 mx-auto">
                      <Play className="w-8 h-8 text-primary-foreground ml-1" />
                    </div>
                    <p className="text-white text-lg mb-2">Genius Recovery AI Companion</p>
                    <p className="text-white/70">Duration: 2:45</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Chat CTA */}
            <div className="bg-card rounded-xl p-8 shadow-lg max-w-2xl mx-auto">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Chat With The Genius Recovery AI Clone Now
              </h2>
              <Button size="lg" className="group">
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
                  
                  <Button 
                    variant="outline" 
                    className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Watch Video
                  </Button>
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
            <Button size="lg" variant="secondary" className="group">
              <MessageCircle className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
              Begin Chat Now
            </Button>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default AICompanion;