/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * CREATE activity detail page — one page per maker activity
 * (/create/activity/:slug), celebrating what that craft is best known for.
 */

import React from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowLeft, ArrowRight, Lightbulb, Sparkles, Compass } from "lucide-react";
import { getActivityBySlug } from "../data/createActivities";

export default function CreateActivityPage() {
  const { slug } = useParams<{ slug: string }>();
  const activity = slug ? getActivityBySlug(slug) : undefined;

  if (!activity) {
    return (
      <div className="min-h-[60vh] bg-brand-cream flex flex-col items-center justify-center px-6 text-center">
        <span className="text-6xl" aria-hidden="true">🧭</span>
        <h1 className="font-display font-black text-2xl text-[#0A2240] mt-4">
          This activity is still being crafted
        </h1>
        <p className="text-sm text-[#4E637A] font-medium mt-2 max-w-sm">
          We couldn't find that maker activity. Head back to the create space and
          pick another one!
        </p>
        <Link
          to="/create"
          className="mt-6 inline-flex items-center gap-1.5 bg-[#0A2240] hover:bg-[#1F3D5E] text-white px-6 py-3 rounded-full font-black text-sm shadow-lg transition-all"
        >
          <ArrowLeft size={16} /> Back to Create
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-cream font-sans">
      {/* ============================================================ */}
      {/* HERO                                                         */}
      {/* ============================================================ */}
      <section className={`relative bg-gradient-to-br ${activity.heroAccent} text-white overflow-hidden`}>
        {/* decorative shapes */}
        <div className="absolute inset-0 opacity-[0.10] pointer-events-none select-none" aria-hidden="true">
          <div className="absolute top-8 left-8 w-40 h-40 border-t-4 border-r-4 border-white rounded-tr-full" />
          <div className="absolute bottom-6 right-10 w-56 h-56 border-b-4 border-l-4 border-white rounded-bl-full" />
          <div className="absolute top-1/3 right-1/4 w-24 h-24 border border-white rounded-full" />
          <Sparkles size={40} className="absolute top-16 right-[18%]" />
          <Sparkles size={24} className="absolute bottom-16 left-[12%]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <Link
            to="/create"
            className="inline-flex items-center gap-1.5 text-[11px] font-black tracking-widest uppercase text-white/80 hover:text-white transition-colors mb-8"
          >
            <ArrowLeft size={14} /> Back to Create
          </Link>

          <div className="flex flex-col sm:flex-row items-start gap-6 sm:gap-8">
            {/* emoji tile */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: -8 }}
              animate={{ opacity: 1, scale: 1, rotate: -4 }}
              transition={{ type: "spring", stiffness: 220, damping: 16 }}
              className={`w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-gradient-to-br ${activity.tile} flex items-center justify-center text-6xl shadow-2xl flex-shrink-0 border-4 border-white/40`}
            >
              <span aria-hidden="true">{activity.emoji}</span>
            </motion.div>

            <div className="min-w-0">
              <span className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs font-black tracking-[0.3em] uppercase bg-white/20 backdrop-blur-sm border border-white/30 px-4 py-1.5 rounded-full">
                <Sparkles size={13} /> Maker Activity · {activity.badge}
              </span>
              <h1 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl tracking-tight mt-4">
                {activity.title}
              </h1>
              <p className="mt-3 max-w-2xl text-sm sm:text-base text-white/90 font-semibold leading-relaxed">
                {activity.tagline}
              </p>
            </div>
          </div>

          {/* what is it */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-8 max-w-3xl text-sm sm:text-base text-white/85 font-medium leading-relaxed bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-5"
          >
            {activity.whatIs}
          </motion.p>
        </div>
      </section>

      {/* ============================================================ */}
      {/* BEST KNOWN FOR                                               */}
      {/* ============================================================ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="max-w-2xl">
          <span className="text-[10px] font-black tracking-[0.3em] uppercase text-[#F97316]">
            Best known for
          </span>
          <h2 className="font-display font-black text-2xl sm:text-3xl text-[#0A2240] mt-1">
            Bhārat is famous for this — and so can you be
          </h2>
          <p className="text-sm text-[#4E637A] font-medium mt-2">
            Every great craft has a story. These are the things {activity.title.toLowerCase()} is
            best known for across Bhārat's heritage.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {activity.knownFor.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.05, duration: 0.35 }}
              className="group bg-white rounded-3xl border border-[#F0EBE0] p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${activity.tile} flex items-center justify-center text-3xl shadow-md group-hover:scale-110 group-hover:-rotate-6 transition-transform`}>
                <span aria-hidden="true">{item.emoji}</span>
              </div>
              <h3 className="font-display font-black text-lg text-[#0A2240] mt-4">
                {item.title}
              </h3>
              <p className="text-sm text-[#4E637A] font-medium leading-relaxed mt-1.5">
                {item.text}
              </p>
            </motion.div>
          ))}

          {/* try-this card fills the grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ delay: 0.2, duration: 0.35 }}
            className="bg-[#FEF5E0] border-2 border-dashed border-[#E4D9A8] rounded-3xl p-6 flex flex-col shadow-sm"
          >
            <div className="w-14 h-14 rounded-2xl bg-[#0A2240] text-[#F6B828] flex items-center justify-center shadow-md">
              <Lightbulb size={26} />
            </div>
            <span className="text-[10px] font-black tracking-[0.25em] uppercase text-[#B45309] mt-4">
              ⚡ Try this at home
            </span>
            <h3 className="font-display font-black text-lg text-[#0A2240] mt-1">
              {activity.tryThis.title}
            </h3>
            <p className="text-sm text-[#4E637A] font-medium leading-relaxed mt-1.5 flex-grow">
              {activity.tryThis.text}
            </p>
            <span className="mt-4 text-[11px] font-black text-[#587760]">
              No fancy materials needed — just you and your imagination.
            </span>
          </motion.div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* KEEP EXPLORING + CTA                                         */}
      {/* ============================================================ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-14">
        <div className="bg-white border border-[#F0EBE0] rounded-3xl p-6 sm:p-8 shadow-sm">
          <div className="flex items-center gap-2">
            <Compass size={18} className="text-[#F6B828]" />
            <span className="text-[10px] font-black tracking-[0.3em] uppercase text-[#0A2240]">
              Keep exploring
            </span>
          </div>
          <p className="text-sm text-[#4E637A] font-medium mt-1.5">
            Love {activity.title.toLowerCase()}? Go deeper with these Pakka Patriot pages.
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            {activity.related.map((r) => (
              <Link
                key={r.path}
                to={r.path}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0A2240] bg-[#FAF6EC] border border-[#E4DCB9] px-4 py-2.5 rounded-full hover:bg-[#0A2240] hover:text-white hover:border-[#0A2240] transition-all"
              >
                {r.label} <ArrowRight size={13} />
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link
            to="/create"
            className={`inline-flex items-center gap-2 text-white px-8 py-4 rounded-full font-black text-sm shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all ${activity.button}`}
          >
            <span aria-hidden="true">{activity.emoji}</span> More things to create
          </Link>
        </div>
      </section>
    </div>
  );
}
