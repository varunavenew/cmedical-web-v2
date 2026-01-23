"use client";
import { FC, useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, X, Menu as MenuIcon } from "lucide-react";
import { Button } from "../ui/button";
import { ServicesDropdown } from "./ServicesDropdown";
import { BurgerMenu } from "./BurgerMenu";
import Image from "next/image";
import logoNegative from "../../../public/assets/logos/cm-wordmark-negative.png";
import { BookingPanel } from "../Booking/BookingPanel";
import { useSearchParams } from "next/navigation";

interface HeaderProps extends GlobalSettings {
    language: string;
}

export const Header: FC<HeaderProps> = ({
    language,
    menuCategories,
    otherCategories,
    clinics,
    specialists,
}) => {
    const [isNavVisible, setIsNavVisible] = useState(true);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [suggestions, setSuggestions] = useState<
        Array<{ label: string; path: string; category: string }>
    >([]);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [isBookingOpen, setIsBookingOpen] = useState(false);

    const searchContainerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const router = useRouter();
    const searchParams = useSearchParams();

    // Scroll detection for hide/show header
    useEffect(() => {
        let lastScrollY = window.scrollY;
        let ticking = false;

        const updateNavVisibility = () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY < 100) {
                setIsNavVisible(true);
            } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
                setIsNavVisible(false);
            } else {
                setIsNavVisible(true);
            }

            lastScrollY = currentScrollY;
            ticking = false;
        };

        const onScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(updateNavVisibility);
                ticking = true;
            }
        };

        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    // Check for booking panel
    useEffect(() => {
        setIsBookingOpen(searchParams.has("book"));
    }, [searchParams]);

    // Search suggestions based on categories and content
    useEffect(() => {
        if (!searchQuery.trim()) {
            setSuggestions([]);
            return;
        }

        const query = searchQuery.toLowerCase();
        const results: Array<{ label: string; path: string; category: string }> = [];

        // Search in menu categories
        menuCategories.forEach((cat) => {
            if (cat.title.toLowerCase().includes(query)) {
                results.push({
                    label: cat.title,
                    path: `/${cat.language}/${cat.slug}`,
                    category: "Kategori",
                });
            }
        });

        // Search in other categories
        otherCategories.forEach((cat) => {
            if (cat.title.toLowerCase().includes(query)) {
                results.push({
                    label: cat.title,
                    path: `/${cat.language}/${cat.slug}`,
                    category: "Kategori",
                });
            }
        });

        // Add clinics and specialists
        if (clinics.menuTitle.toLowerCase().includes(query)) {
            results.push({
                label: clinics.menuTitle,
                path: `/${language}/${clinics.slug}`,
                category: "Klinikker",
            });
        }

        if (specialists.menuTitle.toLowerCase().includes(query)) {
            results.push({
                label: specialists.menuTitle,
                path: `/${language}/${specialists.slug}`,
                category: "Spesialister",
            });
        }

        setSuggestions(results.slice(0, 8));
        setSelectedIndex(0);
    }, [searchQuery, menuCategories, otherCategories, clinics, specialists, language]);

    // Handle search form submission
    const handleSearch = useCallback(
        (e: React.FormEvent) => {
            e.preventDefault();
            if (suggestions.length > 0 && selectedIndex < suggestions.length) {
                router.push(suggestions[selectedIndex].path);
                setIsSearchOpen(false);
                setSearchQuery("");
            }
        },
        [suggestions, selectedIndex, router]
    );

    // Handle keyboard navigation in search
    const handleKeyDown = useCallback(
        (e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === "ArrowDown") {
                e.preventDefault();
                setSelectedIndex((prev) =>
                    prev < suggestions.length - 1 ? prev + 1 : prev
                );
            } else if (e.key === "ArrowUp") {
                e.preventDefault();
                setSelectedIndex((prev) => (prev > 0 ? prev - 1 : 0));
            } else if (e.key === "Enter") {
                e.preventDefault();
                handleSearch(e);
            } else if (e.key === "Escape") {
                setIsSearchOpen(false);
                setSearchQuery("");
            }
        },
        [suggestions, handleSearch]
    );

    // Navigate to suggestion
    const handleNavigate = useCallback(
        (path: string) => {
            router.push(path);
            setIsSearchOpen(false);
            setSearchQuery("");
        },
        [router]
    );

    // Quick search terms (popular searches)
    const quickSearchTerms = [
        "IVF-behandling",
        "Gynekologisk undersøkelse",
        "Ultralyd",
        "Celleprøve",
        "Hormonbehandling",
    ];

    // Handle booking button
    const handleOpenBooking = useCallback(() => {
        const url = new URL(window.location.href);
        url.searchParams.set("book", "true");
        router.push(url.toString());
    }, [router]);

    // Get all categories for navigation with treatments
    const allCategories = [...menuCategories, ...otherCategories]
        .filter((cat) => !cat.hideFromMainMenu)
        .map((cat) => ({
            ...cat,
            treatments: (cat as any).treatments || [],
        }));

    return (
        <>
            {/* Combined Header - Banner + Nav that hide/show together */}
            <header
                className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ${isNavVisible ? "translate-y-0" : "-translate-y-full"
                    }`}
                style={{ marginLeft: isChatOpen ? "360px" : "0" }}
            >
                {/* Navigation Bar */}
                <nav className="bg-brand-dark">
                    <div className="container mx-auto px-4 md:px-8 h-16 flex items-center justify-between relative">
                        <Link href={`/${language}`} className="flex items-center">
                            <Image
                                src={logoNegative}
                                alt="C Medical"
                                className="h-12 md:h-16 w-auto"
                                width={77}
                                height={14}
                                priority
                            />
                        </Link>

                        {/* Main Navigation - Always visible on desktop */}
                        <div className="hidden md:flex items-center gap-1 text-white">
                            <ServicesDropdown
                                categories={allCategories as any}
                                language={language}
                            />

                            {/* Static menu items - you can add more here from Sanity if needed */}
                            <Link
                                href={`/${language}/priser`}
                                className="px-3 py-1.5 text-sm font-light rounded-full transition-all hover:bg-white/10"
                            >
                                Priser
                            </Link>
                            <Link
                                href={`/${language}/forsikring`}
                                className="px-3 py-1.5 text-sm font-light rounded-full transition-all hover:bg-white/10"
                            >
                                Forsikring
                            </Link>
                            <Link
                                href={`/${language}/om-oss`}
                                className="px-3 py-1.5 text-sm font-light rounded-full transition-all hover:bg-white/10"
                            >
                                Om oss
                            </Link>
                            <Link
                                href={`/${language}/kontakt`}
                                className="px-3 py-1.5 text-sm font-light rounded-full transition-all hover:bg-white/10"
                            >
                                Kontakt
                            </Link>
                        </div>

                        {/* Right side: Search, CTA, Menu */}
                        <div className="flex items-center gap-7">
                            {/* Search Toggle */}
                            <button
                                onClick={() => {
                                    setIsSearchOpen(!isSearchOpen);
                                    if (!isSearchOpen && inputRef.current) {
                                        setTimeout(() => inputRef.current?.focus(), 100);
                                    }
                                }}
                                className="p-2 rounded-full transition-all hover:bg-white/10 text-white"
                                aria-label="Søk"
                            >
                                {isSearchOpen ? (
                                    <X className="h-15 w-15" />
                                ) : (
                                    <Search className="h-15 w-15" />
                                )}
                            </button>

                            {/* Bestill time CTA */}
                            <Button
                                size="sm"
                                className="bg-accent text-accent-foreground hover:bg-accent/90 font-light rounded-full px-4 md:px-6 text-sm"
                                onClick={handleOpenBooking}
                            >
                                Bestill time
                            </Button>

                            {/* Burger Menu */}
                            <BurgerMenu
                                categories={allCategories as any}
                                clinics={clinics}
                                specialists={specialists}
                                language={language}
                            />
                        </div>
                    </div>

                    {/* Search Overlay - Inside nav for consistent styling */}
                    {isSearchOpen && (
                        <div
                            ref={searchContainerRef}
                            className="container mx-auto px-15 md:px-8 pb-15"
                        >
                            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 animate-fade-in">
                                <form onSubmit={handleSearch} className="flex items-center gap-3">
                                    <Search className="h-15 w-15 text-white/70" />
                                    <input
                                        ref={inputRef}
                                        type="text"
                                        placeholder="Søk etter behandlinger, spesialister, klinikker..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        onKeyDown={handleKeyDown}
                                        autoFocus
                                        className="flex-1 bg-transparent border-none outline-none text-sm text-white placeholder:text-white/50"
                                    />
                                    <Button
                                        type="submit"
                                        size="sm"
                                        variant="ghost"
                                        className="rounded-full hover:bg-white/10 text-white"
                                    >
                                        Søk
                                    </Button>
                                </form>

                                {/* Autocomplete suggestions */}
                                {suggestions.length > 0 && (
                                    <div className="mt-3 pt-3 border-t border-white/20">
                                        <nav className="space-y-1">
                                            {suggestions.map((item, index) => (
                                                <button
                                                    key={`${item.label}-${item.path}`}
                                                    onClick={() => handleNavigate(item.path)}
                                                    className={`w-full flex items-center justify-between py-2 px-3 rounded-lg text-left text-sm transition-all ${index === selectedIndex
                                                        ? "bg-white/20 text-white"
                                                        : "text-white/80 hover:bg-white/10 hover:text-white"
                                                        }`}
                                                >
                                                    <span>{item.label}</span>
                                                    <span className="text-xs text-white/50">
                                                        {item.category}
                                                    </span>
                                                </button>
                                            ))}
                                        </nav>
                                    </div>
                                )}

                                {/* Quick Links - show when no query */}
                                {!searchQuery && (
                                    <div className="flex flex-wrap gap-7 mt-3 pt-3 border-t border-white/20">
                                        <span className="text-xs text-white/60">Populært:</span>
                                        {quickSearchTerms.map((term) => (
                                            <button
                                                key={term}
                                                onClick={() => setSearchQuery(term)}
                                                className="px-3 py-1 text-xs rounded-full transition-all bg-white/10 hover:bg-white/20 text-white"
                                            >
                                                {term}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </nav>
            </header>

            {/* Booking Panel */}
            <BookingPanel
                show={isBookingOpen}
                clinicSlug={searchParams.get("clinic") || undefined}
                specialistSlug={searchParams.get("specialist") || undefined}
                onClose={() => {
                    const url = new URL(window.location.href);
                    url.searchParams.delete("book");
                    url.searchParams.delete("clinic");
                    url.searchParams.delete("specialist");
                    router.replace(url.toString());
                    setIsBookingOpen(false);
                }}
            />
        </>
    );
};

