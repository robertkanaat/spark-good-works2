import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, BookOpen, Sparkles, Palette, MessageCircle, Gift, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import recoveryKitBox from "@/assets/recovery-kit-box.png";

const KIT_PRICE = 100;

const Kit = () => {
  useEffect(() => {
    document.title = "Genius Recovery Kit - Tools for Your Recovery Journey";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Get the Genius Recovery Kit - a complete toolkit for recovery including a support journal, relaxation tools, creative supplies, and 24/7 AI recovery companion access.');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = 'Get the Genius Recovery Kit - a complete toolkit for recovery including a support journal, relaxation tools, creative supplies, and 24/7 AI recovery companion access.';
      document.head.appendChild(meta);
    }
  }, []);

  const [quantity, setQuantity] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [paymentFormHtml, setPaymentFormHtml] = useState("");
  const { toast } = useToast();

  const totalAmount = KIT_PRICE * quantity;

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handlePurchase = async () => {
    if (!email.trim() || !name.trim()) {
      toast({
        title: "Information Required",
        description: "Please enter your name and email address to proceed.",
        variant: "destructive",
      });
      return;
    }

    if (!isValidEmail(email.trim())) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('create-payment', {
        body: {
          amount: totalAmount,
          currency: 'USD',
          isRecurring: false,
          customerEmail: email,
          customerName: name,
          embedForm: true,
          metadata: {
            type: 'recovery_kit',
            quantity: quantity
          }
        }
      });

      if (error) {
        throw error;
      }

      if (data.html) {
        setPaymentFormHtml(data.html);
        setShowPaymentForm(true);

        // Send purchase data to Zapier webhook
        try {
          const purchaseData = {
            product: 'Genius Recovery Kit',
            amount: totalAmount,
            quantity: quantity,
            currency: 'USD',
            email: email,
            name: name,
            timestamp: new Date().toISOString(),
            source: 'Genius Recovery Kit Page'
          };

          await fetch('https://hooks.zapier.com/hooks/catch/155028/u1f7ojj/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            mode: 'no-cors',
            body: JSON.stringify(purchaseData)
          });

          console.log('Purchase data sent to Zapier webhook:', purchaseData);
        } catch (webhookError) {
          console.error('Failed to send data to Zapier webhook:', webhookError);
        }
      } else {
        throw new Error('No payment form received');
      }

    } catch (error) {
      console.error('Payment error:', error);
      toast({
        title: "Payment Error",
        description: error instanceof Error ? error.message : "Failed to process payment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const kitIncludes = [
    {
      icon: BookOpen,
      title: "Support Journal",
      description: "For expressing thoughts and tracking progress — away from the overstimulation of a screen so you can reflect on your progress, find your confidence, and achieve your goals."
    },
    {
      icon: Sparkles,
      title: "Relaxation Tools",
      description: "Calming scents, stress relief tools, eye masks for meditation, and other tools to help you go within and work with your guide."
    },
    {
      icon: Palette,
      title: "Creative Tools",
      description: "For a grounding activity that can help redirect and focus the mind so you feel more in control when you show up for work, friends, family, and yourself."
    },
    {
      icon: MessageCircle,
      title: "Recovery Companion",
      description: "Our proprietary sober companion is available 24/7, right at your fingertips via QR code. The companion learns about you while keeping your data and conversations private."
    }
  ];

  return (
    <div className="min-h-screen relative">
      <SEOHead 
        title="Genius Recovery Kit - Tools for Your Recovery Journey"
        description="Get the Genius Recovery Kit - a complete toolkit for recovery including a support journal, relaxation tools, creative supplies, and 24/7 AI recovery companion access."
      />
      <Header />
      
      {/* Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-primary/20 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link to="/">
            <Button variant="outline" size="sm" className="bg-white/10 border-white/30 text-white hover:bg-white/20">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-white">Genius Recovery Kit</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left side - Purchase controls or Payment form */}
          <Card className="p-8 bg-white/95 backdrop-blur-sm">
            {!showPaymentForm ? (
              <>
                <div className="text-center mb-8">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary font-medium mb-4">
                    <Gift className="w-4 h-4" />
                    <span>A First Aid Kit For... Addiction</span>
                  </div>
                  <h2 className="text-3xl font-bold mb-4">A Minute for You, A Miracle for Them</h2>
                  <p className="text-muted-foreground">
                    Everything you need to support your recovery journey in one thoughtfully curated kit
                  </p>
                </div>

                {/* Product Image */}
                <div className="mb-8 rounded-xl overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200 p-8">
                  <img 
                    src={recoveryKitBox} 
                    alt="Genius Recovery Kit Box" 
                    className="w-full h-auto max-h-64 object-contain mx-auto"
                  />
                </div>

                {/* Price display */}
                <div className="text-center mb-8">
                  <div className="text-5xl font-bold text-primary mb-2">
                    ${KIT_PRICE}
                  </div>
                  <div className="text-muted-foreground">
                    per kit + free shipping
                  </div>
                </div>

                {/* Quantity selector */}
                <div className="mb-6">
                  <Label className="text-base font-medium mb-3 block">Quantity</Label>
                  <div className="flex items-center gap-4">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      disabled={quantity <= 1}
                    >
                      -
                    </Button>
                    <span className="text-2xl font-bold w-12 text-center">{quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setQuantity(quantity + 1)}
                    >
                      +
                    </Button>
                    <div className="ml-auto text-xl font-semibold text-primary">
                      Total: ${totalAmount}
                    </div>
                  </div>
                </div>

                {/* Name Input */}
                <div className="mb-4">
                  <Label htmlFor="name" className="text-base font-medium mb-2 block">Full Name</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

                {/* Email Input */}
                <div className="mb-8">
                  <Label htmlFor="email" className="text-base font-medium mb-2 block">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <p className="text-xs text-muted-foreground mt-2">
                    For order confirmation and shipping updates
                  </p>
                </div>

                {/* Purchase button */}
                <Button 
                  onClick={handlePurchase}
                  disabled={isProcessing || !email.trim() || !name.trim() || !isValidEmail(email.trim())}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-4 text-xl font-semibold mb-4"
                >
                  {isProcessing ? 'PROCESSING...' : `ORDER NOW - $${totalAmount}`}
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  Secure checkout • Free shipping • 30-day satisfaction guarantee
                </p>
              </>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold">Complete Your Order</h3>
                  <Button
                    variant="outline"
                    onClick={() => setShowPaymentForm(false)}
                  >
                    Back
                  </Button>
                </div>
                <div 
                  dangerouslySetInnerHTML={{ __html: paymentFormHtml }}
                />
              </div>
            )}
          </Card>

          {/* Right side - Kit contents */}
          <div className="space-y-6">
            <Card className="p-6 bg-white/90 backdrop-blur-sm border-l-4 border-l-primary">
              <h3 className="text-2xl font-bold text-center mb-6 text-primary flex items-center justify-center gap-2">
                <Heart className="w-6 h-6" />
                Every Kit Includes
              </h3>
              
              <div className="space-y-6">
                {kitIncludes.map((item, index) => (
                  <div key={index} className="flex gap-4 p-4 bg-primary/5 rounded-lg">
                    <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-1">{item.title}</h4>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Additional info card */}
            <Card className="p-6 bg-gradient-to-br from-primary/10 to-primary/5 backdrop-blur-sm border-primary/20">
              <h4 className="font-bold text-lg mb-3 text-primary">Why the Recovery Kit?</h4>
              <p className="text-muted-foreground mb-4">
                Recovery is a journey that requires the right tools. Our kit is designed to support you or someone you love through every step — providing tangible resources that complement professional support.
              </p>
              <div className="flex items-center gap-2 text-sm font-medium text-primary">
                <Gift className="w-4 h-4" />
                <span>Makes a meaningful gift for someone in recovery</span>
              </div>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Kit;
