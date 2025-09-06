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
          <div className="absolute inset-0 w-full h-full">
            <img 
              src="/genius-recovery-uploads/879915a0-9251-4cd3-8f03-11b3f3a07f1d.png"
              alt="Recovery assessment background"
              className="w-full h-full object-cover opacity-30"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-br from-primary/95 via-primary/90 to-secondary/95" />
          <div className="absolute inset-0 bg-gradient-to-t from-background/20 via-transparent to-background/10" />
          
          <div className="relative container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center text-white">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 mb-8">
                <span className="text-sm font-medium">Free • Confidential • Personalized</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                Recovery
                <span className="block bg-gradient-to-r from-yellow-300 via-orange-300 to-pink-300 bg-clip-text text-transparent">
                  Assessment Quiz
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl mb-12 text-white/90 max-w-3xl mx-auto leading-relaxed">
                Get personalized insights and recommendations for your recovery journey. 
                This comprehensive assessment takes just 5-10 minutes and provides valuable 
                guidance tailored to your unique situation.
              </p>
              
              <div className="flex flex-wrap justify-center gap-4 text-sm">
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span>100% Confidential</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <span>Evidence-Based</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                  <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                  <span>Instant Results</span>
                </div>
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