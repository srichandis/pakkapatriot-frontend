/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { X, Calendar, User, Clock, ArrowRight, ExternalLink, ShoppingBag, Check, Minus, Plus } from "lucide-react";
import { WPPost, Product } from "../types";
import { getCategoryBadgeClasses } from "./LatestStories";
import React, { useState, useRef } from "react";
import { useCart } from "./CartContext";

/** Approximate hex for each t-shirt colour (used for swatch dots). */
const COLOUR_HEX: Record<string, string> = {
  white: "#F7F5EF",
  sand: "#E5D6BB",
  terracotta: "#C1683F",
  "sage green": "#8A9A7B",
  olive: "#6B7343",
  "navy blue": "#2B3A67",
  charcoal: "#33312E",
};

/** Derive a human colour name from an image path like /storage/product/1/tajmahal_sage_green.png */
function colourLabelFromPath(path: string): string {
  const base = path.split("/").pop() || path;
  const name = base.replace(/\.[a-z0-9]+$/i, "").toLowerCase();
  const known: Array<[string, string]> = [
    ["navy_blue", "Navy Blue"],
    ["navy", "Navy Blue"],
    ["sage_green", "Sage Green"],
    ["terracotta", "Terracotta"],
    ["charcoal", "Charcoal"],
    ["olive", "Olive"],
    ["sand", "Sand"],
    ["white", "White"],
  ];
  for (const [token, label] of known) {
    if (name.includes(token)) return label;
  }
  // Fallback: last underscore segment, humanised.
  const last = name.split("_").pop() || name;
  return last.charAt(0).toUpperCase() + last.slice(1);
}

function colourHex(label: string): string {
  return COLOUR_HEX[label.toLowerCase()] || "#C8C5B9";
}

interface DetailModalProps {
  post: WPPost | null;
  product: Product | null;
  onClose: () => void;
}

