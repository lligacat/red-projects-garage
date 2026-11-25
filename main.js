// Capçalera sòlida en fer scroll
const nav = document.getElementById('nav');
const onScroll = () => nav.classList.toggle('solid', window.scrollY > 40);
onScroll();
addEventListener('scroll', onScroll, { passive: true });

// Aparició suau en entrar a pantalla
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// Vídeos: només es reprodueixen quan es veuen
const vids = document.querySelectorAll('video');
if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
  vids.forEach(v => { v.removeAttribute('autoplay'); v.pause(); });
} else {
  const vio = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) e.target.play().catch(() => {}); else e.target.pause();
  }), { threshold: 0.05 });
  vids.forEach(v => vio.observe(v));
}

// Formulari -> WhatsApp
document.getElementById('form').addEventListener('submit', (ev) => {
  ev.preventDefault();
  const f = ev.target, note = document.getElementById('note');
  const nom = f.nom.value.trim(), msg = f.msg.value.trim();
  if (!nom || !msg) { note.textContent = 'Omple el nom i el missatge.'; return; }
  note.textContent = 'Obrint WhatsApp…';
  window.open(`https://wa.me/34621144719?text=${encodeURIComponent(`Hola! Sóc ${nom}. ${msg}`)}`, '_blank', 'noopener');
});
