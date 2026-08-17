/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { WPPost, Product } from "../types";

export const FALLBACK_POSTS: WPPost[] = [
  {
    id: 101,
    title: "The Library That Survived Centuries",
    excerpt: "A timeless treasure of knowledge hidden in plain sight. Deep in the heart of ancient temples, manuscript libraries preserved the soul of Bhārat's intellectual heritage.",
    content: "The story of Bhārat's ancient libraries is one of resilience. While grand universities like Nalanda and Vikramashila were lost to history, smaller temple libraries and village repositories quietly preserved thousands of manuscripts. These palm-leaf and birch-bark sheets cover subjects from mathematics, astronomy, and medicine to philosophy, linguistics, and literature. They represent an unbroken lineage of intellectual curiosity that spans over three millennia, surviving climate, neglect, and conflict to remind us of the power of written knowledge.",
    date: "2026-07-15",
    featuredImage: "https://images.unsplash.com/photo-1568667256549-094345857637?q=80&w=800&auto=format&fit=crop",
    category: "HERITAGE",
    slug: "the-library-that-survived-centuries",
    link: "https://pakkapatriot.com/the-library-that-survived-centuries",
    authorName: "Ananya Sharma",
    readTime: "4 min read"
  },
  {
    id: 102,
    title: "Ziro Valley: Where Nature Smiles",
    excerpt: "Explore the beauty, culture and warmth of Arunachal. Discover how the Apatani tribe lives in harmony with their misty hills, practicing unique sustainable farming.",
    content: "Nestled in the lower Subansiri district of Arunachal Pradesh, Ziro Valley is a UNESCO World Heritage site candidate that feels like a dream. Home to the Apatani tribe, the valley is famous for its pine-clad hills, bamboo houses, and incredibly efficient wet-rice cultivation systems that combine fish farming with agriculture. The Apatanis have a deep reverence for nature, reflected in their sacred groves and oral traditions. Every year, the valley echoes with indie music during the Ziro Festival, welcoming explorers from around the globe to experience its pristine breeze and friendly smiles.",
    date: "2026-07-10",
    featuredImage: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=800&auto=format&fit=crop",
    category: "PLACES",
    slug: "ziro-valley-where-nature-smiles",
    link: "https://pakkapatriot.com/ziro-valley-where-nature-smiles",
    authorName: "Rohan Das",
    readTime: "5 min read"
  },
  {
    id: 103,
    title: "Warli Art: Stories in Lines and Circles",
    excerpt: "The ancient art that speaks without words. Utilizing simple geometric shapes, Warli painters portray the daily rhythms of tribal life, community, and mother nature.",
    content: "Dating back to 2500 BCE, Warli art is one of Bhārat's oldest painting traditions, originating from the tribal communities of Maharashtra. Unlike courtly paintings, Warli art is a democratic, community-driven medium. Painted on mud walls using a paste of rice flour and water, the art uses only three basic shapes: the circle (representing the sun and moon), the triangle (derived from mountains and pointed trees), and the square (indicating a sacred enclosure). Through these simple lines, the artists weave complex narratives of harvests, marriages, dances, and a profound, balanced relationship with the forest.",
    date: "2026-07-08",
    featuredImage: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=800&auto=format&fit=crop",
    category: "TRADITIONS",
    slug: "warli-art-stories-in-lines-and-circles",
    link: "https://pakkapatriot.com/warli-art-stories-in-lines-and-circles",
    authorName: "Meera Nair",
    readTime: "3 min read"
  },
  {
    id: 104,
    title: "APJ Abdul Kalam: Dreamer of Bhārat",
    excerpt: "The man who inspired millions to dream big. Discover the humble origins, scientific breakthroughs, and the enduring youth legacy of the 'People's President'.",
    content: "Avul Pakir Jainulabdeen Abdul Kalam, born in the island town of Rameswaram, went on to become one of Bhārat's most beloved scientists and its 11th President. Known as the Missile Man of Bhārat for his role in developing indigenous aerospace capabilities, his true passion lay in teaching and interacting with young minds. He believed that the greatest resource of any nation is its youth, and spent his post-presidency years traveling to remote corners of the country, sparking curiosity and encouraging millions to 'dream, dream, dream, for dreams transform into thoughts and thoughts result in action.'",
    date: "2026-07-02",
    featuredImage: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800&auto=format&fit=crop",
    category: "PEOPLE",
    slug: "apj-abdul-kalam-dreamer-of-india",
    link: "https://pakkapatriot.com/apj-abdul-kalam-dreamer-of-india",
    authorName: "Vikram Mehta",
    readTime: "6 min read"
  },
  {
    id: 105,
    title: "The Musical Pillars of Hampi",
    excerpt: "Marvel at the architectural genius of the Vittala Temple, where stone pillars produce ethereal musical notes when tapped gently.",
    content: "In the ruins of the Vijayanagara Empire in Hampi stands the majestic Vittala Temple, famous for its stone chariot and its 56 musical pillars. Carved out of single pieces of resonant granite, these slender pillars emit distinct musical notes—resembling classical instruments like the mridangam, veena, and flute of Bhārat—when tapped gently. British researchers were so baffled that they cut two pillars to see if they were hollow or filled with metal, only to find solid stone, leaving the acoustic engineering secrets of 16th-century artisans a mesmerizing mystery of Bhārat.",
    date: "2026-06-28",
    featuredImage: "https://images.unsplash.com/photo-1600100397628-9844ca18a361?q=80&w=800&auto=format&fit=crop",
    category: "HERITAGE",
    slug: "musical-pillars-of-hampi",
    link: "https://pakkapatriot.com/musical-pillars-of-hampi",
    authorName: "Arjun Verma",
    readTime: "4 min read"
  },
  {
    id: 106,
    title: "Kite Flying: Bhārat's Sky Festivals",
    excerpt: "The vibrant traditions of Makar Sankranti, where millions take to rooftops to paint the sky with colorful paper kites and friendly battles.",
    content: "Kite flying is more than a sport in Bhārat; it is a celebration of life, harvest, and wind. On Makar Sankranti, cities like Ahmedabad and Jaipur transform into massive rooftop arenas. Kites of every color, size, and material dance in the sky as flyers engage in high-stakes tactical duels. It is a beautiful display of community, where neighbors share food, music blast from terraces, and the sky becomes a canvas of collective joy, uniting generations in the simple thrill of soaring high.",
    date: "2026-06-15",
    featuredImage: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800&auto=format&fit=crop",
    category: "FUN & ADVENTURE",
    slug: "kite-flying-sky-festivals",
    link: "https://pakkapatriot.com/kite-flying-sky-festivals",
    authorName: "Sanjay Joshi",
    readTime: "3 min read"
  }
];

