<?php
/**
 * Temple Digital Panchangam - High Precision Hybrid Version
 * This version uses the same Drik Ganita engine as the JS version
 * but is contained within a PHP wrapper for easy integration.
 */
$temple_name = "SHREE PANCHANGAM";
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Temple Digital Panchangam</title>
    <link rel="stylesheet" href="style.css">
    <script type="importmap">
    {
      "imports": {
        "@ishubhamx/panchangam-js": "https://esm.sh/@ishubhamx/panchangam-js@2.2.6",
        "astronomy-engine": "https://esm.sh/astronomy-engine@2.1.19",
        "luxon": "https://esm.sh/luxon@3.6.1"
      }
    }
    </script>
</head>
<body>
    <div id="app">
        <div class="overlay"></div>
        
        <header class="fade-in">
            <div class="temple-info">
                <h1>श्री पञ्चाङ्गम्</h1>
                <p><?php echo $temple_name; ?></p>
            </div>
            <div class="clock-section">
                <div id="current-time">--:--:--</div>
                <div id="current-date">Loading...</div>
            </div>
        </header>

        <main>
            <section class="panchang-card fade-in" style="animation-delay: 0.2s">
                <div class="grid-data">
                    <div class="data-item">
                        <span class="label">Samvatsara | संवत्सरः</span>
                        <span class="value" id="samvatsara">-</span>
                    </div>
                    <div class="data-item">
                        <span class="label">Ayana | अयनम्</span>
                        <span class="value" id="ayana">-</span>
                    </div>
                    <div class="data-item">
                        <span class="label">Maasa | मासः</span>
                        <span class="value" id="maasa">-</span>
                    </div>
                    <div class="data-item">
                        <span class="label">Paksha | पक्षः</span>
                        <span class="value" id="paksha">-</span>
                    </div>
                    <div class="data-item">
                        <span class="label">Tithi | तिथिः</span>
                        <span class="value" id="tithi">-</span>
                        <span class="sub-value" id="tithi-end">Ends at -</span>
                    </div>
                    <div class="data-item">
                        <span class="label">Vaara | वारः</span>
                        <span class="value" id="vaara">-</span>
                    </div>
                </div>
            </section>

            <section class="panchang-card fade-in" style="animation-delay: 0.4s">
                <div class="grid-data">
                    <div class="data-item">
                        <span class="label">Nakshatra | नक्षत्रम्</span>
                        <span class="value" id="nakshatra">-</span>
                        <span class="sub-value" id="nakshatra-end">Ends at -</span>
                    </div>
                    <div class="data-item">
                        <span class="label">Yoga | योगः</span>
                        <span class="value" id="yoga">-</span>
                    </div>
                    <div class="data-item">
                        <span class="label">Karana | करणम्</span>
                        <span class="value" id="karana">-</span>
                    </div>
                </div>

                <div class="sun-times">
                    <div class="sun-item">
                        <div class="sun-info">
                            <span class="sun-label">SUNRISE</span>
                            <div class="sun-value" id="sunrise">--:--</div>
                        </div>
                    </div>
                    <div class="sun-item">
                        <div class="sun-info">
                            <span class="sun-label">SUNSET</span>
                            <div class="sun-value" id="sunset">--:--</div>
                        </div>
                    </div>
                </div>
            </section>
        </main>

        <footer class="fade-in" style="animation-delay: 0.6s">
            <p>High-precision Drik Ganita Calculations • © 2026 Temple Digital Services</p>
        </footer>
    </div>

    <script type="module">
        import { getPanchangamDetails, Observer } from '@ishubhamx/panchangam-js';
        import { DateTime } from 'luxon';

        // Default coordinates: Bangalore, India
        let latitude = 12.9716;
        let longitude = 77.5946;

        function updateClock() {
            const now = DateTime.now().setZone('Asia/Kolkata');
            document.getElementById('current-time').textContent = now.toFormat('HH:mm:ss');
            document.getElementById('current-date').textContent = now.toFormat('EEEE, d MMMM yyyy');
        }

        function formatTime(date) {
            if (!date) return '--:--';
            return DateTime.fromJSDate(new Date(date)).setZone('Asia/Kolkata').toFormat('HH:mm');
        }

        async function updatePanchang() {
            const observer = new Observer(latitude, longitude, 0);
            const now = new Date();
            
            try {
                const details = getPanchangamDetails(now, observer, { calendarType: 'amanta' });

                document.getElementById('samvatsara').textContent = details.samvat.samvatsara;
                document.getElementById('ayana').textContent = details.ayana;
                document.getElementById('maasa').textContent = details.masa.name + (details.masa.isAdhika ? ' (Adhika)' : '');
                document.getElementById('paksha').textContent = details.paksha;

                const currentTithi = details.tithiTransitions.find(t => new Date(t.startTime) <= now && new Date(t.endTime) >= now) || details.tithiTransitions[0];
                document.getElementById('tithi').textContent = currentTithi ? currentTithi.name : '-';
                document.getElementById('tithi-end').textContent = currentTithi ? `Ends at ${formatTime(currentTithi.endTime)}` : '';

                const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
                document.getElementById('vaara').textContent = days[now.getDay()];

                const currentNak = details.nakshatraTransitions.find(n => new Date(n.startTime) <= now && new Date(n.endTime) >= now) || details.nakshatraTransitions[0];
                document.getElementById('nakshatra').textContent = currentNak ? currentNak.name : '-';
                document.getElementById('nakshatra-end').textContent = currentNak ? `Ends at ${formatTime(currentNak.endTime)}` : '';

                const currentYoga = details.yogaTransitions.find(y => new Date(y.startTime) <= now && new Date(y.endTime) >= now) || details.yogaTransitions[0];
                document.getElementById('yoga').textContent = currentYoga ? currentYoga.name : '-';

                const currentKarana = details.karanaTransitions.find(k => new Date(k.startTime) <= now && new Date(k.endTime) >= now) || details.karanaTransitions[0];
                document.getElementById('karana').textContent = currentKarana ? currentKarana.name : '-';

                document.getElementById('sunrise').textContent = formatTime(details.sunrise);
                document.getElementById('sunset').textContent = formatTime(details.sunset);

            } catch (error) {
                console.error('Panchang error:', error);
            }
        }

        // Location sensing
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                latitude = position.coords.latitude;
                longitude = position.coords.longitude;
                updatePanchang();
            }, () => updatePanchang());
        } else {
            updatePanchang();
        }

        setInterval(updateClock, 1000);
        setInterval(updatePanchang, 60000);
        updateClock();
        updatePanchang();
    </script>
</body>
</html>
