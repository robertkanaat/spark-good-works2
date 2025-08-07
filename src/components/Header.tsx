import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center group">
              <img 
                src="/lovable-uploads/503e117d-b085-47e8-916d-ecb3995e75e9.png" 
                alt="Genius Recovery" 
                className="w-[240px] h-auto transition-opacity group-hover:opacity-80"
              />
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden lg:block">
            <div className="ml-10 flex items-baseline space-x-6">
              <Link to="/emergency" className="text-muted-foreground hover:text-foreground px-3 py-2 text-sm font-medium transition-all duration-300 hover:scale-105 hover:bg-muted/50 rounded-md relative overflow-hidden group">
                <span className="relative z-10">GET HELP</span>
                <div className="absolute inset-0 bg-primary/10 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              </Link>
              <Link to="/resources" className="text-muted-foreground hover:text-foreground px-3 py-2 text-sm font-medium transition-all duration-300 hover:scale-105 hover:bg-muted/50 rounded-md relative overflow-hidden group">
                <span className="relative z-10">RESOURCES</span>
                <div className="absolute inset-0 bg-primary/10 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              </Link>
              <Link to="/blog" className="text-muted-foreground hover:text-foreground px-3 py-2 text-sm font-medium transition-all duration-300 hover:scale-105 hover:bg-muted/50 rounded-md relative overflow-hidden group">
                <span className="relative z-10">BLOG</span>
                <div className="absolute inset-0 bg-primary/10 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              </Link>
              <Link to="/shop" className="text-muted-foreground hover:text-foreground px-3 py-2 text-sm font-medium transition-all duration-300 hover:scale-105 hover:bg-muted/50 rounded-md relative overflow-hidden group">
                <span className="relative z-10">SHOP</span>
                <div className="absolute inset-0 bg-primary/10 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              </Link>
              <Link to="/press" className="text-muted-foreground hover:text-foreground px-3 py-2 text-sm font-medium transition-all duration-300 hover:scale-105 hover:bg-muted/50 rounded-md relative overflow-hidden group">
                <span className="relative z-10">PRESS</span>
                <div className="absolute inset-0 bg-primary/10 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              </Link>
            </div>
          </nav>

          {/* Desktop & Mobile Actions */}
          <div className="flex items-center gap-4">
            {/* Desktop Donate Button */}
            <Link to="/donation" className="hidden sm:block">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-4 lg:px-6 text-sm relative overflow-hidden group transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/25">
                <span className="relative z-10 transition-transform duration-300 group-hover:scale-110">
                  DONATE NOW
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-primary/50 to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute inset-0 bg-white/10 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"></div>
              </Button>
            </Link>

            {/* Mobile Menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="lg:hidden"
                  aria-label="Open menu"
                >
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <nav className="flex flex-col gap-4">
                  <div className="flex items-center justify-between mb-6">
                    <img 
                      src="/lovable-uploads/503e117d-b085-47e8-916d-ecb3995e75e9.png" 
                      alt="Genius Recovery" 
                      className="w-[200px] h-auto"
                    />
                  </div>
                  
                  <div className="flex flex-col gap-3">
                    <Link 
                      to="/emergency" 
                      className="text-lg font-medium text-foreground hover:text-primary px-4 py-3 rounded-md hover:bg-muted transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      GET HELP
                    </Link>
                    <Link 
                      to="/resources" 
                      className="text-lg font-medium text-foreground hover:text-primary px-4 py-3 rounded-md hover:bg-muted transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      RESOURCES
                    </Link>
                    <Link 
                      to="/blog" 
                      className="text-lg font-medium text-foreground hover:text-primary px-4 py-3 rounded-md hover:bg-muted transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      BLOG
                    </Link>
                    <Link 
                      to="/shop" 
                      className="text-lg font-medium text-foreground hover:text-primary px-4 py-3 rounded-md hover:bg-muted transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      SHOP
                    </Link>
                    <Link 
                      to="/press" 
                      className="text-lg font-medium text-foreground hover:text-primary px-4 py-3 rounded-md hover:bg-muted transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      PRESS
                    </Link>
                    
                    {/* Mobile Donate Button */}
                    <Link to="/donation" onClick={() => setIsOpen(false)}>
                      <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 text-lg mt-6">
                        DONATE NOW
                      </Button>
                    </Link>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;