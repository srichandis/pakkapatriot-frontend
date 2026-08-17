/**
 * Generates public/sitemap.xml for the Pakka Patriot frontend.
 *
 * The React app is a client-side SPA served from pakkapatriot.com (Vercel).
 * This script walks the router (src/App.tsx) plus the collection and activity
 * data files to produce every indexable URL, then writes public/sitemap.xml so
 * it is copied into dist/ on build and served at
 * https://pakkapatriot.com/sitemap.xml.
 *
 * Regenerate after adding routes or content:
 *   npm run sitemap
 */

import { writeFileSync } from "node:fs";
import path from "node:path";
import { COLLECTIONS } from "../src/data/collections";
import { CREATE_ACTIVITIES } from "../src/data/createActivities";

const BASE_URL = "https://pakkapatriot.com";
const TODAY = new Date().toISOString().slice(0, 10);

/** [path, priority, changefreq] */
type Entry = [string, string, string];

const entries: Entry[] = [];

// Top-level / static pages (routes in src/App.tsx)
const STATIC_PAGES: Entry[] = [
  ["/", "1.0", "daily"],
  ["/stories", "0.8", "weekly"],
  ["/blogs", "0.8", "weekly"],
  ["/explore", "0.8", "weekly"],
  ["/ideas", "0.8", "weekly"],
  ["/places", "0.8", "weekly"],
  ["/people", "0.8", "weekly"],
  ["/culture", "0.8", "weekly"],
  ["/create", "0.8", "weekly"],
  ["/play", "0.8", "weekly"],
  ["/shop", "0.8", "weekly"],
  ["/about", "0.3", "monthly"],
  ["/privacy", "0.3", "yearly"],
  ["/terms", "0.3", "yearly"],
];
entries.push(...STATIC_PAGES);

// Games (each renders a React page that embeds the standalone game)
const GAME_PATHS = ["chaukabaara", "aadu-puli-aatam", "chaturvimshati", "vish-amrit", "pachisi"];
for (const game of GAME_PATHS) {
  entries.push([`/play/${game}`, "0.7", "monthly"]);
}

// Shop category pages (categorySlug() in src/components/MadeInBharatCategoryPage.tsx)
const SHOP_CATEGORIES = ["t-shirts", "mugs", "posters", "stickers", "notebooks", "caps", "photo-frames"];
for (const category of SHOP_CATEGORIES) {
  entries.push([`/shop/${category}`, "0.5", "weekly"]);
}

// Collections: browse page + one detail page per item (e.g. /places/taj-mahal)
for (const collection of COLLECTIONS) {
  for (const item of collection.items) {
    entries.push([`/${collection.id}/${item.slug}`, "0.6", "weekly"]);
  }
}

// CREATE maker activities (/create/activity/:slug)
for (const activity of CREATE_ACTIVITIES) {
  entries.push([`/create/activity/${activity.slug}`, "0.6", "weekly"]);
}

// Blog / story posts use root permalinks (e.g. /the-library-that-survived-centuries).
// These are the seed posts synced from the Laravel backend (src/services/api.ts).
const STORY_SLUGS = [
  "the-library-that-survived-centuries",
  "ziro-valley-where-nature-smiles",
  "warli-art-stories-in-lines-and-circles",
  "apj-abdul-kalam-dreamer-of-india",
  "musical-pillars-of-hampi",
  "kite-flying-sky-festivals",
];
for (const slug of STORY_SLUGS) {
  entries.push([`/${slug}`, "0.6", "monthly"]);
}

// De-duplicate while keeping insertion order
const seen = new Set<string>();
const unique = entries.filter(([p]) => {
  if (seen.has(p)) return false;
  seen.add(p);
  return true;
});

// Emit the XML
const urlset = unique
  .map(([pathname, priority, changefreq]) =>
    [
      "  <url>",
      `    <loc>${BASE_URL}${pathname}</loc>`,
      `    <lastmod>${TODAY}</lastmod>`,
      `    <changefreq>${changefreq}</changefreq>`,
      `    <priority>${priority}</priority>`,
      "  </url>",
    ].join("\n"),
  )
  .join("\n");

const xml = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  urlset,
  "</urlset>",
  "",
].join("\n");

const outPath = path.resolve(process.cwd(), "public", "sitemap.xml");
writeFileSync(outPath, xml);
console.log(`Wrote ${unique.length} URLs to ${outPath}`);
