/// Models mirroring the JSON shapes returned by the Laravel API at
/// https://api.pakkapatriot.com/api (routes defined in routes/api.php).
library;

/// Convenience: read a list of strings from a JSON value.
List<String> _stringList(dynamic value) {
  if (value is! List) return const [];
  return value.whereType<String>().toList();
}

/// Top-level payload of `GET /api/data`.
class SiteData {
  const SiteData({
    required this.collections,
    required this.games,
    required this.ebooks,
    required this.activities,
  });

  /// Keyed by collection type: ideas, places, people, culture, create.
  final Map<String, Collection> collections;
  final List<Game> games;
  final List<EBook> ebooks;
  final List<Activity> activities;

  factory SiteData.fromJson(Map<String, dynamic> json) {
    final collectionsJson = json['collections'];
    final collections = <String, Collection>{};
    if (collectionsJson is Map) {
      collectionsJson.forEach((key, value) {
        if (value is Map<String, dynamic>) {
          collections[key.toString()] = Collection.fromJson(value);
        } else if (value is Map) {
          collections[key.toString()] =
              Collection.fromJson(Map<String, dynamic>.from(value));
        }
      });
    }

    return SiteData(
      collections: collections,
      games: _list(json['games'], Game.fromJson),
      ebooks: _list(json['ebooks'], EBook.fromJson),
      activities: _list(json['activities'], Activity.fromJson),
    );
  }

  /// Stable display order for the five collections.
  static const List<String> collectionOrder = [
    'ideas',
    'places',
    'people',
    'culture',
    'create',
  ];
}

T _fromMap<T>(dynamic value, T Function(Map<String, dynamic>) fromJson,
    [T? fallback]) {
  if (value is Map<String, dynamic>) return fromJson(value);
  if (value is Map) return fromJson(Map<String, dynamic>.from(value));
  return fallback as T;
}

List<T> _list<T>(dynamic value, T Function(Map<String, dynamic>) fromJson) {
  if (value is! List) return const [];
  return value
      .map((e) => _fromMap(e, fromJson))
      .whereType<T>()
      .toList();
}

/// A knowledge collection: meta (labels/filters) + items.
class Collection {
  const Collection({required this.meta, required this.items});

  final CollectionMeta meta;
  final List<CollectionItem> items;

  factory Collection.fromJson(Map<String, dynamic> json) => Collection(
        meta: _fromMap(
            json['meta'], CollectionMeta.fromJson, const CollectionMeta()),
        items: _list(json['items'], CollectionItem.fromJson),
      );
}

class CollectionCategory {
  const CollectionCategory({required this.id, required this.label});

  final String id;
  final String label;

  factory CollectionCategory.fromJson(Map<String, dynamic> json) =>
      CollectionCategory(
        id: (json['id'] ?? '').toString(),
        label: (json['label'] ?? '').toString(),
      );
}

class CollectionMeta {
  const CollectionMeta({
    this.navLabel = '',
    this.heroIcon = '',
    this.badgeLabel = '',
    this.titlePrefix = '',
    this.titleHighlight = '',
    this.subtitle = '',
    this.searchPlaceholder = 'Search...',
    this.itemNoun = 'items',
    this.itemNounSingular = 'item',
    this.categories = const [],
    this.eraLabel = 'Period',
    this.attributionLabel = 'Attribution',
    this.regionLabel = 'Region',
    this.categoryLabel = 'Category',
    this.groupByCategory = false,
  });

  final String navLabel;
  final String heroIcon;
  final String badgeLabel;
  final String titlePrefix;
  final String titleHighlight;
  final String subtitle;
  final String searchPlaceholder;
  final String itemNoun;
  final String itemNounSingular;
  final List<CollectionCategory> categories;
  final String eraLabel;
  final String attributionLabel;
  final String regionLabel;
  final String categoryLabel;
  final bool groupByCategory;

