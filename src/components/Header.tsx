/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { Search, Menu, X, Shirt, Coffee, BookOpen, Sparkles, Image, HardHat, Frame, Users, Lightbulb, MapPin, Palette, Gamepad2, Newspaper, ArrowRight } from "lucide-react";
import { searchSite, SEARCH_KIND_META, type SearchMatch } from "../services/searchSite";
import type { WPPost, Product } from "../types";
import { categorySlug } from "./MadeInBharatCategoryPage";
import ppLogo from "../assets/images/pakkapatriot_logo.png";

// Sub-navbar categories — each opens its own page under /shop/:slug
const MERCH_CATEGORIES = [
  { id: "T-Shirts", label: "T-Shirts", icon: Shirt },
  { id: "Mugs", label: "Mugs", icon: Coffee },
  { id: "Posters", label: "Posters", icon: Image },
  { id: "Stickers", label: "Stickers", icon: Sparkles },
  { id: "Notebooks", label: "Notebooks", icon: BookOpen },
  { id: "Caps", label: "Caps", icon: HardHat },
  { id: "Photo Frames", label: "Photo Frames", icon: Frame },
];

interface HeaderProps {
  onSearch: (query: string) => void;
  onJoinJourneyClick: () => void;
  onTabChange: (tab: string) => void;
  activeTab: string;
  onSelectLoveCategory?: (categoryId: string | null) => void;
  selectedLoveCategory?: string | null;
  posts: WPPost[];
  products: Product[];
  onProductClick: (product: Product) => void;
}

// Love categories matching What Pakka Patriot Loves
const LOVE_CATEGORIES = [
  { id: "PEOPLE", label: "PEOPLE", icon: Users },
  { id: "IDEAS", label: "IDEAS", icon: Lightbulb },
  { id: "PLACES", label: "PLACES", icon: MapPin },
  { id: "CULTURE", label: "CULTURE", icon: Palette },
  { id: "CREATE", label: "CREATE", icon: Sparkles },
  { id: "BLOGS", label: "STORIES", icon: Newspaper },
  { id: "GAMES", label: "GAMES", icon: Gamepad2 },
];

// Categories that open a dedicated page instead of filtering stories
const CATEGORY_PAGES: Record<string, string> = {
  IDEAS: "/ideas",
  PLACES: "/places",
  PEOPLE: "/people",
  CULTURE: "/culture",
  CREATE: "/create",
  BLOGS: "/blogs",
  GAMES: "/play",
};

