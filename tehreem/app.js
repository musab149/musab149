/* A Little World — for Tehreem
   Plain JS, no dependencies. Edit the CONFIG block to personalise. */
(() => {
'use strict';

/* ───────────── CONFIG ───────────── */
const CONFIG = {
  music: 'music.mp3',             // drop a song with this name next to index.html and a ▶ button appears
};

/* Memories. Add videos as { video:'videos/clip.mp4', src:'photos/poster.jpg', cap:'…' } */
const MEMORIES = [
  { src:'p01', cap:'Golden hour, and somehow you still outshine it.' },
  { src:'p03', cap:'Dressed in gold, exactly like the queen you are.' },
  { src:'p13', cap:'My whole world, in one frame.' },
  { src:'p04', cap:'Tall pines, cool air, and your quiet smile.' },
  { src:'p06', cap:'Emerald suits you. Honestly, everything does.' },
  { src:'p07', cap:'By the fountain, a wish that already came true.' },
  { src:'p11', cap:'Old red walls, and a timeless kind of grace.' },
  { src:'p08', cap:'A path of little lights. I’d walk every one with you.' },
  { src:'p09', cap:'Blossoms above, and the sweetest bloom below.' },
  { src:'p05', cap:'City lights at night couldn’t compete.' },
  { src:'p10', cap:'Winter coats, warm hearts.' },
  { src:'p12', cap:'Soft colours, softer heart.' },
  { src:'p14', cap:'Simply you, and simply beautiful.' },
].map(m => ({ ...m, full:`photos/${m.src}.jpg`, thumb:`photos/${m.src}-sm.jpg` }));

const CONFESSIONS = [
  { t:'I still get nervous around you.', p:'Sometimes I look at you and completely forget what I was about to say. After all this time, my heart still hasn’t learned to stay calm.' },
  { t:'Your smile is my favourite place.', p:'On my tiredest days, one smile from you resets everything. I don’t think you know how much power you have over my mood.' },
  { t:'I notice the little things.', p:'The way you care for everyone before yourself. The way you remember what matters to people. I see it, all of it, and I admire you for it.' },
  { t:'You make ordinary days feel like Eid.', p:'Chai, small talk, a walk, a silly joke. With you, the simplest moments feel like something worth celebrating.' },
  { t:'I’m proud of you.', p:'For your strength, your patience, your heart, and for every quiet battle you’ve won that nobody else saw.' },
  { t:'I don’t say thank you enough.', p:'For your duas, for your patience with me, for making a house feel like home. Thank you, truly, from the deepest part of me.' },
  { t:'I’d choose you again.', p:'In every lifetime, in every version of this story, I would still find my way to you, and choose you every single time.' },
];

const DUAS = [
  { h:'Sehat', ur:'Health', p:'May Allah keep you healthy and strong, glowing inside and out, for many, many years to come.' },
  { h:'Sukoon', ur:'Peace', p:'May your heart always find peace, even on the loud days, and may your worries always be light.' },
  { h:'Khushi', ur:'Happiness', p:'May every year give you more reasons to smile than the one before.' },
  { h:'Barakah', ur:'Blessing', p:'May there be barakah in your time, your work, your home and every step you take.' },
  { h:'Imaan', ur:'Faith', p:'May your imaan stay bright, and may every dua you make find its way to acceptance.' },
  { h:'Jannah', ur:'Forever', p:'And may we stay together in this life, and be reunited in Jannat-ul-Firdaus, Ameen.' },
];

/* ───────────── helpers ───────────── */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const NUMS = ['One','Two','Three','Four','Five','Six','Seven'];
const wait = ms => new Promise(r => setTimeout(r, ms));
const store = {
  get(k){ try { return localStorage.getItem(k); } catch { return null; } },
  set(k, v){ try { localStorage.setItem(k, v); } catch {} },
};

/* ───────────── chapters / navigation ───────────── */
const scenes = $$('.scene');
const curtain = $('#curtain');
const dotsEl = $('#dots');
let cur = -1, busy = false;
const NIGHT = new Set(['s-duas','s-heart']);

scenes.forEach((s, i) => {
  const b = document.createElement('button');
  b.setAttribute('aria-label', `Chapter ${i + 1}, ${s.dataset.title}`);
  b.innerHTML = '<span></span>';
  b.addEventListener('click', () => go(i));
  dotsEl.appendChild(b);
});

function show(i){
  scenes.forEach((s, j) => s.classList.toggle('active', j === i));
  cur = i;
  window.scrollTo(0, 0);
  const s = scenes[i];
  document.body.classList.toggle('night', NIGHT.has(s.id));
  $('#progressLabel').textContent = `${String(i + 1).padStart(2,'0')} / ${String(scenes.length).padStart(2,'0')} · ${s.dataset.title}`;
  [...dotsEl.children].forEach((d, j) => { d.className = j < i ? 'done' : j === i ? 'cur' : ''; d.toggleAttribute('aria-current', j === i); });
  $('#backBtn').classList.toggle('show', i > 0);
  history.replaceState(null, '', '#' + s.id.slice(2));
  enter[s.id]?.();
  updateHeadOnScroll();
}

async function go(i){
  if (busy || i === cur || i < 0 || i >= scenes.length) return;
  busy = true;
  closeLightbox();
  if (reduce){ show(i); busy = false; return; }
  $('#curtainNum').textContent = `Chapter ${NUMS[i]}`;
  $('#curtainTitle').textContent = scenes[i].dataset.title;
  curtain.className = 'curtain in';
  await wait(1250);
  show(i);
  curtain.className = 'curtain out';
  await wait(700);
  busy = false;
}

document.addEventListener('click', e => {
  const n = e.target.closest('[data-next]');
  if (n) return go(cur + 1);
  const g = e.target.closest('[data-go]');
  if (g) return go(+g.dataset.go);
});
$('#backBtn').addEventListener('click', () => go(cur - 1));

// dark header while over the memories hero
function updateHeadOnScroll(){
  const s = scenes[cur];
  if (s?.id !== 's-memories') return;
  const hero = $('.mem-hero');
  document.body.classList.toggle('night', window.scrollY < hero.offsetHeight - 80);
}
addEventListener('scroll', updateHeadOnScroll, { passive:true });

/* per-scene enter hooks */
const enter = {
  's-surprise'(){ startArch(); },
  's-letter'(){ resetEnvelope(); },
  's-confessions'(){ resetDeck(); },
  's-duas'(){},
  's-memories'(){ observeReveals(); updateStrip(); },
  's-heart'(){},
  's-finale'(){ resetFinale(); },
};

/* ───────────── 1 · splash ───────────── */
let archTimer;
function startArch(){
  clearInterval(archTimer);
  const imgs = $$('.arch img');
  let k = 0;
  archTimer = setInterval(() => {
    if (cur !== 0) return clearInterval(archTimer);
    imgs[k].classList.remove('on');
    k = (k + 1) % imgs.length;
    imgs[k].classList.add('on');
  }, 4200);
}

$('#hugBtn').addEventListener('click', e => {
  heartBurst(e.clientX, e.clientY, 22);
  toast('Hug received. Now open your surprise ♡');
});

function heartBurst(x, y, n = 16){
  if (reduce) return;
  for (let i = 0; i < n; i++){
    const h = document.createElement('span');
    h.textContent = ['♥','♡','❤'][i % 3];
    const a = Math.random() * Math.PI * 2, d = 60 + Math.random() * 140;
    Object.assign(h.style, {
      position:'fixed', left:x + 'px', top:y + 'px', zIndex:170, pointerEvents:'none',
      color:['#542D3A','#D7A6A1','#B8925A'][i % 3], fontSize:(12 + Math.random() * 18) + 'px',
      transition:'transform 1.1s cubic-bezier(.2,.75,.2,1), opacity 1.1s ease', transform:'translate(-50%,-50%)',
    });
    document.body.appendChild(h);
    requestAnimationFrame(() => requestAnimationFrame(() => {
      h.style.transform = `translate(calc(-50% + ${Math.cos(a) * d}px), calc(-50% + ${Math.sin(a) * d - 40}px)) rotate(${(Math.random() - .5) * 60}deg)`;
      h.style.opacity = '0';
    }));
    setTimeout(() => h.remove(), 1200);
  }
}

let toastT;
function toast(msg){
  const t = $('#toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(toastT);
  toastT = setTimeout(() => t.classList.remove('show'), 2800);
}

/* ───────────── 2 · envelope ───────────── */
const env = $('#envelope'), envLetter = $('#envLetter');
function resetEnvelope(){
  env.classList.remove('open');
  env.style.removeProperty('--lift'); env.style.removeProperty('--room');
  $('#letterCta').classList.remove('show');
  $('#envHint').textContent = 'Tap the seal to open it.';
}
function openEnvelope(){
  if (env.classList.contains('open')) return;
  const H = env.offsetHeight;
  const prev = envLetter.style.maxHeight;
  envLetter.style.maxHeight = 'none';
  const L = envLetter.offsetHeight;
  envLetter.style.maxHeight = prev;
  const lift = H * .24;   // lifts the text clear of the front pocket
  env.style.setProperty('--lift', lift + 'px');
  env.style.setProperty('--lh', L + 'px');
  env.style.marginTop = '';
  env.classList.add('open');
  // make room above so the risen letter never overlaps the heading
  env.style.setProperty('--room', Math.max(0, L + lift - H * .94 + 20) + 'px');
  $('#envHint').textContent = 'For you, with all my heart.';
  $('#letterCta').classList.add('show');
  const r = env.getBoundingClientRect();
  setTimeout(() => heartBurst(r.left + r.width / 2, r.top + r.height * .5, 14), 400);
}
$('#seal').addEventListener('click', openEnvelope);
env.addEventListener('click', e => { if (!e.target.closest('.env-letter')) openEnvelope(); });

/* ───────────── 3 · confession deck ───────────── */
const deck = $('#deck');
let top = 0;
CONFESSIONS.forEach((c, i) => {
  const el = document.createElement('article');
  el.className = 'card';
  el.innerHTML = `
    <div class="card-top"><span>Confession ${String(i + 1).padStart(2,'0')}</span><span class="ico">♥</span></div>
    <div><h3>${c.t}</h3><p>${c.p}</p></div>
    <div class="card-foot"><span>${i + 1} of ${CONFESSIONS.length}</span><span class="swipe">swipe ⇆</span></div>`;
  deck.appendChild(el);
});
const cards = $$('.card', deck);

function layoutDeck(){
  cards.forEach((c, i) => {
    const d = i - top;
    c.style.zIndex = 100 - i;
    if (d < 0){
      c.classList.add('gone');
      c.style.transform = `translateX(${c.dataset.dir === 'r' ? 130 : -130}%) rotate(${c.dataset.dir === 'r' ? 18 : -18}deg)`;
    } else {
      c.classList.remove('gone');
      const k = Math.min(d, 3);
      c.style.transform = `translateY(${k * 14}px) scale(${1 - k * .045}) rotate(${d ? (d % 2 ? 1.5 : -1.5) : 0}deg)`;
      c.style.opacity = d > 3 ? 0 : 1;
    }
    c.setAttribute('aria-hidden', d !== 0);
  });
  $('#deckCount').textContent = `${Math.min(top + 1, cards.length)} / ${cards.length}`;
  $('#deckPrev').disabled = top === 0;
  $('#deckNext').disabled = top >= cards.length;
  $('#deckDone').classList.toggle('show', top >= cards.length);
}
function deckNext(dir = 'l'){ if (top < cards.length){ cards[top].dataset.dir = dir; top++; layoutDeck(); } }
function deckPrev(){ if (top > 0){ top--; layoutDeck(); } }
function resetDeck(){ top = 0; layoutDeck(); }
$('#deckNext').addEventListener('click', () => deckNext('l'));
$('#deckPrev').addEventListener('click', deckPrev);
$('#deckReset').addEventListener('click', resetDeck);

// drag / swipe the top card
let drag = null;
deck.addEventListener('pointerdown', e => {
  const c = e.target.closest('.card');
  if (!c || cards.indexOf(c) !== top) return;
  drag = { c, x:e.clientX, y:e.clientY, dx:0, moved:false };
  c.setPointerCapture(e.pointerId);
});
deck.addEventListener('pointermove', e => {
  if (!drag) return;
  drag.dx = e.clientX - drag.x;
  if (!drag.moved && Math.abs(drag.dx) > 6){ drag.moved = true; drag.c.classList.add('dragging'); }
  if (drag.moved) drag.c.style.transform = `translateX(${drag.dx}px) rotate(${drag.dx / 18}deg)`;
});
const endDrag = () => {
  if (!drag) return;
  const { c, dx, moved } = drag;
  c.classList.remove('dragging');
  drag = null;
  if (!moved) return deckNext('l');                 // a simple tap also advances
  if (Math.abs(dx) > 90) deckNext(dx > 0 ? 'r' : 'l'); else layoutDeck();
};
deck.addEventListener('pointerup', endDrag);
deck.addEventListener('pointercancel', endDrag);

/* ───────────── 4 · duas ───────────── */
function scatterStars(el, n){
  for (let i = 0; i < n; i++){
    const s = document.createElement('i');
    s.style.cssText = `left:${Math.random() * 100}%;top:${Math.random() * 100}%;--t:${2 + Math.random() * 4}s;--dl:${Math.random() * 4}s;transform:scale(${.5 + Math.random()})`;
    el.appendChild(s);
  }
}
scatterStars($('#stars'), 90);
scatterStars($('#heartStars'), 60);
const lanternSVG = `<svg viewBox="0 0 46 64" aria-hidden="true">
  <path class="frame" d="M23 2v6M15 8h16M13 14h20l4 6v30l-4 6H13l-4-6V20z"/>
  <path class="glass" d="M14 18h18l3 4v26l-3 4H14l-3-4V22z"/>
  <path class="fl" d="M23 28c4 5 5 8 5 11a5 5 0 0 1-10 0c0-3 1-6 5-11z"/>
  <path class="frame" d="M17 56v4h12v-4"/></svg>`;
const lanternsEl = $('#lanterns');
DUAS.forEach(d => {
  const b = document.createElement('button');
  b.className = 'lantern';
  b.setAttribute('aria-expanded', 'false');
  b.innerHTML = `${lanternSVG}<h4>${d.h}</h4><span class="ur">${d.ur}</span><p class="txt">${d.p}</p><span class="tap">tap to light</span>`;
  b.addEventListener('click', () => {
    if (b.classList.contains('lit')) return;
    b.classList.add('lit');
    b.setAttribute('aria-expanded', 'true');
    const r = b.getBoundingClientRect();
    sparkle(r.left + r.width / 2, r.top + 40);
    if ($$('.lantern.lit').length === DUAS.length){
      setTimeout(() => {
        $('#ayah').classList.add('show');
        $('#ayah').scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block:'center' });
      }, 700);
    }
  });
  lanternsEl.appendChild(b);
});
function sparkle(x, y){
  if (reduce) return;
  for (let i = 0; i < 14; i++){
    const s = document.createElement('span');
    const a = Math.random() * Math.PI * 2, d = 30 + Math.random() * 70;
    Object.assign(s.style, { position:'fixed', left:x + 'px', top:y + 'px', width:'4px', height:'4px', borderRadius:'50%',
      background:'#FFD27A', boxShadow:'0 0 8px #FFD27A', zIndex:170, pointerEvents:'none', transition:'all .9s cubic-bezier(.2,.75,.2,1)' });
    document.body.appendChild(s);
    requestAnimationFrame(() => requestAnimationFrame(() => { s.style.transform = `translate(${Math.cos(a) * d}px,${Math.sin(a) * d}px)`; s.style.opacity = 0; }));
    setTimeout(() => s.remove(), 1000);
  }
}
let ameen = +(store.get('ameen') || 0);
const ameenN = $('#ameenN');
const showAmeen = () => { ameenN.textContent = ameen ? `· ${ameen}` : ''; };
showAmeen();
$('#ameenBtn').addEventListener('click', e => {
  ameen++; store.set('ameen', ameen); showAmeen();
  sparkle(e.clientX, e.clientY);
  if (ameen === 1) toast('Ameen, Ya Rabb ♡');
});

/* ───────────── 5 · memories ───────────── */
const strip = $('#strip'), wall = $('#wall');
MEMORIES.forEach((m, i) => {
  // filmstrip (portrait shots only; mark landscape ones with wide:true to keep them on the wall)
  if (!m.wide){
    const f = document.createElement('figure');
    f.className = 'film';
    f.innerHTML = `<button class="film-frame" aria-label="Open photo ${i + 1}: ${m.cap}">
      <img src="${m.thumb}" data-full="${m.full}" alt="${m.cap}" width="540" height="720" loading="lazy" decoding="async">
      <span class="film-no">${String(i + 1).padStart(2,'0')}</span>
      <figcaption>${m.cap}</figcaption></button>`;
    f.querySelector('button').addEventListener('click', () => { if (!stripDragged) openLightbox(i); });
    strip.appendChild(f);
  }
  // wall
  const t = document.createElement('button');
  t.className = 'tile';
  t.style.setProperty('--rot', ((i * 37) % 7 - 3) * .6 + 'deg');
  t.innerHTML = `<div class="tile-img"><img src="${m.thumb}" alt="${m.cap}" width="540" height="720" loading="lazy" decoding="async" onload="this.classList.add('ok')">${m.video ? '<span class="play-badge"></span>' : ''}</div><span>${m.cap}</span>`;
  t.addEventListener('click', () => openLightbox(i));
  wall.appendChild(t);
});

// sharpen filmstrip: swap to the larger image once near the centre
const films = $$('.film', strip);
function updateStrip(){
  const mid = strip.scrollLeft + strip.clientWidth / 2;
  let best = null, bd = Infinity;
  films.forEach(f => {
    const c = f.offsetLeft + f.offsetWidth / 2, d = Math.abs(c - mid);
    if (d < bd){ bd = d; best = f; }
  });
  films.forEach(f => f.classList.toggle('center', f === best));
  if (best){
    const img = best.querySelector('img');
    if (img.dataset.full && !img.dataset.up){ img.dataset.up = 1; const hi = new Image(); hi.onload = () => { img.src = img.dataset.full; }; hi.src = img.dataset.full; }
  }
  const max = strip.scrollWidth - strip.clientWidth;
  $('#stripBar').style.width = (max > 0 ? 10 + 90 * strip.scrollLeft / max : 100) + '%';
}
let stripRAF;
strip.addEventListener('scroll', () => { cancelAnimationFrame(stripRAF); stripRAF = requestAnimationFrame(updateStrip); }, { passive:true });
addEventListener('resize', () => cur === 4 && updateStrip());
const stepStrip = dir => {
  const w = films[0].offsetWidth + parseFloat(getComputedStyle(strip).gap || 20);
  strip.scrollBy({ left: dir * w, behavior:'smooth' });
};
$('#stripPrev').addEventListener('click', () => stepStrip(-1));
$('#stripNext').addEventListener('click', () => stepStrip(1));
strip.addEventListener('keydown', e => {
  if (e.key === 'ArrowRight'){ e.preventDefault(); stepStrip(1); }
  if (e.key === 'ArrowLeft'){ e.preventDefault(); stepStrip(-1); }
});
// mouse drag-to-scroll on desktop (touch already scrolls natively)
let sd = null, stripDragged = false;
strip.addEventListener('pointerdown', e => {
  if (e.pointerType !== 'mouse') return;
  sd = { x:e.clientX, left:strip.scrollLeft };
  stripDragged = false;
});
addEventListener('pointermove', e => {
  if (!sd) return;
  const dx = e.clientX - sd.x;
  if (Math.abs(dx) > 5){ stripDragged = true; strip.classList.add('drag'); }
  if (stripDragged) strip.scrollLeft = sd.left - dx;
});
addEventListener('pointerup', () => {
  if (!sd) return;
  sd = null;
  if (stripDragged){
    strip.classList.remove('drag');
    // let snapping settle on the nearest card
    const f = $('.film.center', strip);
    f && strip.scrollTo({ left: f.offsetLeft - (strip.clientWidth - f.offsetWidth) / 2, behavior:'smooth' });
    setTimeout(() => { stripDragged = false; }, 50);
  }
});

// scroll reveals
let io;
function observeReveals(){
  io?.disconnect();
  const els = $$('#s-memories .sr, #s-memories .tile');
  els.forEach(el => el.classList.remove('in'));
  if (reduce || !('IntersectionObserver' in window)){ els.forEach(el => el.classList.add('in')); return; }
  io = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (!en.isIntersecting) return;
      const el = en.target;
      // stagger wall tiles that enter together
      const delay = el.classList.contains('tile') ? (($$('.tile', wall).indexOf(el) % 4) * 90) : 0;
      setTimeout(() => el.classList.add('in'), delay);
      io.unobserve(el);
    });
  }, { rootMargin:'0px 0px -8% 0px', threshold:.12 });
  els.forEach(el => io.observe(el));
}

