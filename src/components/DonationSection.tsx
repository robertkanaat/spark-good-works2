
import { Link } from "react-router-dom";
import { useState } from "react";

const DonationSection = () => {
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);

  return (
    <section className="py-20 bg-gradient-to-br from-background via-primary/5 to-background relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl animate-bounce"></div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-16">
          {/* HELP Button */}
          <div 
            className="text-center group"
            onMouseEnter={() => setHoveredButton('help')}
            onMouseLeave={() => setHoveredButton(null)}
          >
            <div className="text-muted-foreground text-sm mb-4 font-medium tracking-wide">I NEED...</div>
            <Link to="/emergency" className="block">
              <div className="relative">
                <button className="border-2 border-border hover:border-primary/50 bg-white/80 backdrop-blur-sm hover:bg-muted/50 px-10 py-8 text-xl font-bold rounded-2xl w-full transition-all duration-500 hover:scale-105 hover:-translate-y-2 shadow-lg hover:shadow-2xl group-hover:shadow-primary/20 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative z-10 flex items-center justify-center gap-3">
                    <span className={`text-3xl transition-transform duration-500 ${hoveredButton === 'help' ? 'scale-125 rotate-12' : ''}`}>🆘</span>
                    <span>HELP</span>
                  </div>
                  {/* Floating particles */}
                  {hoveredButton === 'help' && (
                    <>
                      <div className="absolute top-2 right-2 w-2 h-2 bg-primary/40 rounded-full animate-bounce"></div>
                      <div className="absolute bottom-2 left-2 w-1 h-1 bg-orange-500/40 rounded-full animate-ping"></div>
                    </>
                  )}
                </button>
              </div>
            </Link>
          </div>
          
          {/* DONATE Button */}
          <div 
            className="text-center group"
            onMouseEnter={() => setHoveredButton('donate')}
            onMouseLeave={() => setHoveredButton(null)}
          >
            <div className="text-muted-foreground text-sm mb-4 font-medium tracking-wide">I WANT TO...</div>
            <Link to="/donation" className="block">
              <div className="relative">
                <button className="bg-gradient-to-r from-primary to-orange-500 hover:from-primary/90 hover:to-orange-500/90 text-white px-10 py-8 text-xl font-bold rounded-2xl w-full transition-all duration-500 hover:scale-110 hover:-translate-y-3 shadow-xl hover:shadow-2xl hover:shadow-primary/30 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative z-10 flex items-center justify-center gap-3">
                    <span className={`text-3xl transition-transform duration-500 ${hoveredButton === 'donate' ? 'scale-125 animate-bounce' : ''}`}>💝</span>
                    <span>DONATE</span>
                  </div>
                  {/* Sparkle effects */}
                  {hoveredButton === 'donate' && (
                    <>
                      <div className="absolute top-1 left-4 text-yellow-300 animate-ping">✨</div>
                      <div className="absolute bottom-1 right-4 text-yellow-200 animate-pulse">⭐</div>
                      <div className="absolute top-3 right-8 text-white/60 animate-bounce">💫</div>
                    </>
                  )}
                </button>
              </div>
            </Link>
          </div>
          
          {/* SUPPORT Button */}
          <div 
            className="text-center group"
            onMouseEnter={() => setHoveredButton('support')}
            onMouseLeave={() => setHoveredButton(null)}
          >
            <div className="text-muted-foreground text-sm mb-4 font-medium tracking-wide">I WANT TO...</div>
            <Link to="/support" className="block">
              <div className="relative">
                <button className="border-2 border-border hover:border-green-500/50 bg-white/80 backdrop-blur-sm hover:bg-green-50/50 px-10 py-8 text-xl font-bold rounded-2xl w-full transition-all duration-500 hover:scale-105 hover:-translate-y-2 shadow-lg hover:shadow-2xl group-hover:shadow-green-500/20 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative z-10 flex items-center justify-center gap-3">
                    <span className={`text-3xl transition-transform duration-500 ${hoveredButton === 'support' ? 'scale-125 rotate-12' : ''}`}>🤝</span>
                    <span>SUPPORT</span>
                  </div>
                  {/* Floating hearts */}
                  {hoveredButton === 'support' && (
                    <>
                      <div className="absolute top-2 left-2 text-red-400 animate-pulse">💚</div>
                      <div className="absolute bottom-2 right-2 text-pink-400 animate-bounce">💙</div>
                    </>
                  )}
                </button>
              </div>
            </Link>
          </div>
        </div>
        
        <div className="relative">
          <div className="text-lg text-muted-foreground mb-8 leading-relaxed max-w-4xl mx-auto">
            Join thousands of people around the world who are supporting recovery, healing, and hope for those affected by addiction.
          </div>

          {/* Enhanced statistics with animations */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30 p-6 rounded-2xl border border-blue-200/50 hover:border-blue-300/50 transition-all duration-300 hover:scale-105 group">
              <div className="text-3xl font-bold text-blue-600 mb-2 group-hover:scale-110 transition-transform duration-300">15,000+</div>
              <div className="text-sm text-blue-700/80 font-medium">People Helped This Year</div>
            </div>
            
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 p-6 rounded-2xl border border-green-200/50 hover:border-green-300/50 transition-all duration-300 hover:scale-105 group">
              <div className="text-3xl font-bold text-green-600 mb-2 group-hover:scale-110 transition-transform duration-300">$2.5M+</div>
              <div className="text-sm text-green-700/80 font-medium">Donated to Recovery Programs</div>
            </div>
            
            <div className="bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-950/30 dark:to-violet-950/30 p-6 rounded-2xl border border-purple-200/50 hover:border-purple-300/50 transition-all duration-300 hover:scale-105 group">
              <div className="text-3xl font-bold text-purple-600 mb-2 group-hover:scale-110 transition-transform duration-300">98%</div>
              <div className="text-sm text-purple-700/80 font-medium">User Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DonationSection;
