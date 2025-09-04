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
    <div className="fixed right-4 top-1/2 transform -translate-y-1/2 z-40 hidden lg:block">
      <div className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border rounded-lg p-2 shadow-lg">
        <div className="flex flex-col gap-1">
          {sections.map((section) => (
            <Button
              key={section.id}
              variant={activeSection === section.id ? "default" : "ghost"}
              size="sm"
              onClick={() => scrollToSection(section.id)}
              className="text-xs px-3 py-1 h-8 justify-start min-w-[80px]"
            >
              {section.label}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SectionNavigation;