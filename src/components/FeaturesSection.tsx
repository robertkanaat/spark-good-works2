const FeaturesSection = () => {
  const features = [
    {
      icon: "🤖",
      title: "24/7 AI Recovery Support",
      description: "Advanced AI companion available whenever you need support, guidance, or someone to talk to"
    },
    {
      icon: "🏥",
      title: "Treatment Center Network",
      description: "Comprehensive directory of vetted treatment centers and recovery programs nationwide"
    },
    {
      icon: "👥",
      title: "Peer Support Community",
      description: "Connect with others in recovery through our moderated support groups and forums"
    },
    {
      icon: "📱",
      title: "Mobile Recovery App",
      description: "Access tools, resources, and support directly from your smartphone or tablet"
    },
    {
      icon: "🎯",
      title: "Personalized Recovery Plans",
      description: "Customized recovery paths based on your specific needs and circumstances"
    },
    {
      icon: "📊",
      title: "Progress Tracking",
      description: "Monitor your recovery journey with comprehensive tracking and milestone recognition"
    }
  ];

  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Every donation brings hope and healing to someone in recovery
          </h2>
          <p className="text-lg text-muted-foreground max-w-4xl mx-auto">
            When you give to Genius Recovery, your donation goes directly to funding recovery support services, AI technology, and community programs that save lives.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="p-6">
              <div className="flex items-start mb-4">
                <div className="text-2xl mr-3 mt-1">✓</div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;