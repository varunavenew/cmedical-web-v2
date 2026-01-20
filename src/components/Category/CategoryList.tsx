import { FC } from "react";
import type { SanityDocument } from "@sanity/client";
import Link from "next/link";
import { Image } from "../Image";
import { Pill } from "../Pill";

interface Props {
  categories: SanityDocument<
    Pick<CategoryPage, "primaryImage" | "title" | "slug" | "language">
  >[];
}

export const CategoryList: FC<Props> = ({ categories }) => {
  return (
    <div className="grid md:flex md:justify-center w-full">
      {categories.map((cat) => (
        <Link
          key={cat._id}
          href={`/${cat.language}/${cat.slug}`}
          className="md:w-1/3 aspect-square w-full h-full bg-black group overflow-hidden relative"
        >
          <Image
            image={cat.primaryImage.image}
            alt={cat.primaryImage.alt}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-slow"
            sizes="(min-width: 768px) 33vw, 100vw"
          />
          <div className="absolute top-0 w-full h-full flex justify-center items-center z-10">
            <Pill
              bg="bg-white"
              bgHover="group-hover:bg-opacity-80"
              text={cat.title}
              span="&rsaquo;"
            />
          </div>
        </Link>
      ))}
    </div>
  );
};
