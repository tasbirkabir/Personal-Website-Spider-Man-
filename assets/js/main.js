/* ============================================================
   GLOBALS & SETUP
   ============================================================ */
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
gsap.registerPlugin(ScrollTrigger);

/* ============================================================
   UTILITY FUNCTIONS
   ============================================================ */
// Helper to retrieve the world-space position of the hero's firing hand
function handWorld() {
  return hero.localToWorld(handLocal.clone());
}

// Generate the 3D Catmull-Rom path for the main web line
function buildWebCurve() {
  const h = handWorld();
  const pts = [
    h,
    h.clone().add(new THREE.Vector3(-3.2, 2.6, 1.2)),
    new THREE.Vector3(3.5, 8, -1),
    new THREE.Vector3(-1, 5, 2.5),
    new THREE.Vector3(-6, 9, -2),
    new THREE.Vector3(-11, 5.5, 3),
    new THREE.Vector3(-16, 10, -3),
    new THREE.Vector3(-21, 6.5, 2),
    new THREE.Vector3(-27, 10.5, -4),
    new THREE.Vector3(-33, 7.5, 1)
  ];
  return new THREE.CatmullRomCurve3(pts);
}

// Scrambles the text of a tag on entrance
const CHARS = '!<>-_\\/[]{}—=+*^?#01';
function scrambleText(el) {
  const original = el.dataset.original || el.textContent;
  el.dataset.original = original;
  let frame = 0;
  const total = 40;
  const timer = setInterval(() => {
    frame++;
    el.textContent = original.split('').map((ch, i) => {
      if (ch === ' ') return ' ';
      if (i < (frame / total) * original.length) return ch;
      return CHARS[Math.floor(Math.random() * CHARS.length)];
    }).join('');
    if (frame >= total) {
      el.textContent = original;
      clearInterval(timer);
    }
  }, 30);
}

// Triggers comic starburst word popup
const WORDS = ['THWACK!', 'BAM!', 'ZAP!', 'GOTCHA!', 'SNAP!'];
function comicBurst(x, y) {
  const el = document.createElement('div');
  el.className = 'burst';
  el.style.left = x + 'px';
  el.style.top = y + 'px';
  const word = WORDS[Math.floor(Math.random() * WORDS.length)];
  const col = Math.random() < .5 ? '#E0202F' : '#2342D6';
  el.innerHTML = `<svg viewBox="0 0 100 100"><polygon points="50,2 58,30 88,12 70,38 98,46 70,56 86,84 56,68 50,98 42,68 14,86 30,56 2,48 30,40 12,12 42,30" fill="${col}" stroke="#15151C" stroke-width="3"/></svg><b>${word}</b>`;
  document.body.appendChild(el);
  gsap.fromTo(el, { scale: 0, rotate: -20 }, { scale: 1, rotate: 6, duration: .35, ease: 'back.out(3)' });
  gsap.to(el, { scale: 0, opacity: 0, duration: .3, delay: .55, ease: 'back.in(2)', onComplete: () => el.remove() });
}

// Triggers 2D web splat effect on clicking
function webSplat(x, y) {
  const el = document.createElement('div');
  el.className = 'websplat';
  el.style.left = x + 'px';
  el.style.top = y + 'px';
  let spokes = '', rings = '';
  for (let i = 0; i < 10; i++) {
    const a = i / 10 * Math.PI * 2;
    spokes += `<line x1="60" y1="60" x2="${60 + Math.cos(a) * 56}" y2="${60 + Math.sin(a) * 56}"/>`;
  }
  for (let r = 14; r <= 52; r += 13) {
    let d = '';
    for (let i = 0; i <= 10; i++) {
      const a = i / 10 * Math.PI * 2;
      d += (i === 0 ? 'M' : 'L') + (60 + Math.cos(a) * r) + ',' + (60 + Math.sin(a) * r);
    }
    rings += `<path d="${d}Z" fill="none"/>`;
  }
  el.innerHTML = `<svg width="120" height="120" viewBox="0 0 120 120" stroke="#15151C" stroke-width="1.6" opacity=".75">${spokes}${rings}</svg>`;
  document.body.appendChild(el);
  gsap.fromTo(el, { scale: .2, opacity: 1, rotate: Math.random() * 40 - 20 }, { scale: 1, duration: .3, ease: 'back.out(2)' });
  gsap.to(el, { opacity: 0, scale: 1.15, duration: .6, delay: .5, onComplete: () => el.remove() });
}

