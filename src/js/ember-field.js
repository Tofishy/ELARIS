/* ---------------- three.js ember field ---------------- */
(function () {
  const canvas = document.getElementById('ember-canvas');
  const heroPanel = document.getElementById('view-hero');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  function size() {
    renderer.setSize(heroPanel.clientWidth, heroPanel.clientHeight);
  }
  size();

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, heroPanel.clientWidth / heroPanel.clientHeight, 0.1, 100);
  camera.position.z = 12;

  const COUNT = 700;
  const positions = new Float32Array(COUNT * 3);
  const speeds = new Float32Array(COUNT);

  for (let i = 0; i < COUNT; i++) {
    positions[i * 3]     = (Math.random() - 0.5) * 26;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 16;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 18;
    speeds[i]            = 0.004 + Math.random() * 0.012;
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

  const spriteCanvas = document.createElement('canvas');
  spriteCanvas.width = spriteCanvas.height = 64;
  const ctx = spriteCanvas.getContext('2d');

  const grd = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  grd.addColorStop(0, 'rgba(255,220,190,1)');
  grd.addColorStop(0.4, 'rgba(242,145,79,0.8)');
  grd.addColorStop(1, 'rgba(232,67,47,0)');

  ctx.fillStyle = grd;
  ctx.fillRect(0, 0, 64, 64);
  const spriteTex = new THREE.CanvasTexture(spriteCanvas);

  const mat = new THREE.PointsMaterial({
    size: 0.22,
    map: spriteTex,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    opacity: 0.85
  });

  const points = new THREE.Points(geo, mat);
  scene.add(points);

  let mouseX = 0, mouseY = 0;
  window.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth - 0.5);
    mouseY = (e.clientY / window.innerHeight - 0.5);
  });

  function animate() {
    if (!reduceMotion) {
      const posAttr = geo.attributes.position;
      for (let i = 0; i < COUNT; i++) {
        let y = posAttr.getY(i) + speeds[i];
        if (y > 8) { y = -8; }
        posAttr.setY(i, y);
      }
      posAttr.needsUpdate = true;
      points.rotation.y += 0.0006;
    }

    camera.position.x += (mouseX * 1.4 - camera.position.x) * 0.03;
    camera.position.y += (-mouseY * 1.0 - camera.position.y) * 0.03;
    camera.lookAt(0, 0, 0);

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  }
  animate();

  window.addEventListener('resize', () => {
    size();
    camera.aspect = heroPanel.clientWidth / heroPanel.clientHeight;
    camera.updateProjectionMatrix();
  });
})();