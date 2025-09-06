import React from 'react';
import SEOHead from '@/components/SEOHead';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { RecoveryGame as RecoveryGameComponent } from '@/components/RecoveryGame/RecoveryGame';

const RecoveryGame: React.FC = () => {
  return (
    <>
      <SEOHead 
        title="Recovery Game - Interactive 3D Journey | Genius Recovery" 
        description="Embark on an interactive 3D recovery journey with daily challenges, team support, progress tracking, and achievement badges. Build resilience through gamified recovery activities."
        keywords="recovery game, addiction recovery, 3D game, recovery challenges, support groups, recovery progress, interactive recovery, recovery community"
      />
      
      <Header />
      
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/10">
        <div className="container mx-auto px-4 py-8">
          <RecoveryGameComponent />
        </div>
      </div>
      
      <Footer />
    </>
  );
};

export default RecoveryGame;