/* ============================================================
   LOADER
   ============================================================ */
const statuses = ['CLIMBING THE TOWER…', 'TAKING POSITION…', 'LOADING WEB FLUID…', 'INKING THE SKYLINE…', 'READY TO FIRE!'];
let progress = 0, si = 0;
const loadFill = document.getElementById('loadFill');
const loadStatus = document.getElementById('loadStatus');

const loadInt = setInterval(() => {
  progress = Math.min(100, progress + Math.random() * 14);
  loadFill.style.width = progress + '%';
  if (progress / 100 * statuses.length > si && si < statuses.length - 1) {
    si++;
    loadStatus.textContent = statuses[si];
  }
  if (progress >= 100) {
    clearInterval(loadInt);
    loadStatus.textContent = statuses[statuses.length - 1];
    setTimeout(launch, 400);
  }
}, 110);

function launch() {
  document.getElementById('loader').classList.add('done');
  tick();
  if (reduceMotion) {
    renderer.render(scene, camera);
    return;
  }
  const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });
  tl.to('.hero h1 .row span', { y: 0, rotateX: 0, duration: 1.4, stagger: .15, ease: 'back.out(1.4)' }, .2)
    .to('.hero-tag', { opacity: 1, duration: 1 }, .5)
    .to('.hero-sub', { opacity: 1, duration: 1 }, 1)
    .to('.hero-actions', { opacity: 1, duration: 1 }, 1.2)
    .to('.hero-meta', { opacity: 1, duration: 1 }, 1.4)
    .from(camera.position, { z: 24, y: 8, duration: 2.6, ease: 'power3.out' }, 0);
  scrambleText(document.getElementById('scrambleTag'));
}

/* ============================================================
   THREE.JS SCENE
   ============================================================ */
const canvas = document.getElementById('gl');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
renderer.setSize(innerWidth, innerHeight);
renderer.setClearColor(0x000000, 0);

const scene = new THREE.Scene();
scene.fog = new THREE.Fog(0xFBFAF5, 26, 60);
const camera = new THREE.PerspectiveCamera(55, innerWidth / innerHeight, .1, 200);
camera.position.set(-2, 3.5, 14);

const INK = 0x15151C, RED = 0xE0202F, BLUE = 0x2342D6, YELLOW = 0xE8A800, PAPER = 0xF2EFE6;

/* ---------- CITY SKYLINE ---------- */
function windowTexture(w, h) {
  const c = document.createElement('canvas');
  c.width = 64;
  c.height = 128;
  const x = c.getContext('2d');
  x.fillStyle = '#EFEBDE';
  x.fillRect(0, 0, 64, 128);
  x.fillStyle = 'rgba(21,21,28,.8)';
  for (let r = 8; r < 124; r += 14) {
    for (let col = 8; col < 60; col += 14) {
      if (Math.random() < .72) {
        x.fillRect(col, r, 7, 8);
      } else {
        x.fillStyle = 'rgba(255,196,0,.9)';
        x.fillRect(col, r, 7, 8);
        x.fillStyle = 'rgba(21,21,28,.8)';
      }
    }
  }
  const t = new THREE.CanvasTexture(c);
  t.repeat.set(Math.max(1, Math.round(w / 1.4)), Math.max(1, Math.round(h / 2.4)));
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  return t;
}

const city = new THREE.Group();
const buildingDefs = [
  [-13, 3, 7, -6], [-9.5, 2.6, 10, -5], [-6, 3.4, 14, -4.5], [-2.4, 2.4, 8, -6.5],
  [0.8, 3, 11, -5.5], [4.4, 2.8, 9, -6], [8.2, 3.6, 12.5, -2.6], [12.6, 3, 8, -6.2], [16.2, 3.4, 10.5, -5.4],
  [-17, 3, 9, -7], [19.8, 2.8, 7.5, -7]
];
const HERO_BIDX = 6, HERO_BH = 12.5;
let heroBuilding = null;

