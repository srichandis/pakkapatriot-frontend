/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * CREATE — the Pakka Patriot maker's space, modelled on the design in
 * public/pages/create.png: draw, make, experiment, build, write and more.
 * Each activity card opens its own page (/create/activity/:slug).
 */

import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import {
  BookOpen,
  Lightbulb,
  Pencil,
  Users,
  ArrowRight,
  Download,
  Play,
  Rocket,
  Sparkles,
  Star,
  MapPin,
  Send,
  Palette,
  Scissors,
  FlaskConical,
  Hammer,
  Dices,
  Camera,
  Clapperboard,
  Landmark,
  Heart,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

interface Activity {
  id: string;
  title: string;
  emoji: string;
  tile: string; // gradient classes for the art tile
  ring: string; // soft chip colour for the id
  description: string;
  cta: string;
  button: string; // button colour classes
  path: string; // link to the activity's own page
}

const ACTIVITIES: Activity[] = [
  {
    id: "01",
    title: "DRAW",
    emoji: "🎨",
    tile: "from-[#F3E8FF] to-[#E9D5FF]",
    ring: "bg-violet-100 text-violet-700",
    description: "Learn step-by-step drawing lessons and colouring sheets.",
    cta: "Start Drawing",
    button: "bg-[#7C3AED] hover:bg-[#6D28D9]",
    path: "/create/activity/draw",
  },
  {
    id: "02",
    title: "MAKE",
    emoji: "✂️",
    tile: "from-[#FFEDD5] to-[#FED7AA]",
    ring: "bg-orange-100 text-orange-700",
    description: "Fun crafts inspired by Bhārat's culture, festivals and traditions.",
    cta: "Start Making",
    button: "bg-[#F97316] hover:bg-[#EA580C]",
    path: "/create/activity/make",
  },
  {
    id: "03",
    title: "EXPERIMENT",
    emoji: "🧪",
    tile: "from-[#DCFCE7] to-[#BBF7D0]",
    ring: "bg-green-100 text-green-700",
    description: "Simple science experiments you can try at home.",
    cta: "Start Experimenting",
    button: "bg-[#16A34A] hover:bg-[#15803D]",
    path: "/create/activity/experiment",
  },
  {
    id: "04",
    title: "BUILD",
    emoji: "🏗️",
    tile: "from-[#DBEAFE] to-[#BFDBFE]",
    ring: "bg-blue-100 text-blue-700",
    description: "Build models, machines and structures. Think like an engineer!",
    cta: "Start Building",
    button: "bg-[#2563EB] hover:bg-[#1D4ED8]",
    path: "/create/activity/build",
  },
  {
    id: "05",
    title: "WRITE",
    emoji: "✍️",
    tile: "from-[#FCE7F3] to-[#FBCFE8]",
    ring: "bg-pink-100 text-pink-700",
    description: "Stories, poems, comics and more. Let your imagination shine.",
    cta: "Start Writing",
    button: "bg-[#DB2777] hover:bg-[#BE185D]",
    path: "/create/activity/write",
  },
  {
    id: "06",
    title: "MAKE YOUR OWN NEWSPAPER",
    emoji: "📰",
    tile: "from-[#DCFCE7] to-[#BBF7D0]",
    ring: "bg-emerald-100 text-emerald-700",
    description: "Create and design your very own newspaper.",
    cta: "Make Newspaper",
    button: "bg-[#16A34A] hover:bg-[#15803D]",
    path: "/create/activity/newspaper",
  },
  {
    id: "07",
    title: "CREATE VIDEOS",
    emoji: "🎬",
    tile: "from-[#FFEDD5] to-[#FED7AA]",
    ring: "bg-amber-100 text-amber-700",
    description: "Make 60-second videos and share your stories, ideas and talents.",
    cta: "Start Creating",
    button: "bg-[#F97316] hover:bg-[#EA580C]",
    path: "/create/activity/videos",
  },
  {
    id: "08",
    title: "MY INDIA",
    emoji: "📸",
    tile: "from-[#F3E8FF] to-[#E9D5FF]",
    ring: "bg-violet-100 text-violet-700",
    description: "Upload photos of your place and show the beauty around you.",
    cta: "Explore My Bhārat",
    button: "bg-[#7C3AED] hover:bg-[#6D28D9]",
    path: "/create/activity/my-bharat",
  },
  {
    id: "09",
    title: "MAKE A GAME",
    emoji: "🎲",
    tile: "from-[#DBEAFE] to-[#BFDBFE]",
    ring: "bg-sky-100 text-sky-700",
    description: "Design your own board game. Choose theme, rules and challenges.",
    cta: "Create Game",
    button: "bg-[#2563EB] hover:bg-[#1D4ED8]",
    path: "/create/activity/make-a-game",
  },
  {
    id: "10",
    title: "PUZZLES & PRINTABLES",
    emoji: "🧩",
    tile: "from-[#EDE9FE] to-[#DDD6FE]",
    ring: "bg-indigo-100 text-indigo-700",
    description: "Puzzles, crosswords, mazes and more. Download & print.",
    cta: "Explore Puzzles",
    button: "bg-[#7C3AED] hover:bg-[#6D28D9]",
    path: "/create/activity/puzzles",
  },
  {
    id: "11",
    title: "CREATE WITH GRANDPARENTS",
    emoji: "👵🏽",
    tile: "from-[#FFF7ED] to-[#FED7AA]",
    ring: "bg-orange-100 text-orange-700",
    description: "Ask, record and preserve stories from your grandparents.",
    cta: "Start Recording",
    button: "bg-[#F97316] hover:bg-[#EA580C]",
    path: "/create/activity/grandparents",
  },
  {
    id: "12",
    title: "CREATE FOR INDIA",
    emoji: "💡",
    tile: "from-[#DCFCE7] to-[#BBF7D0]",
    ring: "bg-green-100 text-green-700",
    description: "Take challenges and create ideas that make Bhārat better.",
    cta: "Accept Challenge",
    button: "bg-[#16A34A] hover:bg-[#15803D]",
    path: "/create/activity/create-for-bharat",
  },
];

const PROCESS_STEPS = [
  { icon: BookOpen, label: "Learn it", color: "bg-[#0D9488] text-white" },
  { icon: Lightbulb, label: "Imagine it", color: "bg-[#F59E0B] text-white" },
  { icon: Pencil, label: "Create it", color: "bg-[#E11D48] text-white" },
  { icon: Users, label: "Share it", color: "bg-[#6366F1] text-white" },
];

const HERO_LETTERS = [
  { ch: "C", color: "#F97316" },
  { ch: "R", color: "#F59E0B" },
  { ch: "E", color: "#14B8A6" },
  { ch: "A", color: "#EF4444" },
  { ch: "T", color: "#F97316" },
  { ch: "E", color: "#0D9488" },
];

const CREATIONS = [
  { emoji: "🦚", title: "Peacock", by: "Ananya", city: "Bengaluru", tile: "from-[#F3E8FF] to-[#E9D5FF]" },
  { emoji: "🏰", title: "My Fort", by: "Vihaan", city: "Jaipur", tile: "from-[#FFEDD5] to-[#FED7AA]" },
  { emoji: "🎭", title: "Festival in My City", by: "Kavya", city: "Pune", tile: "from-[#DCFCE7] to-[#BBF7D0]", video: true },
];

const PRINTABLES = [
  { emoji: "🕌", title: "Hampi Colouring Sheet" },
  { emoji: "🗺️", title: "Bhārat Map Puzzle" },
  { emoji: "🦁", title: "Animals of Bhārat Colouring Pages" },
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function CreatePage() {
  const [toast, setToast] = useState<string | null>(null);
  const timerRef = useRef<number | null>(null);

  const showToast = (message: string) => {
    if (timerRef.current) window.clearTimeout(timerRef.current);
    setToast(message);
    timerRef.current = window.setTimeout(() => setToast(null), 3200);
  };

  // Clear a pending toast timer if the page unmounts.
  useEffect(() => {
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <div className="min-h-screen bg-brand-cream font-sans">

      {/* ============================================================ */}
      {/* HERO                                                         */}
      {/* ============================================================ */}
      <section className="relative overflow-hidden">
        {/* faint line-art background */}
        <div className="absolute inset-0 opacity-[0.10] pointer-events-none select-none" aria-hidden="true">
          <Rocket size={90} className="absolute top-10 right-[12%] text-[#F97316] -rotate-12" />
          <Sparkles size={36} className="absolute top-24 left-[8%] text-[#14B8A6]" />
          <Star size={28} className="absolute top-40 right-[30%] text-[#EF4444] fill-[#EF4444]" />
          <Star size={20} className="absolute bottom-24 left-[16%] text-[#F59E0B] fill-[#F59E0B]" />
          <Send size={44} className="absolute bottom-16 right-[10%] text-[#6366F1] rotate-12" />
          <div className="absolute top-1/3 left-[45%] w-24 h-24 border-2 border-dashed border-[#F59E0B] rounded-full" />
          <div className="absolute bottom-10 left-[38%] w-16 h-16 border-2 border-dashed border-[#14B8A6] rounded-full" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 pb-14 sm:pb-20 grid lg:grid-cols-[1.05fr_0.95fr] gap-12 items-center">
          {/* Left — copy */}
          <div className="text-center lg:text-left">
            <span className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs font-black tracking-[0.3em] uppercase text-[#0A2240] bg-white/70 border border-[#F0EBE0] px-4 py-1.5 rounded-full shadow-sm">
              <Sparkles size={13} className="text-[#F6B828]" /> The Pakka Maker's Space
            </span>

            <h1
              className="font-display font-black text-6xl sm:text-7xl lg:text-8xl leading-none tracking-tight mt-5 select-none"
              aria-label="CREATE"
            >
              {HERO_LETTERS.map(({ ch, color }, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 24, rotate: -6 }}
                  animate={{ opacity: 1, y: 0, rotate: 0 }}
                  transition={{ delay: 0.15 + i * 0.08, type: "spring", stiffness: 260, damping: 18 }}
                  className="inline-block"
                  style={{ color }}
                >
                  {ch}
                </motion.span>
              ))}
            </h1>

            <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-[#0A2240] mt-3">
              Make Bhārat with your hands!
            </h2>
            <p className="mt-4 max-w-xl mx-auto lg:mx-0 text-sm sm:text-base text-[#4E637A] font-medium leading-relaxed">
              Draw, build, write, experiment and share your ideas. Bhārat has always been a land
              of makers. Now it's your turn!
            </p>

            {/* Process steps */}
            <div className="mt-8 flex items-center justify-center lg:justify-start gap-2 sm:gap-3">
              {PROCESS_STEPS.map((step, i) => {
                const StepIcon = step.icon;
                return (
                  <React.Fragment key={step.label}>
                    <div className="flex flex-col items-center gap-1.5 group">
                      <div
                        className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl ${step.color} flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:-rotate-6 transition-transform`}
                      >
                        <StepIcon size={22} />
                      </div>
                      <span className="text-[10px] sm:text-xs font-black text-[#0A2240]">{step.label}</span>
                    </div>
                    {i < PROCESS_STEPS.length - 1 && (
                      <div className="flex-1 max-w-10 sm:max-w-14 border-t-2 border-dashed border-[#C8C5B9] mb-5 hidden sm:block" />
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </div>

          {/* Right — maker's desk illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="relative hidden md:block"
          >
            <div className="relative bg-gradient-to-br from-[#FFF3DC] via-[#FEF0D8] to-[#FCE9D0] border border-[#F0E0B8] rounded-[2.5rem] shadow-xl p-8 sm:p-10">
              {/* dotted ring */}
              <div className="absolute inset-6 rounded-[2rem] border-2 border-dashed border-[#F6B828]/40 pointer-events-none" aria-hidden="true" />

              {/* centre canvas — the Taj being painted */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="relative mx-auto w-52 h-52 sm:w-60 sm:h-60 rounded-3xl bg-white shadow-2xl rotate-[-3deg] flex flex-col items-center justify-center border border-[#F0EBE0]"
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#F97316] to-[#F6B828] flex items-center justify-center shadow-lg">
                  <Landmark size={30} className="text-white" />
                </div>
                <span className="text-3xl mt-3">🏛️</span>
                <span className="text-[10px] font-black tracking-widest text-[#8A9EB4] uppercase mt-2">
                  Painting a wonder
                </span>
              </motion.div>

              {/* floating tool tiles */}
              {[
                { icon: Palette, cls: "bg-[#F97316] top-6 left-6", size: 18 },
                { icon: Pencil, cls: "bg-[#E11D48] top-4 right-10", size: 16 },
                { icon: Scissors, cls: "bg-[#DB2777] top-24 right-2", size: 16 },
                { icon: FlaskConical, cls: "bg-[#16A34A] bottom-6 right-8", size: 16 },
                { icon: Hammer, cls: "bg-[#2563EB] bottom-16 left-4", size: 16 },
                { icon: Dices, cls: "bg-[#7C3AED] top-1/2 -left-3", size: 16 },
                { icon: Camera, cls: "bg-[#0D9488] bottom-2 left-24", size: 15 },
                { icon: Clapperboard, cls: "bg-[#6366F1] -top-3 left-1/3", size: 16 },
              ].map(({ icon: TileIcon, cls, size }, i) => (
                <motion.div
                  key={i}
                  animate={{ y: [0, -7, 0] }}
                  transition={{ duration: 3.2 + i * 0.4, repeat: Infinity, ease: "easeInOut", delay: i * 0.25 }}
                  className={`absolute w-11 h-11 rounded-2xl ${cls} flex items-center justify-center shadow-lg text-white`}
                >
                  <TileIcon size={size} />
                </motion.div>
              ))}

              {/* badge */}
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-[#0A2240] text-[#F6B828] text-[11px] font-black tracking-widest uppercase px-5 py-2 rounded-full shadow-xl flex items-center gap-1.5 whitespace-nowrap">
                <Heart size={12} className="text-[#EF4444] fill-[#EF4444]" /> Made by makers, for makers
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* ACTIVITY CARDS                                               */}
      {/* ============================================================ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="flex items-end justify-between mb-7">
          <div>
            <span className="text-[10px] font-black tracking-[0.3em] uppercase text-[#F97316]">Pick an activity</span>
            <h2 className="font-display font-black text-2xl sm:text-3xl text-[#0A2240] mt-1">
              What will you create today?
            </h2>
          </div>
          <span className="hidden sm:inline-flex items-center text-xs font-bold text-[#587760] bg-[#EAF1EB] px-3.5 py-1.5 rounded-full">
            {ACTIVITIES.length} maker activities
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {ACTIVITIES.map((activity, i) => {
            const inner = (
              <>
                {/* Art tile */}
                <div className={`relative h-32 bg-gradient-to-br ${activity.tile} flex items-center justify-center overflow-hidden`}>
                  <div className="absolute -top-3 -right-3 w-16 h-16 rounded-full bg-white/40" aria-hidden="true" />
                  <div className="absolute -bottom-5 -left-4 w-14 h-14 rounded-full bg-white/30" aria-hidden="true" />
                  <span className="text-[3.25rem] leading-none drop-shadow-sm select-none" aria-hidden="true">
                    {activity.emoji}
                  </span>
                  <span className={`absolute top-3 left-3 text-[10px] font-black ${activity.ring} px-2 py-0.5 rounded-full`}>
                    {activity.id}
                  </span>
                </div>

                {/* Body */}
                <div className="p-5 flex flex-col flex-grow">
                  <h3 className="font-display font-black text-lg text-[#0A2240] leading-snug min-h-[3.4rem] flex items-start">
                    {activity.title}
                  </h3>
                  <p className="text-xs text-[#4E637A] font-medium leading-relaxed mt-1.5 flex-grow">
                    {activity.description}
                  </p>
                  <div
                    className={`mt-4 inline-flex items-center justify-center gap-1.5 text-white text-xs font-black tracking-wide px-4 py-2.5 rounded-full shadow-md transition-all duration-200 group-hover:shadow-lg group-hover:gap-2.5 ${activity.button}`}
                  >
                    {activity.cta} <ArrowRight size={14} />
                  </div>
                </div>
              </>
            );

            const cardClasses =
              "group relative bg-white rounded-3xl overflow-hidden border border-[#F0EBE0] shadow-sm hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 text-left flex flex-col cursor-pointer";

            return (
              <Link key={activity.id} to={activity.path} className={cardClasses}>
                {inner}
              </Link>
            );
          })}
        </div>
      </section>

      {/* ============================================================ */}
      {/* BOTTOM PANELS                                                */}
      {/* ============================================================ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-14 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* This week's challenge */}
        <div className="bg-[#FEF5E0] border border-[#F0E6C8] rounded-3xl p-6 flex flex-col shadow-sm">
          <span className="text-[10px] font-black tracking-[0.25em] uppercase text-[#B45309]">
            ⚡ This Week's Challenge
          </span>
          <div className="mt-4 h-32 rounded-2xl bg-gradient-to-br from-[#FFEDD5] to-[#FED7AA] flex items-center justify-center overflow-hidden relative">
            <div className="absolute -top-4 -right-4 w-20 h-20 rounded-full bg-white/40" aria-hidden="true" />
            <span className="text-6xl drop-shadow select-none" aria-hidden="true">🌉</span>
          </div>
          <h3 className="font-display font-black text-xl text-[#0A2240] mt-4">Build a Paper Bridge</h3>
          <p className="text-xs text-[#4E637A] font-medium mt-1 flex-grow">
            Can you build a strong bridge using paper and tape?
          </p>
          <button
            onClick={() => showToast("Challenge is live — grab paper & tape and start testing!")}
            className="mt-4 inline-flex items-center justify-center gap-1.5 bg-[#F97316] hover:bg-[#EA580C] text-white text-xs font-black tracking-wide px-5 py-3 rounded-full shadow-md hover:shadow-lg transition-all"
          >
            Start Challenge <ArrowRight size={14} />
          </button>
        </div>

        {/* Made by Pakka Patriots */}
        <div className="bg-white border border-[#F0EBE0] rounded-3xl p-6 flex flex-col shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-black tracking-[0.25em] uppercase text-[#0A2240]">
              🌟 Made by Pakka Patriots
            </span>
            <button
              onClick={() => showToast("The gallery wall is going up — coming soon!")}
              className="text-[11px] font-black text-[#2563EB] hover:underline flex items-center gap-0.5"
            >
              View All <ArrowRight size={12} />
            </button>
          </div>

          <div className="mt-4 space-y-3 flex-grow">
            {CREATIONS.map((c) => (
              <div key={c.title} className="flex items-center gap-3 bg-[#FCFAF5] border border-[#F0EBE0] rounded-2xl p-2.5 hover:shadow-md hover:-translate-y-0.5 transition-all">
                <div className={`relative w-14 h-14 rounded-xl bg-gradient-to-br ${c.tile} flex items-center justify-center flex-shrink-0`}>
                  <span className="text-2xl" aria-hidden="true">{c.emoji}</span>
                  {c.video && (
                    <span className="absolute inset-0 bg-black/30 rounded-xl flex items-center justify-center">
                      <span className="w-6 h-6 rounded-full bg-white flex items-center justify-center">
                        <Play size={11} className="text-[#0A2240] ml-0.5 fill-[#0A2240]" />
                      </span>
                    </span>
                  )}
                </div>
                <div className="min-w-0">
                  <p className="font-display font-bold text-sm text-[#0A2240] truncate">{c.title}</p>
                  <p className="text-[11px] text-[#8A9EB4] font-semibold flex items-center gap-1">
                    by {c.by} <span className="text-[#C8C5B9]">•</span>
                    <MapPin size={10} /> {c.city}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top printables */}
        <div className="bg-white border border-[#F0EBE0] rounded-3xl p-6 flex flex-col shadow-sm">
          <span className="text-[10px] font-black tracking-[0.25em] uppercase text-[#0A2240]">
            🖨️ Top Printables
          </span>

          <div className="mt-4 space-y-2.5 flex-grow">
            {PRINTABLES.map((p) => (
              <button
                key={p.title}
                onClick={() => showToast("Your printable is being printed — coming soon!")}
                className="w-full flex items-center gap-3 bg-[#FCFAF5] border border-[#F0EBE0] rounded-2xl p-2.5 hover:shadow-md hover:-translate-y-0.5 transition-all text-left cursor-pointer group"
              >
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#FAF6EC] to-[#F0E8D4] border border-[#E4DCB9] flex items-center justify-center flex-shrink-0">
                  <span className="text-xl" aria-hidden="true">{p.emoji}</span>
                </div>
                <div className="min-w-0 flex-grow">
                  <p className="font-display font-bold text-xs text-[#0A2240] truncate">{p.title}</p>
                  <p className="text-[10px] text-[#8A9EB4] font-semibold">Download PDF</p>
                </div>
                <span className="w-8 h-8 rounded-full bg-[#7C3AED] text-white flex items-center justify-center group-hover:scale-110 transition-transform flex-shrink-0">
                  <Download size={14} />
                </span>
              </button>
            ))}
          </div>

          <button
            onClick={() => showToast("All printables coming soon!")}
            className="mt-4 w-full inline-flex items-center justify-center gap-1.5 bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-xs font-black tracking-wide px-5 py-3 rounded-full shadow-md hover:shadow-lg transition-all"
          >
            View All Printables <ArrowRight size={14} />
          </button>
        </div>
      </section>

      {/* ============================================================ */}
      {/* CTA BANNER                                                   */}
      {/* ============================================================ */}
      <section className="bg-[#FEF5E0] border-y border-[#F0E6C8] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-14 flex flex-col sm:flex-row items-center gap-8 text-center sm:text-left">
          <div className="flex-shrink-0">
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-gradient-to-br from-[#F97316] to-[#F6B828] flex items-center justify-center text-5xl shadow-xl rotate-[-4deg]"
            >
              <span aria-hidden="true">🎉</span>
            </motion.div>
          </div>
          <div className="flex-grow">
            <h2 className="font-display font-black text-3xl sm:text-4xl tracking-tight">
              <span className="text-[#F97316]">Create.</span>{" "}
              <span className="text-[#0D9488]">Share.</span>{" "}
              <span className="text-[#E11D48]">Inspire.</span>
            </h2>
            <p className="mt-2 text-sm text-[#4E637A] font-semibold">
              Your creation can inspire millions of young Pakka Patriots across Bhārat!
            </p>
          </div>
          <button
            onClick={() => showToast("Share your creation with us — coming soon!")}
            className="flex-shrink-0 inline-flex items-center gap-2 bg-[#F97316] hover:bg-[#EA580C] text-white px-7 py-3.5 rounded-full font-black text-sm shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
          >
            Share Your Creation <ArrowRight size={16} />
          </button>
        </div>
      </section>

      {/* ============================================================ */}
      {/* TOAST                                                        */}
      {/* ============================================================ */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 320, damping: 22 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#0A2240] text-white text-xs sm:text-sm font-bold px-6 py-3.5 rounded-2xl shadow-2xl flex items-center gap-2 max-w-[92vw] text-left sm:text-center"
            role="status"
          >
            <Sparkles size={15} className="text-[#F6B828] flex-shrink-0" />
            <span>{toast}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
