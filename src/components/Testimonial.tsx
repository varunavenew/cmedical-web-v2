import { FC } from "react";
import { ValuePropositionComponent } from "./ValueProposition";

export const Testimonial: FC<Testimonial> = ({ age, name, text, title }) => (
  <ValuePropositionComponent
    className="bg-white aspect-square md:aspect-video"
    valueProposition1={name}
    valueProposition2={age}
    socialProof={title}
  >
    <div className="prose">
      <p>{text}</p>
    </div>
  </ValuePropositionComponent>
);
