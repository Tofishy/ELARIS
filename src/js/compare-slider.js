/* ---------------- raw / graded compare slider ---------------- */
const compare = document.getElementById('compare');
const rawLayer = document.getElementById('rawLayer');
const handle = document.getElementById('compareHandle');
let dragging = false;

function setSplit(clientX) {
  const rect = compare.getBoundingClientRect();
  let x = ((clientX - rect.left) / rect.width) * 100;
  x = Math.max(2, Math.min(98, x));
  rawLayer.style.clipPath = `inset(0 ${100 - x}% 0 0)`;
  handle.style.left = x + '%';
}

compare.addEventListener('pointerdown', (e) => { dragging = true; setSplit(e.clientX); });
window.addEventListener('pointermove', (e) => { if (dragging) setSplit(e.clientX); });
window.addEventListener('pointerup', () => dragging = false);
compare.addEventListener('touchstart', (e) => setSplit(e.touches[0].clientX));
compare.addEventListener('touchmove', (e) => setSplit(e.touches[0].clientX));