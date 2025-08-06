import { Link } from "react-router-dom";

const DonationSection = () => {
  return (
    <section className="py-16 bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-12">
          <div className="text-center">
            <div className="text-muted-foreground text-sm mb-2">I NEED...</div>
            <button className="border border-border hover:bg-muted px-8 py-6 text-lg font-semibold rounded-md w-full">
              HELP
            </button>
          </div>
          
          <div className="text-center">
            <div className="text-muted-foreground text-sm mb-2">I WANT TO...</div>
            <Link to="/donation" className="block">
              <button className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg font-semibold rounded-md w-full">
                DONATE
              </button>
            </Link>
          </div>
          
          <div className="text-center">
            <div className="text-muted-foreground text-sm mb-2">I WANT TO...</div>
            <button className="border border-border hover:bg-muted px-8 py-6 text-lg font-semibold rounded-md w-full">
              SUPPORT
            </button>
          </div>
        </div>
        
        <div className="text-muted-foreground mb-8">
          Join thousands of people around the world who are supporting recovery, healing, and hope for those affected by addiction.
        </div>
      </div>
    </section>
  );
};

export default DonationSection;