import 'package:flutter/foundation.dart';

import '../models/api_models.dart';
import '../services/api_client.dart';

/// App-wide holder for the `GET /api/data` payload.
///
/// Shared by the home screen and the header navigation menu so both can show
/// the collections without fetching twice.
class SiteDataController extends ChangeNotifier {
  SiteDataController._();

  static final SiteDataController instance = SiteDataController._();

  final ApiClient _api = ApiClient();

  SiteData? data;
  Object? error;
  bool loading = false;

  bool get hasData => data != null;

  /// Fetch once (no-op if already loaded or already loading).
  Future<void> load() async {
    if (loading || data != null) return;
    await reload();
  }

  /// Force a fresh fetch (used by pull-to-refresh and retry buttons).
  Future<void> reload() async {
    loading = true;
    error = null;
    notifyListeners();
    try {
      data = await _api.fetchSiteData();
    } catch (e) {
      error = e;
    } finally {
      loading = false;
      notifyListeners();
    }
  }
}
