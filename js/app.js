/* =========================================================
   GUIÑO · Panel de oferentes — interacciones del prototipo
   Los datos son ilustrativos (prototipo, no producción).
   ========================================================= */

const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const fmt = n => n.toLocaleString('es-AR');

/* ---------- Contenido de ejemplo ---------- */
const ofertas = [
  // tono = qué degradé usa la tarjeta (ver .tono-* en styles.css)
  { titulo: 'Mesa para 2 en la ventana', hora: '21:30', tono: 'cafe', sub: 'Hoy 21:30 · menú de pastas caseras', img: 'assets/img/mesa-noche.jpg', estado: 'reservado', visitas: 148, cupos: 2, ocupados: 2 },
  { titulo: 'Cata de vermut en la vereda', hora: '19:00', tono: 'vermut', sub: 'Hoy 19:00 · 3 vermuts + picada · $18.500', img: 'assets/img/vermut-vereda.jpg', estado: 'ultimos', visitas: 312, cupos: 8, ocupados: 6 },
  { titulo: 'Barra de pastas al flash', hora: '22:00', tono: 'pasta', sub: 'Hoy 22:00 · lugar en barra', img: 'assets/img/pasta-flash.jpg', estado: 'libre', visitas: 96, cupos: 4, ocupados: 0,
    tip: 'Sumá una copa de bienvenida: las ofertas con extra reciben 2× más reservas después de las 21 h.' },
  { titulo: 'Noche de pool + birra', hora: '23:00', tono: 'pool', sub: 'Hoy 23:00 · mesa de pool 1 h', img: 'assets/img/pool-bar.jpg', estado: 'libre', visitas: 54, cupos: 4, ocupados: 0 }
];

const estados = {
  reservado: { label: 'Reservado', cls: 'st-reservado' },
  libre:     { label: 'Sin reservar', cls: 'st-libre' },
  ultimos:   { label: 'Quedan 2', cls: 'st-ultimos' }
};

const turnos = [
  { hora: '19:00', titulo: 'Cata de vermut', detalle: '6 de 8 cupos', mesas: ['o','o','o','g','g','g','f','f'], pasado: true },
  { hora: '20:00', titulo: 'Salón', detalle: '7 de 10 mesas', mesas: ['o','o','o','o','g','g','o','f','f','f'] },
  { hora: '21:00', titulo: 'Salón', detalle: '8 de 10 mesas', mesas: ['o','o','o','o','o','g','g','o','f','f'] },
  { hora: '21:30', titulo: 'Ventana', detalle: '1 de 1 mesa', mesas: ['g'] },
  { hora: '22:00', titulo: 'Barra de pastas', detalle: '0 de 4 lugares', mesas: ['f','f','f','f'] },
  { hora: '23:00', titulo: 'Pool', detalle: '0 de 1 mesa', mesas: ['f'] }
];

const visitas = {
  hoy:    { total: 1284, pico: 'Pico 20–22 h', labels: ['12','14','16','18','20','22','00'], data: [18,22,30,26,34,44,58,72,96,100,88,64,40], now: 9 },
  semana: { total: 7412, pico: 'Pico: sábado', labels: ['Sáb','Dom','Lun','Mar','Mié','Jue','Vie'], data: [100,82,30,34,46,60,88], now: 6 },
  mes:    { total: 28960, pico: 'Pico: fines de semana', labels: ['S1','','S2','','S3','','S4'], data: [52,60,48,70,64,74,58,80,66,90,72,96,84,100], now: 13 }
};

