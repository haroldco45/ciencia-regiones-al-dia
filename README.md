# Ciencia para las Regiones al Día

App ciudadana (PWA) de **Vibras Positivas HM** para hacerle seguimiento a las convocatorias **54 y 55** de MinCiencias: $1,43 billones del Sistema General de Regalías para ciencia, tecnología e innovación en las regiones. Cierre: **viernes 13 de noviembre de 2026, 4:00 p. m.** (hora de Colombia).

**URL:** https://dancing-capybara-946d99.netlify.app
**Repo:** haroldco45/ciencia-regiones-al-dia

## Qué trae
- Botón **Actualizar**, sección **Hoy** (se recalcula cada vez que se entra, con hora de Colombia), cuenta regresiva al cierre y **búsqueda en vivo** de noticias al abrir.
- **Robot de GitHub Actions** que trae noticias reales de Google News cada 30 minutos (`noticias.json`).
- Cifras, cronograma completo hasta la decisión del OCAD, líneas temáticas, la alianza de 4 actores y "Lo que se viene" con oportunidades para el Bajo Cauca, para empresas, para jóvenes y para ciudadanos.
- **Derecho de petición** a MinCiencias, la Secretaría Técnica del OCAD, la Gobernación de Antioquia y la Alcaldía de Caucasia, que se envía a todos de una vez.
- Español e inglés, vista previa al compartir (`og-image.jpg`, 1200×630) y se puede instalar.

## Archivos
```
index.html
manifest.json
sw.js
netlify.toml
noticias.json
og-image.jpg
icon-192.png
icon-512.png
img/foto-campo.jpg  img/foto-alianza.jpg  img/foto-paneles.jpg
img/foto-cultivo.jpg  img/foto-drones.jpg
img/pieza-ejes.jpg  img/pieza-alianza.jpg  img/pieza-postula.jpg
scripts/robot.mjs
.github/workflows/robot-noticias.yml
```

## Cómo publicarla
1. Cree el repo `haroldco45/ciencia-regiones-al-dia` y suba todos los archivos con las mismas carpetas.
2. En el repo: **Settings → Actions → General → Workflow permissions → Read and write permissions**.
3. En **Actions → Robot de noticias → Run workflow**, córralo una vez a mano.
4. En Netlify: **Add new site → Import from GitHub** con este repo (sitio publicado como dancing-capybara-946d99). Cada vez que el robot guarde noticias, Netlify publica solo.

## Para revisar
- Los correos de la Alcaldía de Caucasia (`alcaldia@` y `planeacion@caucasia-antioquia.gov.co`) salen de documentos judiciales públicos; confírmelos en la página de la Alcaldía antes de enviar.
- Las fechas que la app marca como "reportado por prensa" salen de Más Colombia. Compárelas con los términos de referencia oficiales.

Fuentes: MinCiencias (páginas de las convocatorias 54 y 55, sala de prensa), El Espectador, Más Colombia, PYME Noticias, IFM Noticias, El Heraldo, Portafolio.

Desarrollada por Vibras Positivas HM — Derechos de Autor Reservados
