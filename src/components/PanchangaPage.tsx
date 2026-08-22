/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Temple Digital Panchangam — converted from the PHP/HTML version.
 * Uses @ishubhamx/panchangam-js for high-precision Drik Ganita calculations.
 */

import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, MapPin } from "lucide-react";
import { DateTime } from "luxon";

interface PanchangamData {
  samvatsara: string;
  ayana: string;
  maasa: string;
  maasaAdhika: boolean;
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
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

function formatIST(date: Date | string): string {
  return DateTime.fromJSDate(new Date(date)).setZone("Asia/Kolkata").toFormat("HH:mm");
}

export default function PanchangaPage() {
  const [time, setTime] = useState("--:--:--");
  const [dateStr, setDateStr] = useState("Loading...");
  const [panchangam, setPanchangam] = useState<PanchangamData | null>(null);
  const [locationLabel, setLocationLabel] = useState("Detecting location…");
  const coordsRef = useRef({ lat: 12.9716, lon: 77.5946 }); // Bangalore fallback

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
      const { getPanchangamDetails, Observer } = await import(
        "@ishubhamx/panchangam-js"
      );
      const observer = new Observer(lat, lon, 0);
      const now = new Date();
      const details = getPanchangamDetails(now, observer, {
        calendarType: "amanta",
      });

      const currentTithi =
        details.tithiTransitions.find(
          (t: any) =>
            new Date(t.startTime) <= now && new Date(t.endTime) >= now
        ) || details.tithiTransitions[0];

      const currentNak =
        details.nakshatraTransitions.find(
          (n: any) =>
            new Date(n.startTime) <= now && new Date(n.endTime) >= now
        ) || details.nakshatraTransitions[0];

      const currentYoga =
        details.yogaTransitions.find(
          (y: any) =>
            new Date(y.startTime) <= now && new Date(y.endTime) >= now
        ) || details.yogaTransitions[0];

      const currentKarana =
        details.karanaTransitions.find(
          (k: any) =>
            new Date(k.startTime) <= now && new Date(k.endTime) >= now
        ) || details.karanaTransitions[0];

      setPanchangam({
        samvatsara: details.samvat?.samvatsara ?? "—",
        ayana: details.ayana ?? "—",
        maasa:
          (details.masa?.name ?? "—") +
          (details.masa?.isAdhika ? " (Adhika)" : ""),
        maasaAdhika: details.masa?.isAdhika ?? false,
        paksha: details.paksha ?? "—",
        tithiName: currentTithi?.name ?? "—",
        tithiEnd: currentTithi?.endTime
          ? `Ends at ${formatIST(currentTithi.endTime)}`
          : "",
        vaara: DAYS[now.getDay()],
        nakshatraName: currentNak?.name ?? "—",
        nakshatraEnd: currentNak?.endTime
          ? `Ends at ${formatIST(currentNak.endTime)}`
          : "",
        yogaName: currentYoga?.name ?? "—",
        karanaName: currentKarana?.name ?? "—",
        sunrise: details.sunrise ? formatIST(details.sunrise) : "--:--",
        sunset: details.sunset ? formatIST(details.sunset) : "--:--",
      });
    } catch (err) {
      console.error("Panchangam error:", err);
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
    <div className="min-h-screen w-full text-[#fefae0] overflow-x-hidden"
      style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
    >
      {/* Background */}
      <div className="fixed inset-0 -z-10">
        <img
          src="/panchanga/background.png"
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.6)_100%)]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 min-h-screen flex flex-col">
        {/* Top bar */}
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10 sm:mb-14 fade-in">
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="flex items-center gap-1.5 text-xs font-bold text-[#b8c4d2] hover:text-[#F6B828] transition-colors"
            >
              <ArrowLeft size={16} /> Home
            </Link>
          </div>
          <div className="flex items-center gap-2 text-xs text-[#b8c4d2]">
            <MapPin size={13} className="text-[#FF9933]" />
            <span className="font-semibold">{locationLabel}</span>
          </div>
        </header>

        {/* Title */}
        <div className="text-center mb-10 sm:mb-14 fade-in" style={{ animationDelay: "0.1s" }}>
          <h1
            className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-wide"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              color: "#D4AF37",
              textShadow: "0 4px 10px rgba(0,0,0,0.5)",
            }}
          >
            श्री पञ्चाङ्गम्
          </h1>
          <p
            className="text-lg sm:text-xl mt-2 tracking-widest"
            style={{
              fontFamily: "'Mukta', system-ui, sans-serif",
              color: "#FF9933",
            }}
          >
            SHREE PANCHANGAM
          </p>
        </div>

        {/* Clock */}
        <div className="text-center mb-10 sm:mb-14 fade-in" style={{ animationDelay: "0.2s" }}>
          <div
            className="text-6xl sm:text-7xl lg:text-8xl font-extrabold text-white leading-none"
            style={{ textShadow: "0 0 20px rgba(255,255,255,0.2)" }}
          >
            {time}
          </div>
          <div className="text-xl sm:text-2xl text-[#e9edc9] mt-3">
            {dateStr}
          </div>
        </div>

        {/* Panchangam cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 flex-grow">
          {/* Card 1: Samvatsara, Ayana, Maasa, Paksha, Tithi, Vaara */}
          <div
            className="panchang-card fade-in"
            style={{ animationDelay: "0.3s" }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
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

          {/* Card 2: Nakshatra, Yoga, Karana + Sunrise/Sunset */}
          <div
            className="panchang-card fade-in"
            style={{ animationDelay: "0.4s" }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">
              <DataItem
                label="Nakshatra | नक्षत्रम्"
                value={panchangam?.nakshatraName}
                sub={panchangam?.nakshatraEnd}
              />
              <DataItem label="Yoga | योगः" value={panchangam?.yogaName} />
              <DataItem label="Karana | करणम्" value={panchangam?.karanaName} />
            </div>

            <div className="flex justify-between pt-6 border-t border-white/10">
              <SunTime label="SUNRISE" value={panchangam?.sunrise} />
              <SunTime label="SUNSET" value={panchangam?.sunset} />
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer
          className="text-center mt-10 sm:mt-14 text-white/30 text-xs fade-in"
          style={{ animationDelay: "0.6s" }}
        >
          High-precision Drik Ganita Calculations &bull; &copy; 2026 Temple
          Digital Services
        </footer>
      </div>

      {/* Inline styles matching the original CSS */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;800&family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Mukta:wght@200;400;700&display=swap');

        .panchang-card {
          background: rgba(26, 12, 8, 0.75);
          backdrop-filter: blur(15px);
          border: 1px solid rgba(212, 175, 55, 0.2);
          border-radius: 24px;
          padding: 32px;
          box-shadow: 0 20px 50px rgba(0,0,0,0.5);
        }

        @media (min-width: 640px) {
          .panchang-card { padding: 40px; }
        }

        .fade-in {
          animation: fadeIn 1s ease-out both;
        }

        @keyframes fadeIn {
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
    <div className="mb-3">
      <span
        className="block text-xs sm:text-sm uppercase tracking-widest font-semibold mb-1"
        style={{ color: "#FF9933" }}
      >
        {label}
      </span>
      <span
        className="block text-2xl sm:text-3xl font-bold"
        style={{
          fontFamily: "'Mukta', system-ui, sans-serif",
          color: "#D4AF37",
        }}
      >
        {value || "—"}
      </span>
      {sub && (
        <span className="block text-sm text-[#e9edc9] italic mt-0.5">
          {sub}
        </span>
      )}
    </div>
  );
}

function SunTime({ label, value }: { label: string; value?: string }) {
  return (
    <div className="text-center">
      <span className="block text-xs text-[#e9edc9] tracking-widest mb-1">
        {label}
      </span>
      <span
        className="block text-2xl sm:text-3xl font-bold text-white"
        style={{ fontFamily: "'Mukta', system-ui, sans-serif" }}
      >
        {value || "--:--"}
      </span>
    </div>
  );
}
