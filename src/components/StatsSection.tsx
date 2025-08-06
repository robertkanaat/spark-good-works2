const StatsSection = () => {
  const stats = [
    {
      number: "21 million",
      label: "Americans struggle with addiction",
      description: "That's 1 in 12 people needing support"
    },
    {
      number: "24/7",
      label: "AI Recovery Companion available",
      description: "Always there when you need support most"
    },
    {
      number: "50,000+",
      label: "people supported in recovery",
      description: "Building a community of hope and healing"
    },
    {
      number: "95%",
      label: "report feeling less alone",
      description: "Connection and community make all the difference"
    }
  ];

  return (
    <section className="py-16 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            The addiction crisis affects us all
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Access to recovery support changes everything. It means hope, healing, and connection for individuals and families affected by addiction.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                {stat.number}
              </div>
              <h3 className="text-xl font-semibold mb-2">
                {stat.label}
              </h3>
              <p className="text-muted-foreground">
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;