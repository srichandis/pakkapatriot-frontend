/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useMemo } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { motion } from "motion/react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Calendar,
  Landmark,
  MapPin,
  Sparkles,
  Quote,
  CheckCircle2,
  Trophy,
} from "lucide-react";
import { getItemBySlug, byName } from "../data/collections";
import type { Collection } from "../data/collections";

interface CollectionDetailPageProps {
  collection: Collection;
}

export default function CollectionDetailPage({ collection }: CollectionDetailPageProps) {
  const navigate = useNavigate();
  const { slug } = useParams<{ slug: string }>();
  const item = slug ? getItemBySlug(collection, slug) : undefined;

  // Related items: same category first, then others — each group alphabetical
  const related = useMemo(() => {
    if (!item) return [];
    const sameCategory = collection.items
      .filter((i) => i.slug !== item.slug && i.category === item.category)
      .sort(byName);
    const others = collection.items
      .filter((i) => i.slug !== item.slug && i.category !== item.category)
      .sort(byName);
    return [...sameCategory, ...others].slice(0, 3);
  }, [item, collection.items]);

  const HeroIcon = collection.heroIcon;

  if (!item) {
    return (
      <div className="min-h-screen bg-brand-cream flex items-center justify-center p-8">
        <div className="text-center max-w-md">
          <HeroIcon className="w-16 h-16 mx-auto text-[#E4DCB9] mb-4" />
          <h2 className="font-display font-bold text-2xl text-[#0A2240] mb-2">Not Found</h2>
          <p className="text-sm text-[#2F445A] mb-6">
            This story could not be loaded. It may have been removed or the link is invalid.
          </p>
          <button
            onClick={() => navigate(`/${collection.id}`)}
            className="inline-flex items-center gap-2 bg-[#F6B828] hover:bg-[#DAA520] text-white px-6 py-3 rounded-xl text-sm font-bold transition-all cursor-pointer"
          >
            <ArrowLeft size={16} />
            Browse All {collection.itemNoun}
          </button>
        </div>
      </div>
    );
  }

  const Icon = item.icon;

  return (
    <div className="min-h-screen bg-brand-cream relative overflow-hidden">
      {/* Sticky back bar */}
      <div className="sticky top-0 z-20 bg-white/90 backdrop-blur-md border-b border-[#F0EBE0]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-sm font-bold text-[#0A2240] hover:text-[#F6B828] transition-colors cursor-pointer"
          >
            <ArrowLeft size={18} />
            Back
          </button>
          <span className="text-[10px] font-black tracking-widest text-[#8A9EB4] uppercase">
            Pakka Patriot · {collection.navLabel}
          </span>
        </div>
      </div>

      {/* Hero */}
      <div className={`relative bg-gradient-to-br ${item.accent} text-white overflow-hidden`}>
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/10 rounded-full pointer-events-none" />
        <div className="absolute top-10 right-40 w-6 h-6 bg-white/20 rounded-full pointer-events-none" />
        <div className="absolute bottom-16 left-1/4 w-3 h-3 bg-white/20 rounded-full pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-black/10 rounded-full pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-8 py-12 sm:py-16 relative z-10 text-left">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex items-center gap-2 mb-6">
              <span className="px-3 py-1 rounded-full text-[10px] font-black tracking-wider uppercase bg-white/20 text-white backdrop-blur-sm select-none">
                {item.category}
              </span>
              <span className="px-3 py-1 rounded-full text-[10px] font-black tracking-wider uppercase bg-white/20 text-white backdrop-blur-sm select-none">
                {collection.badgeLabel}
              </span>
            </div>

            <div className="flex items-center gap-4 sm:gap-6">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/15 backdrop-blur-sm rounded-3xl flex items-center justify-center shadow-inner shrink-0">
                <Icon size={36} className="sm:hidden" />
                <Icon size={44} className="hidden sm:block" />
              </div>
              <div>
                <h1 className="font-display font-black text-3xl sm:text-5xl tracking-tight leading-tight">
                  {item.name}
                </h1>
                <p className="text-white/80 font-semibold text-base sm:text-lg mt-1">
                  {item.nativeName}
                </p>
              </div>
            </div>

            <p className="text-white/90 text-lg sm:text-xl font-medium mt-6 max-w-2xl leading-relaxed">
              {item.tagline}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Key facts strip */}
      <div className="max-w-5xl mx-auto px-4 sm:px-8 -mt-7 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.5 }}
          className="bg-white rounded-3xl border border-[#F0EBE0] shadow-lg p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {[
            { icon: Calendar, label: collection.eraLabel, value: item.era },
            { icon: Landmark, label: collection.attributionLabel, value: item.attribution },
            { icon: MapPin, label: collection.regionLabel, value: item.region },
            { icon: Sparkles, label: collection.categoryLabel, value: item.category },
          ].map((f) => {
            const FIcon = f.icon;
            return (
              <div key={f.label} className="flex items-start gap-3 text-left">
                <div className={`p-2.5 rounded-xl ${item.softAccent} shrink-0`}>
                  <FIcon size={18} />
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] font-black tracking-widest text-[#8A9EB4] uppercase">{f.label}</p>
                  <p className="text-sm font-bold text-[#0A2240] mt-0.5 leading-snug">{f.value}</p>
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-8 py-10 sm:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-start">
          {/* Main column */}
          <div className="lg:col-span-2 space-y-10">
            {/* Quote */}
            {item.quote && item.quoteSource && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="relative bg-[#FAF6EC] border-l-4 border-[#F6B828] rounded-r-2xl p-6 sm:p-8"
              >
                <Quote className="absolute top-5 right-5 w-8 h-8 text-[#F6B828]/30" />
                <p className="font-display font-bold text-lg sm:text-xl text-[#0A2240] italic leading-relaxed">
                  “{item.quote}”
                </p>
                <p className="text-xs font-black tracking-widest text-[#8A9EB4] uppercase mt-3">
                  — {item.quoteSource}
                </p>
              </motion.div>
            )}

            {/* Map — places with coordinates get an embedded map */}
            {item.latitude && item.longitude && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="overflow-hidden rounded-3xl border border-[#F0EBE0] bg-white shadow-sm"
              >
                <iframe
                  title={`Map of ${item.name}`}
                  src={`https://maps.google.com/maps?q=${item.latitude},${item.longitude}&z=12&output=embed`}
                  className="w-full h-64 sm:h-80 border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </motion.div>
            )}

            {/* Overview */}
            <div className="space-y-5">
              <h2 className="font-display font-black text-2xl sm:text-3xl text-[#0A2240] tracking-tight">
                The <span className="text-[#F6B828]">Story</span>
              </h2>
              {item.overview.map((para, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05, duration: 0.4 }}
                  className="text-[#2F445A] leading-relaxed text-[15px] sm:text-base"
                >
                  {para}
                </motion.p>
              ))}
            </div>

            {/* Core ideas */}
            <div>
              <h2 className="font-display font-black text-2xl sm:text-3xl text-[#0A2240] tracking-tight mb-5">
                Core <span className="text-[#F6B828]">Ideas</span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {item.coreIdeas.map((idea, i) => (
                  <motion.div
                    key={idea.title}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06, duration: 0.4 }}
                    className="bg-white rounded-2xl border border-[#F0EBE0] p-5 hover:border-[#F6B828]/40 hover:shadow-md transition-all duration-300"
                  >
                    <div className="flex items-start gap-3">
                      <CheckCircle2 size={18} className={`${item.iconColor} mt-0.5 shrink-0`} />
                      <div>
                        <h3 className="font-display font-bold text-sm text-[#0A2240] mb-1">{idea.title}</h3>
                        <p className="text-xs text-[#4E637A] font-medium leading-relaxed">{idea.text}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Side column */}
          <div className="space-y-6 lg:sticky lg:top-24">
            {/* Legacy */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-br from-[#0A2240] to-[#1A3A5C] rounded-3xl p-6 text-white shadow-xl relative overflow-hidden"
            >
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#F6B828]/10 rounded-full pointer-events-none" />
              <div className="relative">
                <div className="w-11 h-11 bg-[#F6B828] rounded-2xl flex items-center justify-center mb-4">
                  <Trophy size={20} className="text-[#0A2240]" />
                </div>
                <h3 className="font-display font-black text-lg tracking-tight mb-2">
                  Why it matters <span className="text-[#F6B828]">today</span>
                </h3>
                <p className="text-sm text-[#B5CADF] font-medium leading-relaxed">{item.legacy}</p>
              </div>
            </motion.div>

            {/* Related items */}
            <div className="bg-white rounded-3xl border border-[#F0EBE0] p-6">
              <h3 className="font-display font-black text-base text-[#0A2240] tracking-tight mb-4">
                Explore more {collection.itemNoun}
              </h3>
              <div className="space-y-3">
                {related.map((r) => {
                  const RIcon = r.icon;
                  return (
                    <Link
                      key={r.slug}
                      to={`/${collection.id}/${r.slug}`}
                      className="group flex items-center gap-3 p-3 rounded-2xl border border-transparent hover:border-[#F6B828]/40 hover:bg-[#FCFAF5] transition-all duration-200"
                    >
                      <div className={`w-10 h-10 bg-gradient-to-br ${r.accent} rounded-xl flex items-center justify-center text-white shrink-0`}>
                        <RIcon size={18} />
                      </div>
                      <div className="min-w-0 flex-grow text-left">
                        <p className="font-display font-bold text-sm text-[#0A2240] truncate group-hover:text-[#F6B828] transition-colors">
                          {r.name}
                        </p>
                        <p className="text-[10px] font-black tracking-widest text-[#8A9EB4] uppercase">
                          {r.category}
                        </p>
                      </div>
                      <ArrowUpRight size={16} className="text-[#8A9EB4] group-hover:text-[#F6B828] transition-colors shrink-0" />
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom navigation */}
        <div className="pt-10 mt-4 border-t border-[#F0EBE0] flex flex-col sm:flex-row justify-between items-center gap-4">
          <button
            onClick={() => navigate(`/${collection.id}`)}
            className="flex items-center gap-2 text-sm font-bold text-[#0A2240] hover:text-[#F6B828] transition-colors cursor-pointer"
          >
            <ArrowLeft size={16} />
            All {collection.itemNoun}
          </button>

          {related[0] && (
            <Link
              to={`/${collection.id}/${related[0].slug}`}
              className="inline-flex items-center gap-2 bg-[#F6B828] hover:bg-[#DAA520] text-white px-6 py-3 rounded-full text-sm font-bold shadow-md hover:shadow-lg transition-all duration-200 group cursor-pointer"
            >
              Next: {related[0].name}
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
