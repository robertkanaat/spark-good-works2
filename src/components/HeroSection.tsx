import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-recovery-person.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-hero-overlay/60"></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="max-w-3xl">
          <div className="mb-6">
            <span className="text-primary font-semibold text-sm tracking-wider uppercase">
              ADDICTION RECOVERY SUPPORT
            </span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-8 leading-tight">
            Our mission is to change the{" "}
            <span className="text-primary">global conversation around addiction</span>{" "}
            from one of judgment to one of compassion
          </h1>
          
          <div className="flex flex-col sm:flex-row gap-4 mt-12">
            <div className="text-center">
              <div className="text-white/70 text-sm mb-2">I NEED...</div>
              <Button variant="outline" className="bg-white/10 border-white/30 text-white hover:bg-white/20 px-8 py-6 text-lg font-semibold">
                HELP
              </Button>
            </div>
            
            <div className="text-center">
              <div className="text-white/70 text-sm mb-2">I WANT TO...</div>
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg font-semibold">
                DONATE
              </Button>
            </div>
            
            <div className="text-center">
              <div className="text-white/70 text-sm mb-2">I WANT TO...</div>
              <Button variant="outline" className="bg-white/10 border-white/30 text-white hover:bg-white/20 px-8 py-6 text-lg font-semibold">
                SUPPORT
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;