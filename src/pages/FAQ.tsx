import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Phone, MessageCircle, Heart, Users, Shield, Clock } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";

const FAQ = () => {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "about": {
      "@type": "Organization",
      "name": "Genius Recovery",
      "description": "Leading addiction recovery support organization providing crisis intervention and treatment resources"
    },
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is addiction recovery?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Addiction recovery is the process of overcoming substance use disorders through treatment, support, and lifestyle changes. It involves addressing both the physical dependence and underlying psychological factors that contribute to addiction."
        }
      },
      {
        "@type": "Question",
        "name": "How do I know if I need addiction treatment?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Signs you may need treatment include: inability to control substance use, continued use despite negative consequences, withdrawal symptoms, neglecting responsibilities, and failed attempts to quit on your own."
        }
      },
      {
        "@type": "Question",
        "name": "What types of addiction treatment are available?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Treatment options include detoxification, inpatient rehabilitation, outpatient programs, counseling, medication-assisted treatment, support groups, and aftercare planning."
        }
      },
      {
        "@type": "Question",
        "name": "Is addiction treatment covered by insurance?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Many insurance plans cover addiction treatment under mental health and substance abuse benefits. Coverage varies by plan, so it's important to verify benefits with your insurance provider."
        }
      },
      {
        "@type": "Question",
        "name": "What is a crisis hotline and when should I call?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Crisis hotlines provide immediate support for mental health emergencies. Call 988 (Suicide & Crisis Lifeline) or SAMHSA (1-800-662-4357) if you're experiencing suicidal thoughts, severe withdrawal, or need immediate support."
        }
      },
      {
        "@type": "Question",
        "name": "How long does addiction recovery take?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Recovery is a lifelong journey. Initial treatment programs typically last 30-90 days, but ongoing support and maintenance are essential for long-term success."
        }
      },
      {
        "@type": "Question",
        "name": "What is Genius Recovery?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Genius Recovery is a comprehensive platform providing resources, support, and connections to treatment for individuals struggling with addiction and their families."
        }
      },
      {
        "@type": "Question",
        "name": "How can I support a loved one in recovery?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Support your loved one by learning about addiction, attending family therapy, setting healthy boundaries, avoiding enabling behaviors, and taking care of your own mental health."
        }
      },
      {
        "@type": "Question",
        "name": "What should I expect during detox?",
        "acceptedAnswer": {
          "@type": "Answer", 
          "text": "Detox is the process of safely removing substances from your body. Medical detox provides 24/7 monitoring and medication to manage withdrawal symptoms safely."
        }
      },
      {
        "@type": "Question",
        "name": "Is relapse normal during recovery?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Relapse is common and doesn't mean failure. Studies show 40-60% of people experience relapse, but it can provide valuable insights for adjusting treatment."
        }
      }
    ]
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      faqSchema,
      {
        "@type": "Organization",
        "name": "Genius Recovery", 
        "description": "Leading addiction recovery organization providing 24/7 crisis support, treatment referrals, and comprehensive recovery resources",
        "url": "https://geniusrecovery.org",
        "logo": "https://geniusrecovery.org/genius-recovery-logo.png",
        "foundingDate": "2023",
        "areaServed": "United States",
        "serviceType": [
          "Addiction Recovery Support",
          "Crisis Intervention",
          "Treatment Referrals", 
          "Educational Resources",
          "24/7 AI Support"
        ],
        "knowsAbout": [
          "Substance Use Disorders",
          "Addiction Treatment",
          "Mental Health",
          "Crisis Support",
          "Recovery Programs"
        ],
        "contactPoint": [
          {
            "@type": "ContactPoint",
            "telephone": "988",
            "contactType": "Crisis Support"
          },
          {
            "@type": "ContactPoint",
            "telephone": "1-800-662-4357", 
            "contactType": "Substance Abuse Support"
          }
        ]
      }
    ]
  };

  const faqData = [
    {
      question: "What is addiction recovery?",
      answer: "Addiction recovery is the process of overcoming substance use disorders through treatment, support, and lifestyle changes. It involves addressing both the physical dependence and underlying psychological factors that contribute to addiction. Recovery is a personal journey that looks different for everyone and often includes multiple stages of treatment and ongoing support."
    },
    {
      question: "How do I know if I need addiction treatment?",
      answer: "Signs you may need treatment include: inability to control substance use, continued use despite negative consequences, withdrawal symptoms when not using, neglecting work or family responsibilities, relationship problems caused by substance use, and failed attempts to quit on your own. If you're questioning whether you need help, it's worth speaking with a professional."
    },
    {
      question: "What types of addiction treatment are available?",
      answer: "Treatment options include: detoxification (medical withdrawal management), inpatient rehabilitation (24/7 care), outpatient programs (flexible scheduling), individual and group counseling, medication-assisted treatment (MAT), 12-step programs, SMART Recovery, family therapy, and aftercare planning. The best approach depends on your specific needs and circumstances."
    },
    {
      question: "Is addiction treatment covered by insurance?",
      answer: "Many insurance plans cover addiction treatment under mental health and substance abuse benefits, thanks to the Mental Health Parity and Addiction Equity Act. Coverage varies by plan and may include detox, inpatient care, outpatient therapy, and medications. Contact your insurance provider to verify your specific benefits and any pre-authorization requirements."
    },
    {
      question: "What is a crisis hotline and when should I call?",
      answer: "Crisis hotlines provide immediate, confidential support for mental health emergencies. Call 988 (Suicide & Crisis Lifeline) if you're experiencing suicidal thoughts, or SAMHSA's National Helpline (1-800-662-4357) for substance abuse crises. These services are available 24/7 and can provide immediate support, resources, and referrals to local treatment."
    },
    {
      question: "How long does addiction recovery take?",
      answer: "Recovery is a lifelong journey rather than a destination. Initial treatment programs typically last 30-90 days, but many people benefit from longer-term care. The first year is often the most challenging, but with proper support, the risk of relapse decreases over time. Ongoing support through counseling, support groups, or aftercare programs is essential for long-term success."
    },
    {
      question: "What is Genius Recovery?",
      answer: "Genius Recovery is a comprehensive platform dedicated to supporting individuals and families affected by addiction. We provide educational resources, crisis support connections, treatment center referrals, and a supportive community. Our mission is to bridge the gap between those seeking help and the resources they need for successful recovery."
    },
    {
      question: "How can I support a loved one in recovery?",
      answer: "Supporting a loved one includes: educating yourself about addiction, attending family therapy or Al-Anon meetings, setting healthy boundaries, avoiding enabling behaviors, celebrating milestones, being patient with the recovery process, and taking care of your own mental health. Remember that you can't control their recovery, but you can provide a supportive environment."
    },
    {
      question: "What should I expect during detox?",
      answer: "Detox is the process of safely removing substances from your body. Withdrawal symptoms vary by substance but may include anxiety, depression, nausea, sweating, and cravings. Medical detox provides 24/7 monitoring and medication to manage symptoms safely. Detox typically lasts 3-7 days but can vary based on the substance and individual factors."
    },
    {
      question: "Is it normal to relapse during recovery?",
      answer: "Relapse is common and doesn't mean failure. Studies show that 40-60% of people in recovery experience at least one relapse. It's often part of the learning process and can provide valuable insights for adjusting treatment approaches. The key is to view relapse as a temporary setback and quickly re-engage with treatment and support systems."
    },
    {
      question: "What is medication-assisted treatment (MAT)?",
      answer: "MAT combines FDA-approved medications with counseling and behavioral therapies to treat substance use disorders. Common medications include methadone, buprenorphine, and naltrexone for opioid addiction, and naltrexone or acamprosate for alcohol addiction. MAT has been shown to improve treatment outcomes and reduce the risk of overdose."
    },
    {
      question: "How do I choose the right treatment program?",
      answer: "Consider factors like: the severity of your addiction, your support system, work/family obligations, insurance coverage, location preferences, and any co-occurring mental health conditions. Speak with addiction professionals who can assess your needs and recommend appropriate treatment levels and settings."
    },
    {
      question: "What happens after completing treatment?",
      answer: "Aftercare is crucial for maintaining sobriety. This may include: ongoing counseling, support group participation, sober living arrangements, regular check-ins with healthcare providers, lifestyle changes, and developing healthy coping strategies. Many people benefit from step-down levels of care as they transition back to daily life."
    },
    {
      question: "How can I access treatment if I can't afford it?",
      answer: "Options for affordable treatment include: sliding-scale payment programs, state-funded treatment centers, nonprofit organizations, SAMHSA's treatment locator for low-cost options, Medicaid coverage, and scholarship programs offered by some treatment centers. Don't let financial concerns prevent you from seeking help."
    },
    {
      question: "What role does family play in recovery?",
      answer: "Family support is crucial for successful recovery. Addiction affects the entire family system, and healing often involves everyone. Family therapy can help improve communication, set healthy boundaries, address enabling behaviors, and create a supportive home environment. Family members may also benefit from their own counseling or support groups."
    },
    {
      question: "How do I handle triggers and cravings?",
      answer: "Effective strategies include: identifying your specific triggers, developing healthy coping mechanisms, practicing mindfulness and stress management, having a support network to call, removing triggers from your environment when possible, and having a relapse prevention plan. Professional counseling can help you develop personalized strategies."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <SEOHead 
        title="FAQ - Frequently Asked Questions | Genius Recovery"
        description="Find answers to frequently asked questions about addiction recovery, treatment options, crisis support, and Genius Recovery services. Get the help you need today."
        keywords="FAQ, addiction recovery, treatment questions, crisis support, recovery help, Genius Recovery"
        structuredData={structuredData}
        canonicalUrl="https://geniusrecovery.org/faq"
      />
      <Header />
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center mb-6">
            <MessageCircle className="h-12 w-12 text-primary mr-4" />
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">
              Frequently Asked Questions
            </h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Find answers to common questions about addiction recovery, treatment options, and how Genius Recovery can help you or your loved one on the journey to wellness.
          </p>
          
          {/* Quick Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button asChild size="lg" className="bg-red-600 hover:bg-red-700 text-white">
              <Link to="/emergency">
                <Phone className="mr-2 h-5 w-5" />
                Emergency Help
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/resources">
                <Heart className="mr-2 h-5 w-5" />
                Find Resources
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqData.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border border-border rounded-lg">
                <AccordionTrigger className="px-6 py-4 text-left hover:no-underline hover:bg-muted/50 rounded-t-lg [&[data-state=open]]:rounded-b-none">
                  <span className="text-lg font-semibold text-foreground">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 text-muted-foreground leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Additional Resources */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">
            Still Have Questions?
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <Phone className="h-12 w-12 text-red-600 mx-auto mb-4" />
                <CardTitle>Crisis Support</CardTitle>
                <CardDescription>24/7 immediate help available</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="font-semibold">988 Suicide & Crisis Lifeline</p>
                  <p className="text-sm text-muted-foreground">Call or text 988</p>
                  <p className="font-semibold">SAMHSA National Helpline</p>
                  <p className="text-sm text-muted-foreground">1-800-662-4357</p>
                </div>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Users className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>Contact Us</CardTitle>
                <CardDescription>Get personalized assistance</CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild className="w-full">
                  <Link to="/contact">Contact Our Team</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Clock className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>Resources</CardTitle>
                <CardDescription>Comprehensive recovery information</CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild variant="outline" className="w-full">
                  <Link to="/resources">Browse Resources</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Ready to Start Your Recovery Journey?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Don't wait for tomorrow. Help is available right now, and recovery is possible.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link to="/resources">
                <Heart className="mr-2 h-5 w-5" />
                Find Treatment
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/support">
                <Shield className="mr-2 h-5 w-5" />
                Get Support
              </Link>
            </Button>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default FAQ;