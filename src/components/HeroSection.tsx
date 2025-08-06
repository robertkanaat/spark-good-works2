import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useState } from "react";
import heroImage from "@/assets/hero-recovery-person.jpg";

const HeroSection = () => {
  const [selectedAmount, setSelectedAmount] = useState(40);
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
                <Button variant="outline" className="bg-white/10 border-white/30 text-white hover:bg-white/20 px-8 py-6 text-lg font-semibold">
                  HELP
                </Button>
              </div>
              
              <div className="text-center">
                <div className="text-white/70 text-sm mb-2">I WANT TO...</div>
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg font-semibold">
                  DONATE
                </Button>
              </div>
              
              <div className="text-center">
                <div className="text-white/70 text-sm mb-2">I WANT TO...</div>
                <Button variant="outline" className="bg-white/10 border-white/30 text-white hover:bg-white/20 px-8 py-6 text-lg font-semibold">
                  SUPPORT
                </Button>
              </div>
            </div>
          </div>

          {/* Right side - Interactive donation box */}
          <div className="flex justify-center lg:justify-end">
            <Card className="p-8 bg-white/95 backdrop-blur-sm max-w-md w-full">
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