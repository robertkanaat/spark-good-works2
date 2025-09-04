import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Phone, AlertTriangle, Heart, Shield, Users, Clock, MapPin, Stethoscope } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import SectionNavigation from "@/components/SectionNavigation";
import emergencyHeroBg from "@/assets/emergency-comprehensive-hero-bg.jpg";

const Emergency = () => {
  useEffect(() => {
    document.title = "Emergency Crisis Support - Immediate Help Available | Genius Recovery";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Get immediate emergency crisis support. Access 24/7 hotlines, emergency resources, and life-saving information for mental health and addiction emergencies.');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = 'Get immediate emergency crisis support. Access 24/7 hotlines, emergency resources, and life-saving information for mental health and addiction emergencies.';
      document.head.appendChild(meta);
    }
  }, []);

  return (
    <div className="min-h-screen">
      <Header />
      <SectionNavigation />
      
      {/* Hero Section */}
      <section id="hero" className="relative min-h-[70vh] flex items-center">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${emergencyHeroBg})` }}
        >
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Emergency Support
          </h1>
          <p className="text-2xl text-white/90 mb-8 max-w-4xl mx-auto">
            Comprehensive Crisis Resources: 911 • Crisis Hotlines • Overdose Recognition • Mental Health Support
          </p>
          <p className="text-lg text-white/80 max-w-3xl mx-auto mb-12">
            Complete emergency preparedness guide including life-threatening situations, opioid overdose recognition, 
            Naloxone information, and 24/7 crisis support resources.
          </p>
          
          {/* Comprehensive Quick Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            <Button 
              size="lg" 
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-4"
              onClick={() => window.location.href = 'tel:911'}
            >
              <Phone className="w-5 h-5 mr-2" />
              Call 911
            </Button>
            <Button 
              size="lg" 
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-4"
              onClick={() => window.location.href = 'tel:988'}
            >
              <Heart className="w-5 h-5 mr-2" />
              Crisis Line 988
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="bg-white/10 border-white/30 text-white hover:bg-white/90 hover:text-primary backdrop-blur-sm px-6 py-4"
              onClick={() => {
                const overdoseSection = document.querySelector('h2[class*="text-4xl"]:nth-of-type(1)');
                if (overdoseSection) {
                  overdoseSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              <AlertTriangle className="w-5 h-5 mr-2" />
              Overdose Help
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="bg-white/10 border-white/30 text-white hover:bg-white/90 hover:text-primary backdrop-blur-sm px-6 py-4"
              onClick={() => {
                const naloxoneSection = Array.from(document.querySelectorAll('h2')).find(h2 => h2.textContent?.includes('Naloxone'));
                if (naloxoneSection) {
                  naloxoneSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              <Shield className="w-5 h-5 mr-2" />
              Naloxone Info
            </Button>
          </div>
          
          {/* Visual indicators for key resources */}
          <div className="mt-12 flex flex-wrap justify-center gap-6 text-sm text-white/70">
            <span className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              Emergency Numbers
            </span>
            <span className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" />
              Overdose Recognition
            </span>
            <span className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              Life-Saving Medications
            </span>
            <span className="flex items-center gap-2">
              <Heart className="w-4 h-4" />
              24/7 Crisis Support
            </span>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          {/* Emergency Numbers - Prominent Display */}
          <div id="emergency-numbers" className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
            <Card className="p-8 bg-gradient-to-br from-red-50 to-red-100 border-red-200 dark:from-red-950/30 dark:to-red-900/30">
              <div className="text-center">
                <Phone className="w-20 h-20 text-red-500 mx-auto mb-6" />
                <h2 className="text-3xl font-bold text-red-700 dark:text-red-400 mb-4">
                  Life Emergency
                </h2>
                <div className="text-6xl font-bold text-red-600 dark:text-red-400 mb-4">
                  911
                </div>
                <p className="text-muted-foreground">
                  Immediate life-threatening emergencies
                </p>
              </div>
            </Card>

            <Card className="p-8 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 dark:from-blue-950/30 dark:to-blue-900/30">
              <div className="text-center">
                <Heart className="w-20 h-20 text-blue-500 mx-auto mb-6" />
                <h2 className="text-3xl font-bold text-blue-700 dark:text-blue-400 mb-4">
                  Crisis Support
                </h2>
                <div className="text-6xl font-bold text-blue-600 dark:text-blue-400 mb-4">
                  988
                </div>
                <p className="text-muted-foreground">
                  24/7 suicide prevention lifeline
                </p>
              </div>
            </Card>

            <Card className="p-8 bg-gradient-to-br from-green-50 to-green-100 border-green-200 dark:from-green-950/30 dark:to-green-900/30">
              <div className="text-center">
                <Shield className="w-20 h-20 text-green-500 mx-auto mb-6" />
                <h2 className="text-3xl font-bold text-green-700 dark:text-green-400 mb-4">
                  SAMHSA Helpline
                </h2>
                <div className="text-4xl font-bold text-green-600 dark:text-green-400 mb-4">
                  1-800-662-4357
                </div>
                <p className="text-muted-foreground">
                  Treatment referral and information
                </p>
              </div>
            </Card>
          </div>

          {/* Overdose Recognition Section */}
          <Card id="overdose-recognition" className="p-12 mb-16 bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20">
            <div className="text-center mb-12">
              <AlertTriangle className="w-20 h-20 text-orange-500 mx-auto mb-6" />
              <h2 className="text-4xl font-bold mb-6">Recognizing an Opioid Overdose</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Knowledge can save lives. Learn the critical signs and how to respond.
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-red-600 mb-6 flex items-center">
                  <AlertTriangle className="w-8 h-8 mr-3" />
                  Warning Signs
                </h3>
                <div className="space-y-4">
                  {[
                    { title: "Unresponsiveness", desc: "Person doesn't wake up when shaken or shouted at" },
                    { title: "Breathing problems", desc: "Slow, shallow, or no breathing" },
                    { title: "Blue/gray coloring", desc: "Lips, fingertips, or face turn blue or gray" },
                    { title: "Pinpoint pupils", desc: "Pupils shrink to very small size" }
                  ].map((sign, index) => (
                    <Card key={index} className="p-4 bg-white/80 border-red-200">
                      <div className="flex items-start gap-4">
                        <div className="w-3 h-3 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                        <div>
                          <div className="font-semibold text-red-700">{sign.title}</div>
                          <div className="text-sm text-muted-foreground">{sign.desc}</div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
              
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-green-600 mb-6 flex items-center">
                  <Stethoscope className="w-8 h-8 mr-3" />
                  What to Do
                </h3>
                <div className="space-y-4">
                  {[
                    "Call 911 immediately - Time is critical",
                    "Administer Naloxone (Narcan) if available",
                    "Perform rescue breathing if trained",
                    "Place in recovery position on their side",
                    "Stay with them until help arrives",
                    "Be prepared to perform CPR if needed"
                  ].map((step, index) => (
                    <Card key={index} className="p-4 bg-white/80 border-green-200">
                      <div className="flex items-start gap-4">
                        <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                          {index + 1}
                        </div>
                        <div className="font-medium text-green-700">{step}</div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </Card>

          {/* Naloxone Information */}
          <Card id="naloxone-info" className="p-12 mb-16 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200 dark:from-green-950/20 dark:to-emerald-950/20">
            <div className="text-center mb-12">
              <Shield className="w-20 h-20 text-green-500 mx-auto mb-6" />
              <h2 className="text-4xl font-bold text-green-700 dark:text-green-400 mb-6">
                Naloxone (Narcan) Saves Lives
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                A life-saving medication that can reverse an opioid overdose
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { 
                  title: "What is it?", 
                  desc: "A life-saving medication that can reverse an opioid overdose",
                  icon: Heart
                },
                { 
                  title: "How to get it?", 
                  desc: "Available at pharmacies, community centers, and health departments",
                  icon: MapPin
                },
                { 
                  title: "How to use it?", 
                  desc: "Simple nasal spray - no medical training required",
                  icon: Users
                }
              ].map((item, index) => (
                <Card key={index} className="p-8 text-center bg-white/80">
                  <item.icon className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-4 text-green-700">{item.title}</h3>
                  <p className="text-muted-foreground">{item.desc}</p>
                </Card>
              ))}
            </div>
          </Card>

          {/* Crisis Resources */}
          <div id="crisis-hotlines" className="space-y-8 mb-16">
            <Card className="p-8 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-950/20 dark:to-blue-950/20">
              <div className="flex items-center mb-8">
                <Heart className="w-12 h-12 text-purple-500 mr-4" />
                <h3 className="text-3xl font-bold">24/7 Crisis Hotlines & Support</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="p-4 bg-white/90 rounded-lg shadow-sm">
                  <div className="font-bold text-lg text-purple-700">988 Suicide & Crisis Lifeline</div>
                  <div className="text-2xl font-bold text-purple-600">988</div>
                  <div className="text-sm text-muted-foreground">24/7 suicide prevention & mental health crisis</div>
                </div>
                <div className="p-4 bg-white/90 rounded-lg shadow-sm">
                  <div className="font-bold text-lg text-purple-700">Crisis Text Line</div>
                  <div className="text-xl font-bold text-purple-600">Text HOME to 741741</div>
                  <div className="text-sm text-muted-foreground">Free, 24/7 crisis support via text</div>
                </div>
                <div className="p-4 bg-white/90 rounded-lg shadow-sm">
                  <div className="font-bold text-lg text-purple-700">SAMHSA Helpline</div>
                  <div className="text-xl font-bold text-purple-600">1-800-662-4357</div>
                  <div className="text-sm text-muted-foreground">Treatment referral & information</div>
                </div>
                <div className="p-4 bg-white/90 rounded-lg shadow-sm">
                  <div className="font-bold text-lg text-purple-700">Trevor Project (LGBTQ+)</div>
                  <div className="text-xl font-bold text-purple-600">1-866-488-7386</div>
                  <div className="text-sm text-muted-foreground">LGBTQ+ crisis support & suicide prevention</div>
                </div>
                <div className="p-4 bg-white/90 rounded-lg shadow-sm">
                  <div className="font-bold text-lg text-purple-700">Trans Lifeline</div>
                  <div className="text-xl font-bold text-purple-600">877-565-8860</div>
                  <div className="text-sm text-muted-foreground">Transgender crisis support hotline</div>
                </div>
                <div className="p-4 bg-white/90 rounded-lg shadow-sm">
                  <div className="font-bold text-lg text-purple-700">Poison Control</div>
                  <div className="text-xl font-bold text-purple-600">1-800-222-1222</div>
                  <div className="text-sm text-muted-foreground">24/7 poison emergency assistance</div>
                </div>
                <div className="p-4 bg-white/90 rounded-lg shadow-sm">
                  <div className="font-bold text-lg text-purple-700">Veterans Crisis Line</div>
                  <div className="text-xl font-bold text-purple-600">1-800-273-8255</div>
                  <div className="text-sm text-muted-foreground">Support for veterans in crisis</div>
                </div>
                <div className="p-4 bg-white/90 rounded-lg shadow-sm">
                  <div className="font-bold text-lg text-purple-700">National Domestic Violence</div>
                  <div className="text-xl font-bold text-purple-600">1-800-799-7233</div>
                  <div className="text-sm text-muted-foreground">24/7 domestic violence support</div>
                </div>
                <div className="p-4 bg-white/90 rounded-lg shadow-sm">
                  <div className="font-bold text-lg text-purple-700">RAINN Sexual Assault</div>
                  <div className="text-xl font-bold text-purple-600">1-800-656-4673</div>
                  <div className="text-sm text-muted-foreground">Sexual assault crisis support</div>
                </div>
              </div>
            </Card>

            <Card className="p-8 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/20 dark:to-teal-950/20">
              <div className="flex items-center mb-8">
                <Users className="w-12 h-12 text-emerald-500 mr-4" />
                <h3 className="text-3xl font-bold">Mental Health Crisis Support</h3>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <h4 className="font-bold text-xl mb-4 text-emerald-700 flex items-center">
                      <AlertTriangle className="w-6 h-6 mr-2" />
                      Warning Signs of Crisis
                    </h4>
                    <div className="grid grid-cols-1 gap-3">
                      {[
                        "Talking about wanting to die or hurt themselves",
                        "Feeling hopeless or having no purpose",
                        "Feeling trapped or in unbearable pain",
                        "Extreme mood swings or sudden calmness",
                        "Withdrawing from friends and family",
                        "Giving away possessions or saying goodbye",
                        "Increased use of alcohol or drugs",
                        "Looking for ways to kill themselves"
                      ].map((sign, index) => (
                        <div key={index} className="flex items-start gap-3 p-3 bg-white/80 rounded-lg">
                          <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-sm font-medium">{sign}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="font-bold text-xl mb-4 text-emerald-700 flex items-center">
                      <Heart className="w-6 h-6 mr-2" />
                      How to Help Someone in Crisis
                    </h4>
                    <div className="space-y-3">
                      {[
                        { step: "Listen without judgment", desc: "Let them know you care and are there to help" },
                        { step: "Ask directly about suicide", desc: "Don't be afraid to ask if they're thinking of hurting themselves" },
                        { step: "Stay with them", desc: "Don't leave someone in crisis alone" },
                        { step: "Remove means of harm", desc: "Remove weapons, pills, or other dangerous items" },
                        { step: "Call for help", desc: "Contact 988 or emergency services immediately" },
                        { step: "Follow up", desc: "Check on them regularly after the crisis passes" }
                      ].map((item, index) => (
                        <Card key={index} className="p-4 bg-white/90 border-emerald-200">
                          <div className="flex items-start gap-4">
                            <div className="w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                              {index + 1}
                            </div>
                            <div>
                              <div className="font-semibold text-emerald-700">{item.step}</div>
                              <div className="text-sm text-muted-foreground mt-1">{item.desc}</div>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 p-6 bg-gradient-to-r from-emerald-100 to-teal-100 dark:from-emerald-900/30 dark:to-teal-900/30 rounded-lg">
                <div className="text-center">
                  <h4 className="font-bold text-xl mb-3 text-emerald-700">Remember: Crisis is Temporary</h4>
                  <p className="text-muted-foreground mb-4">
                    Mental health crises are temporary and treatable. With the right support, people can and do recover.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Button 
                      className="bg-emerald-600 hover:bg-emerald-700 text-white"
                      onClick={() => window.location.href = 'tel:988'}
                    >
                      <Phone className="w-4 h-4 mr-2" />
                      Call 988 Now
                    </Button>
                    <Button 
                      variant="outline"
                      className="border-emerald-300 text-emerald-700 hover:bg-emerald-50"
                      onClick={() => window.open('sms:741741?body=HOME', '_blank')}
                    >
                      <Heart className="w-4 h-4 mr-2" />
                      Text Crisis Line
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Action Section */}
          <Card className="p-12 text-center bg-gradient-to-r from-primary/10 to-orange-500/10">
            <h2 className="text-3xl font-bold mb-8">Remember: You're Not Alone</h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Help is available 24/7. Taking action in an emergency can save a life.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-red-500 via-red-600 to-red-500 bg-[length:200%_100%] hover:from-red-600 hover:to-red-700 text-white shadow-lg hover:shadow-xl hover:shadow-red-500/30 hover:scale-[1.02] transition-all duration-300 animate-gradient-slide hover:animate-none"
                onClick={() => window.location.href = 'tel:988'}
              >
                <Phone className="w-5 h-5 mr-2" />
                Get Immediate Help
              </Button>
              <Link to="/resources">
                <Button size="lg" variant="outline" className="hover:scale-[1.02] transition-all duration-300">
                  <MapPin className="w-5 h-5 mr-2" />
                  Find Local Resources
                </Button>
              </Link>
              <Link to="/treatment-centers">
                <Button size="lg" variant="outline" className="hover:scale-[1.02] transition-all duration-300">
                  <Stethoscope className="w-5 h-5 mr-2" />
                  Treatment Centers
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Emergency;