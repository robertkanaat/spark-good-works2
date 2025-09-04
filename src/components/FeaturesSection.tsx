
import { Heart, Shield, MessageCircle, BookOpen, Users, Zap } from "lucide-react";

const FeaturesSection = () => {
  const features = [
    {
      Icon: Heart,
      title: "Compassionate Care",
      description: "Personalized support tailored to your unique recovery journey and individual needs",
    },
    {
      Icon: Shield,
      title: "Safe Environment",
      description: "Protected spaces and confidential support systems designed for healing and growth",
    },
    {
      Icon: MessageCircle,
      title: "24/7 Support",
      description: "Round-the-clock assistance and guidance whenever you need someone to talk to",
    },
    {
      Icon: BookOpen,
      title: "Educational Resources",
      description: "Comprehensive learning materials and tools to support your recovery education",
    },
    {
      Icon: Users,
      title: "Community Connection",
      description: "Connect with others who understand your journey through peer support networks",
    },
    {
      Icon: Zap,
      title: "Innovative Approach",
      description: "Cutting-edge technology and evidence-based methods for effective recovery",
    }
  ];

  return (
    <section className="py-24 bg-background relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-4 py-2 mb-6">
            <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
            <span className="text-sm font-medium text-primary">Features</span>
          </div>
          
           <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
             <span className="bg-gradient-to-r from-primary/10 to-donate/10 px-3 py-1 rounded-lg">Comprehensive Recovery Support</span>
           </h2>
           <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
             Our platform provides everything you need for a successful recovery journey, 
             combining <strong className="text-primary">innovative technology</strong> with <strong className="text-primary">compassionate human support</strong>.
           </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="group relative text-center"
            >
              <div className="relative mb-6 flex justify-center">
                <div className="relative">
                  <div className="w-20 h-20 bg-gradient-to-br from-primary/10 to-primary/5 rounded-full flex items-center justify-center group-hover:scale-110 transition-all duration-300">
                    <feature.Icon 
                      size={32} 
                      className="text-primary" 
                    />
                  </div>
                  <div className="absolute inset-0 bg-primary/10 rounded-full blur-xl opacity-0 group-hover:opacity-40 transition-opacity duration-300"></div>
                </div>
              </div>

               <div>
                 <h3 className="text-xl font-semibold mb-4 text-foreground">
                   {feature.title === "24/7 Support" ? (
                     <span className="bg-primary/10 px-2 py-1 rounded">{feature.title}</span>
                   ) : (
                     feature.title
                   )}
                 </h3>
                 <p className="text-muted-foreground leading-relaxed">
                   {feature.description}
                 </p>
               </div>

              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-px h-full bg-gradient-to-b from-transparent via-border/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
