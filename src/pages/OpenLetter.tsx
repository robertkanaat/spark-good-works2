import Header from "@/components/Header";
import Footer from "@/components/Footer";
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
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="">
        <section className="relative overflow-hidden">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
            <header className="mb-8">
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
                An Open Letter to Anyone Struggling with Addiction
              </h1>
              <p className="mt-3 text-muted-foreground">
                From the Genius Recovery community
              </p>
            </header>

            <article className="prose prose-neutral dark:prose-invert max-w-none">
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
              <h2>What many don’t understand</h2>
              <p>
                <strong>What many don’t understand is that addiction isn’t a problem—it’s actually a solution.</strong> If you’re in pain, angst, anxiety, fear, rage, depression, sadness, loneliness or experiencing any other form of suffering, there’s nothing wrong with wanting to be out of that pain. It’s how we go about scratching that itch that causes the issue.
              </p>
              <p>
                <strong>Ultimately, addiction is a connection disorder.</strong> It’s feeling incredibly disconnected and uncomfortable in your own skin. You just want to numb out or escape. You want to feel something—anything except the dread that comes with that craving state… a state that always has compulsivity or impulsivity attached to it.
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
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default OpenLetter;
