import 'package:flutter/material.dart';

import 'screens/blog_screens.dart';
import 'screens/cart_screen.dart';
import 'screens/home_screen.dart';
import 'screens/shop_screens.dart';
import 'state/cart.dart';
import 'state/site_data.dart';
import 'widgets/app_header.dart';

void main() {
  runApp(const PakkaPatriotApp());
}

class PakkaPatriotApp extends StatelessWidget {
  const PakkaPatriotApp({super.key});

  @override
  Widget build(BuildContext context) {
    final scheme = ColorScheme.fromSeed(
      seedColor: const Color(0xFFB45309),
      brightness: Brightness.light,
    );
    return MaterialApp(
      title: 'Pakka Patriot',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        colorScheme: scheme,
        useMaterial3: true,
        scaffoldBackgroundColor: const Color(0xFFFDF8F2),
        appBarTheme: AppBarTheme(
          backgroundColor: const Color(0xFFFDF8F2),
          foregroundColor: scheme.onSurface,
          elevation: 0,
          centerTitle: false,
        ),
      ),
      home: const MainShell(),
    );
  }
}

/// Bottom navigation shell with four tabs.
class MainShell extends StatefulWidget {
  const MainShell({super.key});

  @override
  State<MainShell> createState() => _MainShellState();
}

class _MainShellState extends State<MainShell> {
  /// Nested navigator for pushed detail screens, so the app header and
  /// bottom navigation stay visible on every screen.
  final GlobalKey<NavigatorState> _navKey = GlobalKey<NavigatorState>();
  final ValueNotifier<int> _tabIndex = ValueNotifier<int>(0);

  @override
  void initState() {
    super.initState();
    // Warm the /api/data cache so the header menu can show collections
    // even before the Discover tab finishes its own load.
    SiteDataController.instance.load();
  }

  @override
  void dispose() {
    _tabIndex.dispose();
    super.dispose();
  }

  /// Switch tabs, popping any pushed detail screen first so the chosen
  /// tab is immediately visible inside the shell.
  void _selectTab(int index) {
    _navKey.currentState?.popUntil((route) => route.isFirst);
    _tabIndex.value = index;
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Column(
        children: [
          AppHeader(
            onMadeInBharat: () => _selectTab(2),
            navigatorKey: _navKey,
          ),
          Expanded(
            // Detail screens pushed from any tab render inside this nested
            // navigator, keeping the header and bottom bar visible.
            child: Navigator(
              key: _navKey,
              onGenerateRoute: (settings) {
                return MaterialPageRoute(
                  settings: settings,
                  builder: (_) => ValueListenableBuilder<int>(
                    valueListenable: _tabIndex,
                    builder: (context, index, _) => IndexedStack(
                      index: index,
                      children: const [
                        HomeScreen(),
                        BlogListScreen(),
                        ShopScreen(),
                        CartScreen(),
                      ],
                    ),
                  ),
                );
              },
            ),
          ),
        ],
      ),
      bottomNavigationBar: ValueListenableBuilder<int>(
        valueListenable: _tabIndex,
        builder: (context, index, _) => NavigationBar(
          selectedIndex: index,
          onDestinationSelected: _selectTab,
          destinations: [
            const NavigationDestination(
              icon: Icon(Icons.explore_outlined),
              selectedIcon: Icon(Icons.explore),
              label: 'Discover',
            ),
            const NavigationDestination(
              icon: Icon(Icons.menu_book_outlined),
              selectedIcon: Icon(Icons.menu_book),
              label: 'Stories',
            ),
            const NavigationDestination(
              icon: Icon(Icons.storefront_outlined),
              selectedIcon: Icon(Icons.storefront),
              label: 'Shop',
            ),
            ListenableBuilder(
              listenable: Cart.instance,
              builder: (context, _) {
                final count = Cart.instance.count;
                return NavigationDestination(
                  icon: Badge(
                    isLabelVisible: count > 0,
                    label: Text('$count'),
                    child: const Icon(Icons.shopping_cart_outlined),
                  ),
                  selectedIcon: Badge(
                    isLabelVisible: count > 0,
                    label: Text('$count'),
                    child: const Icon(Icons.shopping_cart),
                  ),
                  label: 'Cart',
                );
              },
            ),
          ],
        ),
      ),
    );
  }
}
