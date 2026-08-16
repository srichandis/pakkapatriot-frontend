import 'dart:async';

import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter/material.dart';

import '../config.dart';
import '../models/api_models.dart';
import '../services/api_client.dart';
import '../state/site_data.dart';
import '../widgets/common.dart';
import 'blog_screens.dart';
import 'collection_screens.dart';
import 'shop_screens.dart';

/// Global search opened from the app header.
///
/// Searches three content types at once:
///  - Shop products (server-side via `/api/shop/products?search=`)
///  - Stories (server-side via `/api/blogs?search=`)
///  - Collection items (client-side from the cached `/api/data` payload)
class SearchScreen extends StatefulWidget {
  const SearchScreen({super.key});

  @override
  State<SearchScreen> createState() => _SearchScreenState();
}

class _SearchScreenState extends State<SearchScreen> {
  final ApiClient _api = ApiClient();
  final TextEditingController _controller = TextEditingController();
  Timer? _debounce;

  String _query = '';
  bool _searching = false;
  String? _error;

  List<Product> _products = const [];
  List<Blog> _blogs = const [];
  List<_CollectionHit> _collectionHits = const [];

  @override
  void dispose() {
    _debounce?.cancel();
    _controller.dispose();
    super.dispose();
  }

  void _onChanged(String value) {
    _debounce?.cancel();
    _debounce = Timer(const Duration(milliseconds: 350), () {
      _runSearch(value.trim());
    });
  }

  Future<void> _runSearch(String q) async {
    if (q.isEmpty) {
      setState(() {
        _query = '';
        _searching = false;
        _error = null;
        _products = const [];
        _blogs = const [];
        _collectionHits = const [];
      });
      return;
    }

    setState(() {
      _query = q;
      _searching = true;
      _error = null;
    });

    // Collections are searched client-side from the shared /api/data cache.
    final controller = SiteDataController.instance;
    if (!controller.hasData) controller.load();
    final hits = <_CollectionHit>[];
    final data = controller.data;
    if (data != null) {
      final ql = q.toLowerCase();
      for (final type in SiteData.collectionOrder) {
        final collection = data.collections[type];
        if (collection == null) continue;
        for (final item in collection.items) {
          if (item.name.toLowerCase().contains(ql) ||
              item.tagline.toLowerCase().contains(ql) ||
              item.region.toLowerCase().contains(ql) ||
              item.attribution.toLowerCase().contains(ql) ||
              item.nativeName.toLowerCase().contains(ql)) {
            hits.add(_CollectionHit(type: type, meta: collection.meta, item: item));
          }
        }
      }
    }

    try {
      final results = await Future.wait<Object>([
        _api.fetchProducts(search: q, perPage: 8),
        _api.fetchBlogs(search: q, perPage: 5),
      ]);
      if (!mounted) return;
      setState(() {
        _products = (results[0] as ProductPage).products;
        _blogs = (results[1] as BlogPage).blogs;
        _collectionHits = hits;
        _searching = false;
      });
    } catch (e) {
      if (!mounted) return;
      // Keep client-side collection hits even when the network call fails.
      setState(() {
        _collectionHits = hits;
        _searching = false;
        _error = e.toString();
      });
    }
  }

  void _clear() {
    _controller.clear();
    _onChanged('');
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        titleSpacing: 0,
        title: TextField(
          controller: _controller,
          autofocus: true,
          onChanged: _onChanged,
          textInputAction: TextInputAction.search,
          decoration: const InputDecoration(
            hintText: 'Search Bhārat…',
            border: InputBorder.none,
            isDense: true,
          ),
        ),
        actions: [
          if (_query.isNotEmpty)
            IconButton(
              icon: const Icon(Icons.close),
              tooltip: 'Clear',
              onPressed: _clear,
            ),
        ],
      ),
      body: _query.isEmpty ? _buildPrompt() : _buildResults(),
    );
  }

  Widget _buildPrompt() {
    return Center(
      child: Padding(
        padding: const EdgeInsets.all(32),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Icon(
              Icons.travel_explore,
              size: 56,
              color: Theme.of(context).colorScheme.primary.withValues(alpha: 0.6),
            ),
            const SizedBox(height: 12),
            Text(
              'Search products, stories, places,\npeople, ideas & more',
              textAlign: TextAlign.center,
              style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                    color: Theme.of(context).colorScheme.onSurfaceVariant,
                  ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildResults() {
    final theme = Theme.of(context);

    if (_searching && _products.isEmpty && _blogs.isEmpty && _collectionHits.isEmpty) {
      return const LoadingView(message: 'Searching…');
    }

    final sections = <Widget>[
      if (_collectionHits.isNotEmpty)
        _Section(
          title: 'Collections',
          children: [
            for (final hit in _collectionHits) _CollectionHitTile(hit: hit),
          ],
        ),
      if (_products.isNotEmpty)
        _Section(
          title: 'Shop',
          children: [
            for (final product in _products) _ProductHitTile(product: product),
          ],
        ),
      if (_blogs.isNotEmpty)
        _Section(
          title: 'Stories',
          children: [
            for (final blog in _blogs) _BlogHitTile(blog: blog),
          ],
        ),
    ];

    if (sections.isEmpty && !_searching) {
      return Center(
        child: Padding(
          padding: const EdgeInsets.all(32),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              const Icon(Icons.search_off, size: 48, color: Colors.grey),
              const SizedBox(height: 12),
              Text(
                'No results for “$_query”',
                textAlign: TextAlign.center,
                style: theme.textTheme.titleMedium?.copyWith(fontWeight: FontWeight.w700),
              ),
              if (_error != null) ...[
                const SizedBox(height: 8),
                Text(
                  _error!,
                  textAlign: TextAlign.center,
                  style: theme.textTheme.bodySmall?.copyWith(
                    color: theme.colorScheme.onSurfaceVariant,
                  ),
                ),
              ],
            ],
          ),
        ),
      );
    }

    return ListView(
      keyboardDismissBehavior: ScrollViewKeyboardDismissBehavior.onDrag,
      padding: const EdgeInsets.only(bottom: 24),
      children: [
        ...sections,
        if (_error != null && sections.isNotEmpty)
          Padding(
            padding: const EdgeInsets.all(16),
            child: Text(
              _error!,
              style: theme.textTheme.bodySmall?.copyWith(
                color: theme.colorScheme.onSurfaceVariant,
              ),
            ),
          ),
      ],
    );
  }
}

/// A collection item hit together with its collection meta.
class _CollectionHit {
  const _CollectionHit({
    required this.type,
    required this.meta,
    required this.item,
  });

  final String type;
  final CollectionMeta meta;
  final CollectionItem item;
}

class _Section extends StatelessWidget {
  const _Section({required this.title, required this.children});

  final String title;
  final List<Widget> children;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Padding(
          padding: const EdgeInsets.fromLTRB(16, 18, 16, 4),
          child: Text(
            title.toUpperCase(),
            style: theme.textTheme.labelSmall?.copyWith(
              color: theme.colorScheme.primary,
              fontWeight: FontWeight.w800,
              letterSpacing: 1.5,
            ),
          ),
        ),
        ...children,
      ],
    );
  }
}

