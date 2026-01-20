import Link from "next/link";
import { FC } from "react";

export const LinkList: FC<{
  links: {
    _id: string;
    title: string;
    slug: string;

    // Override the base URL for this specific link
    baseUrl?: string;
  }[];
  baseUrl: string;
}> = ({ links, baseUrl }) => {
  return (
    <ul className="w-full">
      {links.map((link) => (
        <li
          key={link._id}
          className="border-t-half border-black/10 last:border-b-half"
        >
          <Link
            href={`${link.baseUrl ?? baseUrl}/${link.slug}`}
            className="p-25 md:px-50 flex justify-between items-center hover:bg-black/2 focus-visible:bg-black/2"
          >
            {link.title}
            <span>&rsaquo;</span>
          </Link>
        </li>
      ))}
    </ul>
  );
};
