import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { ArrowLeft, Heart, Users, Globe, Shield } from "lucide-react";
import { Link } from "react-router-dom";

const Donation = () => {
  const [donationAmount, setDonationAmount] = useState([50]);
  const amount = donationAmount[0];

  // Calculate impact based on donation amount
  const getLivesSupported = (amount: number) => Math.floor(amount / 10);
  const getFamiliesHelped = (amount: number) => Math.floor(amount / 25);
  const getSessionsProvided = (amount: number) => Math.floor(amount / 5);

  // Background gradient changes based on amount
  const getBackgroundGradient = (amount: number) => {
    if (amount < 25) return "from-orange-400/20 to-orange-600/20";
    if (amount < 50) return "from-orange-500/30 to-orange-700/30";
    if (amount < 100) return "from-orange-600/40 to-orange-800/40";
    return "from-orange-700/50 to-orange-900/50";
  };

  const getImpactMessage = (amount: number) => {
    if (amount < 25) return "Every dollar creates ripples of hope";
    if (amount < 50) return "Your generosity builds stronger communities";
    if (amount < 100) return "You're making a significant impact";
    return "You're a champion of recovery and healing";
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Dynamic background */}
      <div className={`absolute inset-0 bg-gradient-to-br ${getBackgroundGradient(amount)} transition-all duration-1000`}>
        <div className="absolute inset-0 opacity-50" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }} />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link to="/">
            <Button variant="outline" size="sm" className="bg-white/10 border-white/30 text-white hover:bg-white/20">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-white">Support Recovery Together</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Donation controls */}
          <Card className="p-8 bg-white/95 backdrop-blur-sm">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Choose Your Impact</h2>
              <p className="text-muted-foreground">
                Slide to select your donation amount and see the lives you'll touch
              </p>
            </div>

            {/* Amount display */}
            <div className="text-center mb-8">
              <div className="text-6xl font-bold text-primary mb-2">
                ${amount}
              </div>
              <div className="text-lg text-muted-foreground">per month</div>
            </div>

            {/* Slider */}
            <div className="mb-8 px-4">
              <Slider
                value={donationAmount}
                onValueChange={setDonationAmount}
                max={200}
                min={5}
                step={5}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-muted-foreground mt-2">
                <span>$5</span>
                <span>$200+</span>
              </div>
            </div>

            {/* Quick amounts */}
            <div className="grid grid-cols-4 gap-3 mb-8">
              {[25, 50, 100, 150].map((quickAmount) => (
                <Button
                  key={quickAmount}
                  variant={amount === quickAmount ? "default" : "outline"}
                  onClick={() => setDonationAmount([quickAmount])}
                  className="h-12"
                >
                  ${quickAmount}
                </Button>
              ))}
            </div>

            {/* Donate button */}
            <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-4 text-xl font-semibold mb-4">
              DONATE ${amount} NOW
            </Button>

            <p className="text-xs text-muted-foreground text-center">
              Secure donation processing • Cancel anytime • Tax deductible
            </p>
          </Card>

          {/* Right side - Impact visualization */}
          <div className="space-y-6">
            <Card className="p-6 bg-white/90 backdrop-blur-sm border-l-4 border-l-primary">
              <h3 className="text-2xl font-bold text-center mb-6 text-primary">
                {getImpactMessage(amount)}
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4 p-4 bg-primary/5 rounded-lg">
                  <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary">
                      {getLivesSupported(amount)}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Lives directly supported each month
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-primary/5 rounded-lg">
                  <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                    <Heart className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary">
                      {getFamiliesHelped(amount)}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Families receive hope and guidance
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-primary/5 rounded-lg">
                  <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                    <Shield className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary">
                      {getSessionsProvided(amount)}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Recovery support sessions funded
                    </div>
                  </div>
                </div>

                {amount >= 100 && (
                  <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg border border-primary/20">
                    <div className="w-12 h-12 bg-primary/30 rounded-full flex items-center justify-center">
                      <Globe className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <div className="text-lg font-bold text-primary">
                        Global Impact Champion
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Your contribution reaches communities worldwide
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </Card>

            {/* Additional info */}
            <Card className="p-6 bg-white/80 backdrop-blur-sm">
              <h4 className="font-semibold mb-3">Your donation helps provide:</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• 24/7 crisis intervention and support</li>
                <li>• Educational resources and recovery tools</li>
                <li>• Community building and peer support</li>
                <li>• Training for healthcare professionals</li>
                <li>• Research for better treatment methods</li>
              </ul>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Donation;