  factory CollectionMeta.fromJson(Map<String, dynamic> json) =>
      CollectionMeta(
        navLabel: (json['navLabel'] ?? '').toString(),
        heroIcon: (json['heroIcon'] ?? '').toString(),
        badgeLabel: (json['badgeLabel'] ?? '').toString(),
        titlePrefix: (json['titlePrefix'] ?? '').toString(),
        titleHighlight: (json['titleHighlight'] ?? '').toString(),
        subtitle: (json['subtitle'] ?? '').toString(),
        searchPlaceholder: (json['searchPlaceholder'] ?? 'Search...').toString(),
        itemNoun: (json['itemNoun'] ?? 'items').toString(),
        itemNounSingular: (json['itemNounSingular'] ?? 'item').toString(),
        categories:
            _list(json['categories'], CollectionCategory.fromJson),
        eraLabel: (json['eraLabel'] ?? 'Period').toString(),
        attributionLabel: (json['attributionLabel'] ?? 'Attribution').toString(),
        regionLabel: (json['regionLabel'] ?? 'Region').toString(),
        categoryLabel: (json['categoryLabel'] ?? 'Category').toString(),
        groupByCategory: json['groupByCategory'] == true,
      );
}

class CollectionItem {
  const CollectionItem({
    required this.slug,
    required this.name,
    this.nativeName = '',
    this.tagline = '',
    this.category = '',
    this.era = '',
    this.attribution = '',
    this.region = '',
    this.icon = '',
    this.accent = '',
    this.softAccent = '',
    this.iconColor = '',
    this.quote = '',
    this.quoteSource = '',
    this.summary = '',
    this.overview = const [],
    this.coreIdeas = const [],
    this.legacy = '',
  });

  final String slug;
  final String name;
  final String nativeName;
  final String tagline;
  final String category;
  final String era;
  final String attribution;
  final String region;
  final String icon;
  final String accent;
  final String softAccent;
  final String iconColor;
  final String quote;
  final String quoteSource;
  final String summary;
  final List<String> overview;
  final List<String> coreIdeas;
  final String legacy;

  factory CollectionItem.fromJson(Map<String, dynamic> json) =>
      CollectionItem(
        slug: (json['slug'] ?? '').toString(),
        name: (json['name'] ?? '').toString(),
        nativeName: (json['nativeName'] ?? '').toString(),
        tagline: (json['tagline'] ?? '').toString(),
        category: (json['category'] ?? '').toString(),
        era: (json['era'] ?? '').toString(),
        attribution: (json['attribution'] ?? '').toString(),
        region: (json['region'] ?? '').toString(),
        icon: (json['icon'] ?? '').toString(),
        accent: (json['accent'] ?? '').toString(),
        softAccent: (json['softAccent'] ?? '').toString(),
        iconColor: (json['iconColor'] ?? '').toString(),
        quote: (json['quote'] ?? '').toString(),
        quoteSource: (json['quoteSource'] ?? '').toString(),
        summary: (json['summary'] ?? '').toString(),
        overview: _stringList(json['overview']),
        coreIdeas: _stringList(json['coreIdeas']),
        legacy: (json['legacy'] ?? '').toString(),
      );
}

class Game {
  const Game({
    required this.id,
    required this.title,
    this.tagline = '',
    this.description = '',
    this.path = '',
    this.tags = const [],
    this.accent = '',
    this.badge = '',
  });

  final int id;
  final String title;
  final String tagline;
  final String description;
  final String path;
  final List<GameTag> tags;
  final String accent;
  final String badge;

  factory Game.fromJson(Map<String, dynamic> json) => Game(
        id: (json['id'] as num?)?.toInt() ?? 0,
        title: (json['title'] ?? '').toString(),
        tagline: (json['tagline'] ?? '').toString(),
        description: (json['description'] ?? '').toString(),
        path: (json['path'] ?? '').toString(),
        tags: _list(json['tags'], GameTag.fromJson),
        accent: (json['accent'] ?? '').toString(),
        badge: (json['badge'] ?? '').toString(),
      );
}

class GameTag {
  const GameTag({this.icon = '', this.label = ''});

  final String icon;
  final String label;

  factory GameTag.fromJson(Map<String, dynamic> json) =>
      GameTag(icon: (json['icon'] ?? '').toString(), label: (json['label'] ?? '').toString());
}

