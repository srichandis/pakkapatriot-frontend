/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * SearchPage — the site-wide search. Reads ?q= from the URL and returns
 * grouped matches from every corner of Pakka Patriot: the knowledge
 * collections (Ideas, Places, People, Culture, Create), the latest
 * stories, the merchandise store, and the games.
 */

import { useMemo } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Search, ArrowRight, X } from "lucide-react";
import { searchSite, SEARCH_KIND_META, SEARCH_KIND_ORDER, type SearchMatch } from "../services/searchSite";
import { WPPost, WCProduct } from "../types";

interface SearchPageProps {
  posts: WPPost[];
  products: WCProduct[];
  onProductClick: (product: WCProduct) => void;
}



export default function SearchPage({ posts, products, onProductClick }: SearchPageProps) {
  const navigate = useNavigate();
  const [params, setParams] = useSearchParams();
  const query = (params.get("q") ?? "").trim();

  // Local input state so typing feels instant; the URL stays the source of truth.
  const results = useMemo(() => searchSite(query, posts, products), [query, posts, products]);

  // Group by kind, preserving a sensible order.
  const groups = useMemo(() => {
    const map = new Map<string, SearchMatch[]>();
    for (const m of results) {
      if (!map.has(m.kind)) map.set(m.kind, []);
      map.get(m.kind)!.push(m);
    }
    return SEARCH_KIND_ORDER
      .filter((k) => map.has(k))
      .map((k) => ({
        kind: k,
        label: SEARCH_KIND_META[k]?.label ?? k,
        items: map.get(k)!,
      }));
  }, [results]);

  const total = results.length;

  const updateQuery = (value: string) => {
    if (value.trim()) {
      setParams({ q: value }, { replace: true });
    } else {
      setParams({}, { replace: true });
    }
  };

  return (
    <div className="bg-brand-cream min-h-screen">
      {/* HERO + SEARCH BOX */}
      <section className="relative bg-[#0A2240] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-[0.06] pointer-events-none select-none" aria-hidden="true">
          <div className="absolute top-8 left-8 w-40 h-40 border-t-4 border-r-4 border-white rounded-tr-full" />
          <div className="absolute bottom-6 right-10 w-56 h-56 border-b-4 border-l-4 border-white rounded-bl-full" />
          <div className="absolute top-1/3 right-1/4 w-24 h-24 border border-white rounded-full" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 text-center">
          <span className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs font-black tracking-[0.25em] uppercase text-[#F6B828] mb-3">
            <Search size={14} /> Search Pakka Patriot
          </span>
          <h1 className="font-brush text-4xl sm:text-6xl leading-tight tracking-wide">
            What are you <span className="text-[#F6B828]">looking for?</span>
          </h1>
          <form
            onSubmit={(e) => { e.preventDefault(); }}
            className="mt-8 max-w-2xl mx-auto"
          >
            <div className="relative">
              <Search size={20} className="absolute left-5 top-1/2 -translate-y-1/2 text-[#8A9EB4]" />
              <input
                autoFocus
                type="text"
                value={query}
                onChange={(e) => updateQuery(e.target.value)}
                placeholder="Try “Taj Mahal”, “zero”, “Bhagat Singh”, “chess”, “shampoo”…"
                className="w-full bg-white text-[#0A2240] pl-12 sm:pl-14 pr-12 py-4 rounded-2xl text-sm sm:text-base font-semibold shadow-xl focus:outline-none focus:ring-4 focus:ring-[#F6B828]/40 border border-transparent"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => updateQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8A9EB4] hover:text-[#F6B828] p-1 rounded-full transition-colors cursor-pointer"
                  aria-label="Clear search"
                >
                  <X size={18} />
                </button>
              )}
            </div>
            <p className="mt-3 text-xs text-[#8FB2D6] font-semibold">
              {query ? (
                <>Found <span className="text-[#F6B828] font-black">{total}</span> {total === 1 ? "result" : "results"} across the whole site</>
              ) : (
                "Search ideas, places, people, culture, creations, stories, merch & games"
              )}
            </p>
          </form>
        </div>
      </section>

      {/* RESULTS */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        {!query ? (
          <div className="text-center py-16">
            <div className="w-16 h-16 rounded-2xl bg-[#FAF6EC] border border-[#E4DCB9] flex items-center justify-center mx-auto mb-4">
              <Search size={28} className="text-[#C8C5B9]" />
            </div>
            <h2 className="font-display font-black text-xl text-[#0A2240]">Type to search the whole site</h2>
            <p className="text-sm text-[#4E637A] font-medium mt-1 max-w-md mx-auto">
              Every place, person, idea, tradition, creation, story, product and game on Pakka Patriot — in one box.
            </p>
            <div className="flex flex-wrap justify-center gap-2 mt-6">
              {["Taj Mahal", "Vivekananda", "Ayurveda", "Chess", "Rangoli", "Pachisi"].map((s) => (
                <button
                  key={s}
                  onClick={() => setParams({ q: s })}
                  className="text-xs font-bold text-[#0A2240] bg-white border border-[#E4DCB9] hover:border-[#F6B828] hover:bg-[#FEF5E0] px-4 py-2 rounded-full transition-all cursor-pointer"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        ) : total === 0 ? (
          <div className="text-center py-16">
            <div className="w-16 h-16 rounded-2xl bg-red-50 border border-red-100 flex items-center justify-center mx-auto mb-4">
              <Search size={28} className="text-red-300" />
            </div>
            <h2 className="font-display font-black text-xl text-[#0A2240]">No matches for “{query}”</h2>
            <p className="text-sm text-[#4E637A] font-medium mt-1 max-w-md mx-auto">
              Try a shorter word, a different spelling, or browse one of the collections below.
            </p>
            <div className="flex flex-wrap justify-center gap-2 mt-6">
              {["Places", "People", "Ideas", "Culture", "Create", "Stories", "Games"].map((s) => (
                <Link
                  key={s}
                  to={s.toLowerCase() === "stories" ? "/stories" : s.toLowerCase() === "games" ? "/play" : `/${s.toLowerCase()}`}
                  className="text-xs font-bold text-[#0A2240] bg-white border border-[#E4DCB9] hover:border-[#F6B828] hover:bg-[#FEF5E0] px-4 py-2 rounded-full transition-all"
                >
                  Browse {s}
                </Link>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-10">
            {groups.map((group) => {
              const Icon = group.items[0].icon;
              return (
                <div key={group.kind}>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="w-8 h-8 rounded-lg bg-[#0A2240] text-[#F6B828] flex items-center justify-center">
                      <Icon size={16} />
                    </span>
                    <h2 className="font-display font-black text-lg text-[#0A2240] uppercase tracking-wide">{group.label}</h2>
                    <span className="text-[11px] font-black text-[#587760] bg-[#EAF1EB] px-2.5 py-1 rounded-full">
                      {group.items.length}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {group.items.slice(0, 8).map((m, i) => (
                      m.product ? (
                        <button
                          key={`${m.kind}-${i}`}
                          onClick={() => onProductClick(m.product!)}
                          className="group bg-white rounded-2xl border border-[#F0EBE0] hover:border-[#F6B828]/40 shadow-sm hover:shadow-lg transition-all duration-300 p-4 flex gap-4 text-left cursor-pointer"
                        >
                          <div className="w-16 h-16 rounded-xl overflow-hidden bg-[#FAF6EC] flex-shrink-0">
                            <img src={m.product.imageUrl} alt={m.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" referrerPolicy="no-referrer" />
                          </div>
                          <ResultBody m={m} />
                        </button>
                      ) : (
                        <Link
                          key={`${m.kind}-${i}`}
                          to={m.to!}
                          className="group bg-white rounded-2xl border border-[#F0EBE0] hover:border-[#F6B828]/40 shadow-sm hover:shadow-lg transition-all duration-300 p-4 flex gap-4 text-left"
                        >
                          <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${m.accent} flex items-center justify-center flex-shrink-0`}>
                            <m.icon size={24} className="text-white" />
                          </div>
                          <ResultBody m={m} />
                        </Link>
                      )
                    ))}
                  </div>
                </div>
              );
            })}

            {/* Footer nav */}
            <div className="flex flex-wrap items-center justify-center gap-2 pt-4 border-t border-[#F0EBE0]">
              <span className="text-xs font-bold text-[#8A9EB4] uppercase tracking-widest">Didn't find it? Browse</span>
              {["/ideas", "/places", "/people", "/culture", "/create", "/stories", "/play", "/made-in-bharat"].map((p) => (
                <button
                  key={p}
                  onClick={() => navigate(p)}
                  className="inline-flex items-center gap-1 text-xs font-bold text-[#0A2240] bg-white border border-[#E4DCB9] hover:border-[#F6B828] hover:bg-[#FEF5E0] px-3.5 py-1.5 rounded-full transition-all cursor-pointer"
                >
                  {p === "/made-in-bharat" ? "Store" : p === "/play" ? "Games" : p.slice(1).replace(/^\w/, (c) => c.toUpperCase())}
                  <ArrowRight size={12} />
                </button>
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

function ResultBody({ m }: { m: SearchMatch }) {
  return (
    <div className="flex-grow min-w-0">
      <div className="flex items-center gap-2">
        {m.category && (
          <span className="text-[9px] font-black tracking-widest text-[#587760] uppercase bg-[#EAF1EB] px-2 py-0.5 rounded-full flex-shrink-0">
            {m.category}
          </span>
        )}
        <ArrowRight size={12} className="text-[#F6B828] opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
      </div>
      <h3 className="font-display font-bold text-sm text-[#0A2240] group-hover:text-[#F6B828] transition-colors leading-snug mt-1 line-clamp-2">
        {m.title}
      </h3>
      <p className="text-[11px] text-[#8A9EB4] font-semibold mt-0.5">{m.subtitle}</p>
      <p className="text-xs text-[#4E637A] font-medium leading-relaxed mt-1 line-clamp-2">{m.snippet}</p>
    </div>
  );
}
