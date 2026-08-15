import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter/material.dart';

import '../config.dart';
import '../services/api_client.dart';
import '../state/cart.dart';
import '../widgets/common.dart';

/// Cart tab: line items, quantity controls, subtotal and checkout.
class CartScreen extends StatelessWidget {
  const CartScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final cart = Cart.instance;
    // No inner Scaffold/AppBar: the global AppHeader sits above this tab.
    return ListenableBuilder(
      listenable: cart,
      builder: (context, _) {
        if (cart.isEmpty) {
          return const Center(
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                Icon(Icons.shopping_cart_outlined, size: 56, color: Colors.grey),
                SizedBox(height: 12),
                Text('Your cart is empty'),
              ],
            ),
          );
        }
        return Column(
          children: [
            Padding(
              padding: const EdgeInsets.fromLTRB(16, 16, 16, 0),
              child: Align(
                alignment: Alignment.centerLeft,
                child: Text(
                  'Cart',
                  style: Theme.of(context).textTheme.headlineSmall?.copyWith(
                        fontWeight: FontWeight.w800,
                      ),
                ),
              ),
            ),
            Expanded(
              child: ListView.separated(
                padding: const EdgeInsets.all(16),
                itemCount: cart.items.length,
                separatorBuilder: (_, _) => const Divider(),
                itemBuilder: (context, i) => _CartRow(item: cart.items[i]),
              ),
            ),
              Container(
                padding: const EdgeInsets.all(16),
                decoration: BoxDecoration(
                  color: Theme.of(context).colorScheme.surfaceContainerLow,
                  border: Border(
                    top: BorderSide(color: Theme.of(context).dividerColor),
                  ),
                ),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.stretch,
                  children: [
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Text(
                          'Subtotal (${cart.count} items)',
                          style: Theme.of(context).textTheme.titleMedium?.copyWith(fontWeight: FontWeight.w700),
                        ),
                        Text(
                          '₹${cart.subtotal.toStringAsFixed(0)}',
                          style: Theme.of(context).textTheme.titleLarge?.copyWith(
                                fontWeight: FontWeight.w800,
                                color: Theme.of(context).colorScheme.primary,
                              ),
                        ),
                      ],
                    ),
                    const SizedBox(height: 4),
                    Text(
                      'Shipping & taxes calculated at checkout.',
                      style: Theme.of(context).textTheme.bodySmall?.copyWith(
                            color: Theme.of(context).colorScheme.onSurfaceVariant,
                          ),
                    ),
                    const SizedBox(height: 12),
                    FilledButton.icon(
                      onPressed: () {
                        Navigator.of(context).push(
                          MaterialPageRoute(builder: (_) => const CheckoutScreen()),
                        );
                      },
                      icon: const Icon(Icons.lock_outline),
                      label: const Text('Proceed to Checkout'),
                    ),
                  ],
                ),
              ),
            ],
          );
        },
    );
  }
}

class _CartRow extends StatelessWidget {
  const _CartRow({required this.item});

  final CartItem item;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final cart = Cart.instance;
    final product = item.product;
    final image = AppConfig.resolveImageUrl(product.imageUrl);
    return Row(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        ClipRRect(
          borderRadius: BorderRadius.circular(8),
          child: SizedBox(
            width: 64,
            height: 64,
            child: image.isEmpty
                ? Container(
                    color: theme.colorScheme.surfaceContainerHighest,
                    child: const Icon(Icons.shopping_bag_outlined),
                  )
                : CachedNetworkImage(
                    imageUrl: image,
                    fit: BoxFit.cover,
                    errorWidget: (_, _, _) => Container(
                      color: theme.colorScheme.surfaceContainerHighest,
                      child: const Icon(Icons.broken_image_outlined),
                    ),
                  ),
          ),
        ),
        const SizedBox(width: 12),
        Expanded(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                product.name,
                maxLines: 2,
                overflow: TextOverflow.ellipsis,
                style: theme.textTheme.titleSmall?.copyWith(fontWeight: FontWeight.w700),
              ),
              const SizedBox(height: 2),
              Text(
                '${AppConfig.formatPrice(product.price)} each',
                style: theme.textTheme.bodySmall?.copyWith(
                  color: theme.colorScheme.onSurfaceVariant,
                ),
              ),
              const SizedBox(height: 6),
              Row(
                children: [
                  IconButton.outlined(
                    visualDensity: VisualDensity.compact,
                    onPressed: () => cart.decrement(product),
                    icon: const Icon(Icons.remove, size: 16),
                  ),
                  SizedBox(
                    width: 32,
                    child: Text(
                      '${item.quantity}',
                      textAlign: TextAlign.center,
                      style: theme.textTheme.titleSmall?.copyWith(fontWeight: FontWeight.w800),
                    ),
                  ),
                  IconButton.outlined(
                    visualDensity: VisualDensity.compact,
                    onPressed: () => cart.increment(product),
                    icon: const Icon(Icons.add, size: 16),
                  ),
                  const Spacer(),
                  Text(
                    '₹${(double.tryParse(product.price) ?? 0) * item.quantity}',
                    style: theme.textTheme.titleSmall?.copyWith(fontWeight: FontWeight.w800),
                  ),
                ],
              ),
            ],
          ),
        ),
        IconButton(
          onPressed: () => cart.remove(product),
          icon: const Icon(Icons.close, size: 18),
        ),
      ],
    );
  }
}

