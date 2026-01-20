"use client";

import { useParams } from "next/navigation";
import type { SanityDocument } from "@sanity/client";
import { useLiveQuery } from "@sanity/preview-kit";
import { homePageQuery } from "@/sanity/lib/queries";
import HomeContent from "../HomeContent";
import { FC } from "react";

interface Props {
  data: SanityDocument<HomePage>;
}

const PreviewHomeContent: FC<Props> = ({ data: defaultData }) => {
  const params = useParams();
  const [data] = useLiveQuery(defaultData, homePageQuery, {
    id: defaultData._id,
    language: params.language,
  });

  return <HomeContent data={data} />;
};

export default PreviewHomeContent;
