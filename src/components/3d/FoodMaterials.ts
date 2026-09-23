import * as THREE from 'three';

// Cache generated canvas textures to avoid re-allocation
const textureCache: Record<string, THREE.CanvasTexture> = {};

/**
 * Creates procedural high-res canvas texture for burger toasted brioche bun
 */
export function getBunTexture(): THREE.CanvasTexture {
  if (textureCache['bun']) return textureCache['bun'];

  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d')!;

  // Warm golden roasted brioche gradient
  const grad = ctx.createRadialGradient(512, 512, 100, 512, 512, 512);
  grad.addColorStop(0, '#d97d27');
  grad.addColorStop(0.5, '#b85d19');
  grad.addColorStop(0.85, '#8c3d0c');
  grad.addColorStop(1, '#5e2504');

  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 1024, 1024);

  // Subtle flour dusting & butter glaze highlights
  for (let i = 0; i < 4000; i++) {
    const x = Math.random() * 1024;
    const y = Math.random() * 1024;
    const r = Math.random() * 2 + 0.5;
    ctx.fillStyle = Math.random() > 0.6 ? 'rgba(255, 230, 190, 0.12)' : 'rgba(80, 30, 5, 0.08)';
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  textureCache['bun'] = texture;
  return texture;
}

/**
 * Creates procedural texture for charred grilled beef patty with sear marks
 */
export function getPattyTexture(): THREE.CanvasTexture {
  if (textureCache['patty']) return textureCache['patty'];

  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d')!;

  // Base ground meat brown
  ctx.fillStyle = '#3a1e12';
  ctx.fillRect(0, 0, 1024, 1024);

  // Craggy minced meat texture
  for (let i = 0; i < 9000; i++) {
    const x = Math.random() * 1024;
    const y = Math.random() * 1024;
    const r = Math.random() * 3 + 1;
    const shade = Math.floor(Math.random() * 50);
    ctx.fillStyle = `rgb(${45 + shade}, ${22 + Math.floor(shade * 0.5)}, ${12 + Math.floor(shade * 0.3)})`;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }

  // Realistic diagonal char grill sear marks
  ctx.strokeStyle = 'rgba(20, 10, 5, 0.85)';
  ctx.lineWidth = 14;
  ctx.lineCap = 'round';

  for (let x = -500; x < 1500; x += 120) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x + 500, 1024);
    ctx.stroke();
  }

  const texture = new THREE.CanvasTexture(canvas);
  textureCache['patty'] = texture;
  return texture;
}

/**
 * Creates procedural texture for juicy fresh sliced tomato
 */
