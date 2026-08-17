-- Pakka Patriot: newsletter subscriptions ("Let's stay in touch!" form + Flutter app)
-- Generated 2026-08-17
-- Safe to re-run: table created if missing. Subscriptions are saved here by
-- POST /api/newsletter/subscribe (source: "newsletter-section" from the
-- website, "flutter-app" from the mobile app).

USE gavynomv_pp_backend;

CREATE TABLE IF NOT EXISTS ppnewsletter_subscriptions (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  email VARCHAR(255) NOT NULL,
  source VARCHAR(255) NULL,
  created_at TIMESTAMP NULL,
  updated_at TIMESTAMP NULL,
  PRIMARY KEY (id),
  UNIQUE KEY ppnewsletter_subscriptions_email_unique (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
