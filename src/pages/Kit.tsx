import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, BookOpen, Sparkles, Palette, MessageCircle, Gift, Heart, Check, Package, Shield, Truck } from "lucide-react";
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
      const { data, error } = await supabase.functions.invoke('kit-purchase', {
        body: {
          amount: totalAmount,
          quantity: quantity,
          currency: 'USD',
          customerEmail: email,
          customerName: name,
          embedForm: true
        }
      });

      if (error) {
        throw error;
      }

      if (data.html) {
        setPaymentFormHtml(data.html);
        setShowPaymentForm(true);

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
      description: "Express thoughts and track progress away from screens"
    },
    {
      icon: Sparkles,
      title: "Relaxation Tools",
      description: "Calming scents, stress relief, and meditation aids"
    },
    {
      icon: Palette,
      title: "Creative Tools",
      description: "Grounding activities to redirect and focus the mind"
    },
    {
      icon: MessageCircle,
      title: "Recovery Companion",
      description: "24/7 AI support via QR code, private & secure"
    }
  ];

  const benefits = [
    { icon: Truck, text: "Free Shipping" },
    { icon: Shield, text: "30-Day Guarantee" },
    { icon: Package, text: "Beautifully Packaged" }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      <SEOHead 
        title="Genius Recovery Kit - Tools for Your Recovery Journey"
        description="Get the Genius Recovery Kit - a complete toolkit for recovery including a support journal, relaxation tools, creative supplies, and 24/7 AI recovery companion access."
      />
      <Header />
      
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(249,115,22,0.15),rgba(255,255,255,0))]"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Hero Section */}
      <section className="relative pt-20 pb-12 lg:pt-28 lg:pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back button */}
          <Link to="/" className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors mb-8">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left - Product Showcase */}
            <div className="relative order-2 lg:order-1">
              {/* Floating badges */}
              <div className="absolute -top-4 -left-4 z-20 animate-fade-in" style={{ animationDelay: '0.3s' }}>
                <div className="bg-primary text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                  ✨ Complete Toolkit
                </div>
              </div>
              
              {/* Product Image Container */}
              <div className="relative group">
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-primary/30 to-primary/20 rounded-3xl blur-2xl opacity-50 group-hover:opacity-70 transition-opacity duration-500"></div>
                
                {/* Image wrapper */}
                <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-3xl p-8 lg:p-12 border border-white/10">
                  <img 
                    src={recoveryKitBox} 
                    alt="Genius Recovery Kit Box" 
                    className="w-full h-auto transform group-hover:scale-105 transition-transform duration-700 drop-shadow-2xl"
                  />
                </div>

                {/* Floating feature tags */}
                <div className="absolute -right-4 top-1/4 animate-fade-in" style={{ animationDelay: '0.5s' }}>
                  <div className="bg-white/95 backdrop-blur-sm px-4 py-2 rounded-lg shadow-xl text-sm font-medium text-slate-800 flex items-center gap-2">
                    <Heart className="w-4 h-4 text-primary" />
                    Healing Tools
                  </div>
                </div>
                <div className="absolute -left-4 bottom-1/4 animate-fade-in" style={{ animationDelay: '0.7s' }}>
                  <div className="bg-white/95 backdrop-blur-sm px-4 py-2 rounded-lg shadow-xl text-sm font-medium text-slate-800 flex items-center gap-2">
                    <MessageCircle className="w-4 h-4 text-primary" />
                    24/7 Support
                  </div>
                </div>
              </div>
            </div>

            {/* Right - Content & Purchase */}
            <div className="order-1 lg:order-2 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/20 border border-primary/30 rounded-full text-primary font-medium mb-6 animate-fade-in">
                <Gift className="w-4 h-4" />
                <span>A First Aid Kit For Addiction</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight animate-fade-in" style={{ animationDelay: '0.1s' }}>
                Genius Recovery
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-400">Kit</span>
              </h1>

              <p className="text-xl text-white/70 mb-8 max-w-lg mx-auto lg:mx-0 animate-fade-in" style={{ animationDelay: '0.2s' }}>
                A minute for you, a miracle for them. Everything you need to support the recovery journey in one thoughtfully curated kit.
              </p>

              {/* Price Display */}
              <div className="mb-8 animate-fade-in" style={{ animationDelay: '0.3s' }}>
                <div className="flex items-baseline gap-2 justify-center lg:justify-start">
                  <span className="text-5xl md:text-6xl font-bold text-white">${KIT_PRICE}</span>
                  <span className="text-white/60 text-lg">per kit</span>
                </div>
                <p className="text-primary font-medium mt-2">Free shipping included</p>
              </div>

              {/* Benefits */}
              <div className="flex flex-wrap gap-4 justify-center lg:justify-start mb-8 animate-fade-in" style={{ animationDelay: '0.4s' }}>
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-2 text-white/80 text-sm">
                    <benefit.icon className="w-4 h-4 text-primary" />
                    <span>{benefit.text}</span>
                  </div>
                ))}
              </div>

              {/* Quick Kit Contents */}
              <div className="grid grid-cols-2 gap-3 mb-8 animate-fade-in" style={{ animationDelay: '0.5s' }}>
                {kitIncludes.map((item, index) => (
                  <div key={index} className="flex items-center gap-2 text-white/80 text-sm bg-white/5 rounded-lg p-3 border border-white/10">
                    <Check className="w-4 h-4 text-primary flex-shrink-0" />
                    <span>{item.title}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Purchase Section */}
      <section className="py-16 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="p-8 md:p-12 bg-white/95 backdrop-blur-xl shadow-2xl rounded-3xl border-0">
            {!showPaymentForm ? (
              <>
                <div className="text-center mb-10">
                  <h2 className="text-3xl md:text-4xl font-bold mb-3">Order Your Kit</h2>
                  <p className="text-muted-foreground text-lg">
                    Start or support a recovery journey today
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  {/* Left - Form */}
                  <div className="space-y-6">
                    {/* Quantity selector */}
                    <div>
                      <Label className="text-base font-semibold mb-3 block">How many kits?</Label>
                      <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => setQuantity(Math.max(1, quantity - 1))}
                          disabled={quantity <= 1}
                          className="h-10 w-10 rounded-full"
                        >
                          -
                        </Button>
                        <span className="text-3xl font-bold w-16 text-center">{quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => setQuantity(quantity + 1)}
                          className="h-10 w-10 rounded-full"
                        >
                          +
                        </Button>
                      </div>
                    </div>

                    {/* Name Input */}
                    <div>
                      <Label htmlFor="name" className="text-base font-semibold mb-2 block">Full Name</Label>
                      <Input
                        id="name"
                        type="text"
                        placeholder="Enter your full name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="h-12 text-base rounded-xl"
                      />
                    </div>

                    {/* Email Input */}
                    <div>
                      <Label htmlFor="email" className="text-base font-semibold mb-2 block">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="h-12 text-base rounded-xl"
                      />
                      <p className="text-xs text-muted-foreground mt-2">
                        For order confirmation and shipping updates
                      </p>
                    </div>
                  </div>

                  {/* Right - Order Summary */}
                  <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-6">
                    <h3 className="font-bold text-lg mb-6">Order Summary</h3>
                    
                    <div className="space-y-4 mb-6">
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Recovery Kit × {quantity}</span>
                        <span className="font-medium">${KIT_PRICE * quantity}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Shipping</span>
                        <span className="font-medium text-primary">FREE</span>
                      </div>
                      <div className="h-px bg-slate-200"></div>
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-lg">Total</span>
                        <span className="font-bold text-2xl text-primary">${totalAmount}</span>
                      </div>
                    </div>

                    {/* Purchase button */}
                    <Button 
                      onClick={handlePurchase}
                      disabled={isProcessing || !email.trim() || !name.trim() || !isValidEmail(email.trim())}
                      className="w-full bg-gradient-to-r from-primary to-orange-500 hover:from-primary/90 hover:to-orange-500/90 text-white py-7 text-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl"
                    >
                      {isProcessing ? (
                        <span className="flex items-center gap-2">
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          Processing...
                        </span>
                      ) : (
                        `Complete Order - $${totalAmount}`
                      )}
                    </Button>

                    <div className="flex items-center justify-center gap-4 mt-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Shield className="w-3 h-3" /> Secure
                      </span>
                      <span className="flex items-center gap-1">
                        <Truck className="w-3 h-3" /> Free Ship
                      </span>
                      <span className="flex items-center gap-1">
                        <Check className="w-3 h-3" /> Guarantee
                      </span>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="space-y-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-bold">Complete Your Order</h3>
                  <Button
                    variant="outline"
                    onClick={() => setShowPaymentForm(false)}
                    className="rounded-xl"
                  >
                    ← Back
                  </Button>
                </div>
                <div 
                  className="w-full"
                  dangerouslySetInnerHTML={{ __html: paymentFormHtml }}
                />
              </div>
            )}
          </Card>
        </div>
      </section>

      {/* What's Inside Section */}
      <section className="py-16 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">What's Inside the Kit</h2>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              Every component is carefully selected to support different aspects of the recovery journey
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {kitIncludes.map((item, index) => (
              <Card 
                key={index} 
                className="p-6 bg-white/10 backdrop-blur-sm border border-white/10 hover:bg-white/15 transition-all duration-300 group"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-primary to-orange-500 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                  <item.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-bold text-lg text-white mb-2">{item.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{item.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="p-8 md:p-12 bg-gradient-to-r from-primary to-orange-500 text-white text-center rounded-3xl border-0 overflow-hidden relative">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.2),transparent)]"></div>
            <div className="relative z-10">
              <Gift className="w-12 h-12 mx-auto mb-6 opacity-90" />
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Give the Gift of Recovery</h2>
              <p className="text-white/90 text-lg mb-8 max-w-xl mx-auto">
                The Recovery Kit makes a meaningful gift for someone you love. Support their journey with tangible tools and 24/7 companion access.
              </p>
              <Button 
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="bg-white text-primary hover:bg-white/90 px-8 py-6 text-lg font-bold rounded-xl"
              >
                Order a Kit Now
              </Button>
            </div>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Kit;
