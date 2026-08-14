import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';
import {CartProvider} from './components/CartContext.tsx';
import App from './App.tsx';
import {fetchAllData, hydrateAll} from './services/ppApi.ts';
import './index.css';

const rootEl = document.getElementById('root')!;

/** Render a branded full-screen boot state while the dataset loads from Laravel. */
function showSplash(inner: string) {
  rootEl.innerHTML = `
    <div style="min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;background:#0A2240;color:#FCFAF5;font-family:Inter,system-ui,sans-serif;text-align:center;padding:24px;box-sizing:border-box">
      ${inner}
    </div>`;
}

function showLoading() {
  showSplash(`
    <img src="/favicon.png" alt="Pakka Patriot" width="76" height="76" style="border-radius:18px;margin-bottom:22px" />
    <div style="width:220px;height:4px;background:rgba(246,184,40,0.22);border-radius:999px;overflow:hidden;margin-bottom:18px">
      <div style="height:100%;width:40%;background:#F6B828;border-radius:999px;animation:ppLoad 1.1s ease-in-out infinite"></div>
    </div>
    <p style="margin:0;font-size:13px;letter-spacing:0.16em;text-transform:uppercase;color:#F6B828;font-weight:700">Loading Bhārat…</p>
    <style>@keyframes ppLoad{0%{transform:translateX(-110%)}100%{transform:translateX(320%)}}</style>
  `);
}

function showError() {
  showSplash(`
    <img src="/favicon.png" alt="Pakka Patriot" width="76" height="76" style="border-radius:18px;margin-bottom:22px" />
    <h1 style="margin:0 0 10px;font-size:20px;color:#FCFAF5">Can't reach the data server</h1>
    <p style="margin:0 0 26px;font-size:14px;line-height:1.7;color:#b8c4d2;max-width:400px">
      Pakka Patriot loads its content from the Laravel backend. Start it from
      <code style="background:#06182e;padding:2px 8px;border-radius:6px;font-size:13px;color:#F6B828">pakkapatriot-laravel</code>
      with <code style="background:#06182e;padding:2px 8px;border-radius:6px;font-size:13px;color:#F6B828">php artisan serve</code>
      and try again.
    </p>
    <button onclick="window.__ppRetry()" style="background:#F6B828;color:#0A2240;border:0;border-radius:999px;padding:12px 30px;font-size:15px;font-weight:700;cursor:pointer;font-family:inherit">Retry</button>
  `);
}

function renderApp() {
  createRoot(rootEl).render(
    <StrictMode>
      <BrowserRouter>
        <CartProvider>
          <App />
        </CartProvider>
      </BrowserRouter>
    </StrictMode>,
  );
}

/** Fetch the full dataset from Laravel, hydrate the data modules, then render the app. */
async function bootstrap() {
  showLoading();
  try {
    const payload = await fetchAllData();
    hydrateAll(payload);
    renderApp();
  } catch (err) {
    console.error("[Pakka Patriot] Failed to load data from the Laravel API:", err);
    showError();
  }
}

declare global {
  interface Window {
    __ppRetry?: () => void;
  }
}

window.__ppRetry = bootstrap;

bootstrap();
