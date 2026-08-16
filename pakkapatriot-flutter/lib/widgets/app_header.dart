import 'package:flutter/material.dart';

import '../models/api_models.dart';
import '../screens/collection_screens.dart';
import '../screens/search_screen.dart';
import '../state/site_data.dart';
import 'common.dart';

/// Global app header: brand mark + a menu mirroring the website's main
/// navigation (the six "love categories").
class AppHeader extends StatelessWidget {
  const AppHeader({
    super.key,
    required this.onMadeInBharat,
    this.navigatorKey,
  });

  /// Called when the user picks "Made in Bhārat" (switches to the Shop tab).
  final VoidCallback onMadeInBharat;

  /// The shell's nested navigator, so screens opened from the menu stay
  /// inside the persistent header/bottom-bar frame.
  final GlobalKey<NavigatorState>? navigatorKey;

  static const Color _navy = Color(0xFF0A2240);

  @override
  Widget build(BuildContext context) {
    return Material(
      elevation: 2,
      color: const Color(0xFFFCFAF5),
      child: SafeArea(
        bottom: false,
        child: SizedBox(
          height: 58,
          child: Padding(
            padding: const EdgeInsets.symmetric(horizontal: 16),
            child: Row(
              children: [
                // Official Pakka Patriot logo.
                Image.asset(
                  'assets/images/pakkapatriot_logo.png',
                  height: 42,
                  fit: BoxFit.contain,
                  errorBuilder: (_, _, _) => const Text(
                    'PAKKA PATRIOT',
                    style: TextStyle(
                      color: _navy,
                      fontWeight: FontWeight.w900,
                      fontSize: 15,
                      letterSpacing: 1.6,
                    ),
                  ),
                ),
                const Spacer(),
                IconButton(
                  onPressed: () => _openSearch(context),
                  icon: const Icon(Icons.search, color: _navy),
                  tooltip: 'Search',
                ),
                TextButton.icon(
                  onPressed: () => _openMenu(context),
                  icon: const Icon(Icons.menu, color: _navy),
                  label: const Text(
                    'MENU',
                    style: TextStyle(
                      color: _navy,
                      fontWeight: FontWeight.w800,
                      fontSize: 12,
                      letterSpacing: 1.2,
                    ),
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }

  void _openMenu(BuildContext context) {
    showModalBottomSheet<void>(
      context: context,
      isScrollControlled: true,
      backgroundColor: Colors.transparent,
      builder: (_) => _MainMenuSheet(
        onMadeInBharat: onMadeInBharat,
        navigatorKey: navigatorKey,
      ),
    );
  }

  /// Open global search inside the shell's nested navigator so the header
  /// and bottom bar stay visible.
  void _openSearch(BuildContext context) {
    final nav = navigatorKey?.currentState ?? Navigator.of(context);
    nav.push(MaterialPageRoute(builder: (_) => const SearchScreen()));
  }
}

/// Bottom-sheet menu mirroring the website's main navigation.
class _MainMenuSheet extends StatelessWidget {
  const _MainMenuSheet({required this.onMadeInBharat, this.navigatorKey});

  final VoidCallback onMadeInBharat;
  final GlobalKey<NavigatorState>? navigatorKey;

  static const Map<String, IconData> _icons = {
    'people': Icons.groups_outlined,
    'ideas': Icons.lightbulb_outline,
    'places': Icons.location_on_outlined,
    'culture': Icons.palette_outlined,
    'create': Icons.auto_awesome_outlined,
  };

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return SafeArea(
      child: Container(
        decoration: const BoxDecoration(
          color: Color(0xFFFCFAF5),
          borderRadius: BorderRadius.vertical(top: Radius.circular(24)),
        ),
        padding: const EdgeInsets.fromLTRB(16, 10, 16, 24),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            // Drag handle.
            Center(
              child: Container(
                width: 40,
                height: 4,
                decoration: BoxDecoration(
                  color: Colors.grey.shade300,
                  borderRadius: BorderRadius.circular(2),
                ),
              ),
            ),
            const SizedBox(height: 10),
            Text(
              'EXPLORE BHĀRAT',
              style: theme.textTheme.labelMedium?.copyWith(
                color: theme.colorScheme.primary,
                fontWeight: FontWeight.w800,
                letterSpacing: 1.5,
              ),
            ),
            const SizedBox(height: 10),
            ListenableBuilder(
              listenable: SiteDataController.instance,
              builder: (context, _) {
                final controller = SiteDataController.instance;
                if (!controller.hasData) {
                  if (controller.loading) {
                    return const Padding(
                      padding: EdgeInsets.all(28),
                      child: Center(child: CircularProgressIndicator()),
                    );
                  }
                  return Padding(
                    padding: const EdgeInsets.all(20),
                    child: Column(
                      children: [
                        const Text('Could not load the collections.'),
                        const SizedBox(height: 8),
                        TextButton.icon(
                          onPressed: controller.reload,
                          icon: const Icon(Icons.refresh),
                          label: const Text('Retry'),
                        ),
                      ],
                    ),
                  );
                }
                final data = controller.data!;
                return Column(
                  children: [
                    for (final type in SiteData.collectionOrder) ...[
                      if (data.collections[type] != null)
                        _CollectionMenuTile(
                          type: type,
                          icon: _icons[type] ?? Icons.auto_awesome_outlined,
                          collection: data.collections[type]!,
                          navigatorKey: navigatorKey,
                        ),
                    ],
                    const SizedBox(height: 6),
                    _MadeInBharatTile(onTap: () {
                      Navigator.of(context).pop();
                      onMadeInBharat();
                    }),
                  ],
                );
              },
            ),
          ],
        ),
      ),
    );
  }
}

class _CollectionMenuTile extends StatelessWidget {
  const _CollectionMenuTile({
    required this.type,
    required this.icon,
    required this.collection,
    this.navigatorKey,
  });

  final String type;
  final IconData icon;
  final Collection collection;
  final GlobalKey<NavigatorState>? navigatorKey;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final meta = collection.meta;
    final accent = collection.items.firstOrNull?.accent ?? '';
    final noun = meta.itemNoun.isEmpty ? 'items' : meta.itemNoun;

    return ListTile(
      contentPadding: const EdgeInsets.symmetric(horizontal: 4),
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
      leading: Container(
        width: 42,
        height: 42,
        decoration: BoxDecoration(
          gradient: tailwindGradient(accent),
          borderRadius: BorderRadius.circular(12),
        ),
        child: Icon(icon, color: Colors.white, size: 20),
      ),
      title: Text(
        meta.navLabel.isEmpty ? type.toUpperCase() : meta.navLabel,
        style: theme.textTheme.titleSmall?.copyWith(fontWeight: FontWeight.w800),
      ),
      subtitle: Text(
        '${collection.items.length} $noun',
        style: theme.textTheme.bodySmall?.copyWith(
          color: theme.colorScheme.onSurfaceVariant,
        ),
      ),
      trailing: const Icon(Icons.chevron_right),
      onTap: () {
        Navigator.of(context).pop();
        // Open inside the shell's nested navigator so the header and
        // bottom bar remain visible on the collection screen.
        navigatorKey?.currentState?.push(
          MaterialPageRoute(
            builder: (_) => CollectionDetailScreen(type: type, collection: collection),
          ),
        );
      },
    );
  }
}

class _MadeInBharatTile extends StatelessWidget {
  const _MadeInBharatTile({required this.onTap});

  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return ListTile(
      contentPadding: const EdgeInsets.symmetric(horizontal: 4),
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
      leading: Container(
        width: 42,
        height: 42,
        decoration: BoxDecoration(
          gradient: const LinearGradient(
            begin: Alignment.topLeft,
            end: Alignment.bottomRight,
            colors: [Color(0xFFE11D48), Color(0xFFF43F5E)],
          ),
          borderRadius: BorderRadius.circular(12),
        ),
        child: const Icon(Icons.verified_outlined, color: Colors.white, size: 20),
      ),
      title: Text(
        'MADE IN BHĀRAT',
        style: theme.textTheme.titleSmall?.copyWith(
          fontWeight: FontWeight.w800,
          color: const Color(0xFFE11D48),
        ),
      ),
      subtitle: Text(
        'Shop patriotic merchandise',
        style: theme.textTheme.bodySmall?.copyWith(
          color: theme.colorScheme.onSurfaceVariant,
        ),
      ),
      trailing: const Icon(Icons.chevron_right),
      onTap: onTap,
    );
  }
}
