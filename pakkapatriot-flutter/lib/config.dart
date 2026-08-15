/// Central configuration for the Pakka Patriot Flutter app.
class AppConfig {
  AppConfig._();

  /// Base URL of the Laravel API (all routes live under /api/*).
  static const String apiBaseUrl = 'https://api.pakkapatriot.com/api';

  /// Origin used to resolve relative image paths (e.g. `/storage/...`).
  static const String apiHost = 'https://api.pakkapatriot.com';

  /// Public website origin (used to open game pages etc. in the browser).
  static const String siteUrl = 'https://pakkapatriot.com';

  /// Resolve an image path/URL returned by the API.
  ///
  /// The API may return absolute URLs (`https://...`) or relative paths
  /// (`/storage/...`). Relative paths are resolved against [apiHost] so
  /// images load regardless of which origin produced the JSON.
  static String resolveImageUrl(String? pathOrUrl) {
    if (pathOrUrl == null || pathOrUrl.isEmpty) return '';
    if (pathOrUrl.startsWith('http://') || pathOrUrl.startsWith('https://')) {
      return pathOrUrl;
    }
    if (pathOrUrl.startsWith('/')) {
      return '$apiHost$pathOrUrl';
    }
    return '$apiHost/$pathOrUrl';
  }

  /// Format an INR amount (string from the API, e.g. "499") for display.
  static String formatPrice(String? price) {
    final n = double.tryParse(price ?? '') ?? 0;
    if (n == n.roundToDouble()) {
      return '₹${n.toInt()}';
    }
    return '₹${n.toStringAsFixed(2)}';
  }
}
