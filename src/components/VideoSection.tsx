import { useState } from "react";
import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import videoPreview from "@/assets/video-preview.jpg";

const VideoSection = () => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  return (
    <>
      <section className="py-20 px-4 bg-gradient-to-br from-background via-secondary/20 to-background relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5" />
        <div className="absolute top-10 left-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-accent/10 rounded-full blur-3xl" />
        
        <div className="container mx-auto max-w-4xl relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              See Our Impact in Action
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Watch how we're transforming lives and building stronger communities through recovery support.
            </p>
          </div>

          <div className="relative group cursor-pointer" onClick={() => setIsVideoOpen(true)}>
            {/* Video thumbnail container */}
            <div 
              className="relative aspect-video bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl overflow-hidden shadow-2xl transition-all duration-500 group-hover:shadow-primary/25 group-hover:scale-[1.02] bg-cover bg-center"
              style={{ backgroundImage: `url(${videoPreview})` }}
            >
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
              
              {/* Play button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                  {/* Pulse rings */}
                  <div className="absolute inset-0 bg-white/20 rounded-full animate-ping" />
                  <div className="absolute inset-0 bg-white/10 rounded-full animate-pulse" />
                  
                  {/* Main play button */}
                  <Button
                    size="lg"
                    className="w-20 h-20 rounded-full bg-white/90 hover:bg-white text-primary hover:text-primary shadow-2xl transition-all duration-300 group-hover:scale-110"
                  >
                    <Play className="w-8 h-8 ml-1" fill="currentColor" />
                  </Button>
                </div>
              </div>

              {/* Video info overlay */}
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <h3 className="text-2xl font-bold mb-2">Our Recovery Journey</h3>
                <p className="text-white/90">Stories of hope, healing, and transformation</p>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-4 -left-4 w-8 h-8 bg-primary/30 rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-accent/30 rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          </div>

          <div className="text-center mt-8">
            <p className="text-muted-foreground">
              Click to watch our impact story
            </p>
          </div>
        </div>
      </section>

      {/* Video Modal */}
      <Dialog open={isVideoOpen} onOpenChange={setIsVideoOpen}>
        <DialogContent className="max-w-4xl w-[95vw] p-0 bg-black border-0">
          <DialogHeader className="sr-only">
            <DialogTitle>Recovery Impact Video</DialogTitle>
            <DialogDescription>
              Watch our video showcasing the impact of our recovery support programs
            </DialogDescription>
          </DialogHeader>
          <div className="aspect-video w-full">
            <iframe
              src="https://player.vimeo.com/video/1076776049?h=b4510e666f&autoplay=1&title=0&byline=0&portrait=0"
              width="100%"
              height="100%"
              frameBorder="0"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default VideoSection;