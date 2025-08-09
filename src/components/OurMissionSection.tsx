import { Card, CardContent } from "@/components/ui/card";
import { Heart, Users, BookOpen, Target, Lightbulb } from "lucide-react";

const OurMissionSection = () => {
  const missionValues = [
    {
      icon: Heart,
      title: "Compassion",
      description: "We approach addiction with understanding and empathy, recognizing it as a response to pain rather than a moral failing."
    },
    {
      icon: Target,
      title: "Empowerment",
      description: "We provide individuals and families with the tools, knowledge, and support they need to reclaim their lives."
    },
    {
      icon: BookOpen,
      title: "Education", 
      description: "We share research-backed insights and expert knowledge to help people understand addiction and recovery."
    },
    {
      icon: Users,
      title: "Community",
      description: "We foster supportive networks where addicts, caregivers, and advocates can connect and heal together."
    },
    {
      icon: Lightbulb,
      title: "Healing",
      description: "We create pathways to comprehensive healing that address the root causes of addiction and trauma."
    }
  ];

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
      
      {/* Animated Background Elements */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-donate/5 rounded-full blur-3xl animate-pulse opacity-60" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse delay-1000 opacity-40" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-card/80 backdrop-blur-sm rounded-full border border-primary/20 mb-6">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
            <span className="text-foreground font-bold tracking-wider uppercase text-sm">
              Our Mission
            </span>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-foreground mb-8 leading-tight">
            Changing the Global{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-donate to-primary">
              Conversation
            </span>{" "}
            <br />
            Around Addiction
          </h2>
          
          <div className="max-w-4xl mx-auto">
            <p className="text-xl md:text-2xl text-foreground/90 mb-8 leading-relaxed font-medium">
              Our mission is to change the global conversation around addiction through 
              compassion, education, and connection.
            </p>
            
            <div className="p-8 bg-gradient-to-r from-primary/10 via-primary/5 to-donate/10 rounded-2xl border border-primary/20">
              <p className="text-lg text-foreground/80 leading-relaxed">
                At Genius Recovery, we provide trusted resources, expert insights, and a supportive 
                community for addicts, caregivers, and advocates. Together, we're creating a world 
                that views recovery with understanding and hope.
              </p>
            </div>
          </div>
        </div>

        {/* Mission Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {missionValues.map((value, index) => {
            const IconComponent = value.icon;
            return (
              <Card 
                key={value.title}
                className="group relative overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-card/90 backdrop-blur-sm animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Gradient Border Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-donate/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <CardContent className="relative p-8 text-center">
                  {/* Icon */}
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors duration-300">
                    <IconComponent className="w-8 h-8 text-primary" />
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-2xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors duration-300">
                    {value.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Mission Statement Quote */}
        <div className="text-center">
          <div className="relative max-w-4xl mx-auto p-12 bg-gradient-to-br from-primary/10 via-background to-donate/10 rounded-3xl border border-primary/20">
            {/* Quote Mark */}
            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                <span className="text-primary-foreground text-2xl font-bold">"</span>
              </div>
            </div>
            
            <blockquote className="text-2xl md:text-3xl italic font-light text-foreground leading-relaxed mb-6">
              "We believe that with the right support, education, and connection, 
              recovery is possible for everyone."
            </blockquote>
            
            <div className="text-primary font-bold text-lg">
              — The Genius Recovery Team
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurMissionSection;