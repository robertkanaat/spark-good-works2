import { useEffect } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import TestimonialsSection from "@/components/TestimonialsSection";
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
    name: "Genius Recovery",
    alternateName: "Genius Recovery Organization",
    description: "Genius Recovery is dedicated to providing comprehensive addiction recovery support, crisis intervention, educational resources, and treatment connections to help individuals and families overcome substance use disorders and build lasting recovery.",
    url: "https://geniusrecovery.io",
    logo: "https://geniusrecovery.io/genius-recovery-logo.png",
    image: "https://geniusrecovery.io/genius-recovery-logo.png",
    foundingDate: "2023",
    areaServed: {
      "@type": "Country",
      name: "United States"
    },
    serviceType: [
      "Addiction Recovery Support",
      "Mental Health Resources",
      "Crisis Intervention Services",
      "Recovery Education Programs",
      "Family Support Services",
      "Treatment Center Referrals",
      "24/7 AI-Powered Support",
      "Peer Recovery Support"
    ],
    knowsAbout: [
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
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "988",
        contactType: "Crisis Support",
        description: "24/7 Crisis and Suicide Prevention Lifeline",
        hoursAvailable: "24/7"
      },
      {
        "@type": "ContactPoint",
        telephone: "1-800-662-4357",
        contactType: "Substance Abuse Support",
        description: "SAMHSA National Helpline",
        hoursAvailable: "24/7"
      }
    ],
    sameAs: [
      "https://facebook.com/geniusrecovery",
      "https://twitter.com/geniusrecovery",
      "https://instagram.com/geniusrecovery",
      "https://linkedin.com/company/geniusrecovery"
    ],
    makesOffer: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "AI-Powered Recovery Support",
          description: "24/7 AI companion providing personalized recovery support and crisis intervention"
        }
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Treatment Center Referrals",
          description: "Connections to verified addiction treatment centers and recovery programs"
        }
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Educational Resources",
          description: "Comprehensive library of addiction recovery information and tools"
        }
      }
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: "500+",
      description: "Highly rated recovery support organization"
    }
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Genius Recovery",
    alternateName: "Genius Recovery Organization",
    url: "https://geniusrecovery.io",
    description: "Comprehensive addiction recovery support platform providing crisis intervention, treatment resources, and AI-powered recovery assistance",
    inLanguage: "en-US",
    copyrightYear: "2023",
    copyrightHolder: {
      "@type": "Organization",
      name: "Genius Recovery"
    },
    potentialAction: {
      "@type": "SearchAction",
      target: "https://geniusrecovery.io/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Genius Recovery - Addiction Recovery Support & Crisis Intervention",
    description: "Get immediate addiction recovery support, crisis intervention, and treatment resources. Our AI-powered platform provides 24/7 assistance for individuals and families affected by substance use disorders.",
    url: "https://geniusrecovery.io",
    isPartOf: {
      "@type": "WebSite",
      name: "Genius Recovery",
      url: "https://geniusrecovery.io"
    },
    datePublished: "2023-01-01",
    dateModified: new Date().toISOString().split('T')[0],
    author: {
      "@type": "Organization",
      name: "Genius Recovery"
    },
    publisher: {
      "@type": "Organization",
      name: "Genius Recovery",
      logo: {
        "@type": "ImageObject",
        url: "https://geniusrecovery.io/genius-recovery-logo.png"
      }
    },
    mainEntity: {
      "@type": "Organization",
      name: "Genius Recovery"
    }
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://geniusrecovery.io"
      }
    ]
  };

  const serviceSchemas = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "24/7 AI Recovery Support",
      description: "AI-powered addiction recovery companion providing personalized support, crisis intervention, and treatment guidance available 24 hours a day",
      provider: {
        "@type": "Organization",
        name: "Genius Recovery"
      },
      areaServed: {
        "@type": "Country",
        name: "United States"
      },
      availableChannel: {
        "@type": "ServiceChannel",
        serviceUrl: "https://geniusrecovery.io/ai-companion",
        serviceType: "Online Chat Support"
      },
      hoursAvailable: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        opens: "00:00",
        closes: "23:59"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "Crisis Intervention Support",
      description: "Immediate crisis intervention services connecting individuals to emergency mental health resources and suicide prevention support",
      provider: {
        "@type": "Organization",
        name: "Genius Recovery"
      },
      areaServed: {
        "@type": "Country",
        name: "United States"
      },
      availableChannel: {
        "@type": "ServiceChannel",
        serviceUrl: "https://geniusrecovery.io/emergency",
        serviceType: "Crisis Support"
      },
      hoursAvailable: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        opens: "00:00",
        closes: "23:59"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "Treatment Center Referrals",
      description: "Professional referral services connecting individuals to verified addiction treatment centers, detox facilities, and rehabilitation programs",
      provider: {
        "@type": "Organization",
        name: "Genius Recovery"
      },
      areaServed: {
        "@type": "Country",
        name: "United States"
      },
      availableChannel: {
        "@type": "ServiceChannel",
        serviceUrl: "https://geniusrecovery.io/resources",
        serviceType: "Treatment Referral"
      }
    }
  ];

  useEffect(() => {
    console.log('Index.tsx useEffect running for SEO tags'); // Debug log

    // Remove existing meta/link/script tags to prevent duplicates
    const selectors = [
      'meta[name="description"]',
      'meta[name="keywords"]',
      'meta[name="author"]',
      'meta[name="robots"]',
      'meta[name="language"]',
      'meta[http-equiv="content-type"]',
      'meta[name="viewport"]',
      'meta[property^="og:"]',
      'meta[name^="twitter:"]',
      'meta[name="theme-color"]',
      'meta[name="msapplication-TileColor"]',
      'meta[name="application-name"]',
      'meta[name="apple-mobile-web-app-title"]',
      'meta[name="apple-mobile-web-app-capable"]',
      'meta[name="apple-mobile-web-app-status-bar-style"]',
      'meta[name="format-detection"]',
      'meta[name="HandheldFriendly"]',
      'meta[name="MobileOptimized"]',
      'meta[name="referrer"]',
      'link[rel="canonical"]',
      'link[rel="alternate"]',
      'link[rel="dns-prefetch"]',
      'link[rel="preconnect"]',
      'script[type="application/ld+json"]'
    ];
    selectors.forEach(selector => {
      document.querySelectorAll(selector).forEach(el => el.remove());
    });

    // Set comprehensive SEO metadata
    document.title = "Genius Recovery - Addiction Recovery Support & Crisis Intervention | 24/7 Help";

    // Meta description
    const metaDescription = document.createElement('meta');
    metaDescription.name = 'description';
    metaDescription.content = 'Get immediate addiction recovery support, crisis intervention, and treatment resources. Our AI-powered platform provides 24/7 assistance for individuals and families affected by substance use disorders.';
    document.head.appendChild(metaDescription);

    // Keywords
    const keywords = document.createElement('meta');
    keywords.name = 'keywords';
    keywords.content = 'addiction recovery, substance abuse help, crisis intervention, treatment centers, AI recovery support, 24/7 help, addiction treatment, recovery resources, drug addiction help, alcohol addiction support';
    document.head.appendChild(keywords);

    // Author
    const author = document.createElement('meta');
    author.name = 'author';
    author.content = 'Genius Recovery';
    document.head.appendChild(author);

    // Robots
    const robots = document.createElement('meta');
    robots.name = 'robots';
    robots.content = 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1';
    document.head.appendChild(robots);

    // Language
    const language = document.createElement('meta');
    language.name = 'language';
    language.content = 'English';
    document.head.appendChild(language);

    // Content type
    const contentType = document.createElement('meta');
    contentType.setAttribute('http-equiv', 'content-type');
    contentType.content = 'text/html; charset=UTF-8';
    document.head.appendChild(contentType);

    // Viewport
    const viewport = document.createElement('meta');
    viewport.name = 'viewport';
    viewport.content = 'width=device-width, initial-scale=1.0, maximum-scale=5.0';
    document.head.appendChild(viewport);

    // Open Graph tags
    const ogTags = [
      { property: 'og:title', content: 'Genius Recovery - Addiction Recovery Support & Crisis Intervention | 24/7 Help' },
      { property: 'og:description', content: 'Get immediate addiction recovery support, crisis intervention, and treatment resources. Our AI-powered platform provides 24/7 assistance for individuals and families affected by substance use disorders.' },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: 'https://geniusrecovery.io' },
      { property: 'og:image', content: 'https://geniusrecovery.io/genius-recovery-logo.png' },
      { property: 'og:image:alt', content: 'Genius Recovery - Addiction Recovery Support Organization' },
      { property: 'og:site_name', content: 'Genius Recovery' },
      { property: 'og:locale', content: 'en_US' }
    ];
    ogTags.forEach(tag => {
      const meta = document.createElement('meta');
      meta.setAttribute('property', tag.property);
      meta.content = tag.content;
      document.head.appendChild(meta);
    });

    // Twitter Card tags
    const twitterTags = [
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: 'Genius Recovery - Addiction Recovery Support & Crisis Intervention | 24/7 Help' },
      { name: 'twitter:description', content: 'Get immediate addiction recovery support, crisis intervention, and treatment resources. Our AI-powered platform provides 24/7 assistance for individuals and families affected by substance use disorders.' },
      { name: 'twitter:image', content: 'https://geniusrecovery.io/genius-recovery-logo.png' },
      { name: 'twitter:image:alt', content: 'Genius Recovery - Addiction Recovery Support Organization' },
      { name: 'twitter:site', content: '@geniusrecovery' },
      { name: 'twitter:creator', content: '@geniusrecovery' }
    ];
    twitterTags.forEach(tag => {
      const meta = document.createElement('meta');
      meta.name = tag.name;
      meta.content = tag.content;
      document.head.appendChild(meta);
    });

    // Additional SEO meta tags
    const additionalTags = [
      { name: 'theme-color', content: '#0EA5E9' },
      { name: 'msapplication-TileColor', content: '#0EA5E9' },
      { name: 'application-name', content: 'Genius Recovery' },
      { name: 'apple-mobile-web-app-title', content: 'Genius Recovery' },
      { name: 'apple-mobile-web-app-capable', content: 'yes' },
      { name: 'apple-mobile-web-app-status-bar-style', content: 'default' },
      { name: 'format-detection', content: 'telephone=no' },
      { name: 'HandheldFriendly', content: 'true' },
      { name: 'MobileOptimized', content: '320' },
      { name: 'referrer', content: 'no-referrer-when-downgrade' }
    ];
    additionalTags.forEach(tag => {
      const meta = document.createElement('meta');
      meta.name = tag.name;
      meta.content = tag.content;
      document.head.appendChild(meta);
    });

    // Canonical URL
    const canonical = document.createElement('link');
    canonical.rel = 'canonical';
    canonical.href = 'https://geniusrecovery.io';
    document.head.appendChild(canonical);

    // Alternate language links
    const hreflang = document.createElement('link');
    hreflang.rel = 'alternate';
    hreflang.hreflang = 'en';
    hreflang.href = 'https://geniusrecovery.io';
    document.head.appendChild(hreflang);

    // DNS prefetch
    const dnsPrefetchs = [
      'https://fonts.googleapis.com',
      'https://fonts.gstatic.com',
      'https://www.google-analytics.com'
    ];
    dnsPrefetchs.forEach(url => {
      const link = document.createElement('link');
      link.rel = 'dns-prefetch';
      link.href = url;
      document.head.appendChild(link);
    });

    // Preconnect
    const preconnects = [
      'https://fonts.googleapis.com',
      'https://fonts.gstatic.com'
    ];
    preconnects.forEach(url => {
      const link = document.createElement('link');
      link.rel = 'preconnect';
      link.href = url;
      link.setAttribute('crossorigin', '');
      document.head.appendChild(link);
    });

    // Structured data
    try {
      const schemas = [organizationSchema, websiteSchema, webPageSchema, breadcrumbSchema, ...serviceSchemas];
      schemas.forEach(schema => {
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.textContent = JSON.stringify(schema);
        document.head.appendChild(script);
      });
    } catch (error) {
      console.error('Failed to serialize structured data:', error);
    }

    // Cleanup
    return () => {
      selectors.forEach(selector => {
        document.querySelectorAll(selector).forEach(el => el.remove());
      });
    };
  }, []);

  return (
    <div className="min-h-screen">
      <Header />
      <HeroSection />
      <TestimonialsSection />
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