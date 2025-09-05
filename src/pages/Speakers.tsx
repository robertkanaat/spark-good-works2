import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Play, Star, Calendar, Users, Award, Download, Mail, Phone, MapPin } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useToast } from '@/hooks/use-toast';

const speakingTopics = [
  {
    title: "Breaking the Cycle: Understanding Addiction Recovery",
    description: "A comprehensive look at the science and psychology behind addiction recovery",
    duration: "45-60 minutes"
  },
  {
    title: "Family Recovery: Healing Together",
    description: "How families can support recovery while protecting their own wellbeing",
    duration: "30-45 minutes"
  },
  {
    title: "The Genius Method: Revolutionary Recovery Approaches",
    description: "Innovative strategies that are transforming addiction treatment",
    duration: "60-90 minutes"
  },
  {
    title: "Mental Health in Recovery",
    description: "Addressing dual diagnosis and co-occurring disorders",
    duration: "45-60 minutes"
  },
  {
    title: "Workplace Wellness: Supporting Employees in Recovery",
    description: "Creating supportive workplace environments for recovery",
    duration: "30-45 minutes"
  },
  {
    title: "Hope and Healing: Personal Stories of Transformation",
    description: "Inspiring keynote sharing real recovery journeys",
    duration: "30-60 minutes"
  }
];

const testimonials = [
  {
    name: "Dr. Sarah Mitchell",
    role: "Conference Director, National Recovery Summit",
    content: "Joe's presentation was the highlight of our conference. His authentic approach and practical insights left our 500+ attendees genuinely inspired and equipped with actionable strategies.",
    rating: 5,
    event: "National Recovery Summit 2024"
  },
  {
    name: "Maria Rodriguez",
    role: "CEO, Hope Foundation",
    content: "Andre's keynote brought our entire organization to tears and then to action. His story of transformation combined with practical recovery principles created lasting impact.",
    rating: 5,
    event: "Hope Foundation Annual Gala"
  },
  {
    name: "Michael Chen",
    role: "Program Director, Wellness Corp",
    content: "The Genius Recovery team delivered exactly what we needed - hope, practical tools, and a clear path forward. Our employee wellness program was transformed.",
    rating: 5,
    event: "Corporate Wellness Summit"
  },
  {
    name: "Dr. Jennifer Adams",
    role: "Chief Medical Officer, Regional Health System",
    content: "Their evidence-based approach combined with personal experience creates a powerful message that resonates with both professionals and families.",
    rating: 5,
    event: "Medical Professional Conference"
  }
];

const achievements = [
  "100+ Speaking Engagements Annually",
  "Featured on National Media Outlets",
  "Keynote Speaker at Major Conferences",
  "Expert Contributors to Recovery Literature",
  "Award-Winning Recovery Advocates"
];

