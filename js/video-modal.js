/* ---------------- video modal (lightbox player) ---------------- */
const videoModal = document.getElementById('videoModal');
const videoModalBackdrop = document.getElementById('videoModalBackdrop');
const videoModalClose = document.getElementById('videoModalClose');
const videoModalMedia = document.getElementById('videoModalMedia');
const videoModalTitle = document.getElementById('videoModalTitle');
const videoModalSub = document.getElementById('videoModalSub');
const videoModalTag = document.getElementById('videoModalTag');

function openVideoModal(sample) {
  videoModalTitle.textContent = sample.title;
  videoModalSub.textContent = sample.sub + ' · ' + sample.dur;
  videoModalTag.textContent = sample.cat.toUpperCase();

  if (sample.video) {
    videoModalMedia.innerHTML = `<video src="${sample.video}" controls autoplay playsinline></video>`;
  } else if (sample.youtube) {
    videoModalMedia.innerHTML = `<iframe src="https://www.youtube.com/embed/${sample.youtube}?autoplay=1&rel=0" title="${sample.title}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
  } else if (sample.vimeo) {
    videoModalMedia.innerHTML = `<iframe src="https://player.vimeo.com/video/${sample.vimeo}?autoplay=1" title="${sample.title}" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>`;
  } else {
    videoModalMedia.innerHTML = `
      <div class="video-modal-empty">
        <div class="play-btn">▶</div>
        <p>This sample isn't connected to a video yet — add a file path or a YouTube/Vimeo ID for "${sample.title}" in script.js to make it playable.</p>
      </div>`;
  }

  videoModal.classList.add('open');
  videoModal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeVideoModal() {
  videoModal.classList.remove('open');
  videoModal.setAttribute('aria-hidden', 'true');
  videoModalMedia.innerHTML = '';
  document.body.style.overflow = '';
}

videoModalBackdrop.addEventListener('click', closeVideoModal);
videoModalClose.addEventListener('click', closeVideoModal);
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && videoModal.classList.contains('open')) closeVideoModal();
});