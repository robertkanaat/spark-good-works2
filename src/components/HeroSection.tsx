import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useState } from "react";
import heroImage from "@/assets/hero-recovery-person.jpg";

const HeroSection = () => {
  const [selectedAmount, setSelectedAmount] = useState(40);
  const [activeView, setActiveView] = useState<'donate' | 'help' | 'support'>('donate');
  const presetAmounts = [10, 20, 40, 100];

  return (
    <section className="relative min-h-screen flex items-center">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-hero-overlay/60"></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Mission statement and action buttons */}
          <div>
            <div className="mb-6">
              <span className="text-primary font-semibold text-sm tracking-wider uppercase">
                ADDICTION RECOVERY SUPPORT
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-8 leading-tight">
              Our mission is to change the{" "}
              <span className="text-primary">global conversation around addiction</span>{" "}
              from one of judgment to one of compassion
            </h1>
            
            <div className="flex flex-col sm:flex-row gap-4 mt-12">
              <div className="text-center">
                <div className="text-white/70 text-sm mb-2">I NEED...</div>
                <Button 
                  variant="outline" 
                  className={`px-8 py-6 text-lg font-semibold ${
                    activeView === 'help' 
                      ? 'bg-primary text-primary-foreground hover:bg-primary/90' 
                      : 'bg-white/10 border-white/30 text-white hover:bg-white/20'
                  }`}
                  onClick={() => setActiveView('help')}
                >
                  HELP
                </Button>
              </div>
              
              <div className="text-center">
                <div className="text-white/70 text-sm mb-2">I WANT TO...</div>
                <Button 
                  className={`px-8 py-6 text-lg font-semibold ${
                    activeView === 'donate'
                      ? 'bg-primary hover:bg-primary/90 text-primary-foreground'
                      : 'bg-white/10 border-white/30 text-white hover:bg-white/20'
                  }`}
                  onClick={() => setActiveView('donate')}
                >
                  DONATE
                </Button>
              </div>
              
              <div className="text-center">
                <div className="text-white/70 text-sm mb-2">I WANT TO...</div>
                <Button 
                  variant="outline" 
                  className={`px-8 py-6 text-lg font-semibold ${
                    activeView === 'support' 
                      ? 'bg-primary text-primary-foreground hover:bg-primary/90' 
                      : 'bg-white/10 border-white/30 text-white hover:bg-white/20'
                  }`}
                  onClick={() => setActiveView('support')}
                >
                  SUPPORT
                </Button>
              </div>
            </div>
          </div>

          {/* Right side - Interactive box */}
          <div className="flex justify-center lg:justify-end">
            <Card className="p-8 bg-white/95 backdrop-blur-sm max-w-md w-full">
              {activeView === 'donate' && (
                <>
                  <h3 className="text-2xl font-bold mb-6 text-center">Choose an amount to support recovery</h3>
                  
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    {presetAmounts.map((amount) => (
                      <Button
                        key={amount}
                        variant={selectedAmount === amount ? "default" : "outline"}
                        onClick={() => setSelectedAmount(amount)}
                        className="h-12 font-semibold"
                      >
                        ${amount}USD/mo
                      </Button>
                    ))}
                  </div>
                  
                  <div className="text-center mb-6">
                    <span className="text-3xl font-bold text-foreground">${selectedAmount}.00 USD</span>
                  </div>
                  
                  <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-3 text-lg font-semibold mb-4">
                    DONATE NOW
                  </Button>
                  
                  <p className="text-sm text-muted-foreground mb-4 text-center">
                    Your ${selectedAmount}.00 donation helps provide 24/7 recovery support and connects people to life-saving resources. Every dollar makes a difference.
                  </p>
                  
                  <div className="text-center mb-4">
                    <a href="#" className="text-primary hover:underline text-sm">Learn about our programs</a>
                  </div>
                  
                  <div className="text-xs text-muted-foreground text-center">
                    Secure donation processing • Monthly giving available
                  </div>
                </>
              )}

              {activeView === 'help' && (
                <>
                  <h3 className="text-2xl font-bold mb-6 text-center">Recovery Support Hub</h3>
                  
                  <div className="space-y-4 mb-6">
                    <div className="text-center">
                      <h4 className="font-semibold text-lg mb-2">Transform Your Life</h4>
                      <p className="text-sm text-muted-foreground">
                        Through connection, support, and proven recovery tools. Recovery is possible – no matter how rough the journey has been.
                      </p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3 text-center">
                      <div className="p-3 border rounded-md">
                        <div className="font-semibold text-sm">Resilience</div>
                        <div className="text-xs text-muted-foreground">Build inner strength</div>
                      </div>
                      <div className="p-3 border rounded-md">
                        <div className="font-semibold text-sm">Empowerment</div>
                        <div className="text-xs text-muted-foreground">Take control</div>
                      </div>
                    </div>
                  </div>
                  
                  <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-3 text-lg font-semibold mb-4">
                    GET RECOVERY SUPPORT
                  </Button>
                  
                  <p className="text-sm text-muted-foreground mb-4 text-center">
                    Access expert videos, articles, live events, and a supportive community to guide your recovery journey.
                  </p>
                  
                  <div className="text-center mb-4">
                    <a href="https://geniusrecovery.org/recovery-support-hub/" className="text-primary hover:underline text-sm">Learn more about recovery support</a>
                  </div>
                </>
              )}

              {activeView === 'support' && (
                <>
                  <h3 className="text-2xl font-bold mb-6 text-center">Caregiver Support Hub</h3>
                  
                  <div className="space-y-4 mb-6">
                    <div className="text-center">
                      <h4 className="font-semibold text-lg mb-2">You're Not Alone</h4>
                      <p className="text-sm text-muted-foreground">
                        Supporting someone with addiction is challenging. Get the tools and community you need to navigate this journey.
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 p-2 border rounded-md">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        <span className="text-sm">Expert guidance & resources</span>
                      </div>
                      <div className="flex items-center gap-2 p-2 border rounded-md">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        <span className="text-sm">Private, safe communities</span>
                      </div>
                      <div className="flex items-center gap-2 p-2 border rounded-md">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        <span className="text-sm">Focus on your well-being</span>
                      </div>
                    </div>
                  </div>
                  
                  <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-3 text-lg font-semibold mb-4">
                    GET CAREGIVER SUPPORT
                  </Button>
                  
                  <p className="text-sm text-muted-foreground mb-4 text-center">
                    Join a supportive community with videos, articles, and live events designed specifically for caregivers.
                  </p>
                  
                  <div className="text-center mb-4">
                    <a href="https://geniusrecovery.org/caregiver-support-hub/" className="text-primary hover:underline text-sm">Learn more about caregiver support</a>
                  </div>
                </>
              )}
            </Card>
          </div>
        </div>
        
        <div className="text-center mt-16 text-white/80">
          Join thousands of people around the world who are supporting recovery, healing, and hope for those affected by addiction.
        </div>
        
        <div className="flex justify-center gap-4 mt-6">
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
            GET HELP NOW
          </Button>
          <Button variant="outline" className="bg-white/10 border-white/30 text-white hover:bg-white/20">
            LEARN MORE
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;