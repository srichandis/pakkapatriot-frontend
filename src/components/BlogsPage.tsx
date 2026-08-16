/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { BookOpen, Search, X, Newspaper, ArrowRight } from "lucide-react";
import { WPPost } from "../types";
import { getCategoryBadgeClasses } from "./LatestStories";

interface BlogsPageProps {
  posts: WPPost[];
  loading: boolean;
  onPostClick: (post: WPPost) => void;
}

export default function BlogsPage({ posts, loading, onPostClick }: BlogsPageProps) {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = useMemo(() => {
    const seen = new Set<string>();
    const cats: string[] = [];
    posts.forEach((p) => {
      if (!seen.has(p.category)) {
        seen.add(p.category);
        cats.push(p.category);
      }
    });
    return cats;
  }, [posts]);

  const filteredPosts = useMemo(() => {
    let list = posts;
    if (selectedCategory) {
      list = list.filter((p) => p.category === selectedCategory);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.excerpt.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          (p.authorName ?? "").toLowerCase().includes(q)
      );
    }
    return list;
  }, [posts, selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-brand-cream relative">
      {/* Background decor */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#F6B828]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-40 left-0 w-80 h-80 bg-[#F6B828]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 relative z-10">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 bg-brand-blue/5 rounded-full px-4 py-1.5 mb-4">
            <Newspaper className="w-4 h-4 text-[#F6B828]" />
            <span className="text-xs font-black tracking-widest text-brand-blue uppercase">Stories from Bhārat</span>
          </div>
          <h1 className="font-brush text-5xl sm:text-6xl lg:text-7xl text-brand-blue tracking-wide leading-tight mb-4">
            All <span className="text-[#F6B828]">Stories</span>
          </h1>
          <p className="text-lg sm:text-xl text-[#4E637A] font-medium max-w-2xl mx-auto">
            Every blog post from the Pakka Patriot library — {posts.length} stories of history,
            culture, heroes, and the land we love.
          </p>
        </motion.div>

        {/* Search + filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.5 }}
          className="mb-10"
        >
          <div className="relative max-w-md mx-auto mb-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8A9EB4]" />
            <input
              type="text"
              placeholder="Search stories by title, category, or author..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-[#E4DCB9] rounded-full pl-12 pr-10 py-3 text-sm font-semibold text-brand-blue focus:outline-none focus:border-[#F6B828] focus:ring-2 focus:ring-[#F6B828]/10 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8A9EB4] hover:text-[#F6B828] transition-colors cursor-pointer"
                aria-label="Clear search"
              >
                <X size={18} />
              </button>
            )}
          </div>

          <div className="flex flex-wrap justify-center gap-2.5 select-none">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-4 py-2 rounded-full text-xs font-bold tracking-wide transition-all duration-200 cursor-pointer ${
                !selectedCategory
                  ? "bg-brand-blue text-white shadow-md"
                  : "bg-white border border-[#E4DCB9] text-[#4E637A] hover:border-brand-blue hover:text-brand-blue"
              }`}
            >
              ALL ({posts.length})
            </button>
            {categories.map((cat) => {
              const count = posts.filter((p) => p.category === cat).length;
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(isActive ? null : cat)}
                  className={`px-4 py-2 rounded-full text-xs font-bold tracking-wide transition-all duration-200 cursor-pointer ${
                    isActive
                      ? "bg-brand-blue text-white shadow-md"
                      : "bg-white border border-[#E4DCB9] text-[#4E637A] hover:border-brand-blue hover:text-brand-blue"
                  }`}
                >
                  {cat} ({count})
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Results count */}
        <div className="flex justify-between items-center mb-6 px-1">
          <p className="text-sm font-semibold text-[#8A9EB4]">
            {filteredPosts.length} {filteredPosts.length === 1 ? "story" : "stories"} found
            {selectedCategory && <span className="text-brand-blue"> in {selectedCategory}</span>}
          </p>
        </div>

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="bg-white rounded-3xl overflow-hidden border border-[#F0EBE0] shadow-sm animate-pulse">
                <div className="h-48 bg-[#E4DCB9]/30" />
                <div className="p-6 space-y-3">
                  <div className="h-6 w-20 bg-[#E4DCB9]/30 rounded-full" />
                  <div className="h-5 w-full bg-[#E4DCB9]/30 rounded" />
                  <div className="h-5 w-3/4 bg-[#E4DCB9]/30 rounded" />
                  <div className="h-4 w-full bg-[#E4DCB9]/30 rounded" />
                </div>
              </div>
            ))}
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-[#F0EBE0] max-w-md mx-auto">
            <BookOpen className="w-16 h-16 mx-auto text-[#E4DCB9] mb-4" />
            <h3 className="font-display font-bold text-xl text-brand-blue mb-2">No Stories Found</h3>
            <p className="text-sm text-[#4E637A] font-medium mb-6">
              Try a different search or category filter.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory(null);
              }}
              className="px-6 py-3 rounded-full bg-brand-blue text-white text-sm font-bold hover:bg-[#0A2240]/90 transition-colors cursor-pointer"
            >
              Show all stories
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredPosts.map((post, index) => {
              const badge = getCategoryBadgeClasses(post.category);
              return (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: (index % 12) * 0.04, duration: 0.4 }}
                  whileHover={{ y: -6 }}
                >
                  <div
                    onClick={() => onPostClick(post)}
                    className="group h-full bg-white rounded-3xl overflow-hidden border border-[#F0EBE0] hover:border-[#F6B828]/40 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col cursor-pointer"
                  >
                    <div className="relative h-48 sm:h-52 overflow-hidden bg-[#FAF6EC]">
                      <img
                        src={post.featuredImage}
                        alt={post.title}
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                    </div>
                    <div className="p-6 flex-grow flex flex-col items-start text-left">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-black tracking-wider uppercase mb-3 select-none ${badge.bg} ${badge.text}`}>
                        {post.category}
                      </span>
                      <h3 className="font-display font-extrabold text-md sm:text-lg text-[#0A2240] tracking-tight leading-snug mb-2 group-hover:text-[#F6B828] transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="font-sans text-xs sm:text-sm text-[#4E637A] font-medium leading-relaxed flex-grow line-clamp-3">
                        {post.excerpt}
                      </p>
                      <div className="w-full border-t border-[#F0EBE0]/80 pt-4 mt-4 flex justify-between items-center text-[11px] font-bold text-[#8A9EB4] uppercase tracking-wide font-sans">
                        <span>{post.authorName || "PATRIOT"}</span>
                        <span className="flex items-center gap-1">
                          {post.readTime || "3 MIN"}
                          <ArrowRight size={12} className="text-[#F6B828] group-hover:translate-x-0.5 transition-transform" />
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
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
          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center gap-2 bg-[#0A2240] hover:bg-[#1A3A5E] text-white px-8 py-4 rounded-xl text-md font-bold shadow-lg hover:shadow-xl transition-all duration-200 group cursor-pointer"
          >
            <BookOpen size={18} />
            Back to Home
            <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
          </button>
        </motion.div>
      </div>
    </div>
  );
}
