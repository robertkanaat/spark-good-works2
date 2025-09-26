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
      <Helmet>
        <title>About Us - Our Journey from Pain to Purpose | Genius Recovery</title>
        <meta name="description" content="Learn about Genius Recovery's mission to change how the world understands addiction through compassion, education, and community support." />
        <meta name="keywords" content="addiction recovery, Genius Recovery, addiction support, recovery mission, Joe Polish, compassion-based recovery" />
        <meta property="og:title" content="About Us - Our Journey from Pain to Purpose | Genius Recovery" />
        <meta property="og:description" content="Learn about Genius Recovery's mission to change how the world understands addiction through compassion, education, and community support." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://geniusrecovery.io/about" />
        <meta property="og:image" content="https://geniusrecovery.io/genius-recovery-logo.png" />
        <meta property="og:site_name" content="Genius Recovery" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="About Us - Our Journey from Pain to Purpose | Genius Recovery" />
        <meta name="twitter:description" content="Learn about Genius Recovery's mission to change how the world understands addiction through compassion, education, and community support." />
        <meta name="twitter:image" content="https://geniusrecovery.io/genius-recovery-logo.png" />
        <link rel="canonical" href="https://geniusrecovery.io/about" />
      </Helmet>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [organizationSchema, webPageSchema, breadcrumbSchema]
          })
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
                
                {/* Mission Statement */}
                <div className="mb-12 max-w-5xl mx-auto">
                  <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-orange-500/10 rounded-2xl p-8 border border-primary/20">
                    <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">Our Mission</h2>
                    <p className="text-lg md:text-xl text-foreground leading-relaxed">
                      Our mission is to change the global conversation around addiction through compassion, education, and connection. 
                      At Genius Recovery, we provide trusted resources, expert insights, and a supportive community for addicts, 
                      caregivers, and advocates. Together, we're creating a world that views recovery with understanding and hope.
                    </p>
                  </div>
                </div>
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
                      Support Our Cause
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
          
          {/* Vision & Values Section */}
          <section className="relative py-24 overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-background via-orange-500/5 to-background" />
            
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* Vision */}
              <div className="text-center mb-20">
                <div className="inline-flex items-center gap-3 px-6 py-3 bg-card/80 backdrop-blur-sm rounded-full border border-primary/20 mb-6">
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                  <span className="text-foreground font-bold tracking-wider uppercase text-sm">
                    Our Vision
                  </span>
                </div>
                
                <h2 className="text-4xl md:text-5xl font-black text-foreground mb-8 leading-tight">
                  A World That Views Recovery with{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-orange-500 to-primary">
                    Understanding & Hope
                  </span>
                </h2>
                
                <div className="max-w-4xl mx-auto">
                  <p className="text-xl text-foreground/90 leading-relaxed mb-8">
                    We envision a world where addiction is understood not as a moral failing, but as a response to pain. 
                    A world where those struggling find compassion instead of judgment, connection instead of isolation, 
                    and hope instead of despair.
                  </p>
                  
                  {/* Joe Polish Quote */}
                  <div className="relative p-8 bg-gradient-to-r from-primary/10 via-primary/5 to-orange-500/10 rounded-2xl border border-primary/20">
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                        <span className="text-primary-foreground text-lg font-bold">"</span>
                      </div>
                    </div>
                    <blockquote className="text-lg md:text-xl italic text-foreground leading-relaxed mb-4">
                      "Addiction isn't a failure—it's a response to pain. When we address the trauma, 
                      we unlock the potential for true healing."
                    </blockquote>
                    <cite className="text-primary font-semibold">— Joe Polish, Founder</cite>
                  </div>
                </div>
              </div>
              
              {/* Values */}
              <div className="text-center mb-16">
                <div className="inline-flex items-center gap-3 px-6 py-3 bg-card/80 backdrop-blur-sm rounded-full border border-primary/20 mb-6">
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                  <span className="text-foreground font-bold tracking-wider uppercase text-sm">
                    Our Values
                  </span>
                </div>
                
                <h2 className="text-4xl md:text-5xl font-black text-foreground mb-12 leading-tight">
                  What Drives Our{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-500">
                    Mission
                  </span>
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                  <div className="text-center p-6 bg-card/50 backdrop-blur-sm rounded-2xl border border-border/20 hover:shadow-lg transition-all duration-300">
                    <Heart className="w-12 h-12 text-primary mx-auto mb-4" />
                    <h3 className="text-lg font-bold text-foreground mb-3">Compassion</h3>
                    <p className="text-sm text-muted-foreground">Approaching addiction with understanding and empathy, not judgment</p>
                  </div>
                  
                  <div className="text-center p-6 bg-card/50 backdrop-blur-sm rounded-2xl border border-border/20 hover:shadow-lg transition-all duration-300">
                    <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <div className="w-6 h-6 bg-primary rounded-full"></div>
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-3">Empowerment</h3>
                    <p className="text-sm text-muted-foreground">Providing tools and knowledge to help people reclaim their lives</p>
                  </div>
                  
                  <div className="text-center p-6 bg-card/50 backdrop-blur-sm rounded-2xl border border-border/20 hover:shadow-lg transition-all duration-300">
                    <BookOpen className="w-12 h-12 text-primary mx-auto mb-4" />
                    <h3 className="text-lg font-bold text-foreground mb-3">Education</h3>
                    <p className="text-sm text-muted-foreground">Sharing research-backed insights and expert knowledge</p>
                  </div>
                  
                  <div className="text-center p-6 bg-card/50 backdrop-blur-sm rounded-2xl border border-border/20 hover:shadow-lg transition-all duration-300">
                    <Users className="w-12 h-12 text-primary mx-auto mb-4" />
                    <h3 className="text-lg font-bold text-foreground mb-3">Community</h3>
                    <p className="text-sm text-muted-foreground">Building supportive networks for healing and connection</p>
                  </div>
                  
                  <div className="text-center p-6 bg-card/50 backdrop-blur-sm rounded-2xl border border-border/20 hover:shadow-lg transition-all duration-300">
                    <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <div className="w-8 h-8 border-2 border-primary rounded-full border-dashed animate-spin"></div>
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-3">Healing</h3>
                    <p className="text-sm text-muted-foreground">Creating pathways to address root causes of addiction and trauma</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          {/* Our Story Section */}
          <OurStorySection />
          
          {/* Meet Andre Norman Section */}
          <section className="relative py-24 overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
            <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-pulse opacity-30" />
            <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-primary/10 rounded-full blur-3xl animate-pulse delay-1000 opacity-40" />
            
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <div className="inline-flex items-center gap-3 px-6 py-3 bg-card/80 backdrop-blur-sm rounded-full border border-primary/20 mb-6">
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                  <span className="text-foreground font-bold tracking-wider uppercase text-sm">
                    Leadership Team
                  </span>
                </div>
                
                <h2 className="text-4xl md:text-5xl font-black text-foreground mb-8 leading-tight">
                  Meet{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-primary to-orange-500">
                    Andre Norman
                  </span>
                </h2>
                
                <p className="text-xl text-foreground/90 leading-relaxed max-w-3xl mx-auto mb-12">
                  From Maximum Security Prison to Harvard University - Andre's incredible transformation story 
                  embodies the power of second chances and redemption.
                </p>
              </div>
              
              <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
                {/* Left Column - Story */}
                <div className="space-y-6">
                  <div className="bg-gradient-to-r from-purple-500/10 via-primary/5 to-orange-500/10 rounded-2xl p-8 border border-primary/20">
                    <h3 className="text-2xl font-bold text-foreground mb-4">An Impossible Dream Realized</h3>
                    <p className="text-foreground/90 leading-relaxed mb-6">
                      Andre Norman's journey from the depths of maximum security prison to the halls of Harvard University 
                      is nothing short of extraordinary. His transformation represents the ultimate proof that no one is 
                      beyond redemption, and that the most broken among us can become the most powerful agents of change.
                    </p>
                    <p className="text-foreground/90 leading-relaxed">
                      Through his work with Second Chance University, Andre has dedicated his life to helping others 
                      discover their own potential for transformation, proving that education, mentorship, and belief 
                      in human possibility can overcome even the most challenging circumstances.
                    </p>
                  </div>
                  
                  {/* Quote */}
                  <div className="relative p-6 bg-card/50 backdrop-blur-sm rounded-2xl border border-border/20">
                    <div className="absolute -top-3 left-6">
                      <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                        <span className="text-primary-foreground text-sm font-bold">"</span>
                      </div>
                    </div>
                    <blockquote className="text-lg italic text-foreground/90 leading-relaxed mb-3">
                      "Your past doesn't determine your future. Every day is an opportunity to write a new chapter 
                      in the story of your life."
                    </blockquote>
                    <cite className="text-primary font-semibold">— Andre Norman</cite>
                  </div>
                </div>
                
                {/* Right Column - Impact & Stats */}
                <div className="space-y-6">
                  <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-8 border border-border/20">
                    <h3 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
                      <BookOpen className="w-8 h-8 text-primary" />
                      Second Chance University
                    </h3>
                    <p className="text-foreground/90 leading-relaxed mb-6">
                      Founder of Second Chance University, Andre provides people with a supportive environment 
                      to learn and grow, empowering them to overcome the challenges and obstacles that are holding them back.
                    </p>
                    
                    {/* Impact Numbers */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-4 bg-gradient-to-br from-primary/10 to-orange-500/10 rounded-xl border border-primary/20">
                        <div className="text-3xl font-black text-primary mb-1">200K+</div>
                        <div className="text-sm text-foreground/80 font-medium">Prisoners Impacted</div>
                      </div>
                      <div className="text-center p-4 bg-gradient-to-br from-primary/10 to-orange-500/10 rounded-xl border border-primary/20">
                        <div className="text-3xl font-black text-primary mb-1">45</div>
                        <div className="text-sm text-foreground/80 font-medium">States Visited</div>
                      </div>
                      <div className="text-center p-4 bg-gradient-to-br from-primary/10 to-orange-500/10 rounded-xl border border-primary/20">
                        <div className="text-3xl font-black text-primary mb-1">25</div>
                        <div className="text-sm text-foreground/80 font-medium">Countries Reached</div>
                      </div>
                      <div className="text-center p-4 bg-gradient-to-br from-primary/10 to-orange-500/10 rounded-xl border border-primary/20">
                        <div className="text-3xl font-black text-primary mb-1">8M+</div>
                        <div className="text-sm text-foreground/80 font-medium">Social Media Impact</div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Mission Alignment */}
                  <div className="bg-gradient-to-r from-purple-500/10 via-primary/5 to-orange-500/10 rounded-2xl p-6 border border-primary/20">
                    <h4 className="text-lg font-bold text-foreground mb-3 flex items-center gap-2">
                      <Heart className="w-5 h-5 text-primary" />
                      Aligned with Genius Recovery
                    </h4>
                    <p className="text-foreground/90 leading-relaxed text-sm">
                      Andre's expertise in transformation and second chances perfectly complements Genius Recovery's 
                      mission of changing how the world understands addiction and recovery. Together, we're proving 
                      that redemption is possible for everyone.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
          
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
                    <Button variant="donate" className="w-full">
                      Get Help Now
                    </Button>
                  </Link>
                </div>
                <div className="text-center p-8 bg-card/50 backdrop-blur-sm rounded-2xl border border-border/20 hover:shadow-lg transition-all duration-300">
                  <h3 className="text-xl font-bold text-foreground mb-4">I'm Supporting a Loved One</h3>
                  <p className="text-muted-foreground mb-6">Access tools and community for caregivers</p>
                  <Link to="/resources">
                    <Button variant="donate" className="w-full">
                      Find Resources
                    </Button>
                  </Link>
                </div>
                <div className="text-center p-8 bg-card/50 backdrop-blur-sm rounded-2xl border border-border/20 hover:shadow-lg transition-all duration-300">
                  <h3 className="text-xl font-bold text-foreground mb-4">I Want to Support Recovery</h3>
                  <p className="text-muted-foreground mb-6">Contribute to recovery initiatives and support</p>
                  <Link to="/donation">
                    <Button variant="donate" className="w-full">
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