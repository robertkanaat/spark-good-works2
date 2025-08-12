import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Sarah M.",
    role: "Recovery Advocate",
    content: "Genius Recovery's AI companion was there for me at 3 AM when I needed support most. The 24/7 availability literally saved my recovery.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: 2,
    name: "Michael T.",
    role: "6 Months Sober",
    content: "The personalized recovery plans and connection to local resources made all the difference. I finally found the support system I needed.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: 3,
    name: "Jennifer L.",
    role: "Family Member",
    content: "As a mother watching my son struggle, Genius Recovery gave me the tools and community I needed to support him without losing myself.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: 4,
    name: "David R.",
    role: "2 Years in Recovery",
    content: "The crisis intervention feature connected me to help when I was ready to give up. Today, I'm celebrating 2 years of sobriety.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: 5,
    name: "Lisa K.",
    role: "Treatment Center Partner",
    content: "We've seen remarkable outcomes with clients who use Genius Recovery's platform alongside traditional treatment. The data speaks for itself.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1559528650-48c467e4f2c1?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: 6,
    name: "Robert A.",
    role: "Peer Support Specialist",
    content: "The platform bridges gaps in traditional recovery support. It's always available, non-judgmental, and connects people to real help.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face"
  }
];

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-muted/30 via-background to-muted/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Star className="w-4 h-4 fill-current" />
            Real Stories, Real Impact
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Transforming Lives Through
            <span className="text-primary"> Recovery Support</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Hear from real people whose lives have been transformed by our comprehensive recovery platform and 24/7 AI support system.
          </p>
        </div>

        <div className="relative">
          {/* Main testimonial display */}
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div key={testimonial.id} className="w-full flex-shrink-0 px-4">
                  <Card className="max-w-4xl mx-auto bg-white/80 backdrop-blur-sm border-white/20 shadow-xl">
                    <CardContent className="p-8 md:p-12">
                      <div className="text-center">
                        <Quote className="w-12 h-12 text-primary mx-auto mb-6 opacity-60" />
                        
                        <blockquote className="text-lg md:text-xl text-foreground mb-8 leading-relaxed italic">
                          "{testimonial.content}"
                        </blockquote>
                        
                        <div className="flex flex-col items-center">
                          <Avatar className="w-16 h-16 mb-4 border-4 border-primary/20">
                            <AvatarImage 
                              src={testimonial.image} 
                              alt={testimonial.name}
                            />
                            <AvatarFallback className="text-lg font-semibold bg-primary/10 text-primary">
                              {testimonial.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div className="text-center">
                            <div className="font-semibold text-lg text-foreground">{testimonial.name}</div>
                            <div className="text-muted-foreground">{testimonial.role}</div>
                            <div className="flex justify-center mt-2">
                              {[...Array(testimonial.rating)].map((_, i) => (
                                <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation buttons */}
          <div className="flex justify-center items-center gap-4 mt-8">
            <Button
              variant="outline"
              size="icon"
              onClick={prevTestimonial}
              className="rounded-full hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>

            {/* Dots indicator */}
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? 'bg-primary scale-125'
                      : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                  }`}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={nextTestimonial}
              className="rounded-full hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>

          {/* Auto-play indicator */}
          <div className="text-center mt-4">
            <button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {isAutoPlaying ? 'Pause auto-play' : 'Resume auto-play'}
            </button>
          </div>
        </div>

        {/* Call to action */}
        <div className="text-center mt-16">
          <div className="max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">Ready to Start Your Recovery Journey?</h3>
            <p className="text-muted-foreground mb-6">
              Join thousands of people who have found hope, healing, and lasting recovery through our platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8">
                Get Support Now
              </Button>
              <Button variant="outline" size="lg" className="px-8">
                Share Your Story
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;