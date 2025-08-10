import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { MessageCircle, ArrowRight, Sparkles } from "lucide-react";

const HomeFAQSection = () => {
  const faqData = [
    {
      question: "What is addiction recovery?",
      answer: "Addiction recovery is the process of overcoming substance use disorders through treatment, support, and lifestyle changes. It involves addressing both the physical dependence and underlying psychological factors that contribute to addiction."
    },
    {
      question: "How do I know if I need addiction treatment?",
      answer: "Signs you may need treatment include: inability to control substance use, continued use despite negative consequences, withdrawal symptoms, neglecting responsibilities, and failed attempts to quit on your own."
    },
    {
      question: "What types of addiction treatment are available?",
      answer: "Treatment options include detoxification, inpatient rehabilitation, outpatient programs, counseling, medication-assisted treatment, support groups, and aftercare planning. The best approach depends on your specific needs."
    },
    {
      question: "Is addiction treatment covered by insurance?",
      answer: "Many insurance plans cover addiction treatment under mental health and substance abuse benefits. Coverage varies by plan, so it's important to verify benefits with your insurance provider."
    },
    {
      question: "What is a crisis hotline and when should I call?",
      answer: "Crisis hotlines provide immediate support for mental health emergencies. Call 988 (Suicide & Crisis Lifeline) or SAMHSA (1-800-662-4357) if you're experiencing suicidal thoughts, severe withdrawal, or need immediate support."
    },
    {
      question: "How can I support a loved one in recovery?",
      answer: "Support your loved one by learning about addiction, attending family therapy, setting healthy boundaries, avoiding enabling behaviors, and taking care of your own mental health."
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-muted/30 via-background to-muted/20 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,hsl(var(--primary)/0.1),transparent_50%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,hsl(var(--accent)/0.1),transparent_50%)] pointer-events-none" />
      
      <div className="max-w-4xl mx-auto relative">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <div className="relative">
              <MessageCircle className="h-12 w-12 text-primary mr-4 animate-pulse" />
              <Sparkles className="h-4 w-4 text-accent absolute -top-1 -right-1 animate-pulse delay-300" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
              Frequently Asked Questions
            </h2>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Get answers to common questions about addiction recovery and treatment options.
          </p>
        </div>

        <div className="mb-12">
          <Accordion type="single" collapsible className="w-full space-y-6">
            {faqData.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`} 
                className="border border-border/60 rounded-xl bg-card/50 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:border-primary/30 group"
              >
                <AccordionTrigger className="px-8 py-6 text-left hover:no-underline hover:bg-gradient-to-r hover:from-muted/50 hover:to-primary/5 rounded-t-xl [&[data-state=open]]:rounded-b-none transition-all duration-300 group-hover:scale-[1.02]">
                  <span className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors duration-300">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="px-8 pb-6 text-muted-foreground leading-relaxed text-base">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="text-center">
          <Button 
            asChild 
            size="lg" 
            className="bg-gradient-to-r from-primary via-primary to-primary/90 hover:from-primary/90 hover:via-primary hover:to-primary text-primary-foreground font-semibold px-8 py-6 rounded-xl shadow-lg hover:shadow-xl hover:shadow-primary/25 transition-all duration-300 hover:scale-105 hover:-translate-y-1 group relative overflow-hidden"
          >
            <Link to="/faq" className="flex items-center relative z-10">
              <span className="mr-3">View All FAQs</span>
              <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-out" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HomeFAQSection;