const dias = [
  { d: 'Sáb', n: 7,  dem: 'alta',  visitas: '2.100', ocup: '58%', libres: 12, prog: [
      { t: 'Brunch con DJ en el patio', h: '11:00 · 12 cupos', img: 'assets/img/lectura-sol.jpg', e: '5 reservados' },
      { t: 'Cena de ostras y blancos', h: '21:00 · 6 mesas', img: 'assets/img/ostras.jpg', e: 'Sin reservar' } ] },
  { d: 'Dom', n: 8,  dem: 'alta',  visitas: '1.850', ocup: '40%', libres: 18, prog: [
      { t: 'Vermut de domingo', h: '13:00 · 10 cupos', img: 'assets/img/vermut-vereda.jpg', e: '2 reservados' } ] },
  { d: 'Lun', n: 9,  dem: 'baja',  visitas: '620',   ocup: '12%', libres: 26, prog: [] },
  { d: 'Mar', n: 10, dem: 'baja',  visitas: '700',   ocup: '18%', libres: 24, prog: [] },
  { d: 'Mié', n: 11, dem: 'media', visitas: '940',   ocup: '25%', libres: 20, prog: [
      { t: 'Noche de pool + birra', h: '22:00 · 2 mesas', img: 'assets/img/pool-bar.jpg', e: 'Sin reservar' } ] },
  { d: 'Jue', n: 12, dem: 'media', visitas: '1.120', ocup: '30%', libres: 19, prog: [
      { t: 'Brindis de after office', h: '19:00 · 16 cupos', img: 'assets/img/brindis-noche.jpg', e: '4 reservados' } ] },
  { d: 'Vie', n: 13, dem: 'alta',  visitas: '1.960', ocup: '44%', libres: 15, prog: [] }
];

/* ---------- Ofertas ---------- */
const ojo = '<svg viewBox="0 0 24 24"><path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/></svg>';
const foco = '<svg viewBox="0 0 24 24"><path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3.5 10.9c.6.4 1 1.1 1 1.9V16h5v-.2c0-.8.4-1.5 1-1.9A6 6 0 0 0 12 3Z"/></svg>';

function renderOfertas(filtro = 'todas') {
  const lista = ofertas.filter(o => filtro === 'todas' || (filtro === 'reservado' ? o.estado === 'reservado' : o.estado !== 'reservado'));
  $('#offers').innerHTML = lista.map((o, i) => {
    const st = estados[o.estado];
    const slots = Array.from({ length: o.cupos }, (_, k) => `<i class="${k < o.ocupados ? 'on' : ''}"></i>`).join('');
    // Tarjeta: arriba horario + estado, en grande el nombre, abajo visitas + flecha.
    // El detalle (.offer-body) está oculto y se abre con la flecha.
    return `
    <article class="offer tono-${o.tono || 'cafe'}" style="animation-delay:${i * 70}ms">
      <div class="offer-media"><img src="${o.img}" alt="" loading="lazy"></div>
      <div class="offer-top">
        <span class="offer-hora">${o.hora}</span>
        <span class="offer-status ${st.cls}">${st.label}</span>
      </div>
      <h3 class="offer-name">${o.titulo}</h3>
      <div class="offer-foot">
        <span class="offer-views">${ojo}${fmt(o.visitas)} visitas</span>
        <button class="offer-toggle" aria-expanded="false" aria-label="Ver detalle de ${o.titulo}">
          <svg viewBox="0 0 24 24"><path d="M7 17 17 7M8 7h9v9"/></svg>
        </button>
      </div>
      <div class="offer-body">
        <div class="offer-body-in">
          <p class="offer-sub">${o.sub}</p>
          <div class="offer-meta">
            <span>${o.ocupados} de ${o.cupos} ocupados</span>
            <span class="slots" aria-hidden="true">${slots}</span>
          </div>
          ${o.tip ? `<p class="tip">${foco}<span>${o.tip}</span></p>` : ''}
          <div class="offer-actions">
            <button class="btn btn-ghost btn-sm" data-toast="Editar oferta · próximamente en el prototipo">Editar</button>
            <button class="btn btn-dark btn-sm" data-toast="Oferta pausada. Ya no aparece en el mapa.">Pausar</button>
          </div>
        </div>
      </div>
    </article>`;
  }).join('');
  $('#cntTodas').textContent = ofertas.length;
}

// Abrir / cerrar el detalle de una tarjeta con la flecha
$('#offers').addEventListener('click', e => {
  const t = e.target.closest('.offer-toggle');
  if (!t) return;
  const card = t.closest('.offer');
  const open = card.classList.toggle('is-open');
  t.setAttribute('aria-expanded', open);
});

$$('[data-filter]').forEach(b => b.addEventListener('click', () => {
  $$('[data-filter]').forEach(x => x.classList.toggle('is-on', x === b));
  renderOfertas(b.dataset.filter);
}));

