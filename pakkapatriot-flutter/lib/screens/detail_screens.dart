import 'package:flutter/material.dart';
import 'package:url_launcher/url_launcher.dart';

import '../config.dart';
import '../models/api_models.dart';
import '../widgets/common.dart';

/// Detail screen for a traditional game.
class GameDetailScreen extends StatelessWidget {
  const GameDetailScreen({super.key, required this.game});

  final Game game;

  Future<void> _playOnWebsite(BuildContext context) async {
    final uri = Uri.parse('${AppConfig.siteUrl}${game.path}');
    try {
      final ok = await launchUrl(uri, mode: LaunchMode.externalApplication);
      if (!ok && context.mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('Could not open the game page.')),
        );
      }
    } catch (_) {
      if (context.mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('Could not open the game page.')),
        );
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return Scaffold(
      appBar: AppBar(title: Text(game.title)),
      body: ListView(
        padding: const EdgeInsets.only(bottom: 32),
        children: [
          Container(
            padding: const EdgeInsets.all(20),
            decoration: BoxDecoration(gradient: tailwindGradient(game.accent)),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                if (game.badge.isNotEmpty)
                  Container(
                    padding: const EdgeInsets.symmetric(
                      horizontal: 10,
                      vertical: 4,
                    ),
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
                const SizedBox(height: 10),
                Text(
                  game.title,
                  style: theme.textTheme.headlineSmall?.copyWith(
                    color: Colors.white,
                    fontWeight: FontWeight.w800,
                  ),
                ),
                if (game.tagline.isNotEmpty) ...[
                  const SizedBox(height: 6),
                  Text(
                    game.tagline,
                    style: theme.textTheme.bodyMedium?.copyWith(
                      color: Colors.white.withValues(alpha: 0.95),
                      fontStyle: FontStyle.italic,
                    ),
                  ),
                ],
              ],
            ),
          ),
          Padding(
            padding: const EdgeInsets.all(16),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                if (game.description.isNotEmpty) ...[
                  Text(
                    'ABOUT THIS GAME',
                    style: theme.textTheme.labelMedium?.copyWith(
                      color: theme.colorScheme.primary,
                      fontWeight: FontWeight.w800,
                      letterSpacing: 1.2,
                    ),
                  ),
                  const SizedBox(height: 8),
                  Text(game.description, style: theme.textTheme.bodyMedium),
                ],
                if (game.tags.isNotEmpty) ...[
                  const SizedBox(height: 16),
                  Text(
                    'AT A GLANCE',
                    style: theme.textTheme.labelMedium?.copyWith(
                      color: theme.colorScheme.primary,
                      fontWeight: FontWeight.w800,
                      letterSpacing: 1.2,
                    ),
                  ),
                  const SizedBox(height: 8),
                  Wrap(
                    spacing: 8,
                    runSpacing: 8,
                    children: [
                      for (final tag in game.tags)
                        if (tag.label.isNotEmpty)
                          Chip(
                            avatar: tag.icon.isNotEmpty
                                ? Text(
                                    tag.icon,
                                    style: const TextStyle(fontSize: 14),
                                  )
                                : null,
                            label: Text(tag.label),
                          ),
                    ],
                  ),
                ],
                const SizedBox(height: 20),
                SizedBox(
                  width: double.infinity,
                  child: FilledButton.icon(
                    onPressed: () => _playOnWebsite(context),
                    icon: const Icon(Icons.play_circle_outline),
                    label: const Text('Play on the Website'),
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

/// Detail screen for an ebook.
class EbookDetailScreen extends StatelessWidget {
  const EbookDetailScreen({super.key, required this.ebook});

  final EBook ebook;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return Scaffold(
      appBar: AppBar(title: Text(ebook.title)),
      body: ListView(
        padding: const EdgeInsets.only(bottom: 32),
        children: [
          Container(
            height: 220,
            margin: const EdgeInsets.all(16),
            decoration: BoxDecoration(
              gradient: tailwindGradient(ebook.coverColor),
              borderRadius: BorderRadius.circular(16),
            ),
            child: Center(
              child: Text(
                ebook.coverEmoji,
                style: const TextStyle(fontSize: 84),
              ),
            ),
          ),
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 16),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  ebook.title,
                  style: theme.textTheme.headlineSmall?.copyWith(
                    fontWeight: FontWeight.w800,
                  ),
                ),
                if (ebook.subtitle.isNotEmpty) ...[
                  const SizedBox(height: 4),
                  Text(
                    ebook.subtitle,
                    style: theme.textTheme.bodyLarge?.copyWith(
                      color: theme.colorScheme.onSurfaceVariant,
                    ),
                  ),
                ],
                if (ebook.category.isNotEmpty || ebook.era.isNotEmpty) ...[
                  const SizedBox(height: 10),
                  Wrap(
                    spacing: 8,
                    runSpacing: 8,
                    children: [
                      if (ebook.category.isNotEmpty)
                        Chip(label: Text(ebook.category)),
                      if (ebook.era.isNotEmpty) Chip(label: Text(ebook.era)),
                    ],
                  ),
                ],
                if (ebook.description.isNotEmpty) ...[
                  const SizedBox(height: 16),
                  Text('ABOUT THIS BOOK', style: _sectionLabel(theme)),
                  const SizedBox(height: 8),
                  Text(ebook.description, style: theme.textTheme.bodyMedium),
                ],
              ],
            ),
          ),
        ],
      ),
    );
  }
}

