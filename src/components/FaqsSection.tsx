"use client";
import { ArrowRight, Plus, Minus } from "lucide-react";
import { useState, FC } from "react";
import { PortableTextComponent } from "./PortableText/PortableTextComponent";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

interface FaqsSectionProps {
  faq?: {
    title?: string;
    ingress?: import("sanity").PortableTextBlock[];
    subTopics?: Array<{
      title?: string;
      description?: import("sanity").PortableTextBlock[];
    }>;
  };
  language?: string;
}

export const FaqsSection: FC<FaqsSectionProps> = ({ faq, language = "no" }) => {
  const router = useRouter();
  const [openFaq, setOpenFaq] = useState<string | null>(null);

  const toggleFaq = (id: string) => {
    setOpenFaq(openFaq === id ? null : id);
  };

  // If no FAQ data, don't render the section
  if (!faq || !faq.subTopics || faq.subTopics.length === 0) {
    return null;
  }

  const handleBookingClick = () => {
    const url = new URL(window.location.href);
    url.searchParams.set("book", "true");
    router.push(url.toString());
  };

  return (
    <section id="life-phases" className="py-12 md:py-16 bg-background">
      <div className="container mx-auto px-15 md:px-8">
        {/* Value badges only */}
        <div className="flex flex-wrap justify-center items-center gap-3 md:gap-4">
          <span className="inline-flex items-center gap-7 px-15 py-7 rounded-full bg-secondary/50 text-sm text-foreground/80">
            <span className="w-7 h-7 rounded-full bg-brand-dark" />
            Trygg og moderne behandlingsteknologi
          </span>
          <span className="inline-flex items-center gap-7 px-15 py-7 rounded-full bg-secondary/50 text-sm text-foreground/80">
            <span className="w-7 h-7 rounded-full bg-brand-dark" />
            Behagelige lokaler
          </span>
          <span className="inline-flex items-center gap-7 px-15 py-7 rounded-full bg-secondary/50 text-sm text-foreground/80">
            <span className="w-7 h-7 rounded-full bg-brand-dark" />
            Tilgjengelig pris
          </span>
        </div>

        {/* FAQ Section */}
        <div className="mt-16 md:mt-80 max-w-3xl mx-auto">
          {faq.title && (
            <h3 className="text-xl md:text-2xl font-normal text-foreground text-center mb-8">
              {faq.title}
            </h3>
          )}

          {faq.ingress && faq.ingress.length > 0 && (
            <div className="prose max-w-none mb-8 text-center">
              <PortableTextComponent value={faq.ingress} />
            </div>
          )}

          <div className="space-y-0 border-t border-border">
            {faq.subTopics
              .filter((subTopic) => subTopic.title && subTopic.description)
              .map((subTopic, index) => {
                const faqId = subTopic.title
                  ? subTopic.title.toLowerCase().replace(/\s+/g, "-")
                  : `faq-${index}`;

                return (
                  <div key={faqId} className="border-b border-border">
                    <button
                      onClick={() => toggleFaq(faqId)}
                      className="w-full flex items-center justify-between py-5 text-left hover:text-accent transition-colors"
                    >
                      <span className="text-base md:text-lg font-normal text-foreground">
                        {subTopic.title}
                      </span>
                      {openFaq === faqId ? (
                        <Minus className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                      ) : (
                        <Plus className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                      )}
                    </button>

                    <div
                      className={`overflow-hidden transition-all duration-300 ease-out ${openFaq === faqId ? "max-h-[500px] pb-5" : "max-h-0"
                        }`}
                    >
                      <div className="text-muted-foreground text-sm md:text-base font-light leading-relaxed pr-8">
                        {subTopic.description && (
                          <PortableTextComponent value={subTopic.description} />
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>

        {/* Simple CTA below */}
        <div className="mt-12 md:mt-16 text-center">
          <Button
            onClick={handleBookingClick}
            className="inline-flex items-center gap-7 px-6 py-3 bg-accent text-accent-foreground rounded-full font-normal hover:bg-accent/90 transition-colors"
          >
            Bestill time
            <ArrowRight className="w-15 h-15" />
          </Button>
        </div>
      </div>
    </section>
  );
};
