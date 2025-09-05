
import { useState, useEffect } from "react";

const StatsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [animatedNumbers, setAnimatedNumbers] = useState({
    addiction: 0,
    supported: 0,
    lessAlone: 0
  });

  const stats = [
    {
      number: "21 million",
      animatedNumber: 21,
      suffix: " million",
      label: "Americans struggle with addiction",
      description: "That's 1 in 12 people needing support",
      color: "from-red-500 to-pink-500",
      icon: "👥"
    },
    {
      number: "24/7",
      animatedNumber: 24,
      suffix: "/7",
      label: "AI Recovery Companion available",
      description: "Always there when you need support most",
      color: "from-blue-500 to-cyan-500",
      icon: "🤖"
    },
    {
      number: "50,000+",
      animatedNumber: 50000,
      suffix: "+",
      label: "people supported in recovery",
      description: "Building a community of hope and healing",
      color: "from-green-500 to-emerald-500",
      icon: "❤️"
    },
    {
      number: "95%",
      animatedNumber: 95,
      suffix: "%",
      label: "report feeling less alone",
      description: "Connection and community make all the difference",
      color: "from-purple-500 to-violet-500",
      icon: "🌟"
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Animate numbers
          const duration = 2000;
          const steps = 60;
          const stepDuration = duration / steps;
          
          let step = 0;
          const timer = setInterval(() => {
            step++;
            const progress = step / steps;
            const easeOut = 1 - Math.pow(1 - progress, 3);
            
            setAnimatedNumbers({
              addiction: Math.floor(21 * easeOut),
              supported: Math.floor(50000 * easeOut),
              lessAlone: Math.floor(95 * easeOut)
            });
            
            if (step >= steps) {
              clearInterval(timer);
            }
          }, stepDuration);
        }
      },
      { threshold: 0.3 }
    );

    const section = document.getElementById('stats-section');
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section id="stats-section" className="py-24 bg-gradient-to-br from-muted/20 via-background to-primary/5 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-orange-500/10 rounded-full blur-3xl animate-bounce"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-primary/5 to-orange-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="inline-flex items-center gap-2 bg-primary/10 backdrop-blur-sm rounded-full px-6 py-3 mb-6">
              <span className="text-2xl">📊</span>
              <span className="font-medium text-primary">Impact & Reach</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
              The addiction crisis affects us all
            </h2>
             <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
               <strong className="text-primary bg-primary/10 px-2 py-1 rounded">Access to recovery support changes everything.</strong> It means hope, healing, and connection for individuals and families affected by addiction.
             </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className={`group relative transition-all duration-1000 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 text-center border border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105 hover:-translate-y-2 overflow-hidden group">
                {/* Gradient background on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-3xl`}></div>
                
                {/* Animated icon */}
                <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-500">
                  {stat.icon}
                </div>
                
                {/* Animated number */}
                <div className={`text-5xl md:text-6xl font-bold mb-3 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-500`}>
                  {index === 0 && `${animatedNumbers.addiction}${stat.suffix}`}
                  {index === 1 && stat.number}
                  {index === 2 && `${animatedNumbers.supported.toLocaleString()}${stat.suffix}`}
                  {index === 3 && `${animatedNumbers.lessAlone}${stat.suffix}`}
                </div>
                
                <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors duration-300">
                  {stat.label}
                </h3>
                
                <p className="text-muted-foreground leading-relaxed group-hover:text-foreground/80 transition-colors duration-300">
                  {stat.description}
                </p>

                {/* Decorative elements */}
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-primary/20 to-orange-500/20 rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-gradient-to-br from-orange-500/20 to-primary/20 rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to action */}
        <div className={`text-center mt-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '800ms' }}>
          <div className="inline-flex items-center gap-4 bg-gradient-to-r from-primary/10 to-orange-500/10 backdrop-blur-sm rounded-2xl p-6 border border-primary/20">
            <span className="text-3xl">✨</span>
             <span className="text-lg font-medium">
                Every number represents real lives touched by hope and healing
              </span>
            <span className="text-3xl">💝</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
