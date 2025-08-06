import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Phone, AlertTriangle, Heart, Shield, Users, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Emergency = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-950/20 dark:to-orange-950/20">
      <Header />
      
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-6">
              <AlertTriangle className="w-12 h-12 text-red-500 mr-4" />
              <h1 className="text-4xl md:text-6xl font-bold text-foreground">
                Emergency Support
              </h1>
            </div>
            <p className="text-xl text-muted-foreground mb-8">
              Together, We Can Reduce Suffering and Save Lives
            </p>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Thank you for taking the time to learn more about how to handle an emergency. At Genius Recovery, 
              our mission is to help individuals and families facing addiction and other challenges find support, 
              information, and hope. Below you'll find critical information to handle life-threatening emergencies.
            </p>
          </div>

          {/* Emergency Contact */}
          <Card className="p-8 mb-12 bg-red-50 border-red-200 dark:bg-red-950/20">
            <div className="text-center">
              <Phone className="w-16 h-16 text-red-500 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-red-700 dark:text-red-400 mb-4">
                EMERGENCY? CALL NOW
              </h2>
              <div className="text-4xl font-bold text-red-600 dark:text-red-400 mb-4">
                911
              </div>
              <p className="text-muted-foreground">
                For immediate life-threatening emergencies, always call 911 first
              </p>
            </div>
          </Card>

          {/* Crisis Resources */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <Card className="p-6">
              <div className="flex items-center mb-4">
                <Heart className="w-8 h-8 text-primary mr-3" />
                <h3 className="text-2xl font-bold">Crisis Hotlines</h3>
              </div>
              <div className="space-y-4">
                <div>
                  <div className="font-semibold text-lg">National Suicide Prevention Lifeline</div>
                  <div className="text-2xl font-bold text-primary">988</div>
                  <div className="text-sm text-muted-foreground">24/7, free and confidential support</div>
                </div>
                <div>
                  <div className="font-semibold text-lg">Crisis Text Line</div>
                  <div className="text-xl font-bold text-primary">Text HOME to 741741</div>
                  <div className="text-sm text-muted-foreground">Free, 24/7 crisis support via text</div>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center mb-4">
                <Shield className="w-8 h-8 text-primary mr-3" />
                <h3 className="text-2xl font-bold">Overdose Support</h3>
              </div>
              <div className="space-y-4">
                <div>
                  <div className="font-semibold text-lg">SAMHSA National Helpline</div>
                  <div className="text-2xl font-bold text-primary">1-800-662-4357</div>
                  <div className="text-sm text-muted-foreground">Treatment referral and information</div>
                </div>
                <div>
                  <div className="font-semibold text-lg">Poison Control</div>
                  <div className="text-xl font-bold text-primary">1-800-222-1222</div>
                  <div className="text-sm text-muted-foreground">24/7 poison emergency assistance</div>
                </div>
              </div>
            </Card>
          </div>

          {/* Recognizing an Overdose */}
          <Card className="p-8 mb-12">
            <h2 className="text-3xl font-bold mb-8 text-center">Recognizing an Opioid Overdose</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4 text-red-600">Warning Signs:</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                    <span><strong>Unresponsiveness:</strong> Person doesn't wake up when shaken or shouted at</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                    <span><strong>Breathing problems:</strong> Slow, shallow, or no breathing</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                    <span><strong>Blue/gray coloring:</strong> Lips, fingertips, or face turn blue or gray</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                    <span><strong>Pinpoint pupils:</strong> Pupils shrink to very small size</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4 text-green-600">What to Do:</h3>
                <ol className="space-y-3 list-decimal list-inside">
                  <li><strong>Call 911 immediately</strong> - Time is critical</li>
                  <li><strong>Administer Naloxone (Narcan)</strong> if available</li>
                  <li><strong>Perform rescue breathing</strong> if trained</li>
                  <li><strong>Place in recovery position</strong> on their side</li>
                  <li><strong>Stay with them</strong> until help arrives</li>
                  <li><strong>Be prepared to perform CPR</strong> if needed</li>
                </ol>
              </div>
            </div>
          </Card>

          {/* Naloxone Information */}
          <Card className="p-8 mb-12 bg-green-50 border-green-200 dark:bg-green-950/20">
            <div className="text-center mb-8">
              <Shield className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-green-700 dark:text-green-400">
                Naloxone (Narcan) Saves Lives
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <h3 className="text-xl font-semibold mb-3">What is it?</h3>
                <p className="text-muted-foreground">
                  A life-saving medication that can reverse an opioid overdose
                </p>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-semibold mb-3">How to get it?</h3>
                <p className="text-muted-foreground">
                  Available at pharmacies, community centers, and health departments
                </p>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-semibold mb-3">How to use it?</h3>
                <p className="text-muted-foreground">
                  Simple nasal spray - no medical training required
                </p>
              </div>
            </div>
          </Card>

          {/* Mental Health Crisis */}
          <Card className="p-8 mb-12">
            <h2 className="text-3xl font-bold mb-8 text-center">Mental Health Crisis Support</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">Warning Signs:</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Talking about wanting to die or hurt themselves</li>
                  <li>• Feeling hopeless or having no purpose</li>
                  <li>• Feeling trapped or in unbearable pain</li>
                  <li>• Talking about being a burden to others</li>
                  <li>• Increasing use of alcohol or drugs</li>
                  <li>• Withdrawing from activities</li>
                  <li>• Extreme mood swings</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4">How to Help:</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Listen without judgment</li>
                  <li>• Take all threats seriously</li>
                  <li>• Don't leave them alone</li>
                  <li>• Call 988 for guidance</li>
                  <li>• Help them connect with professional support</li>
                  <li>• Follow up regularly</li>
                  <li>• Take care of yourself too</li>
                </ul>
              </div>
            </div>
          </Card>

          {/* Action Buttons */}
          <div className="text-center space-y-4">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <Phone className="w-5 h-5 mr-2" />
                Get Immediate Help
              </Button>
              <Button size="lg" variant="outline">
                <Users className="w-5 h-5 mr-2" />
                Find Local Resources
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">
              Remember: You're not alone. Help is available 24/7.
            </p>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Emergency;