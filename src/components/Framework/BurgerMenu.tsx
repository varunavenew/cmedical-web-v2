"use client";
import { FC, useState, useEffect } from "react";
import Link from "next/link";
import { Menu as MenuIcon, X } from "lucide-react";
import type { SanityDocument } from "@sanity/client";

interface BurgerMenuProps {
    categories: Array<
        SanityDocument<
            Pick<CategoryPage, "title" | "slug" | "language" | "about">
        >
    >;
    clinics: Pick<ClinicListPage, "menuTitle" | "slug">;
    specialists: Pick<SpecialistListPage, "menuTitle" | "slug">;
    language: string;
}

export const BurgerMenu: FC<BurgerMenuProps> = ({
    categories,
    clinics,
    specialists,
    language,
}) => {
    const [isOpen, setIsOpen] = useState(false);

    // Prevent body scroll when menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
            document.getElementById("app")?.setAttribute("inert", "");
        } else {
            document.body.style.overflow = "";
            document.getElementById("app")?.removeAttribute("inert");
        }

        return () => {
            document.body.style.overflow = "";
            document.getElementById("app")?.removeAttribute("inert");
        };
    }, [isOpen]);

    const closeMenu = () => setIsOpen(false);

    return (
        <>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-full transition-all hover:bg-white/10 text-white md:hidden"
                aria-label="Menu"
                aria-expanded={isOpen}
            >
                {isOpen ? <X className="h-15 w-15" /> : <MenuIcon className="h-15 w-15" />}
            </button>

            {/* Mobile Menu Overlay */}
            {isOpen && (
                <>
                    <div
                        className="fixed inset-0 bg-black/20 backdrop-blur z-40 md:hidden"
                        onClick={closeMenu}
                    />
                    <div className="fixed top-16 left-0 right-0 bottom-0 bg-brand-dark z-50 overflow-y-auto md:hidden">
                        <nav className="container mx-auto px-4 py-8 space-y-4">
                            {/* Categories */}
                            <div>
                                <h3 className="text-white/60 text-xs uppercase tracking-wider mb-3">
                                    Tjenester
                                </h3>
                                <div className="space-y-2">
                                    {categories.map((cat) => (
                                        <Link
                                            key={cat._id}
                                            href={`/${cat.language}/${cat.slug}`}
                                            onClick={closeMenu}
                                            className="block px-4 py-2 text-white hover:bg-white/10 rounded-lg transition-colors"
                                        >
                                            {cat.title}
                                        </Link>
                                    ))}
                                </div>
                            </div>

                            {/* Static Links */}
                            <div className="pt-4 border-t border-white/20">
                                <Link
                                    href={`/${language}/priser`}
                                    onClick={closeMenu}
                                    className="block px-4 py-2 text-white hover:bg-white/10 rounded-lg transition-colors"
                                >
                                    Priser
                                </Link>
                                <Link
                                    href={`/${language}/forsikring`}
                                    onClick={closeMenu}
                                    className="block px-4 py-2 text-white hover:bg-white/10 rounded-lg transition-colors"
                                >
                                    Forsikring
                                </Link>
                                <Link
                                    href={`/${language}/om-oss`}
                                    onClick={closeMenu}
                                    className="block px-4 py-2 text-white hover:bg-white/10 rounded-lg transition-colors"
                                >
                                    Om oss
                                </Link>
                                <Link
                                    href={`/${language}/kontakt`}
                                    onClick={closeMenu}
                                    className="block px-4 py-2 text-white hover:bg-white/10 rounded-lg transition-colors"
                                >
                                    Kontakt
                                </Link>
                            </div>

                            {/* Clinics and Specialists */}
                            <div className="pt-4 border-t border-white/20">
                                <Link
                                    href={`/${language}/${clinics.slug}`}
                                    onClick={closeMenu}
                                    className="block px-4 py-2 text-white hover:bg-white/10 rounded-lg transition-colors"
                                >
                                    {clinics.menuTitle}
                                </Link>
                                <Link
                                    href={`/${language}/${specialists.slug}`}
                                    onClick={closeMenu}
                                    className="block px-4 py-2 text-white hover:bg-white/10 rounded-lg transition-colors"
                                >
                                    {specialists.menuTitle}
                                </Link>
                            </div>
                        </nav>
                    </div>
                </>
            )}
        </>
    );
};