export const FALLBACK_PRODUCTS: Product[] = [
  {
    id: 10382,
    name: "Chanakya T-Shirt",
    description: "Premium quality T-Shirt featuring Chanakya — the ancient teacher of Bhārat, philosopher, and royal advisor. Wear the wisdom of the ages.",
    shortDescription: "Premium cotton tee with Chanakya portrait print.",
    price: "350",
    regularPrice: "350",
    onSale: false,
    imageUrl: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=600&auto=format&fit=crop",
    category: "T-Shirts",
    link: "https://pakkapatriot.com/product/chanakya-t-shirt",
    inStock: true
  },
  {
    id: 202,
    name: "Taj Mahal Photo Frame",
    description: "Premium photo frame featuring the Taj Mahal design print. A timeless keepsake celebrating the crown jewel of Bhārat.",
    shortDescription: "Premium frame with Taj Mahal design print.",
    price: "499",
    regularPrice: "599",
    onSale: true,
    imageUrl: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?q=80&w=600&auto=format&fit=crop",
    category: "Photo Frames",
    link: "https://pakkapatriot.com/product/taj-mahal-photo-frame",
    inStock: true
  },
  {
    id: 203,
    name: "Curious Minds Coffee Mug",
    description: "Start your mornings with a sip of inspiration. High-quality ceramic mug printed with 'Curious minds change the country!'.",
    shortDescription: "Dishwasher and microwave safe 11oz ceramic mug.",
    price: "349",
    regularPrice: "349",
    onSale: false,
    imageUrl: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=600&auto=format&fit=crop",
    category: "Mugs",
    link: "https://pakkapatriot.com/product/curious-minds-mug",
    inStock: true
  },
  {
    id: 204,
    name: "Konark Photo Frame",
    description: "Premium photo frame featuring the Konark Sun Temple design print. A striking keepsake for your wall or desk.",
    shortDescription: "Premium frame with Konark Sun Temple design print.",
    price: "499",
    regularPrice: "499",
    onSale: false,
    imageUrl: "https://images.unsplash.com/photo-1508020963102-c6c723be5764?q=80&w=600&auto=format&fit=crop",
    category: "Photo Frames",
    link: "https://pakkapatriot.com/product/konark-photo-frame",
    inStock: true
  },
  {
    id: 205,
    name: "Heritage Sketch Notebook",
    description: "Hardcover journal with unruled premium 120GSM pages. Ideal for sketching monuments, writing travel notes, or mapping ideas.",
    shortDescription: "Premium unruled notebook for sketches and notes.",
    price: "299",
    regularPrice: "399",
    onSale: true,
    imageUrl: "https://images.unsplash.com/photo-1531346878377-a5be20888e57?q=80&w=600&auto=format&fit=crop",
    category: "Notebooks",
    link: "https://pakkapatriot.com/product/heritage-notebook",
    inStock: true
  },
  {
    id: 206,
    name: "Pakka Patriot Sticker Pack",
    description: "A pack of 10 high-quality vinyl, water-resistant stickers featuring traditional arts of Bhārat, historical landmarks, and quirky slogans.",
    shortDescription: "Waterproof vinyl decals for laptops, bottles, and diaries.",
    price: "199",
    regularPrice: "199",
    onSale: false,
    imageUrl: "https://images.unsplash.com/photo-1572375995501-4b0894dbe0d1?q=80&w=600&auto=format&fit=crop",
    category: "Stickers",
    link: "https://pakkapatriot.com/product/sticker-pack",
    inStock: true
  },
  {
    id: 207,
    name: "Eternal Bhārat Poster (A3)",
    description: "Thick matte paper print showcasing the architectural beauty and cultural heritage of Bhārat in an elegant minimal vector art style.",
    shortDescription: "Premium quality A3 print for room and workspace decoration.",
    price: "399",
    regularPrice: "499",
    onSale: true,
    imageUrl: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=600&auto=format&fit=crop",
    category: "Posters",
    link: "https://pakkapatriot.com/product/eternal-india-poster",
    inStock: true
  },
  {
    id: 208,
    name: "Handcrafted Brass Bookmark",
    description: "Intricately detailed brass bookmark resembling the traditional peacock and mandala designs, hand-polished by local metal craftsmen.",
    shortDescription: "Artisanal metal bookmark for booklovers.",
    price: "249",
    regularPrice: "299",
    onSale: true,
    imageUrl: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=600&auto=format&fit=crop",
    category: "Accessories",
    link: "https://pakkapatriot.com/product/brass-bookmark",
    inStock: true
  },
  {
    id: 209,
    name: "Banarasi Silk Stole",
    description: "Handwoven pure silk stole with intricate zari work by the weavers of Varanasi.",
    shortDescription: "Luxurious handwoven silk with traditional zari borders.",
    price: "1,999",
    regularPrice: "2,499",
    onSale: true,
    imageUrl: "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?q=80&w=600&auto=format&fit=crop",
    category: "MADE IN BHĀRAT",
    link: "https://pakkapatriot.com/product/banarasi-silk-stole",
    inStock: true
  },
  {
    id: 210,
    name: "Channapatna Toy Set",
    description: "Set of 5 eco-friendly lacquer turned wooden toys crafted by Karnataka artisans.",
    shortDescription: "Non-toxic natural toy set for creative learning.",
    price: "849",
    regularPrice: "849",
    onSale: false,
    imageUrl: "https://images.unsplash.com/photo-1612450632009-f41d7f6b57b8?q=80&w=600&auto=format&fit=crop",
    category: "MADE IN BHĀRAT",
    link: "https://pakkapatriot.com/product/channapatna-toy-set",
    inStock: true
  },
  {
    id: 211,
    name: "Madhubani Tote Bag",
    description: "Organic cotton tote bag hand-painted with natural-dye Madhubani art motifs.",
    shortDescription: "Eco-friendly hand-painted cotton tote.",
    price: "599",
    regularPrice: "799",
    onSale: true,
    imageUrl: "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=600&auto=format&fit=crop",
    category: "MADE IN BHĀRAT",
    link: "https://pakkapatriot.com/product/madhubani-tote",
    inStock: true
  },
  {
    id: 212,
    name: "Sanganeri Print Bedsheet",
    description: "Hand-block-printed cotton bedsheet dyed with natural vegetable colors from Rajasthan.",
    shortDescription: "Pure cotton block-print double bedsheet.",
    price: "1,299",
    regularPrice: "1,599",
    onSale: true,
    imageUrl: "https://images.unsplash.com/photo-1522771739016-7c97b2a2b1c3?q=80&w=600&auto=format&fit=crop",
    category: "MADE IN BHĀRAT",
    link: "https://pakkapatriot.com/product/sanganeri-bedsheet",
    inStock: true
  }
];

