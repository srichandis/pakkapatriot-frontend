import 'package:flutter/material.dart';

import '../models/api_models.dart';
import '../state/site_data.dart';
import '../widgets/common.dart';
import '../widgets/newsletter_section.dart';
import 'collection_screens.dart';
import 'detail_screens.dart';

/// Discover tab: shows collections, games, ebooks and activities from
/// `GET /api/data` (fetched once via [SiteDataController] and shared with
/// the header menu).
class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  @override
  void initState() {
    super.initState();
    SiteDataController.instance.load();
  }

  @override
  Widget build(BuildContext context) {
    return ListenableBuilder(
      listenable: SiteDataController.instance,
      builder: (context, _) {
        final controller = SiteDataController.instance;
        if (controller.loading && !controller.hasData) {
          return const LoadingView(message: 'Loading Bhārat...');
        }
        if (controller.error != null && !controller.hasData) {
          return ErrorView(
            error: controller.error!,
            onRetry: controller.reload,
          );
        }
        final data = controller.data!;
        return RefreshIndicator(
          onRefresh: controller.reload,
          child: CustomScrollView(
            physics: const AlwaysScrollableScrollPhysics(),
            slivers: [
              const SliverToBoxAdapter(child: _HeroHeader()),
              if (data.games.isNotEmpty)
                SliverToBoxAdapter(
                  child: SectionHeader(
                    title: 'Games',
                    subtitle: 'Traditional games of Bhārat',
                  ),
                ),
              if (data.games.isNotEmpty)
                SliverToBoxAdapter(
                  child: SizedBox(
                    height: 170,
                    child: ListView.separated(
                      padding: const EdgeInsets.symmetric(horizontal: 16),
                      scrollDirection: Axis.horizontal,
                      itemCount: data.games.length,
                      separatorBuilder: (_, _) => const SizedBox(width: 12),
                      itemBuilder: (context, i) => _GameCard(
                        game: data.games[i],
                        onTap: () => Navigator.of(context).push(
                          MaterialPageRoute(
                            builder: (_) =>
                                GameDetailScreen(game: data.games[i]),
                          ),
                        ),
                      ),
                    ),
                  ),
                ),
              if (data.ebooks.isNotEmpty)
                SliverToBoxAdapter(
                  child: SectionHeader(
                    title: 'Ebooks',
                    subtitle: 'Books from the land of Bhārat',
                  ),
                ),
              if (data.ebooks.isNotEmpty)
                SliverToBoxAdapter(
                  child: SizedBox(
                    height: 200,
                    child: ListView.separated(
                      padding: const EdgeInsets.symmetric(horizontal: 16),
                      scrollDirection: Axis.horizontal,
                      itemCount: data.ebooks.length,
                      separatorBuilder: (_, _) => const SizedBox(width: 12),
                      itemBuilder: (context, i) => _EbookCard(
                        ebook: data.ebooks[i],
                        onTap: () => Navigator.of(context).push(
                          MaterialPageRoute(
                            builder: (_) =>
                                EbookDetailScreen(ebook: data.ebooks[i]),
                          ),
                        ),
                      ),
                    ),
                  ),
                ),
              if (data.activities.isNotEmpty)
                SliverToBoxAdapter(
                  child: SectionHeader(
                    title: 'Create',
                    subtitle: 'Things you can make & do',
                  ),
                ),
              if (data.activities.isNotEmpty)
                SliverToBoxAdapter(
                  child: SizedBox(
                    height: 150,
                    child: ListView.separated(
                      padding: const EdgeInsets.symmetric(horizontal: 16),
                      scrollDirection: Axis.horizontal,
                      itemCount: data.activities.length,
                      separatorBuilder: (_, _) => const SizedBox(width: 12),
                      itemBuilder: (context, i) => _ActivityCard(
                        activity: data.activities[i],
                        onTap: () => Navigator.of(context).push(
                          MaterialPageRoute(
                            builder: (_) => ActivityDetailScreen(
                              activity: data.activities[i],
                            ),
                          ),
                        ),
                      ),
                    ),
                  ),
                ),
              if (data.collections.isNotEmpty) ...[
                SliverToBoxAdapter(
                  child: SectionHeader(
                    title: 'Collections',
                    subtitle: 'Ideas, places, people & culture',
                  ),
                ),
                SliverPadding(
                  padding: const EdgeInsets.fromLTRB(16, 0, 16, 24),
                  sliver: SliverGrid(
                    gridDelegate:
                        const SliverGridDelegateWithFixedCrossAxisCount(
                          crossAxisCount: 2,
                          mainAxisSpacing: 12,
                          crossAxisSpacing: 12,
                          childAspectRatio: 1.35,
                        ),
                    delegate: SliverChildBuilderDelegate((context, i) {
                      final key = SiteData.collectionOrder[i];
                      final collection = data.collections[key];
                      if (collection == null) {
                        return const SizedBox.shrink();
                      }
                      return _CollectionCard(type: key, collection: collection);
                    }, childCount: SiteData.collectionOrder.length),
                  ),
                ),
              ],
              const SliverToBoxAdapter(child: NewsletterSection()),
            ],
          ),
        );
      },
    );
  }
}

