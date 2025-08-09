import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import heroBg from "@/assets/resources-hero-bg.jpg";

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
        {/* Hero */}
        <section className="relative isolate min-h-[40vh] flex items-end overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${heroBg})` }}
            aria-hidden
          />
          <div className="absolute inset-0 bg-hero-overlay/70" aria-hidden />

          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <p className="text-xs font-semibold tracking-widest uppercase text-primary">Open Letter</p>
            <h1 className="mt-2 text-4xl md:text-5xl font-bold leading-tight text-foreground">
              An Open Letter to Anyone Struggling with Addiction
            </h1>
            <p className="mt-3 text-muted-foreground max-w-2xl">
              From the Genius Recovery community
            </p>
          </div>
        </section>

        {/* Content Card */}
        <section className="relative -mt-10">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <Card className="p-6 md:p-10 bg-card/95 backdrop-blur shadow-lg border">
              <article className="prose prose-neutral dark:prose-invert max-w-none prose-lg leading-relaxed">
                <p>
                  First, I want to say how sorry I am that you or someone you love is struggling with addiction. I know first-hand how painful it is. Addiction nearly killed me when I was 18 years old.
                </p>
                <p>
                  What I’ve learned since then is that <strong>almost all addiction stems from trauma.</strong> This can be difficult for some people to understand; they assume trauma has to mean a person was beaten, molested or in a life-threatening accident. But we all have different levels of sensitivity.
                </p>
                <p>
                  Addiction is something you are driven to do—anything you crave that gives you temporary pleasure or relief but then causes negative consequences. Addiction is something you are unable to give up, despite the suffering it causes.
                </p>
                <p>
                  The challenging thing for people that don’t have this craving to understand is how someone could have that craving in the first place. They wonder why the addict can’t just make a better choice.
                </p>
                <p>
                  I’m of the belief that addiction is not a choice. <strong>Once the addict goes into a craving state, it’s beyond willpower or intelligence.</strong> Intelligence can actually be a detriment because the smarter people are, the more they believe they can think their way out of the problem.
                </p>

                <div className="h-px my-8 bg-gradient-to-r from-transparent via-border to-transparent" />

                <h2>What many don’t understand</h2>
                <blockquote className="border-l-4 border-primary pl-4 italic text-muted-foreground">
                  Ultimately, addiction is a connection disorder. It’s feeling incredibly disconnected and uncomfortable in your own skin. You just want to numb out or escape.
                </blockquote>
                <p>
                  <strong>What many don’t understand is that addiction isn’t a problem—it’s actually a solution.</strong> If you’re in pain, angst, anxiety, fear, rage, depression, sadness, loneliness or experiencing any other form of suffering, there’s nothing wrong with wanting to be out of that pain. It’s how we go about scratching that itch that causes the issue.
                </p>
                <p>
                  <strong>Looking at addiction from a state of compassion, as opposed to judgment, is critical.</strong> We cannot punish or beat addiction out of somebody. Love and compassion are critical—though, of course, those can be difficult emotions to embrace when dealing with addicts.
                </p>
                <p>
                  <strong>Addiction is also biochemical.</strong> You are dealing with serotonin and dopamine. Once you quit the drug or behavior, you may have to fix and repair the gut. Movement, community, and consistent care can help heal.
                </p>
                <p>
                  It’s a lot of work—but not nearly as much work as active addiction. And if you’re willing to do the work, there’s freedom on the other side. <strong>The bottom line: help is available.</strong>
                </p>
              </article>

              <aside className="mt-10 grid gap-3 sm:flex sm:items-center">
                <Link to="/emergency">
                  <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">Get Help Now</Button>
                </Link>
                <Link to="/donation">
                  <Button variant="secondary">Support Recovery</Button>
                </Link>
              </aside>
            </Card>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default OpenLetter;
