/**
 * Pakka Patriot — Laravel data API client.
 *
 * Fetches the entire dataset (collections, games, ebooks, maker activities)
 * from the Laravel backend's GET /api/data endpoint and hydrates the runtime
 * data modules. The Vite dev server proxies /api → http://localhost:8000.
 *
 * The original src/data/*.ts files remain on disk as the Tailwind v4 class
 * safelist and the seeder source — at runtime the site reads everything from
 * the database via this module.
 */
import { hydrateCollections, type ApiCollectionGroup } from "../data/collections";
import { hydrateGames, type ApiGame } from "../data/games";
import { hydrateEbooks, type ApiEBook } from "../data/ebooks";
import { hydrateActivities, type CreateActivity } from "../data/createActivities";

/** The complete payload returned by GET /api/data. */
export interface PPDataPayload {
  collections: Record<string, ApiCollectionGroup>;
  games: ApiGame[];
  ebooks: ApiEBook[];
  activities: CreateActivity[];
}

/** Fetch the full dataset from the Laravel API. */
export async function fetchAllData(): Promise<PPDataPayload> {
  const apiBase =
    (import.meta.env.VITE_LARAVEL_API_URL as string | undefined)?.replace(/\/+$/, "") ?? "/api";
  const res = await fetch(`${apiBase}/data`, { headers: { Accept: "application/json" } });
  if (!res.ok) {
    throw new Error(`The data API responded with HTTP ${res.status} ${res.statusText}.`);
  }
  return (await res.json()) as PPDataPayload;
}

/** Populate every runtime data module from an API payload. */
export function hydrateAll(payload: PPDataPayload): void {
  hydrateCollections(payload.collections);
  hydrateGames(payload.games);
  hydrateEbooks(payload.ebooks);
  hydrateActivities(payload.activities);
}
