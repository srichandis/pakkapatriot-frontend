import 'package:flutter/material.dart';

import '../models/api_models.dart';
import '../widgets/common.dart';

/// Detail screen for one collection: searchable, filterable list of items.
class CollectionDetailScreen extends StatefulWidget {
  const CollectionDetailScreen({
    super.key,
    required this.type,
    required this.collection,
  });

  final String type;
  final Collection collection;

  @override
  State<CollectionDetailScreen> createState() => _CollectionDetailScreenState();
}

class _CollectionDetailScreenState extends State<CollectionDetailScreen> {
  String _query = '';
  String? _category;

  List<CollectionItem> get _filtered {
    final items = widget.collection.items;
    final q = _query.trim().toLowerCase();
    return items.where((item) {
      final matchesCategory = _category == null || item.category == _category;
      final matchesQuery = q.isEmpty ||
          item.name.toLowerCase().contains(q) ||
          item.tagline.toLowerCase().contains(q) ||
          item.region.toLowerCase().contains(q) ||
          item.attribution.toLowerCase().contains(q);
      return matchesCategory && matchesQuery;
    }).toList();
  }

  @override
  Widget build(BuildContext context) {
    final meta = widget.collection.meta;
    final filtered = _filtered;
    final grouped = meta.groupByCategory;
    final accent = widget.collection.items.firstOrNull?.accent ?? '';

    return Scaffold(
      appBar: AppBar(
        title: Text(meta.navLabel.isEmpty ? widget.type.toUpperCase() : meta.navLabel),
      ),
      body: Column(
        children: [
          _CollectionHeader(meta: meta, accent: accent),
          Padding(
            padding: const EdgeInsets.fromLTRB(16, 8, 16, 4),
            child: TextField(
              onChanged: (v) => setState(() => _query = v),
              decoration: InputDecoration(
                hintText: meta.searchPlaceholder,
                prefixIcon: const Icon(Icons.search),
                isDense: true,
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(12),
                ),
              ),
            ),
          ),
          if (meta.categories.isNotEmpty)
            SizedBox(
              height: 44,
              child: ListView(
                padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 6),
                scrollDirection: Axis.horizontal,
                children: [
                  _FilterChip(label: 'All', selected: _category == null, onTap: () => setState(() => _category = null)),
                  ...meta.categories.map((c) => _FilterChip(
                        label: c.label,
                        selected: _category == c.id,
                        onTap: () => setState(() => _category = c.id),
                      )),
                ],
              ),
            ),
          const Divider(height: 1),
          Expanded(
            child: filtered.isEmpty
                ? const Center(child: Text('No matching items.'))
                : grouped
                    ? _GroupedList(items: filtered, meta: meta)
                    : _FlatList(items: filtered, meta: meta),
          ),
        ],
      ),
    );
  }
}

class _CollectionHeader extends StatelessWidget {
  const _CollectionHeader({required this.meta, required this.accent});

  final CollectionMeta meta;
  final String accent;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.fromLTRB(16, 14, 16, 14),
      decoration: BoxDecoration(
        gradient: tailwindGradient(accent),
        borderRadius: BorderRadius.circular(16),
        color: theme.colorScheme.primaryContainer,
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            meta.badgeLabel.isEmpty ? (meta.navLabel.isEmpty ? 'COLLECTION' : meta.navLabel) : meta.badgeLabel,
            style: theme.textTheme.labelSmall?.copyWith(
              color: Colors.white.withValues(alpha: 0.85),
              fontWeight: FontWeight.w800,
              letterSpacing: 1.4,
            ),
          ),
          const SizedBox(height: 4),
          Text(
            meta.subtitle.isEmpty
                ? '${meta.titlePrefix} ${meta.titleHighlight}'
                : meta.subtitle,
            maxLines: 3,
            overflow: TextOverflow.ellipsis,
            style: theme.textTheme.bodyMedium?.copyWith(color: Colors.white),
          ),
        ],
      ),
    );
  }
}

