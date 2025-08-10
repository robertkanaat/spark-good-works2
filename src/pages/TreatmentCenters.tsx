import { useState } from "react";
import { Link } from "react-router-dom";
import { MapPin, Star, Phone, Globe, Users, Award, Heart } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
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
    website: "bettyfordcenter.org",
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
  const [selectedState, setSelectedState] = useState<string>("all");
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>("all");

  const scrollToFeaturedCenters = () => {
    const featuredSection = document.getElementById('featured-centers');
    if (featuredSection) {
      featuredSection.scrollIntoView({ 
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
                  <span className="relative z-10 font-semibold">Get Help Now</span>
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
        <section className="py-16 px-4 bg-gradient-to-br from-background/50 to-primary/5">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-foreground mb-4">
                Explore Treatment Centers by Location
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Find treatment centers near you or explore options in different cities across the United States.
              </p>
            </div>

            <TreatmentCenterMap />
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 px-4 bg-background/50 backdrop-blur-sm border-b">
        <div className="container mx-auto">
          <div className="flex flex-wrap gap-4 items-center justify-center">
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-foreground">State:</label>
              <select 
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                className="bg-background border border-border rounded-md px-3 py-1 text-sm"
              >
                <option value="all">All States</option>
                <option value="CA">California</option>
                <option value="MN">Minnesota</option>
                <option value="TX">Texas</option>
                <option value="NY">New York</option>
              </select>
            </div>
            
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-foreground">Specialty:</label>
              <select 
                value={selectedSpecialty}
                onChange={(e) => setSelectedSpecialty(e.target.value)}
                className="bg-background border border-border rounded-md px-3 py-1 text-sm"
              >
                <option value="all">All Specialties</option>
                {allSpecialties.map((specialty) => (
                  <option key={specialty} value={specialty}>{specialty}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Treatment Centers Feed */}
      <section id="featured-centers" className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Featured Treatment Centers
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Carefully selected centers known for their excellence in addiction treatment and recovery support.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCenters.map((center) => (
              <Card key={center.id} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-border/50 bg-card/50 backdrop-blur-sm">
                <div className="relative overflow-hidden rounded-t-lg">
                  <img 
                    src={center.image} 
                    alt={center.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4 bg-background/90 backdrop-blur-sm rounded-lg px-2 py-1 flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="text-sm font-medium">{center.rating}</span>
                  </div>
                </div>
                
                <CardHeader>
                  <CardTitle className="text-xl text-foreground group-hover:text-primary transition-colors">
                    {center.name}
                  </CardTitle>
                  <CardDescription className="flex items-center gap-1 text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    {center.location}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {center.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {center.specialties.slice(0, 3).map((specialty, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {specialty}
                      </Badge>
                    ))}
                    {center.specialties.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{center.specialties.length - 3} more
                      </Badge>
                    )}
                  </div>
                  
                  <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                    {center.accreditation.map((acc, index) => (
                      <span key={index} className="bg-accent/10 px-2 py-1 rounded">
                        {acc}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex gap-2 pt-4">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Phone className="h-4 w-4 mr-2" />
                      Call
                    </Button>
                    <Button variant="secondary" size="sm" className="flex-1">
                      <Globe className="h-4 w-4 mr-2" />
                      Visit
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredCenters.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">No treatment centers found matching your criteria.</p>
              <Button 
                variant="outline" 
                onClick={() => {
                  setSelectedState("all");
                  setSelectedSpecialty("all");
                }}
                className="mt-4"
              >
                Clear Filters
              </Button>
            </div>
          )}
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
                <span className="relative z-10 font-semibold">Get Help Now</span>
              </Link>
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="group relative overflow-hidden border-2 border-primary/30 hover:border-primary bg-background/50 hover:bg-primary/5 transition-all duration-500 transform hover:scale-105 hover:-translate-y-1 px-8 py-4 backdrop-blur-sm"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/10 to-primary/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              <Heart className="h-5 w-5 mr-3 relative z-10 group-hover:text-primary group-hover:animate-pulse transition-colors duration-300" />
              <span className="relative z-10 font-semibold group-hover:text-primary transition-colors duration-300">Chat with AI Companion</span>
            </Button>
          </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}