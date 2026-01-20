import type { PortableText } from "@portabletext/react";
import { ComponentProps, FC } from "react";
import { SubTopicItem } from "./SubTopicItem";
import { PortableTextComponent } from "./PortableText/PortableTextComponent";

interface Props {
  name?: string;
  subTopics: SubTopic[];
  components?: ComponentProps<typeof PortableText>["components"];
}

export const SubTopicsList: FC<Props> = ({ name, subTopics, components }) =>
  subTopics.map(
    (subTopic) =>
      subTopic.title &&
      subTopic.description && (
        <SubTopicItem name={name} title={subTopic.title} key={subTopic.title}>
          <div className="prose mx-auto">
            <PortableTextComponent
              value={subTopic.description}
              rootHeadingLevel={2}
              components={components}
            />
          </div>
        </SubTopicItem>
      )
  );