/* ---------- Gráfico de visitas ---------- */
function renderChart(rango) {
  const v = visitas[rango];
  const max = Math.max(...v.data);
  const top2 = [...v.data].sort((a, b) => b - a).slice(0, 2);
  $('#bars').innerHTML = v.data.map((n, i) =>
    `<span style="--h:${(n / max) * 100}%" class="${top2.includes(n) ? 'peak' : ''} ${i === v.now && rango === 'hoy' ? 'now' : ''}" title="${n}"></span>`
  ).join('');
  $('#barsAxis').innerHTML = v.labels.map(l => `<span>${l}</span>`).join('');
  $('#chartTotal').textContent = fmt(v.total);
  $('#chartPeak').textContent = v.pico;
}
$$('[data-range]').forEach(b => b.addEventListener('click', () => {
  $$('[data-range]').forEach(x => x.classList.toggle('is-on', x === b));
  renderChart(b.dataset.range);
}));

/* ---------- Turnos de hoy ---------- */
const flechaFina = '<svg viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';

// Cada turno es una "franja" de color. El color depende del orden (c0 = más claro … c5 = más oscuro).
function renderTurnos() {
  // La lista de espera vive oculta en el HTML; la copiamos al detalle del próximo turno
  const espera = $('#hoy-espera .wl')?.outerHTML || '';
  const proximo = turnos.findIndex(t => !t.pasado);

  $('#hoy-turnos').innerHTML = turnos.map((t, i) => {
    const color = `c${Math.min(i, 5)}`;
    // Turno que ya pasó: franja chica, solo la hora
    if (t.pasado) return `<li class="strip ${color} is-past"><time>${t.hora}</time></li>`;

    const libres = t.mesas.filter(m => m === 'f').length;
    const porGuino = t.mesas.filter(m => m === 'g').length;
    const ocupacion = Math.round((t.mesas.length - libres) / t.mesas.length * 100);

    return `
    <li class="strip ${color}">
      <div class="strip-row">
        <button class="strip-toggle" aria-expanded="false" aria-label="Ver detalle del turno de las ${t.hora}"><time>${t.hora}</time></button>
        ${libres
          ? `<button class="strip-go" data-free="${t.hora}" aria-label="Publicar ${libres} lugares de las ${t.hora}"><span>${libres} ${libres === 1 ? 'libre' : 'libres'}</span>${flechaFina}</button>`
          : `<span class="strip-full">completo</span>`}
      </div>
      <div class="strip-bar" aria-hidden="true"><i style="width:${ocupacion}%"></i></div>
      <div class="strip-detail">
        <div class="strip-detail-in">
          <p><b>${t.titulo}</b> · ${t.detalle}${porGuino ? ` · ${porGuino} por Guiño` : ''}</p>
          ${i === proximo && espera ? `<p>En espera</p>${espera}` : ''}
        </div>
      </div>
    </li>`;
  }).join('');
}

// Tocar la hora abre/cierra el detalle de esa franja
$('#hoy-turnos').addEventListener('click', e => {
  const t = e.target.closest('.strip-toggle');
  if (!t) return;
  const abierta = t.closest('.strip').classList.toggle('is-open');
  t.setAttribute('aria-expanded', abierta);
});
document.addEventListener('click', e => {
  const b = e.target.closest('[data-free]');
  if (!b || b.classList.contains('is-done')) return;
  b.classList.add('is-done');
  b.textContent = 'En vivo ✓';
  toast(`Publicamos los lugares de las ${b.dataset.free} a viajeros cerca tuyo.`);
});

