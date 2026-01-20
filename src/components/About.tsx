import { FC } from "react";
import { PortableTextBlock } from "sanity";
import { PortableTextComponent } from "./PortableText/PortableTextComponent";

interface Props {
  title: string;
  body: PortableTextBlock[];
  valueProposition: ValueProposition;
}

export const About: FC<Props> = ({ title, body, valueProposition }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 place-items-center">
      <h2 className="hidden col-start-2 h-80 md:flex items-center ">{title}</h2>

      <div className="row-start-2 col-start-1 col-span-2 md:col-start-2 md:col-span-1 h-[270px] md:h-[424px] flex items-center p-50 md:p-0">
        <PortableTextComponent value={body} />
      </div>

      <p className="h-80 md:h-100 m-auto row-start-1 md:row-start-3 md:col-start-1 flex items-center">
        {valueProposition.valueProposition1}
      </p>
      <p className="h-80 md:h-100 m-auto row-start-3 md:col-start-2 col-start-1 col-span-2 md:col-span-1 flex items-center">
        {valueProposition.socialProof}
      </p>
      <p className="h-80 md:h-100 m-auto row-start-1 col-start-2 md:row-start-3 md:col-start-3 flex items-center">
        {valueProposition.valueProposition2}
      </p>
    </div>
  );
};
