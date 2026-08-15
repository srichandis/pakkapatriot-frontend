import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter/material.dart';
import 'package:flutter_html/flutter_html.dart';

import '../config.dart';
import '../models/api_models.dart';
import '../services/api_client.dart';
import '../widgets/common.dart';

/// Stories tab: paginated list of blog posts.
class BlogListScreen extends StatefulWidget {
  const BlogListScreen({super.key});

  @override
  State<BlogListScreen> createState() => _BlogListScreenState();
}

class _BlogListScreenState extends State<BlogListScreen> {
  final ApiClient _api = ApiClient();
  final ScrollController _scroll = ScrollController();

  final List<Blog> _blogs = [];
  PageMeta _meta = const PageMeta();
  bool _loading = false;
  bool _initialLoading = true;
  Object? _error;
  bool _hasMore = true;

  @override
  void initState() {
    super.initState();
    _scroll.addListener(_onScroll);
    _loadFirstPage();
  }

  @override
  void dispose() {
    _scroll.dispose();
    super.dispose();
  }

  void _onScroll() {
    if (_scroll.position.pixels > _scroll.position.maxScrollExtent - 300) {
      _loadMore();
    }
  }

  Future<void> _loadFirstPage() async {
    setState(() {
      _initialLoading = true;
      _error = null;
      _blogs.clear();
      _hasMore = true;
    });
    try {
      final page = await _api.fetchBlogs(page: 1);
      setState(() {
        _blogs.addAll(page.blogs);
        _meta = page.meta;
        _hasMore = page.blogs.isNotEmpty && page.meta.currentPage < page.meta.lastPage;
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
      final page = await _api.fetchBlogs(page: _meta.currentPage + 1);
      setState(() {
        _blogs.addAll(page.blogs);
        _meta = page.meta;
        _hasMore = page.blogs.isNotEmpty && page.meta.currentPage < page.meta.lastPage;
      });
    } catch (_) {
      // Keep what we have; user can scroll again.
    } finally {
      setState(() => _loading = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    if (_initialLoading) {
      return const LoadingView(message: 'Loading stories...');
    }
    if (_error != null && _blogs.isEmpty) {
      return ErrorView(error: _error!, onRetry: _loadFirstPage);
    }
    return RefreshIndicator(
      onRefresh: _loadFirstPage,
      child: ListView.builder(
        controller: _scroll,
        physics: const AlwaysScrollableScrollPhysics(),
        padding: const EdgeInsets.symmetric(vertical: 12),
        itemCount: _blogs.length + (_hasMore ? 1 : 0),
        itemBuilder: (context, i) {
          if (i >= _blogs.length) {
            return const Padding(
              padding: EdgeInsets.all(20),
              child: Center(child: CircularProgressIndicator()),
            );
          }
          return _BlogCard(blog: _blogs[i]);
        },
      ),
    );
  }
}

class _BlogCard extends StatelessWidget {
  const _BlogCard({required this.blog});

  final Blog blog;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final image = AppConfig.resolveImageUrl(blog.featuredImage);
    return Card(
      margin: const EdgeInsets.symmetric(horizontal: 16, vertical: 6),
      clipBehavior: Clip.antiAlias,
      child: InkWell(
        onTap: () {
          Navigator.of(context).push(
            MaterialPageRoute(builder: (_) => BlogDetailScreen(slug: blog.slug)),
          );
        },
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            if (image.isNotEmpty)
              SizedBox(
                height: 160,
                width: double.infinity,
                child: CachedNetworkImage(
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
            Padding(
              padding: const EdgeInsets.all(14),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    children: [
                      if (blog.category.isNotEmpty)
                        Container(
                          padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                          decoration: BoxDecoration(
                            color: theme.colorScheme.primaryContainer,
                            borderRadius: BorderRadius.circular(20),
                          ),
                          child: Text(
                            blog.category,
                            style: theme.textTheme.labelSmall?.copyWith(
                              color: theme.colorScheme.onPrimaryContainer,
                              fontWeight: FontWeight.w800,
                            ),
                          ),
                        ),
                      const Spacer(),
                      if (blog.readTime.isNotEmpty)
                        Text(
                          blog.readTime,
                          style: theme.textTheme.labelSmall?.copyWith(
                            color: theme.colorScheme.onSurfaceVariant,
                          ),
                        ),
                    ],
                  ),
                  const SizedBox(height: 8),
                  Text(
                    blog.title,
                    style: theme.textTheme.titleMedium?.copyWith(fontWeight: FontWeight.w800),
                  ),
                  if (blog.excerpt.isNotEmpty) ...[
                    const SizedBox(height: 6),
                    Text(
                      blog.excerpt,
                      maxLines: 2,
                      overflow: TextOverflow.ellipsis,
                      style: theme.textTheme.bodyMedium?.copyWith(
                        color: theme.colorScheme.onSurfaceVariant,
                      ),
                    ),
                  ],
                  if (blog.date.isNotEmpty) ...[
                    const SizedBox(height: 8),
                    Text(
                      blog.date,
                      style: theme.textTheme.labelSmall?.copyWith(
                        color: theme.colorScheme.onSurfaceVariant,
                      ),
                    ),
                  ],
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}

/// Blog detail: renders the WordPress HTML content.
class BlogDetailScreen extends StatefulWidget {
  const BlogDetailScreen({super.key, required this.slug});

  final String slug;

  @override
  State<BlogDetailScreen> createState() => _BlogDetailScreenState();
}

class _BlogDetailScreenState extends State<BlogDetailScreen> {
  final ApiClient _api = ApiClient();
  late Future<BlogDetail> _future;

  @override
  void initState() {
    super.initState();
    _future = _api.fetchBlog(widget.slug);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Story')),
      body: FutureBuilder<BlogDetail>(
        future: _future,
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            return const LoadingView();
          }
          if (snapshot.hasError) {
            return ErrorView(
              error: snapshot.error!,
              onRetry: () => setState(() {
                _future = _api.fetchBlog(widget.slug);
              }),
            );
          }
          final blog = snapshot.data!.blog;
          final image = AppConfig.resolveImageUrl(blog.featuredImage);
          return ListView(
            padding: const EdgeInsets.only(bottom: 40),
            children: [
              if (image.isNotEmpty)
                CachedNetworkImage(
                  imageUrl: image,
                  fit: BoxFit.cover,
                  placeholder: (_, _) => const SizedBox(
                    height: 200,
                    child: Center(child: CircularProgressIndicator()),
                  ),
                  errorWidget: (_, _, _) => const SizedBox.shrink(),
                ),
              Padding(
                padding: const EdgeInsets.fromLTRB(16, 16, 16, 0),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    if (blog.category.isNotEmpty)
                      Text(
                        blog.category,
                        style: Theme.of(context).textTheme.labelMedium?.copyWith(
                              color: Theme.of(context).colorScheme.primary,
                              fontWeight: FontWeight.w800,
                              letterSpacing: 1.2,
                            ),
                      ),
                    const SizedBox(height: 6),
                    Text(
                      blog.title,
                      style: Theme.of(context).textTheme.headlineSmall?.copyWith(
                            fontWeight: FontWeight.w800,
                            height: 1.2,
                          ),
                    ),
                    const SizedBox(height: 8),
                    Text(
                      [
                        if (blog.authorName.isNotEmpty) 'By ${blog.authorName}',
                        if (blog.date.isNotEmpty) blog.date,
                        if (blog.readTime.isNotEmpty) blog.readTime,
                      ].join('  •  '),
                      style: Theme.of(context).textTheme.bodySmall?.copyWith(
                            color: Theme.of(context).colorScheme.onSurfaceVariant,
                          ),
                    ),
                  ],
                ),
              ),
              if (blog.content.isNotEmpty)
                Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 16),
                  child: Html(
                    data: blog.content,
                    style: {
                      'body': Style(
                        fontSize: FontSize(16),
                        lineHeight: LineHeight.number(1.6),
                        color: Theme.of(context).colorScheme.onSurface,
                      ),
                      'h1': Style(fontSize: FontSize(24), fontWeight: FontWeight.w800),
                      'h2': Style(fontSize: FontSize(21), fontWeight: FontWeight.w800),
                      'h3': Style(fontSize: FontSize(18), fontWeight: FontWeight.w800),
                      'a': Style(color: Theme.of(context).colorScheme.primary),
                      'img': Style(display: Display.block, width: Width(100, Unit.percent)),
                      'blockquote': Style(
                        fontStyle: FontStyle.italic,
                        border: Border(
                          left: BorderSide(
                            color: Theme.of(context).colorScheme.primary,
                            width: 3,
                          ),
                        ),
                      ),
                    },
                  ),
                ),
              const SizedBox(height: 16),
              const Divider(),
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                child: Text(
                  'More stories',
                  style: Theme.of(context).textTheme.titleMedium?.copyWith(fontWeight: FontWeight.w800),
                ),
              ),
              for (final related in snapshot.data!.related)
                _BlogCard(blog: related),
            ],
          );
        },
      ),
    );
  }
}
