import { PortableTextMarkComponent } from "@portabletext/react";
import { ReactNode } from "react";
import { PortableTextMarker, TypedObject } from "sanity";

export const LinkMarkComponent: PortableTextMarkComponent<{
  _type: string;
  notBlank: boolean;
  href: string;
  children: ReactNode;
}> = ({ value, children }) => {
  if (!value) return null;
  const { notBlank, href } = value;
  return notBlank ? (
    <a href={href}>{children}</a>
  ) : (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
};
