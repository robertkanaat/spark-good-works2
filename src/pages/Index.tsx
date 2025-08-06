import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import DonationSection from "@/components/DonationSection";
import StatsSection from "@/components/StatsSection";
import FeaturesSection from "@/components/FeaturesSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <HeroSection />
      <DonationSection />
      <StatsSection />
      <FeaturesSection />
      <Footer />
    </div>
  );
};

export default Index;