buildingDefs.forEach((d, i) => {
  const [bx, bw, bh, bz] = d;
  const g = new THREE.BoxGeometry(bw, bh, bw);
  const m = new THREE.Mesh(g, new THREE.MeshBasicMaterial({ map: windowTexture(bw, bh) }));
  m.position.set(bx, bh / 2 - 4.5, bz);
  city.add(m);
  const edges = new THREE.LineSegments(new THREE.EdgesGeometry(g), new THREE.LineBasicMaterial({ color: INK, transparent: true, opacity: .9 }));
  edges.position.copy(m.position);
  city.add(edges);
  // rooftop ledge
  const ledge = new THREE.Mesh(new THREE.BoxGeometry(bw + .3, .22, bw + .3), new THREE.MeshBasicMaterial({ color: INK }));
  ledge.position.set(bx, bh - 4.5 + .11, bz);
  city.add(ledge);
  if (i === HERO_BIDX) {
    heroBuilding = m;
  }
});
scene.add(city);

/* Distant skyline */
const farRow = new THREE.Group();
for (let i = 0; i < 16; i++) {
  const w = 2 + Math.random() * 2.5, h = 4 + Math.random() * 8;
  const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ color: 0xD9D4C4, transparent: true, opacity: .55 }));
  m.position.set(-22 + i * 3, h / 2 - 4.5, -16);
  farRow.add(m);
}
scene.add(farRow);

/* Clouds */
const clouds = new THREE.Group();
for (let i = 0; i < 4; i++) {
  const cg = new THREE.Group();
  for (let b = 0; b < 4; b++) {
    const s = new THREE.Mesh(new THREE.SphereGeometry(.7 + Math.random() * .5, 10, 10), new THREE.MeshBasicMaterial({ color: 0xFFFFFF }));
    s.position.set(b * .9 - 1.3, Math.random() * .3, 0);
    cg.add(s);
    const o = new THREE.LineSegments(new THREE.EdgesGeometry(s.geometry), new THREE.LineBasicMaterial({ color: INK, transparent: true, opacity: .12 }));
    o.position.copy(s.position);
    cg.add(o);
  }
  cg.position.set(-14 + i * 9, 6.5 + Math.random() * 3, -10 - Math.random() * 4);
  cg.userData = { sp: .08 + Math.random() * .12 };
  clouds.add(cg);
}
scene.add(clouds);

/* ---------- HERO SILHOUETTE ---------- */
const hero = new THREE.Group();
const inkMat = new THREE.MeshBasicMaterial({ color: INK });

function part(geom, x, y, z, rx = 0, ry = 0, rz = 0, sx = 1, sy = 1, sz = 1) {
  const m = new THREE.Mesh(geom, inkMat);
  m.position.set(x, y, z);
  m.rotation.set(rx, ry, rz);
  m.scale.set(sx, sy, sz);
  hero.add(m);
  return m;
}

// Crouched pose primitives
part(new THREE.SphereGeometry(.34, 14, 14), .12, 1.62, 0, 0, 0, 0, 1, .92, 1);            // head
part(new THREE.CylinderGeometry(.26, .34, .95, 10), -.08, .95, 0, 0, 0, .5);             // torso
part(new THREE.CylinderGeometry(.11, .13, .85, 8), -.42, .42, .16, 0, 0, 1.25);          // back thigh
part(new THREE.CylinderGeometry(.09, .11, .8, 8), -.95, .18, .16, 0, 0, -.9);            // back shin
part(new THREE.CylinderGeometry(.11, .13, .8, 8), -.1, .36, -.18, 0, 0, .35);            // front thigh
part(new THREE.CylinderGeometry(.09, .11, .75, 8), .12, .0, -.18, 0, 0, -.15);           // front shin
part(new THREE.BoxGeometry(.34, .12, .16), .16, -.36, -.18);                          // front foot
part(new THREE.BoxGeometry(.34, .12, .16), -1.2, -.1, .16);                           // back foot
part(new THREE.CylinderGeometry(.09, .1, .8, 8), .58, 1.45, .05, 0, 0, -1.35);           // firing arm
part(new THREE.SphereGeometry(.12, 10, 10), .98, 1.62, .05);                          // firing hand
part(new THREE.CylinderGeometry(.08, .09, .6, 8), -.28, 1.15, -.22, 0, 0, .9);           // support arm
part(new THREE.SphereGeometry(.1, 10, 10), -.52, .88, -.22);                          // support hand

