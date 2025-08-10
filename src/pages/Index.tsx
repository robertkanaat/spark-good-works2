import { useEffect } from "react";
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

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Genius Recovery",
    "alternateName": "Genius Recovery Organization",
    "url": "https://geniusrecovery.org",
    "description": "Comprehensive addiction recovery support platform providing crisis intervention, treatment resources, and AI-powered recovery assistance",
    "inLanguage": "en-US",
    "copyrightYear": "2023",
    "copyrightHolder": {
      "@type": "Organization",
      "name": "Genius Recovery"
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://geniusrecovery.org/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Genius Recovery - Addiction Recovery Support & Crisis Intervention",
    "description": "Get immediate addiction recovery support, crisis intervention, and treatment resources. Our AI-powered platform provides 24/7 assistance for individuals and families affected by substance use disorders.",
    "url": "https://geniusrecovery.org",
    "isPartOf": {
      "@type": "WebSite",
      "name": "Genius Recovery",
      "url": "https://geniusrecovery.org"
    },
    "datePublished": "2023-01-01",
    "dateModified": new Date().toISOString().split('T')[0],
    "author": {
      "@type": "Organization",
      "name": "Genius Recovery"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Genius Recovery",
      "logo": {
        "@type": "ImageObject",
        "url": "https://geniusrecovery.org/genius-recovery-logo.png"
      }
    },
    "mainEntity": {
      "@type": "Organization",
      "name": "Genius Recovery"
    }
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://geniusrecovery.org"
      }
    ]
  };

  const serviceSchemas = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "24/7 AI Recovery Support",
      "description": "AI-powered addiction recovery companion providing personalized support, crisis intervention, and treatment guidance available 24 hours a day",
      "provider": {
        "@type": "Organization",
        "name": "Genius Recovery"
      },
      "areaServed": {
        "@type": "Country",
        "name": "United States"
      },
      "availableChannel": {
        "@type": "ServiceChannel",
        "serviceUrl": "https://geniusrecovery.org/ai-companion",
        "serviceType": "Online Chat Support"
      },
      "hoursAvailable": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        "opens": "00:00",
        "closes": "23:59"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Crisis Intervention Support",
      "description": "Immediate crisis intervention services connecting individuals to emergency mental health resources and suicide prevention support",
      "provider": {
        "@type": "Organization",
        "name": "Genius Recovery"
      },
      "areaServed": {
        "@type": "Country",
        "name": "United States"
      },
      "availableChannel": {
        "@type": "ServiceChannel",
        "serviceUrl": "https://geniusrecovery.org/emergency",
        "serviceType": "Crisis Support"
      },
      "hoursAvailable": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        "opens": "00:00",
        "closes": "23:59"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Treatment Center Referrals",
      "description": "Professional referral services connecting individuals to verified addiction treatment centers, detox facilities, and rehabilitation programs",
      "provider": {
        "@type": "Organization",
        "name": "Genius Recovery"
      },
      "areaServed": {
        "@type": "Country",
        "name": "United States"
      },
      "availableChannel": {
        "@type": "ServiceChannel",
        "serviceUrl": "https://geniusrecovery.org/resources",
        "serviceType": "Treatment Referral"
      }
    }
  ];

  useEffect(() => {
    // Set page title and meta description
    document.title = "Genius Recovery - Addiction Recovery Support & Crisis Intervention";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Get immediate addiction recovery support, crisis intervention, and treatment resources. Our AI-powered platform provides 24/7 assistance for individuals and families affected by substance use disorders.');
    }

    // Add canonical URL
    const canonical = document.querySelector('link[rel="canonical"]') || document.createElement('link');
    canonical.setAttribute('rel', 'canonical');
    canonical.setAttribute('href', 'https://geniusrecovery.org');
    if (!document.querySelector('link[rel="canonical"]')) {
      document.head.appendChild(canonical);
    }

    // Add all schemas to head
    const schemas = [
      { id: 'org-schema', data: organizationSchema },
      { id: 'website-schema', data: websiteSchema },
      { id: 'webpage-schema', data: webPageSchema },
      { id: 'breadcrumb-schema', data: breadcrumbSchema },
      ...serviceSchemas.map((schema, index) => ({ id: `service-schema-${index}`, data: schema }))
    ];

    // Remove existing schemas
    schemas.forEach(({ id }) => {
      const existing = document.getElementById(id);
      if (existing) existing.remove();
    });

    // Add all schemas
    schemas.forEach(({ id, data }) => {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(data);
      script.id = id;
      document.head.appendChild(script);
    });

    // Cleanup function
    return () => {
      schemas.forEach(({ id }) => {
        const script = document.getElementById(id);
        if (script) script.remove();
      });
    };
  }, []);

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