/* lightbox */
const lb = $('#lightbox'), lbImg = $('#lbImg'), lbVid = $('#lbVideo');
let lbI = 0, lbPlay = null, lastFocus = null;
const SLIDE_MS = 4500;
function renderLB(){
  const m = MEMORIES[lbI];
  $('#lbCount').textContent = `${lbI + 1} / ${MEMORIES.length}`;
  $('#lbCap').textContent = m.cap;
  if (m.video){
    lbImg.hidden = true; lbVid.hidden = false;
    lbVid.src = m.video; lbVid.poster = m.full; lbVid.play().catch(() => {});
  } else {
    lbVid.pause(); lbVid.hidden = true; lbImg.hidden = false;
    lbImg.classList.add('swap');
    const pre = new Image();
    pre.onload = pre.onerror = () => { lbImg.src = m.full; lbImg.alt = m.cap; lbImg.classList.remove('swap'); };
    pre.src = m.full;
  }
  // warm neighbours
  [1, -1].forEach(o => { const n = MEMORIES[(lbI + o + MEMORIES.length) % MEMORIES.length]; if (!n.video) new Image().src = n.full; });
  restartTimer();
}
function openLightbox(i, autoplay = false){
  lbI = i; lastFocus = document.activeElement;
  lb.hidden = false;
  document.body.classList.add('lock');
  requestAnimationFrame(() => lb.classList.add('show'));
  renderLB();
  setPlay(autoplay);
  $('#lbClose').focus({ preventScroll:true });
}
function closeLightbox(){
  if (lb.hidden) return;
  setPlay(false);
  lbVid.pause();
  lb.classList.remove('show');
  document.body.classList.remove('lock');
  setTimeout(() => { lb.hidden = true; }, 350);
  lastFocus?.focus?.({ preventScroll:true });
}
const lbStep = d => { lbI = (lbI + d + MEMORIES.length) % MEMORIES.length; renderLB(); };
function setPlay(on){
  clearInterval(lbPlay); lbPlay = null;
  $('#lbPlay').textContent = on ? '❚❚' : '▶';
  $('#lbPlay').setAttribute('aria-label', on ? 'Pause slideshow' : 'Play slideshow');
  if (on) lbPlay = setInterval(() => lbStep(1), SLIDE_MS);
  restartTimer();
}
function restartTimer(){
  const bar = $('#lbTimer');
  bar.style.transition = 'none'; bar.style.width = '0';
  if (!lbPlay) return;
  requestAnimationFrame(() => requestAnimationFrame(() => { bar.style.transition = `width ${SLIDE_MS}ms linear`; bar.style.width = '100%'; }));
  clearInterval(lbPlay); lbPlay = setInterval(() => lbStep(1), SLIDE_MS);
}
$('#lbPrev').addEventListener('click', () => lbStep(-1));
$('#lbNext').addEventListener('click', () => lbStep(1));
$('#lbClose').addEventListener('click', closeLightbox);
$('#lbPlay').addEventListener('click', () => setPlay(!lbPlay));
$('#slideshowBtn').addEventListener('click', () => openLightbox(0, true));
lb.addEventListener('click', e => { if (e.target === lb || e.target.id === 'lbStage') closeLightbox(); });
addEventListener('keydown', e => {
  if (lb.hidden) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowRight') lbStep(1);
  if (e.key === 'ArrowLeft') lbStep(-1);
  if (e.key === ' '){ e.preventDefault(); setPlay(!lbPlay); }
  if (e.key === 'Tab'){ // keep focus inside the dialog
    const f = $$('button:not([hidden])', lb).filter(b => b.offsetParent);
    const i = f.indexOf(document.activeElement);
    if (e.shiftKey && i <= 0){ e.preventDefault(); f[f.length - 1].focus(); }
    else if (!e.shiftKey && i === f.length - 1){ e.preventDefault(); f[0].focus(); }
  }
});
// swipe in lightbox
let sw = null;
$('#lbStage').addEventListener('pointerdown', e => { sw = { x:e.clientX, y:e.clientY }; });
$('#lbStage').addEventListener('pointerup', e => {
  if (!sw) return;
  const dx = e.clientX - sw.x, dy = e.clientY - sw.y;
  sw = null;
  if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)) lbStep(dx < 0 ? 1 : -1);
  else if (dy > 90) closeLightbox();
});