hero.scale.setScalar(2.2);
const perch = new THREE.Vector3(heroBuilding.position.x - .4, heroBuilding.position.y + (HERO_BH / 2) + .25, heroBuilding.position.z + 1.2);
hero.position.copy(perch);
const HERO_BASE_ROT = 2.75;
hero.rotation.y = HERO_BASE_ROT;
scene.add(hero);

const handLocal = new THREE.Vector3(.98, 1.62, .05);

/* ---------- GIANT COMIC MOON ---------- */
const moon = new THREE.Group();
const moonDisc = new THREE.Mesh(new THREE.CircleGeometry(4.6, 48), new THREE.MeshBasicMaterial({ color: 0xFFE9A8 }));
const moonRing = new THREE.Mesh(new THREE.RingGeometry(4.6, 4.78, 48), new THREE.MeshBasicMaterial({ color: INK }));
const moonRing2 = new THREE.Mesh(new THREE.RingGeometry(5.1, 5.16, 48), new THREE.MeshBasicMaterial({ color: INK, transparent: true, opacity: .35 }));
moon.add(moonDisc, moonRing, moonRing2);

// craters
for (let i = 0; i < 7; i++) {
  const cr = new THREE.Mesh(new THREE.CircleGeometry(.22 + Math.random() * .4, 20), new THREE.MeshBasicMaterial({ color: 0xF3D67C }));
  const a = Math.random() * Math.PI * 2, r = Math.random() * 3.4;
  cr.position.set(Math.cos(a) * r, Math.sin(a) * r, .01);
  moon.add(cr);
}
moon.position.set(perch.x + .6, perch.y + 2.6, perch.z - 6.5);
scene.add(moon);

/* ---------- THE 3D WEB ---------- */
const WEB_SEGS = 900, RADIAL = 6;
let webCurve = buildWebCurve();
const webGeo = new THREE.TubeGeometry(webCurve, WEB_SEGS, .045, RADIAL, false);
const web = new THREE.Mesh(webGeo, new THREE.MeshBasicMaterial({ color: INK }));
web.geometry.setDrawRange(0, 0);
scene.add(web);

const web2 = new THREE.Mesh(new THREE.TubeGeometry(webCurve, WEB_SEGS, .016, RADIAL, false), new THREE.MeshBasicMaterial({ color: RED }));
web2.position.y = .09;
web2.geometry.setDrawRange(0, 0);
scene.add(web2);

// tip + tip ring
const tip = new THREE.Mesh(new THREE.SphereGeometry(.14, 10, 10), new THREE.MeshBasicMaterial({ color: RED }));
const tipRing = new THREE.Mesh(new THREE.TorusGeometry(.3, .02, 6, 24), new THREE.MeshBasicMaterial({ color: INK, transparent: true, opacity: .7 }));
scene.add(tip, tipRing);

// radial web checkpoints
const checkpoints = [];
[.22, .45, .68, .9].forEach((at, i) => {
  const grp = new THREE.Group();
  const SP = 10;
  for (let s = 0; s < SP; s++) {
    const a = s / SP * Math.PI * 2;
    const g = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, 0, 0), new THREE.Vector3(Math.cos(a) * .9, Math.sin(a) * .9, 0)]);
    grp.add(new THREE.Line(g, new THREE.LineBasicMaterial({ color: INK, transparent: true, opacity: .8 })));
  }
  for (let r = .25; r <= .85; r += .2) {
    const ringPts = [];
    for (let s = 0; s <= SP; s++) {
      const a = s / SP * Math.PI * 2;
      ringPts.push(new THREE.Vector3(Math.cos(a) * r, Math.sin(a) * r, 0));
    }
    grp.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(ringPts), new THREE.LineBasicMaterial({ color: INK, transparent: true, opacity: .6 })));
  }
  const p = webCurve.getPointAt(at);
  grp.position.copy(p);
  grp.scale.setScalar(0);
  grp.userData = { at, shown: false };
  scene.add(grp);
  checkpoints.push(grp);
});

// Updates the Web HUD indicator
function setHud(val) {
  const el = document.getElementById('hudWeb');
  if (el) {
    el.textContent = String(Math.round(val * 100)).padStart(3, '0') + '%';
  }
}

