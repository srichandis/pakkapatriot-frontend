/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import { Search, Menu, X, Shirt, Coffee, ShoppingBag, BookOpen, Sparkles, Image, Heart, Gift, Users, Lightbulb, MapPin, Palette, BadgeCheck, ArrowRight, ChevronDown } from "lucide-react";
import { searchSite, SEARCH_KIND_META, type SearchMatch } from "../services/searchSite";
import type { WPPost, WCProduct } from "../types";
import ppLogo from "../assets/images/pp_logo.png";

// Sub-navbar categories
const MERCH_CATEGORIES = [
  { id: "T-Shirts", label: "T-Shirts", icon: Shirt },
  { id: "Hoodies", label: "Hoodies", icon: Shirt }, // Shirt used with different styling for Hoodie
  { id: "Mugs", label: "Mugs", icon: Coffee },
  { id: "Tote Bags", label: "Tote Bags", icon: ShoppingBag },
  { id: "Notebooks", label: "Notebooks", icon: BookOpen },
  { id: "Stickers", label: "Stickers", icon: Sparkles },
  { id: "Posters", label: "Posters", icon: Image },
  { id: "Accessories", label: "Accessories", icon: Heart },
  { id: "Gift Cards", label: "Gift Cards", icon: Gift },
];

interface HeaderProps {
  onSearch: (query: string) => void;
  onFilterMerchCategory: (category: string | null) => void;
  selectedMerchCategory: string | null;
  onJoinJourneyClick: () => void;
  onTabChange: (tab: string) => void;
  activeTab: string;
  onSelectLoveCategory?: (categoryId: string | null) => void;
  selectedLoveCategory?: string | null;
  posts: WPPost[];
  products: WCProduct[];
  onProductClick: (product: WCProduct) => void;
}

// Love categories matching What Pakka Patriot Loves
const LOVE_CATEGORIES = [
  { id: "PEOPLE", label: "PEOPLE", icon: Users },
  { id: "IDEAS", label: "IDEAS", icon: Lightbulb },
  { id: "PLACES", label: "PLACES", icon: MapPin },
  { id: "CULTURE", label: "CULTURE", icon: Palette },
  { id: "CREATE", label: "CREATE", icon: Sparkles },
  { id: "MADE_IN_BHARAT", label: "MADE IN BHĀRAT", icon: BadgeCheck },
];

// Categories that open a dedicated page instead of filtering stories
const CATEGORY_PAGES: Record<string, string> = {
  MADE_IN_BHARAT: "/made-in-bharat",
  IDEAS: "/ideas",
  PLACES: "/places",
  PEOPLE: "/people",
  CULTURE: "/culture",
  CREATE: "/create",
};

