// Robot de noticias — Ciencia para las Regiones al Día (Vibras Positivas HM)
// Corre en GitHub Actions cada 30 minutos y actualiza noticias.json con Google News.
import { readFile, writeFile } from 'node:fs/promises';

const QUERIES = [
  '"convocatoria 54" Minciencias',
  '"convocatoria 55" Minciencias',
  'OCAD ciencia tecnología innovación regalías',
  'Minciencias regalías convocatorias regiones',
  'Minciencias Antioquia regalías ciencia',
  'Minciencias Córdoba Sucre regalías ciencia'
];
const RELEVANTE = /minciencias|regal|ocad|ciencia|convocatoria|sgr/i;

const decode = s => s
  .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')
  .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
  .replace(/&quot;/g, '"').replace(/&#39;/g, "'").trim();
const tag = (xml, t) => { const m = xml.match(new RegExp(`<${t}[^>]*>([\\s\\S]*?)</${t}>`)); return m ? decode(m[1]) : ''; };
const norm = s => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').slice(0, 70);

async function buscar(q) {
  const url = 'https://news.google.com/rss/search?q=' + encodeURIComponent(q + ' when:60d') + '&hl=es-419&gl=CO&ceid=CO:es-419';
  const r = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0 (robot ciencia-regiones-al-dia)' } });
  if (!r.ok) throw new Error(q + ' -> ' + r.status);
  const xml = await r.text();
  return [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)].map(m => {
    const it = m[1];
    const source = tag(it, 'source');
    let title = tag(it, 'title');
    if (source && title.endsWith(' - ' + source)) title = title.slice(0, -(source.length + 3));
    const pd = tag(it, 'pubDate');
    return { title, link: tag(it, 'link'), source, date: pd ? new Date(pd).toISOString() : null };
  });
}

let previas = [];
try { previas = JSON.parse(await readFile('noticias.json', 'utf8')).items || []; } catch {}

const nuevas = [];
for (const q of QUERIES) {
  try { nuevas.push(...await buscar(q)); } catch (e) { console.log('Aviso:', e.message); }
}

const mapa = new Map();
for (const n of [...nuevas, ...previas]) {
  if (!n.title || !RELEVANTE.test(n.title)) continue;
  const k = norm(n.title);
  if (!mapa.has(k)) mapa.set(k, n);
}
const items = [...mapa.values()]
  .sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0))
  .slice(0, 80);

await writeFile('noticias.json', JSON.stringify({ updated: new Date().toISOString(), items }, null, 2) + '\n');
console.log(`Listo: ${items.length} noticias (${nuevas.length} encontradas en esta pasada).`);
