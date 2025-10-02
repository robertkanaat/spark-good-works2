import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MapPin, Star, Phone, Globe, Users, Award, Heart } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import TreatmentCenterMap from "@/components/TreatmentCenterMap";
import treatmentCenter1 from "@/assets/treatment-center-1.jpg";
import treatmentCenter2 from "@/assets/treatment-center-2.jpg";
import treatmentCenter3 from "@/assets/treatment-center-3.jpg";

interface TreatmentCenter {
  id: number;
  name: string;
  location: string;
  city: string;
  state: string;
  rating: number;
  reviews: number;
  phone: string;
  website: string;
  specialties: string[];
  description: string;
  image: string;
  lat: number;
  lng: number;
  accreditation: string[];
}

const treatmentCenters: TreatmentCenter[] = [
  {
    id: 1,
    name: "Hazelden Betty Ford Foundation",
    location: "Center City, Minnesota",
    city: "Center City",
    state: "MN",
    rating: 4.8,
    reviews: 1250,
    phone: "(866) 831-5700",
    website: "hazeldenbettyford.org",
    specialties: ["Alcohol Addiction", "Drug Addiction", "Dual Diagnosis", "Executive Treatment"],
    description: "A leading addiction treatment center with over 70 years of experience, offering evidence-based treatment programs.",
    image: treatmentCenter1,
    lat: 45.4215,
    lng: -92.8136,
    accreditation: ["CARF", "Joint Commission"]
  },
  {
    id: 2,
    name: "Betty Ford Center",
    location: "Rancho Mirage, California",
    city: "Rancho Mirage", 
    state: "CA",
    rating: 4.9,
    reviews: 980,
    phone: "(760) 773-4100",
    website: "hazeldenbettyford.org/locations/rancho-mirage",
    specialties: ["Alcohol Treatment", "Prescription Drug Addiction", "Family Programs"],
    description: "World-renowned treatment center known for its comprehensive family-centered approach to addiction recovery.",
    image: treatmentCenter2,
    lat: 33.7399,
    lng: -116.4123,
    accreditation: ["CARF", "Joint Commission", "NAATP"]
  },
  {
    id: 3,
    name: "Passages Malibu",
    location: "Malibu, California",
    city: "Malibu",
    state: "CA", 
    rating: 4.7,
    reviews: 650,
    phone: "(888) 397-0112",
    website: "passagesmalibu.com",
    specialties: ["Luxury Treatment", "Holistic Therapy", "Non-12 Step", "Executive Treatment"],
    description: "Luxury addiction treatment center offering personalized, non-12-step recovery programs in a beautiful oceanside setting.",
    image: treatmentCenter3,
    lat: 34.0259,
    lng: -118.7798,
    accreditation: ["CARF", "LegitScript"]
  },
  {
    id: 4,
    name: "Caron Treatment Centers",
    location: "Wernersville, Pennsylvania",
    city: "Wernersville",
    state: "PA",
    rating: 4.6,
    reviews: 890,
    phone: "(610) 678-2332",
    website: "caron.org",
    specialties: ["Adolescent Treatment", "Adult Programs", "Family Programs", "Alumni Services"],
    description: "Comprehensive treatment center offering specialized programs for adolescents and adults with over 30 years of experience.",
    image: treatmentCenter1,
    lat: 40.3298,
    lng: -76.0819,
    accreditation: ["CARF", "Joint Commission"]
  },
  {
    id: 5,
    name: "The Meadows",
    location: "Wickenburg, Arizona",
    city: "Wickenburg",
    state: "AZ",
    rating: 4.5,
    reviews: 750,
    phone: "(928) 684-3926",
    website: "themeadows.com",
    specialties: ["Trauma Therapy", "Sex Addiction", "Eating Disorders", "Mental Health"],
    description: "Specialized treatment center focusing on trauma-informed care and co-occurring disorders in a peaceful desert setting.",
    image: treatmentCenter2,
    lat: 33.9687,
    lng: -112.7296,
    accreditation: ["CARF", "Joint Commission"]
  },
  {
    id: 6,
    name: "Desert Hope Treatment Center",
    location: "Las Vegas, Nevada",
    city: "Las Vegas",
    state: "NV",
    rating: 4.6,
    reviews: 820,
    phone: "(888) 989-9690",
    website: "deserthopetreatment.com",
    specialties: ["Alcohol Treatment", "Drug Addiction", "Detoxification", "Family Therapy"],
    description: "Comprehensive addiction treatment center in the Southwest offering evidence-based therapies and holistic healing approaches.",
    image: treatmentCenter1,
    lat: 36.1699,
    lng: -115.1398,
    accreditation: ["CARF", "Joint Commission"]
  },
  {
    id: 7,
    name: "Arizona Addiction Recovery Center",
    location: "Scottsdale, Arizona",
    city: "Scottsdale",
    state: "AZ",
    rating: 4.7,
    reviews: 670,
    phone: "(480) 360-4093",
    website: "www.arizonaluxuryaddictionrecovery.com",
    specialties: ["Luxury Treatment", "Executive Programs", "Dual Diagnosis", "PTSD Treatment"],
    description: "Premier luxury treatment facility in Scottsdale offering personalized care in a serene desert setting with world-class amenities.",
    image: treatmentCenter2,
    lat: 33.4942,
    lng: -111.9261,
    accreditation: ["CARF", "Joint Commission", "NAATP"]
  },
  {
    id: 8,
    name: "Phoenix Recovery Center",
    location: "Phoenix, Arizona", 
    city: "Phoenix",
    state: "AZ",
    rating: 4.5,
    reviews: 540,
    phone: "(602) 346-9142",
    website: "thephoenixrc.com",
    specialties: ["Outpatient Treatment", "Intensive Outpatient", "Medication-Assisted Treatment", "Group Therapy"],
    description: "Modern outpatient facility serving the Phoenix metro area with flexible treatment options and evidence-based care.",
    image: treatmentCenter3,
    lat: 33.4484,
    lng: -112.0740,
    accreditation: ["CARF", "SAMHSA"]
  },
  {
    id: 9,
    name: "The Recovery Village",
    location: "Umatilla, Florida",
    city: "Umatilla",
    state: "FL",
    rating: 4.6,
    reviews: 890,
    phone: "(352) 771-2700",
    website: "www.therecoveryvillage.com",
    specialties: ["Dual Diagnosis", "Trauma Therapy", "Family Programs", "Medical Detox"],
    description: "Comprehensive addiction treatment facility offering medical detox, residential care, and dual diagnosis treatment in Central Florida.",
    image: treatmentCenter1,
    lat: 28.9289,
    lng: -81.6656,
    accreditation: ["Joint Commission", "CARF"]
  },
  {
    id: 10,
    name: "Banyan Treatment Centers",
    location: "Pompano Beach, Florida",
    city: "Pompano Beach",
    state: "FL",
    rating: 4.5,
    reviews: 650,
    phone: "(888) 280-4763",
    website: "banyantreatmentcenters.com",
    specialties: ["Detoxification", "Residential Treatment", "Mental Health", "Aftercare Support"],
    description: "Evidence-based addiction treatment with multiple Florida locations, specializing in comprehensive care and long-term recovery support.",
    image: treatmentCenter2,
    lat: 26.2378,
    lng: -80.1248,
    accreditation: ["CARF", "SAMHSA"]
  },
  {
    id: 11,
    name: "Summit Behavioral Health",
    location: "Florham Park, New Jersey",
    city: "Florham Park",
    state: "NJ",
    rating: 4.7,
    reviews: 520,
    phone: "(908) 481-4400",
    website: "summitbehavioralhealth.com",
    specialties: ["Executive Programs", "Luxury Treatment", "Dual Diagnosis", "Intensive Outpatient"],
    description: "Premier addiction treatment center offering executive-level care with individualized treatment plans in a discreet setting.",
    image: treatmentCenter3,
    lat: 40.7879,
    lng: -74.3871,
    accreditation: ["Joint Commission", "CARF"]
  },
  {
    id: 12,
    name: "Sunrise Detox Center",
    location: "Cherry Hill, New Jersey",
    city: "Cherry Hill",
    state: "NJ",
    rating: 4.4,
    reviews: 430,
    phone: "(856) 528-5550",
    website: "sunrisedetox.com",
    specialties: ["Medical Detox", "Withdrawal Management", "Stabilization", "24/7 Medical Support"],
    description: "Specialized medical detoxification center providing safe withdrawal management with 24/7 medical supervision.",
    image: treatmentCenter1,
    lat: 39.9346,
    lng: -75.0312,
    accreditation: ["CARF", "SAMHSA"]
  },
  {
    id: 13,
    name: "Red Rock Recovery Center",
    location: "Las Vegas, Nevada",
    city: "Las Vegas",
    state: "NV",
    rating: 4.5,
    reviews: 380,
    phone: "(702) 213-0500",
    website: "redrockrecovery.com",
    specialties: ["Gambling Addiction", "Process Addictions", "Dual Diagnosis", "Behavioral Addictions"],
    description: "Specialized treatment center addressing gambling addiction and other behavioral addictions with evidence-based therapies.",
    image: treatmentCenter2,
    lat: 36.1162,
    lng: -115.1744,
    accreditation: ["Joint Commission", "CARF"]
  },
  {
    id: 14,
    name: "Lakeside-Milam Recovery Centers",
    location: "Kirkland, Washington",
    city: "Kirkland",
    state: "WA",
    rating: 4.6,
    reviews: 720,
    phone: "(425) 823-3222",
    website: "lakesidemilam.com",
    specialties: ["Outpatient Treatment", "Intensive Outpatient", "Family Therapy", "Continuing Care"],
    description: "Comprehensive outpatient addiction treatment with multiple Washington locations and a strong focus on family involvement.",
    image: treatmentCenter3,
    lat: 47.6815,
    lng: -122.2087,
    accreditation: ["CARF", "SAMHSA"]
  },
  {
    id: 15,
    name: "Schick Shadel Hospital",
    location: "Seattle, Washington",
    city: "Seattle",
    state: "WA",
    rating: 4.8,
    reviews: 340,
    phone: "(206) 622-2223",
    website: "schickshadel.com",
    specialties: ["Alcohol Treatment", "Medical Detox", "Aversion Therapy", "Medical Supervision"],
    description: "Historic treatment hospital specializing in alcohol addiction with unique aversion therapy techniques and medical supervision.",
    image: treatmentCenter1,
    lat: 47.6062,
    lng: -122.3321,
    accreditation: ["Joint Commission", "CARF"]
  },
  {
    id: 16,
    name: "Serenity Lane",
    location: "Eugene, Oregon",
    city: "Eugene",
    state: "OR",
    rating: 4.5,
    reviews: 560,
    phone: "(541) 687-1110",
    website: "serenitylane.org",
    specialties: ["Residential Treatment", "Outpatient Programs", "Aftercare Support", "Family Services"],
    description: "Community-based treatment center offering residential and outpatient services with a strong focus on recovery community support.",
    image: treatmentCenter2,
    lat: 44.0521,
    lng: -123.0868,
    accreditation: ["CARF", "SAMHSA"]
  },
  {
    id: 17,
    name: "De Paul Treatment Centers",
    location: "Portland, Oregon",
    city: "Portland",
    state: "OR",
    rating: 4.7,
    reviews: 680,
    phone: "(503) 535-1151",
    website: "depaul.org",
    specialties: ["Community-Based Treatment", "Medication-Assisted Treatment", "Peer Support", "Housing Services"],
    description: "Comprehensive addiction treatment organization providing community-based services, housing, and long-term recovery support.",
    image: treatmentCenter3,
    lat: 45.5152,
    lng: -122.6784,
    accreditation: ["Joint Commission", "CARF"]
  }
];

