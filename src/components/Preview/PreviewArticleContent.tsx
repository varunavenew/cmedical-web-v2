"use client";

import { useParams } from "next/navigation";
import type { SanityDocument } from "@sanity/client";
import { useLiveQuery } from "@sanity/preview-kit";
import { articlePageQuery } from "@/sanity/lib/queries";
import { FC } from "react";
import ArticleContent from "../Article/ArticleContent";

interface Props {
  data: SanityDocument<ArticlePage>;
}

const PreviewArticleContent: FC<Props> = ({ data: defaultData }) => {
  const params = useParams<{ language: string }>();
  const [data] = useLiveQuery(defaultData, articlePageQuery, {
    id: defaultData._id,
    language: params.language,
  });

  return <ArticleContent data={data} />;
};

export default PreviewArticleContent;