/* ───────────── 7 · finale ───────────── */
const candles = $$('.candle');
const floaters = $('#floaters');
[...MEMORIES].filter(m => !m.wide).forEach((m, i) => {
  const d = document.createElement('div');
  d.className = 'fp';
  d.style.cssText = `left:${(i * 71) % 92}%;--s:${70 + (i * 13) % 50}px;--dur:${14 + (i % 5) * 2}s;--dl:${i * 1.3}s;--r1:${(i % 2 ? -1 : 1) * 8}deg;--r2:${(i % 2 ? 1 : -1) * 10}deg`;
  d.innerHTML = `<img src="${m.thumb}" alt="" loading="lazy">`;
  floaters.appendChild(d);
});
function resetFinale(){
  candles.forEach(c => c.classList.remove('out'));
  $('#s-finale').classList.remove('celebrate');
  $('#finaleMsg').classList.remove('show');
  $('#finaleTitle').innerHTML = 'Close your eyes, <em>make a wish</em>';
  $('#finaleSub').textContent = 'Then tap each candle to blow it out.';
}
candles.forEach(c => c.addEventListener('click', () => {
  if (c.classList.contains('out')) return;
  c.classList.add('out');
  const left = candles.filter(x => !x.classList.contains('out')).length;
  $('#finaleSub').textContent = left ? `${left} more…` : 'Your wish is on its way ✦';
  if (!left) setTimeout(celebrate, 600);
}));
function celebrate(){
  $('#s-finale').classList.add('celebrate');
  $('#finaleTitle').innerHTML = 'Wish made. <em>Now celebrate.</em>';
  $('#finaleMsg').classList.add('show');
  confetti(220);
  setTimeout(() => confetti(120), 900);
  setTimeout(() => $('#finaleMsg').scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block:'center' }), 500);
}
$('#moreConfetti').addEventListener('click', () => confetti(180));

