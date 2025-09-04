import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const OpenLetterPreview = () => {
  return (
    <section className="py-16 bg-card/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8 items-start">
          <div className="md:col-span-2">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
              An Open Letter to Anyone Struggling with Addiction
            </h2>
            <p className="text-muted-foreground mb-6">
              A compassionate message of understanding, connection, and hope for anyone facing addiction—or supporting someone who is.
            </p>
            <Link to="/open-letter">
              <Button>Read the Open Letter</Button>
            </Link>
          </div>
          <div className="rounded-lg border border-border p-4 bg-background/60">
            <p className="text-sm text-muted-foreground">
              "Ultimately, <strong className="text-primary">addiction is a connection disorder</strong>. It's feeling incredibly disconnected and uncomfortable in your own skin…"
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OpenLetterPreview;