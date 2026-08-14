/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useMemo, useState } from "react";
import { motion } from "motion/react";
import { Link, useNavigate } from "react-router-dom";
import { Search, X, ArrowUpRight, ArrowLeft, Landmark, Users, Clock } from "lucide-react";
import { byName } from "../data/collections";
import type { Collection, CollectionItem } from "../data/collections";

interface CollectionBrowsePageProps {
  collection: Collection;
}

export default function CollectionBrowsePage({ collection }: CollectionBrowsePageProps) {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filtered = useMemo(() => {
    let list = collection.items;
    if (selectedCategory) {
      list = list.filter((p) => p.category === selectedCategory);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.nativeName.includes(q) ||
          p.tagline.toLowerCase().includes(q) ||
          p.summary.toLowerCase().includes(q) ||
          p.attribution.toLowerCase().includes(q)
      );
    }
    return [...list].sort(byName);
  }, [collection.items, selectedCategory, searchQuery]);

  // Sectioned browsing: group cards under category headers. Clicking a category
  // chip shows only that category's section; "ALL" shows every section.
  const isSectioned = !!collection.groupByCategory && !searchQuery.trim();
  const categoriesWithItems = useMemo(() => {
    const grouped = collection.categories
      .map((cat) => ({ ...cat, items: collection.items.filter((i) => i.category === cat.id).sort(byName) }))
      .filter((c) => c.items.length > 0);
    // Defensive: never let an item silently vanish if its category is missing from the list.
    const listed = new Set(grouped.map((c) => c.id));
    const orphaned = collection.items.filter((i) => !listed.has(i.category)).sort(byName);
    if (orphaned.length > 0) {
      grouped.push({ id: "__other__", label: "More to Explore", items: orphaned });
    }
    return grouped;
  }, [collection]);

  const HeroIcon = collection.heroIcon;

  // Render one category section (header + card grid) — reused for the all-sections
  // view and for the single section shown when a category chip is selected.
  const renderSection = (cat: { id: string; label: string; items: CollectionItem[] }) => (
    <div key={cat.id} id={`cat-${collection.id}-${cat.id}`} className="scroll-mt-36">
      <div className="flex items-center gap-3 mb-6">
        <h2 className="font-display font-black text-xl sm:text-2xl text-[#0A2240] tracking-tight whitespace-nowrap">
          {cat.label}
        </h2>
        <span className="text-[10px] font-black bg-[#F6B828]/15 text-[#B8860B] px-2.5 py-1 rounded-full whitespace-nowrap">
          {cat.items.length} {cat.items.length === 1 ? collection.itemNounSingular : collection.itemNoun}
        </span>
        <span className="flex-1 h-px bg-[#E4DCB9]" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cat.items.map((item, index) => renderCard(item, index))}
      </div>
    </div>
  );

  const activeCategory = selectedCategory
    ? categoriesWithItems.find((c) => c.id === selectedCategory)
    : undefined;

  const renderCard = (item: CollectionItem, index: number) => {
    const Icon = item.icon;
    return (
      <motion.div
        key={item.slug}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: (index % 9) * 0.05, duration: 0.4 }}
        whileHover={{ y: -6 }}
      >
        <Link
          to={`/${collection.id}/${item.slug}`}
          className="group bg-white rounded-3xl overflow-hidden border border-[#F0EBE0] hover:border-[#F6B828]/40 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full cursor-pointer"
        >
          {/* Gradient header */}
          <div className={`relative bg-gradient-to-br ${item.accent} px-6 pt-8 pb-14 overflow-hidden`}>
            <div className="absolute -top-8 -right-8 w-32 h-32 bg-white/10 rounded-full pointer-events-none" />
            <div className="absolute top-4 right-16 w-4 h-4 bg-white/20 rounded-full pointer-events-none" />
            <div className="absolute bottom-2 left-1/3 w-2.5 h-2.5 bg-white/20 rounded-full pointer-events-none" />

            <div className="relative flex items-start justify-between">
              <span className="px-3 py-1 rounded-full text-[10px] font-black tracking-wider uppercase bg-white/20 text-white backdrop-blur-sm select-none">
                {item.category}
              </span>
              <div className="w-14 h-14 bg-white/15 backdrop-blur-sm rounded-2xl flex items-center justify-center text-white shadow-inner">
                <Icon size={26} />
              </div>
            </div>

            <h3 className="relative mt-6 font-display font-black text-2xl text-white tracking-tight leading-tight group-hover:tracking-normal transition-all">
              {item.name}
            </h3>
            <p className="relative text-white/80 font-semibold text-sm mt-0.5">{item.nativeName}</p>
          </div>

          {/* Content */}
          <div className="p-5 flex-grow flex flex-col items-start text-left">
            <p className="text-sm text-[#4E637A] font-medium leading-relaxed mb-4 line-clamp-3 flex-grow">
              {item.summary}
            </p>

            {/* Meta */}
            <div className="w-full space-y-2 pt-3 border-t border-[#F0EBE0]/80">
              <div className="flex items-center gap-2 text-[11px] font-bold text-[#8A9EB4] uppercase tracking-wide">
                <Clock size={12} className="text-amber-500" />
                {item.era}
              </div>
              <div className="flex items-center gap-2 text-[11px] font-bold text-[#8A9EB4] uppercase tracking-wide truncate">
                <Landmark size={12} className="text-amber-500" />
                <span className="truncate">{item.attribution}</span>
              </div>
            </div>

            <div className="w-full mt-4 flex items-center justify-between">
              <span className="inline-flex items-center gap-1 text-[11px] font-black tracking-widest text-[#F6B828] uppercase">
                Explore
              </span>
              <span className="w-9 h-9 bg-[#FCFAF5] border border-[#E4DCB9] group-hover:bg-[#F6B828] group-hover:border-[#F6B828] text-[#0A2240] group-hover:text-white rounded-full flex items-center justify-center transition-colors">
                <ArrowUpRight size={16} />
              </span>
            </div>
          </div>
        </Link>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-brand-cream relative overflow-hidden">
      {/* Sticky top bar */}
      <div className="sticky top-0 z-20 bg-white/90 backdrop-blur-md border-b border-[#F0EBE0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-sm font-bold text-[#0A2240] hover:text-[#F6B828] transition-colors cursor-pointer"
          >
            <ArrowLeft size={18} />
            Back
          </button>
          <span className="text-[10px] font-black tracking-widest text-[#8A9EB4] uppercase">
            {collection.items.length} {collection.itemNoun} to explore
          </span>
        </div>
      </div>

      {/* Background decor */}
      <div className="absolute top-20 right-0 w-80 h-80 bg-[#F6B828]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-40 left-0 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 bg-amber-500/10 rounded-full px-4 py-1.5 mb-4">
            <HeroIcon className="w-4 h-4 text-amber-500" />
            <span className="text-xs font-black tracking-widest text-brand-blue uppercase">{collection.badgeLabel}</span>
          </div>

          <h1 className="font-brush text-5xl sm:text-6xl lg:text-7xl text-brand-blue tracking-wide leading-tight mb-4">
            {collection.titlePrefix} <span className="text-[#F6B828]">{collection.titleHighlight}</span>
          </h1>

          <p className="text-lg sm:text-xl text-[#4E637A] font-medium max-w-3xl mx-auto">
            {collection.subtitle}
          </p>

          <div className="flex flex-wrap justify-center gap-4 mt-6">
            <div className="bg-white rounded-full px-4 py-2 border border-[#F0EBE0] shadow-sm text-sm font-semibold text-brand-blue">
              ✨ {collection.items.length} {collection.itemNoun}
            </div>
            <div className="bg-white rounded-full px-4 py-2 border border-[#F0EBE0] shadow-sm text-sm font-semibold text-brand-blue">
              🏷️ {collection.categories.length} Categories
            </div>
          </div>
        </motion.div>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mb-8"
        >
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8A9EB4]" />
            <input
              type="text"
              placeholder={collection.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-[#E4DCB9] rounded-full pl-12 pr-10 py-3 text-sm font-semibold text-brand-blue focus:outline-none focus:border-[#F6B828] focus:ring-2 focus:ring-[#F6B828]/10 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8A9EB4] hover:text-[#F6B828] transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            )}
          </div>
        </motion.div>

        {/* Category chips — click a category to show only its section; ALL shows all */}
        <div className="flex flex-wrap justify-center gap-3 mb-4">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-5 py-2 rounded-full text-xs font-bold tracking-wide transition-all duration-200 cursor-pointer ${
              !selectedCategory
                ? "bg-brand-blue text-white shadow-md"
                : "bg-white border border-[#E4DCB9] text-[#4E637A] hover:border-brand-blue hover:text-brand-blue"
            }`}
          >
            ALL
          </button>
          {categoriesWithItems.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(isActive ? null : cat.id)}
                className={`px-5 py-2 rounded-full text-xs font-bold tracking-wide transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "bg-brand-blue text-white shadow-md"
                    : "bg-white border border-[#E4DCB9] text-[#4E637A] hover:border-brand-blue hover:text-brand-blue"
                }`}
              >
                {cat.label} · {cat.items.length}
              </button>
            );
          })}
        </div>

        {/* Results count */}
        <div className="flex justify-between items-center mb-6 px-1">
          <p className="text-sm font-semibold text-[#8A9EB4]">
            {activeCategory ? (
              <span className="text-brand-blue">
                {searchQuery.trim() ? filtered.length : activeCategory.items.length}{" "}
                {(searchQuery.trim() ? filtered.length : activeCategory.items.length) === 1
                  ? collection.itemNounSingular
                  : collection.itemNoun}{" "}
                in {activeCategory.label}
              </span>
            ) : isSectioned ? (
              <>
                {collection.items.length} {collection.itemNoun} across {categoriesWithItems.length} categories
              </>
            ) : (
              <>
                {filtered.length} {filtered.length === 1 ? collection.itemNounSingular : collection.itemNoun} found
              </>
            )}
          </p>
        </div>

        {/* Results */}
        {isSectioned && activeCategory ? (
          /* ─── SINGLE CATEGORY: only this category's section ─── */
          <div className="space-y-14">{renderSection(activeCategory)}</div>
        ) : isSectioned ? (
          /* ─── ALL SECTIONS: cards grouped under category headers ─── */
          <div className="space-y-14">
            {categoriesWithItems.map((cat) => renderSection(cat))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-[#F0EBE0] max-w-md mx-auto">
            <HeroIcon className="w-16 h-16 mx-auto text-[#E4DCB9] mb-4" />
            <h3 className="font-display font-bold text-xl text-brand-blue mb-2">Nothing Found</h3>
            <p className="text-sm text-[#4E637A] font-medium">
              {searchQuery ? "Try a different search term." : "Try a different category filter."}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((item, index) => renderCard(item, index))}
          </div>
        )}

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-br from-brand-blue to-[#1A3A5C] rounded-3xl p-8 sm:p-10 shadow-xl relative overflow-hidden">
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#F6B828]/10 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10 space-y-4">
              <h2 className="font-brush text-3xl sm:text-4xl text-white tracking-wide">
                One land. <span className="text-[#F6B828]">Endless wonders.</span>
              </h2>
              <p className="text-[#B5CADF] font-semibold text-sm max-w-md mx-auto">
                Which story will you explore next? Every card below began on soil of Bhārat.
              </p>
              <div className="flex flex-wrap justify-center gap-2 pt-2">
                {[...collection.items].sort(byName).map((item) => (
                  <Link
                    key={item.slug}
                    to={`/${collection.id}/${item.slug}`}
                    className="inline-flex items-center gap-1.5 bg-white/10 hover:bg-[#F6B828] hover:text-[#0A2240] text-white px-4 py-2 rounded-full text-xs font-bold transition-all duration-200"
                  >
                    <Users size={12} />
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
