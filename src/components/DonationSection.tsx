import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useState } from "react";

const DonationSection = () => {
  const [selectedAmount, setSelectedAmount] = useState(40);
  const presetAmounts = [10, 20, 40, 100];

  return (
    <section className="py-16 bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <div className="text-center mb-8">
              <div className="text-muted-foreground text-sm mb-2">I NEED...</div>
              <Button variant="outline" className="mb-4 px-8 py-6 text-lg font-semibold">
                HELP
              </Button>
            </div>
            
            <div className="text-center mb-8">
              <div className="text-muted-foreground text-sm mb-2">I WANT TO...</div>
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground mb-4 px-8 py-6 text-lg font-semibold">
                DONATE
              </Button>
            </div>
            
            <div className="text-center">
              <div className="text-muted-foreground text-sm mb-2">I WANT TO...</div>
              <Button variant="outline" className="px-8 py-6 text-lg font-semibold">
                SUPPORT
              </Button>
            </div>
          </div>
          
          <Card className="p-8">
            <h3 className="text-2xl font-bold mb-6">Choose an amount to support recovery</h3>
            
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
              <span className="text-3xl font-bold">${selectedAmount}.00 USD</span>
            </div>
            
            <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-3 text-lg font-semibold mb-4">
              DONATE NOW
            </Button>
            
            <p className="text-sm text-muted-foreground mb-4">
              Your ${selectedAmount}.00 donation helps provide 24/7 recovery support and connects people to life-saving resources. Every dollar makes a difference.
            </p>
            
            <div className="text-center">
              <a href="#" className="text-primary hover:underline text-sm">Learn about our programs</a>
            </div>
            
            <div className="text-xs text-muted-foreground text-center mt-4">
              Secure donation processing • Monthly giving available
            </div>
          </Card>
        </div>
        
        <div className="text-center mt-8 text-muted-foreground">
          Join thousands of people around the world who are supporting recovery, healing, and hope for those affected by addiction.
        </div>
        
        <div className="flex justify-center gap-4 mt-6">
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
            GET HELP NOW
          </Button>
          <Button variant="outline">
            LEARN MORE
          </Button>
        </div>
      </div>
    </section>
  );
};

export default DonationSection;