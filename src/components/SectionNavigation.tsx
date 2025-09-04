import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';

const SectionNavigation = () => {
  const [activeSection, setActiveSection] = useState('hero');

  const sections = [
    { id: 'hero', label: 'Home' },
    { id: 'testimonials', label: 'Stories' },
    { id: 'video', label: 'About' },
    { id: 'stats', label: 'Impact' },
    { id: 'features', label: 'Services' },
    { id: 'volunteer', label: 'Volunteer' },
    { id: 'blog', label: 'Blog' },
    { id: 'letter', label: 'Letter' },
    { id: 'faq', label: 'FAQ' }
  ];

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
  };

  useEffect(() => {
    const handleScroll = () => {
      const headerHeight = 80;
      const scrollPosition = window.scrollY + headerHeight + 100;

      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const sectionTop = element.offsetTop;
          const sectionBottom = sectionTop + element.offsetHeight;

          if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial position

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="sticky top-20 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center py-2">
          <div className="flex gap-1 overflow-x-auto scrollbar-hide">
            {sections.map((section) => (
              <Button
                key={section.id}
                variant={activeSection === section.id ? "default" : "ghost"}
                size="sm"
                onClick={() => scrollToSection(section.id)}
                className="whitespace-nowrap text-xs px-3 py-1 h-8"
              >
                {section.label}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionNavigation;