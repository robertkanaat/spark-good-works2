import { Card, CardContent } from "@/components/ui/card";
import { Quote } from "lucide-react";

const OurStorySection = () => {
  return (
    <section className="relative py-24 overflow-hidden" id="our-story">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-subtle opacity-30" aria-hidden />
      
      {/* Animated Background Elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-pulse opacity-60" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-donate/5 rounded-full blur-3xl animate-pulse delay-1000 opacity-40" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-card/80 backdrop-blur-sm rounded-full border border-primary/20 mb-6">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
            <span className="text-foreground font-bold tracking-wider uppercase text-sm">
              Our Story
            </span>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-foreground mb-8 leading-tight">
            Meet{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-donate to-primary">
              Joe Polish
            </span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            The founder's personal journey from addiction to advocacy that sparked a movement.
          </p>
        </div>

        {/* Main Story Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start mb-16">
          {/* Story Text */}
          <div className="lg:col-span-8">
            <Card className="bg-card/90 backdrop-blur-sm border-0 shadow-xl">
              <CardContent className="p-8 md:p-12">
                <div className="prose prose-neutral dark:prose-invert max-w-none prose-lg leading-relaxed">
                  <div className="space-y-6 text-foreground/90">
                    <p className="text-xl leading-relaxed font-light">
                      Joe Polish's life was profoundly shaped by his struggles with addiction. Like many, 
                      Joe found himself battling substance abuse at a young age, searching for an escape 
                      from underlying pain and trauma.
                    </p>
                    
                    <p>
                      By the time he was 18, addiction had nearly taken everything from him—his health, 
                      his relationships, and his hope for the future. It was in these darkest moments 
                      that Joe discovered something that would change his life: <strong className="font-bold text-primary">the root of his addiction wasn't a lack of willpower or a moral failing, but rather a response to unresolved pain.</strong>
                    </p>
                    
                    <p>
                      This realization became the catalyst for his healing journey. As Joe navigated his 
                      path to recovery, he encountered the stigmas and misunderstandings that often 
                      surround addiction. He saw firsthand how society isolates and judges those struggling, 
                      and how this only deepens the cycle of shame.
                    </p>
                    
                    <p>
                      Joe began to feel a strong urge to address this misunderstanding—to transform how 
                      people view addiction and to help others see it not as a failure, but as a response 
                      to life's deepest wounds.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Inspirational Quote Card */}
          <div className="lg:col-span-4">
            <Card className="bg-gradient-to-br from-primary/10 via-primary/5 to-donate/10 backdrop-blur-md border border-primary/20 shadow-xl">
              <CardContent className="p-8 text-center">
                <Quote className="w-12 h-12 text-primary mx-auto mb-6" />
                <blockquote className="text-xl font-medium text-foreground mb-6 italic leading-relaxed">
                  "Addiction isn't a failure—it's a response to pain. When we address the trauma, we unlock the potential for true healing."
                </blockquote>
                <div className="text-primary font-bold">
                  — Joe Polish
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Vision & Impact Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Vision */}
          <Card className="bg-card/90 backdrop-blur-sm border-0 shadow-xl">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
                <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                  <span className="text-primary font-bold text-sm">✦</span>
                </div>
                The Vision
              </h3>
              <div className="space-y-4 text-foreground/90">
                <p>
                  Joe's career as a successful entrepreneur taught him the power of connection and 
                  community. He realized that these principles could be incredibly impactful in 
                  the recovery space.
                </p>
                <p>
                  <strong className="text-primary">What if those struggling with addiction could access a supportive, 
                  non-judgmental network?</strong> What if there was a place where addicts, caregivers, 
                  and advocates could find resources, encouragement, and empathy?
                </p>
                <p>
                  Driven by these questions, Joe founded Genius Recovery to create a new paradigm 
                  in addiction support.
                </p>
              </div>
            </CardContent>
          </Card>
          
          {/* Impact */}
          <Card className="bg-card/90 backdrop-blur-sm border-0 shadow-xl">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
                <div className="w-8 h-8 bg-donate/20 rounded-full flex items-center justify-center">
                  <span className="text-donate font-bold text-sm">✦</span>
                </div>
                The Impact
              </h3>
              <div className="space-y-4 text-foreground/90">
                <p>
                  Genius Recovery reflects Joe's vision for a compassionate approach to addiction. 
                  It's a space where people from all walks of life can come together, free from 
                  stigma, to understand addiction and support each other.
                </p>
                <p>
                  Joe hopes that through Genius Recovery, people can find the strength and resources 
                  to rebuild their lives and that society can learn to view addiction through a 
                  lens of empathy and compassion.
                </p>
                <p className="font-medium text-primary">
                  He believes that with the right support, education, and connection, recovery 
                  is possible for everyone.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default OurStorySection;