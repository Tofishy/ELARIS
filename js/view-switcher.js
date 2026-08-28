/* ---------------- view switching (no page scroll) ---------------- */
const viewMeta = {
  hero:    { pct: 0,   tc: '00:00:00:00' },
  about:   { pct: 33,  tc: '00:00:20:00' },
  work:    { pct: 66,  tc: '00:00:45:00' },
  contact: { pct: 100, tc: '00:01:10:00' }
};

const scrubFill = document.getElementById('scrubFill');
const timecode = document.getElementById('timecode');
const navLinks = document.getElementById('navLinks');

function showView(id) {
  document.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));
  const target = document.getElementById('view-' + id);
  target.classList.add('active');
  target.scrollTop = 0;

  document.querySelectorAll('[data-view]').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.view === id);
  });

  scrubFill.style.width = viewMeta[id].pct + '%';
  timecode.textContent = viewMeta[id].tc;

  target.querySelectorAll('.reveal').forEach((el, i) => {
    el.classList.remove('in');
    setTimeout(() => el.classList.add('in'), 60 + i * 70);
  });

  navLinks.classList.remove('open');
}

document.querySelectorAll('[data-view]').forEach(btn => {
  btn.addEventListener('click', () => showView(btn.dataset.view));
});

document.getElementById('logoBtn').addEventListener('click', () => showView('hero'));
document.getElementById('menuToggle').addEventListener('click', () => navLinks.classList.toggle('open'));

scrubFill.style.width = '0%';
timecode.textContent = viewMeta.hero.tc;