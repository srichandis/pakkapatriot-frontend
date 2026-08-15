import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter/material.dart';

import '../config.dart';
import '../models/api_models.dart';
import '../services/api_client.dart';
import '../state/cart.dart';
import '../widgets/common.dart';

/// Shop tab: paginated product grid.
class ShopScreen extends StatefulWidget {
  const ShopScreen({super.key});

  @override
  State<ShopScreen> createState() => _ShopScreenState();
}

class _ShopScreenState extends State<ShopScreen> {
  final ApiClient _api = ApiClient();
  final ScrollController _scroll = ScrollController();
  final TextEditingController _search = TextEditingController();

  final List<Product> _products = [];
  PageMeta _meta = const PageMeta();
  bool _loading = false;
  bool _initialLoading = true;
  bool _hasMore = true;
  Object? _error;
  String _query = '';

  @override
  void initState() {
    super.initState();
    _scroll.addListener(_onScroll);
    _loadFirstPage();
  }

  @override
  void dispose() {
    _scroll.dispose();
    _search.dispose();
    super.dispose();
  }

  void _onScroll() {
    if (_scroll.position.pixels > _scroll.position.maxScrollExtent - 400) {
      _loadMore();
    }
  }

  Future<void> _loadFirstPage() async {
    setState(() {
      _initialLoading = true;
      _error = null;
      _products.clear();
      _hasMore = true;
      _meta = const PageMeta();
    });
    try {
      final page = await _api.fetchProducts(page: 1, search: _query);
      setState(() {
        _products.addAll(page.products);
        _meta = page.meta;
        _hasMore = page.products.isNotEmpty && page.meta.currentPage < page.meta.lastPage;
      });
    } catch (e) {
      setState(() => _error = e);
    } finally {
      setState(() => _initialLoading = false);
    }
  }

  Future<void> _loadMore() async {
    if (_loading || !_hasMore || _initialLoading) return;
    setState(() => _loading = true);
    try {
      final page = await _api.fetchProducts(page: _meta.currentPage + 1, search: _query);
      setState(() {
        _products.addAll(page.products);
        _meta = page.meta;
        _hasMore = page.products.isNotEmpty && page.meta.currentPage < page.meta.lastPage;
      });
    } catch (_) {
      // Keep what we have.
    } finally {
      setState(() => _loading = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Padding(
          padding: const EdgeInsets.fromLTRB(16, 12, 16, 4),
          child: TextField(
            controller: _search,
            onSubmitted: (v) {
              _query = v.trim();
              _loadFirstPage();
            },
            textInputAction: TextInputAction.search,
            decoration: InputDecoration(
              hintText: 'Search products...',
              prefixIcon: const Icon(Icons.search),
              suffixIcon: _query.isEmpty
                  ? null
                  : IconButton(
                      icon: const Icon(Icons.clear),
                      onPressed: () {
                        _search.clear();
                        _query = '';
                        _loadFirstPage();
                      },
                    ),
              isDense: true,
              border: OutlineInputBorder(borderRadius: BorderRadius.circular(12)),
            ),
          ),
        ),
        Expanded(child: _buildBody()),
      ],
    );
  }

  Widget _buildBody() {
    if (_initialLoading) {
      return const LoadingView(message: 'Loading products...');
    }
    if (_error != null && _products.isEmpty) {
      return ErrorView(error: _error!, onRetry: _loadFirstPage);
    }
    if (_products.isEmpty) {
      return const Center(child: Text('No products found.'));
    }
    return RefreshIndicator(
      onRefresh: _loadFirstPage,
      child: GridView.builder(
        controller: _scroll,
        physics: const AlwaysScrollableScrollPhysics(),
        padding: const EdgeInsets.all(16),
        gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
          crossAxisCount: 2,
          mainAxisSpacing: 12,
          crossAxisSpacing: 12,
          childAspectRatio: 0.72,
        ),
        itemCount: _products.length + (_hasMore ? 1 : 0),
        itemBuilder: (context, i) {
          if (i >= _products.length) {
            return const Center(child: CircularProgressIndicator());
          }
          return _ProductCard(product: _products[i]);
        },
      ),
    );
  }
}

class _ProductCard extends StatelessWidget {
  const _ProductCard({required this.product});