/* ───────────── canvases ───────────── */
// confetti
const cf = $('#confetti'), cfx = cf.getContext('2d');
let parts = [], cfRAF = 0;
const DPR = Math.min(devicePixelRatio || 1, 2);
function sizeCanvas(c){ c.width = innerWidth * DPR; c.height = innerHeight * DPR; }
function confetti(n){
  if (reduce) return;
  sizeCanvas(cf);
  const cols = ['#542D3A','#D7A6A1','#B8925A','#E4CB9B','#FAF7F2','#8E4F55'];
  for (let i = 0; i < n; i++){
    const fromLeft = i % 2;
    parts.push({
      x: fromLeft ? -10 : innerWidth + 10, y: innerHeight * (.55 + Math.random() * .3),
      vx: (fromLeft ? 1 : -1) * (4 + Math.random() * 9), vy: -(9 + Math.random() * 11),
      w: 6 + Math.random() * 6, h: 8 + Math.random() * 10, r: Math.random() * 6, vr: (Math.random() - .5) * .3,
      c: cols[i % cols.length], heart: Math.random() < .18, life: 0,
    });
  }
  if (!cfRAF) cfRAF = requestAnimationFrame(tickConfetti);
}
function tickConfetti(){
  cfx.setTransform(DPR, 0, 0, DPR, 0, 0);
  cfx.clearRect(0, 0, innerWidth, innerHeight);
  parts = parts.filter(p => p.y < innerHeight + 40 && p.life < 600);
  for (const p of parts){
    p.life++; p.vy += .28; p.vx *= .985; p.vy *= .99; p.x += p.vx; p.y += p.vy; p.r += p.vr;
    cfx.save(); cfx.translate(p.x, p.y); cfx.rotate(p.r); cfx.fillStyle = p.c;
    if (p.heart){ cfx.font = `${p.h + 6}px serif`; cfx.fillText('♥', -p.w / 2, p.h / 2); }
    else { cfx.scale(1, Math.cos(p.life * .15)); cfx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h); }
    cfx.restore();
  }
  cfRAF = parts.length ? requestAnimationFrame(tickConfetti) : 0;
  if (!cfRAF) cfx.clearRect(0, 0, innerWidth, innerHeight);
}

