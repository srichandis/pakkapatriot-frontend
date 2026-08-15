import 'dart:convert';

import 'package:http/http.dart' as http;

import '../config.dart';
import '../models/api_models.dart';

/// Exception raised when the API responds with an error.
class ApiException implements Exception {
  const ApiException(this.message, {this.statusCode});

  final String message;
  final int? statusCode;

  @override
  String toString() => message;
}

/// Thin HTTP client for the Pakka Patriot Laravel API.
class ApiClient {
  ApiClient({http.Client? client}) : _client = client ?? http.Client();

  final http.Client _client;
  static const Duration _timeout = Duration(seconds: 25);

  /// GET /api/data — collections, games, ebooks and activities.
  Future<SiteData> fetchSiteData() async {
    final json = await _getJson('/data');
    return SiteData.fromJson(json);
  }

  /// GET /api/blogs?per_page=&page=
  Future<BlogPage> fetchBlogs({int page = 1, int perPage = 12}) async {
    final json = await _getJson(
      '/blogs',
      {'per_page': '$perPage', 'page': '$page'},
    );
    return BlogPage.fromJson(json);
  }

  /// GET /api/blogs/{slug}
  Future<BlogDetail> fetchBlog(String slug) async {
    final json = await _getJson('/blogs/$slug');
    return BlogDetail.fromJson(json);
  }

  /// GET /api/shop/products?per_page=&page=&search=
  Future<ProductPage> fetchProducts({
    int page = 1,
    int perPage = 20,
    String? search,
  }) async {
    final json = await _getJson('/shop/products', {
      'per_page': '$perPage',
      'page': '$page',
      if (search != null && search.isNotEmpty) 'search': search,
    });
    return ProductPage.fromJson(json);
  }

  /// GET /api/shop/products/{id}
  Future<Product> fetchProduct(int id) async {
    final json = await _getJson('/shop/products/$id');
    return Product.fromJson(_asMap(json['data']));
  }

  /// POST /api/orders — place an order from the cart.
  Future<Map<String, dynamic>> createOrder(Map<String, dynamic> body) async {
    final uri = Uri.parse('${AppConfig.apiBaseUrl}/orders');
    late http.Response response;
    try {
      response = await _client
          .post(
            uri,
            headers: {'Content-Type': 'application/json'},
            body: jsonEncode(body),
          )
          .timeout(_timeout);
    } catch (e) {
      throw ApiException('Could not reach the order server: $e');
    }

    final decoded = _decode(response);
    if (response.statusCode >= 200 && response.statusCode < 300) {
      return decoded;
    }
    final message = decoded['error'] ?? decoded['message'] ?? _serverMessage(decoded);
    throw ApiException(message.toString(), statusCode: response.statusCode);
  }

  Future<Map<String, dynamic>> _getJson(
    String path, [
    Map<String, String>? query,
  ]) async {
    final uri = Uri.parse('${AppConfig.apiBaseUrl}$path')
        .replace(queryParameters: query);
    late http.Response response;
    try {
      response = await _client.get(uri).timeout(_timeout);
    } catch (e) {
      throw ApiException('Could not reach the data server ($uri): $e');
    }
    final decoded = _decode(response);
    if (response.statusCode >= 200 && response.statusCode < 300) {
      return decoded;
    }
    final message = decoded['error'] ?? decoded['message'] ?? _serverMessage(decoded);
    throw ApiException(message.toString(), statusCode: response.statusCode);
  }

  Map<String, dynamic> _decode(http.Response response) {
    try {
      final decoded = jsonDecode(response.body);
      if (decoded is Map) return Map<String, dynamic>.from(decoded);
      return {'data': decoded};
    } catch (_) {
      return {'error': 'Unexpected response (HTTP ${response.statusCode})'};
    }
  }

  String _serverMessage(Map<String, dynamic> decoded) {
    // Laravel validation errors: { "message": "...", "errors": {...} }
    final errors = decoded['errors'];
    if (errors is Map && errors.isNotEmpty) {
      final first = errors.values.first;
      if (first is List && first.isNotEmpty) return first.first.toString();
      if (first != null) return first.toString();
    }
    return 'Request failed (HTTP ${decoded['status'] ?? 'error'})';
  }
}

Map<String, dynamic> _asMap(dynamic value) {
  if (value is Map<String, dynamic>) return value;
  if (value is Map) return Map<String, dynamic>.from(value);
  return <String, dynamic>{};
}