/* ---------- RENDER LOOP ---------- */
const clock = new THREE.Clock();
let webProgress = 0, webTarget = 0;
const camBase = { x: 0, y: 5, z: 14 };
const mouse = { x: 0, y: 0 };
const shots = [];

function tick() {
  const dt = clock.getDelta(), t = clock.getElapsedTime();

  // hero idle breathing
  hero.position.y = perch.y + Math.sin(t * 1.6) * .04;
  hero.rotation.y = HERO_BASE_ROT + Math.sin(t * .5) * .05 + mouse.x * .15;

  // moon pulse
  moon.lookAt(camera.position);
  const mp = 1 + Math.sin(t * 1.2) * .015;
  moon.scale.set(mp, mp, mp);

  // web rendering updates
  webProgress += (webTarget - webProgress) * .08;
  const segsOn = Math.floor(webProgress * WEB_SEGS);
  web.geometry.setDrawRange(0, Math.max(0, segsOn * RADIAL * 6));
  web2.geometry.setDrawRange(0, Math.max(0, segsOn * RADIAL * 6));
  setHud(webProgress);

  // tip positioning
  const tp = webCurve.getPointAt(Math.max(.001, Math.min(.999, webProgress)));
  tip.position.copy(tp);
  tip.scale.setScalar(1 + Math.sin(t * 8) * .18);
  tipRing.position.copy(tp);
  tipRing.rotation.z = t * 3;
  tipRing.rotation.y = t * 2;
  tipRing.scale.setScalar(1 + Math.sin(t * 5) * .12);

  // web wind sway
  web.rotation.z = Math.sin(t * .8) * .012 + mouse.y * .02;
  web2.rotation.z = web.rotation.z;

  // checkpoints reveal
  checkpoints.forEach(cp => {
    if (!cp.userData.shown && webProgress > cp.userData.at) {
      cp.userData.shown = true;
      gsap.to(cp.scale, { x: 1, y: 1, z: 1, duration: .6, ease: 'back.out(2.5)' });
    }
    if (cp.userData.shown && webProgress < cp.userData.at - .03) {
      cp.userData.shown = false;
      gsap.to(cp.scale, { x: 0, y: 0, z: 0, duration: .3 });
    }
    cp.lookAt(camera.position);
  });

  // camera framing & following web tip
  const followX = THREE.MathUtils.lerp(camBase.x, tp.x * .55, webProgress);
  const followY = THREE.MathUtils.lerp(camBase.y, 2.5 + tp.y * .35, webProgress);
  const followZ = THREE.MathUtils.lerp(camBase.z, 15.5, webProgress);
  camera.position.x += ((followX + mouse.x * 1.6) - camera.position.x) * .05;
  camera.position.y += ((followY - mouse.y * 1.0) - camera.position.y) * .05;
  camera.position.z += (followZ - camera.position.z) * .05;
  const lookStart = new THREE.Vector3(perch.x - 4.6, perch.y - 2.2, perch.z);
  const look = new THREE.Vector3().lerpVectors(lookStart, tp, Math.min(1, webProgress * 1.25 + .05));
  camera.lookAt(look);

  // cloud movement
  clouds.children.forEach(c => {
    c.position.x += c.userData.sp * dt;
    if (c.position.x > 22) c.position.x = -22;
  });

  // projectile web animation
  for (let i = shots.length - 1; i >= 0; i--) {
    const s = shots[i];
    s.t += dt * 3.2;
    const on = Math.min(1, s.t);
    s.mesh.geometry.setDrawRange(0, Math.floor(on * s.seg) * 5 * 6);
    if (s.t > 1.4) {
      s.mesh.material.transparent = true;
      s.mesh.material.opacity = Math.max(0, 1 - (s.t - 1.4) * 2);
      if (s.mesh.material.opacity <= 0) {
        scene.remove(s.mesh);
        s.mesh.geometry.dispose();
        shots.splice(i, 1);
      }
    }
  }

  renderer.render(scene, camera);
  if (!reduceMotion) requestAnimationFrame(tick);
}

// Global listeners
addEventListener('pointermove', e => {
  mouse.x = e.clientX / innerWidth - .5;
  mouse.y = e.clientY / innerHeight - .5;
});

