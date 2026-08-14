/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Games from Bharat — the playable titles on the /play pages.
 * Shared by PlayPage (card grid) and the global site search.
 */

import {
  Users,
  Castle,
  Wifi,
  Monitor,
  Shell,
  Swords,
  Bot,
  Shield,
  LayoutGrid,
  Skull,
  Zap,
  Dices,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { mapIcon } from "../services/iconMap";

export interface GameCard {
  id: string;
  title: string;
  tagline: string;
  description: string;
  path: string;
  tags: { icon: LucideIcon; label: string }[];
  accent: string;
  badge: string;
}

export const GAMES: GameCard[] = [
  {
    id: "pachisi",
    title: "Pachisi",
    tagline: "Twenty-Five — the royal game of the Mahabharata",
    description:
      "The legendary cross-board race of ancient Bhārat — the game of the great gambling match in the Mahabharata. Cast the dala (ದಾಳ) — a Kannada cuboid die — race four beehive pieces around the sacred cross, capture your rivals on the way, and be the first to bring every piece home to the Charkoni. Play hot-seat with 2, 3, or 4 players.",
    path: "/play/pachisi",
    tags: [
      { icon: Dices, label: "Cuboid dala die" },
      { icon: Users, label: "2–4 players" },
      { icon: Swords, label: "Capture & grace throws" },
      { icon: Shield, label: "12 castle squares" },
      { icon: Castle, label: "Cross-board race" },
    ],
    accent: "from-[#2a1220] to-[#4a2430]",
    badge: "★ Mahabharata",
  },
  {
    id: "chaukabaara",
    title: "Chaukabaara",
    tagline: "The ancient game of strategy of Bhārat & luck",
    description:
      "Race your cowrie-shell dice across a square board in this two-thousand-year-old game of ancient Bhārat. Play with 2, 3, or 4 players on a 5-house or 7-house board — against friends online or around the same screen.",
    path: "/play/chaukabaara",
    tags: [
      { icon: Users, label: "2–4 players" },
      { icon: Castle, label: "5 & 7 house boards" },
      { icon: Wifi, label: "Online rooms" },
      { icon: Monitor, label: "Hot-seat local" },
      { icon: Shell, label: "Cowrie shell dice" },
    ],
    accent: "from-[#0A2240] to-[#1F3D5E]",
    badge: "★ Ancient Bhārat",
  },
  {
    id: "aadupuliatam",
    title: "Aadu Puli Aatam",
    tagline: "Goats & Tigers — the classic hunt of Tamil Nadu",
    description:
      "Three tigers stalk fifteen goats on the temple triangle of Tamil Nadu. Place and move your goats to surround the tigers — or hunt them down, one leap at a time. Play hot-seat or challenge the computer.",
    path: "/play/aadu-puli-aatam",
    tags: [
      { icon: Swords, label: "3 tigers vs 15 goats" },
      { icon: Bot, label: "Vs computer" },
      { icon: Monitor, label: "Hot-seat local" },
      { icon: Users, label: "2 players" },
      { icon: Shield, label: "Pure strategy" },
    ],
    accent: "from-[#0C2419] to-[#1F4A33]",
    badge: "★ South Bhārat",
  },
  {
    id: "chaturvimshati",
    title: "Chaturvimshati Koṣṭaka",
    tagline: "Twenty-Four Squares — the game of Krīḍākauśalya",
    description:
      "From the ancient Sanskrit text Krīḍākauśalya: eight ivory soldiers against eight crimson across a 3×8 board of twenty-four squares. Step sideways or leap over the enemy — capture them all, or trap them with no move left. Play hot-seat, vs the computer, or online.",
    path: "/play/chaturvimshati",
    tags: [
      { icon: LayoutGrid, label: "3×8 board · 24 squares" },
      { icon: Users, label: "2 players" },
      { icon: Bot, label: "Vs computer" },
      { icon: Wifi, label: "Online rooms" },
      { icon: Shield, label: "Pure strategy" },
    ],
    accent: "from-[#1d1026] to-[#3a1f4a]",
    badge: "★ Krīḍākauśalya",
  },
  {
    id: "vishamrit",
    title: "Vish & Amrit",
    tagline: "Poison & Nectar — the ancient freeze-tag chase",
    description:
      "One player is Vish, the poison, hunting three fleeing runners across a 7×7 board. Touch a runner and they freeze into a Statue — but a runner who ends their move touching a statue cries “Amrit!” and frees them. Freeze all three, or survive 60 rounds. Play hot-seat, vs the computer, or online.",
    path: "/play/vish-amrit",
    tags: [
      { icon: Skull, label: "1 Vish vs 3 runners" },
      { icon: Zap, label: "Amrit release" },
      { icon: Bot, label: "Vs computer" },
      { icon: Wifi, label: "Online rooms" },
      { icon: Users, label: "2 players" },
    ],
    accent: "from-[#0F1912] to-[#2A4A32]",
    badge: "★ Poison & Nectar",
  },
];

/** Raw game shape returned by the Laravel API (tag icons arrive as names). */
export interface ApiGame {
  id: number;
  title: string;
  tagline: string;
  description: string;
  path: string;
  tags: { icon: string | null; label: string }[] | null;
  accent: string;
  badge: string;
}

/**
 * Replace the games list with the data fetched from the Laravel API.
 * The GAMES reference stays the same, so existing consumers (PlayPage, search)
 * see the hydrated list after boot.
 */
export function hydrateGames(games: ApiGame[]): void {
  GAMES.length = 0;
  for (const g of games) {
    GAMES.push({
      id: String(g.id),
      title: g.title,
      tagline: g.tagline,
      description: g.description,
      path: g.path,
      tags: (g.tags ?? []).map((t) => ({ icon: mapIcon(t.icon), label: t.label })),
      accent: g.accent,
      badge: g.badge,
    });
  }
}