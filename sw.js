// 這個位置已經搬家：清掉舊快取、解除註冊，讓頁面改走轉址
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(ks => Promise.all(ks.map(k => caches.delete(k))))
      .then(() => self.registration.unregister())
      .then(() => self.clients.matchAll())
      .then(cs => cs.forEach(c => c.navigate(c.url)))
  );
});
