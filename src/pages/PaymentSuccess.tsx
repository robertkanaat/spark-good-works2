import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle, Home, Heart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Footer from "@/components/Footer";

const PaymentSuccess = () => {
  const { toast } = useToast();

  useEffect(() => {
    toast({
      title: "Thank you for your donation!",
      description: "Your contribution will make a real difference in recovery communities.",
    });
  }, [toast]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-primary/10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Card className="p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          
          <h1 className="text-3xl font-bold text-primary mb-4">
            Payment Successful!
          </h1>
          
          <p className="text-lg text-muted-foreground mb-8">
            Thank you for your generous donation to Genius Recovery. Your contribution will help transform lives and support recovery communities worldwide.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="p-4 bg-primary/5 rounded-lg">
              <Heart className="w-8 h-8 text-primary mx-auto mb-2" />
              <h3 className="font-semibold mb-1">Lives Supported</h3>
              <p className="text-sm text-muted-foreground">Your donation directly supports individuals in recovery</p>
            </div>
            <div className="p-4 bg-primary/5 rounded-lg">
              <CheckCircle className="w-8 h-8 text-primary mx-auto mb-2" />
              <h3 className="font-semibold mb-1">24/7 Support</h3>
              <p className="text-sm text-muted-foreground">Enabling round-the-clock crisis intervention</p>
            </div>
            <div className="p-4 bg-primary/5 rounded-lg">
              <Home className="w-8 h-8 text-primary mx-auto mb-2" />
              <h3 className="font-semibold mb-1">Community Building</h3>
              <p className="text-sm text-muted-foreground">Creating stronger support networks</p>
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              You will receive an email confirmation shortly with your donation receipt.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/">
                <Button className="bg-primary hover:bg-primary/90">
                  <Home className="w-4 h-4 mr-2" />
                  Return Home
                </Button>
              </Link>
              <Link to="/donation">
                <Button variant="outline">
                  Make Another Donation
                </Button>
              </Link>
            </div>
          </div>
        </Card>
      </div>
      
      <Footer />
    </div>
  );
};

export default PaymentSuccess;