/// Checkout form that submits to `POST /api/orders`.
class CheckoutScreen extends StatefulWidget {
  const CheckoutScreen({super.key});

  @override
  State<CheckoutScreen> createState() => _CheckoutScreenState();
}

class _CheckoutScreenState extends State<CheckoutScreen> {
  final _formKey = GlobalKey<FormState>();
  final _api = ApiClient();

  final _firstName = TextEditingController();
  final _lastName = TextEditingController();
  final _email = TextEditingController();
  final _phone = TextEditingController();
  final _address1 = TextEditingController();
  final _address2 = TextEditingController();
  final _city = TextEditingController();
  final _state = TextEditingController();
  final _postcode = TextEditingController();
  final _note = TextEditingController();

  String _country = 'IN';
  bool _submitting = false;
  String? _serverError;

  static const Map<String, String> _countries = {
    'IN': 'India',
    'US': 'United States',
    'GB': 'United Kingdom',
    'AE': 'United Arab Emirates',
    'AU': 'Australia',
    'CA': 'Canada',
    'SG': 'Singapore',
    'DE': 'Germany',
    'FR': 'France',
    'NZ': 'New Zealand',
  };

  @override
  void dispose() {
    for (final c in [
      _firstName, _lastName, _email, _phone, _address1, _address2,
      _city, _state, _postcode, _note,
    ]) {
      c.dispose();
    }
    super.dispose();
  }

