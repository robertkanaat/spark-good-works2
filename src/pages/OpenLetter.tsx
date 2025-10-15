
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useEffect } from "react";


const OpenLetter = () => {
  useEffect(() => {
    const title = "An Open Letter to Anyone Struggling with Addiction | Genius Recovery";
    const description = "Compassionate guidance and hope for anyone struggling with addiction—from the Genius Recovery community.";

    document.title = title;

    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", description);

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", window.location.origin + "/open-letter");

    // Structured data: Article
    const scriptId = "jsonld-open-letter";
    const existing = document.getElementById(scriptId);
    if (existing) existing.remove();
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: "An Open Letter to Anyone Struggling with Addiction",
      description,
      author: { "@type": "Organization", name: "Genius Recovery" },
      mainEntityOfPage: window.location.href,
      url: window.location.href,
    };
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = scriptId;
    script.text = JSON.stringify(jsonLd);
    document.head.appendChild(script);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center overflow-hidden">
          {/* Elegant Gradient Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-background via-primary/5 to-donate/10">
            {/* Geometric overlay patterns */}
            <div className="absolute inset-0">
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-primary/10 via-transparent to-donate/10 opacity-60"></div>
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-background/80 via-transparent to-primary/20"></div>
            </div>
            
            {/* Subtle geometric shapes */}
            <div className="absolute top-20 right-20 w-32 h-32 border border-primary/20 rounded-full opacity-20"></div>
            <div className="absolute bottom-40 left-20 w-24 h-24 border border-donate/20 rounded-full opacity-30"></div>
            <div className="absolute top-1/2 right-1/3 w-16 h-16 bg-primary/10 rounded-lg rotate-45 opacity-40"></div>
          </div>
          
          {/* Soft Floating Elements */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse opacity-60" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-donate/5 rounded-full blur-3xl animate-pulse delay-1000 opacity-50" />
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
              {/* Left side - Main Content */}
              <div className="lg:col-span-8 text-left">
                {/* Badge */}
                <div className="mb-8 animate-fade-in">
                  <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/20 backdrop-blur-sm rounded-full border border-primary/30">
                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                    <span className="text-foreground font-bold tracking-wider uppercase text-sm">
                      Open Letter
                    </span>
                  </div>
                </div>
                
                {/* Main Headline */}
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-foreground mb-8 leading-tight animate-fade-in">
                  Open Letter to{" "}
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-donate to-primary">
                    Anyone Struggling
                  </span>{" "}
                  <br />
                  <span className="text-primary">with Addiction</span>
                </h1>
                
                {/* Subheadline */}
                <p className="text-2xl md:text-3xl text-foreground/80 mb-8 leading-relaxed font-medium animate-fade-in">
                  From the heart of compassion.<br />
                  <span className="text-foreground/60">A message of hope and understanding.</span>
                </p>
                
                {/* Key Points */}
                <div className="flex flex-col gap-4 mb-12 animate-fade-in">
                  <div className="flex items-center gap-4 text-foreground">
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                        <span className="text-primary-foreground text-xs font-bold">✓</span>
                      </div>
                      <span className="text-lg font-medium">You are not alone in this struggle</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-foreground">
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                        <span className="text-primary-foreground text-xs font-bold">✓</span>
                      </div>
                      <span className="text-lg font-medium">Addiction is not a choice—it's a condition</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-foreground">
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                        <span className="text-primary-foreground text-xs font-bold">✓</span>
                      </div>
                      <span className="text-lg font-medium">Help and hope are always available</span>
                    </div>
                  </div>
                </div>
                
                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 animate-fade-in">
                  <Button 
                    size="lg" 
                    className="px-8 py-6 text-lg font-semibold rounded-full shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 group"
                    style={{ 
                      background: 'var(--gradient-primary)',
                      boxShadow: 'var(--shadow-elegant)'
                    }}
                    onClick={() => {
                      document.getElementById('letter-content')?.scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'start' 
                      });
                    }}
                  >
                    <span className="relative">
                      Read the Full Letter
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white/50 transition-all duration-300 group-hover:w-full"></span>
                    </span>
                  </Button>
                  
                  <Link to="/emergency">
                    <Button 
                      variant="outline" 
                      size="lg" 
                      className="border-primary/30 text-foreground hover:bg-primary/10 hover:text-foreground px-8 py-6 text-lg font-semibold rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-105 group bg-white/20"
                    >
                      Get Help Now
                    </Button>
                  </Link>
                </div>
              </div>
              
              {/* Right side - Inspirational Quote Card */}
              <div className="lg:col-span-4 animate-fade-in">
                <div className="bg-white/20 backdrop-blur-md border border-primary/20 p-8 shadow-2xl rounded-2xl">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                      <span className="text-primary text-2xl">💝</span>
                    </div>
                    <blockquote className="text-foreground text-xl font-medium mb-6 italic leading-relaxed">
                      "Addiction is not a problem—it's actually a solution to pain. Understanding this changes everything."
                    </blockquote>
                    <div className="text-foreground/70 text-sm font-medium">
                      — Genius Recovery Community
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 border-2 border-foreground/40 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-foreground/60 rounded-full mt-2 animate-pulse"></div>
            </div>
          </div>
        </section>

        {/* Main Content - Letter Style */}
        <section className="relative mt-20 pb-20" id="letter-content">
          {/* Elegant background */}
          <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" aria-hidden />
          
          <div className="relative max-w-4xl mx-auto px-6 sm:px-8 lg:px-12">
            {/* Letter Container - Single unified card with paper-like feel */}
            <div 
              className="backdrop-blur-xl rounded-2xl shadow-2xl border border-border/30 overflow-hidden"
              style={{ 
                background: 'var(--gradient-card)',
                boxShadow: '0 20px 60px -10px rgba(0,0,0,0.15)'
              }}
            >
              {/* Letter Header with subtle accent */}
              <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-donate/10 px-8 md:px-12 lg:px-16 pt-12 pb-8 border-b border-primary/10">
                <div className="text-sm text-muted-foreground mb-4 font-medium">An Open Letter</div>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                  To Anyone Struggling with Addiction
                </h2>
              </div>

              {/* Letter Body - Unified content flow */}
              <article className="px-8 md:px-12 lg:px-16 py-12 space-y-6 text-lg leading-relaxed text-foreground/90">
                <p className="text-xl leading-relaxed">
                  First, I want to say how sorry I am that you or someone you love is struggling with addiction. I know first-hand how painful it is. Addiction nearly killed me when I was 18 years old.
                </p>

                <p>
                  What I've learned since then is that <strong className="font-semibold text-primary">almost all addiction stems from trauma.</strong> This can be difficult for some people to understand; they assume trauma has to mean a person was beaten, molested or in a life-threatening accident. But we all have different levels of sensitivity.
                </p>
                
                <p>
                  Addiction is something you are driven to do—anything you crave that gives you temporary pleasure or relief but then causes negative consequences. Addiction is something you are unable to give up, despite the suffering it causes.
                </p>
                
                <p>
                  The challenging thing for people that don't have this craving to understand is how someone could have that craving in the first place. They wonder why the addict can't just make a better choice.
                </p>
                
                <p>
                  I'm of the belief that addiction is not a choice. <strong className="font-semibold text-primary">Once the addict goes into a craving state, it's beyond willpower or intelligence.</strong> Intelligence can actually be a detriment because the smarter people are, the more they believe they can think their way out of the problem.
                </p>

                <p className="italic border-l-4 border-primary pl-6 py-2 my-8 text-xl text-foreground/80">
                  "Ultimately, addiction is a connection disorder. It's feeling incredibly disconnected and uncomfortable in your own skin. You just want to numb out or escape."
                </p>

                <p>
                  <strong className="font-semibold text-primary">What many don't understand is that addiction isn't a problem—it's actually a solution.</strong> If you're in pain, angst, anxiety, fear, rage, depression, sadness, loneliness or experiencing any other form of suffering, there's nothing wrong with wanting to be out of that pain. It's how we go about scratching that itch that causes the issue.
                </p>
                
                <p>
                  <strong className="font-semibold text-primary">Looking at addiction from a state of compassion, as opposed to judgment, is critical.</strong> We cannot punish or beat addiction out of somebody. Love and compassion are critical—though, of course, those can be difficult emotions to embrace when dealing with addicts.
                </p>
                
                <p>
                  <strong className="font-semibold text-primary">Addiction is also biochemical.</strong> You are dealing with serotonin and dopamine. Once you quit the drug or behavior, you may have to fix and repair the gut. Movement, community, and consistent care can help heal.
                </p>
                
                <p className="text-xl font-medium pt-4">
                  It's a lot of work—but not nearly as much work as active addiction. And if you're willing to do the work, there's freedom on the other side. <strong className="font-semibold text-donate">The bottom line: help is available.</strong>
                </p>

                {/* Letter Signature */}
                <div className="pt-8 mt-8 border-t border-border/20">
                  <p className="text-base text-muted-foreground italic">
                    With compassion and hope,
                  </p>
                  <p className="text-lg font-semibold text-foreground mt-2">
                    The Genius Recovery Community
                  </p>
                </div>
              </article>

              {/* Enhanced call-to-action section */}
              <div className="mt-16 pt-12 border-t border-border/20">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-foreground mb-2">Ready to take the next step?</h3>
                  <p className="text-muted-foreground">We're here to support you on your journey to recovery.</p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <Link to="/emergency" className="w-full sm:w-auto">
                    <Button 
                      className="w-full sm:w-auto text-primary-foreground font-semibold px-8 py-3 rounded-xl transition-all duration-300 hover:scale-105"
                      style={{ 
                        background: 'var(--gradient-primary)',
                        boxShadow: 'var(--shadow-elegant)'
                      }}
                    >
                      Get Help Now
                    </Button>
                  </Link>
                  <Link to="/donation" className="w-full sm:w-auto">
                    <Button variant="secondary" className="w-full sm:w-auto border-2 border-primary/20 hover:border-primary/40 bg-card/50 hover:bg-card/70 backdrop-blur px-8 py-3 rounded-xl transition-all duration-300">
                      Support Recovery
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default OpenLetter;
