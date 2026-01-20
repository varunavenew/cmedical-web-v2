import { SchemaTypeDefinition } from "sanity";
import { VideoIcon } from "../components/icons";

export const youtubeEmbed: SchemaTypeDefinition = {
  name: "youtubeEmbed",
  type: "object",
  fields: [
    {
      name: "url",
      type: "url",
      validation: (Rule) => [
        Rule.required(),
        Rule.uri({
          scheme: ["https"],
          allowRelative: false,
          allowCredentials: false,
        }),
        Rule.regex(/youtube\.com\/watch\/?\?v=[^&]+/).error(
          "Please enter a complete YouTube video URL"
        ),
      ],
    },
  ],
  icon: <VideoIcon />,
};
