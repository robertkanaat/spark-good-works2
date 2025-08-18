import { Helmet } from 'react-helmet-async';
import SEOHead from '@/components/SEOHead';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import OurMissionSection from '@/components/OurMissionSection';
import OurStorySection from '@/components/OurStorySection';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, Heart, Users, BookOpen } from 'lucide-react';

const About = () => {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Genius Recovery",
    description: "Learn about Genius Recovery's mission to change how the world understands addiction through compassion, education, and community support.",
    url: "https://geniusrecovery.io/about",
    foundingDate: "2023",
    founder: {
      "@type": "Person",
      name: "Joe Polish",
    },
    mission: "To change the global conversation around addiction through compassion, education, and connection.",
  };

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "About Genius Recovery - Our Mission & Team",
    description: "Learn about Genius Recovery's mission to change how the world understands addiction through compassion, education, and community support.",
    url: "https://geniusrecovery.io/about",
    isPartOf: { "@type": "WebSite", name: "Genius Recovery", url: "https://geniusrecovery.io" },
    datePublished: "2023-01-01",
    dateModified: new Date().toISOString().split('T')[0],
    author: { "@type": "Organization", name: "Genius Recovery" },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://geniusrecovery.io" },
      { "@type": "ListItem", position: 2, name: "About", item: "https://geniusrecovery.io/about" },
    ],
  };

  return (
    <>
      <SEOHead 
        title="About Us - Our Journey from Pain to Purpose | Genius Recovery"
        description="Learn about Genius Recovery's mission to change how the world understands addiction through compassion, education, and community support."
        keywords="addiction recovery, Genius Recovery, addiction support, recovery mission, Joe Polish, compassion-based recovery"
        ogImage="https://new.geniusrecovery.org/genius-recovery-logo.png"
        ogType="website"
        canonicalUrl="https://new.geniusrecovery.org/about"
        structuredData={{
          "@context": "https://schema.org",
          "@graph": [organizationSchema, webPageSchema, breadcrumbSchema]
        }}
      />
      <div className="min-h-screen bg-background">
        <Header />
        <main>
          {/* Hero Section */}
          <section className="relative min-h-[90vh] flex items-center overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-gradient-subtle opacity-40" aria-hidden />
            {/* Animated Background Elements */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse opacity-40" />
            <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-donate/10 rounded-full blur-3xl animate-pulse delay-1000 opacity-30" />
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
              <div className="text-center">
                {/* Badge */}
                <div className="mb-8 animate-fade-in">
                  <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/20 backdrop-blur-sm rounded-full border border-primary/30">
                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                    <span className="text-foreground font-bold tracking-wider uppercase text-sm">
                      About Genius Recovery
                    </span>
                  </div>
                </div>
                {/* Main Headline */}
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-foreground mb-8 leading-tight animate-fade-in">
                  Our Journey: <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-donate to-primary">
                    From Pain to Purpose
                  </span>
                </h1>
                {/* Subheadline */}
                <p className="text-xl md:text-2xl text-foreground/80 mb-12 leading-relaxed font-medium animate-fade-in max-w-4xl mx-auto">
                  Genius Recovery was born out of a mission to change the way the world understands and supports
                  addiction recovery through compassion, education, and connection.
                </p>
                {/* Core Values Preview */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 max-w-4xl mx-auto animate-fade-in">
                  <div className="flex flex-col items-center p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-primary/20">
                    <Heart className="w-12 h-12 text-primary mb-4" />
                    <h3 className="text-lg font-bold text-foreground mb-2">Compassion</h3>
                    <p className="text-muted-foreground text-center">Understanding addiction as a response to pain, not a moral failing</p>
                  </div>
                  <div className="flex flex-col items-center p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-primary/20">
                    <BookOpen className="w-12 h-12 text-primary mb-4" />
                    <h3 className="text-lg font-bold text-foreground mb-2">Education</h3>
                    <p className="text-muted-foreground text-center">Providing trusted resources and expert insights for recovery</p>
                  </div>
                  <div className="flex flex-col items-center p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-primary/20">
                    <Users className="w-12 h-12 text-primary mb-4" />
                    <h3 className="text-lg font-bold text-foreground mb-2">Community</h3>
                    <p className="text-muted-foreground text-center">Building supportive networks for addicts, caregivers, and advocates</p>
                  </div>
                </div>
                {/* CTA */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
                  <Button
                    size="lg"
                    className="px-8 py-6 text-lg font-semibold rounded-full shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 group"
                    style={{
                      background: 'var(--gradient-primary)',
                      boxShadow: 'var(--shadow-elegant)',
                    }}
                    onClick={() => {
                      document.getElementById('our-story')?.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start',
                      });
                    }}
                  >
                    <span className="relative flex items-center gap-2">
                      Learn Our Story
                      <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </Button>
                  <Link to="/donation">
                    <Button
                      variant="outline"
                      size="lg"
                      className="border-primary/30 text-foreground hover:bg-primary/10 hover:text-foreground px-8 py-6 text-lg font-semibold rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-105 bg-white/20"
                    >
                      Join Our Mission
                    </Button>
                  </Link>
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
          {/* Our Story Section */}
          <OurStorySection />
          {/* Our Mission Section */}
          <OurMissionSection />
          {/* Call to Action Section */}
          <section className="relative py-24 overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-donate/5" />
            <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h2 className="text-4xl md:text-5xl font-black text-foreground mb-6">
                Ready to Transform Your{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-donate">
                  Recovery Journey?
                </span>
              </h2>
              <p className="text-xl text-muted-foreground mb-12 max-w-3xl mx-auto">
                Join Genius Recovery and start building the life you love. No judgment—just support, resources, and a
                community that understands.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                <div className="text-center p-8 bg-card/50 backdrop-blur-sm rounded-2xl border border-border/20 hover:shadow-lg transition-all duration-300">
                  <h3 className="text-xl font-bold text-foreground mb-4">I'm Seeking Recovery Support</h3>
                  <p className="text-muted-foreground mb-6">Find guidance and resources for your recovery journey</p>
                  <Link to="/emergency">
                    <Button className="w-full" style={{ background: 'var(--gradient-primary)' }}>
                      Get Help Now
                    </Button>
                  </Link>
                </div>
                <div className="text-center p-8 bg-card/50 backdrop-blur-sm rounded-2xl border border-border/20 hover:shadow-lg transition-all duration-300">
                  <h3 className="text-xl font-bold text-foreground mb-4">I'm Supporting a Loved One</h3>
                  <p className="text-muted-foreground mb-6">Access tools and community for caregivers</p>
                  <Link to="/resources">
                    <Button className="w-full" variant="outline">
                      Find Resources
                    </Button>
                  </Link>
                </div>
                <div className="text-center p-8 bg-card/50 backdrop-blur-sm rounded-2xl border border-border/20 hover:shadow-lg transition-all duration-300">
                  <h3 className="text-xl font-bold text-foreground mb-4">I Want to Support Recovery</h3>
                  <p className="text-muted-foreground mb-6">Contribute to recovery initiatives and support</p>
                  <Link to="/donation">
                    <Button className="w-full" style={{ background: 'var(--gradient-primary)' }}>
                      Donate Now
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default About;