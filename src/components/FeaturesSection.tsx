
import { useState, useEffect } from "react";

const FeaturesSection = () => {
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);

  // Add keyframes to document head for the float animation
  useEffect(() => {
    const styleElement = document.createElement('style');
    styleElement.textContent = `
      @keyframes float {
        0%, 100% { transform: translateY(0px) rotate(0deg); }
        25% { transform: translateY(-10px) rotate(90deg); }
        50% { transform: translateY(-20px) rotate(180deg); }
        75% { transform: translateY(-10px) rotate(270deg); }
      }
      .float-animation {
        animation: float 3s ease-in-out infinite;
      }
    `;
    document.head.appendChild(styleElement);

    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);

  const features = [
    {
      icon: "🤖",
      title: "24/7 AI Recovery Support",
      description: "Advanced AI companion available whenever you need support, guidance, or someone to talk to",
      color: "from-slate-500 to-slate-600",
      bgColor: "from-slate-50 to-slate-100",
      darkBgColor: "from-slate-950/20 to-slate-900/20"
    },
    {
      icon: "🏥",
      title: "Treatment Center Network",
      description: "Comprehensive directory of vetted treatment centers and recovery programs nationwide",
      color: "from-slate-600 to-slate-700",
      bgColor: "from-slate-50 to-slate-100",
      darkBgColor: "from-slate-950/20 to-slate-900/20"
    },
    {
      icon: "👥",
      title: "Peer Support Community",
      description: "Connect with others in recovery through our moderated support groups and forums",
      color: "from-slate-700 to-slate-800",
      bgColor: "from-slate-50 to-slate-100",
      darkBgColor: "from-slate-950/20 to-slate-900/20"
    },
    {
      icon: "📱",
      title: "Mobile Recovery App",
      description: "Access tools, resources, and support directly from your smartphone or tablet",
      color: "from-primary to-primary",
      bgColor: "from-primary/5 to-primary/10",
      darkBgColor: "from-primary/10 to-primary/20"
    },
    {
      icon: "🎯",
      title: "Personalized Recovery Plans",
      description: "Customized recovery paths based on your specific needs and circumstances",
      color: "from-slate-400 to-slate-500",
      bgColor: "from-slate-50 to-slate-100",
      darkBgColor: "from-slate-950/20 to-slate-900/20"
    },
    {
      icon: "📊",
      title: "Progress Tracking",
      description: "Monitor your recovery journey with comprehensive tracking and milestone recognition",
      color: "from-slate-600 to-slate-700",
      bgColor: "from-slate-50 to-slate-100",
      darkBgColor: "from-slate-950/20 to-slate-900/20"
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-background via-muted/10 to-background relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl"></div>
        <div className="absolute top-3/4 left-1/3 w-64 h-64 bg-green-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-primary/10 to-orange-500/10 backdrop-blur-sm rounded-full px-8 py-4 mb-8">
            <span className="text-3xl">💝</span>
            <span className="font-semibold text-primary text-lg">Your Donation Impact</span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
            Every donation brings hope and healing to someone in recovery
          </h2>
          <p className="text-xl text-muted-foreground max-w-5xl mx-auto leading-relaxed">
            When you give to Genius Recovery, your donation goes directly to funding recovery support services, 
            AI technology, and community programs that save lives.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="group relative"
              onMouseEnter={() => setHoveredFeature(index)}
              onMouseLeave={() => setHoveredFeature(null)}
            >
              <div className={`relative p-8 rounded-3xl transition-all duration-500 hover:scale-105 hover:-translate-y-2 cursor-pointer overflow-hidden border border-white/20 shadow-xl hover:shadow-2xl bg-gradient-to-br ${feature.bgColor} dark:${feature.darkBgColor}`}>
                {/* Animated background gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                
                {/* Floating particles effect */}
                <div className="absolute inset-0 overflow-hidden">
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className={`absolute w-2 h-2 bg-gradient-to-r ${feature.color} rounded-full opacity-0 group-hover:opacity-60 transition-all duration-1000 ${hoveredFeature === index ? 'float-animation' : ''}`}
                      style={{
                        left: `${20 + i * 30}%`,
                        top: `${30 + i * 20}%`,
                        animationDelay: `${i * 0.3}s`,
                      }}
                    ></div>
                  ))}
                </div>

                <div className="relative z-10">
                  {/* Icon with enhanced animation */}
                  <div className="flex items-center mb-6">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mr-4 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-lg`}>
                      <span className="text-2xl filter drop-shadow-sm">{feature.icon}</span>
                    </div>
                    <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${feature.color} opacity-20 group-hover:opacity-40 transition-opacity duration-500`}></div>
                  </div>

                  {/* Animated checkmark */}
                  <div className="flex items-start mb-4">
                    <div className={`mr-4 mt-1 flex-shrink-0 transition-all duration-500 ${hoveredFeature === index ? 'scale-125 rotate-12' : ''}`}>
                      <div className={`w-6 h-6 rounded-full bg-gradient-to-r ${feature.color} flex items-center justify-center shadow-lg`}>
                        <span className="text-white text-sm font-bold">✓</span>
                      </div>
                    </div>
                    <div>
                      <h3 className={`text-xl font-bold mb-3 transition-all duration-300 group-hover:bg-gradient-to-r group-hover:${feature.color} group-hover:bg-clip-text group-hover:text-transparent`}>
                        {feature.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed group-hover:text-foreground/80 transition-colors duration-300">
                        {feature.description}
                      </p>
                    </div>
                  </div>

                  {/* Progress bar animation */}
                  <div className="mt-6 h-1 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className={`h-full bg-gradient-to-r ${feature.color} transition-all duration-1000 ease-out rounded-full`}
                      style={{ 
                        width: hoveredFeature === index ? '100%' : '0%',
                        boxShadow: hoveredFeature === index ? `0 0 10px rgba(255,255,255,0.5)` : 'none'
                      }}
                    ></div>
                  </div>
                </div>

                {/* Corner decorations */}
                <div className="absolute top-4 right-4 w-3 h-3 bg-gradient-to-br from-primary/30 to-orange-500/30 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute bottom-4 left-4 w-2 h-2 bg-gradient-to-br from-orange-500/30 to-primary/30 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Enhanced call-to-action */}
        <div className="text-center">
          <div className="inline-flex items-center gap-4 bg-gradient-to-r from-primary/10 via-orange-500/10 to-primary/10 backdrop-blur-sm rounded-3xl p-8 border border-primary/20 hover:border-primary/40 transition-all duration-500 hover:scale-105 cursor-pointer">
            <div className="flex items-center gap-2">
              <span className="text-4xl animate-bounce">🌟</span>
              <div className="text-left">
                <div className="text-xl font-bold bg-gradient-to-r from-primary to-orange-500 bg-clip-text text-transparent">
                  Ready to make a difference?
                </div>
                <div className="text-muted-foreground">
                  Your support powers these life-changing programs
                </div>
              </div>
            </div>
            <span className="text-4xl animate-pulse">💖</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
