import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { MapPin, Star, Phone, Globe, Users, Award, Heart, Clock, Calendar, MessageCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import SupportGroupMap from "@/components/SupportGroupMap";

interface SupportGroup {
  id: number;
  name: string;
  location: string;
  city: string;
  state: string;
  rating: number;
  reviews: number;
  phone?: string;
  website?: string;
  meetingTypes: string[];
  description: string;
  lat: number;
  lng: number;
  schedule: string;
  cost: string;
  format: string[];
}

const supportGroups: SupportGroup[] = [
  {
    id: 1,
    name: "Alcoholics Anonymous - Downtown Group",
    location: "Los Angeles, California",
    city: "Los Angeles",
    state: "CA",
    rating: 4.8,
    reviews: 145,
    phone: "(323) 936-4343",
    website: "aa.org",
    meetingTypes: ["Open Meeting", "Big Book Study", "Step Study"],
    description: "A welcoming group focusing on the Big Book and 12 Steps. Open to newcomers and experienced members alike.",
    lat: 34.0522,
    lng: -118.2437,
    schedule: "Daily 7:00 PM",
    cost: "Free",
    format: ["In-Person", "Online"]
  },
  {
    id: 2,
    name: "Narcotics Anonymous - Central Group",
    location: "New York, New York",
    city: "New York",
    state: "NY",
    rating: 4.7,
    reviews: 98,
    phone: "(212) 929-6262",
    website: "na.org",
    meetingTypes: ["Open Meeting", "Closed Meeting", "Speaker Meeting"],
    description: "Long-established NA group with strong community support. Meets in a comfortable church basement setting.",
    lat: 40.7128,
    lng: -74.0060,
    schedule: "Mon, Wed, Fri 6:30 PM",
    cost: "Free",
    format: ["In-Person"]
  },
  {
    id: 3,
    name: "SMART Recovery - Chicago Chapter",
    location: "Chicago, Illinois",
    city: "Chicago",
    state: "IL",
    rating: 4.6,
    reviews: 67,
    phone: "(440) 951-5357",
    website: "smartrecovery.org",
    meetingTypes: ["Educational", "Self-Management", "Motivation Building"],
    description: "Science-based approach to addiction recovery using cognitive-behavioral tools and techniques.",
    lat: 41.8781,
    lng: -87.6298,
    schedule: "Thursdays 7:00 PM",
    cost: "Free",
    format: ["In-Person", "Online"]
  },
  {
    id: 4,
    name: "Celebrate Recovery",
    location: "Houston, Texas",
    city: "Houston",
    state: "TX",
    rating: 4.9,
    reviews: 134,
    phone: "(713) 365-2000",
    website: "celebraterecovery.com",
    meetingTypes: ["Christ-Centered", "12 Steps", "Open Share"],
    description: "Faith-based recovery program helping people overcome hurts, habits, and hang-ups through Christ's healing power.",
    lat: 29.7604,
    lng: -95.3698,
    schedule: "Fridays 7:00 PM",
    cost: "Free",
    format: ["In-Person"]
  },
  {
    id: 5,
    name: "Women for Sobriety",
    location: "Phoenix, Arizona",
    city: "Phoenix",
    state: "AZ",
    rating: 4.8,
    reviews: 89,
    website: "womenforsobriety.org",
    meetingTypes: ["Women Only", "Empowerment", "New Life Program"],
    description: "Empowering women to overcome addiction through positive thinking and personal growth strategies.",
    lat: 33.4484,
    lng: -112.0740,
    schedule: "Tuesdays 6:00 PM",
    cost: "Free",
    format: ["In-Person", "Online"]
  },
  {
    id: 6,
    name: "Refuge Recovery",
    location: "Portland, Oregon",
    city: "Portland",
    state: "OR",
    rating: 4.5,
    reviews: 76,
    website: "refugerecovery.org",
    meetingTypes: ["Buddhist-Based", "Meditation", "Mindfulness"],
    description: "Buddhist-inspired approach to recovery emphasizing meditation, mindfulness, and compassionate community.",
    lat: 45.5152,
    lng: -122.6784,
    schedule: "Sundays 10:00 AM",
    cost: "Free",
    format: ["In-Person"]
  },
  {
    id: 7,
    name: "LifeRing Secular Recovery",
    location: "San Francisco, California",
    city: "San Francisco",
    state: "CA",
    rating: 4.6,
    reviews: 54,
    website: "lifering.org",
    meetingTypes: ["Secular", "Cross-Talk", "Personal Choice"],
    description: "Secular, self-help network emphasizing personal responsibility and mutual support without religious content.",
    lat: 37.7749,
    lng: -122.4194,
    schedule: "Saturdays 2:00 PM",
    cost: "Free",
    format: ["In-Person", "Online"]
  },
  {
    id: 8,
    name: "Al-Anon Family Groups",
    location: "Denver, Colorado",
    city: "Denver",
    state: "CO",
    rating: 4.7,
    reviews: 102,
    phone: "(757) 563-1600",
    website: "al-anon.org",
    meetingTypes: ["Family Support", "12 Steps", "Open Meeting"],
    description: "Support for families and friends of people with drinking problems. Share experiences and find hope.",
    lat: 39.7392,
    lng: -104.9903,
    schedule: "Wednesdays 7:30 PM",
    cost: "Free",
    format: ["In-Person"]
  },
  {
    id: 9,
    name: "Gamblers Anonymous",
    location: "Las Vegas, Nevada",
    city: "Las Vegas",
    state: "NV",
    rating: 4.5,
    reviews: 43,
    phone: "(855) 222-5542",
    website: "gamblersanonymous.org",
    meetingTypes: ["Gambling Addiction", "12 Steps", "Support"],
    description: "Fellowship for people with gambling problems. Share experiences and find recovery through mutual support.",
    lat: 36.1699,
    lng: -115.1398,
    schedule: "Daily 8:00 PM",
    cost: "Free",
    format: ["In-Person"]
  },
  {
    id: 10,
    name: "Cocaine Anonymous",
    location: "Miami, Florida",
    city: "Miami",
    state: "FL",
    rating: 4.6,
    reviews: 71,
    website: "ca.org",
    meetingTypes: ["Cocaine/Crack", "12 Steps", "Fellowship"],
    description: "Fellowship for those recovering from cocaine and crack addiction using the 12-step program.",
    lat: 25.7617,
    lng: -80.1918,
    schedule: "Mon, Wed, Sat 7:00 PM",
    cost: "Free",
    format: ["In-Person", "Online"]
  },
  {
    id: 11,
    name: "Crystal Meth Anonymous",
    location: "Seattle, Washington",
    city: "Seattle",
    state: "WA",
    rating: 4.4,
    reviews: 38,
    website: "crystalmeth.org",
    meetingTypes: ["Crystal Meth", "12 Steps", "Recovery"],
    description: "12-step fellowship for people recovering from crystal meth addiction and related substances.",
    lat: 47.6062,
    lng: -122.3321,
    schedule: "Tuesdays 7:00 PM",
    cost: "Free",
    format: ["In-Person"]
  },
  {
    id: 12,
    name: "Marijuana Anonymous",
    location: "Boston, Massachusetts",
    city: "Boston",
    state: "MA",
    rating: 4.5,
    reviews: 29,
    website: "marijuana-anonymous.org",
    meetingTypes: ["Marijuana", "12 Steps", "Clean Time"],
    description: "Fellowship for those with marijuana dependency seeking recovery through the 12-step program.",
    lat: 42.3601,
    lng: -71.0589,
    schedule: "Thursdays 8:00 PM",
    cost: "Free",
    format: ["In-Person", "Online"]
  }
];

export default function SupportGroups() {
  const [selectedGroup, setSelectedGroup] = useState<SupportGroup | null>(null);
  const [filterType, setFilterType] = useState<string>("All");
  const mapSectionRef = useRef<HTMLElement>(null);

  // SEO Meta Tags Management
  useEffect(() => {
    document.title = "Find Support Groups & Recovery Meetings | Genius Recovery";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 
        'Find addiction recovery support groups and meetings near you. AA, NA, SMART Recovery, and more. Connect with local recovery communities and get the support you need.'
      );
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = 'Find addiction recovery support groups and meetings near you. AA, NA, SMART Recovery, and more. Connect with local recovery communities and get the support you need.';
      document.head.appendChild(meta);
    }
  }, []);

  const groupTypes = ["All", "AA", "NA", "SMART Recovery", "Faith-Based", "Women Only", "Secular", "Family Support"];
  
  const filteredGroups = filterType === "All" 
    ? supportGroups 
    : supportGroups.filter(group => 
        group.meetingTypes.some(type => type.toLowerCase().includes(filterType.toLowerCase())) ||
        group.name.toLowerCase().includes(filterType.toLowerCase())
      );

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Find Support Groups & Recovery Meetings | Genius Recovery"
        description="Find addiction recovery support groups and meetings near you. AA, NA, SMART Recovery, and more. Connect with local recovery communities and get the support you need."
        keywords="support groups, AA meetings, NA meetings, recovery meetings, addiction support, SMART recovery, support group finder, recovery community"
        canonicalUrl="https://geniusrecovery.org/support-groups"
      />
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/10 via-background to-donate/5 py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,hsl(var(--primary)/0.1),transparent_50%)]"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-card/80 backdrop-blur-sm rounded-full border border-primary/20 mb-8">
              <Users className="w-5 h-5 text-primary" />
              <span className="text-foreground font-bold tracking-wider uppercase text-sm">
                Recovery Community
              </span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary via-primary/80 to-donate bg-clip-text text-transparent mb-6 animate-fade-in">
              Find Support Groups & Recovery Meetings
            </h1>
            <p className="text-xl text-muted-foreground mb-12 leading-relaxed max-w-3xl mx-auto">
              Connect with local recovery communities and support groups. Find AA, NA, SMART Recovery, 
              and other fellowship meetings in your area. Recovery is stronger together.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <Badge variant="secondary" className="px-6 py-3 text-sm bg-card/80 backdrop-blur-sm border-primary/20">
                <Heart className="w-4 h-4 mr-2" />
                Free Support
              </Badge>
              <Badge variant="secondary" className="px-6 py-3 text-sm bg-card/80 backdrop-blur-sm border-primary/20">
                <Users className="w-4 h-4 mr-2" />
                Local Communities
              </Badge>
              <Badge variant="secondary" className="px-6 py-3 text-sm bg-card/80 backdrop-blur-sm border-primary/20">
                <Globe className="w-4 h-4 mr-2" />
                Multiple Programs
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="py-8 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {groupTypes.map((type) => (
              <Button
                key={type}
                variant={filterType === type ? "default" : "outline"}
                onClick={() => setFilterType(type)}
                className={`rounded-full px-6 py-3 font-medium transition-all duration-300 ${
                  filterType === type 
                    ? "bg-primary text-primary-foreground shadow-lg scale-105" 
                    : "hover:scale-105 hover:shadow-md"
                }`}
              >
                {type}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section ref={mapSectionRef} className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Support Groups Near You
            </h2>
            <p className="text-xl text-muted-foreground">
              Explore recovery meetings and support groups in your area
            </p>
          </div>
          
          <div className="bg-card rounded-2xl shadow-xl overflow-hidden border border-primary/10">
            <SupportGroupMap 
              groups={filteredGroups} 
              selectedGroup={selectedGroup}
              onGroupSelect={setSelectedGroup}
            />
          </div>
        </div>
      </section>

      {/* Groups List */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Recovery Support Groups
            </h2>
            <p className="text-xl text-muted-foreground">
              {filteredGroups.length} support groups found
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredGroups.map((group) => (
              <Card 
                key={group.id} 
                className="group h-full hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-primary/10 bg-gradient-to-br from-card to-card/80"
              >
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-xl font-bold mb-2 text-foreground group-hover:text-primary transition-colors">
                        {group.name}
                      </CardTitle>
                      <CardDescription className="flex items-center text-muted-foreground mb-3">
                        <MapPin className="w-4 h-4 mr-2 text-primary" />
                        {group.location}
                      </CardDescription>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold">{group.rating}</span>
                      <span className="text-muted-foreground">({group.reviews})</span>
                    </div>
                    <Badge variant="secondary" className="bg-primary/10 text-primary">
                      {group.cost}
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="space-y-6">
                  <p className="text-muted-foreground leading-relaxed">
                    {group.description}
                  </p>

                  {/* Meeting Types */}
                  <div>
                    <h4 className="font-semibold text-foreground mb-3 flex items-center">
                      <MessageCircle className="w-4 h-4 mr-2 text-primary" />
                      Meeting Types
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {group.meetingTypes.map((type, index) => (
                        <Badge key={index} variant="outline" className="text-xs border-primary/20 bg-primary/5">
                          {type}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Schedule & Format */}
                  <div className="grid grid-cols-1 gap-4">
                    <div className="flex items-center gap-3 text-sm">
                      <Clock className="w-4 h-4 text-primary" />
                      <span className="text-muted-foreground">{group.schedule}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <Globe className="w-4 h-4 text-primary" />
                      <span className="text-muted-foreground">{group.format.join(", ")}</span>
                    </div>
                  </div>

                  {/* Contact Information */}
                  <div className="space-y-3 pt-4 border-t border-muted">
                    {group.phone && (
                      <a href={`tel:${group.phone}`} className="flex items-center gap-3 text-sm hover:text-primary transition-colors">
                        <Phone className="w-4 h-4" />
                        <span>{group.phone}</span>
                      </a>
                    )}
                    {group.website && (
                      <a 
                        href={`https://${group.website}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 text-sm hover:text-primary transition-colors"
                      >
                        <Globe className="w-4 h-4" />
                        <span>{group.website}</span>
                      </a>
                    )}
                  </div>

                  <Button 
                    onClick={() => {
                      setSelectedGroup(group);
                      mapSectionRef.current?.scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'start'
                      });
                    }}
                    className="w-full mt-6 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 transition-all duration-300"
                  >
                    View on Map
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-donate/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Heart className="w-16 h-16 text-primary mx-auto mb-8" />
          <h2 className="text-4xl font-bold text-foreground mb-6">
            Need Help Finding the Right Group?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            Our team can help you find the perfect support group for your recovery journey. 
            Get personalized recommendations and support.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button size="lg" className="bg-gradient-to-r from-primary to-donate hover:from-primary/90 hover:to-donate/90 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                Get Personal Help
              </Button>
            </Link>
            <Link to="/emergency">
              <Button size="lg" variant="outline" className="px-8 py-4 text-lg font-semibold border-primary/30 hover:bg-primary hover:text-primary-foreground rounded-xl transition-all duration-300">
                Crisis Support
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}