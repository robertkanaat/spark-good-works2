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
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Genius Recovery",
    "description": "Genius Recovery is dedicated to providing comprehensive addiction recovery support, resources, and treatment options to help individuals and families overcome substance use disorders.",
    "url": "https://geniusrecovery.org",
    "logo": "https://geniusrecovery.org/genius-recovery-logo.png",
    "foundingDate": "2023",
    "areaServed": "United States",
    "serviceType": [
      "Addiction Recovery Support",
      "Mental Health Resources",
      "Crisis Intervention",
      "Recovery Education",
      "Family Support Services"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "988",
      "contactType": "Crisis Support"
    },
    "sameAs": [
      "https://www.facebook.com/geniusrecovery",
      "https://www.twitter.com/geniusrecovery",
      "https://www.instagram.com/geniusrecovery"
    ]
  };

  return (
    <div className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
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