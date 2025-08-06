import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center group">
              <img 
                src="/genius-recovery-logo.png" 
                alt="Genius Recovery" 
                className="w-[200px] h-auto transition-opacity group-hover:opacity-80"
              />
            </Link>
          </div>
          
          <nav className="hidden lg:block">
            <div className="ml-10 flex items-baseline space-x-6">
              <Link to="/emergency" className="text-muted-foreground hover:text-foreground px-3 py-2 text-sm font-medium transition-colors">
                GET HELP
              </Link>
              <a href="#" className="text-muted-foreground hover:text-foreground px-3 py-2 text-sm font-medium transition-colors">
                RESOURCES
              </a>
              <Link to="/blog" className="text-muted-foreground hover:text-foreground px-3 py-2 text-sm font-medium transition-colors">
                BLOG
              </Link>
              <Link to="/shop" className="text-muted-foreground hover:text-foreground px-3 py-2 text-sm font-medium transition-colors">
                SHOP
              </Link>
            </div>
          </nav>

          <div className="flex items-center gap-4">
            <Link to="/donation" className="hidden sm:block">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-4 lg:px-6 text-sm relative overflow-hidden group transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/25">
                <span className="relative z-10 transition-transform duration-300 group-hover:scale-110">
                  DONATE NOW
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-primary/50 to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute inset-0 bg-white/10 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"></div>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;