/* ---------------- hero waveform decoration ---------------- */
(function () {
  const wave = document.getElementById('heroWaveform');
  if (!wave) return;
  const BARS = 90;
  let html = '';
  for (let i = 0; i < BARS; i++) {
    const h = 6 + Math.round(Math.abs(Math.sin(i * 0.4)) * 20 + Math.random() * 8);
    html += `<span style="height:${h}px"></span>`;
  }
  wave.innerHTML = html;
})();