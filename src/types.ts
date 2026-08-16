/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface WPPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  featuredImage: string;
  category: string;
  slug: string;
  link: string;
  authorName?: string;
  readTime?: string;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  shortDescription?: string;
  price: string;
  regularPrice: string;
  salePrice?: string;
  onSale: boolean;
  imageUrl: string;
  /** All colour/gallery variants (local Laravel API only); imageUrl is the primary. */
  images?: string[];
  category: string;
  link: string;
  inStock: boolean;
}

/** ─── Cart & Checkout Types ───────────────────────────────────────────── */

/** A single item in the local cart (with quantity) */
export interface CartItem {
  product: Product;
  quantity: number;
}

/** Checkout form data */
export interface CheckoutFormData {
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
  customer_note: string;
  // Shipping (defaults to same as billing)
  shipping_same: boolean;
  shipping_first_name?: string;
  shipping_last_name?: string;
  shipping_address_1?: string;
  shipping_address_2?: string;
  shipping_city?: string;
  shipping_state?: string;
  shipping_postcode?: string;
}

/** Result from a successful order placement */
export interface OrderResult {
  order_id: number;
  order_key: string;
  total: string;
  currency: string;
  status: string;
}
