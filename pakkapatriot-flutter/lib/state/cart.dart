import 'package:flutter/foundation.dart';

import '../models/api_models.dart';

/// A single line item in the cart.
class CartItem {
  CartItem({required this.product, this.quantity = 1});

  final Product product;
  int quantity;
}

/// Simple in-memory cart backed by [ChangeNotifier].
class Cart extends ChangeNotifier {
  Cart._();

  static final Cart instance = Cart._();

  final List<CartItem> _items = [];

  List<CartItem> get items => List.unmodifiable(_items);

  bool get isEmpty => _items.isEmpty;

  int get count => _items.fold(0, (sum, i) => sum + i.quantity);

  double get subtotal =>
      _items.fold(0, (sum, i) => sum + (double.tryParse(i.product.price) ?? 0) * i.quantity);

  /// Product price as the API expects it (integer string like "499").
  static String priceOf(Product p) {
    final n = double.tryParse(p.price) ?? 0;
    return n == n.roundToDouble() ? n.toInt().toString() : n.toString();
  }

  void add(Product product, {int quantity = 1}) {
    final existing = _items.where((i) => i.product.id == product.id).firstOrNull;
    if (existing != null) {
      existing.quantity += quantity;
    } else {
      _items.add(CartItem(product: product, quantity: quantity));
    }
    notifyListeners();
  }

  void increment(Product product) => add(product);

  void decrement(Product product) {
    final existing = _items.where((i) => i.product.id == product.id).firstOrNull;
    if (existing == null) return;
    if (existing.quantity <= 1) {
      _items.remove(existing);
    } else {
      existing.quantity -= 1;
    }
    notifyListeners();
  }

  void remove(Product product) {
    _items.removeWhere((i) => i.product.id == product.id);
    notifyListeners();
  }

  void clear() {
    _items.clear();
    notifyListeners();
  }
}
