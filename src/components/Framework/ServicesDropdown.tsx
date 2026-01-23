"use client";
import { FC, useState, useRef, useEffect } from "react";
import Link from "next/link";
import { ChevronDown, ChevronRight } from "lucide-react";
import type { SanityDocument } from "@sanity/client";

interface Treatment {
    _id: string;
    title: string;
    slug: string;
}

interface CategoryWithTreatments {
    _id: string;
    title: string;
    slug: string;
    language: string;
    treatments?: Treatment[];
}

interface ServicesDropdownProps {
    categories: CategoryWithTreatments[];
    language: string;
}

export const ServicesDropdown: FC<ServicesDropdownProps> = ({
    categories,
    language,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<CategoryWithTreatments | null>(
        categories.length > 0 ? categories[0] : null
    );
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen]);

    // Set first category as selected when dropdown opens
    useEffect(() => {
        if (isOpen && categories.length > 0 && !selectedCategory) {
            setSelectedCategory(categories[0]);
        }
    }, [isOpen, categories, selectedCategory]);

    const handleCategoryHover = (category: CategoryWithTreatments) => {
        setSelectedCategory(category);
    };

    return (
        <div ref={dropdownRef} className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                onMouseEnter={() => setIsOpen(true)}
                className={`px-3 py-1.5 text-sm font-light rounded-full transition-all hover:bg-white/10 text-white flex items-center gap-1 ${isOpen ? "bg-white/10" : ""
                    }`}
                aria-expanded={isOpen}
                aria-haspopup="true"
            >
                Tjenester
                <ChevronDown
                    className={`h-15 w-15 transition-transform duration-200 ${isOpen ? "rotate-180" : ""
                        }`}
                />
            </button>

            {isOpen && (
                <div
                    className="absolute top-full left-0 mt-2 bg-brand-dark border border-white/20 rounded-b-2xl shadow-2xl z-50 animate-fade-in overflow-hidden"
                    onMouseLeave={() => setIsOpen(false)}
                    style={{ minWidth: "700px", maxWidth: "900px" }}
                >
                    <div className="flex">
                        {/* Left Column - SUBJECT AREAS */}
                        <div className="w-72 bg-brand-dark border-r border-white/10">
                            <div className="px-4 py-3 border-b border-white/10">
                                <h3 className="text-white/60 text-xs uppercase tracking-wider font-light">
                                    FAGOMRÅDER
                                </h3>
                            </div>
                            <nav className="py-2">
                                {categories.map((cat) => (
                                    <div
                                        key={cat._id}
                                        onMouseEnter={() => handleCategoryHover(cat)}
                                        className={`cursor-pointer transition-colors ${selectedCategory?._id === cat._id
                                            ? "bg-white/10"
                                            : "hover:bg-white/5"
                                            }`}
                                    >
                                        <Link
                                            href={`/${cat.language}/${cat.slug}`}
                                            className="flex items-center justify-between px-4 py-2.5 text-sm text-white font-light"
                                            onClick={() => setIsOpen(false)}
                                        >
                                            <span>{cat.title}</span>
                                            <ChevronRight className="h-15 w-15 text-white/40" />
                                        </Link>
                                    </div>
                                ))}
                            </nav>
                        </div>

                        {/* Right Column - Treatments for selected category */}
                        <div className="flex-1 bg-brand-dark min-h-[400px] max-h-[600px] overflow-y-auto">
                            {selectedCategory && (
                                <>
                                    <div className="px-4 py-3 border-b border-white/10 sticky top-0 bg-brand-dark z-10">
                                        <h3 className="text-white/60 text-xs uppercase tracking-wider font-light">
                                            {selectedCategory.title.toUpperCase()}
                                        </h3>
                                    </div>
                                    <nav className="py-2">
                                        {selectedCategory.treatments && selectedCategory.treatments.length > 0 ? (
                                            selectedCategory.treatments.map((treatment) => (
                                                <Link
                                                    key={treatment._id}
                                                    href={`/${selectedCategory.language}/${selectedCategory.slug}/${treatment.slug}`}
                                                    onClick={() => setIsOpen(false)}
                                                    className="flex items-center px-4 py-2.5 text-sm text-white font-light hover:bg-white/10 transition-colors group"
                                                >
                                                    <span>{treatment.title}</span>
                                                    {treatment.title && (
                                                        <ChevronRight className="h-15 w-15 text-white/40 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                                                    )}
                                                </Link>
                                            ))
                                        ) : (
                                            <div className="px-4 py-2.5 text-sm text-white/50 font-light">
                                                Ingen behandlinger tilgjengelig
                                            </div>
                                        )}
                                    </nav>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
