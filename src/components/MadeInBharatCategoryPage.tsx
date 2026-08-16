/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useMemo } from "react";
import { motion } from "motion/react";
import { ShoppingBag, ArrowUpRight, Tag, ArrowLeft, BadgeCheck, Check } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { WCProduct } from "../types";

interface MadeInBharatCategoryPageProps {
  products: WCProduct[];
  loading: boolean;
  onProductClick: (product: WCProduct) => void;
}

/** Category name -> url slug ("Tote Bags" -> "tote-bags"). */
export function categorySlug(category: string): string {
  return category.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

const CATEGORY_BLURBS: Record<string, string> = {
  "T-Shirts": "Everyday classics carrying the icons of Bhārat — soft cotton tees in six signature designs.",
  Hoodies: "Warm comfort with prints that travel with you — the same iconography, made for the cold.",
  Mugs: "Start every morning with Bhārat. Ceramic mugs printed with the monuments and heroes we love.",
  "Tote Bags": "Carry the story with you. Sturdy totes featuring the designs that make us proud.",
  Posters: "Frameworthy prints of the monuments, heroes, and symbols of Bhārat.",
  Stickers: "Slap a little Bhārat on your laptop and water bottle. Die-cut stickers in every design.",
  Notebooks: "Journal, sketch, and plan alongside the icons of Bhārat.",
  Caps: "Top off the look with the designs — printed caps for every patriot.",
};

const CATEGORY_ORDER = [
  "T-Shirts",
  "Hoodies",
  "Mugs",
  "Tote Bags",
  "Posters",
  "Stickers",
  "Notebooks",
  "Caps",
];

export default function MadeInBharatCategoryPage({ products, loading, onProductClick }: MadeInBharatCategoryPageProps) {
  const navigate = useNavigate();
  const { categorySlug: slug } = useParams<{ categorySlug: string }>();

  const categories = useMemo(() => {
    const seen = new Set<string>();
    const cats: string[] = [];
    CATEGORY_ORDER.forEach((name) => {
      if (!seen.has(name) && products.some((p) => p.category === name)) {
        seen.add(name);
        cats.push(name);
      }
    });
    products.forEach((p) => {
      if (!seen.has(p.category)) {
        seen.add(p.category);
        cats.push(p.category);
      }
    });
    return cats;
  }, [products]);

  const category = useMemo(() => {
    return categories.find((c) => categorySlug(c) === slug) ?? null;
  }, [categories, slug]);

  const categoryProducts = useMemo(() => {
    if (!category) return [];
    return products.filter((p) => p.category === category);
  }, [products, category]);

  const renderProductCard = (product: WCProduct) => (
    <div
      key={product.id}
      onClick={() => onProductClick(product)}
      className="group bg-white rounded-3xl overflow-hidden border border-[#F0EBE0] hover:border-[#F6B828]/40 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col cursor-pointer relative"
    >
      {product.onSale && (
        <div className="absolute top-4 left-4 z-10 bg-[#F6B828] text-white text-[10px] font-black px-3 py-1.5 rounded-full flex items-center gap-1 shadow-md select-none">
          <Tag size={10} fill="white" />
          SALE
        </div>
      )}
      <div className="relative h-52 sm:h-64 overflow-hidden bg-[#FAF6EC]">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
          referrerPolicy="no-referrer"
        />
      </div>
      <div className="p-5 flex-grow flex flex-col items-start text-left">
        <span className="text-[10px] font-black tracking-widest text-[#587760] uppercase mb-1 font-sans">
          {product.category}
        </span>
        <h3 className="font-display font-bold text-md text-[#0A2240] tracking-tight leading-snug mb-3 group-hover:text-[#F6B828] transition-colors line-clamp-2">
          {product.name}
        </h3>
        <div className="w-full mt-auto pt-3 border-t border-[#F0EBE0]/60 flex items-center justify-between">
          <div className="flex items-baseline gap-1.5 font-sans">
            <span className="font-display font-extrabold text-lg text-[#0A2240]">₹{product.price}</span>
            {product.onSale && (
              <span className="text-xs text-[#8A9EB4] line-through font-semibold">₹{product.regularPrice}</span>
            )}
          </div>
          <span className="w-9 h-9 bg-[#FCFAF5] border border-[#E4DCB9] group-hover:bg-[#F6B828] group-hover:border-[#F6B828] text-[#0A2240] group-hover:text-white rounded-full flex items-center justify-center transition-colors">
            <ArrowUpRight size={16} />
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-brand-cream relative">
      {/* Sticky top bar */}
      <div className="sticky top-0 z-20 bg-white/90 backdrop-blur-md border-b border-[#F0EBE0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <button
            onClick={() => navigate("/made-in-bharat")}
            className="flex items-center gap-2 text-sm font-bold text-[#0A2240] hover:text-[#F6B828] transition-colors cursor-pointer"
          >
            <ArrowLeft size={18} />
            All products
          </button>
          <span className="text-[10px] font-black tracking-widest text-[#8A9EB4] uppercase">
            {category ? `${categoryProducts.length} products` : "Category not found"}
          </span>
        </div>
      </div>

      {/* Background decor */}
      <div className="absolute top-20 right-0 w-80 h-80 bg-[#F6B828]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-40 left-0 w-64 h-64 bg-[#F6B828]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="bg-white rounded-3xl overflow-hidden border border-[#F0EBE0] shadow-sm animate-pulse">
                <div className="h-64 bg-[#E4DCB9]/30" />
                <div className="p-6 space-y-3">
                  <div className="h-4 w-20 bg-[#E4DCB9]/30 rounded" />
                  <div className="h-6 w-full bg-[#E4DCB9]/30 rounded" />
                  <div className="h-5 w-24 bg-[#E4DCB9]/30 rounded" />
                </div>
              </div>
            ))}
          </div>
        ) : !category ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-[#F0EBE0] max-w-md mx-auto">
            <ShoppingBag className="w-16 h-16 mx-auto text-[#E4DCB9] mb-4" />
            <h3 className="font-display font-bold text-xl text-brand-blue mb-2">Category not found</h3>
            <p className="text-sm text-[#4E637A] font-medium mb-6">That category doesn't exist in our store.</p>
            <button
              onClick={() => navigate("/made-in-bharat")}
              className="px-6 py-3 rounded-full bg-brand-blue text-white text-sm font-bold hover:bg-[#0A2240]/90 transition-colors cursor-pointer"
            >
              Browse all products
            </button>
          </div>
        ) : (
          <>
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-10"
            >
              <div className="inline-flex items-center gap-2 bg-brand-blue/5 rounded-full px-4 py-1.5 mb-4">
                <BadgeCheck className="w-4 h-4 text-green-600" />
                <span className="text-xs font-black tracking-widest text-brand-blue uppercase">Proudly of Bhārat</span>
              </div>
              <h1 className="font-brush text-5xl sm:text-6xl lg:text-7xl text-brand-blue tracking-wide leading-tight mb-4">
                {category}
              </h1>
              <p className="text-lg sm:text-xl text-[#4E637A] font-medium max-w-2xl mx-auto">
                {CATEGORY_BLURBS[category] ?? `Every design, printed on ${category.toLowerCase()}.`}
              </p>
            </motion.div>

            {/* Category nav */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.5 }}
              className="flex flex-wrap justify-center gap-3 mb-10"
            >
              <button
                onClick={() => navigate("/made-in-bharat")}
                className="px-5 py-2 rounded-full text-xs font-bold tracking-wide transition-all duration-200 cursor-pointer bg-white border border-[#E4DCB9] text-[#4E637A] hover:border-brand-blue hover:text-brand-blue"
              >
                ALL
              </button>
              {categories.map((cat) => {
                const isActive = cat === category;
                return (
                  <button
                    key={cat}
                    onClick={() => navigate(`/made-in-bharat/${categorySlug(cat)}`)}
                    className={`px-5 py-2 rounded-full text-xs font-bold tracking-wide transition-all duration-200 cursor-pointer ${
                      isActive
                        ? "bg-brand-blue text-white shadow-md"
                        : "bg-white border border-[#E4DCB9] text-[#4E637A] hover:border-brand-blue hover:text-brand-blue"
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </motion.div>

            {/* Products */}
            {categoryProducts.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-3xl border border-[#F0EBE0] max-w-md mx-auto">
                <ShoppingBag className="w-16 h-16 mx-auto text-[#E4DCB9] mb-4" />
                <h3 className="font-display font-bold text-xl text-brand-blue mb-2">No Products Yet</h3>
                <p className="text-sm text-[#4E637A] font-medium">
                  We're still adding products to this category. Check back soon!
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {categoryProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: (index % 8) * 0.05, duration: 0.4 }}
                    whileHover={{ y: -6 }}
                  >
                    {renderProductCard(product)}
                  </motion.div>
                ))}
              </div>
            )}

            {/* Other categories */}
            <div className="mt-16 pt-10 border-t border-[#F0EBE0]">
              <div className="flex items-center justify-center gap-2 mb-6">
                <Check className="w-5 h-5 text-[#587760]" />
                <h2 className="font-display font-bold text-2xl text-brand-blue">Explore other categories</h2>
              </div>
              <div className="flex flex-wrap justify-center gap-3">
                {categories
                  .filter((c) => c !== category)
                  .map((cat) => (
                    <button
                      key={cat}
                      onClick={() => navigate(`/made-in-bharat/${categorySlug(cat)}`)}
                      className="px-5 py-2 rounded-full text-xs font-bold tracking-wide transition-all duration-200 cursor-pointer bg-white border border-[#E4DCB9] text-[#4E637A] hover:border-brand-blue hover:text-brand-blue hover:text-brand-blue"
                    >
                      {cat}
                    </button>
                  ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
