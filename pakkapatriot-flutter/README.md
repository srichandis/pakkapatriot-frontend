# Pakka Patriot — Flutter App

A Flutter client for the Pakka Patriot website, powered by the Laravel API at
**https://api.pakkapatriot.com/api**.

## Features

- **Discover** — the five knowledge collections (Ideas, Places, People, Culture,
  Create) with search and category filters, plus games, ebooks and activities
  from `/api/data`.
- **Stories** — paginated blog feed from `/api/blogs`; posts render their full
  WordPress HTML content (`/api/blogs/{slug}`).
- **Shop** — searchable, paginated product grid from `/api/shop/products` with
  colour-variant image galleries on the product detail page.
- **Cart & Checkout** — in-memory cart with quantity controls; checkout posts a
  real order to `POST /api/orders` (Bagisto order pipeline on the server).

## Getting started

```bash
cd pakkapatriot-flutter
flutter pub get
flutter run            # pick a device: android / ios / chrome / macos
```

Tests (model parsing against real API shapes, no network):

```bash
flutter test
```

Release builds:

```bash
flutter build web --release     # → build/web
flutter build apk --release     # → build/app/outputs/flutter-apk/
flutter build ios --release     # → requires Xcode (macOS only)
```

## Configuration

The API base URL and image host live in `lib/config.dart`:

```dart
static const String apiBaseUrl = 'https://api.pakkapatriot.com/api';
static const String apiHost    = 'https://api.pakkapatriot.com';
```

The API may return image paths as relative URLs (`/storage/...`); the app
resolves them against `apiHost` automatically via `AppConfig.resolveImageUrl()`.

## API endpoints used

| Endpoint | Method | Used for |
|---|---|---|
| `/api/data` | GET | Collections, games, ebooks, activities |
| `/api/blogs` | GET | Paginated blog list (`per_page`, `page`) |
| `/api/blogs/{slug}` | GET | Single blog post + related posts |
| `/api/shop/products` | GET | Paginated product list (`per_page`, `page`, `search`) |
| `/api/shop/products/{id}` | GET | Single product |
| `/api/orders` | POST | Place an order from the cart |

## Project structure

```
lib/
  main.dart                     # app entry, theme, bottom-nav shell
  config.dart                   # API base URL + image URL resolution
  models/api_models.dart        # models mirroring the API JSON shapes
  services/api_client.dart      # HTTP client for all endpoints
  state/cart.dart               # cart ChangeNotifier
  state/site_data.dart          # shared /api/data cache (home + header menu)
  screens/
    home_screen.dart            # Discover tab (collections, games, ebooks, activities)
    collection_screens.dart     # collection detail + item detail
    blog_screens.dart           # Stories tab: list + detail
    shop_screens.dart           # Shop tab: grid + product detail
    cart_screen.dart            # cart + checkout form + order success
  widgets/common.dart           # shared loaders, error views, section headers
  widgets/app_header.dart       # header with main web nav menu (People, Ideas, Places, Culture, Create, Made in Bhārat)
```
