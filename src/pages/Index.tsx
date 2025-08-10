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
    "alternateName": "Genius Recovery Organization",
    "description": "Genius Recovery is dedicated to providing comprehensive addiction recovery support, crisis intervention, educational resources, and treatment connections to help individuals and families overcome substance use disorders and build lasting recovery.",
    "url": "https://geniusrecovery.org",
    "logo": "https://geniusrecovery.org/genius-recovery-logo.png",
    "image": "https://geniusrecovery.org/genius-recovery-logo.png",
    "foundingDate": "2023",
    "areaServed": {
      "@type": "Country",
      "name": "United States"
    },
    "serviceType": [
      "Addiction Recovery Support",
      "Mental Health Resources", 
      "Crisis Intervention Services",
      "Recovery Education Programs",
      "Family Support Services",
      "Treatment Center Referrals",
      "24/7 AI-Powered Support",
      "Peer Recovery Support"
    ],
    "knowsAbout": [
      "Substance Use Disorders",
      "Addiction Recovery", 
      "Mental Health",
      "Crisis Intervention",
      "Family Therapy",
      "Medication-Assisted Treatment",
      "Detoxification",
      "Rehabilitation Programs",
      "Recovery Support Groups",
      "Relapse Prevention"
    ],
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "telephone": "988",
        "contactType": "Crisis Support",
        "description": "24/7 Crisis and Suicide Prevention Lifeline",
        "hoursAvailable": "24/7"
      },
      {
        "@type": "ContactPoint", 
        "telephone": "1-800-662-4357",
        "contactType": "Substance Abuse Support",
        "description": "SAMHSA National Helpline",
        "hoursAvailable": "24/7"
      }
    ],
    "sameAs": [
      "https://www.facebook.com/geniusrecovery",
      "https://www.twitter.com/geniusrecovery", 
      "https://www.instagram.com/geniusrecovery",
      "https://www.linkedin.com/company/geniusrecovery"
    ],
    "makesOffer": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "AI-Powered Recovery Support",
          "description": "24/7 AI companion providing personalized recovery support and crisis intervention"
        }
      },
      {
        "@type": "Offer", 
        "itemOffered": {
          "@type": "Service",
          "name": "Treatment Center Referrals",
          "description": "Connections to verified addiction treatment centers and recovery programs"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service", 
          "name": "Educational Resources",
          "description": "Comprehensive library of addiction recovery information and tools"
        }
      }
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "500+",
      "description": "Highly rated recovery support organization"
    }
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