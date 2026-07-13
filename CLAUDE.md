# Kebab Deluxe — web restaurace

Statický web (čisté HTML + CSS + JS, žádný build systém, žádné závislosti).

## Soubory
- `index.html` — celý web (jednostránkový)
- `kebabdlstyles.css` — styly
- `kebabdl.js` — interaktivita
- `dish-images/`, `menu1.webp`, `menu2.webp`, … — obrázky jídel a menu
- `robots.txt`, `sitemap.xml` — SEO

## Pravidla
- Žádné frameworky ani build kroky nezavádět — web musí zůstat jednoduchý statický.
- Obrázky vždy ve WebP, komprimované, s explicitními rozměry (`width`/`height`).
- Texty česky, cílovka jsou zákazníci restaurace.
- Po změnách obsahu aktualizuj `sitemap.xml`.
- Je to git repozitář — změny commituj (`feat:`, `fix:`, …).
