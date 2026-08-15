// Model tests using JSON samples that mirror the real API responses from
// https://api.pakkapatriot.com/api (no network access needed).

import 'package:flutter_test/flutter_test.dart';

import 'package:pakkapatriot_flutter/config.dart';
import 'package:pakkapatriot_flutter/models/api_models.dart';

void main() {
  group('Product.fromJson', () {
    test('parses a product exactly as the API returns it', () {
      final product = Product.fromJson(const {
        'id': 457,
        'name': 'Taj Mahal T-Shirt',
        'description': 'Premium cotton tee.',
        'short_description': 'Premium cotton tee with line-art print.',
        'price': '499',
        'regular_price': '599',
        'sale_price': '499',
        'on_sale': true,
        'image_url': '/storage/product/457/tajmahal_white.png',
        'images': [
          '/storage/product/457/tajmahal_white.png',
          '/storage/product/457/tajmahal_charcoal.png',
        ],
        'category': 'T-Shirts',
        'in_stock': true,
        'sku': 'pp-tshirt-tajmahal',
        'slug': 'taj-mahal-t-shirt',
      });

      expect(product.id, 457);
      expect(product.name, 'Taj Mahal T-Shirt');
      expect(product.onSale, isTrue);
      expect(product.price, '499');
      expect(product.images, hasLength(2));
      expect(product.sku, 'pp-tshirt-tajmahal');
    });

    test('falls back to image_url when images is empty', () {
      final product = Product.fromJson(const {
        'id': 1,
        'name': 'X',
        'image_url': '/storage/product/1/x.png',
        'images': <String>[],
      });
      expect(product.images, ['/storage/product/1/x.png']);
    });
  });

  group('SiteData.fromJson', () {
    test('parses collections, games, ebooks and activities', () {
      final data = SiteData.fromJson(const {
        'collections': {
          'ideas': {
            'meta': {
              'navLabel': 'IDEAS',
              'badgeLabel': 'Ideas of Bhārat',
              'itemNoun': 'philosophies',
              'groupByCategory': true,
              'categories': [
                {'id': 'Vedic', 'label': 'Vedic Schools'},
              ],
            },
            'items': [
              {
                'slug': 'ajivika',
                'name': 'Ajivika',
                'nativeName': 'आजीविक',
                'tagline': 'The fatalists',
                'category': 'Śramaṇa',
                'era': 'c. 6th–4th c. BCE',
                'attribution': 'Makkhali Gosala',
                'region': 'Bihar',
                'icon': 'Moon',
                'accent': 'from-[#581C87] to-[#9333EA]',
                'quote': 'Niyati',
                'summary': 'The Ajivikas were a fierce ascetic order.',
                'overview': ['First paragraph.', 'Second paragraph.'],
                'coreIdeas': ['Idea one', 'Idea two'],
                'legacy': 'A lost philosophy.',
              },
            ],
          },
        },
        'games': [
          {
            'id': 3,
            'title': 'Aadu Puli Aatam',
            'tagline': 'Goats & Tigers',
            'description': 'A classic hunt.',
            'path': '/play/aadu-puli-aatam',
            'tags': [
              {'icon': 'Swords', 'label': '3 tigers vs 15 goats'},
            ],
            'accent': 'from-[#0C2419] to-[#1F4A33]',
            'badge': '★ South Bhārat',
          },
        ],
        'ebooks': [
          {
            'id': 34,
            'title': 'A.K. Ramanujan',
            'subtitle': 'The Scholar-Poet',
            'category': 'Poets',
            'era': '1929 – 1993',
            'description': 'A poet and folklorist.',
            'coverColor': 'from-[#5B21B6] to-[#7C3AED]',
            'coverEmoji': '🌍',
          },
        ],
        'activities': [
          {
            'slug': 'build',
            'badge': 'BUILD',
            'title': 'Build',
            'emoji': '🏗️',
            'tagline': 'Build models and machines.',
            'whatIs': 'Think like an engineer.',
            'knownFor': [
              {'text': 'A 4,500-year-old city.', 'emoji': '🏙️', 'title': 'Dholavira'},
            ],
            'tryThis': {'text': 'Build a paper bridge.', 'title': 'Paper bridge'},
            'related': [
              {'path': '/places/taj-mahal', 'label': 'The Taj Mahal'},
            ],
            'heroAccent': 'from-[#2563EB] to-[#60A5FA]',
            'tile': 'from-[#DBEAFE] to-[#BFDBFE]',
            'button': 'bg-[#2563EB]',
          },
        ],
      });

      expect(data.collections.keys, contains('ideas'));
      expect(data.collections['ideas']!.items, hasLength(1));
      expect(data.collections['ideas']!.items.first.coreIdeas, hasLength(2));
      expect(data.collections['ideas']!.meta.groupByCategory, isTrue);
      expect(data.games, hasLength(1));
      expect(data.games.first.title, 'Aadu Puli Aatam');
      expect(data.ebooks, hasLength(1));
      expect(data.ebooks.first.coverEmoji, '🌍');
      expect(data.activities, hasLength(1));
      expect(data.activities.first.knownFor.first.title, 'Dholavira');
    });
  });

  group('BlogPage.fromJson', () {
    test('parses paginated blog list', () {
      final page = BlogPage.fromJson(const {
        'data': [
          {
            'id': 3,
            'title': 'Aadu Puli Aatam',
            'slug': 'aadu-puli-aatam',
            'excerpt': 'Learn how to play.',
            'content': '<p>Hello</p>',
            'date': '2025-09-01',
            'featured_image': 'https://api.pakkapatriot.com/storage/2/game.png',
            'category': 'GAMES',
            'author_name': 'Pakka Patriot',
            'read_time': '4 min read',
            'link': 'https://api.pakkapatriot.com/aadu-puli-aatam',
          },
        ],
        'meta': {
          'current_page': 1,
          'last_page': 13,
          'per_page': 12,
          'total': 156,
        },
      });

      expect(page.blogs, hasLength(1));
      expect(page.blogs.first.category, 'GAMES');
      expect(page.meta.total, 156);
      expect(page.meta.lastPage, 13);
    });
  });

  group('AppConfig', () {
    test('resolves relative image paths against the API host', () {
      expect(
        AppConfig.resolveImageUrl('/storage/product/457/tajmahal_white.png'),
        'https://api.pakkapatriot.com/storage/product/457/tajmahal_white.png',
      );
      expect(
        AppConfig.resolveImageUrl('https://cdn.example.com/img.png'),
        'https://cdn.example.com/img.png',
      );
    });

    test('formats prices in INR', () {
      expect(AppConfig.formatPrice('499'), '₹499');
      expect(AppConfig.formatPrice('1299.50'), '₹1299.50');
      expect(AppConfig.formatPrice(''), '₹0');
    });
  });
}
