import { uniqBy } from "lodash";
export const removeDuplicateCategories = (
  treatmentCategories: {
    slug: string;
    title: string;
  }[]
) => uniqBy(treatmentCategories, (c) => c.slug);
