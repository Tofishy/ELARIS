/* ---------------- portfolio data + render ----------------
   HOW TO ADD YOUR OWN VIDEOS
   ---------------------------------------------------------
   Each sample below can be wired to a real, playable video in one of two ways:

   1) A self-hosted video file — put the .mp4 in a folder next to index.html
      (e.g. /videos/every-minute-matters.mp4) and set:
        video: 'videos/every-minute-matters.mp4'

   2) An unlisted/public YouTube or Vimeo upload — set:
        youtube: 'dQw4w9WgXcQ'   // the part after v= in the YouTube URL
        // — or —
        vimeo: '76979871'        // the numeric Vimeo ID

   Leave both fields out (as the current placeholders do) and the card will
   just show a "video not connected yet" message when clicked — nothing breaks.

   ADDING THUMBNAILS
   ---------------------------------------------------------
   Each sample also takes an optional thumb field for a real cover image:
        thumb: 'images/thumbs/every-minute-matters.jpg'
   The gradient/icon graphic underneath is always rendered first, so if a
   thumb path is missing or the file fails to load, the card just falls back
   to the placeholder graphic automatically — nothing breaks.
------------------------------------------------------------- */
const samples = [
  { cat: 'events', title: 'Solea Lumière', sub: 'commercial', dur: '00:16', grad: ['#2a2320', '#0a0706'], accent: '#f2914f', icon: 'M32 8 L40 24 L32 40 L24 24 Z', thumb: 'thumb/SoleaT.png', video: 'Videos/Solea.mp4'},
  { cat: 'healthcare', title: 'Co. Lab Health', sub: 'Brand film — healthcare', dur: '01:07', grad: ['#123832', '#0a0706'], accent: '#5fd6c4', icon: 'M12 24 h8 l4 -12 l6 24 l4 -12 h10', thumb: 'thumb/CollabT.png', video: 'Videos/collab.mp4' },
  { cat: 'social', title: 'Social Reels', sub: 'Educational Content', dur: '00:20', grad: ['#101018', '#0a0706'], accent: '#8f8ff2', icon: 'M24 8 L30 20 L24 20 L28 40 L18 22 L24 22 Z', thumb: 'thumb/reel2T.png', video: 'Videos/reel2.mp4'},
  { cat: 'social', title: 'Social Reels', sub: 'Funny Reels', dur: '00:21', grad: ['#0e1420', '#0a0706'], accent: '#6fa8f2', icon: 'M10 30 a6 6 0 1 0 0.01 0 M30 16 a4 4 0 1 0 0.01 0 M36 34 a5 5 0 1 0 0.01 0', thumb: 'thumb/reel3T.png', video: 'Videos/reel3.mp4'},
  { cat: 'social', title: 'Social Reels', sub: 'Educational Content', dur: '00:36', grad: ['#171313', '#0a0706'], accent: '#f2914f', icon: 'M24 8 a10 10 0 1 0 0.01 0 M14 44 a10 10 0 0 1 20 0', thumb: 'thumb/newreel2T.png', video: 'Videos/newreel.mp4'},
  { cat: 'social', title: 'Curb', sub: 'Commercial', dur: '00:33', grad: ['#2a2320', '#0a0706'], accent: '#f2914f', icon: 'M32 8 L40 24 L32 40 L24 24 Z', thumb: 'thumb/curb2T.png', video: 'Videos/curb2.mp4'},

];

const grid = document.getElementById('workGrid');
const reelCount = document.getElementById('reelCount');

function svgFor(s) {
  const gid = 'g' + s.title.replace(/[^a-zA-Z0-9]/g, '');
  return `<svg viewBox="0 0 48 48" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%">
    <defs>
      <linearGradient id="${gid}" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${s.grad[0]}"/>
        <stop offset="100%" stop-color="${s.grad[1]}"/>
      </linearGradient>
    </defs>
    <rect width="48" height="48" fill="url(#${gid})"/>
    <path d="${s.icon}" fill="none" stroke="${s.accent}" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" opacity="0.85"/>
  </svg>`;
}