const Speakers = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    organization: '',
    eventDate: '',
    eventType: '',
    audience: '',
    topic: '',
    budget: '',
    message: ''
  });
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    toast({
      title: "Speaking Request Submitted",
      description: "Thank you for your interest! We'll respond within 24 hours.",
    });
    // Reset form
    setFormData({
      name: '', email: '', phone: '', organization: '', eventDate: '',
      eventType: '', audience: '', topic: '', budget: '', message: ''
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Book Joe & Andre as Speakers | Genius Recovery Speaking Bureau</title>
        <meta name="description" content="Book Joe and Andre from Genius Recovery for your next event. Inspiring keynotes on addiction recovery, family healing, and transformation. Professional speaker bureau services." />
        <meta name="keywords" content="recovery speakers, addiction keynote speakers, motivational speakers, recovery conference speakers, addiction recovery presentations" />
      </Helmet>

      <Header />

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 text-sm font-medium">Professional Speaking Bureau</Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Transformational Speakers
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Book Joe and Andre for inspiring keynotes that combine personal recovery journeys with evidence-based strategies that create lasting impact.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg px-8" onClick={() => document.getElementById('booking-form')?.scrollIntoView({ behavior: 'smooth' })}>
                <Calendar className="mr-2 h-5 w-5" />
                Book Speaking Engagement
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8" onClick={() => document.getElementById('speaker-kit')?.scrollIntoView({ behavior: 'smooth' })}>
                <Download className="mr-2 h-5 w-5" />
                Download Speaker Kit
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Speaker Highlights */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Speaker Highlights</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Proven track record of delivering powerful, transformational presentations
            </p>
          </div>
          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
            {achievements.map((achievement, index) => (
              <Card key={index} className="text-center p-4 hover:shadow-lg transition-shadow">
                <CardContent className="pt-4">
                  <Award className="h-8 w-8 text-primary mx-auto mb-3" />
                  <p className="font-medium text-sm">{achievement}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Speaker Reel */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Speaker Reel</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Watch highlights from recent speaking engagements
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="group cursor-pointer hover:shadow-xl transition-shadow">
              <div className="relative aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 rounded-t-lg flex items-center justify-center">
                <Play className="h-16 w-16 text-white drop-shadow-lg group-hover:scale-110 transition-transform" />
                <div className="absolute bottom-4 left-4 text-white">
                  <p className="font-semibold">Joe's Keynote Highlights</p>
                  <p className="text-sm opacity-90">5:30 minutes</p>
                </div>
              </div>
              <CardContent className="p-4">
                <p className="text-sm text-muted-foreground">
                  Compilation of Joe's most powerful moments from recent conferences
                </p>
              </CardContent>
            </Card>
            <Card className="group cursor-pointer hover:shadow-xl transition-shadow">
              <div className="relative aspect-video bg-gradient-to-br from-secondary/20 to-primary/20 rounded-t-lg flex items-center justify-center">
                <Play className="h-16 w-16 text-white drop-shadow-lg group-hover:scale-110 transition-transform" />
                <div className="absolute bottom-4 left-4 text-white">
                  <p className="font-semibold">Andre's Speaker Reel</p>
                  <p className="text-sm opacity-90">4:45 minutes</p>
                </div>
              </div>
              <CardContent className="p-4">
                <p className="text-sm text-muted-foreground">
                  Andre's transformational presentations and audience reactions
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Speaking Topics */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Speaking Topics</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Customizable presentations tailored to your audience and event goals
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {speakingTopics.map((topic, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">{topic.title}</CardTitle>
                  <Badge variant="secondary" className="w-fit">{topic.duration}</Badge>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{topic.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">What Attendees Say</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Hear from event organizers and attendees about the impact of our presentations
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4 italic">"{testimonial.content}"</p>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback>{testimonial.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold text-sm">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                      <p className="text-xs text-primary">{testimonial.event}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Speaker Kit Download */}
      <section id="speaker-kit" className="py-16 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Speaker Kit</h2>
            <p className="text-muted-foreground mb-8">
              Download our comprehensive speaker kit including bios, photos, topic outlines, and technical requirements
            </p>
            <Card className="p-8">
              <div className="grid md:grid-cols-2 gap-6 items-center">
                <div className="text-left">
                  <h3 className="text-xl font-semibold mb-4">Included in Speaker Kit:</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Professional headshots (high-res)</li>
                    <li>• Speaker biographies (multiple lengths)</li>
                    <li>• Topic descriptions and outlines</li>
                    <li>• Technical requirements</li>
                    <li>• Introduction scripts</li>
                    <li>• Previous event photos and videos</li>
                  </ul>
                </div>
                <div className="text-center">
                  <Button size="lg" className="w-full md:w-auto">
                    <Download className="mr-2 h-5 w-5" />
                    Download Speaker Kit (PDF)
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Booking Form */}
      <section id="booking-form" className="py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Book a Speaking Engagement</h2>
              <p className="text-muted-foreground">
                Let's discuss how we can make your event impactful and memorable
              </p>
            </div>
            
            <Card className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="mt-1"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="organization">Organization *</Label>
                    <Input
                      id="organization"
                      name="organization"
                      value={formData.organization}
                      onChange={handleInputChange}
                      required
                      className="mt-1"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="eventDate">Event Date *</Label>
                    <Input
                      id="eventDate"
                      name="eventDate"
                      type="date"
                      value={formData.eventDate}
                      onChange={handleInputChange}
                      required
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="eventType">Event Type *</Label>
                    <select
                      id="eventType"
                      name="eventType"
                      value={formData.eventType}
                      onChange={handleInputChange}
                      required
                      className="mt-1 w-full px-3 py-2 border border-input bg-background rounded-md text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      <option value="">Select event type</option>
                      <option value="conference">Conference</option>
                      <option value="corporate">Corporate Event</option>
                      <option value="nonprofit">Nonprofit Event</option>
                      <option value="medical">Medical/Healthcare</option>
                      <option value="educational">Educational Institution</option>
                      <option value="community">Community Event</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="audience">Expected Audience Size *</Label>
                    <Input
                      id="audience"
                      name="audience"
                      type="number"
                      value={formData.audience}
                      onChange={handleInputChange}
                      required
                      className="mt-1"
                      placeholder="e.g., 100"
                    />
                  </div>
                  <div>
                    <Label htmlFor="budget">Speaking Fee Budget</Label>
                    <select
                      id="budget"
                      name="budget"
                      value={formData.budget}
                      onChange={handleInputChange}
                      className="mt-1 w-full px-3 py-2 border border-input bg-background rounded-md text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      <option value="">Select budget range</option>
                      <option value="under-5k">Under $5,000</option>
                      <option value="5k-10k">$5,000 - $10,000</option>
                      <option value="10k-25k">$10,000 - $25,000</option>
                      <option value="25k-plus">$25,000+</option>
                      <option value="nonprofit">Nonprofit Rate</option>
                      <option value="discuss">Prefer to Discuss</option>
                    </select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="topic">Preferred Speaking Topic</Label>
                  <select
                    id="topic"
                    name="topic"
                    value={formData.topic}
                    onChange={handleInputChange}
                    className="mt-1 w-full px-3 py-2 border border-input bg-background rounded-md text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <option value="">Select a topic or choose custom</option>
                    {speakingTopics.map((topic, index) => (
                      <option key={index} value={topic.title}>{topic.title}</option>
                    ))}
                    <option value="custom">Custom Topic</option>
                  </select>
                </div>

                <div>
                  <Label htmlFor="message">Event Details & Special Requests</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    className="mt-1"
                    placeholder="Tell us about your event, goals, audience, and any special requirements..."
                    rows={4}
                  />
                </div>

                <Button type="submit" size="lg" className="w-full">
                  <Mail className="mr-2 h-5 w-5" />
                  Submit Speaking Request
                </Button>
              </form>
            </Card>

            <div className="mt-8 text-center">
              <p className="text-muted-foreground mb-4">Prefer to speak directly?</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-primary" />
                  <span className="text-sm">(555) 123-4567</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-primary" />
                  <span className="text-sm">speakers@geniusrecovery.org</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Speakers;