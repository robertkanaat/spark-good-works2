import { useEffect } from 'react';

interface SEOHeadProps {
  title: string;
  description: string;
  keywords?: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
  canonicalUrl?: string;
  structuredData?: object;
}

const SEOHead = ({ 
  title, 
  description, 
  keywords,
  ogImage,
  ogType = 'website',
  canonicalUrl,
  structuredData
}: SEOHeadProps) => {
  useEffect(() => {
    console.log('SEOHead props:', { title, description, keywords, ogImage, ogType, canonicalUrl, structuredData });
    // Set page title
    document.title = title;

    // Remove existing meta tags that we're going to replace
    const existingMetas = [
      'description',
      'keywords',
      'og:title',
      'og:description',
      'og:type',
      'og:image',
      'og:url',
      'twitter:card',
      'twitter:title',
      'twitter:description',
      'twitter:image'
    ];

    existingMetas.forEach(name => {
      const existing = document.querySelector(`meta[name="${name}"], meta[property="${name}"]`);
      if (existing) {
        existing.remove();
      }
    });

    // Remove existing canonical link
    const existingCanonical = document.querySelector('link[rel="canonical"]');
    if (existingCanonical) {
      existingCanonical.remove();
    }

    // Remove existing structured data
    const existingLD = document.querySelector('script[type="application/ld+json"]');
    if (existingLD) {
      existingLD.remove();
    }

    // Set meta description
    const metaDescription = document.createElement('meta');
    metaDescription.name = 'description';
    metaDescription.content = description;
    document.head.appendChild(metaDescription);

    // Set keywords if provided
    if (keywords) {
      const metaKeywords = document.createElement('meta');
      metaKeywords.name = 'keywords';
      metaKeywords.content = keywords;
      document.head.appendChild(metaKeywords);
    }

    // Set Open Graph tags
    const ogTags = [
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:type', content: ogType },
      { property: 'og:url', content: canonicalUrl || window.location.href }
    ];

    if (ogImage) {
      ogTags.push({ property: 'og:image', content: ogImage });
    }

    ogTags.forEach(tag => {
      const meta = document.createElement('meta');
      meta.setAttribute('property', tag.property);
      meta.content = tag.content;
      document.head.appendChild(meta);
    });

    // Set Twitter Card tags
    const twitterTags = [
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description }
    ];

    if (ogImage) {
      twitterTags.push({ name: 'twitter:image', content: ogImage });
    }

    twitterTags.forEach(tag => {
      const meta = document.createElement('meta');
      meta.name = tag.name;
      meta.content = tag.content;
      document.head.appendChild(meta);
    });

    // Set canonical URL
    if (canonicalUrl) {
      const canonical = document.createElement('link');
      canonical.rel = 'canonical';
      canonical.href = canonicalUrl;
      document.head.appendChild(canonical);
    }

    // Set structured data
    if (structuredData) {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(structuredData);
      document.head.appendChild(script);
    }

    // Cleanup function to remove the elements when component unmounts
    return () => {
      // Note: We don't actually clean up on unmount since we want the SEO data to persist
      // This cleanup is mainly for development/hot reload scenarios
    };
  }, [title, description, keywords, ogImage, ogType, canonicalUrl, structuredData]);

  return null; // This component doesn't render anything
};

export default SEOHead;