/// Detail screen for a "Create" activity.
class ActivityDetailScreen extends StatelessWidget {
  const ActivityDetailScreen({super.key, required this.activity});

  final Activity activity;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return Scaffold(
      appBar: AppBar(title: Text(activity.title)),
      body: ListView(
        padding: const EdgeInsets.only(bottom: 32),
        children: [
          Container(
            padding: const EdgeInsets.all(20),
            decoration: BoxDecoration(
              gradient: tailwindGradient(activity.heroAccent),
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  children: [
                    Text(activity.emoji, style: const TextStyle(fontSize: 32)),
                    if (activity.badge.isNotEmpty) ...[
                      const SizedBox(width: 10),
                      Text(
                        activity.badge,
                        style: theme.textTheme.labelMedium?.copyWith(
                          color: Colors.white.withValues(alpha: 0.9),
                          fontWeight: FontWeight.w800,
                          letterSpacing: 1.4,
                        ),
                      ),
                    ],
                  ],
                ),
                const SizedBox(height: 10),
                Text(
                  activity.title,
                  style: theme.textTheme.headlineSmall?.copyWith(
                    color: Colors.white,
                    fontWeight: FontWeight.w800,
                  ),
                ),
                if (activity.tagline.isNotEmpty) ...[
                  const SizedBox(height: 6),
                  Text(
                    activity.tagline,
                    style: theme.textTheme.bodyMedium?.copyWith(
                      color: Colors.white.withValues(alpha: 0.95),
                    ),
                  ),
                ],
              ],
            ),
          ),
          Padding(
            padding: const EdgeInsets.all(16),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                if (activity.whatIs.isNotEmpty) ...[
                  Text('WHAT IS IT?', style: _sectionLabel(theme)),
                  const SizedBox(height: 8),
                  Text(activity.whatIs, style: theme.textTheme.bodyMedium),
                ],
                if (activity.knownFor.isNotEmpty) ...[
                  const SizedBox(height: 20),
                  Text('KNOWN FOR', style: _sectionLabel(theme)),
                  const SizedBox(height: 10),
                  for (final item in activity.knownFor)
                    Card(
                      margin: const EdgeInsets.only(bottom: 8),
                      child: ListTile(
                        leading: Text(
                          item.emoji,
                          style: const TextStyle(fontSize: 24),
                        ),
                        title: Text(
                          item.title,
                          style: theme.textTheme.titleSmall?.copyWith(
                            fontWeight: FontWeight.w700,
                          ),
                        ),
                        subtitle: item.text.isNotEmpty ? Text(item.text) : null,
                      ),
                    ),
                ],
                if (activity.tryThis != null) ...[
                  const SizedBox(height: 20),
                  Text('TRY THIS', style: _sectionLabel(theme)),
                  const SizedBox(height: 10),
                  Card(
                    color: theme.colorScheme.primaryContainer.withValues(
                      alpha: 0.35,
                    ),
                    child: Padding(
                      padding: const EdgeInsets.all(14),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          if (activity.tryThis!.title.isNotEmpty)
                            Text(
                              activity.tryThis!.title,
                              style: theme.textTheme.titleSmall?.copyWith(
                                fontWeight: FontWeight.w700,
                              ),
                            ),
                          if (activity.tryThis!.text.isNotEmpty) ...[
                            const SizedBox(height: 6),
                            Text(activity.tryThis!.text),
                          ],
                        ],
                      ),
                    ),
                  ),
                ],
                if (activity.related.isNotEmpty) ...[
                  const SizedBox(height: 20),
                  Text('EXPLORE NEXT', style: _sectionLabel(theme)),
                  const SizedBox(height: 10),
                  for (final rel in activity.related)
                    ListTile(
                      contentPadding: EdgeInsets.zero,
                      leading: const Icon(Icons.arrow_forward, size: 18),
                      title: Text(rel.label),
                      onTap: () {
                        ScaffoldMessenger.of(context).showSnackBar(
                          const SnackBar(
                            content: Text(
                              'This destination opens on the website.',
                            ),
                          ),
                        );
                      },
                    ),
                ],
              ],
            ),
          ),
        ],
      ),
    );
  }
}

TextStyle? _sectionLabel(ThemeData theme) =>
    theme.textTheme.labelMedium?.copyWith(
      color: theme.colorScheme.primary,
      fontWeight: FontWeight.w800,
      letterSpacing: 1.2,
    );
