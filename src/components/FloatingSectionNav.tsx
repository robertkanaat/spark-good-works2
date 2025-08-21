import { useState, useEffect } from 'react';
import { ChevronUp, ChevronDown, Home, Users, Play, BarChart3, Sparkles, Heart, BookOpen, Mail, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface Section {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

const sections: Section[] = [
  { id: 'hero', label: 'Home', icon: Home },
  { id: 'testimonials', label: 'Stories', icon: Users },
  { id: 'video', label: 'Video', icon: Play },
  { id: 'stats', label: 'Impact', icon: BarChart3 },
  { id: 'features', label: 'Programs', icon: Sparkles },
  { id: 'volunteer', label: 'Get Involved', icon: Heart },
  { id: 'blog', label: 'Blog', icon: BookOpen },
  { id: 'open-letter', label: 'Open Letter', icon: Mail },
  { id: 'faq', label: 'FAQ', icon: HelpCircle },
];

const FloatingSectionNav = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      
      // Show nav after scrolling past hero section (roughly 100vh)
      setIsVisible(scrollY > window.innerHeight * 0.3);

      // Find active section
      const sectionElements = sections.map(section => ({
        id: section.id,
        element: document.getElementById(section.id)
      })).filter(item => item.element);

      for (const { id, element } of sectionElements) {
        if (element) {
          const rect = element.getBoundingClientRect();
          const isInView = rect.top <= window.innerHeight * 0.5 && rect.bottom >= window.innerHeight * 0.5;
          
          if (isInView) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial position
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerHeight = 80; // Account for fixed header
      const elementPosition = element.offsetTop - headerHeight;
      
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
    setIsExpanded(false);
  };

  const currentSectionIndex = sections.findIndex(s => s.id === activeSection);
  const canGoUp = currentSectionIndex > 0;
  const canGoDown = currentSectionIndex < sections.length - 1;

  const goToPreviousSection = () => {
    if (canGoUp) {
      scrollToSection(sections[currentSectionIndex - 1].id);
    }
  };

  const goToNextSection = () => {
    if (canGoDown) {
      scrollToSection(sections[currentSectionIndex + 1].id);
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col items-end gap-2">
      {/* Quick navigation arrows */}
      <div className="flex flex-col gap-1">
        <Button
          variant="ghost"
          size="sm"
          onClick={goToPreviousSection}
          disabled={!canGoUp}
          className={cn(
            "w-10 h-10 rounded-full bg-background/80 backdrop-blur-md border border-border/50 shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl hover:bg-background/90",
            !canGoUp && "opacity-50 cursor-not-allowed"
          )}
        >
          <ChevronUp className="w-4 h-4" />
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={goToNextSection}
          disabled={!canGoDown}
          className={cn(
            "w-10 h-10 rounded-full bg-background/80 backdrop-blur-md border border-border/50 shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl hover:bg-background/90",
            !canGoDown && "opacity-50 cursor-not-allowed"
          )}
        >
          <ChevronDown className="w-4 h-4" />
        </Button>
      </div>

      {/* Main navigation */}
      <div 
        className={cn(
          "bg-background/80 backdrop-blur-md border border-border/50 rounded-2xl shadow-2xl transition-all duration-500 overflow-hidden",
          isExpanded ? "w-48" : "w-12"
        )}
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
      >
        <div className="p-2">
          {sections.map((section, index) => {
            const Icon = section.icon;
            const isActive = activeSection === section.id;
            
            return (
              <Button
                key={section.id}
                variant="ghost"
                size="sm"
                onClick={() => scrollToSection(section.id)}
                className={cn(
                  "w-full h-10 justify-start gap-3 transition-all duration-300 rounded-xl relative group overflow-hidden",
                  isActive 
                    ? "bg-primary/10 text-primary shadow-sm scale-105" 
                    : "hover:bg-muted/50 hover:scale-105 text-muted-foreground hover:text-foreground"
                )}
              >
                <div className={cn(
                  "absolute left-0 top-0 h-full w-1 bg-primary transition-all duration-300 rounded-r-full",
                  isActive ? "opacity-100" : "opacity-0 group-hover:opacity-50"
                )} />
                
                <Icon className={cn(
                  "w-4 h-4 flex-shrink-0 transition-colors duration-300",
                  isActive ? "text-primary" : ""
                )} />
                
                <span className={cn(
                  "text-sm font-medium transition-all duration-300 whitespace-nowrap",
                  isExpanded ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2"
                )}>
                  {section.label}
                </span>

                {isActive && (
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent rounded-xl" />
                )}
              </Button>
            );
          })}
        </div>
      </div>

      {/* Progress indicator */}
      <div className="bg-background/80 backdrop-blur-md border border-border/50 rounded-full p-3 shadow-lg">
        <div className="relative w-3 h-20">
          <div className="absolute inset-0 bg-muted rounded-full" />
          <div 
            className="absolute left-0 bg-primary rounded-full w-full transition-all duration-500 ease-out"
            style={{
              height: `${((currentSectionIndex + 1) / sections.length) * 100}%`,
              top: 0
            }}
          />
          <div 
            className="absolute w-1 h-1 bg-primary-foreground rounded-full left-1/2 -translate-x-1/2 transition-all duration-500 shadow-sm"
            style={{
              top: `${(currentSectionIndex / (sections.length - 1)) * (100 - 4)}%`
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default FloatingSectionNav;