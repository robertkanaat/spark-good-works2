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
                src="/src/assets/genius-recovery-logo-main.png" 
                alt="Genius Recovery" 
                className="h-8 lg:h-10 w-auto transition-opacity group-hover:opacity-80"
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
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-4 lg:px-6 text-sm">
                DONATE NOW
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;