class _CollectionHitTile extends StatelessWidget {
  const _CollectionHitTile({required this.hit});

  final _CollectionHit hit;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final meta = hit.meta;
    final item = hit.item;
    final label = meta.navLabel.isEmpty ? hit.type.toUpperCase() : meta.navLabel;

    return ListTile(
      leading: Container(
        width: 42,
        height: 42,
        decoration: BoxDecoration(
          gradient: tailwindGradient(item.accent),
          borderRadius: BorderRadius.circular(12),
        ),
        child: Center(
          child: Text(
            item.nativeName.isNotEmpty
                ? item.nativeName.characters.first
                : item.name.characters.first,
            style: const TextStyle(color: Colors.white, fontWeight: FontWeight.w800),
          ),
        ),
      ),
      title: Text(item.name, style: const TextStyle(fontWeight: FontWeight.w700)),
      subtitle: Text(
        [if (item.tagline.isNotEmpty) item.tagline, label].join(' • '),
        maxLines: 2,
        overflow: TextOverflow.ellipsis,
        style: theme.textTheme.bodySmall?.copyWith(
          color: theme.colorScheme.onSurfaceVariant,
        ),
      ),
      trailing: const Icon(Icons.chevron_right),
      onTap: () {
        Navigator.of(context).push(
          MaterialPageRoute(
            builder: (_) => CollectionItemDetailScreen(item: item, meta: meta),
          ),
        );
      },
    );
  }
}

class _ProductHitTile extends StatelessWidget {
  const _ProductHitTile({required this.product});

  final Product product;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final image = AppConfig.resolveImageUrl(product.imageUrl);

    return ListTile(
      leading: ClipRRect(
        borderRadius: BorderRadius.circular(8),
        child: SizedBox(
          width: 48,
          height: 48,
          child: image.isEmpty
              ? Container(
                  color: theme.colorScheme.surfaceContainerHighest,
                  child: const Icon(Icons.shopping_bag_outlined),
                )
              : CachedNetworkImage(
                  imageUrl: image,
                  fit: BoxFit.cover,
                  errorWidget: (_, _, _) => Container(
                    color: theme.colorScheme.surfaceContainerHighest,
                    child: const Icon(Icons.broken_image_outlined),
                  ),
                ),
        ),
      ),
      title: Text(
        product.name,
        maxLines: 1,
        overflow: TextOverflow.ellipsis,
        style: const TextStyle(fontWeight: FontWeight.w700),
      ),
      subtitle: Text(
        [
          if (product.category.isNotEmpty) product.category,
          AppConfig.formatPrice(product.price),
        ].join(' • '),
        maxLines: 1,
        overflow: TextOverflow.ellipsis,
        style: theme.textTheme.bodySmall?.copyWith(
          color: theme.colorScheme.onSurfaceVariant,
        ),
      ),
      trailing: const Icon(Icons.chevron_right),
      onTap: () {
        Navigator.of(context).push(
          MaterialPageRoute(builder: (_) => ProductDetailScreen(product: product)),
        );
      },
    );
  }
}

class _BlogHitTile extends StatelessWidget {
  const _BlogHitTile({required this.blog});

  final Blog blog;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return ListTile(
      leading: Container(
        width: 42,
        height: 42,
        decoration: BoxDecoration(
          color: theme.colorScheme.primaryContainer,
          borderRadius: BorderRadius.circular(12),
        ),
        child: const Icon(Icons.menu_book_outlined),
      ),
      title: Text(
        blog.title,
        maxLines: 1,
        overflow: TextOverflow.ellipsis,
        style: const TextStyle(fontWeight: FontWeight.w700),
      ),
      subtitle: Text(
        [
          if (blog.category.isNotEmpty) blog.category,
          if (blog.date.isNotEmpty) blog.date,
        ].join(' • '),
        maxLines: 1,
        overflow: TextOverflow.ellipsis,
        style: theme.textTheme.bodySmall?.copyWith(
          color: theme.colorScheme.onSurfaceVariant,
        ),
      ),
      trailing: const Icon(Icons.chevron_right),
      onTap: () {
        Navigator.of(context).push(
          MaterialPageRoute(builder: (_) => BlogDetailScreen(slug: blog.slug)),
        );
      },
    );
  }
}
