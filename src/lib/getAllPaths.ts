import { client } from "@/sanity/lib/client";
import { allPagePathsQuery } from "@/sanity/lib/queries";

export const getAllPaths = () =>
  client.withConfig({ useCdn: true }).fetch<PathQuery[]>(
    allPagePathsQuery,
    {},
    {
      next: {
        tags: [
          "homePage",
          "articlePage",
          "categoryPage",
          "treatmentPage",
          "specialistPage",
          "specialistListPage",
          "teamPage",
          "clinicPage",
          "clinicListPage",
        ],
      },
    }
  );
