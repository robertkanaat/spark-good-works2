import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import DonationSection from "@/components/DonationSection";
import VideoSection from "@/components/VideoSection";
import StatsSection from "@/components/StatsSection";
import FeaturesSection from "@/components/FeaturesSection";
import BlogPreviewSection from "@/components/BlogPreviewSection";
import OpenLetterPreview from "@/components/OpenLetterPreview";
import HomeFAQSection from "@/components/HomeFAQSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <HeroSection />
      <DonationSection />
      <VideoSection />
      <StatsSection />
      <FeaturesSection />
      <BlogPreviewSection />
      <OpenLetterPreview />
      <HomeFAQSection />
      <Footer />
    </div>
  );
};

export default Index;