// Ciencia para las Regiones al Día — service worker (Vibras Positivas HM)
const C='cra-v4';
const CORE=['./','index.html','manifest.json','icon-192.png','icon-512.png','og-image.jpg',
'img/foto-campo.jpg','img/foto-alianza.jpg','img/foto-paneles.jpg','img/foto-cultivo.jpg','img/foto-drones.jpg',
'img/pieza-ejes.jpg','img/pieza-alianza.jpg','img/pieza-postula.jpg'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{
  const u=new URL(e.request.url);
  if(e.request.method!=='GET')return;
  if(u.origin!==location.origin)return; // proxies y Google News: siempre red
  // HTML y noticias: primero la red (para que siempre esté al día), caché si no hay señal
  if(e.request.mode==='navigate'||u.pathname.endsWith('noticias.json')||u.pathname.endsWith('.html')){
    e.respondWith(fetch(e.request).then(r=>{const cp=r.clone();caches.open(C).then(c=>c.put(e.request,cp));return r}).catch(()=>caches.match(e.request,{ignoreSearch:true}).then(r=>r||caches.match('index.html'))));
    return;
  }
  e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(res=>{const cp=res.clone();caches.open(C).then(c=>c.put(e.request,cp));return res})));
});
