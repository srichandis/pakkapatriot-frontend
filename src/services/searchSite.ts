/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * searchSite — the single source of truth for site-wide search.
 * Ranks matches across every collection (Ideas, Places, People, Culture,
 * Create), the stories feed, the merchandise store and the games, and
 * returns them ordered by relevance. Used by the header suggestions
 * dropdown and by the /search results page.
 */

import {
  FileText,
  ShoppingBag,
  Gamepad2,
  MapPin,
  Lightbulb,
  Users,
  Palette,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { COLLECTIONS } from "../data/collections";
import { GAMES } from "../data/games";
import { stripHtml } from "./api";
import type { WPPost, WCProduct } from "../types";

export interface SearchMatch {
  kind: string; // group id (ideas, places, people, culture, create, stories, store, games)
  title: string;
  subtitle: string;
  category?: string;
  snippet: string;
  to?: string;
  product?: WCProduct;
  accent: string;
  icon: LucideIcon;
}

export const SEARCH_KIND_META: Record<string, { label: string; icon: LucideIcon }> = {
  ideas: { label: "Ideas", icon: Lightbulb },
  places: { label: "Places", icon: MapPin },
  people: { label: "People", icon: Users },
  culture: { label: "Culture", icon: Palette },
  create: { label: "Create", icon: Sparkles },
  stories: { label: "Stories", icon: FileText },
  store: { label: "Store", icon: ShoppingBag },
  games: { label: "Games", icon: Gamepad2 },
};

// Kind priority used to order ties (and to order groups on the results page).
export const SEARCH_KIND_ORDER = [
  "ideas",
  "places",
  "people",
  "culture",
  "create",
  "stories",
  "store",
  "games",
];

interface RawMatch {
  kind: string;
  title: string;
  subtitle: string;
  category?: string;
  snippet: string;
  to?: string;
  product?: WCProduct;
  accent: string;
  score: number;
}

/**
 * Relevance score of a title against the query (higher = better).
 * Prefers exact matches, then prefix + word-boundary matches (e.g. "taj"
 * in "Taj Mahal"), then whole-word matches anywhere (e.g. "kalam" in
 * "A.P.J. Abdul Kalam"), then loose prefix/word-prefix matches.
 */
function titleScore(title: string, q: string): number {
  const t = title.toLowerCase();
  if (t === q) return 100;
  if (t.startsWith(q)) {
    // A word boundary right after the prefix makes the match much stronger.
    const next = t[q.length] ?? "";
    return !/[a-z0-9]/.test(next) ? 92 : 78;
  }
  // Split on whitespace/punctuation (keeping letters incl. diacritics like ā).
  const words = t.split(/[\s\-–—'’()\[\].,:;!?&/+«»"]+/).filter(Boolean);
  if (words.some((w) => w === q)) return 85;
  if (words.some((w) => w.startsWith(q))) return 70;
  return 0;
}

/**
 * Full site search. Returns matches ranked by relevance (title matches
 * first, then taglines/categories, then deeper body matches), with ties
 * broken by content-kind priority and title length.
 */
export function searchSite(query: string, posts: WPPost[], products: WCProduct[]): SearchMatch[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  const raw: RawMatch[] = [];

  // ── Knowledge collections (Ideas, Places, People, Culture, Create) ──
  for (const collection of COLLECTIONS) {
    const basePath = collection.id === "create" ? "/create" : `/${collection.id}`;
    for (const item of collection.items) {
      const body = [
        item.name,
        item.nativeName,
        item.tagline,
        item.category,
        item.era,
        item.attribution,
        item.region,
        item.summary,
        item.legacy,
        ...item.overview,
        ...item.coreIdeas.map((c) => `${c.title} ${c.text}`),
      ].join(" ");
      if (!body.toLowerCase().includes(q)) continue;

      let score = titleScore(item.name, q);
      if (!score && item.nativeName?.toLowerCase().includes(q)) score = 55;
      if (!score && item.tagline?.toLowerCase().includes(q)) score = 40;
      if (!score) score = 20;

      raw.push({
        kind: collection.id,
        title: item.name,
        subtitle: item.tagline ?? "",
        category: item.category,
        snippet: item.summary,
        to: `${basePath}/${item.slug}`,
        accent: item.accent,
        score,
      });
    }
  }

  // ── Stories ──
  for (const post of posts) {
    const body = `${post.title} ${post.excerpt} ${post.content} ${post.category} ${post.authorName ?? ""}`;
    if (!body.toLowerCase().includes(q)) continue;

    let score = titleScore(post.title, q);
    if (!score && post.category?.toLowerCase().includes(q)) score = 40;
    if (!score) score = 20;

    raw.push({
      kind: "stories",
      title: post.title,
      subtitle: `${post.category}${post.readTime ? ` · ${post.readTime}` : ""}`,
      category: post.category,
      snippet: stripHtml(post.excerpt),
      to: `/${post.slug}`,
      accent: "from-[#0A2240] to-[#1F3D5E]",
      score,
    });
  }

  // ── Merchandise ──
  for (const product of products) {
    const body = `${product.name} ${product.description} ${product.shortDescription ?? ""} ${product.category}`;
    if (!body.toLowerCase().includes(q)) continue;

    let score = titleScore(product.name, q);
    if (!score && product.category?.toLowerCase().includes(q)) score = 40;
    if (!score) score = 20;

    raw.push({
      kind: "store",
      title: product.name,
      subtitle: `${product.category} · ₹${product.price}`,
      category: product.category,
      snippet: stripHtml(product.shortDescription || product.description),
      product,
      accent: "from-[#587760] to-[#6A8B72]",
      score,
    });
  }

  // ── Games ──
  for (const game of GAMES) {
    const body = `${game.title} ${game.tagline} ${game.description} ${game.badge} ${game.tags.map((t) => t.label).join(" ")}`;
    if (!body.toLowerCase().includes(q)) continue;

    let score = titleScore(game.title, q);
    if (!score && game.tagline?.toLowerCase().includes(q)) score = 40;
    if (!score) score = 20;

    raw.push({
      kind: "games",
      title: game.title,
      subtitle: game.tagline,
      category: game.badge,
      snippet: game.description,
      to: game.path,
      accent: game.accent,
      score,
    });
  }

  raw.sort(
    (a, b) =>
      b.score - a.score ||
      SEARCH_KIND_ORDER.indexOf(a.kind) - SEARCH_KIND_ORDER.indexOf(b.kind) ||
      a.title.length - b.title.length
  );

  return raw.map(({ score: _score, ...rest }) => ({
    ...rest,
    icon: SEARCH_KIND_META[rest.kind]?.icon ?? Sparkles,
  }));
}