class EBook {
  const EBook({
    required this.id,
    required this.title,
    this.subtitle = '',
    this.category = '',
    this.era = '',
    this.description = '',
    this.coverColor = '',
    this.coverEmoji = '',
  });

  final int id;
  final String title;
  final String subtitle;
  final String category;
  final String era;
  final String description;
  final String coverColor;
  final String coverEmoji;

  factory EBook.fromJson(Map<String, dynamic> json) => EBook(
        id: (json['id'] as num?)?.toInt() ?? 0,
        title: (json['title'] ?? '').toString(),
        subtitle: (json['subtitle'] ?? '').toString(),
        category: (json['category'] ?? '').toString(),
        era: (json['era'] ?? '').toString(),
        description: (json['description'] ?? '').toString(),
        coverColor: (json['coverColor'] ?? '').toString(),
        coverEmoji: (json['coverEmoji'] ?? '').toString(),
      );
}

class Activity {
  const Activity({
    required this.slug,
    required this.title,
    this.badge = '',
    this.emoji = '',
    this.tagline = '',
    this.whatIs = '',
    this.knownFor = const [],
    this.tryThis,
    this.related = const [],
    this.heroAccent = '',
    this.tile = '',
    this.button = '',
  });

  final String slug;
  final String title;
  final String badge;
  final String emoji;
  final String tagline;
  final String whatIs;
  final List<ActivityKnownFor> knownFor;
  final ActivityTryThis? tryThis;
  final List<ActivityRelated> related;
  final String heroAccent;
  final String tile;
  final String button;

  factory Activity.fromJson(Map<String, dynamic> json) => Activity(
        slug: (json['slug'] ?? '').toString(),
        title: (json['title'] ?? '').toString(),
        badge: (json['badge'] ?? '').toString(),
        emoji: (json['emoji'] ?? '').toString(),
        tagline: (json['tagline'] ?? '').toString(),
        whatIs: (json['whatIs'] ?? '').toString(),
        knownFor: _list(json['knownFor'], ActivityKnownFor.fromJson),
        tryThis: json['tryThis'] == null ? null : _fromMap(json['tryThis'], ActivityTryThis.fromJson),
        related: _list(json['related'], ActivityRelated.fromJson),
        heroAccent: (json['heroAccent'] ?? '').toString(),
        tile: (json['tile'] ?? '').toString(),
        button: (json['button'] ?? '').toString(),
      );
}

class ActivityKnownFor {
  const ActivityKnownFor({this.text = '', this.emoji = '', this.title = ''});

  final String text;
  final String emoji;
  final String title;

  factory ActivityKnownFor.fromJson(Map<String, dynamic> json) =>
      ActivityKnownFor(
        text: (json['text'] ?? '').toString(),
        emoji: (json['emoji'] ?? '').toString(),
        title: (json['title'] ?? '').toString(),
      );
}

class ActivityTryThis {
  const ActivityTryThis({this.text = '', this.title = ''});

  final String text;
  final String title;

  factory ActivityTryThis.fromJson(Map<String, dynamic> json) =>
      ActivityTryThis(
        text: (json['text'] ?? '').toString(),
        title: (json['title'] ?? '').toString(),
      );
}

class ActivityRelated {
  const ActivityRelated({this.path = '', this.label = ''});

  final String path;
  final String label;

  factory ActivityRelated.fromJson(Map<String, dynamic> json) =>
      ActivityRelated(
        path: (json['path'] ?? '').toString(),
        label: (json['label'] ?? '').toString(),
      );
}

/// Pagination metadata returned by blog/product endpoints.
class PageMeta {
  const PageMeta({
    this.currentPage = 1,
    this.lastPage = 1,
    this.perPage = 12,
    this.total = 0,
  });

  final int currentPage;
  final int lastPage;
  final int perPage;
  final int total;

  factory PageMeta.fromJson(Map<String, dynamic> json) => PageMeta(
        currentPage: (json['current_page'] as num?)?.toInt() ?? 1,
        lastPage: (json['last_page'] as num?)?.toInt() ?? 1,
        perPage: (json['per_page'] as num?)?.toInt() ?? 12,
        total: (json['total'] as num?)?.toInt() ?? 0,
      );
}