  final Product product;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final image = AppConfig.resolveImageUrl(product.imageUrl);
    return Card(
      clipBehavior: Clip.antiAlias,
      child: InkWell(
        onTap: () {
          Navigator.of(context).push(
            MaterialPageRoute(builder: (_) => ProductDetailScreen(product: product)),
          );
        },
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Expanded(
              child: SizedBox(
                width: double.infinity,
                child: image.isEmpty
                    ? Container(
                        color: theme.colorScheme.surfaceContainerHighest,
                        child: const Icon(Icons.shopping_bag_outlined, size: 40),
                      )
                    : CachedNetworkImage(
                        imageUrl: image,
                        fit: BoxFit.cover,
                        placeholder: (_, _) => Container(
                          color: theme.colorScheme.surfaceContainerHighest,
                          child: const Center(child: CircularProgressIndicator()),
                        ),
                        errorWidget: (_, _, _) => Container(
                          color: theme.colorScheme.surfaceContainerHighest,
                          child: const Icon(Icons.broken_image_outlined),
                        ),
                      ),
              ),
            ),
            Padding(
              padding: const EdgeInsets.all(10),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    product.name,
                    maxLines: 2,
                    overflow: TextOverflow.ellipsis,
                    style: theme.textTheme.titleSmall?.copyWith(fontWeight: FontWeight.w700),
                  ),
                  const SizedBox(height: 4),
                  Text(
                    product.category,
                    maxLines: 1,
                    overflow: TextOverflow.ellipsis,
                    style: theme.textTheme.labelSmall?.copyWith(
                      color: theme.colorScheme.onSurfaceVariant,
                    ),
                  ),
                  const SizedBox(height: 6),
                  Row(
                    children: [
                      Text(
                        AppConfig.formatPrice(product.price),
                        style: theme.textTheme.titleSmall?.copyWith(
                          color: theme.colorScheme.primary,
                          fontWeight: FontWeight.w800,
                        ),
                      ),
                      if (product.onSale && product.salePrice != null) ...[
                        const SizedBox(width: 6),
                        Text(
                          AppConfig.formatPrice(product.regularPrice),
                          style: theme.textTheme.labelSmall?.copyWith(
                            color: theme.colorScheme.onSurfaceVariant,
                            decoration: TextDecoration.lineThrough,
                          ),
                        ),
                      ],
                    ],
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}

/// Product detail: gallery of colour variants, price, description, add to cart.
class ProductDetailScreen extends StatefulWidget {
  const ProductDetailScreen({super.key, required this.product});

  final Product product;

  @override
  State<ProductDetailScreen> createState() => _ProductDetailScreenState();
}

class _ProductDetailScreenState extends State<ProductDetailScreen> {
  int _selectedImage = 0;
  int _quantity = 1;

  List<String> get _images => widget.product.images;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final product = widget.product;
    final currentImage = _images.isEmpty ? '' : AppConfig.resolveImageUrl(_images[_selectedImage]);
    final cart = Cart.instance;

    return Scaffold(
      appBar: AppBar(title: Text(product.name)),
      body: ListView(
        padding: const EdgeInsets.only(bottom: 32),
        children: [
          SizedBox(
            height: 300,
            child: currentImage.isEmpty
                ? Container(
                    color: theme.colorScheme.surfaceContainerHighest,
                    child: const Icon(Icons.shopping_bag_outlined, size: 64),
                  )
                : CachedNetworkImage(
                    imageUrl: currentImage,
                    fit: BoxFit.contain,
                    placeholder: (_, _) => Container(
                      color: theme.colorScheme.surfaceContainerHighest,
                      child: const Center(child: CircularProgressIndicator()),
                    ),
                    errorWidget: (_, _, _) => Container(
                      color: theme.colorScheme.surfaceContainerHighest,
                      child: const Icon(Icons.broken_image_outlined),
                    ),
                  ),
          ),
          if (_images.length > 1)
            SizedBox(
              height: 72,
              child: ListView.separated(
                padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 6),
                scrollDirection: Axis.horizontal,
                itemCount: _images.length,
                separatorBuilder: (_, _) => const SizedBox(width: 8),
                itemBuilder: (context, i) {
                  final url = AppConfig.resolveImageUrl(_images[i]);
                  return GestureDetector(
                    onTap: () => setState(() => _selectedImage = i),
                    child: Container(
                      width: 56,
                      decoration: BoxDecoration(
                        borderRadius: BorderRadius.circular(8),
                        border: Border.all(
                          color: i == _selectedImage
                              ? theme.colorScheme.primary
                              : theme.colorScheme.outlineVariant,
                          width: 2,
                        ),
                      ),
                      child: ClipRRect(
                        borderRadius: BorderRadius.circular(6),
                        child: CachedNetworkImage(
                          imageUrl: url,
                          fit: BoxFit.cover,
                          errorWidget: (_, _, _) =>
                              const Icon(Icons.broken_image_outlined),
                        ),
                      ),
                    ),
                  );
                },
              ),
            ),
          Padding(
            padding: const EdgeInsets.all(16),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                if (product.category.isNotEmpty)
                  Text(
                    product.category.toUpperCase(),
                    style: theme.textTheme.labelMedium?.copyWith(
                      color: theme.colorScheme.primary,
                      fontWeight: FontWeight.w800,
                      letterSpacing: 1.2,
                    ),
                  ),
                const SizedBox(height: 4),
                Text(
                  product.name,
                  style: theme.textTheme.headlineSmall?.copyWith(fontWeight: FontWeight.w800),
                ),
                const SizedBox(height: 8),
                Row(
                  crossAxisAlignment: CrossAxisAlignment.end,
                  children: [
                    Text(
                      AppConfig.formatPrice(product.price),
                      style: theme.textTheme.headlineSmall?.copyWith(
                        color: theme.colorScheme.primary,
                        fontWeight: FontWeight.w800,
                      ),
                    ),
                    if (product.onSale && product.salePrice != null) ...[
                      const SizedBox(width: 8),
                      Text(
                        AppConfig.formatPrice(product.regularPrice),
                        style: theme.textTheme.titleMedium?.copyWith(
                          color: theme.colorScheme.onSurfaceVariant,
                          decoration: TextDecoration.lineThrough,
                        ),
                      ),
                    ],
                    const Spacer(),
                    if (!product.inStock)
                      Text(
                        'Out of stock',
                        style: theme.textTheme.labelMedium?.copyWith(
                          color: theme.colorScheme.error,
                          fontWeight: FontWeight.w700,
                        ),
                      ),
                  ],
                ),
                if (product.sku.isNotEmpty) ...[
                  const SizedBox(height: 4),
                  Text(
                    'SKU: ${product.sku}',
                    style: theme.textTheme.labelSmall?.copyWith(
                      color: theme.colorScheme.onSurfaceVariant,
                    ),
                  ),
                ],
                if (product.shortDescription.isNotEmpty) ...[
                  const SizedBox(height: 12),
                  Text(
                    product.shortDescription,
                    style: theme.textTheme.bodyLarge,
                  ),
                ],
                if (product.description.isNotEmpty) ...[
                  const SizedBox(height: 12),
                  Text(product.description, style: theme.textTheme.bodyMedium),
                ],
                const SizedBox(height: 20),
                Row(
                  children: [
                    Text('Quantity', style: theme.textTheme.titleSmall?.copyWith(fontWeight: FontWeight.w700)),
                    const SizedBox(width: 16),
                    IconButton.outlined(
                      onPressed: _quantity > 1 ? () => setState(() => _quantity--) : null,
                      icon: const Icon(Icons.remove),
                    ),
                    SizedBox(
                      width: 40,
                      child: Text(
                        '$_quantity',
                        textAlign: TextAlign.center,
                        style: theme.textTheme.titleMedium?.copyWith(fontWeight: FontWeight.w800),
                      ),
                    ),
                    IconButton.outlined(
                      onPressed: () => setState(() => _quantity++),
                      icon: const Icon(Icons.add),
                    ),
                  ],
                ),
                const SizedBox(height: 20),
                SizedBox(
                  width: double.infinity,
                  child: FilledButton.icon(
                    onPressed: product.inStock
                        ? () {
                            cart.add(product, quantity: _quantity);
                            ScaffoldMessenger.of(context).showSnackBar(
                              SnackBar(content: Text('${product.name} added to cart')),
                            );
                          }
                        : null,
                    icon: const Icon(Icons.add_shopping_cart),
                    label: const Text('Add to Cart'),
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
