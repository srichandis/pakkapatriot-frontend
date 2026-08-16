-- Coordinates for collection_items (exported from local DB 2026-08-16 10:18)
-- Run on the server: mysql gavynomv_pp_backend < coordinates.sql
-- (or paste the whole file into phpMyAdmin — the USE line selects the database)
-- This file ALSO creates the latitude/longitude columns, so you do NOT need
-- to run `php artisan migrate --force` first. It is safe to run twice.

USE gavynomv_pp_backend;

-- 1) Create the latitude/longitude columns if they don't already exist
--    (DECIMAL(10,7) matches the Laravel migration, so the API reads them the same)
SET @lat = (SELECT COUNT(*) FROM information_schema.COLUMNS
            WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'ppcollection_items' AND COLUMN_NAME = 'latitude');
SET @lng = (SELECT COUNT(*) FROM information_schema.COLUMNS
            WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'ppcollection_items' AND COLUMN_NAME = 'longitude');
SET @sql1 = IF(@lat = 0, 'ALTER TABLE ppcollection_items ADD COLUMN latitude DECIMAL(10,7) NULL AFTER region', 'SELECT 1');
SET @sql2 = IF(@lng = 0, 'ALTER TABLE ppcollection_items ADD COLUMN longitude DECIMAL(10,7) NULL AFTER latitude', 'SELECT 1');
PREPARE s1 FROM @sql1; EXECUTE s1; DEALLOCATE PREPARE s1;
PREPARE s2 FROM @sql2; EXECUTE s2; DEALLOCATE PREPARE s2;

-- 2) Fill in the coordinates
UPDATE ppcollection_items SET latitude = 27.1750075, longitude = 78.0421013 WHERE slug = 'taj-mahal';
UPDATE ppcollection_items SET latitude = 28.656081, longitude = 77.2407959 WHERE slug = 'red-fort';
UPDATE ppcollection_items SET latitude = 28.524413, longitude = 77.1854501 WHERE slug = 'qutub-minar';
UPDATE ppcollection_items SET latitude = 15.3358, longitude = 76.4610201 WHERE slug = 'hampi';
UPDATE ppcollection_items SET latitude = 24.8515132, longitude = 79.9259786 WHERE slug = 'khajuraho';
UPDATE ppcollection_items SET latitude = 19.8875639, longitude = 86.0944895 WHERE slug = 'konark-sun-temple';
UPDATE ppcollection_items SET latitude = 19.5670323, longitude = 76.4164557 WHERE slug = 'ajanta-ellora';
UPDATE ppcollection_items SET latitude = 31.6199787, longitude = 74.8765281 WHERE slug = 'golden-temple';
UPDATE ppcollection_items SET latitude = 9.9188911, longitude = 78.1195482 WHERE slug = 'meenakshi-temple';
UPDATE ppcollection_items SET latitude = 25.3356491, longitude = 83.0076292 WHERE slug = 'varanasi';
UPDATE ppcollection_items SET latitude = 18.9219661, longitude = 72.8345657 WHERE slug = 'gateway-of-india';
UPDATE ppcollection_items SET latitude = 9.5003416, longitude = 76.4123364 WHERE slug = 'kerala-backwaters';
UPDATE ppcollection_items SET latitude = 30.7430879, longitude = 79.6177253 WHERE slug = 'valley-of-flowers';
UPDATE ppcollection_items SET latitude = 22.0315881, longitude = 88.6873161 WHERE slug = 'sundarbans';
UPDATE ppcollection_items SET latitude = 34.1681148, longitude = 77.5841568 WHERE slug = 'ladakh';
UPDATE ppcollection_items SET latitude = 19.9830917, longitude = 76.4911448 WHERE slug = 'lonar-crater-lake';
UPDATE ppcollection_items SET latitude = 17.9242764, longitude = 73.6575799 WHERE slug = 'needle-hole-point';
UPDATE ppcollection_items SET latitude = 18.2939056, longitude = 83.0597306 WHERE slug = 'borra-caves';
UPDATE ppcollection_items SET latitude = 15.3156176, longitude = 74.3142493 WHERE slug = 'dudhsagar-falls';
UPDATE ppcollection_items SET latitude = 34.1709853, longitude = 77.3524824 WHERE slug = 'magnetic-hill';
UPDATE ppcollection_items SET latitude = 15.102175, longitude = 78.1116692 WHERE slug = 'belum-caves';
UPDATE ppcollection_items SET latitude = 25.2510232, longitude = 91.6713764 WHERE slug = 'living-root-bridges';
UPDATE ppcollection_items SET latitude = 23.1317464, longitude = 79.8009868 WHERE slug = 'marble-rocks';
UPDATE ppcollection_items SET latitude = 23.7905519, longitude = 70.4966137 WHERE slug = 'banni-grasslands';
UPDATE ppcollection_items SET latitude = 24.5584253, longitude = 93.8132376 WHERE slug = 'loktak-lake';
UPDATE ppcollection_items SET latitude = 34.0008865, longitude = 74.7975922 WHERE slug = 'amarnath-cave';
UPDATE ppcollection_items SET latitude = 13.3437929, longitude = 74.6844981 WHERE slug = 'st-marys-islands';
UPDATE ppcollection_items SET latitude = 26.9151658, longitude = 75.8099241 WHERE slug = 'sambhar-lake';
UPDATE ppcollection_items SET latitude = 21.4932273, longitude = 86.9357935 WHERE slug = 'chandipur-beach';
UPDATE ppcollection_items SET latitude = 22.0315881, longitude = 88.6873161 WHERE slug = 'aleya-ghost-lights';
UPDATE ppcollection_items SET latitude = 17.3616024, longitude = 78.4746421 WHERE slug = 'charminar';
UPDATE ppcollection_items SET latitude = 12.3052197, longitude = 76.6553846 WHERE slug = 'mysore-palace';
UPDATE ppcollection_items SET latitude = 24.6817365, longitude = 84.968231 WHERE slug = 'bodh-gaya';
UPDATE ppcollection_items SET latitude = 30.1086537, longitude = 78.2916193 WHERE slug = 'rishikesh';
UPDATE ppcollection_items SET latitude = 12.6166214, longitude = 80.199159 WHERE slug = 'mahabalipuram';
UPDATE ppcollection_items SET latitude = 21.837977, longitude = 73.719164 WHERE slug = 'statue-of-unity';