addEventListener('pointerdown', e => {
  const v = new THREE.Vector3((e.clientX / innerWidth) * 2 - 1, -(e.clientY / innerHeight) * 2 + 1, .5).unproject(camera);
  const dir = v.sub(camera.position).normalize();
  const target = camera.position.clone().add(dir.multiplyScalar(13));
  const start = handWorld();
  const mid = start.clone().lerp(target, .5).add(new THREE.Vector3(0, 1.2, 0));
  const curve = new THREE.CatmullRomCurve3([start, mid, target]);
  const SEG = 60;
  const g = new THREE.TubeGeometry(curve, SEG, .03, 5, false);
  g.setDrawRange(0, 0);
  const m = new THREE.Mesh(g, new THREE.MeshBasicMaterial({ color: RED }));
  scene.add(m);
  const shot = { mesh: m, seg: SEG, t: 0 };
  shots.push(shot);

  gsap.fromTo(hero.rotation, { z: 0 }, { z: -.06, duration: .08, yoyo: true, repeat: 1 });
  comicBurst(e.clientX, e.clientY);
  webSplat(e.clientX, e.clientY);
});

addEventListener('resize', () => {
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(innerWidth, innerHeight);
});

/* ============================================================
   HERO EFFECTS
   ============================================================ */
const h13d = document.getElementById('h13d');
document.querySelectorAll('.hero h1 .row').forEach((r, i) => r.style.transform = `translateZ(${i * 38}px)`);

addEventListener('pointermove', e => {
  if (reduceMotion) return;
  const x = e.clientX / innerWidth - .5, y = e.clientY / innerHeight - .5;
  gsap.to(h13d, { rotateY: x * 14, rotateX: -y * 10, duration: .8, ease: 'power2.out', transformPerspective: 1100 });
});

gsap.to(h13d, { y: -8, duration: 2.6, yoyo: true, repeat: -1, ease: 'sine.inOut' });

/* ============================================================
   CURSOR EFFECTS
   ============================================================ */
const dot = document.querySelector('.cursor-dot');
const ring = document.querySelector('.cursor-ring');
const label = document.getElementById('cursorLabel');
let rx = 0, ry = 0;

addEventListener('pointermove', e => {
  dot.style.transform = `translate(${e.clientX}px,${e.clientY}px) translate(-50%,-50%)`;
  label.style.left = e.clientX + 'px';
  label.style.top = e.clientY + 'px';
  rx = e.clientX;
  ry = e.clientY;
});

(function ringLoop() {
  const cur = ring.getBoundingClientRect();
  const cx = cur.left + cur.width / 2, cy = cur.top + cur.height / 2;
  ring.style.transform = `translate(${cx + (rx - cx) * .18}px,${cy + (ry - cy) * .18}px) translate(-50%,-50%)`;
  requestAnimationFrame(ringLoop);
})();

document.querySelectorAll('.hoverable,a,button').forEach(el => {
  el.addEventListener('pointerenter', () => {
    ring.classList.add('hovering');
    if (el.dataset.label) {
      label.textContent = el.dataset.label;
      label.style.opacity = 1;
    }
  });
  el.addEventListener('pointerleave', () => {
    ring.classList.remove('hovering');
    label.style.opacity = 0;
  });
});

/* ---------- CURSOR 2D CANVAS TRAIL ---------- */
const trailC = document.getElementById('webTrail'), tx = trailC.getContext('2d');
function sizeTrail() {
  trailC.width = innerWidth;
  trailC.height = innerHeight;
}
sizeTrail();
addEventListener('resize', sizeTrail);

const trail = [];
addEventListener('pointermove', e => {
  trail.unshift({ x: e.clientX, y: e.clientY });
  if (trail.length > 26) trail.pop();
});