export default function DetailModal({ post, product, onClose }: DetailModalProps) {
  const { addItem, setOpen } = useCart();
  const [addedToCart, setAddedToCart] = useState(false);
  const [quantity, setQuantity] = useState(1);
  // Selected colour variant (index into product.images). Reset whenever a new product opens.
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const lastProductIdRef = useRef<number | null>(null);

  if (!post && !product) return null;

  const productImages = product?.images && product.images.length > 0 ? product.images : product ? [product.imageUrl] : [];

  // Clamp the selected index to the current product's image list and reset it
  // when a different product is shown, so the swatch highlight can't desync.
  if (product && lastProductIdRef.current !== product.id) {
    lastProductIdRef.current = product.id;
    setSelectedImageIndex(0);
  }
  const safeIndex = Math.min(selectedImageIndex, Math.max(0, productImages.length - 1));
  const activeImage = productImages[safeIndex] ?? product?.imageUrl ?? "";

  const handleAddToCartClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (product) {
      addItem(product, quantity);
      setAddedToCart(true);
      setTimeout(() => {
        setAddedToCart(false);
      }, 2500);
    }
  };

  const handleBuyNow = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (product) {
      addItem(product, quantity);
      setOpen(true);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div
        className="relative bg-brand-cream max-w-3xl w-full rounded-3xl overflow-hidden shadow-2xl border border-[#F0EBE0] max-h-[90vh] flex flex-col animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 bg-black/60 hover:bg-black/80 text-white p-2.5 rounded-full transition-all duration-200 cursor-pointer"
          title="Close Modal"
        >
          <X size={18} />
        </button>

        {/* Modal Scrollable Content */}
        <div className="overflow-y-auto flex-grow">
          
          {/* VIEWING A WORDPRESS STORY */}
          {post && (
            <div>
              {/* Cover Image */}
              <div className="relative h-64 sm:h-80 w-full overflow-hidden bg-gray-100">
                <img
                  src={post.featuredImage}
                  alt={post.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                
                {/* Category Badge */}
                <div className="absolute bottom-6 left-6 flex items-center gap-3">
                  <span className={`px-4 py-1.5 rounded-full text-xs font-black tracking-wider uppercase select-none ${getCategoryBadgeClasses(post.category).bg} ${getCategoryBadgeClasses(post.category).text}`}>
                    {post.category}
                  </span>
                </div>
              </div>

              {/* Story Details */}
              <div className="p-6 sm:p-8 space-y-6">
                <div className="space-y-3 text-left">
                  <h2 className="font-display font-black text-2xl sm:text-3xl text-[#0A2240] tracking-tight leading-tight">
                    {post.title}
                  </h2>
                  
                  {/* Metadata */}
                  <div className="flex flex-wrap gap-4 text-xs font-bold text-[#8A9EB4] uppercase tracking-wider font-sans border-b border-[#F0EBE0] pb-4">
                    <div className="flex items-center gap-1.5">
                      <User size={14} />
                      <span>{post.authorName || "Pakka Patriot"}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Calendar size={14} />
                      <span>{post.date}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock size={14} />
                      <span>{post.readTime || "4 min read"}</span>
                    </div>
                  </div>
                </div>

                {/* Excerpt */}
                <p className="text-md font-semibold text-[#2F445A] leading-relaxed italic border-l-4 border-[#F6B828] pl-4 text-left">
                  {post.excerpt}
                </p>

                {/* Article Body */}
                <div className="text-sm sm:text-md text-[#2F445A] leading-relaxed font-sans text-left space-y-4">
                  {/* Clean paragraphs for readability */}
                  {post.content ? (
                    <div
                      className="space-y-4 wp-article-content"
                      dangerouslySetInnerHTML={{ __html: post.content }}
                    />
                  ) : (
                    <p>This article is a deep-dive story exploring Bhārat's rich history, traditions, and culture. Read the full post on pakkapatriot.com using the link below.</p>
                  )}
                </div>

                {/* Read External CTA */}
                <div className="pt-6 border-t border-[#F0EBE0] flex flex-col sm:flex-row justify-between items-center gap-4">
                  <span className="text-xs font-bold text-[#8A9EB4] uppercase tracking-wide">
                    Source: Official PakkaPatriot.com
                  </span>
                  <a
                    href={post.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto bg-[#F6B828] hover:bg-[#DAA520] text-white px-6 py-3 rounded-xl text-sm font-bold shadow hover:shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer select-none"
                  >
                    Read original post
                    <ExternalLink size={14} />
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* VIEWING A PRODUCT */}
          {product && (
            <div className="flex flex-col md:flex-row">
              {/* Product Left Column: Image */}
              <div className="w-full md:w-1/2 h-64 sm:h-80 md:h-[450px] relative overflow-hidden bg-[#FAF6EC]">
                <img
                  key={activeImage}
                  src={activeImage}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                {product.onSale && (
                  <div className="absolute top-4 left-4 bg-[#F6B828] text-white text-xs font-black px-4 py-1.5 rounded-full shadow-md select-none">
                    SALE ACTIVE
                  </div>
                )}

                {/* Colour swatches */}
                {productImages.length > 1 && (
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-white/90 backdrop-blur rounded-full px-4 py-2 shadow-lg border border-[#F0EBE0]">
                    {productImages.map((img, i) => {
                      const label = colourLabelFromPath(img);
                      const active = i === selectedImageIndex;
                      return (
                        <button
                          key={img}
                          type="button"
                          onClick={() => setSelectedImageIndex(i)}
                          title={label}
                          aria-label={`${label} colour`}
                          className={`w-7 h-7 rounded-full border-2 transition-all duration-200 cursor-pointer ${
                            active ? "border-[#F6B828] scale-110 ring-2 ring-[#F6B828]/30" : "border-[#E4DCB9] hover:border-[#8A9EB4]"
                          }`}
                          style={{ backgroundColor: colourHex(label) }}
                        />
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Product Right Column: Info */}
              <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col text-left space-y-5 justify-between">
                <div>
                  <span className="text-[10px] font-black tracking-widest text-[#587760] uppercase mb-1 block">
                    {product.category}
                  </span>
                  
                  <h2 className="font-display font-black text-xl sm:text-2xl text-[#0A2240] tracking-tight leading-tight">
                    {product.name}
                  </h2>

                  {productImages.length > 1 && (
                    <p className="text-[11px] font-black tracking-widest text-[#587760] uppercase mt-1 font-sans">
                      Colour: <span className="text-[#F6B828]">{colourLabelFromPath(productImages[safeIndex] ?? product.imageUrl)}</span>
                    </p>
                  )}

                  {/* Pricing */}
                  <div className="flex items-baseline gap-2 mt-3 font-sans border-b border-[#F0EBE0] pb-4">
                    <span className="font-display font-black text-2xl text-[#F6B828]">
                      ₹{product.price}
                    </span>
                    {product.onSale && (
                      <span className="text-sm text-[#8A9EB4] line-through font-bold">
                        ₹{product.regularPrice}
                      </span>
                    )}
                  </div>
                </div>

                <div className="space-y-3 flex-grow py-3">
                  <h4 className="text-xs font-black tracking-wider text-[#0A2240] uppercase">
                    Description
                  </h4>
                  <p className="text-xs sm:text-sm text-[#4E637A] font-medium leading-relaxed font-sans">
                    {product.description || product.shortDescription || "Premium quality handcrafted merchandise designed to instill a proud patriot vibe. Perfect for daily wear, gifting, or study spaces."}
                  </p>
                </div>

                {/* Quantity selector */}
                <div className="flex items-center gap-3 pt-2 pb-1">
                  <span className="text-xs font-black text-[#0A2240] uppercase tracking-wider">Qty:</span>
                  <div className="flex items-center border border-[#DCD3B5] rounded-xl overflow-hidden bg-white">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3 py-2 text-sm font-bold hover:bg-[#FAF6EC] text-[#0A2240] transition-colors cursor-pointer"
                      disabled={quantity <= 1}
                    >
                      <Minus size={14} />
                    </button>
                    <span className="px-4 py-2 text-sm font-black text-[#0A2240] min-w-[32px] text-center border-x border-[#DCD3B5] select-none">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-3 py-2 text-sm font-bold hover:bg-[#FAF6EC] text-[#0A2240] transition-colors cursor-pointer"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>

                {/* Checkout CTA row */}
                <div className="space-y-3 pt-4 border-t border-[#F0EBE0]">
                  <div className="flex gap-2 w-full">
                    {/* Add to Cart */}
                    <button
                      onClick={handleAddToCartClick}
                      className={`flex-grow py-3.5 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-1.5 select-none cursor-pointer border ${
                        addedToCart
                          ? "bg-green-500 border-green-500 text-white shadow-md animate-pulse"
                          : "bg-white hover:bg-[#FAF6EC] border-[#DCD3B5] text-[#0A2240]"
                      }`}
                    >
                      {addedToCart ? (
                        <>
                          <Check size={16} />
                          ADDED ×{quantity}!
                        </>
                      ) : (
                        <>
                          <ShoppingBag size={16} />
                          ADD TO BAG — ₹{parseInt(product.price) * quantity}
                        </>
                      )}
                    </button>

                    {/* Buy Now — adds to cart & opens drawer */}
                    <button
                      onClick={handleBuyNow}
                      className="bg-[#F6B828] hover:bg-[#DAA520] text-white px-5 py-3.5 rounded-xl font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-1.5 select-none cursor-pointer flex-shrink-0"
                    >
                      BUY NOW
                      <ArrowRight size={16} />
                    </button>
                  </div>
                  
                  <span className="text-[10px] text-center block text-[#8A9EB4] font-bold uppercase tracking-wider font-sans">
                    Stock status: {product.inStock ? "✅ In Stock" : "❌ Out of Stock"}
                  </span>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