/// A blog post (list items and detail share the same shape).
class Blog {
  const Blog({
    required this.id,
    required this.title,
    required this.slug,
    this.excerpt = '',
    this.content = '',
    this.date = '',
    this.featuredImage = '',
    this.category = '',
    this.authorName = '',
    this.readTime = '',
    this.link = '',
  });

  final int id;
  final String title;
  final String slug;
  final String excerpt;
  final String content;
  final String date;
  final String featuredImage;
  final String category;
  final String authorName;
  final String readTime;
  final String link;

  factory Blog.fromJson(Map<String, dynamic> json) => Blog(
        id: (json['id'] as num?)?.toInt() ?? 0,
        title: (json['title'] ?? '').toString(),
        slug: (json['slug'] ?? '').toString(),
        excerpt: (json['excerpt'] ?? '').toString(),
        content: (json['content'] ?? '').toString(),
        date: (json['date'] ?? '').toString(),
        featuredImage: (json['featured_image'] ?? '').toString(),
        category: (json['category'] ?? '').toString(),
        authorName: (json['author_name'] ?? '').toString(),
        readTime: (json['read_time'] ?? '').toString(),
        link: (json['link'] ?? '').toString(),
      );
}

/// Paginated blog list: `{ data: [...], meta: {...} }`.
class BlogPage {
  const BlogPage({required this.blogs, required this.meta});

  final List<Blog> blogs;
  final PageMeta meta;

  factory BlogPage.fromJson(Map<String, dynamic> json) => BlogPage(
        blogs: _list(json['data'], Blog.fromJson),
        meta: _fromMap(json['meta'], PageMeta.fromJson, const PageMeta()),
      );
}

/// Blog detail: `{ data: {...}, related: [...] }`.
class BlogDetail {
  const BlogDetail({required this.blog, required this.related});

  final Blog blog;
  final List<Blog> related;

  factory BlogDetail.fromJson(Map<String, dynamic> json) => BlogDetail(
        blog: _fromMap(json['data'], Blog.fromJson, const Blog(
              id: 0, title: '', slug: '')),
        related: _list(json['related'], Blog.fromJson),
      );
}

/// A shop product.
class Product {
  const Product({
    required this.id,
    required this.name,
    this.description = '',
    this.shortDescription = '',
    this.price = '',
    this.regularPrice = '',
    this.salePrice,
    this.onSale = false,
    this.imageUrl = '',
    this.images = const [],
    this.category = '',
    this.inStock = true,
    this.sku = '',
    this.slug = '',
  });

  final int id;
  final String name;
  final String description;
  final String shortDescription;
  final String price;
  final String regularPrice;
  final String? salePrice;
  final bool onSale;
  final String imageUrl;
  final List<String> images;
  final String category;
  final bool inStock;
  final String sku;
  final String slug;

  factory Product.fromJson(Map<String, dynamic> json) {
    final images = _stringList(json['images']);
    final imageUrl = (json['image_url'] ?? '').toString();
    return Product(
      id: (json['id'] as num?)?.toInt() ?? 0,
      name: (json['name'] ?? '').toString(),
      description: (json['description'] ?? '').toString(),
      shortDescription: (json['short_description'] ?? '').toString(),
      price: (json['price'] ?? '').toString(),
      regularPrice: (json['regular_price'] ?? '').toString(),
      salePrice: json['sale_price']?.toString(),
      onSale: json['on_sale'] == true,
      imageUrl: imageUrl,
      images: images.isEmpty && imageUrl.isNotEmpty ? [imageUrl] : images,
      category: (json['category'] ?? '').toString(),
      inStock: json['in_stock'] != false,
      sku: (json['sku'] ?? '').toString(),
      slug: (json['slug'] ?? '').toString(),
    );
  }
}

/// Paginated product list: `{ data: [...], meta: {...} }`.
class ProductPage {
  const ProductPage({required this.products, required this.meta});

  final List<Product> products;
  final PageMeta meta;

  factory ProductPage.fromJson(Map<String, dynamic> json) => ProductPage(
        products: _list(json['data'], Product.fromJson),
        meta: _fromMap(json['meta'], PageMeta.fromJson, const PageMeta()),
      );
}
