"use client";
import { FC, useEffect } from "react";
import { PortableTextComponent } from "./PortableText/PortableTextComponent";
import { SubTopicsList } from "./SubTopicsList";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";

export const SubTopicsSection: FC<
  SubTopicsWithIntro & { className?: string }
> = ({ title, ingress, subTopics, className }) =>{ 
  
  useEffect(()=>{
    console.log('title, ingress, subtopics, :',title, ingress, subTopics);
  })
  
  return(
  <div className={className}>
     <div >
    <h2 className="h-80 md:h-100 p-20 text-center flex items-center justify-center">
      {title}
    </h2>
    <div className="prose px-50 py-100 max-w-[33em] mx-auto">
      <PortableTextComponent value={ingress} rootHeadingLevel={2} />
    </div>
    {subTopics && <SubTopicsList name={title} subTopics={subTopics} />}
  </div>
      <div className="mt-12 md:mt-16 text-center">
          <Button
            onClick={() => navigate('/booking')}
            className="inline-flex items-center gap-7 px-25 py-15 bg-accent text-accent-foreground rounded-full font-normal hover:bg-accent/90 transition-colors"
          >
            Bestill time
            <ArrowRight className="w-15 h-15" />
          </Button>
        </div>
  </div>
 
  
)};
