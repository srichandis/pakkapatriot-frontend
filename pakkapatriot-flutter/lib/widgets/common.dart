import 'package:flutter/material.dart';

import '../services/api_client.dart';

/// Loading spinner centered in a box.
class LoadingView extends StatelessWidget {
  const LoadingView({super.key, this.message});

  final String? message;

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          const CircularProgressIndicator(),
          if (message != null) ...[
            const SizedBox(height: 12),
            Text(message!, style: Theme.of(context).textTheme.bodyMedium),
          ],
        ],
      ),
    );
  }
}

/// Error message with a retry button.
class ErrorView extends StatelessWidget {
  const ErrorView({super.key, required this.error, this.onRetry});

  final Object error;
  final VoidCallback? onRetry;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return Center(
      child: Padding(
        padding: const EdgeInsets.all(24),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Icon(Icons.cloud_off, size: 48, color: theme.colorScheme.error),
            const SizedBox(height: 12),
            Text(
              error is ApiException ? error.toString() : 'Something went wrong.',
              textAlign: TextAlign.center,
              style: theme.textTheme.bodyMedium,
            ),
            if (onRetry != null) ...[
              const SizedBox(height: 16),
              FilledButton.icon(
                onPressed: onRetry,
                icon: const Icon(Icons.refresh),
                label: const Text('Retry'),
              ),
            ],
          ],
        ),
      ),
    );
  }
}

/// Section header used on the home screen ("STORIES", "SHOP", ...).
class SectionHeader extends StatelessWidget {
  const SectionHeader({
    super.key,
    required this.title,
    this.subtitle,
    this.trailing,
  });

  final String title;
  final String? subtitle;
  final Widget? trailing;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return Padding(
      padding: const EdgeInsets.fromLTRB(16, 20, 16, 8),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.end,
        children: [
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  title.toUpperCase(),
                  style: theme.textTheme.labelSmall?.copyWith(
                    color: theme.colorScheme.primary,
                    fontWeight: FontWeight.w700,
                    letterSpacing: 1.5,
                  ),
                ),
                if (subtitle != null) ...[
                  const SizedBox(height: 2),
                  Text(
                    subtitle!,
                    style: theme.textTheme.titleMedium?.copyWith(
                      fontWeight: FontWeight.w700,
                    ),
                  ),
                ],
              ],
            ),
          ),
          ?trailing,
        ],
      ),
    );
  }
}

/// Parse a Tailwind-style gradient class (`from-[#581C87] to-[#9333EA]`)
/// into a [LinearGradient]. Falls back to a neutral gradient.
LinearGradient tailwindGradient(String? tailwindClass, {Color fallback = const Color(0xFFB45309)}) {
  final from = _hexFromClass(tailwindClass, 'from');
  final to = _hexFromClass(tailwindClass, 'to');
  return LinearGradient(
    begin: Alignment.topLeft,
    end: Alignment.bottomRight,
    colors: [
      from ?? fallback,
      to ?? fallback.withValues(alpha: 0.75),
    ],
  );
}

Color? _hexFromClass(String? cls, String prefix) {
  if (cls == null || cls.isEmpty) return null;
  final regex = RegExp('$prefix-\\[#([0-9A-Fa-f]{6})\\]');
  final match = regex.firstMatch(cls);
  if (match == null) return null;
  return Color(int.parse('FF${match.group(1)}', radix: 16));
}

/// Emoji/icon placeholder used when an item has no image.
class EmojiTile extends StatelessWidget {
  const EmojiTile({super.key, required this.emoji, this.size = 44});

  final String emoji;
  final double size;

  @override
  Widget build(BuildContext context) {
    return Text(emoji, style: TextStyle(fontSize: size));
  }
}
