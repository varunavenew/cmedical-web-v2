import { SchemaTypeDefinition } from "sanity";

export const videoObject: SchemaTypeDefinition = {
  name: "videoObject",
  title: "Video",
  type: "object",
  fields: [
    {
      name: "videoType",
      type: "string",
      title: "Video Type",
      options: {
        list: [
          { title: "File Upload", value: "file" },
          { title: "YouTube URL", value: "youtube" },
        ],
        layout: "radio",
      },
      validation: (Rule) => Rule.required(),
      initialValue: "file",
    },
    {
      name: "videoFile",
      type: "file",
      title: "Video File",
      options: {
        accept: "video/*",
      },
      hidden: ({ parent }) => parent?.videoType !== "file",
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const parent = context.parent as { videoType?: string };
          if (parent?.videoType === "file" && !value) {
            return "Video file is required when video type is 'File Upload'";
          }
          return true;
        }),
    },
    {
      name: "youtubeUrl",
      type: "url",
      title: "YouTube URL",
      hidden: ({ parent }) => parent?.videoType !== "youtube",
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const parent = context.parent as { videoType?: string };
          if (parent?.videoType === "youtube") {
            if (!value) {
              return "YouTube URL is required when video type is 'YouTube URL'";
            }
            if (!/youtube\.com\/watch\/?\?v=[^&]+/.test(value)) {
              return "Please enter a valid YouTube video URL";
            }
          }
          return true;
        }),
    },
    {
      name: "poster",
      type: "image",
      title: "Poster Image",
      description: "Thumbnail image shown before video plays (optional)",
      options: {
        hotspot: true,
      },
    },
    {
      name: "alt",
      type: "internationalizedArrayString",
      title: "Alt Text",
      description: "Description of the video for accessibility",
    },
  ],
  options: {
    collapsible: true,
  },
};












