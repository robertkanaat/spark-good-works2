import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">🧠</span>
              </div>
              <span className="ml-2 text-xl font-bold text-foreground">GENIUS RECOVERY</span>
            </div>
          </div>
          
          <nav className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <Link to="/emergency" className="text-muted-foreground hover:text-foreground px-3 py-2 text-sm font-medium">
                GET HELP
              </Link>
              <a href="#" className="text-muted-foreground hover:text-foreground px-3 py-2 text-sm font-medium">
                RESOURCES
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground px-3 py-2 text-sm font-medium">
                BLOG
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground px-3 py-2 text-sm font-medium">
                SHOP
              </a>
            </div>
          </nav>

          <Link to="/donation">
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-6">
              DONATE NOW
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;