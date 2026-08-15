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
  int _index = 0;

  @override
  void initState() {
    super.initState();
    // Warm the /api/data cache so the header menu can show collections
    // even before the Discover tab finishes its own load.
    SiteDataController.instance.load();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Column(
        children: [
          AppHeader(
            onMadeInBharat: () => setState(() => _index = 2),
          ),
          Expanded(
            child: IndexedStack(
              index: _index,
              children: const [
                HomeScreen(),
                BlogListScreen(),
                ShopScreen(),
                CartScreen(),
              ],
            ),
          ),
        ],
      ),
      bottomNavigationBar: NavigationBar(
        selectedIndex: _index,
        onDestinationSelected: (i) => setState(() => _index = i),
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
    );
  }
}