export function getTomatoTexture(): THREE.CanvasTexture {
  if (textureCache['tomato']) return textureCache['tomato'];

  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d')!;

  // Outer red flesh
  const grad = ctx.createRadialGradient(256, 256, 80, 256, 256, 256);
  grad.addColorStop(0, '#e74c3c');
  grad.addColorStop(0.7, '#c0392b');
  grad.addColorStop(1, '#962d22');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 512, 512);

  // Core pulp star pattern
  ctx.fillStyle = '#ff7675';
  ctx.beginPath();
  ctx.arc(256, 256, 50, 0, Math.PI * 2);
  ctx.fill();

  // Seed cavities
  const numCavities = 5;
  for (let i = 0; i < numCavities; i++) {
    const angle = (i * Math.PI * 2) / numCavities;
    const cx = 256 + Math.cos(angle) * 120;
    const cy = 256 + Math.sin(angle) * 120;

    // Gelatinous pocket
    ctx.fillStyle = 'rgba(192, 57, 43, 0.9)';
    ctx.beginPath();
    ctx.ellipse(cx, cy, 45, 25, angle, 0, Math.PI * 2);
    ctx.fill();

    // Small golden seeds
    for (let s = 0; s < 4; s++) {
      const sx = cx + (Math.random() - 0.5) * 30;
      const sy = cy + (Math.random() - 0.5) * 18;
      ctx.fillStyle = '#f9ca24';
      ctx.beginPath();
      ctx.ellipse(sx, sy, 5, 3, Math.random() * Math.PI, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  textureCache['tomato'] = texture;
  return texture;
}

/**
 * Creates procedural texture for wood-fired pizza dough with leopard char spots
 */
export function getPizzaCrustTexture(): THREE.CanvasTexture {
  if (textureCache['pizza_crust']) return textureCache['pizza_crust'];

  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d')!;

  // Baked golden crust gradient
  const grad = ctx.createRadialGradient(512, 512, 200, 512, 512, 512);
  grad.addColorStop(0, '#f5d6a7');
  grad.addColorStop(0.7, '#e0a96d');
  grad.addColorStop(0.9, '#c68b59');
  grad.addColorStop(1, '#8e5428');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 1024, 1024);

  // Flour dust
  for (let i = 0; i < 3000; i++) {
    const x = Math.random() * 1024;
    const y = Math.random() * 1024;
    ctx.fillStyle = 'rgba(255, 250, 240, 0.18)';
    ctx.fillRect(x, y, 2, 2);
  }

  // Neapolitan wood-fired blistered leopard spots around the rim
  for (let i = 0; i < 180; i++) {
    const angle = Math.random() * Math.PI * 2;
    const dist = 380 + Math.random() * 120;
    const x = 512 + Math.cos(angle) * dist;
    const y = 512 + Math.sin(angle) * dist;
    const r = Math.random() * 14 + 4;

    ctx.fillStyle = Math.random() > 0.4 ? 'rgba(25, 12, 6, 0.92)' : 'rgba(90, 40, 15, 0.85)';
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }

  const texture = new THREE.CanvasTexture(canvas);
  textureCache['pizza_crust'] = texture;
  return texture;
}

/**
 * Creates procedural pepperoni slice texture with curing marbling
 */
export function getPepperoniTexture(): THREE.CanvasTexture {
  if (textureCache['pepperoni']) return textureCache['pepperoni'];

  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d')!;

  const grad = ctx.createRadialGradient(128, 128, 30, 128, 128, 128);
  grad.addColorStop(0, '#c0392b');
  grad.addColorStop(0.8, '#a93226');
  grad.addColorStop(1, '#641e16');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 256, 256);

  // Fat flecks & cracked black pepper
  for (let i = 0; i < 200; i++) {
    const x = Math.random() * 256;
    const y = Math.random() * 256;
    const r = Math.random() * 3 + 1;
    ctx.fillStyle = Math.random() > 0.3 ? 'rgba(255, 245, 235, 0.65)' : 'rgba(20, 10, 5, 0.8)';
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }

  const texture = new THREE.CanvasTexture(canvas);
  textureCache['pepperoni'] = texture;
  return texture;
}

/**
 * Creates procedural bubbling mozzarella cheese texture
 */
export function getMeltedCheeseTexture(): THREE.CanvasTexture {
  if (textureCache['melted_cheese']) return textureCache['melted_cheese'];

  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d')!;

  // Molten cheese gradient
  const grad = ctx.createRadialGradient(256, 256, 50, 256, 256, 256);
  grad.addColorStop(0, '#fff4cc');
  grad.addColorStop(0.6, '#f9e79f');
  grad.addColorStop(0.9, '#f5b041');
  grad.addColorStop(1, '#d35400');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 512, 512);

  // Browned cheese bubbles from oven baking
  for (let i = 0; i < 70; i++) {
    const x = Math.random() * 512;
    const y = Math.random() * 512;
    const r = Math.random() * 16 + 6;
    ctx.fillStyle = 'rgba(186, 74, 0, 0.55)';
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();

    // Inner toasted center
    ctx.fillStyle = 'rgba(110, 44, 0, 0.7)';
    ctx.beginPath();
    ctx.arc(x, y, r * 0.5, 0, Math.PI * 2);
    ctx.fill();
  }

  const texture = new THREE.CanvasTexture(canvas);
  textureCache['melted_cheese'] = texture;
  return texture;
}