export default function Header({
  onSearch,
  onFilterMerchCategory,
  selectedMerchCategory,
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
  // Which merch category has an open dropdown (currently only T-Shirts has products).
  const [openMerchDropdown, setOpenMerchDropdown] = useState<string | null>(null);
  // Fixed-position coords for the portaled dropdown (avoids clipping by the overflow-x-auto navbar).
  const [merchDropdownPos, setMerchDropdownPos] = useState<{ top: number; left: number } | null>(null);
  const merchDropdownTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const tshirtWrapRef = useRef<HTMLDivElement>(null);
  const tshirtPanelRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchFormRef = useRef<HTMLFormElement>(null);

  // T-shirt products for the T-Shirts dropdown in the merch sub-navbar.
  const tshirtProducts = useMemo(
    () => products.filter((p) => p.category.toLowerCase().includes("t-shirt")),
    [products]
  );

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

  const handleMerchClick = (catId: string) => {
    if (selectedMerchCategory === catId) {
      onFilterMerchCategory(null); // Clear filter
      return;
    }
    onFilterMerchCategory(catId);
    if (!isHome) {
      // The store section lives on the homepage — go home and scroll to it.
      navigate("/");
      setTimeout(() => {
        const shopSec = document.getElementById("woocommerce-shop");
        if (shopSec) shopSec.scrollIntoView({ behavior: "smooth" });
      }, 150);
      return;
    }
    // Smooth scroll to WooCommerce Section
    const shopSec = document.getElementById("woocommerce-shop");
    if (shopSec) {
      shopSec.scrollIntoView({ behavior: "smooth" });
    }
  };

  const openMerchDropdownFor = (catId: string) => {
    if (merchDropdownTimer.current) clearTimeout(merchDropdownTimer.current);
    setOpenMerchDropdown(catId);
    // Position the portaled panel just below the button (clamp so it never
    // overflows the right edge of the viewport).
    const rect = tshirtWrapRef.current?.getBoundingClientRect();
    if (rect) {
      const panelWidth = 288;
      setMerchDropdownPos({
        top: rect.bottom + 8,
        left: Math.min(rect.left, window.innerWidth - panelWidth - 12),
      });
    }
  };

  const closeMerchDropdown = () => {
    if (merchDropdownTimer.current) clearTimeout(merchDropdownTimer.current);
    merchDropdownTimer.current = setTimeout(() => setOpenMerchDropdown(null), 200);
  };

  // Close the merch dropdown on outside tap (touch devices have no mouseleave)
  // and when the page scrolls/resizes (the fixed panel would be misaligned).
  useEffect(() => {
    if (!openMerchDropdown) return;
    const onPointerDown = (e: MouseEvent | TouchEvent) => {
      const t = e.target as Node;
      if (tshirtWrapRef.current?.contains(t) || tshirtPanelRef.current?.contains(t)) return;
      setOpenMerchDropdown(null);
    };
    const onScroll = () => setOpenMerchDropdown(null);
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("touchstart", onPointerDown);
    window.addEventListener("scroll", onScroll, true);
    window.addEventListener("resize", onScroll);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("touchstart", onPointerDown);
      window.removeEventListener("scroll", onScroll, true);
      window.removeEventListener("resize", onScroll);
    };
  }, [openMerchDropdown]);

  const selectTshirtProduct = (product: WCProduct) => {
    setOpenMerchDropdown(null);
    onProductClick(product);
  };

  const viewAllInCategory = (catId: string) => {
    setOpenMerchDropdown(null);
    if (!isHome) {
      // The store section lives on the homepage — go home and open the filter.
      onFilterMerchCategory(catId);
      navigate("/");
      setTimeout(() => {
        const shopSec = document.getElementById("woocommerce-shop");
        if (shopSec) shopSec.scrollIntoView({ behavior: "smooth" });
      }, 150);
    } else {
      handleMerchClick(catId);
    }
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
            <img src={ppLogo} alt="Pakka Patriot" className="w-16 h-16 object-contain" />
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
              // MADE IN BHĀRAT is the flagship destination — styled as a unique button,
              // highlighted at all times.
              const isMadeInBharat = cat.id === "MADE_IN_BHARAT";
              const isSelected = isMadeInBharat || selectedLoveCategory === cat.id || isRouteActive;
              return (
                <button
                  key={cat.id}
                  onClick={() => handleLoveCategoryClick(cat.id)}
                  className={`flex items-center gap-1.5 px-2.5 py-2 rounded-md text-sm font-semibold transition-all duration-200 relative ${
                    isMadeInBharat
                      ? "px-4 py-2 rounded-full bg-gradient-to-r from-[#E11D48] to-[#F43F5E] text-white ring-1 ring-white/30 shadow-lg shadow-[#E11D48]/30 hover:shadow-xl hover:shadow-[#E11D48]/40 hover:brightness-110 hover:-translate-y-0.5"
                      : isSelected
                        ? "text-[#F6B828]"
                        : "text-[#0A2240] hover:text-[#F6B828] hover:bg-[#F8F4EA]"
                  }`}
                >
                  <Icon size={16} className={isMadeInBharat ? "text-white" : isSelected ? "text-[#F6B828]" : "text-[#8A9EB4]"} />
                  {cat.label}
                  {isSelected && !isMadeInBharat && <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#F6B828] rounded-full" />}
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
            const isSelected = selectedMerchCategory === cat.id;
            const hasDropdown = cat.id === "T-Shirts" && tshirtProducts.length > 0;
            const isOpen = openMerchDropdown === cat.id;

            const button = (
              <button
                key={cat.id}
                onClick={() => {
                  // Opening the dropdown (hover path also opens it; clicking the
                  // button always opens rather than toggling, so a hover-then-click
                  // never unexpectedly closes the panel).
                  if (hasDropdown) {
                    openMerchDropdownFor(cat.id);
                  } else {
                    handleMerchClick(cat.id);
                  }
                }}
                onMouseEnter={() => hasDropdown && openMerchDropdownFor(cat.id)}
                onMouseLeave={closeMerchDropdown}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] sm:text-xs font-bold tracking-wide uppercase transition-all duration-200 cursor-pointer ${
                  isSelected || isOpen
                    ? "bg-[#F6B828] text-white shadow-md scale-105"
                    : "text-gray-300 hover:text-white hover:bg-white/10"
                }`}
              >
                <Icon size={14} className={isSelected || isOpen ? "text-white animate-pulse" : "text-gray-400"} />
                {cat.label}
                {hasDropdown && <ChevronDown size={12} className={`transition-transform ${isOpen ? "rotate-180" : ""}`} />}
              </button>
            );

            // T-Shirts gets a dropdown listing each t-shirt product. The panel is
            // portaled to <body> with fixed positioning so the navbar's
            // overflow-x-auto (which forces overflow-y to auto) can't clip it.
            if (hasDropdown) {
              return (
                <div
                  key={cat.id}
                  ref={tshirtWrapRef}
                  className="relative"
                  onMouseEnter={() => openMerchDropdownFor(cat.id)}
                  onMouseLeave={closeMerchDropdown}
                >
                  {button}
                  {isOpen && merchDropdownPos && createPortal(
                    <motion.div
                      ref={tshirtPanelRef}
                      initial={{ opacity: 0, y: 8, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.97 }}
                      transition={{ duration: 0.15 }}
                      onMouseEnter={() => openMerchDropdownFor(cat.id)}
                      onMouseLeave={closeMerchDropdown}
                      style={{ position: "fixed", top: merchDropdownPos.top, left: merchDropdownPos.left, zIndex: 60 }}
                      className="w-72 bg-white rounded-2xl border border-[#E4DCB9] shadow-2xl overflow-hidden"
                    >
                      <div className="max-h-80 overflow-y-auto py-1.5">
                        {tshirtProducts.map((p) => (
                          <button
                            key={p.id}
                            onClick={() => selectTshirtProduct(p)}
                            className="w-full flex items-center gap-3 px-3 py-2.5 text-left hover:bg-[#FAF6EC] transition-colors cursor-pointer"
                          >
                            <img
                              src={p.imageUrl}
                              alt={p.name}
                              className="w-11 h-11 rounded-lg object-cover border border-[#F0EBE0] flex-shrink-0"
                              loading="lazy"
                              referrerPolicy="no-referrer"
                            />
                            <span className="flex-grow min-w-0">
                              <span className="block text-xs font-bold text-[#0A2240] truncate">{p.name}</span>
                              <span className="block text-[11px] font-black text-[#F6B828]">₹{p.price}</span>
                            </span>
                            <ArrowRight size={14} className="text-[#C8C5B9] flex-shrink-0" />
                          </button>
                        ))}
                      </div>
                      <button
                        onClick={() => viewAllInCategory(cat.id)}
                        className="w-full flex items-center justify-center gap-1.5 border-t border-[#F0EBE0] bg-[#FAF6EC] hover:bg-[#FEF5E0] px-3 py-2.5 text-[11px] font-black text-[#0A2240] uppercase tracking-wider transition-colors cursor-pointer"
                      >
                        View all T-Shirts <ArrowRight size={13} />
                      </button>
                    </motion.div>,
                    document.body
                  )}
                </div>
              );
            }

            return button;
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
            // MADE IN BHĀRAT is the flagship destination — keep it highlighted at all times.
            const isSelected =
              cat.id === "MADE_IN_BHARAT" || selectedLoveCategory === cat.id || isRouteActive;
            const isMadeInBharat = cat.id === "MADE_IN_BHARAT";
            return (
              <button
                key={cat.id}
                onClick={() => handleMobileLoveClick(cat.id)}
                className={`flex items-center gap-3 w-full text-left px-4 py-2.5 rounded-lg text-sm font-bold tracking-wide transition-all ${
                  isMadeInBharat
                    ? "bg-gradient-to-r from-[#E11D48] to-[#F43F5E] text-white ring-1 ring-white/30 shadow-lg shadow-[#E11D48]/30"
                    : isSelected
                      ? "bg-[#FEF5E0] text-[#F6B828]"
                      : "text-[#0A2240] hover:bg-[#FAF6EC]"
                }`}
              >
                <Icon size={18} className={isMadeInBharat ? "text-white" : isSelected ? "text-[#F6B828]" : "text-[#8A9EB4]"} />
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