const majorCities = [
  { name: "Los Angeles", state: "CA", lat: 34.0522, lng: -118.2437, centers: 45 },
  { name: "New York", state: "NY", lat: 40.7128, lng: -74.0060, centers: 38 },
  { name: "Chicago", state: "IL", lat: 41.8781, lng: -87.6298, centers: 32 },
  { name: "Houston", state: "TX", lat: 29.7604, lng: -95.3698, centers: 28 },
  { name: "Phoenix", state: "AZ", lat: 33.4484, lng: -112.0740, centers: 24 },
  { name: "Philadelphia", state: "PA", lat: 39.9526, lng: -75.1652, centers: 22 },
  { name: "San Antonio", state: "TX", lat: 29.4241, lng: -98.4936, centers: 19 },
  { name: "San Diego", state: "CA", lat: 32.7157, lng: -117.1611, centers: 21 }
];

export default function TreatmentCenters() {
  // SEO Meta Tags Management
  useEffect(() => {
    // Set document title
    document.title = "Genius Recovery - Find Treatment Centers & Discover Your Path To Recovery";
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 
        'Find the best addiction treatment centers across the United States. Compare 17+ verified facilities with ratings, specialties, and accreditation. Get help finding the right recovery program today.'
      );
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = 'Find the best addiction treatment centers across the United States. Compare 17+ verified facilities with ratings, specialties, and accreditation. Get help finding the right recovery program today.';
      document.head.appendChild(meta);
    }

    // Update keywords meta tag
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute('content', 
        'addiction treatment centers, rehab facilities, recovery programs, drug treatment, alcohol treatment, detox centers, inpatient treatment, outpatient treatment, dual diagnosis, addiction recovery, treatment center directory'
      );
    } else {
      const meta = document.createElement('meta');
      meta.name = 'keywords';
      meta.content = 'addiction treatment centers, rehab facilities, recovery programs, drug treatment, alcohol treatment, detox centers, inpatient treatment, outpatient treatment, dual diagnosis, addiction recovery, treatment center directory';
      document.head.appendChild(meta);
    }

    // Set canonical URL
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute('href', 'https://geniusrecovery.io/treatment-centers');
    } else {
      const link = document.createElement('link');
      link.rel = 'canonical';
      link.href = 'https://geniusrecovery.io/treatment-centers';
      document.head.appendChild(link);
    }

    // Add Open Graph meta tags
    const ogTags = [
      { property: 'og:title', content: 'Find Addiction Treatment Centers | Recovery Programs Directory' },
      { property: 'og:description', content: 'Discover trusted addiction treatment centers across the US. Compare verified facilities, read reviews, and find the right recovery program for you or your loved one.' },
      { property: 'og:url', content: 'https://geniusrecovery.io/treatment-centers' },
      { property: 'og:type', content: 'website' },
      { property: 'og:image', content: 'https://geniusrecovery.io/genius-recovery-logo.png' },
      { property: 'og:image:width', content: '1200' },
      { property: 'og:image:height', content: '630' },
      { property: 'og:image:alt', content: 'Genius Recovery - Find Addiction Treatment Centers' },
      { property: 'og:site_name', content: 'Genius Recovery' },
      { property: 'og:locale', content: 'en_US' }
    ];

    ogTags.forEach(tag => {
      let existingTag = document.querySelector(`meta[property="${tag.property}"]`);
      if (existingTag) {
        existingTag.setAttribute('content', tag.content);
      } else {
        const meta = document.createElement('meta');
        meta.setAttribute('property', tag.property);
        meta.setAttribute('content', tag.content);
        document.head.appendChild(meta);
      }
    });

    // Add Twitter Card meta tags
    const twitterTags = [
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: 'Find Addiction Treatment Centers | Recovery Programs Directory' },
      { name: 'twitter:description', content: 'Discover trusted addiction treatment centers across the US. Compare verified facilities and find the right recovery program.' },
      { name: 'twitter:image', content: 'https://geniusrecovery.io/genius-recovery-logo.png' },
      { name: 'twitter:image:alt', content: 'Genius Recovery - Find Addiction Treatment Centers' },
      { name: 'twitter:site', content: '@GeniusRecovery' }
    ];

    twitterTags.forEach(tag => {
      let existingTag = document.querySelector(`meta[name="${tag.name}"]`);
      if (existingTag) {
        existingTag.setAttribute('content', tag.content);
      } else {
        const meta = document.createElement('meta');
        meta.setAttribute('name', tag.name);
        meta.setAttribute('content', tag.content);
        document.head.appendChild(meta);
      }
    });

    // Add additional SEO meta tags
    const additionalTags = [
      { name: 'robots', content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' },
      { name: 'googlebot', content: 'index, follow' },
      { name: 'author', content: 'Genius Recovery' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
      { httpEquiv: 'Content-Type', content: 'text/html; charset=utf-8' },
      { name: 'geo.region', content: 'US' },
      { name: 'geo.placename', content: 'United States' },
      { name: 'geo.position', content: '39.8283;-98.5795' },
      { name: 'ICBM', content: '39.8283, -98.5795' },
      { name: 'language', content: 'en' },
      { name: 'distribution', content: 'global' },
      { name: 'revisit-after', content: '7 days' },
      { name: 'rating', content: 'general' },
      { name: 'theme-color', content: '#3B82F6' }
    ];

    additionalTags.forEach(tag => {
      const selector = tag.httpEquiv ? `meta[http-equiv="${tag.httpEquiv}"]` : `meta[name="${tag.name}"]`;
      let existingTag = document.querySelector(selector);
      if (!existingTag) {
        const meta = document.createElement('meta');
        if (tag.httpEquiv) {
          meta.setAttribute('http-equiv', tag.httpEquiv);
        } else {
          meta.setAttribute('name', tag.name);
        }
        meta.setAttribute('content', tag.content);
        document.head.appendChild(meta);
      }
    });

    // Add breadcrumb JSON-LD
    const breadcrumbScript = document.createElement('script');
    breadcrumbScript.type = 'application/ld+json';
    breadcrumbScript.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://geniusrecovery.io"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Treatment Centers",
          "item": "https://geniusrecovery.io/treatment-centers"
        }
      ]
    });
    document.head.appendChild(breadcrumbScript);

    // Cleanup function
    return () => {
      // Remove dynamically added meta tags on component unmount
      const dynamicTags = document.querySelectorAll('meta[data-dynamic="true"]');
      dynamicTags.forEach(tag => tag.remove());
    };
  }, []);

  const [selectedState, setSelectedState] = useState<string>("all");
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>("all");

  const scrollToFeaturedCenters = () => {
    const mapSection = document.getElementById('treatment-centers-map');
    if (mapSection) {
      mapSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const filteredCenters = treatmentCenters.filter(center => {
    if (selectedState !== "all" && center.state !== selectedState) return false;
    if (selectedSpecialty !== "all" && !center.specialties.some(s => 
      s.toLowerCase().includes(selectedSpecialty.toLowerCase())
    )) return false;
    return true;
  });

  const allSpecialties = Array.from(
    new Set(treatmentCenters.flatMap(center => center.specialties))
  );

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
        {/* SEO Meta Tags */}
        <head>
          <title>Find Treatment Centers | Addiction Recovery Programs | Genius Recovery</title>
          <meta 
            name="description" 
            content="Find the best addiction treatment centers across the United States. Compare ratings, specialties, and programs to find the right recovery center for you or your loved one."
          />
          <meta name="keywords" content="treatment centers, addiction treatment, recovery programs, rehab centers, drug treatment, alcohol treatment" />
          <link rel="canonical" href="https://geniusrecovery.io/treatment-centers" />
          
          {/* Structured Data Schema */}
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebPage",
              "name": "Treatment Centers Directory",
              "description": "Find the best addiction treatment centers across the United States with verified locations, ratings, and specialized programs.",
              "url": "https://geniusrecovery.io/treatment-centers",
              "mainEntity": {
                "@type": "ItemList",
                "name": "Featured Treatment Centers",
                "description": "Top-rated addiction treatment centers in the United States",
                "numberOfItems": treatmentCenters.length,
                "itemListElement": treatmentCenters.map((center, index) => ({
                  "@type": "ListItem",
                  "position": index + 1,
                  "item": {
                    "@type": ["MedicalOrganization", "LocalBusiness"],
                    "@id": `https://geniusrecovery.io/treatment-centers/${center.id}`,
                    "name": center.name,
                    "description": center.description,
                    "url": `https://${center.website}`,
                    "telephone": center.phone,
                    "address": {
                      "@type": "PostalAddress",
                      "addressLocality": center.city,
                      "addressRegion": center.state,
                      "addressCountry": "US"
                    },
                    "geo": {
                      "@type": "GeoCoordinates",
                      "latitude": center.lat,
                      "longitude": center.lng
                    },
                    "aggregateRating": {
                      "@type": "AggregateRating",
                      "ratingValue": center.rating,
                      "bestRating": 5,
                      "worstRating": 1,
                      "ratingCount": center.reviews
                    },
                    "medicalSpecialty": center.specialties,
                    "hasCredential": center.accreditation.map(acc => ({
                      "@type": "EducationalOccupationalCredential",
                      "credentialCategory": "Accreditation",
                      "recognizedBy": {
                        "@type": "Organization",
                        "name": acc
                      }
                    })),
                    "serviceType": "Addiction Treatment",
                    "availableService": center.specialties.map(specialty => ({
                      "@type": "MedicalTherapy",
                      "name": specialty,
                      "category": "Addiction Treatment"
                    })),
                    "image": center.image,
                    "priceRange": "$$$$"
                  }
                }))
              },
              "breadcrumb": {
                "@type": "BreadcrumbList",
                "itemListElement": [
                  {
                    "@type": "ListItem",
                    "position": 1,
                    "name": "Home",
                    "item": "https://geniusrecovery.io"
                  },
                  {
                    "@type": "ListItem",
                    "position": 2,
                    "name": "Treatment Centers",
                    "item": "https://geniusrecovery.io/treatment-centers"
                  }
                ]
              },
              "publisher": {
                "@type": "Organization",
                "name": "Genius Recovery",
                "url": "https://geniusrecovery.io",
                "logo": {
                  "@type": "ImageObject",
                  "url": "https://geniusrecovery.io/genius-recovery-logo.png"
                }
              },
              "author": {
                "@type": "Organization",
                "name": "Genius Recovery",
                "url": "https://geniusrecovery.io"
              },
              "datePublished": "2024-01-01",
              "dateModified": new Date().toISOString().split('T')[0],
              "inLanguage": "en-US"
            })}
          </script>

          {/* Additional Schema for Medical Organizations */}
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "MedicalOrganization",
              "name": "Treatment Centers Directory",
              "description": "Comprehensive directory of accredited addiction treatment centers across the United States",
              "url": "https://geniusrecovery.io/treatment-centers",
              "medicalSpecialty": [
                "Addiction Medicine",
                "Substance Abuse Treatment", 
                "Alcohol Treatment",
                "Drug Rehabilitation",
                "Dual Diagnosis Treatment",
                "Mental Health Treatment"
              ],
              "serviceArea": {
                "@type": "Country",
                "name": "United States"
              },
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Treatment Center Services",
                "itemListElement": [
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Inpatient Treatment",
                      "description": "24/7 medical supervision and comprehensive addiction treatment"
                    }
                  },
                  {
                    "@type": "Offer", 
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Outpatient Treatment",
                      "description": "Flexible treatment programs that allow patients to maintain daily responsibilities"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service", 
                      "name": "Detoxification Services",
                      "description": "Medically supervised withdrawal management"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Therapy and Counseling",
                      "description": "Individual, group, and family therapy sessions"
                    }
                  }
                ]
              }
            })}
          </script>

          {/* Local Business Schema for Featured Centers */}
          {treatmentCenters.map((center) => (
            <script key={center.id} type="application/ld+json">
              {JSON.stringify({
                "@context": "https://schema.org",
                "@type": "MedicalOrganization",
                "@id": `https://geniusrecovery.io/treatment-centers/${center.id}`,
                "name": center.name,
                "description": center.description,
                "url": `https://${center.website}`,
                "telephone": center.phone,
                "address": {
                  "@type": "PostalAddress",
                  "addressLocality": center.city,
                  "addressRegion": center.state,
                  "addressCountry": "US"
                },
                "geo": {
                  "@type": "GeoCoordinates",
                  "latitude": center.lat,
                  "longitude": center.lng
                },
                "image": center.image,
                "aggregateRating": {
                  "@type": "AggregateRating", 
                  "ratingValue": center.rating,
                  "bestRating": 5,
                  "worstRating": 1,
                  "ratingCount": center.reviews
                },
                "review": [
                  {
                    "@type": "Review",
                    "reviewRating": {
                      "@type": "Rating",
                      "ratingValue": center.rating,
                      "bestRating": 5
                    },
                    "author": {
                      "@type": "Organization",
                      "name": "Genius Recovery"
                    },
                    "reviewBody": `${center.name} is a highly rated treatment center specializing in ${center.specialties.join(', ')}. Located in ${center.location}, this facility has earned ${center.rating}/5 stars from ${center.reviews} reviews.`
                  }
                ],
                "medicalSpecialty": center.specialties,
                "hasCredential": center.accreditation.map(acc => ({
                  "@type": "EducationalOccupationalCredential",
                  "credentialCategory": "Accreditation",
                  "recognizedBy": {
                    "@type": "Organization",
                    "name": acc
                  }
                })),
                "availableService": center.specialties.map(specialty => ({
                  "@type": "MedicalTherapy",
                  "name": specialty,
                  "category": "Addiction Treatment",
                  "provider": {
                    "@type": "MedicalOrganization",
                    "name": center.name
                  }
                })),
                "openingHours": "Mo-Su 00:00-23:59",
                "priceRange": "$$$$",
                "paymentAccepted": ["Insurance", "Self-Pay", "Financing"],
                "currenciesAccepted": "USD"
              })}
            </script>
          ))}

          {/* FAQ Schema */}
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "How do I choose the right treatment center?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Consider factors like location, treatment specialties, accreditation, insurance acceptance, and treatment approach. Look for centers that specialize in your specific needs and have proper licensing and accreditation."
                  }
                },
                {
                  "@type": "Question", 
                  "name": "What types of addiction treatment programs are available?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Treatment centers offer various programs including inpatient/residential treatment, outpatient programs, intensive outpatient programs (IOP), partial hospitalization programs (PHP), detoxification services, and aftercare planning."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Do treatment centers accept insurance?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Most accredited treatment centers accept various forms of insurance. Coverage varies by provider and plan, so it's important to verify benefits and coverage details with both your insurance company and the treatment center."
                  }
                },
                {
                  "@type": "Question",
                  "name": "What should I expect during treatment?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Treatment typically includes medical detox (if needed), individual and group therapy, educational sessions, recreational activities, family involvement, and discharge planning. Programs are tailored to individual needs and may include specialized therapies."
                  }
                }
              ]
            })}
          </script>
        </head>

        {/* Hero Section */}
        <section className="relative py-24 px-4 overflow-hidden">
          {/* Background with gradient and pattern */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-primary-glow/15 to-accent/10"></div>
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-30"></div>
          
          <div className="container mx-auto text-center relative z-10 max-w-5xl">
            {/* Main heading with icon */}
            <div className="flex items-center justify-center mb-8">
              <div className="bg-primary/10 p-4 rounded-full mr-6">
                <Heart className="h-12 w-12 text-primary animate-pulse" />
              </div>
              <div className="text-left">
                <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-2">
                  Find Your Path to
                </h1>
                <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary via-primary-glow to-accent bg-clip-text text-transparent">
                  Recovery
                </h1>
              </div>
            </div>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
              Discover trusted treatment centers across the United States. Every journey to recovery starts with hope and the right support.
            </p>

            {/* Feature cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="bg-card/50 backdrop-blur-sm rounded-xl p-6 border border-border/50 hover:border-border transition-all duration-300 hover:shadow-lg group">
                <MapPin className="h-12 w-12 text-primary mb-4 mx-auto group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-semibold text-foreground mb-3">Nationwide Coverage</h3>
                <p className="text-muted-foreground">Treatment centers in all 50 states with verified locations and contact information</p>
              </div>
              
              <div className="bg-card/50 backdrop-blur-sm rounded-xl p-6 border border-border/50 hover:border-border transition-all duration-300 hover:shadow-lg group">
                <Award className="h-12 w-12 text-primary mb-4 mx-auto group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-semibold text-foreground mb-3">Accredited Centers</h3>
                <p className="text-muted-foreground">Only verified, licensed facilities with proven track records of success</p>
              </div>
              
              <div className="bg-card/50 backdrop-blur-sm rounded-xl p-6 border border-border/50 hover:border-border transition-all duration-300 hover:shadow-lg group">
                <Users className="h-12 w-12 text-primary mb-4 mx-auto group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-semibold text-foreground mb-3">Personalized Care</h3>
                <p className="text-muted-foreground">Programs tailored to your unique needs and recovery goals</p>
              </div>
            </div>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button 
                asChild
                size="lg" 
                className="group relative overflow-hidden bg-gradient-to-r from-primary to-primary-glow hover:from-primary-glow hover:to-primary text-primary-foreground shadow-2xl hover:shadow-3xl hover:shadow-primary/30 transition-all duration-500 transform hover:scale-105 hover:-translate-y-1 px-8 py-4"
              >
                <Link to="/help">
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  <Phone className="h-5 w-5 mr-3 group-hover:animate-pulse relative z-10" />
                  <span className="relative z-10 font-semibold">Emergency Support</span>
                </Link>
              </Button>
              <Button 
                onClick={scrollToFeaturedCenters}
                variant="outline" 
                size="lg"
                className="group relative overflow-hidden border-2 border-primary/30 hover:border-primary bg-background/50 hover:bg-primary/5 transition-all duration-500 transform hover:scale-105 hover:-translate-y-1 px-8 py-4 backdrop-blur-sm"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/10 to-primary/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                <span className="relative z-10 font-semibold group-hover:text-primary transition-colors duration-300">Browse Centers Below</span>
                <div className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-primary to-primary-glow transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
              </Button>
            </div>
          </div>
        </section>

        {/* Interactive Map Section */}
        <section id="treatment-centers-map" className="py-16 px-4 bg-gradient-to-br from-background/50 to-primary/5">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-foreground mb-4">
                Explore Treatment Centers by Location
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Find treatment centers near you or explore options in different cities across the United States.
              </p>
            </div>

            <div className="relative bg-card/50 backdrop-blur-sm rounded-xl border border-border/50 overflow-hidden" style={{ height: '500px' }}>
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/10 to-accent/10">
                <div className="text-center space-y-4">
                  <MapPin className="h-20 w-20 text-primary mx-auto animate-pulse" />
                  <h3 className="text-3xl font-bold text-foreground">Coming Soon</h3>
                  <p className="text-lg text-muted-foreground max-w-md">
                    We're working on an interactive map to help you find treatment centers near you.
                  </p>
                </div>
              </div>
            </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 bg-gradient-to-r from-primary/10 via-primary-glow/10 to-accent/10">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Need Help Finding the Right Treatment Center?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Our recovery specialists are here to help you find the perfect treatment program for your unique needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button 
              asChild
              size="lg" 
              className="group relative overflow-hidden bg-gradient-to-r from-primary to-primary-glow hover:from-primary-glow hover:to-primary text-primary-foreground shadow-2xl hover:shadow-3xl hover:shadow-primary/30 transition-all duration-500 transform hover:scale-105 hover:-translate-y-1 px-8 py-4"
            >
              <Link to="/help">
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                <Phone className="h-5 w-5 mr-3 group-hover:animate-pulse relative z-10" />
                <span className="relative z-10 font-semibold">Emergency Support</span>
              </Link>
            </Button>
            <Button 
              asChild
              variant="outline" 
              size="lg"
              className="group relative overflow-hidden border-2 border-primary/30 hover:border-primary bg-background/50 hover:bg-primary/5 transition-all duration-500 transform hover:scale-105 hover:-translate-y-1 px-8 py-4 backdrop-blur-sm"
            >
              <Link to="/ai-companion">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/10 to-primary/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                <Heart className="h-5 w-5 mr-3 relative z-10 group-hover:text-primary group-hover:animate-pulse transition-colors duration-300" />
                <span className="relative z-10 font-semibold group-hover:text-primary transition-colors duration-300">Chat with AI Companion</span>
              </Link>
            </Button>
          </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}