// Base URL for the Laravel backend.
// Defaults to the Vite dev proxy (/api -> http://localhost:8000).
// Override for production, e.g. VITE_LARAVEL_API_URL=https://api.pakkapatriot.com
const LARAVEL_API_URL =
  (import.meta.env.VITE_LARAVEL_API_URL as string | undefined)?.replace(/\/+$/, "") ?? "/api";

/**
 * Fetch latest stories/posts from the Laravel backend.
 *
 * The API is paginated (max 50 per page), so loop through every page to get
 * the complete blog catalogue — not just the newest page.
 */
export async function fetchWordPressPosts(): Promise<WPPost[]> {
  try {
    const all: any[] = [];
    let page = 1;
    let lastPage = 1;
    let loops = 0;

    do {
      const response = await fetch(`${LARAVEL_API_URL}/blogs?per_page=50&page=${page}`, {
        method: "GET",
        headers: { "Accept": "application/json" }
      });

      if (!response.ok) {
        throw new Error(`Laravel API returned status ${response.status}`);
      }

      const json = await response.json();
      const posts = json.data ?? [];

      if (!Array.isArray(posts) || posts.length === 0) {
        break;
      }

      all.push(...posts);
      lastPage = json.meta?.last_page ?? page;
      page += 1;
      loops += 1;
      if (loops > 20) break; // safety valve
    } while (page <= lastPage);

    if (all.length === 0) {
      return FALLBACK_POSTS;
    }

    return all.map((post: any) => ({
      id: post.id,
      title: post.title || "Untitled Post",
      excerpt: post.excerpt || "Explore the stories of Bhārat.",
      content: post.content || "",
      date: post.date || new Date().toISOString().split("T")[0],
      featuredImage: post.featured_image || "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=800&auto=format&fit=crop",
      category: post.category || "STORIES",
      slug: post.slug || `post-${post.id}`,
      link: post.link || `/${post.slug}`,
      authorName: post.author_name || "Pakka Patriot",
      readTime: post.read_time || "3 min read"
    }));
  } catch (error) {
    console.warn("Laravel blog fetch failed, using fallback data:", error);
    return FALLBACK_POSTS;
  }
}

