import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';
import RecoveryQuizForm from '@/components/RecoveryQuizForm';
import LazyBackgroundImage from '@/components/LazyBackgroundImage';

const RecoveryQuiz = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <SEOHead 
        title="Recovery Assessment Quiz | Genius Recovery"
        description="Take our comprehensive recovery assessment quiz to get personalized recommendations and resources for your recovery journey."
        keywords="recovery quiz, addiction assessment, recovery tools, personalized recovery plan"
      />
      
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-24 lg:py-32 overflow-hidden">
          {/* Background with enhanced effects */}
          <div className="absolute inset-0 w-full h-full">
            <img 
              src="/genius-recovery-uploads/879915a0-9251-4cd3-8f03-11b3f3a07f1d.png"
              alt="Recovery assessment background"
              className="w-full h-full object-cover opacity-20"
            />
          </div>
          
          {/* Enhanced gradient overlays with deeper, more vibrant colors */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/95 via-indigo-900/90 to-blue-800/95" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-purple-900/30 to-indigo-900/40" />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 via-purple-800/30 to-indigo-900/20" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-600/10 to-slate-900/30" />
          
          {/* Animated floating elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-20 left-10 w-2 h-2 bg-yellow-400/60 rounded-full animate-bounce" style={{animationDelay: '0s', animationDuration: '3s'}}></div>
            <div className="absolute top-40 right-20 w-3 h-3 bg-orange-400/60 rounded-full animate-bounce" style={{animationDelay: '1s', animationDuration: '4s'}}></div>
            <div className="absolute bottom-40 left-20 w-2 h-2 bg-pink-400/60 rounded-full animate-bounce" style={{animationDelay: '2s', animationDuration: '3.5s'}}></div>
            <div className="absolute bottom-20 right-10 w-1 h-1 bg-cyan-400/60 rounded-full animate-bounce" style={{animationDelay: '0.5s', animationDuration: '2.5s'}}></div>
          </div>
          
          <div className="relative container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center text-white">
               {/* Enhanced badge with deeper colors */}
               <div className="inline-flex items-center px-6 py-3 rounded-full bg-white/25 backdrop-blur-md border border-white/40 mb-8 shadow-2xl shadow-purple-500/20">
                 <div className="w-2 h-2 bg-emerald-400 rounded-full mr-3 animate-pulse shadow-lg shadow-emerald-400/50"></div>
                 <span className="text-sm font-medium text-white">Free • Confidential • Personalized</span>
                 <div className="w-2 h-2 bg-cyan-400 rounded-full ml-3 animate-pulse shadow-lg shadow-cyan-400/50" style={{animationDelay: '1s'}}></div>
               </div>
              
              {/* Enhanced title with better gradient */}
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                <span className="block mb-2">Recovery</span>
                <span className="block bg-gradient-to-r from-yellow-200 via-orange-300 to-pink-400 bg-clip-text text-transparent animate-pulse">
                  Assessment Quiz
                </span>
              </h1>
              
              {/* Enhanced subtitle */}
              <p className="text-xl md:text-2xl mb-12 text-white/95 max-w-3xl mx-auto leading-relaxed font-light">
                Get <span className="font-semibold text-yellow-300">personalized insights</span> and recommendations for your recovery journey. 
                This comprehensive assessment takes just <span className="font-semibold text-orange-300">5-10 minutes</span> and provides valuable 
                guidance tailored to your unique situation.
              </p>
              
              {/* Enhanced feature badges */}
              <div className="flex flex-wrap justify-center gap-4 text-sm mb-8">
                <div className="flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-full px-6 py-3 border border-white/20 shadow-lg transform hover:scale-105 transition-transform">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="font-medium">100% Confidential</span>
                </div>
                <div className="flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-full px-6 py-3 border border-white/20 shadow-lg transform hover:scale-105 transition-transform">
                  <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
                  <span className="font-medium">Evidence-Based</span>
                </div>
                <div className="flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-full px-6 py-3 border border-white/20 shadow-lg transform hover:scale-105 transition-transform">
                  <div className="w-3 h-3 bg-purple-400 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
                  <span className="font-medium">Instant Results</span>
                </div>
              </div>
              
              {/* Call to action indicator */}
              <div className="flex items-center justify-center gap-2 text-yellow-300 animate-bounce">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
                <span className="text-sm font-medium">Take the Assessment Below</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </div>
            </div>
          </div>
        </section>

        {/* Quiz Form Section */}
        <section className="py-16 lg:py-24 bg-gradient-to-b from-background via-secondary/5 to-background">
          <div className="container mx-auto px-4">
            <RecoveryQuizForm />
          </div>
        </section>

        {/* Information Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Why Take This Assessment?
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Our scientifically-backed assessment helps you understand where you are 
                  in your recovery journey and provides personalized next steps.
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="text-center p-6 rounded-2xl bg-card border border-border/50 hover:border-primary/20 transition-all duration-300 hover:shadow-lg">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl text-white">🎯</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Personalized Insights</h3>
                  <p className="text-muted-foreground">
                    Get tailored recommendations based on your unique circumstances and goals.
                  </p>
                </div>
                
                <div className="text-center p-6 rounded-2xl bg-card border border-border/50 hover:border-primary/20 transition-all duration-300 hover:shadow-lg">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl text-white">📊</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Progress Tracking</h3>
                  <p className="text-muted-foreground">
                    Understand your current stage and track your progress over time.
                  </p>
                </div>
                
                <div className="text-center p-6 rounded-2xl bg-card border border-border/50 hover:border-primary/20 transition-all duration-300 hover:shadow-lg md:col-span-2 lg:col-span-1">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl text-white">🛠️</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Actionable Resources</h3>
                  <p className="text-muted-foreground">
                    Receive specific tools and resources to support your next steps.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default RecoveryQuiz;