function renderGrid(filter) {
  grid.innerHTML = samples.map((s, i) => `
    <div class="card ${filter !== 'all' && filter !== s.cat ? 'hidden-card' : ''} ${s.video || s.youtube || s.vimeo ? 'has-video' : ''}" data-cat="${s.cat}" data-index="${i}" tabindex="0" role="button" aria-label="Play ${s.title}">
            <div class="card-bg">
        ${svgFor(s)}
        ${s.thumb ? `<img class="card-media" src="${s.thumb}" alt="${s.title} thumbnail" loading="lazy" onerror="this.remove()">` : ''}
      </div>
      <span class="card-live badge mono">● LIVE CUT</span>
      <div class="card-overlay">
        <div class="card-top">
          <span class="card-tag mono">${s.cat.toUpperCase()}</span>
          <span class="card-dur mono">${s.dur}</span>
        </div>
        <div class="play-btn">▶</div>
        <div>
          <div class="card-title">${s.title}</div>
          <div class="card-sub">${s.sub}</div>
        </div>
      </div>
    </div>`).join('');

  const visible = filter === 'all' ? samples.length : samples.filter(s => s.cat === filter).length;
  if (reelCount) {
    reelCount.textContent = String(visible).padStart(2, '0') + ' CLIP' + (visible === 1 ? '' : 'S') + ' LOADED';
  }

  grid.querySelectorAll('.card').forEach(card => {
    card.addEventListener('click', () => openVideoModal(samples[+card.dataset.index]));
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openVideoModal(samples[+card.dataset.index]); }
    });
  });
}

renderGrid('all');

document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderGrid(btn.dataset.filter);
  });
});