// drifting petals
const pc = $('#petals'), px = pc.getContext('2d');
let petals = [];
function initPetals(){
  sizeCanvas(pc);
  const n = innerWidth < 640 ? 10 : 18;
  petals = Array.from({ length:n }, () => newPetal(true));
}
function newPetal(any){
  return { x: Math.random() * innerWidth, y: any ? Math.random() * innerHeight : -20, s: 5 + Math.random() * 7,
    vy: .25 + Math.random() * .45, vx: -.2 + Math.random() * .4, a: Math.random() * 6, va: (Math.random() - .5) * .02,
    sway: Math.random() * 100, o: .25 + Math.random() * .35 };
}
function tickPetals(t){
  px.setTransform(DPR, 0, 0, DPR, 0, 0);
  px.clearRect(0, 0, innerWidth, innerHeight);
  if (lb.hidden){
    const night = document.body.classList.contains('night');
    for (const p of petals){
      p.y += p.vy; p.x += p.vx + Math.sin((t / 1600) + p.sway) * .3; p.a += p.va;
      if (p.y > innerHeight + 20) Object.assign(p, newPetal(false));
      px.save(); px.translate(p.x, p.y); px.rotate(p.a); px.globalAlpha = p.o;
      px.fillStyle = night ? '#E4CB9B' : '#D7A6A1';
      px.beginPath(); px.ellipse(0, 0, p.s, p.s * .55, 0, 0, Math.PI * 2); px.fill();
      px.restore();
    }
  }
  requestAnimationFrame(tickPetals);
}
if (!reduce){ initPetals(); requestAnimationFrame(tickPetals); }
addEventListener('resize', () => { if (!reduce) initPetals(); });