export default function Header({
  onSearch,
  onJoinJourneyClick,
  onTabChange,
  activeTab,
  onSelectLoveCategory,
  selectedLoveCategory,
  posts,
  products,
  onProductClick
}: HeaderProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === "/";
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [highlighted, setHighlighted] = useState(-1);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchFormRef = useRef<HTMLFormElement>(null);

  // Live suggestions for whatever the user is typing (max 7 for the dropdown).
  const suggestions = useMemo(
    () => searchSite(searchQuery, posts, products).slice(0, 7),
    [searchQuery, posts, products]
  );

  // Close the suggestion dropdown when clicking anywhere outside the search box.
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (searchFormRef.current && !searchFormRef.current.contains(e.target as Node)) {
        setSearchOpen(false);
        setHighlighted(-1);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const q = searchQuery.trim();
    if (!q) return;
    // Global site search — navigate to the search results page from any page.
    navigate(`/search?q=${encodeURIComponent(q)}`);
    setSearchOpen(false);
    setHighlighted(-1);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    setHighlighted(-1);
    onSearch(query);
  };

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlighted((h) => (suggestions.length ? (h + 1) % suggestions.length : -1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlighted((h) => {
        if (!suggestions.length) return -1;
        if (h <= 0) return suggestions.length - 1;
        return h - 1;
      });
    } else if (e.key === "Enter") {
      if (highlighted >= 0 && suggestions[highlighted]) {
        e.preventDefault();
        selectSuggestion(suggestions[highlighted]);
      }
    } else if (e.key === "Escape") {
      setSearchOpen(false);
      setHighlighted(-1);
    }
  };

  const selectSuggestion = (s: SearchMatch) => {
    setSearchOpen(false);
    setHighlighted(-1);
    if (s.product) {
      onProductClick(s.product);
      return;
    }
    if (s.to) navigate(s.to);
  };

  const goToAllResults = () => {
    const q = searchQuery.trim();
    if (!q) return;
    navigate(`/search?q=${encodeURIComponent(q)}`);
    setSearchOpen(false);
    setHighlighted(-1);
  };

  // Merch category menu items each open their own dedicated page.
  const handleMerchClick = (catId: string) => {
    navigate(`/shop/${categorySlug(catId)}`);
  };

  const handleLoveCategoryClick = (catId: string) => {
    const page = CATEGORY_PAGES[catId];
    if (page) {
      navigate(page);
      return;
    }
    if (selectedLoveCategory === catId) {
      onSelectLoveCategory?.(null);
    } else {
      onSelectLoveCategory?.(catId);
      // Scroll to What Pakka Loves section
      if (!isHome) {
        navigate("/");
        setTimeout(() => {
          const el = document.getElementById("what-pakka-loves");
          if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
        }, 100);
      } else {
        const el = document.getElementById("what-pakka-loves");
        if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  };

  const handleMobileLoveClick = (catId: string) => {
    setMobileMenuOpen(false);
    const page = CATEGORY_PAGES[catId];
    if (page) {
      navigate(page);
      return;
    }
    onSelectLoveCategory?.(catId);
    if (!isHome) {
      navigate("/");
      setTimeout(() => {
        const el = document.getElementById("what-pakka-loves");
        if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 100);
    } else {
      const el = document.getElementById("what-pakka-loves");
      if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#FCFAF5]/95 backdrop-blur-md border-b border-[#F0EBE0] shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo - image only */}
          <Link to="/" className="flex-shrink-0 flex items-center cursor-pointer">
            <img src={ppLogo} alt="Pakka Patriot" className="h-12 w-auto object-contain" />
          </Link>

          {/* Desktop Love Categories (replaces old nav links) */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {LOVE_CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              const pagePath = CATEGORY_PAGES[cat.id];
              // Highlight the link for the page we're currently on — in addition to
              // the home-page "What Pakka Loves" filter state — so the active link
              // keeps its orange colour after navigation.
              const isRouteActive = pagePath
                ? location.pathname === pagePath || location.pathname.startsWith(`${pagePath}/`)
                : false;
              const isSelected = selectedLoveCategory === cat.id || isRouteActive;
              return (
                <button
                  key={cat.id}
                  onClick={() => handleLoveCategoryClick(cat.id)}
                  className={`flex items-center gap-1.5 px-2.5 py-2 rounded-md text-sm font-semibold transition-all duration-200 relative ${
                    isSelected
                      ? "text-[#F6B828]"
                      : "text-[#0A2240] hover:text-[#F6B828] hover:bg-[#F8F4EA]"
                  }`}
                >
                  <Icon size={16} className={isSelected ? "text-[#F6B828]" : "text-[#8A9EB4]"} />
                  {cat.label}
                  {isSelected && <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#F6B828] rounded-full" />}
                </button>
              );
            })}
          </nav>

          {/* Actions: Search, Join Journey, Mobile Menu Toggle */}
          <div className="flex items-center gap-2 sm:gap-4">
            
            {/* Search Input Box with live suggestions */}
            <form
              ref={searchFormRef}
              onSubmit={handleSearchSubmit}
              className="relative flex items-center"
            >
              <input
                type="text"
                ref={searchInputRef}
                placeholder="Search the whole site…"
                value={searchQuery}
                onChange={handleSearchChange}
                onKeyDown={handleSearchKeyDown}
                aria-label="Search the whole site"
                aria-expanded={searchOpen && searchQuery.trim().length > 0}
                className={`transition-all duration-300 ease-in-out text-sm text-[#0A2240] bg-[#FAF6EC] border border-[#E4DCB9] rounded-full focus:outline-none focus:border-[#F6B828] focus:ring-1 focus:ring-[#F6B828] ${
                  searchOpen ? "w-44 sm:w-60 px-4 py-1.5 opacity-100" : "w-0 px-0 py-0 opacity-0 pointer-events-none"
                }`}
              />
              <button
                type="button"
                onClick={() => {
                  if (searchOpen && searchQuery.trim()) {
                    // A query is in the box — run the global search.
                    navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
                    setSearchOpen(false);
                  } else if (searchOpen) {
                    setSearchOpen(false);
                  } else {
                    setSearchOpen(true);
                    // Focus the input as soon as it expands, so the user can type immediately.
                    setTimeout(() => searchInputRef.current?.focus(), 80);
                  }
                }}
                className="p-2 text-[#0A2240] hover:text-[#F6B828] transition-colors rounded-full hover:bg-[#FAF6EC]"
                title="Search"
              >
                {searchOpen ? <X size={20} /> : <Search size={22} />}
              </button>

              {/* Dynamic suggestions dropdown */}
              {searchOpen && searchQuery.trim() && (
                <div className="absolute right-0 top-full mt-2 z-50 w-[min(340px,calc(100vw-4rem))] bg-white rounded-2xl border border-[#E4DCB9] shadow-2xl overflow-hidden text-left">
                  <div className="max-h-80 overflow-y-auto py-1.5">
                    {suggestions.length === 0 ? (
                      <div className="px-4 py-6 text-center">
                        <p className="text-sm font-bold text-[#0A2240]">No suggestions</p>
                        <p className="text-xs text-[#8A9EB4] font-semibold mt-0.5">Press Enter to search the whole site.</p>
                      </div>
                    ) : (
                      suggestions.map((s, i) => (
                        <button
                          key={`${s.kind}-${i}`}
                          type="button"
                          onMouseEnter={() => setHighlighted(i)}
                          onClick={() => selectSuggestion(s)}
                          className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors cursor-pointer ${
                            i === highlighted ? "bg-[#FAF6EC]" : "bg-white"
                          }`}
                        >
                          <span className={`w-8 h-8 rounded-lg bg-gradient-to-br ${s.accent} flex items-center justify-center flex-shrink-0`}>
                            <s.icon size={15} className="text-white" />
                          </span>
                          <span className="flex-grow min-w-0">
                            <span className="block text-sm font-bold text-[#0A2240] truncate">{s.title}</span>
                            <span className="block text-[11px] text-[#8A9EB4] font-semibold truncate">{s.subtitle}</span>
                          </span>
                          <span className="text-[9px] font-black uppercase tracking-wider text-[#587760] bg-[#EAF1EB] px-2 py-0.5 rounded-full flex-shrink-0">
                            {SEARCH_KIND_META[s.kind]?.label ?? s.kind}
                          </span>
                        </button>
                      ))
                    )}
                  </div>
                  <button
                    type="button"
                    onMouseEnter={() => setHighlighted(-1)}
                    onClick={goToAllResults}
                    className="w-full flex items-center justify-center gap-1.5 border-t border-[#F0EBE0] bg-[#FAF6EC] hover:bg-[#FEF5E0] px-4 py-2.5 text-xs font-black text-[#0A2240] uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    See all results <ArrowRight size={13} />
                  </button>
                </div>
              )}
            </form>

            <button
              onClick={onJoinJourneyClick}
              className="hidden sm:block bg-[#F6B828] hover:bg-[#DAA520] text-white px-5 py-2.5 rounded-full text-sm font-bold shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5"
            >
              Join the Journey
            </button>

            {/* Mobile Hamburger menu */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[#0A2240] hover:text-[#F6B828] transition-colors"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

          </div>
        </div>
      </div>

      {/* Sub-navbar for merchandise categories */}
      <div className="bg-[#122A44] text-white py-2 sm:py-3 px-4 shadow-inner overflow-x-auto scrollbar-none border-t border-[#1F3D5E]">
        <div className="max-w-7xl mx-auto flex items-center justify-start md:justify-center gap-4 sm:gap-8 min-w-max">
          {MERCH_CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            // Highlight the category whose page we're currently on.
            const isSelected = location.pathname === `/shop/${categorySlug(cat.id)}`;

            return (
              <button
                key={cat.id}
                onClick={() => handleMerchClick(cat.id)}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] sm:text-xs font-bold tracking-wide uppercase transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? "bg-[#F6B828] text-white shadow-md scale-105"
                    : "text-gray-300 hover:text-white hover:bg-white/10"
                }`}
              >
                <Icon size={14} className={isSelected ? "text-white animate-pulse" : "text-gray-400"} />
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FCFAF5] border-t border-[#F0EBE0] px-4 pt-2 pb-6 space-y-2 shadow-lg">
          {LOVE_CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const pagePath = CATEGORY_PAGES[cat.id];
            const isRouteActive = pagePath
              ? location.pathname === pagePath || location.pathname.startsWith(`${pagePath}/`)
              : false;
            const isSelected = selectedLoveCategory === cat.id || isRouteActive;
            return (
              <button
                key={cat.id}
                onClick={() => handleMobileLoveClick(cat.id)}
                className={`flex items-center gap-3 w-full text-left px-4 py-2.5 rounded-lg text-sm font-bold tracking-wide transition-all ${
                  isSelected
                    ? "bg-[#FEF5E0] text-[#F6B828]"
                    : "text-[#0A2240] hover:bg-[#FAF6EC]"
                }`}
              >
                <Icon size={18} className={isSelected ? "text-[#F6B828]" : "text-[#8A9EB4]"} />
                {cat.label}
              </button>
            );
          })}
          <div className="pt-4 border-t border-[#E4DCB9]">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onJoinJourneyClick();
              }}
              className="w-full text-center bg-[#F6B828] text-white py-3 rounded-xl font-bold hover:bg-[#DAA520] transition-all"
            >
              Join the Journey
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
