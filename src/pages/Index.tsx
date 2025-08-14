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
import SEOHead from "@/components/SEOHead";

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
    // Set comprehensive SEO metadata
    document.title = "Genius Recovery - Addiction Recovery Support & Crisis Intervention | 24/7 Help";
    
    // Meta description
    const metaDescription = document.querySelector('meta[name="description"]') || document.createElement('meta');
    metaDescription.setAttribute('name', 'description');
    metaDescription.setAttribute('content', 'Get immediate addiction recovery support, crisis intervention, and treatment resources. Our AI-powered platform provides 24/7 assistance for individuals and families affected by substance use disorders.');
    if (!document.querySelector('meta[name="description"]')) {
      document.head.appendChild(metaDescription);
    }

    // Keywords
    const keywords = document.querySelector('meta[name="keywords"]') || document.createElement('meta');
    keywords.setAttribute('name', 'keywords');
    keywords.setAttribute('content', 'addiction recovery, substance abuse help, crisis intervention, treatment centers, AI recovery support, 24/7 help, addiction treatment, recovery resources, drug addiction help, alcohol addiction support');
    if (!document.querySelector('meta[name="keywords"]')) {
      document.head.appendChild(keywords);
    }

    // Author
    const author = document.querySelector('meta[name="author"]') || document.createElement('meta');
    author.setAttribute('name', 'author');
    author.setAttribute('content', 'Genius Recovery');
    if (!document.querySelector('meta[name="author"]')) {
      document.head.appendChild(author);
    }

    // Robots
    const robots = document.querySelector('meta[name="robots"]') || document.createElement('meta');
    robots.setAttribute('name', 'robots');
    robots.setAttribute('content', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
    if (!document.querySelector('meta[name="robots"]')) {
      document.head.appendChild(robots);
    }

    // Language
    const language = document.querySelector('meta[name="language"]') || document.createElement('meta');
    language.setAttribute('name', 'language');
    language.setAttribute('content', 'English');
    if (!document.querySelector('meta[name="language"]')) {
      document.head.appendChild(language);
    }

    // Content type
    const contentType = document.querySelector('meta[http-equiv="content-type"]') || document.createElement('meta');
    contentType.setAttribute('http-equiv', 'content-type');
    contentType.setAttribute('content', 'text/html; charset=UTF-8');
    if (!document.querySelector('meta[http-equiv="content-type"]')) {
      document.head.appendChild(contentType);
    }

    // Viewport (usually already set, but ensuring it's optimized)
    const viewport = document.querySelector('meta[name="viewport"]') || document.createElement('meta');
    viewport.setAttribute('name', 'viewport');
    viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=5.0');
    if (!document.querySelector('meta[name="viewport"]')) {
      document.head.appendChild(viewport);
    }

    // Open Graph tags
    const ogTags = [
      { property: 'og:title', content: 'Genius Recovery - Addiction Recovery Support & Crisis Intervention | 24/7 Help' },
      { property: 'og:description', content: 'Get immediate addiction recovery support, crisis intervention, and treatment resources. Our AI-powered platform provides 24/7 assistance for individuals and families affected by substance use disorders.' },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: 'https://geniusrecovery.org' },
      { property: 'og:image', content: 'https://geniusrecovery.org/genius-recovery-logo.png' },
      { property: 'og:image:alt', content: 'Genius Recovery - Addiction Recovery Support Organization' },
      { property: 'og:site_name', content: 'Genius Recovery' },
      { property: 'og:locale', content: 'en_US' }
    ];

    ogTags.forEach(tag => {
      const existing = document.querySelector(`meta[property="${tag.property}"]`) || document.createElement('meta');
      existing.setAttribute('property', tag.property);
      existing.setAttribute('content', tag.content);
      if (!document.querySelector(`meta[property="${tag.property}"]`)) {
        document.head.appendChild(existing);
      }
    });

    // Twitter Card tags
    const twitterTags = [
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: 'Genius Recovery - Addiction Recovery Support & Crisis Intervention | 24/7 Help' },
      { name: 'twitter:description', content: 'Get immediate addiction recovery support, crisis intervention, and treatment resources. Our AI-powered platform provides 24/7 assistance for individuals and families affected by substance use disorders.' },
      { name: 'twitter:image', content: 'https://geniusrecovery.org/genius-recovery-logo.png' },
      { name: 'twitter:image:alt', content: 'Genius Recovery - Addiction Recovery Support Organization' },
      { name: 'twitter:site', content: '@geniusrecovery' },
      { name: 'twitter:creator', content: '@geniusrecovery' }
    ];

    twitterTags.forEach(tag => {
      const existing = document.querySelector(`meta[name="${tag.name}"]`) || document.createElement('meta');
      existing.setAttribute('name', tag.name);
      existing.setAttribute('content', tag.content);
      if (!document.querySelector(`meta[name="${tag.name}"]`)) {
        document.head.appendChild(existing);
      }
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
      const existing = document.querySelector(`meta[name="${tag.name}"]`) || document.createElement('meta');
      existing.setAttribute('name', tag.name);
      existing.setAttribute('content', tag.content);
      if (!document.querySelector(`meta[name="${tag.name}"]`)) {
        document.head.appendChild(existing);
      }
    });

    // Canonical URL
    const canonical = document.querySelector('link[rel="canonical"]') || document.createElement('link');
    canonical.setAttribute('rel', 'canonical');
    canonical.setAttribute('href', 'https://geniusrecovery.org');
    if (!document.querySelector('link[rel="canonical"]')) {
      document.head.appendChild(canonical);
    }

    // Alternate language links
    const hreflang = document.querySelector('link[rel="alternate"][hreflang="en"]') || document.createElement('link');
    hreflang.setAttribute('rel', 'alternate');
    hreflang.setAttribute('hreflang', 'en');
    hreflang.setAttribute('href', 'https://geniusrecovery.org');
    if (!document.querySelector('link[rel="alternate"][hreflang="en"]')) {
      document.head.appendChild(hreflang);
    }

    // DNS prefetch for performance
    const dnsPrefetchs = [
      'https://fonts.googleapis.com',
      'https://fonts.gstatic.com',
      'https://www.google-analytics.com'
    ];

    dnsPrefetchs.forEach(url => {
      const existing = document.querySelector(`link[rel="dns-prefetch"][href="${url}"]`) || document.createElement('link');
      existing.setAttribute('rel', 'dns-prefetch');
      existing.setAttribute('href', url);
      if (!document.querySelector(`link[rel="dns-prefetch"][href="${url}"]`)) {
        document.head.appendChild(existing);
      }
    });

    // Preconnect for critical resources
    const preconnects = [
      'https://fonts.googleapis.com',
      'https://fonts.gstatic.com'
    ];

    preconnects.forEach(url => {
      const existing = document.querySelector(`link[rel="preconnect"][href="${url}"]`) || document.createElement('link');
      existing.setAttribute('rel', 'preconnect');
      existing.setAttribute('href', url);
      existing.setAttribute('crossorigin', '');
      if (!document.querySelector(`link[rel="preconnect"][href="${url}"]`)) {
        document.head.appendChild(existing);
      }
    });
  }, []);

  return (
    <div className="min-h-screen">
      {/* Organization Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      
      {/* Website Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      
      {/* WebPage Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
      
      {/* Breadcrumb Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      
      {/* Service Schemas */}
      {serviceSchemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      
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