/* ───────────── music (optional) ───────────── */
(function music(){
  const a = new Audio();
  a.loop = true; a.preload = 'none';
  a.src = CONFIG.music;
  const btn = $('#musicBtn');
  // only reveal the button when the file actually exists
  fetch(CONFIG.music, { method:'HEAD' }).then(r => {
    if (!r.ok) return;
    btn.hidden = false;
    btn.addEventListener('click', () => {
      if (a.paused){ a.play().then(() => { btn.classList.add('on'); btn.setAttribute('aria-pressed','true'); }).catch(() => {}); }
      else { a.pause(); btn.classList.remove('on'); btn.setAttribute('aria-pressed','false'); }
    });
    // start softly with the first "open your surprise" tap
    $('[data-next]', $('#s-surprise')).addEventListener('click', () => {
      if (a.paused) a.play().then(() => { btn.classList.add('on'); btn.setAttribute('aria-pressed','true'); }).catch(() => {});
    }, { once:true });
  }).catch(() => {});
})();

/* ───────────── boot ───────────── */
const ids = scenes.map(s => s.id.slice(2));
const start = Math.max(0, ids.indexOf(location.hash.slice(1)));
if (reduce) show(start);
else {
  $('#curtainNum').textContent = start ? `Chapter ${NUMS[start]}` : 'A little world';
  $('#curtainTitle').textContent = start ? scenes[start].dataset.title : 'For Tehreem';
  curtain.className = 'curtain boot';
  setTimeout(() => { show(start); curtain.className = 'curtain out'; }, 1300);
}
})();
