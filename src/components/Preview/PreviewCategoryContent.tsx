"use client";

import { useParams } from "next/navigation";
import type { SanityDocument } from "@sanity/client";
import { useLiveQuery } from "@sanity/preview-kit";
import { categoryPageQuery } from "@/sanity/lib/queries";
import CategoryContent from "../Category/CategoryContent";
import { FC } from "react";

interface Props {
  data: SanityDocument<CategoryPage>;
}

const PreviewCategoryContent: FC<Props> = ({ data: defaultData }) => {
  const params = useParams<ParamsType>();
  const [data] = useLiveQuery(defaultData, categoryPageQuery, {
    id: defaultData._id,
    language: params.language,
  });

  return <CategoryContent data={data} language={params.language} />;
};

export default PreviewCategoryContent;