  Future<void> _submit() async {
    if (!_formKey.currentState!.validate()) return;
    setState(() {
      _submitting = true;
      _serverError = null;
    });
    final cart = Cart.instance;
    final body = <String, dynamic>{
      'line_items': cart.items
          .map((i) => {
                'product_id': i.product.id,
                'quantity': i.quantity,
                'name': i.product.name,
                'price': Cart.priceOf(i.product),
              })
          .toList(),
      'first_name': _firstName.text.trim(),
      'last_name': _lastName.text.trim(),
      'email': _email.text.trim(),
      'phone': _phone.text.trim(),
      'address_1': _address1.text.trim(),
      'address_2': _address2.text.trim(),
      'city': _city.text.trim(),
      'state': _state.text.trim(),
      'postcode': _postcode.text.trim(),
      'country': _country,
      if (_note.text.trim().isNotEmpty) 'customer_note': _note.text.trim(),
    };

    try {
      final response = await _api.createOrder(body);
      if (!mounted) return;
      cart.clear();
      Navigator.of(context).pushReplacement(
        MaterialPageRoute(
          builder: (_) => _OrderSuccess(order: response),
        ),
      );
    } on ApiException catch (e) {
      if (!mounted) return;
      setState(() {
        _submitting = false;
        _serverError = e.message;
      });
    } catch (e) {
      if (!mounted) return;
      setState(() {
        _submitting = false;
        _serverError = 'Unexpected error: $e';
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return Scaffold(
      appBar: AppBar(title: const Text('Checkout')),
      body: _submitting
          ? const LoadingView(message: 'Placing your order...')
          : Form(
              key: _formKey,
              child: ListView(
                padding: const EdgeInsets.all(16),
                children: [
                  if (_serverError != null)
                    Card(
                      color: theme.colorScheme.errorContainer,
                      child: Padding(
                        padding: const EdgeInsets.all(12),
                        child: Text(
                          _serverError!,
                          style: TextStyle(color: theme.colorScheme.onErrorContainer),
                        ),
                      ),
                    ),
                  _SectionLabel('Contact'),
                  _field(_firstName, 'First name *', icon: Icons.person_outline, validator: _required),
                  _field(_lastName, 'Last name'),
                  _field(_email, 'Email *', icon: Icons.mail_outline, keyboard: TextInputType.emailAddress,
                      validator: (v) {
                    if (v == null || v.trim().isEmpty) return 'Email is required';
                    if (!RegExp(r'^[^@\s]+@[^@\s]+\.[^@\s]+$').hasMatch(v.trim())) {
                      return 'Enter a valid email';
                    }
                    return null;
                  }),
                  _field(_phone, 'Phone *', icon: Icons.phone_outlined, keyboard: TextInputType.phone,
                      validator: _required),
                  const SizedBox(height: 12),
                  _SectionLabel('Shipping address'),
                  _field(_address1, 'Address line 1 *', icon: Icons.home_outlined, validator: _required),
                  _field(_address2, 'Address line 2'),
                  Row(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Expanded(child: _field(_city, 'City *', validator: _required)),
                      const SizedBox(width: 12),
                      Expanded(child: _field(_state, 'State *', validator: _required)),
                    ],
                  ),
                  _field(_postcode, 'Postcode / PIN *', keyboard: TextInputType.number,
                      validator: _required),
                  Padding(
                    padding: const EdgeInsets.symmetric(vertical: 8),
                    child: DropdownButtonFormField<String>(
                      initialValue: _country,
                      decoration: const InputDecoration(
                        labelText: 'Country',
                        border: OutlineInputBorder(),
                        isDense: true,
                      ),
                      items: _countries.entries
                          .map((e) => DropdownMenuItem(value: e.key, child: Text(e.value)))
                          .toList(),
                      onChanged: (v) => setState(() => _country = v ?? 'IN'),
                    ),
                  ),
                  const SizedBox(height: 12),
                  _SectionLabel('Order notes'),
                  _field(_note, 'Notes for the order (optional)'),
                  const SizedBox(height: 20),
                  FilledButton.icon(
                    onPressed: _submit,
                    icon: const Icon(Icons.check_circle_outline),
                    label: const Text('Place Order'),
                  ),
                  const SizedBox(height: 24),
                ],
              ),
            ),
    );
  }

  String? _required(String? v) =>
      (v == null || v.trim().isEmpty) ? 'This field is required' : null;

  Widget _field(
    TextEditingController controller,
    String label, {
    IconData? icon,
    TextInputType? keyboard,
    String? Function(String?)? validator,
  }) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 12),
      child: TextFormField(
        controller: controller,
        keyboardType: keyboard,
        validator: validator,
        decoration: InputDecoration(
          labelText: label,
          prefixIcon: icon != null ? Icon(icon, size: 20) : null,
          border: const OutlineInputBorder(),
          isDense: true,
        ),
      ),
    );
  }
}

class _SectionLabel extends StatelessWidget {
  const _SectionLabel(this.text);

  final String text;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 8),
      child: Text(
        text.toUpperCase(),
        style: Theme.of(context).textTheme.labelMedium?.copyWith(
              color: Theme.of(context).colorScheme.primary,
              fontWeight: FontWeight.w800,
              letterSpacing: 1.2,
            ),
      ),
    );
  }
}

class _OrderSuccess extends StatelessWidget {
  const _OrderSuccess({required this.order});

  final Map<String, dynamic> order;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final id = order['order_id'] ?? order['id'] ?? order['increment_id'];
    return Scaffold(
      body: Center(
        child: Padding(
          padding: const EdgeInsets.all(32),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              const Icon(Icons.check_circle, color: Colors.green, size: 72),
              const SizedBox(height: 16),
              Text(
                'Order placed!',
                style: theme.textTheme.headlineSmall?.copyWith(fontWeight: FontWeight.w800),
              ),
              const SizedBox(height: 8),
              Text(
                id != null ? 'Order ID: $id' : 'Thank you for your order.',
                textAlign: TextAlign.center,
                style: theme.textTheme.bodyLarge,
              ),
              const SizedBox(height: 8),
              Text(
                'We will confirm your order by email shortly.',
                textAlign: TextAlign.center,
                style: theme.textTheme.bodyMedium?.copyWith(
                  color: theme.colorScheme.onSurfaceVariant,
                ),
              ),
              const SizedBox(height: 24),
              FilledButton(
                onPressed: () => Navigator.of(context).popUntil((route) => route.isFirst),
                child: const Text('Back to Home'),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
