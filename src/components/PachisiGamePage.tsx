/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Link } from "react-router-dom";
import { ArrowLeft, Dices } from "lucide-react";

/**
 * Pachisi — the royal cross-board race game of ancient Bhārat (Twenty-Five),
 * the very game of the famous gambling match in the Mahabharata.
 *
 * Played hot-seat around one screen: cast the dala (ದಾಳ) — a Kannada
 * cuboid die — race your four pieces around the sacred cross, and be the
 * first to bring them all home to the Charkoni.
 */
export default function PachisiGamePage() {
  return (
    <div className="h-dvh w-full flex flex-col bg-[#2a1220]">
      {/* Slim control bar */}
      <div className="flex items-center justify-between gap-3 px-3 sm:px-5 py-2.5 bg-[#2a1220] border-b border-[#4a3520] text-white shrink-0">
        <div className="flex items-center gap-2 min-w-0">
          <Link
            to="/play"
            className="flex items-center gap-1.5 text-xs font-bold text-[#c3ad92] hover:text-[#F6B828] transition-colors shrink-0"
          >
            <ArrowLeft size={16} /> Back to Play
          </Link>
          <span className="hidden sm:flex items-center gap-1.5 text-sm font-black tracking-wide min-w-0">
            <Dices size={15} className="text-[#F6B828] shrink-0" />
            <span className="truncate">Pachisi</span>
          </span>
        </div>
        <span className="hidden md:flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-1 rounded-full bg-[#3a1f2c] text-[#f2d68a]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#F6B828] animate-pulse" />
          Hot-seat · 2–4 players
        </span>
      </div>

      {/* The game, full-screen */}
      <div className="flex-1 min-h-0 relative bg-[#FCFAF5]">
        <iframe
          src="/pachisi/index.html"
          title="Pachisi — Twenty-Five, the royal cross-board game of ancient Bhārat"
          className="absolute inset-0 w-full h-full border-0"
          allow="clipboard-write; autoplay"
        />
      </div>
    </div>
  );
}
