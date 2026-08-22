/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Temple Digital Panchangam — converted from the PHP/HTML version.
 * Uses @ishubhamx/panchangam-js via esm.sh for browser compatibility.
 */

import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, MapPin, AlertTriangle } from "lucide-react";
import { DateTime } from "luxon";

interface PanchangamData {
  samvatsara: string;
  ayana: string;
  maasa: string;
  paksha: string;
  tithiName: string;
  tithiEnd: string;
  vaara: string;
  nakshatraName: string;
  nakshatraEnd: string;
  yogaName: string;
  karanaName: string;
  sunrise: string;
  sunset: string;
}

const DAYS = [
  "Sunday", "Monday", "Tuesday", "Wednesday",
  "Thursday", "Friday", "Saturday",
];

function formatIST(date: Date | string): string {
  return DateTime.fromJSDate(new Date(date))
    .setZone("Asia/Kolkata")
    .toFormat("HH:mm");
}

export default function PanchangaPage() {
  const [time, setTime] = useState("--:--:--");
  const [dateStr, setDateStr] = useState("Loading...");
  const [panchangam, setPanchangam] = useState<PanchangamData | null>(null);
  const [locationLabel, setLocationLabel] = useState("Detecting location…");
  const [error, setError] = useState<string | null>(null);
  const coordsRef = useRef({ lat: 12.9716, lon: 77.5946 });

  // Clock tick
  useEffect(() => {
    const tick = () => {
      const now = DateTime.now().setZone("Asia/Kolkata");
      setTime(now.toFormat("HH:mm:ss"));
      setDateStr(now.toFormat("EEEE, d MMMM yyyy"));
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  // Compute panchangam
  const computePanchangam = async (lat: number, lon: number) => {
    try {
      // Use esm.sh CDN like the original PHP page — the npm package
      // pulls in Node.js-only modules (fs) that break in the browser.
      const [{ getPanchangamDetails, Observer }, { DateTime: LuxonDT }] =
        await Promise.all([
          // @ts-ignore — esm.sh returns a browser-compatible bundle
          import("https://esm.sh/@ishubhamx/panchangam-js@2.2.6"),
          // @ts-ignore
          import("https://esm.sh/luxon@3.6.1"),
        ]);

      const observer = new Observer(lat, lon, 0);
      const now = new Date();
      const details = getPanchangamDetails(now, observer, {
        calendarType: "amanta",
      });

      const currentTithi =
        details.tithiTransitions?.find(
          (t: any) =>
            new Date(t.startTime) <= now && new Date(t.endTime) >= now
        ) || details.tithiTransitions?.[0];

      const currentNak =
        details.nakshatraTransitions?.find(
          (n: any) =>
            new Date(n.startTime) <= now && new Date(n.endTime) >= now
        ) || details.nakshatraTransitions?.[0];

      const currentYoga =
        details.yogaTransitions?.find(
          (y: any) =>
            new Date(y.startTime) <= now && new Date(y.endTime) >= now
        ) || details.yogaTransitions?.[0];

      const currentKarana =
        details.karanaTransitions?.find(
          (k: any) =>
            new Date(k.startTime) <= now && new Date(k.endTime) >= now
        ) || details.karanaTransitions?.[0];

      const fmt = (d: any) => {
        if (!d) return "--:--";
        return LuxonDT.fromJSDate(new Date(d))
          .setZone("Asia/Kolkata")
          .toFormat("HH:mm");
      };

      setPanchangam({
        samvatsara: details.samvat?.samvatsara ?? "—",
        ayana: details.ayana ?? "—",
        maasa:
          (details.masa?.name ?? "—") +
          (details.masa?.isAdhika ? " (Adhika)" : ""),
        paksha: details.paksha ?? "—",
        tithiName: currentTithi?.name ?? "—",
        tithiEnd: currentTithi?.endTime
          ? `Ends at ${fmt(currentTithi.endTime)}`
          : "",
        vaara: DAYS[now.getDay()],
        nakshatraName: currentNak?.name ?? "—",
        nakshatraEnd: currentNak?.endTime
          ? `Ends at ${fmt(currentNak.endTime)}`
          : "",
        yogaName: currentYoga?.name ?? "—",
        karanaName: currentKarana?.name ?? "—",
        sunrise: fmt(details.sunrise),
        sunset: fmt(details.sunset),
      });
      setError(null);
    } catch (err) {
      console.error("Panchangam error:", err);
      setError("Could not load panchangam data. Retrying…");
    }
  };

  // Geolocation + periodic refresh
  useEffect(() => {
    const locate = (pos: GeolocationPosition) => {
      coordsRef.current = {
        lat: pos.coords.latitude,
        lon: pos.coords.longitude,
      };
      setLocationLabel(
        `${pos.coords.latitude.toFixed(2)}°, ${pos.coords.longitude.toFixed(2)}°`
      );
      computePanchangam(pos.coords.latitude, pos.coords.longitude);
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(locate, () => {
        setLocationLabel("Bangalore (default)");
        computePanchangam(coordsRef.current.lat, coordsRef.current.lon);
      });
    } else {
      setLocationLabel("Bangalore (default)");
      computePanchangam(coordsRef.current.lat, coordsRef.current.lon);
    }

    const id = setInterval(() => {
      computePanchangam(coordsRef.current.lat, coordsRef.current.lon);
    }, 60_000);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      className="panchanga-root"
      style={{
        minHeight: "100vh",
        width: "100%",
        color: "#fefae0",
        fontFamily: "'Inter', system-ui, sans-serif",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
        }}
      >
        <img
          src="/panchanga/background.png"
          alt=""
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.6) 100%)",
          }}
        />
      </div>

      <div
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: 1280,
          margin: "0 auto",
          padding: "32px 16px",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Top bar */}
        <header
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 40,
          }}
          className="fade-in"
        >
          <Link
            to="/"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              fontSize: 13,
              fontWeight: 700,
              color: "#b8c4d2",
              textDecoration: "none",
            }}
          >
            <ArrowLeft size={16} /> Home
          </Link>
          <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: "#b8c4d2" }}>
            <MapPin size={13} style={{ color: "#FF9933" }} />
            <span style={{ fontWeight: 600 }}>{locationLabel}</span>
          </div>
        </header>

        {/* Title */}
        <div
          className="fade-in"
          style={{ textAlign: "center", marginBottom: 48, animationDelay: "0.1s" }}
        >
          <h1
            style={{
              fontSize: "clamp(2.5rem, 5vw, 3.5rem)",
              fontWeight: 700,
              letterSpacing: "0.05em",
              fontFamily: "'Playfair Display', Georgia, serif",
              color: "#D4AF37",
              textShadow: "0 4px 10px rgba(0,0,0,0.5)",
              margin: 0,
            }}
          >
            श्री पञ्चाङ्गम्
          </h1>
          <p
            style={{
              fontSize: "clamp(1rem, 2vw, 1.25rem)",
              marginTop: 8,
              letterSpacing: "0.2em",
              fontFamily: "'Mukta', system-ui, sans-serif",
              color: "#FF9933",
              fontWeight: 400,
            }}
          >
            SHREE PANCHANGAM
          </p>
        </div>

        {/* Clock */}
        <div
          className="fade-in"
          style={{ textAlign: "center", marginBottom: 48, animationDelay: "0.2s" }}
        >
          <div
            style={{
              fontSize: "clamp(3rem, 8vw, 5rem)",
              fontWeight: 800,
              color: "#fff",
              lineHeight: 1,
              textShadow: "0 0 20px rgba(255,255,255,0.2)",
            }}
          >
            {time}
          </div>
          <div
            style={{
              fontSize: "clamp(1rem, 2vw, 1.25rem)",
              color: "#e9edc9",
              marginTop: 10,
            }}
          >
            {dateStr}
          </div>
        </div>

        {/* Error banner */}
        {error && (
          <div
            style={{
              background: "rgba(180,40,40,0.85)",
              color: "#fff",
              padding: "10px 20px",
              borderRadius: 12,
              marginBottom: 24,
              fontSize: 13,
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <AlertTriangle size={16} /> {error}
          </div>
        )}

        {/* Panchangam cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 420px), 1fr))",
            gap: 28,
            flex: 1,
          }}
        >
          {/* Card 1 */}
          <div className="panchang-card fade-in" style={{ animationDelay: "0.3s" }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1.5fr",
                gap: 20,
              }}
            >
              <DataItem label="Samvatsara | संवत्सरः" value={panchangam?.samvatsara} />
              <DataItem label="Ayana | अयनम्" value={panchangam?.ayana} />
              <DataItem label="Maasa | मासः" value={panchangam?.maasa} />
              <DataItem label="Paksha | पक्षः" value={panchangam?.paksha} />
              <DataItem
                label="Tithi | तिथिः"
                value={panchangam?.tithiName}
                sub={panchangam?.tithiEnd}
              />
              <DataItem label="Vaara | वारः" value={panchangam?.vaara} />
            </div>
          </div>

          {/* Card 2 */}
          <div className="panchang-card fade-in" style={{ animationDelay: "0.4s" }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1.5fr",
                gap: 20,
                marginBottom: 32,
              }}
            >
              <DataItem
                label="Nakshatra | नक्षत्रम्"
                value={panchangam?.nakshatraName}
                sub={panchangam?.nakshatraEnd}
              />
              <DataItem label="Yoga | योगः" value={panchangam?.yogaName} />
              <DataItem label="Karana | करणम्" value={panchangam?.karanaName} />
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                paddingTop: 20,
                borderTop: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              <SunTime label="SUNRISE" value={panchangam?.sunrise} />
              <SunTime label="SUNSET" value={panchangam?.sunset} />
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer
          className="fade-in"
          style={{
            textAlign: "center",
            marginTop: 48,
            color: "rgba(255,255,255,0.3)",
            fontSize: 12,
            animationDelay: "0.6s",
          }}
        >
          High-precision Drik Ganita Calculations &bull; &copy; 2026 Temple
          Digital Services
        </footer>
      </div>

      {/* Inline styles */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;800&family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Mukta:wght@200;400;700&display=swap');

        .panchanga-root {
          background-color: #120907 !important;
        }

        .panchang-card {
          background: rgba(26, 12, 8, 0.75) !important;
          backdrop-filter: blur(15px);
          border: 1px solid rgba(212, 175, 55, 0.2);
          border-radius: 24px;
          padding: 40px;
          box-shadow: 0 20px 50px rgba(0,0,0,0.5);
        }

        .fade-in {
          animation: panchangaFadeIn 1s ease-out both;
        }

        @keyframes panchangaFadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

function DataItem({
  label,
  value,
  sub,
}: {
  label: string;
  value?: string;
  sub?: string;
}) {
  return (
    <div style={{ marginBottom: 12 }}>
      <span
        style={{
          display: "block",
          fontSize: "0.75rem",
          textTransform: "uppercase",
          color: "#FF9933",
          letterSpacing: "0.15em",
          marginBottom: 4,
          fontWeight: 600,
        }}
      >
        {label}
      </span>
      <span
        style={{
          display: "block",
          fontSize: "1.5rem",
          fontFamily: "'Mukta', system-ui, sans-serif",
          fontWeight: 700,
          color: "#D4AF37",
        }}
      >
        {value || "—"}
      </span>
      {sub && (
        <span
          style={{
            display: "block",
            fontSize: "0.875rem",
            color: "#e9edc9",
            fontStyle: "italic",
            marginTop: -2,
          }}
        >
          {sub}
        </span>
      )}
    </div>
  );
}

function SunTime({ label, value }: { label: string; value?: string }) {
  return (
    <div style={{ textAlign: "center" }}>
      <span
        style={{
          display: "block",
          fontSize: "0.8rem",
          color: "#e9edc9",
          letterSpacing: "0.15em",
          marginBottom: 4,
        }}
      >
        {label}
      </span>
      <span
        style={{
          display: "block",
          fontSize: "1.5rem",
          fontFamily: "'Mukta', system-ui, sans-serif",
          fontWeight: 700,
          color: "#fff",
        }}
      >
        {value || "--:--"}
      </span>
    </div>
  );
}