class _FilterChip extends StatelessWidget {
  const _FilterChip({required this.label, required this.selected, required this.onTap});

  final String label;
  final bool selected;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(right: 8),
      child: FilterChip(
        label: Text(label),
        selected: selected,
        onSelected: (_) => onTap(),
      ),
    );
  }
}

class _GroupedList extends StatelessWidget {
  const _GroupedList({required this.items, required this.meta});

  final List<CollectionItem> items;
  final CollectionMeta meta;

  @override
  Widget build(BuildContext context) {
    final categories = <String, List<CollectionItem>>{};
    for (final item in items) {
      final cat = item.category.isEmpty ? 'Other' : item.category;
      categories.putIfAbsent(cat, () => []).add(item);
    }
    final keys = categories.keys.toList()..sort();
    return ListView(
      padding: const EdgeInsets.only(bottom: 24),
      children: [
        for (final key in keys) ...[
          Padding(
            padding: const EdgeInsets.fromLTRB(16, 16, 16, 4),
            child: Text(
              key,
              style: Theme.of(context).textTheme.titleSmall?.copyWith(
                    fontWeight: FontWeight.w800,
                    color: Theme.of(context).colorScheme.primary,
                  ),
            ),
          ),
          for (final item in categories[key]!) _ItemTile(item: item, meta: meta),
        ],
      ],
    );
  }
}

class _FlatList extends StatelessWidget {
  const _FlatList({required this.items, required this.meta});

  final List<CollectionItem> items;
  final CollectionMeta meta;

  @override
  Widget build(BuildContext context) {
    return ListView.builder(
      padding: const EdgeInsets.only(bottom: 24),
      itemCount: items.length,
      itemBuilder: (context, i) => _ItemTile(item: items[i], meta: meta),
    );
  }
}

class _ItemTile extends StatelessWidget {
  const _ItemTile({required this.item, required this.meta});

