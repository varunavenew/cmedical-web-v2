"use client";

import type { FC } from "react";
import type { SanityDocument } from "@sanity/client";
import { useParams } from "next/navigation";
import { useLiveQuery } from "@sanity/preview-kit";
import { privacyPolicyPageQuery } from "@/sanity/lib/queries";
import PrivacyPolicyContent from "../PrivacyPolicyContent";

interface Props {
  data: SanityDocument<PrivacyPolicyPage>;
}

const PreviewPrivacyPolicyContent: FC<Props> = ({ data: defaultData }) => {
  const params = useParams();
  const [data] = useLiveQuery(defaultData, privacyPolicyPageQuery, {
    id: defaultData._id,
    language: params.language,
  });

  return <PrivacyPolicyContent data={data} />;
};

export default PreviewPrivacyPolicyContent;
