"use client";

import type { SanityDocument } from "@sanity/client";
import { useLiveQuery } from "@sanity/preview-kit";
import { teamPageQuery } from "@/sanity/lib/queries";
import { FC } from "react";
import TeamContent from "../Team/TeamContent";
import { useParams } from "next/navigation";

interface Props {
  data: SanityDocument<TeamPage>;
}

const PreviewTeamContent: FC<Props> = ({ data: defaultData }) => {
  const params = useParams<ParamsType>();
  const [data] = useLiveQuery(defaultData, teamPageQuery, {
    id: defaultData._id,
    language: params.language,
  });

  return <TeamContent data={data} language={params.language} />;
};

export default PreviewTeamContent;
