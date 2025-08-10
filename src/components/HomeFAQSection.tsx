import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { MessageCircle, ArrowRight } from "lucide-react";

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
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <MessageCircle className="h-10 w-10 text-primary mr-3" />
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Frequently Asked Questions
            </h2>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Get answers to common questions about addiction recovery and treatment options.
          </p>
        </div>

        <div className="mb-8">
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

        <div className="text-center">
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
            <Link to="/faq">
              View All FAQs
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HomeFAQSection;