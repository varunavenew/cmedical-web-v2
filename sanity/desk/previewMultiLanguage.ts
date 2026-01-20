import { PreviewConfig } from "sanity";
import { urlForImage } from "../lib/image";

export const previewMultiLanguage: PreviewConfig<
  Record<string, string>,
  Record<string, any>
> = {
  select: {
    image: "primaryImage.image",
    title: "title",
    slug: "slug",
  },
  prepare: ({ title, slug, image }) => {
    const titleAllLang = (title ?? slug)
      ?.map((item: { value: string | { _type: string; current: string } }) =>
        typeof item.value === "string" ? item.value : item.value.current
      )
      .join(" / ");
    return {
      title: titleAllLang,
      imageUrl: image
        ? urlForImage(image).width(35).height(35).url()
        : undefined,
    };
  },
};