/**
 * Fetch ALL products from the Laravel shop API.
 *
 * The API is paginated (newest first), so products created earliest — e.g. the
 * T-shirts — land on later pages. Loop through every page so the whole
 * catalogue (including the T-shirt category) reaches the site.
 */
export async function fetchProducts(): Promise<Product[]> {
  try {
    const all: any[] = [];
    let page = 1;
    let lastPage = 1;
    let loops = 0;

    do {
      const response = await fetch(`${LARAVEL_API_URL}/shop/products?per_page=50&page=${page}`, {
        method: "GET",
        headers: { "Accept": "application/json" }
      });

      if (!response.ok) {
        throw new Error(`Laravel API returned status ${response.status}`);
      }

      const json = await response.json();
      const products = json.data ?? [];
      if (!Array.isArray(products)) break;

      all.push(...products);
      lastPage = json.meta?.last_page ?? 1;
      page += 1;
      loops += 1;
    } while (page <= lastPage && loops < 20);

    if (all.length === 0) {
      return FALLBACK_PRODUCTS;
    }

    return all.map((product: any) => ({
      id: product.id,
      name: product.name || "Patriot Merch",
      description: product.description || "",
      shortDescription: product.short_description || "",
      price: product.price || "0",
      regularPrice: product.regular_price || product.price || "0",
      salePrice: product.sale_price || null,
      onSale: product.on_sale || false,
      imageUrl: product.image_url || "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=600&auto=format&fit=crop",
      images: Array.isArray(product.images) && product.images.length
        ? product.images
        : (product.image_url ? [product.image_url] : []),
      category: product.category || "Accessories",
      link: product.slug ? `/product/${product.slug}` : `#`,
      inStock: product.in_stock ?? true
    }));
  } catch (error) {
    console.warn("Laravel product fetch failed, using fallback data:", error);
    return FALLBACK_PRODUCTS;
  }
}

