"use client";
import Link from "next/link";
import { FC } from "react";

export const SpecialistList: FC<{
  links: SpecilistsInClinic[];
  baseUrl: string;
  onMouseEnter?: (specialist: Pick<SpecilistsInClinic, "primaryImage">) => void;
  onMouseLeave?: () => void;
}> = ({ links, baseUrl, onMouseEnter, onMouseLeave }) => {
  return (
    <ul className="w-full" onMouseLeave={() => onMouseLeave?.()}>
      {links.map((link) => (
        <li
          key={link._id}
          className="border-t-half border-black/10 last:border-b-half"
        >
          <Link
            href={`${baseUrl}/${link.slug}`}
            className="p-25 md:px-50 flex justify-between items-start hover:bg-black/2 focus-visible:bg-black/2"
            onMouseEnter={() => onMouseEnter?.(link)}
          >
            <div className="flex flex-col md:flex-row md:gap-15">
              {link.name}
              <span className="text-off-black text-opacity-40 md:block">
                {link.valueProposition.valueProposition1}
              </span>
            </div>

            <span>&rsaquo;</span>
          </Link>
        </li>
      ))}
    </ul>
  );
};
