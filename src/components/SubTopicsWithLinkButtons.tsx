import { PortableText } from "@portabletext/react";
import Link from "next/link";
import { FC } from "react";
import { Pill } from "./Pill";
import { SubTopicItem } from "./SubTopicItem";

export const SubTopicsWithLinkButtons: FC<{
  name?: string;
  category: Pick<CategoryPage, "title" | "slug">;
  list: TreatmentsInClinic[];
  language: string;
}> = ({ name, category, list, language }) => (
  <SubTopicItem name={name} title={category.title}>
    <div className="flex justify-center flex-wrap gap-10">
      {list.map((l) => (
        <Link key={l.slug} href={`/${language}/${category.slug}/${l.slug}`}>
          <Pill text={l.title} bg="bg-white" bgHover="hover:bg-opacity-80" />
        </Link>
      ))}
    </div>
  </SubTopicItem>
);