/* ---------- Cupos futuros ---------- */
let diaSel = 0;
function renderDias() {
  $('#futuros-calendario').innerHTML = dias.map((d, i) => `
    <button class="day ${i === diaSel ? 'is-on' : ''}" data-day="${i}" role="tab" aria-selected="${i === diaSel}">
      <small>${d.d}</small><b>${d.n}</b><span class="dem ${d.dem}"></span>
    </button>`).join('');
  const d = dias[diaSel];
  const demTxt = { alta: 'Demanda alta', media: 'Demanda media', baja: 'Demanda baja' }[d.dem];
  $('#forecast').innerHTML = `
    <div class="row-between">
      <div><span class="eyebrow dark">${d.d} ${d.n} nov</span><strong class="big-num">${demTxt}</strong></div>
      <span class="tag ${d.dem === 'alta' ? 'tag-sol' : ''}">${d.dem === 'baja' ? 'Ideal para un guiño' : 'Publicá temprano'}</span>
    </div>
    <div class="fc-grid">
      <div><b>${d.visitas}</b><span>visitas esperadas</span></div>
      <div><b>${d.ocup}</b><span>ya reservado</span></div>
      <div><b>${d.libres}</b><span>lugares libres</span></div>
    </div>`;
  $('#sched').innerHTML = d.prog.length
    ? d.prog.map(p => `
      <div class="sched-item">
        <img src="${p.img}" alt="">
        <div><b>${p.t}</b><span class="sm muted">${p.h}</span></div>
        <span class="tag">${p.e}</span>
      </div>`).join('')
    : `<p class="empty">Nada programado todavía. Los ${d.d.toLowerCase()} hay poca gente: un guiño puede llenar el salón.</p>`;
}
$('#futuros-calendario').addEventListener('click', e => {
  const b = e.target.closest('[data-day]');
  if (!b) return;
  diaSel = +b.dataset.day;
  renderDias();
});

/* ---------- Menú lateral ---------- */
const sheet = $('#sheet');
const drawer = $('#drawer'), scrim = $('#scrim'), openBtn = $('#openMenu');
function openMenu() {
  scrim.hidden = false;
  requestAnimationFrame(() => { scrim.classList.add('is-on'); drawer.classList.add('is-open'); });
  drawer.setAttribute('aria-hidden', 'false');
  openBtn.setAttribute('aria-expanded', 'true');
  $('#closeMenu').focus();
}
function closeMenu() {
  drawer.classList.remove('is-open');
  drawer.setAttribute('aria-hidden', 'true');
  openBtn.setAttribute('aria-expanded', 'false');
  hideScrimIfIdle();
}
function hideScrimIfIdle() {
  if (drawer.classList.contains('is-open') || sheet.classList.contains('is-open')) return;
  scrim.classList.remove('is-on');
  setTimeout(() => {
    if (!drawer.classList.contains('is-open') && !sheet.classList.contains('is-open')) scrim.hidden = true;
  }, 250);
}
openBtn.addEventListener('click', openMenu);
$('#closeMenu').addEventListener('click', closeMenu);
scrim.addEventListener('click', () => { closeMenu(); closeSheet(); });
$$('.nav a').forEach(a => a.addEventListener('click', closeMenu));

// Resalta la sección activa en el menú
const io = new IntersectionObserver(entries => {
  entries.forEach(en => {
    if (!en.isIntersecting) return;
    const id = en.target.dataset.section;
    $$('[data-nav]').forEach(a => a.classList.toggle('is-active', a.dataset.nav === id));
  });
}, { rootMargin: '-45% 0px -50% 0px' });
$$('[data-section]').forEach(s => io.observe(s));

// Visible en vivo
$('#liveToggle').addEventListener('change', e => {
  const on = e.target.checked;
  const pill = $('#livePill');
  pill.classList.toggle('is-off', !on);
  pill.innerHTML = on ? '<i></i> EN VIVO · visible a 500 m' : '<i></i> PAUSADO · no te ven';
  toast(on ? 'Volviste a estar visible para viajeros cerca.' : 'Pausamos tu visibilidad en vivo.');
});

/* ---------- Hoja: publicar cupo ---------- */
const form = { tipo: 'Mesa', hora: 'Ahora', extra: '', lugares: 2 };
function openSheet() {
  closeMenu();
  scrim.hidden = false;
  requestAnimationFrame(() => { scrim.classList.add('is-on'); sheet.classList.add('is-open'); });
  sheet.setAttribute('aria-hidden', 'false');
}
function closeSheet() {
  sheet.classList.remove('is-open');
  sheet.setAttribute('aria-hidden', 'true');
  hideScrimIfIdle();
}
document.addEventListener('click', e => {
  if (e.target.closest('[data-open-sheet]')) openSheet();
  if (e.target.closest('[data-close-sheet]')) closeSheet();
});

