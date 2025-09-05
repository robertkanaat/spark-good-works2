import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';

const SectionNavigation = () => {
  const [activeSection, setActiveSection] = useState('hero');

  // Get current path to determine which sections to show
  const currentPath = window.location.pathname;
  
  const sections = currentPath === '/emergency' ? [
    { id: 'hero', label: 'Emergency' },
    { id: 'emergency-numbers', label: 'Numbers' },
    { id: 'overdose-recognition', label: 'Overdose' },
    { id: 'naloxone-info', label: 'Naloxone' },
    { id: 'poison-control', label: 'Poison Control' },
    { id: 'crisis-hotlines', label: 'Crisis Help' }
  ] : currentPath === '/family-support' ? [
    { id: 'hero', label: 'Overview' },
    { id: 'support-programs', label: 'Programs' },
    { id: 'education-resources', label: 'Education' },
    { id: 'cta', label: 'Get Support' }
  ] : currentPath === '/recovery-tools' ? [
    { id: 'hero', label: 'Overview' },
    { id: 'emergency-support', label: 'Emergency Help' },
    { id: 'digital-tools', label: 'Apps & Tools' },
    { id: 'workbooks', label: 'Workbooks' },
    { id: 'online-support', label: 'Online Support' }
  ] : [
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
    <div className="fixed right-0 top-1/2 transform -translate-y-1/2 z-40 hidden lg:block group">
      <div className="relative">
        {/* Sliding container */}
        <div className="transform translate-x-[calc(100%-12px)] group-hover:translate-x-0 transition-transform duration-300 ease-out">
          <div className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border border-r-0 rounded-l-lg shadow-lg min-w-[140px]">
            <div className="flex flex-col py-2">
              {sections.map((section, index) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`
                    flex items-center gap-3 px-4 py-2 text-sm transition-all duration-200
                    hover:bg-accent hover:text-accent-foreground
                    ${activeSection === section.id 
                      ? 'bg-primary text-primary-foreground' 
                      : 'text-muted-foreground hover:text-foreground'
                    }
                  `}
                  style={{
                    transitionDelay: `${index * 30}ms`
                  }}
                >
                  <div className={`
                    w-2 h-2 rounded-full transition-all duration-200
                    ${activeSection === section.id 
                      ? 'bg-primary-foreground' 
                      : 'bg-muted-foreground/50'
                    }
                  `} />
                  <span className="whitespace-nowrap">{section.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
        
        {/* Hover trigger tab */}
        <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-3 h-16 bg-primary/20 rounded-l-md group-hover:bg-primary/30 transition-colors duration-200" />
      </div>
    </div>
  );
};

export default SectionNavigation;