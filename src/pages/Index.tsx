import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import DonationSection from "@/components/DonationSection";
import StatsSection from "@/components/StatsSection";
import FeaturesSection from "@/components/FeaturesSection";
import BlogPreviewSection from "@/components/BlogPreviewSection";
import OpenLetterPreview from "@/components/OpenLetterPreview";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <HeroSection />
      <DonationSection />
      <StatsSection />
      <FeaturesSection />
      <BlogPreviewSection />
      <OpenLetterPreview />
      <Footer />
    </div>
  );
};

export default Index;