$$('.chips[data-group]').forEach(g => g.addEventListener('click', e => {
  const c = e.target.closest('.chip');
  if (!c) return;
  $$('.chip', g).forEach(x => x.classList.toggle('is-on', x === c));
  form[g.dataset.group] = c.dataset.v;
  updatePreview();
}));
$$('[data-step]').forEach(b => b.addEventListener('click', () => {
  form.lugares = Math.min(20, Math.max(1, form.lugares + +b.dataset.step));
  $('#lugares').textContent = form.lugares;
  updatePreview();
}));
function updatePreview() {
  const que = form.tipo === 'Barra' ? 'Lugar en barra' : form.tipo;
  const extra = form.extra ? ` + ${form.extra.toLowerCase()}` : '';
  $('#previewText').innerHTML = `<b>${que} para ${form.lugares} · ${form.hora}${extra}</b><br>A 500 m: Café Miller, comida casera y moda vintage. ¿Te sumás?`;
}
$('#publishForm').addEventListener('submit', e => {
  e.preventDefault();
  const que = form.tipo === 'Barra' ? 'Lugar en barra' : form.tipo;
  ofertas.unshift({
    titulo: `${que} para ${form.lugares}`,
    hora: form.hora,
    tono: 'ostras',
    sub: `Hoy ${form.hora}${form.extra ? ' · ' + form.extra.toLowerCase() : ''}`,
    img: form.tipo === 'Experiencia' ? 'assets/img/brindis-noche.jpg' : 'assets/img/ostras.jpg',
    estado: 'libre', visitas: 0, cupos: form.lugares, ocupados: 0
  });
  $$('[data-filter]').forEach((x, i) => x.classList.toggle('is-on', i === 0));
  renderOfertas();
  closeSheet();
  toast('¡Listo! Tu guiño está en vivo a 500 m a la redonda.');
  setTimeout(() => goTo('ofertas'), 300);
});

/* ---------- Varios ---------- */
document.addEventListener('keydown', e => { if (e.key === 'Escape') { closeMenu(); closeSheet(); } });

let tTimer;
function toast(msg) {
  const t = $('#toast');
  t.textContent = msg;
  t.classList.add('is-on');
  clearTimeout(tTimer);
  tTimer = setTimeout(() => t.classList.remove('is-on'), 2600);
}
document.addEventListener('click', e => {
  const b = e.target.closest('[data-toast]');
  if (!b) return;
  e.preventDefault();
  if (b.closest('.drawer')) closeMenu();
  toast(b.dataset.toast);
});

// Barra con sombra al scrollear + FAB visible después del hero
const fab = $('.fab');
addEventListener('scroll', () => {
  $('#topbar').classList.toggle('is-scrolled', scrollY > 8);
  fab.classList.toggle('is-visible', scrollY > 380);
}, { passive: true });

// Contadores animados
$$('[data-count]').forEach(el => {
  const end = +el.dataset.count, t0 = performance.now(), dur = 900;
  const step = now => {
    const p = Math.min(1, (now - t0) / dur);
    el.textContent = fmt(Math.round(end * (1 - Math.pow(1 - p, 3))));
    if (p < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
});

/* ---------- Pantallas (una por área, cada una con su scroll) ----------
   Cada <section> tiene data-view="home | visitas | futuros | resenas".
   Se muestra solo la pantalla activa; las demás quedan con [hidden]. */
const primerasSecciones = ['inicio', 'visitas', 'futuros', 'resenas'];
function showView(name) {
  $$('[data-view]').forEach(el => { el.hidden = el.dataset.view !== name; });
}
function route() {
  const id = location.hash.slice(1) || 'inicio';
  const el = document.getElementById(id);
  const name = el?.closest('[data-view]')?.dataset.view || 'home';
  showView(name);
  // Menú: marca el área activa
  const activo = name === 'home' ? (id.startsWith('hoy') ? 'hoy' : 'inicio') : name;
  $$('[data-nav]').forEach(a => a.classList.toggle('is-active', a.dataset.nav === activo));
  // Scroll: arriba de todo al entrar a una pantalla; o directo a la parte pedida
  if (!el || primerasSecciones.includes(id)) scrollTo({ top: 0, behavior: 'instant' });
  else el.scrollIntoView({ behavior: 'smooth' });
}
function goTo(id) {
  if (location.hash === '#' + id) route(); else location.hash = id;
}
addEventListener('hashchange', route);

/* ---------- Inicio ---------- */
route();
renderOfertas();
renderChart('hoy');
renderTurnos();
renderDias();
