/* Fiche neuro standardisée — service worker
   Stratégie : app shell en cache d'abord, revalidation en arrière-plan.
   L'outil doit s'ouvrir instantanément et fonctionner sans réseau en salle
   d'examen ou en caisson. Le réseau ne sert qu'à récupérer une version plus
   récente, jamais à afficher la page.

   Les fiches ne transitent PAS par ce cache : elles vivent dans IndexedDB
   et dans le dossier choisi par l'utilisateur. Vider le cache ne les efface pas.
*/
const VERSION = 'v6.1.2';
const CACHE   = 'fiche-neuro-' + VERSION;

const SHELL = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-192-maskable.png',
  './icons/icon-512-maskable.png',
  './icons/apple-touch-icon.png',
  './icons/favicon-32.png'
];

self.addEventListener('install', e => {
  e.waitUntil((async () => {
    const c = await caches.open(CACHE);
    // addAll échoue en bloc si une seule ressource manque : on tolère les absences
    await Promise.all(SHELL.map(u =>
      c.add(new Request(u, { cache: 'reload' })).catch(() => {})
    ));
  })());
});

self.addEventListener('activate', e => {
  e.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys
      .filter(k => k.startsWith('fiche-neuro-') && k !== CACHE)
      .map(k => caches.delete(k)));
    if (self.registration.navigationPreload) {
      try { await self.registration.navigationPreload.enable(); } catch (err) {}
    }
    await self.clients.claim();
  })());
});

self.addEventListener('message', e => {
  if (e.data && e.data.type === 'SKIP_WAITING') self.skipWaiting();
});

async function revalidate(req, cache) {
  try {
    const net = await fetch(req);
    if (net && net.ok) await cache.put(req, net.clone());
    return net;
  } catch (err) { return null; }
}

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  // Navigation : on sert index.html depuis le cache, toujours.
  if (req.mode === 'navigate') {
    e.respondWith((async () => {
      const cache = await caches.open(CACHE);
      const hit = await cache.match('./index.html');
      if (hit) { revalidate(new Request('./index.html', { cache: 'reload' }), cache); return hit; }
      const pre = await e.preloadResponse;
      if (pre) return pre;
      try { return await fetch(req); }
      catch (err) {
        return new Response(
          '<!doctype html><meta charset="utf-8"><title>Hors ligne</title>' +
          '<body style="font:15px system-ui;padding:32px;max-width:34em;margin:auto">' +
          '<h1>Application non installée</h1><p>Cette page n\'a pas encore été mise en cache. ' +
          'Reconnectez-vous une fois pour terminer l\'installation.</p>',
          { status: 503, headers: { 'Content-Type': 'text/html; charset=utf-8' } });
      }
    })());
    return;
  }

  // Ressources : cache d'abord, revalidation silencieuse.
  e.respondWith((async () => {
    const cache = await caches.open(CACHE);
    const hit = await cache.match(req);
    if (hit) { revalidate(req, cache); return hit; }
    const net = await revalidate(req, cache);
    if (net) return net;
    return new Response('', { status: 504, statusText: 'Hors ligne' });
  })());
});