(function trailLoop() {
  tx.clearRect(0, 0, trailC.width, trailC.height);
  if (trail.length > 2 && !reduceMotion) {
    for (let i = 1; i < trail.length; i++) {
      const f = 1 - i / trail.length;
      tx.strokeStyle = `rgba(224,32,47,${f * .5})`;
      tx.lineWidth = f * 3;
      tx.beginPath();
      tx.moveTo(trail[i - 1].x, trail[i - 1].y);
      tx.lineTo(trail[i].x, trail[i].y);
      tx.stroke();
      if (i % 5 === 0) {
        tx.strokeStyle = `rgba(21,21,28,${f * .3})`;
        tx.lineWidth = 1;
        const dx = trail[i].x - trail[i - 1].x, dy = trail[i].y - trail[i - 1].y, L = Math.hypot(dx, dy) || 1;
        const nx = -dy / L * 7 * f, ny = dx / L * 7 * f;
        tx.beginPath();
        tx.moveTo(trail[i].x - nx, trail[i].y - ny);
        tx.lineTo(trail[i].x + nx, trail[i].y + ny);
        tx.stroke();
      }
    }
  }
  requestAnimationFrame(trailLoop);
})();

/* ============================================================
   SCROLL ANIMATIONS
   ============================================================ */
// Update visual bar and HUD targets on scroll
addEventListener('scroll', () => {
  const h = document.documentElement;
  const p = h.scrollTop / (h.scrollHeight - h.clientHeight);
  document.getElementById('progFill').style.width = p * 100 + '%';
  document.getElementById('hudScroll').textContent = String(Math.round(p * 100)).padStart(3, '0') + '%';
  webTarget = p;
}, { passive: true });

