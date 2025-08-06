import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Heart, Users, Globe, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import basicBg from "@/assets/donation-bg-basic.jpg";
import supporterBg from "@/assets/donation-bg-supporter.jpg";
import championBg from "@/assets/donation-bg-champion.jpg";
import heroBg from "@/assets/donation-bg-hero.jpg";

const Donation = () => {
  const [searchParams] = useSearchParams();
  const [donationAmount, setDonationAmount] = useState([50]);
  const [customAmount, setCustomAmount] = useState("");
  const [isCustomMode, setIsCustomMode] = useState(false);
  const amount = donationAmount[0];

  // Initialize amount from URL parameter
  useEffect(() => {
    const urlAmount = searchParams.get('amount');
    if (urlAmount) {
      const parsedAmount = parseInt(urlAmount);
      if (!isNaN(parsedAmount)) {
        setDonationAmount([parsedAmount]);
      }
    }
  }, [searchParams]);

  // Calculate impact based on donation amount
  const getLivesSupported = (amount: number) => Math.floor(amount / 10);
  const getFamiliesHelped = (amount: number) => Math.floor(amount / 25);
  const getSessionsProvided = (amount: number) => Math.floor(amount / 5);

  const getTier = (amount: number) => {
    if (amount >= 200) return "hero";
    if (amount >= 100) return "champion"; 
    if (amount >= 50) return "supporter";
    return "basic";
  };

  const getBackgroundImage = (tier: string) => {
    switch (tier) {
      case "hero": return heroBg;
      case "champion": return championBg;
      case "supporter": return supporterBg;
      default: return basicBg;
    }
  };

  const getImpactMessage = (amount: number) => {
    const tier = getTier(amount);
    const messages = {
      basic: "Every dollar creates ripples of hope",
      supporter: "Your generosity builds stronger communities",
      champion: "You're making a significant impact",
      hero: "You're a champion of recovery and healing"
    };
    return messages[tier as keyof typeof messages];
  };

  const handleCustomAmountChange = (value: string) => {
    setCustomAmount(value);
    const numValue = parseInt(value);
    if (!isNaN(numValue) && numValue > 0) {
      setDonationAmount([numValue]);
    }
  };

  const handleSliderChange = (values: number[]) => {
    setDonationAmount(values);
    setIsCustomMode(false);
    setCustomAmount("");
  };

  const currentTier = getTier(amount);
  const backgroundImage = getBackgroundImage(currentTier);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Dynamic background with images */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-1000 ease-in-out"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
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
                Select your donation amount and see the lives you'll transform
              </p>
            </div>

            {/* Amount display with tier */}
            <div className="text-center mb-8">
              <div className="text-6xl font-bold text-primary mb-2">
                ${amount}
              </div>
              <div className="text-lg text-muted-foreground mb-2">per month</div>
              <div className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${
                currentTier === 'hero' ? 'bg-purple-100 text-purple-800' :
                currentTier === 'champion' ? 'bg-yellow-100 text-yellow-800' :
                currentTier === 'supporter' ? 'bg-blue-100 text-blue-800' :
                'bg-green-100 text-green-800'
              }`}>
                {currentTier.charAt(0).toUpperCase() + currentTier.slice(1)} Donor
              </div>
            </div>

            {/* Slider */}
            <div className="mb-8 px-4">
              <Label className="text-base font-medium mb-4 block">Donation Amount</Label>
              <Slider
                value={donationAmount}
                onValueChange={handleSliderChange}
                max={500}
                min={10}
                step={5}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-muted-foreground mt-2">
                <span>$10</span>
                <span>$500+</span>
              </div>
            </div>

            {/* Custom Amount Input */}
            <div className="mb-8">
              <Label className="text-base font-medium mb-4 block">Or enter a custom amount</Label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">$</span>
                  <Input
                    type="number"
                    placeholder="Enter amount"
                    value={customAmount}
                    onChange={(e) => {
                      handleCustomAmountChange(e.target.value);
                      setIsCustomMode(true);
                    }}
                    className="pl-8"
                  />
                </div>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setIsCustomMode(false);
                    setCustomAmount("");
                  }}
                  disabled={!isCustomMode}
                >
                  Use Slider
                </Button>
              </div>
            </div>

            {/* Quick amounts - updated values */}
            <div className="grid grid-cols-4 gap-3 mb-8">
              {[25, 50, 100, 200].map((quickAmount) => (
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