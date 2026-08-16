/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Shared model + registry for Pakka Patriot's card-based knowledge collections:
 * IDEAS (philosophies), PLACES, PEOPLE, CULTURE, CREATE.
 *
 * The registry is hydrated at boot from the Laravel database API (see
 * src/services/ppApi.ts). The static data below remains as the initial
 * content — and, critically, as the Tailwind v4 class safelist, since the
 * gradient / colour classes it contains are applied at runtime from the DB.
 */

import type { LucideIcon } from "lucide-react";
import { IDEAS_COLLECTION } from "./philosophies";
import { PLACES_COLLECTION } from "./places";
import { PEOPLE_COLLECTION } from "./people";
import { CULTURE_COLLECTION } from "./culture";
import { CREATE_COLLECTION as CREATE_COLLECTION_DATA } from "./creations";
import { mapIcon } from "../services/iconMap";

/** A single card in a collection — renders on both the browse card and its detail page. */
export interface CollectionItem {
  slug: string;
  name: string;
  nativeName: string;
  tagline: string;
  /** Filter group shown as a chip on the card, e.g. "Vedic", "Monuments", "Freedom Fighters". */
  category: string;
  era: string;
  /** Founder / builder / person / movement — labelled per collection. */
  attribution: string;
  region: string;
  /** Map coordinates — only places have these (used for the embedded map). */
  latitude?: number;
  longitude?: number;
  icon: LucideIcon;
  accent: string; // tailwind gradient stops, e.g. "from-[#5B21B6] to-[#8B5CF6]"
  softAccent: string; // chip classes, e.g. "bg-violet-50 text-violet-700 border-violet-200"
  iconColor: string; // text color for small icons, e.g. "text-violet-600"
  quote?: string;
  quoteSource?: string;
  summary: string;
  overview: string[];
  coreIdeas: { title: string; text: string }[];
  legacy: string;
}

/** A full browsable collection with its own page (e.g. /ideas) and detail routes (/ideas/:slug). */
export interface Collection {
  /** Route namespace — must match the URL segment, e.g. "ideas". */
  id: string;
  navLabel: string; // "IDEAS"
  badgeLabel: string; // "Ideas of Bhārat"
  titlePrefix: string; // "Philosophies born in"
  titleHighlight: string; // "Bhārat"
  subtitle: string;
  searchPlaceholder: string;
  itemNoun: string; // "philosophies"
  itemNounSingular: string; // "philosophy"
  heroIcon: LucideIcon;
  categories: { id: string; label: string }[];
  items: CollectionItem[];
  eraLabel: string; // "Period"
  attributionLabel: string; // "Founder"
  regionLabel: string; // "Birthplace"
  categoryLabel: string; // "Tradition"
  /** When true, the browse page groups cards into visible category sections instead of a flat grid. */
  groupByCategory?: boolean;
}

/** Raw collection item shape returned by the Laravel API (icons arrive as names). */
export interface ApiCollectionItem {
  slug: string;
  name: string;
  nativeName: string | null;
  tagline: string | null;
  category: string | null;
  era: string | null;
  attribution: string | null;
  region: string | null;
  latitude: number | null;
  longitude: number | null;
  icon: string | null;
  accent: string;
  softAccent: string;
  iconColor: string;
  quote: string | null;
  quoteSource: string | null;
  summary: string;
  overview: string[] | null;
  coreIdeas: { title: string; text: string }[] | null;
  legacy: string | null;
}

/** One collection group inside the API payload: metadata + items. */
export interface ApiCollectionGroup {
  meta: Record<string, unknown>;
  items: ApiCollectionItem[];
}

export const COLLECTIONS: Collection[] = [
  IDEAS_COLLECTION,
  PLACES_COLLECTION,
  PEOPLE_COLLECTION,
  CULTURE_COLLECTION,
  CREATE_COLLECTION_DATA,
];

/** The CREATE collection — used by the /create/:slug detail routes. */
export let CREATE_COLLECTION: Collection = CREATE_COLLECTION_DATA;

export function getItemBySlug(collection: Collection, slug: string): CollectionItem | undefined {
  return collection.items.find((item) => item.slug === slug);
}

/** Alphabetical comparator (by display name) for card lists and rails. */
export const byName = <T extends { name: string }>(a: T, b: T): number => a.name.localeCompare(b.name);

function normalizeItem(raw: ApiCollectionItem): CollectionItem {
  return {
    slug: raw.slug,
    name: raw.name,
    nativeName: raw.nativeName ?? "",
    tagline: raw.tagline ?? "",
    category: raw.category ?? "",
    era: raw.era ?? "",
    attribution: raw.attribution ?? "",
    region: raw.region ?? "",
    latitude: raw.latitude ?? undefined,
    longitude: raw.longitude ?? undefined,
    icon: mapIcon(raw.icon),
    accent: raw.accent,
    softAccent: raw.softAccent,
    iconColor: raw.iconColor,
    quote: raw.quote ?? undefined,
    quoteSource: raw.quoteSource ?? undefined,
    summary: raw.summary,
    overview: raw.overview ?? [],
    coreIdeas: raw.coreIdeas ?? [],
    legacy: raw.legacy ?? "",
  };
}

/**
 * Replace the registry contents with data fetched from the Laravel API.
 * The COLLECTIONS reference stays the same, so components and the site search
 * see the hydrated data after boot.
 */
export function hydrateCollections(groups: Record<string, ApiCollectionGroup>): void {
  const next: Collection[] = [];
  for (const [id, group] of Object.entries(groups)) {
    next.push({
      id,
      ...group.meta,
      heroIcon: mapIcon(group.meta.heroIcon as string | undefined),
      items: group.items.map(normalizeItem),
    // The meta shape from the Laravel controller config is trusted to match
    // the Collection interface — the `unknown` cast is necessary because
    // TypeScript cannot validate the spread of `Record<string, unknown>`.
    } as unknown as Collection);
  }
  COLLECTIONS.length = 0;
  COLLECTIONS.push(...next);
  const create = next.find((c) => c.id === "create");
  if (create) {
    CREATE_COLLECTION = create;
  }
}