// GSAP Reveal animations
gsap.utils.toArray('.reveal').forEach(el => {
  gsap.to(el, { opacity: 1, y: 0, duration: 1.1, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 88%' } });
});

gsap.utils.toArray('.flip3d').forEach(el => {
  gsap.to(el, {
    opacity: 1, rotateX: 0, y: 0, duration: 1.3, ease: 'back.out(1.5)', transformPerspective: 900,
    scrollTrigger: { trigger: el, start: 'top 86%' }
  });
});

// Incremental numerical counters trigger
gsap.utils.toArray('.num[data-count]').forEach(el => {
  const target = +el.dataset.count;
  const suffix = el.dataset.suffix || '+';
  ScrollTrigger.create({
    trigger: el, start: 'top 90%', once: true, onEnter: () => {
      gsap.fromTo(el, { innerText: 0 }, {
        innerText: target, duration: 2, ease: 'power2.out', snap: { innerText: 1 },
        onUpdate() { el.textContent = Math.floor(+el.textContent) + suffix; },
        onComplete() { el.textContent = target + suffix; }
      });
    }
  });
});

// Skew container wrap on scroll velocity
const skewSet = gsap.quickSetter('.skew-wrap', 'skewY', 'deg');
ScrollTrigger.create({
  onUpdate(self) {
    const v = Math.max(-4, Math.min(4, self.getVelocity() / -450));
    skewSet(v);
    gsap.to('.skew-wrap', { skewY: 0, duration: .7, ease: 'power3.out', overwrite: true });
  }
});

// Stagger service card reveals slightly on entering scroll trigger
gsap.utils.toArray('.card').forEach((c, i) => {
  gsap.fromTo(c, { y: 60 * (i % 2 ? 1 : -.4) }, { y: 0, scrollTrigger: { trigger: '.cards', start: 'top 95%', end: 'top 30%', scrub: 1 } });
});

/* ============================================================
   CARD INTERACTIONS
   ============================================================ */
// Magnetic buttons hover behavior
document.querySelectorAll('.magnetic').forEach(btn => {
  btn.addEventListener('pointermove', e => {
    const r = btn.getBoundingClientRect();
    gsap.to(btn, { x: (e.clientX - r.left - r.width / 2) * .32, y: (e.clientY - r.top - r.height / 2) * .32, duration: .4 });
  });
  btn.addEventListener('pointerleave', () => gsap.to(btn, { x: 0, y: 0, duration: .6, ease: 'elastic.out(1,.4)' }));
});

// 3D Card tilting tracking behavior
document.querySelectorAll('.card').forEach(card => {
  card.addEventListener('pointermove', e => {
    const r = card.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height;
    card.style.setProperty('--mx', px * 100 + '%');
    card.style.setProperty('--my', py * 100 + '%');
    gsap.to(card, { rotateY: (px - .5) * 16, rotateX: (.5 - py) * 16, duration: .5, ease: 'power2.out', transformPerspective: 1000 });
  });
  card.addEventListener('pointerleave', () => gsap.to(card, { rotateX: 0, rotateY: 0, duration: .8, ease: 'elastic.out(1,.5)' }));
});

/* ============================================================
   CONNECT CARD COMPONENT
   ============================================================ */
// Card mouse highlight radial glow
const connectCard = document.querySelector('.connect-card-wrap');
if (connectCard) {
  connectCard.addEventListener('pointermove', e => {
    const rect = connectCard.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    connectCard.style.setProperty('--mouse-x', `${x}px`);
    connectCard.style.setProperty('--mouse-y', `${y}px`);
  });
}

// Canvas particles drift animation
const connectCanvas = document.getElementById('connect-particles');
if (connectCanvas) {
  const ctx = connectCanvas.getContext('2d');
  let cw = 0, ch = 0;
  const dots = [];
  const qty = 60;

  function resizeConnectCanvas() {
    const parent = connectCanvas.parentElement;
    cw = parent.offsetWidth;
    ch = parent.offsetHeight;
    connectCanvas.width = cw;
    connectCanvas.height = ch;
    connectCanvas.style.width = `${cw}px`;
    connectCanvas.style.height = `${ch}px`;
    
    // Clear and re-populate
    dots.length = 0;
    for (let i = 0; i < qty; i++) {
      dots.push({
        x: Math.random() * cw,
        y: Math.random() * ch,
        size: Math.random() * 1.5 + 0.5,
        alpha: Math.random() * 0.4 + 0.1,
        vy: -(Math.random() * 0.3 + 0.1),
        vx: (Math.random() - 0.5) * 0.1
      });
    }
  }

  resizeConnectCanvas();
  window.addEventListener('resize', resizeConnectCanvas);

  function animateConnectParticles() {
    ctx.clearRect(0, 0, cw, ch);
    ctx.fillStyle = 'rgba(85, 85, 85, 0.4)';
    dots.forEach(d => {
      d.y += d.vy;
      d.x += d.vx;
      if (d.y < 0) {
        d.y = ch;
        d.x = Math.random() * cw;
      }
      ctx.globalAlpha = d.alpha;
      ctx.beginPath();
      ctx.arc(d.x, d.y, d.size, 0, Math.PI * 2);
      ctx.fill();
    });
    requestAnimationFrame(animateConnectParticles);
  }
  animateConnectParticles();
}

// Interactive pointer sequence animation timeline
const pointerEl = document.getElementById('board-pointer');
if (pointerEl) {
  const pointerTl = gsap.timeline({ repeat: -1 });
  // Start state
  pointerTl.set(pointerEl, { left: 140, top: 100 })
           .set('.board-badge', { opacity: 0.4 })
           // step 1: hover consulting
           .to(pointerEl, { left: 190, top: 22, duration: 1.1, ease: 'power2.inOut', delay: 0.4 })
           .to('#badge-consult', { opacity: 1, duration: 0.3 }, '-=0.3')
           // step 2: hover web dev
           .to(pointerEl, { left: 10, top: 62, duration: 1.1, ease: 'power2.inOut', delay: 1.2 })
           .to('#badge-consult', { opacity: 0.4, duration: 0.2 }, '-=1.1')
           .to('#badge-web', { opacity: 1, duration: 0.3 }, '-=0.3')
           // step 3: hover automation
           .to(pointerEl, { left: 170, top: 132, duration: 1.1, ease: 'power2.inOut', delay: 1.2 })
           .to('#badge-web', { opacity: 0.4, duration: 0.2 }, '-=1.1')
           .to('#badge-auto', { opacity: 1, duration: 0.3 }, '-=0.3')
           // step 4: hover AI agents
           .to(pointerEl, { left: 15, top: 178, duration: 1.1, ease: 'power2.inOut', delay: 1.2 })
           .to('#badge-auto', { opacity: 0.4, duration: 0.2 }, '-=1.1')
           .to('#badge-ai', { opacity: 1, duration: 0.3 }, '-=0.3')
           // return to start
           .to(pointerEl, { left: 140, top: 100, duration: 1.1, ease: 'power2.inOut', delay: 1.2 })
           .to('#badge-ai', { opacity: 0.4, duration: 0.2 }, '-=1.1');
}


