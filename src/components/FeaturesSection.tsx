
import { Bot, MapPin, Users, Smartphone, Target, TrendingUp } from "lucide-react";

const FeaturesSection = () => {
  const features = [
    {
      Icon: Bot,
      title: "24/7 AI Recovery Support",
      description: "Advanced AI companion available whenever you need support, guidance, or someone to talk to",
    },
    {
      Icon: MapPin,
      title: "Treatment Center Network",
      description: "Comprehensive directory of vetted treatment centers and recovery programs nationwide",
    },
    {
      Icon: Users,
      title: "Peer Support Community",
      description: "Connect with others in recovery through our moderated support groups and forums",
    },
    {
      Icon: Smartphone,
      title: "Mobile Recovery App",
      description: "Access tools, resources, and support directly from your smartphone or tablet",
    },
    {
      Icon: Target,
      title: "Personalized Recovery Plans",
      description: "Customized recovery paths based on your specific needs and circumstances",
    },
    {
      Icon: TrendingUp,
      title: "Progress Tracking",
      description: "Monitor your recovery journey with comprehensive tracking and milestone recognition",
    }
  ];

  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(68,68,68,.02)_50%,transparent_75%,transparent)] bg-[length:60px_60px]"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-6 py-2 mb-6">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-primary">Your Impact</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Every donation brings hope and healing
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            When you give to Genius Recovery, your donation funds recovery support services, 
            AI technology, and community programs that save lives.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="group relative"
            >
              {/* Connecting line to next item (desktop only) */}
              {index < features.length - 1 && index % 3 !== 2 && (
                <div className="hidden lg:block absolute top-12 -right-6 w-12 h-px bg-gradient-to-r from-border to-transparent"></div>
              )}
              
              <div className="relative p-8 transition-all duration-300 hover:-translate-y-1">
                {/* Icon container */}
                <div className="relative mb-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                    <feature.Icon 
                      size={28} 
                      className="text-primary group-hover:scale-110 transition-transform duration-300" 
                    />
                  </div>
                  {/* Subtle glow effect */}
                  <div className="absolute inset-0 bg-primary/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
                </div>

                {/* Content */}
                <div>
                  <h3 className="text-xl font-semibold mb-3 text-foreground group-hover:text-primary transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed text-sm">
                    {feature.description}
                  </p>
                </div>

                {/* Subtle bottom accent */}
                <div className="absolute bottom-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-border to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Call-to-action */}
        <div className="text-center mt-20">
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-primary/5 to-primary/10 backdrop-blur-sm rounded-2xl px-8 py-4 border border-primary/20 hover:border-primary/30 transition-all duration-300 hover:scale-105 cursor-pointer group">
            <div className="w-3 h-3 bg-primary rounded-full animate-pulse"></div>
            <span className="font-medium text-foreground group-hover:text-primary transition-colors duration-300">
              Ready to make a difference? Your support powers these programs
            </span>
            <div className="w-2 h-2 bg-primary/60 rounded-full"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
