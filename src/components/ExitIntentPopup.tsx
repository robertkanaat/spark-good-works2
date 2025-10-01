import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { X, BookOpen, ArrowRight, Sparkles, CheckCircle, Download, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ExitIntentPopup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasShown, setHasShown] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if popup has been shown before
    const popupShown = localStorage.getItem('exitIntentPopupShown');
    if (popupShown) {
      setHasShown(true);
      return;
    }

    let mouseLeaveCount = 0;
    const handleMouseLeave = (e: MouseEvent) => {
      // Only trigger if mouse is leaving from the top of the page and popup hasn't been shown
      if (e.clientY <= 0 && !hasShown && !isVisible) {
        mouseLeaveCount++;
        // Show popup after second mouse leave to avoid accidental triggers
        if (mouseLeaveCount >= 2) {
          setIsVisible(true);
          setHasShown(true);
          localStorage.setItem('exitIntentPopupShown', 'true');
        }
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isVisible) {
        setIsVisible(false);
      }
    };

    // Add event listeners
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [hasShown, isVisible]);

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleGetBook = () => {
    setIsVisible(false);
    navigate('/addiction-recovery-book');
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] animate-fade-in"
        onClick={handleClose}
      />
      
      {/* Popup */}
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-fade-in">
        <Card className="relative max-w-2xl w-full bg-gradient-to-br from-background via-background to-muted/30 border-2 border-primary/20 shadow-2xl animate-scale-in overflow-hidden">
          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 z-10 w-8 h-8 bg-muted/80 hover:bg-muted rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
          >
            <X className="w-4 h-4 text-muted-foreground" />
          </button>

          {/* Glow effects */}
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-secondary/5 rounded-full blur-3xl" />

          <div className="relative p-8 md:p-12">
            {/* Header with badge */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
                <Sparkles className="w-4 h-4 animate-pulse" />
                Wait! Don't Leave Empty-Handed
              </div>
              
              <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4 leading-tight">
                Get Your{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-primary">
                  FREE Book
                </span>{" "}
                Before You Go
              </h2>
              
              <p className="text-lg text-muted-foreground leading-relaxed max-w-lg mx-auto">
                Discover life-changing insights from Joe Polish's exclusive interviews with 
                <span className="text-primary font-semibold"> world-renowned recovery experts</span>
              </p>
            </div>

            {/* Book preview */}
            <div className="flex flex-col md:flex-row items-center gap-8 mb-8">
              {/* Book image */}
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-2xl blur-xl opacity-60" />
                <img 
                  src="/genius-recovery-uploads/879915a0-9251-4cd3-8f03-11b3f3a07f1d.png" 
                  alt="Understanding Addiction And Recovery book cover"
                  className="relative w-40 h-auto rounded-xl shadow-2xl transform hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Features */}
              <div className="flex-1 space-y-4">
                <h3 className="text-xl font-bold text-foreground mb-4">
                  "Understanding Addiction And Recovery"
                </h3>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-foreground">Expert interviews with Dr. Gabor Maté, Patrick Carnes & more</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-foreground">Compassionate approaches to addiction recovery</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-foreground">100% free - no hidden costs or subscriptions</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Star className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-foreground font-medium">Instant download after sign-up</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Social proof */}
            <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl p-6 mb-8 border border-primary/10">
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-primary fill-current" />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground italic">
                  "This book completely changed how I understand addiction. The expert insights are invaluable for anyone affected by addiction." 
                </p>
                <p className="text-xs text-muted-foreground mt-2 font-medium">- Recovery Community Member</p>
              </div>
            </div>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                onClick={handleGetBook}
                size="lg"
                className="flex-1 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white font-bold py-4 px-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group"
              >
                <div className="flex items-center justify-center gap-3">
                  <Download className="w-5 h-5" />
                  <span>Get My Free Book</span>
                  <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </Button>
              
              <Button 
                onClick={handleClose}
                variant="outline"
                size="lg"
                className="sm:w-auto py-4 px-6 rounded-full border-2 border-muted-foreground/20 hover:border-primary/30 transition-colors duration-300"
              >
                Maybe Later
              </Button>
            </div>

            {/* Trust indicator */}
            <div className="text-center mt-6">
              <p className="text-xs text-muted-foreground">
                🔒 Your information is secure and will never be shared. Unsubscribe anytime.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
};

export default ExitIntentPopup;