/* ─── ORDERS (Laravel backend) ────────────────────────────────────────────── */

/** Create an order on the Laravel backend (line_items + customer data). */
export async function apiCreateOrder(payload: {
  line_items: Array<{
    product_id: number;
    quantity: number;
    name?: string;
    price?: string;
    total?: string;
    subtotal?: string;
  }>;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  address_1: string;
  address_2: string;
  city: string;
  state: string;
  postcode: string;
  country: string;
  customer_note?: string;
}) {
  const res = await fetch(`${LARAVEL_API_URL}/orders`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return res.json();
}

/** Save a "Join the Journey" form submission to the Laravel backend. */
export async function submitJoinJourney(payload: {
  name: string;
  email: string;
  age?: string;
  city?: string;
  interests: string[];
}): Promise<{ success: boolean; message?: string; id?: number }> {
  const res = await fetch(`${LARAVEL_API_URL}/join-journey`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: payload.name,
      email: payload.email,
      age: payload.age ? Number(payload.age) : null,
      city: payload.city,
      interests: payload.interests,
    }),
  });
  if (!res.ok) {
    throw new Error(`Join journey failed (HTTP ${res.status})`);
  }
  return res.json();
}

/** Save a newsletter subscription to the Laravel backend. */
export async function subscribeNewsletter(email: string, source?: string): Promise<{ success: boolean; message?: string; id?: number; created?: boolean }> {
  const res = await fetch(`${LARAVEL_API_URL}/newsletter/subscribe`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, source }),
  });
  if (!res.ok) {
    throw new Error(`Newsletter subscribe failed (HTTP ${res.status})`);
  }
  return res.json();
}

/* ─── Helpers ──────────────────────────────────────────────────────────── */

/** Strip HTML tags and collapse whitespace (used by product/order formatting and site search). */
export function stripHtml(html: string, maxLength: number = 140): string {
  if (!html) return "";
  const clean = html.replace(/<\/?[^>]+(>|$)/g, "");
  const trimmed = clean.trim().replace(/\s+/g, " ");
  if (trimmed.length > maxLength) {
    return trimmed.slice(0, maxLength - 3) + "...";
  }
  return trimmed;
}
