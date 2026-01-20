import { FC } from "react";
import { PortableTextComponent } from "./PortableText/PortableTextComponent";
import { SubTopicsList } from "./SubTopicsList";

export const SubTopicsSection: FC<
  SubTopicsWithIntro & { className?: string }
> = ({ title, ingress, subTopics, className }) => (
  <div className={className}>
    <h2 className="h-80 md:h-100 p-20 text-center flex items-center justify-center">
      {title}
    </h2>
    <div className="prose px-50 py-100 max-w-[33em] mx-auto">
      <PortableTextComponent value={ingress} rootHeadingLevel={2} />
    </div>
    {subTopics && <SubTopicsList name={title} subTopics={subTopics} />}
  </div>
);