  final CollectionItem item;
  final CollectionMeta meta;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return ListTile(
      leading: Container(
        width: 46,
        height: 46,
        decoration: BoxDecoration(
          gradient: tailwindGradient(item.accent),
          borderRadius: BorderRadius.circular(12),
        ),
        child: Center(
          child: Text(
            item.nativeName.isNotEmpty ? item.nativeName.characters.first : item.name.characters.first,
            style: const TextStyle(color: Colors.white, fontWeight: FontWeight.w800),
          ),
        ),
      ),
      title: Text(item.name, style: const TextStyle(fontWeight: FontWeight.w700)),
      subtitle: Text(
        [
          if (item.tagline.isNotEmpty) item.tagline,
          if (item.era.isNotEmpty) '${meta.eraLabel}: ${item.era}',
        ].join('\n'),
        maxLines: 3,
        overflow: TextOverflow.ellipsis,
        style: theme.textTheme.bodySmall,
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

/// Full detail view of a single collection item.
class CollectionItemDetailScreen extends StatelessWidget {
  const CollectionItemDetailScreen({super.key, required this.item, required this.meta});

  final CollectionItem item;
  final CollectionMeta meta;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return Scaffold(
      appBar: AppBar(title: Text(item.name)),
      body: ListView(
        padding: const EdgeInsets.only(bottom: 32),
        children: [
          Container(
            padding: const EdgeInsets.all(20),
            decoration: BoxDecoration(
              gradient: tailwindGradient(item.accent),
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                if (item.nativeName.isNotEmpty)
                  Text(
                    item.nativeName,
                    style: theme.textTheme.titleMedium?.copyWith(
                      color: Colors.white.withValues(alpha: 0.85),
                    ),
                  ),
                Text(
                  item.name,
                  style: theme.textTheme.headlineSmall?.copyWith(
                    color: Colors.white,
                    fontWeight: FontWeight.w800,
                  ),
                ),
                if (item.tagline.isNotEmpty) ...[
                  const SizedBox(height: 8),
                  Text(
                    item.tagline,
                    style: theme.textTheme.bodyMedium?.copyWith(
                      color: Colors.white.withValues(alpha: 0.95),
                      fontStyle: FontStyle.italic,
                    ),
                  ),
                ],
                const SizedBox(height: 14),
                Wrap(
                  spacing: 8,
                  runSpacing: 8,
                  children: [
                    if (item.category.isNotEmpty)
                      _MetaChip(label: '${meta.categoryLabel}: ${item.category}'),
                    if (item.era.isNotEmpty)
                      _MetaChip(label: '${meta.eraLabel}: ${item.era}'),
                    if (item.attribution.isNotEmpty)
                      _MetaChip(label: '${meta.attributionLabel}: ${item.attribution}'),
                    if (item.region.isNotEmpty)
                      _MetaChip(label: '${meta.regionLabel}: ${item.region}'),
                  ],
                ),
              ],
            ),
          ),
          if (item.quote.isNotEmpty)
            Container(
              margin: const EdgeInsets.all(16),
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: theme.colorScheme.primaryContainer.withValues(alpha: 0.4),
                borderRadius: BorderRadius.circular(12),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    '"${item.quote}"',
                    style: theme.textTheme.titleMedium?.copyWith(
                      fontStyle: FontStyle.italic,
                      fontWeight: FontWeight.w600,
                    ),
                  ),
                  if (item.quoteSource.isNotEmpty) ...[
                    const SizedBox(height: 6),
                    Text(
                      '— ${item.quoteSource}',
                      style: theme.textTheme.bodySmall?.copyWith(
                        color: theme.colorScheme.onSurfaceVariant,
                      ),
                    ),
                  ],
                ],
              ),
            ),
          _BodySection(
            title: 'Summary',
            child: Text(item.summary, style: theme.textTheme.bodyMedium),
          ),
          if (item.overview.isNotEmpty)
            _BodySection(
              title: 'Overview',
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  for (var i = 0; i < item.overview.length; i++)
                    Padding(
                      padding: const EdgeInsets.only(bottom: 10),
                      child: Text(item.overview[i], style: theme.textTheme.bodyMedium),
                    ),
                ],
              ),
            ),
          if (item.coreIdeas.isNotEmpty)
            _BodySection(
              title: 'Core ideas',
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  for (final idea in item.coreIdeas)
                    Padding(
                      padding: const EdgeInsets.only(bottom: 8),
                      child: Row(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          const Padding(
                            padding: EdgeInsets.only(top: 6),
                            child: Icon(Icons.circle, size: 8),
                          ),
                          const SizedBox(width: 10),
                          Expanded(child: Text(idea, style: theme.textTheme.bodyMedium)),
                        ],
                      ),
                    ),
                ],
              ),
            ),
          if (item.legacy.isNotEmpty)
            _BodySection(
              title: 'Legacy',
              child: Text(item.legacy, style: theme.textTheme.bodyMedium),
            ),
        ],
      ),
    );
  }
}

class _MetaChip extends StatelessWidget {
  const _MetaChip({required this.label});

  final String label;

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 5),
      decoration: BoxDecoration(
        color: Colors.white.withValues(alpha: 0.18),
        borderRadius: BorderRadius.circular(20),
      ),
      child: Text(
        label,
        style: Theme.of(context).textTheme.labelSmall?.copyWith(
              color: Colors.white,
              fontWeight: FontWeight.w700,
            ),
      ),
    );
  }
}

class _BodySection extends StatelessWidget {
  const _BodySection({required this.title, required this.child});

  final String title;
  final Widget child;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return Padding(
      padding: const EdgeInsets.fromLTRB(16, 4, 16, 8),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            title.toUpperCase(),
            style: theme.textTheme.labelMedium?.copyWith(
              color: theme.colorScheme.primary,
              fontWeight: FontWeight.w800,
              letterSpacing: 1.2,
            ),
          ),
          const SizedBox(height: 8),
          child,
        ],
      ),
    );
  }
}
