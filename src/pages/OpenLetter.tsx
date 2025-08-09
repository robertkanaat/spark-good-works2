import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import heroBg from "@/assets/open-letter-hero-bg.jpg";

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
        <section className="relative isolate min-h-[60vh] flex items-center justify-center overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center bg-fixed"
            style={{ backgroundImage: `url(${heroBg})` }}
            aria-hidden
          />
          <div className="absolute inset-0 bg-gradient-to-br from-hero-overlay/80 via-hero-overlay/60 to-hero-overlay/90" aria-hidden />
          
          {/* Floating geometric elements */}
          <div className="absolute inset-0 overflow-hidden" aria-hidden>
            <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-primary/10 animate-pulse" />
            <div className="absolute bottom-1/3 right-1/4 w-24 h-24 rounded-full bg-donate/10 animate-pulse delay-700" />
          </div>

          <div className="relative z-10 max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
            <div className="mb-6">
              <span className="inline-block px-4 py-2 text-xs font-bold tracking-widest uppercase bg-primary/20 text-primary-foreground rounded-full backdrop-blur border border-primary/30">
                Open Letter
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black leading-[0.9] text-foreground mb-6 tracking-tight">
              An Open Letter to
              <span className="block bg-gradient-to-r from-primary to-donate bg-clip-text text-transparent">
                Anyone Struggling
              </span>
              <span className="block text-4xl md:text-6xl">with Addiction</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto font-light leading-relaxed">
              From the heart of the Genius Recovery community
            </p>
          </div>
        </section>

        {/* Main Content */}
        <section className="relative -mt-32 pb-20">
          {/* Background pattern */}
          <div className="absolute inset-0 bg-gradient-subtle opacity-30" aria-hidden />
          
          <div className="relative max-w-4xl mx-auto px-6 sm:px-8 lg:px-12">
            {/* Main content card */}
            <div 
              className="backdrop-blur-xl rounded-3xl p-8 md:p-12 lg:p-16 border border-border/20"
              style={{ 
                background: 'var(--gradient-card)',
                boxShadow: 'var(--shadow-card)'
              }}
            >
              <article className="prose prose-neutral dark:prose-invert max-w-none prose-xl leading-relaxed">
                {/* Introduction with special styling */}
                <div className="mb-12 p-8 bg-gradient-to-r from-primary/5 to-donate/5 rounded-2xl border border-primary/10">
                  <p className="text-2xl leading-relaxed font-light text-foreground/90 mb-0">
                    First, I want to say how sorry I am that you or someone you love is struggling with addiction. I know first-hand how painful it is. Addiction nearly killed me when I was 18 years old.
                  </p>
                </div>

                {/* Core content with enhanced typography */}
                <div className="space-y-8 text-lg leading-relaxed">
                  <p className="text-foreground/90">
                    What I've learned since then is that <strong className="font-bold text-primary">almost all addiction stems from trauma.</strong> This can be difficult for some people to understand; they assume trauma has to mean a person was beaten, molested or in a life-threatening accident. But we all have different levels of sensitivity.
                  </p>
                  
                  <p className="text-foreground/90">
                    Addiction is something you are driven to do—anything you crave that gives you temporary pleasure or relief but then causes negative consequences. Addiction is something you are unable to give up, despite the suffering it causes.
                  </p>
                  
                  <p className="text-foreground/90">
                    The challenging thing for people that don't have this craving to understand is how someone could have that craving in the first place. They wonder why the addict can't just make a better choice.
                  </p>
                  
                  <p className="text-foreground/90">
                    I'm of the belief that addiction is not a choice. <strong className="font-bold text-primary">Once the addict goes into a craving state, it's beyond willpower or intelligence.</strong> Intelligence can actually be a detriment because the smarter people are, the more they believe they can think their way out of the problem.
                  </p>
                </div>

                {/* Elegant divider */}
                <div className="my-16 flex items-center justify-center">
                  <div className="h-px w-24 bg-gradient-to-r from-transparent via-primary to-transparent" />
                  <div className="mx-4 w-2 h-2 rounded-full bg-primary" />
                  <div className="h-px w-24 bg-gradient-to-r from-primary via-transparent to-transparent" />
                </div>

                {/* Featured section */}
                <div className="my-16">
                  <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center bg-gradient-to-r from-primary to-donate bg-clip-text text-transparent">
                    What many don't understand
                  </h2>
                  
                  {/* Key insight callout */}
                  <div className="relative p-8 my-12 bg-gradient-to-br from-primary/10 via-primary/5 to-donate/10 rounded-2xl border border-primary/20">
                    <div className="absolute -top-4 left-8">
                      <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                        <span className="text-primary-foreground font-bold text-sm">✦</span>
                      </div>
                    </div>
                    <blockquote className="text-xl md:text-2xl italic font-light text-foreground leading-relaxed">
                      "Ultimately, addiction is a connection disorder. It's feeling incredibly disconnected and uncomfortable in your own skin. You just want to numb out or escape."
                    </blockquote>
                  </div>
                </div>

                <div className="space-y-8 text-lg leading-relaxed">
                  <p className="text-foreground/90">
                    <strong className="font-bold text-primary">What many don't understand is that addiction isn't a problem—it's actually a solution.</strong> If you're in pain, angst, anxiety, fear, rage, depression, sadness, loneliness or experiencing any other form of suffering, there's nothing wrong with wanting to be out of that pain. It's how we go about scratching that itch that causes the issue.
                  </p>
                  
                  <p className="text-foreground/90">
                    <strong className="font-bold text-primary">Looking at addiction from a state of compassion, as opposed to judgment, is critical.</strong> We cannot punish or beat addiction out of somebody. Love and compassion are critical—though, of course, those can be difficult emotions to embrace when dealing with addicts.
                  </p>
                  
                  <p className="text-foreground/90">
                    <strong className="font-bold text-primary">Addiction is also biochemical.</strong> You are dealing with serotonin and dopamine. Once you quit the drug or behavior, you may have to fix and repair the gut. Movement, community, and consistent care can help heal.
                  </p>
                  
                  {/* Final message with emphasis */}
                  <div className="p-6 bg-gradient-to-r from-donate/10 to-primary/10 rounded-xl border border-donate/20 mt-12">
                    <p className="text-xl font-medium text-foreground mb-0">
                      It's a lot of work—but not nearly as much work as active addiction. And if you're willing to do the work, there's freedom on the other side. <strong className="font-bold text-donate">The bottom line: help is available.</strong>
                    </p>
                  </div>
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