class _HeroHeader extends StatelessWidget {
  const _HeroHeader();

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return Container(
      margin: const EdgeInsets.fromLTRB(16, 16, 16, 4),
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        gradient: const LinearGradient(
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
          colors: [Color(0xFFB45309), Color(0xFFEA580C)],
        ),
        borderRadius: BorderRadius.circular(20),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'PAKKA PATRIOT',
            style: theme.textTheme.labelMedium?.copyWith(
              color: Colors.white.withValues(alpha: 0.85),
              fontWeight: FontWeight.w800,
              letterSpacing: 2,
            ),
          ),
          const SizedBox(height: 8),
          Text(
            'Ideas, Icons &\nInventions of Bhārat',
            style: theme.textTheme.headlineSmall?.copyWith(
              color: Colors.white,
              fontWeight: FontWeight.w800,
              height: 1.15,
            ),
          ),
          const SizedBox(height: 8),
          Text(
            'Philosophies, monuments, legends, games and creations — all from the world\'s oldest civilisation.',
            style: theme.textTheme.bodyMedium?.copyWith(
              color: Colors.white.withValues(alpha: 0.9),
            ),
          ),
        ],
      ),
    );
  }
}

class _GameCard extends StatelessWidget {
  const _GameCard({required this.game, this.onTap});

