import { useState } from "react";
import { MapPin, Star, Phone, Globe, Users, Award, Heart } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

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
    image: "/lovable-uploads/3e7570fb-81cb-420b-9f97-79f46edfba7b.png",
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
    image: "/lovable-uploads/411b8a25-5350-48b3-a3b5-b01e67d05ea2.png",
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
    image: "/lovable-uploads/503e117d-b085-47e8-916d-ecb3995e75e9.png",
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
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* SEO Meta Tags */}
      <head>
        <title>Find Treatment Centers | Addiction Recovery Programs | Genius Recovery</title>
        <meta 
          name="description" 
          content="Find the best addiction treatment centers across the United States. Compare ratings, specialties, and programs to find the right recovery center for you or your loved one."
        />
        <meta name="keywords" content="treatment centers, addiction treatment, recovery programs, rehab centers, drug treatment, alcohol treatment" />
        <link rel="canonical" href="https://geniusrecovery.io/treatment-centers" />
      </head>

      {/* Hero Section with Map */}
      <section className="relative bg-gradient-to-r from-primary via-primary-glow to-accent py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIyIi8+PC9nPjwvZz48L3N2Zz4=')] opacity-20"></div>
        
        <div className="container mx-auto text-center relative z-10">
          <div className="flex items-center justify-center mb-6">
            <Heart className="h-12 w-12 text-white mr-4 animate-pulse" />
            <h1 className="text-5xl md:text-6xl font-bold text-white">
              Find Your Path to Recovery
            </h1>
          </div>
          
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
            Discover trusted treatment centers across the United States. Every journey to recovery starts with hope and the right support.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <MapPin className="h-10 w-10 text-white mb-4 mx-auto" />
              <h3 className="text-xl font-semibold text-white mb-2">Nationwide Coverage</h3>
              <p className="text-white/80">Treatment centers in all 50 states</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <Award className="h-10 w-10 text-white mb-4 mx-auto" />
              <h3 className="text-xl font-semibold text-white mb-2">Accredited Centers</h3>
              <p className="text-white/80">Only verified, licensed facilities</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <Users className="h-10 w-10 text-white mb-4 mx-auto" />
              <h3 className="text-xl font-semibold text-white mb-2">Personalized Care</h3>
              <p className="text-white/80">Programs tailored to your needs</p>
            </div>
          </div>

          {/* Interactive Map Placeholder */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 max-w-6xl mx-auto">
            <h3 className="text-2xl font-semibold text-white mb-6">Explore Treatment Centers by Location</h3>
            
            {/* Map would go here - using placeholder for now */}
            <div className="bg-gradient-to-br from-white/20 to-white/10 rounded-xl h-96 flex items-center justify-center border border-white/30">
              <div className="text-center">
                <MapPin className="h-16 w-16 text-white mx-auto mb-4" />
                <p className="text-white text-lg font-medium">Interactive Map Coming Soon</p>
                <p className="text-white/80">Browse cities below to find treatment centers</p>
              </div>
            </div>

            {/* Major Cities Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
              {majorCities.map((city) => (
                <button
                  key={`${city.name}-${city.state}`}
                  className="bg-white/10 hover:bg-white/20 rounded-lg p-4 text-left transition-all duration-200 border border-white/20 hover:border-white/40"
                >
                  <h4 className="text-white font-semibold">{city.name}, {city.state}</h4>
                  <p className="text-white/70 text-sm">{city.centers} centers</p>
                </button>
              ))}
            </div>
          </div>
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
      <section className="py-16 px-4">
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
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-primary hover:bg-primary/90">
              <Phone className="h-5 w-5 mr-2" />
              Get Help Now
            </Button>
            <Button variant="outline" size="lg">
              Chat with AI Companion
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}