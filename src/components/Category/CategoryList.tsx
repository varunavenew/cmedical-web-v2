"use client";
import { FC } from "react";
import type { SanityDocument } from "@sanity/client";
import Link from "next/link";
import { Image } from "../Image";
import { motion } from "framer-motion";

interface Props {
  categories: SanityDocument<
    Pick<CategoryPage, "primaryImage" | "title" | "slug" | "language">
  >[];
}

export const CategoryList: FC<Props> = ({ categories }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 1.2 }}
      className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4 max-w-5xl mx-auto"
    >
      {categories.map((cat, index) => (
        <motion.div
          key={cat._id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 1.3 + index * 0.08 }}
        >
          <Link
            href={`/${cat.language}/${cat.slug}`}
            className="group relative overflow-hidden rounded-xl aspect-[3/4] block"
          >
            <Image
              image={cat.primaryImage.image}
              alt={cat.primaryImage.alt}
              className="w-full h-full"
              imageClassName="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(min-width: 768px) 20vw, 50vw"
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

            {/* Title at bottom */}
            <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
              <h3 className="text-white text-sm md:text-base font-light">
                {cat.title}
              </h3>
            </div>
          </Link>
        </motion.div>
      ))}
    </motion.div>
  );
};
