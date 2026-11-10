# Guiño · Prototipo mobile para oferentes

Prototipo navegable en alta fidelidad (web mobile) para restaurantes y experiencias que publican sus cupos libres en vivo.
Los datos y textos son ilustrativos. Las fotos salen del branding de Guiño (ppt).

## Cómo verlo
1. Abrí esta carpeta en VS Code (`Archivo > Abrir carpeta…`).
2. Clic derecho en `index.html` → **Open with Live Server** (o doble clic para abrirlo en el navegador).
3. En el navegador: `F12` → ícono de celular (modo dispositivo) → iPhone 14 / 390 px.

## Estructura
```
guino-proto/
├── index.html          → contenido y estructura (una sola página de scroll)
├── css/styles.css      → sistema visual: paleta, tipografías, componentes
├── js/app.js           → interacciones: menú lateral, publicar cupo, gráficos, filtros
├── assets/img/         → fotos (imaginería de la marca)
├── assets/icons/       → (vacío, para íconos propios)
└── docs/figma-export.html → versión estática de las 3 pantallas que se importa a Figma
```

## Secciones (orden del scroll = menú lateral)
01 Inicio (saludo, KPIs, ofertas en vivo con visitas y estado de reserva) ·
02 Índice de visitas (por hora, embudo, fuentes, viajeros) ·
03 Cupos de hoy (turnos, sin confirmar, lista de espera) ·
04 Cupos futuros (calendario 7 días, demanda, programados) ·
05 Reseñas · Cierre de marca.

## Sistema visual
- Paleta: #FAF8DB crema · #FEDE2E sol · #DEBD06 mostaza · #9E8B23 oliva · #625821 musgo · #2D2703 noche
- Tipografías: Bricolage Grotesque (titulares) · Inclusive Sans (textos)

## Figma
Archivo: https://www.figma.com/design/KsTdrpfuMSbVbP14h05C03 (página "Prototipo", 3 pantallas con navegación).
Las fotos están como placeholders ("foto · nombre.jpg"): seleccioná el rectángulo y arrastrá la imagen desde assets/img.
