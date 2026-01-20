import { SchemaTypeDefinition } from "sanity";
import { LocationSearch } from "../components/LocationSearch";

export const locationSearch: SchemaTypeDefinition = {
  name: "locationSearch",
  type: "object",
  fields: [
    {
      name: "location",
      type: "geopoint",
      description:
        "Search for a location in the map to get the correct coordinates",
      validation: (Rule) => Rule.required(),
      options: { columns: 3 },
      readOnly: true,
    },
    {
      name: "placeId",
      type: "string",
      description: "Search for a location in the map to get the Place ID",
      validation: (Rule) => Rule.required(),
      readOnly: true,
    },
  ],
  components: {
    input: LocationSearch,
  },
  options: { collapsible: true },
};