  final Game game;
  final VoidCallback? onTap;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return GestureDetector(
      onTap: onTap,
      child: Container(
        width: 210,
        padding: const EdgeInsets.all(14),
        decoration: BoxDecoration(
          gradient: tailwindGradient(game.accent),
          borderRadius: BorderRadius.circular(16),
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            if (game.badge.isNotEmpty)
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                decoration: BoxDecoration(
                  color: Colors.white.withValues(alpha: 0.2),
                  borderRadius: BorderRadius.circular(20),
                ),
                child: Text(
                  game.badge,
                  style: theme.textTheme.labelSmall?.copyWith(
                    color: Colors.white,
                    fontWeight: FontWeight.w700,
                  ),
                ),
              ),
            const Spacer(),
            Text(
              game.title,
              maxLines: 2,
              overflow: TextOverflow.ellipsis,
              style: theme.textTheme.titleMedium?.copyWith(
                color: Colors.white,
                fontWeight: FontWeight.w800,
              ),
            ),
            const SizedBox(height: 4),
            Text(
              game.tagline,
              maxLines: 2,
              overflow: TextOverflow.ellipsis,
              style: theme.textTheme.bodySmall?.copyWith(
                color: Colors.white.withValues(alpha: 0.9),
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class _EbookCard extends StatelessWidget {
  const _EbookCard({required this.ebook, this.onTap});

  final EBook ebook;
  final VoidCallback? onTap;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return GestureDetector(
      onTap: onTap,
      child: SizedBox(
        width: 140,
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Container(
              height: 120,
              width: double.infinity,
              decoration: BoxDecoration(
                gradient: tailwindGradient(ebook.coverColor),
                borderRadius: BorderRadius.circular(12),
              ),
              child: Center(
                child: Text(
                  ebook.coverEmoji,
                  style: const TextStyle(fontSize: 44),
                ),
              ),
            ),
            const SizedBox(height: 8),
            Text(
              ebook.title,
              maxLines: 1,
              overflow: TextOverflow.ellipsis,
              style: theme.textTheme.titleSmall?.copyWith(
                fontWeight: FontWeight.w700,
              ),
            ),
            Text(
              ebook.subtitle,
              maxLines: 1,
              overflow: TextOverflow.ellipsis,
              style: theme.textTheme.bodySmall?.copyWith(
                color: theme.colorScheme.onSurfaceVariant,
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class _ActivityCard extends StatelessWidget {
  const _ActivityCard({required this.activity, this.onTap});

  final Activity activity;
  final VoidCallback? onTap;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return GestureDetector(
      onTap: onTap,
      child: Container(
        width: 220,
        padding: const EdgeInsets.all(14),
        decoration: BoxDecoration(
          gradient: tailwindGradient(activity.heroAccent),
          borderRadius: BorderRadius.circular(16),
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              children: [
                Text(activity.emoji, style: const TextStyle(fontSize: 24)),
                const SizedBox(width: 8),
                Text(
                  activity.badge,
                  style: theme.textTheme.labelSmall?.copyWith(
                    color: Colors.white.withValues(alpha: 0.85),
                    fontWeight: FontWeight.w800,
                    letterSpacing: 1.2,
                  ),
                ),
              ],
            ),
            const Spacer(),
            Text(
              activity.title,
              style: theme.textTheme.titleMedium?.copyWith(
                color: Colors.white,
                fontWeight: FontWeight.w800,
              ),
            ),
            const SizedBox(height: 4),
            Text(
              activity.tagline,
              maxLines: 2,
              overflow: TextOverflow.ellipsis,
              style: theme.textTheme.bodySmall?.copyWith(
                color: Colors.white.withValues(alpha: 0.9),
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class _CollectionCard extends StatelessWidget {
  const _CollectionCard({required this.type, required this.collection});

  final String type;
  final Collection collection;

  static const Map<String, IconData> _icons = {
    'ideas': Icons.lightbulb_outline,
    'places': Icons.landscape_outlined,
    'people': Icons.groups_outlined,
    'culture': Icons.palette_outlined,
    'create': Icons.auto_awesome_outlined,
  };

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final meta = collection.meta;
    return InkWell(
      borderRadius: BorderRadius.circular(16),
      onTap: () {
        Navigator.of(context).push(
          MaterialPageRoute(
            builder: (_) =>
                CollectionDetailScreen(type: type, collection: collection),
          ),
        );
      },
      child: Container(
        padding: const EdgeInsets.all(14),
        decoration: BoxDecoration(
          gradient: tailwindGradient(collection.items.firstOrNull?.accent),
          borderRadius: BorderRadius.circular(16),
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Icon(
              _icons[type] ?? Icons.auto_awesome_outlined,
              color: Colors.white,
              size: 22,
            ),
            Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  meta.navLabel.isEmpty ? type.toUpperCase() : meta.navLabel,
                  style: theme.textTheme.titleSmall?.copyWith(
                    color: Colors.white,
                    fontWeight: FontWeight.w800,
                  ),
                ),
                Text(
                  '${collection.items.length} ${meta.itemNoun.isEmpty ? 'items' : meta.itemNoun}',
                  style: theme.textTheme.bodySmall?.copyWith(
                    color: Colors.white.withValues(alpha: 0.85),
                  ),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}
