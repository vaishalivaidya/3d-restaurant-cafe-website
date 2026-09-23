import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import {
  getBunTexture,
  getPattyTexture,
  getTomatoTexture,
  getMeltedCheeseTexture,
} from './FoodMaterials';

export type AnimationType = 'zero-g' | 'cascade' | 'sizzle-melt' | 'orbit' | 'macro-reveal';
export type CameraPreset = 'front' | 'angled' | 'top' | 'closeup';
export type LoopMode = 'continuous' | 'ping-pong' | 'once';

export interface Burger3DProps {
  mode?: 'hero' | 'story' | 'signature' | 'exploded-lab' | 'gif';
  step?: number;
  interactive?: boolean;
  explodedOffset?: number;
  className?: string;
  showLabels?: boolean;
  isGifLoop?: boolean;
  gifSpeed?: number;
  isGifPlaying?: boolean;
  focusedLayer?: string;
  enableSmoke?: boolean;
  autoSpin?: boolean;
  animationType?: AnimationType;
  cameraPreset?: CameraPreset;
  loopMode?: LoopMode;
  scrubProgress?: number | null; // 0 to 1 when scrubbing
  onProgressUpdate?: (progress: number, currentTime: number, totalDuration: number) => void;
}

export const Burger3D: React.FC<Burger3DProps> = ({
  mode = 'hero',
  step = 5,
  interactive = true,
  explodedOffset = 0,
  className = '',
  showLabels = false,
  isGifLoop = false,
  gifSpeed = 1.0,
  isGifPlaying = true,
  focusedLayer,
  enableSmoke = true,
  autoSpin = true,
  animationType = 'zero-g',
  cameraPreset = 'front',
  loopMode = 'continuous',
  scrubProgress = null,
  onProgressUpdate,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [webglSupported, setWebglSupported] = useState(true);
  const [, setIsHovered] = useState(false);

  // References for animation state
  const animStateRef = useRef({
    step,
    explodedOffset,
    isGifLoop,
    gifSpeed,
    isGifPlaying,
    focusedLayer,
    enableSmoke,
    autoSpin,
    animationType,
    cameraPreset,
    loopMode,
    scrubProgress,
    mouseX: 0,
    mouseY: 0,
    targetMouseX: 0,
    targetMouseY: 0,
    isUserDragging: false,
    manualRotationY: 0,
    manualRotationX: 0.15,
    virtualTime: 0,
    duration: 4.0, // Standard 4.0s cycle
  });

  const onProgressUpdateRef = useRef(onProgressUpdate);
  useEffect(() => {
    onProgressUpdateRef.current = onProgressUpdate;
  }, [onProgressUpdate]);

  useEffect(() => {
    animStateRef.current.step = step;
    animStateRef.current.explodedOffset = explodedOffset;
    animStateRef.current.isGifLoop = isGifLoop;
    animStateRef.current.gifSpeed = gifSpeed;
    animStateRef.current.isGifPlaying = isGifPlaying;
    animStateRef.current.focusedLayer = focusedLayer;
    animStateRef.current.enableSmoke = enableSmoke;
    animStateRef.current.autoSpin = autoSpin;
    animStateRef.current.animationType = animationType;
    animStateRef.current.cameraPreset = cameraPreset;
    animStateRef.current.loopMode = loopMode;
    animStateRef.current.scrubProgress = scrubProgress;
  }, [
    step,
    explodedOffset,
    isGifLoop,
    gifSpeed,
    isGifPlaying,
    focusedLayer,
    enableSmoke,
    autoSpin,
    animationType,
    cameraPreset,
    loopMode,
    scrubProgress,
  ]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    try {
      const testCanvas = document.createElement('canvas');
      const gl = testCanvas.getContext('webgl') || testCanvas.getContext('experimental-webgl');
      if (!gl) {
        setWebglSupported(false);
        return;
      }
    } catch {
      setWebglSupported(false);
      return;
    }

    const width = container.clientWidth || 600;
    const height = container.clientHeight || 500;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0.8, 5.4);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.18;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.appendChild(renderer.domElement);

    const burgerGroup = new THREE.Group();
    scene.add(burgerGroup);

    const floatingGroup = new THREE.Group();
    scene.add(floatingGroup);

    // Three-point Studio Lighting
    const keyLight = new THREE.DirectionalLight('#ffddaa', 3.4);
    keyLight.position.set(4, 6, 4);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight('#99bbdd', 1.4);
    fillLight.position.set(-4, 2, 2);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight('#e67e22', 4.5);
    rimLight.position.set(0, 4, -4.5);
    scene.add(rimLight);

    const ambientLight = new THREE.AmbientLight('#2a1e17', 2.0);
    scene.add(ambientLight);

    const emberLight = new THREE.PointLight('#e67e22', 3.0, 6);
    emberLight.position.set(0, -1.8, 0);
    scene.add(emberLight);

    // Soft Contact Shadow Plane underneath
    const shadowGeo = new THREE.PlaneGeometry(6, 6);
    const shadowMat = new THREE.ShadowMaterial({ opacity: 0.42 });
    const shadowPlane = new THREE.Mesh(shadowGeo, shadowMat);
    shadowPlane.rotation.x = -Math.PI / 2;
    shadowPlane.position.y = -1.45;
    shadowPlane.receiveShadow = true;
    scene.add(shadowPlane);

    // Procedural PBR Textures
    const bunTex = getBunTexture();
    const pattyTex = getPattyTexture();
    const tomatoTex = getTomatoTexture();
    const cheeseTex = getMeltedCheeseTexture();

    const bunMat = new THREE.MeshStandardMaterial({
      map: bunTex,
      roughness: 0.38,
      metalness: 0.06,
      bumpMap: bunTex,
      bumpScale: 0.03,
    });

    const pattyMat = new THREE.MeshStandardMaterial({
      map: pattyTex,
      roughness: 0.68,
      metalness: 0.12,
      bumpMap: pattyTex,
      bumpScale: 0.08,
    });

    const cheeseMat = new THREE.MeshStandardMaterial({
      map: cheeseTex,
      roughness: 0.2,
      metalness: 0.02,
      color: '#f5b041',
      emissive: '#d35400',
      emissiveIntensity: 0.12,
    });

    const tomatoMat = new THREE.MeshStandardMaterial({
      map: tomatoTex,
      roughness: 0.18,
      metalness: 0.08,
    });

    const lettuceMat = new THREE.MeshStandardMaterial({
      color: '#27ae60',
      roughness: 0.42,
      metalness: 0.02,
      side: THREE.DoubleSide,
    });

    const sauceMat = new THREE.MeshStandardMaterial({
      color: '#d35400',
      roughness: 0.15,
      metalness: 0.08,
    });

    const baconMat = new THREE.MeshStandardMaterial({
      color: '#7b241c',
      roughness: 0.5,
      metalness: 0.1,
    });

    const onionMat = new THREE.MeshStandardMaterial({
      color: '#8e44ad',
      roughness: 0.28,
      metalness: 0.05,
    });

    const pickleMat = new THREE.MeshStandardMaterial({
      color: '#1e824c',
      roughness: 0.32,
      metalness: 0.05,
    });

    // ==========================================
    // BURGER LAYERS (Matching User Reference Image)
    // ==========================================

    // 1. Bottom Brioche Bun Heel
    const bottomBunGeo = new THREE.CylinderGeometry(1.25, 1.16, 0.42, 40);
    const bottomBun = new THREE.Mesh(bottomBunGeo, bunMat);
    bottomBun.castShadow = true;
    bottomBun.receiveShadow = true;
    bottomBun.position.y = -0.75;

    // 2. House Secret Amber Sauce
    const sauceGeo = new THREE.CylinderGeometry(1.18, 1.18, 0.08, 32);
    const sauceLayer = new THREE.Mesh(sauceGeo, sauceMat);
    sauceLayer.position.y = -0.52;

    // 3. Crispy Smoked Bacon (2 wavy strips)
    const baconGroup = new THREE.Group();
    for (let b = 0; b < 2; b++) {
      const baconGeo = new THREE.BoxGeometry(1.9, 0.06, 0.42, 16, 1, 1);
      const bPos = baconGeo.attributes.position;
      for (let i = 0; i < bPos.count; i++) {
        const x = bPos.getX(i);
        bPos.setY(i, bPos.getY(i) + Math.sin(x * 6 + b * 2) * 0.08);
      }
      baconGeo.computeVertexNormals();
      const strip = new THREE.Mesh(baconGeo, baconMat);
      strip.position.set(0, 0, (b - 0.5) * 0.48);
      strip.rotation.y = b === 0 ? 0.35 : -0.42;
      strip.castShadow = true;
      baconGroup.add(strip);
    }
    baconGroup.position.y = -0.36;

    // 4. Double Smashed Angus Patty
    const pattyGeo = new THREE.CylinderGeometry(1.32, 1.36, 0.46, 36, 4);
    const pPos = pattyGeo.attributes.position;
    for (let i = 0; i < pPos.count; i++) {
      const x = pPos.getX(i);
      const y = pPos.getY(i);
      const z = pPos.getZ(i);
      const angle = Math.atan2(z, x);
      const dist = Math.sqrt(x * x + z * z);
      if (dist > 1.1) {
        const jagged = (Math.sin(angle * 24) + Math.cos(angle * 36)) * 0.05;
        pPos.setX(i, x + Math.cos(angle) * jagged);
        pPos.setZ(i, z + Math.sin(angle) * jagged);
      }
    }
    pattyGeo.computeVertexNormals();
    const patty = new THREE.Mesh(pattyGeo, pattyMat);
    patty.castShadow = true;
    patty.receiveShadow = true;
    patty.position.y = -0.12;

    // 5. Melted Aged Cheddar Blanket with Drooping Molten Corners
    const cheeseGeo = new THREE.BoxGeometry(1.8, 0.07, 1.8, 12, 1, 12);
    const cPos = cheeseGeo.attributes.position;
    for (let i = 0; i < cPos.count; i++) {
      const x = cPos.getX(i);
      const y = cPos.getY(i);
      const z = cPos.getZ(i);
      const distFromCenter = Math.sqrt(x * x + z * z);
      if (distFromCenter > 0.85) {
        cPos.setY(i, y - Math.pow(distFromCenter - 0.75, 1.6) * 0.48);
      }
    }
    cheeseGeo.computeVertexNormals();
    const cheese = new THREE.Mesh(cheeseGeo, cheeseMat);
    cheese.rotation.y = Math.PI / 4;
    cheese.position.y = 0.12;
    cheese.castShadow = true;

    // Drooping cheese drips
    const dripGeo = new THREE.ConeGeometry(0.06, 0.28, 8);
    dripGeo.rotateX(Math.PI);
    for (let d = 0; d < 4; d++) {
      const drip = new THREE.Mesh(dripGeo, cheeseMat);
      const dAngle = (d * Math.PI) / 2 + Math.PI / 4;
      drip.position.set(Math.cos(dAngle) * 0.98, -0.22, Math.sin(dAngle) * 0.98);
      cheese.add(drip);
    }

    // 6. House Dill Pickles
    const pickleChipsGroup = new THREE.Group();
    const pickleGeo = new THREE.CylinderGeometry(0.42, 0.42, 0.08, 22);
    const p1 = new THREE.Mesh(pickleGeo, pickleMat);
    p1.position.set(0.42, 0, 0.22);
    p1.rotation.set(0.1, 0.3, 0.08);
    p1.castShadow = true;

    const p2 = new THREE.Mesh(pickleGeo, pickleMat);
    p2.position.set(-0.42, 0.02, -0.2);
    p2.rotation.set(-0.08, -0.4, -0.05);
    p2.castShadow = true;

    pickleChipsGroup.add(p1, p2);
    pickleChipsGroup.position.y = 0.24;

    // 7. Sweet Purple Red Onion Rings
    const onionRingsGroup = new THREE.Group();
    const ring1 = new THREE.Mesh(new THREE.TorusGeometry(0.55, 0.05, 10, 32), onionMat);
    ring1.rotation.x = Math.PI / 2 + 0.12;
    ring1.position.set(-0.32, 0, 0.12);
    ring1.castShadow = true;

    const ring2 = new THREE.Mesh(new THREE.TorusGeometry(0.48, 0.05, 10, 32), onionMat);
    ring2.rotation.x = Math.PI / 2 - 0.14;
    ring2.position.set(0.32, 0.02, -0.14);
    ring2.castShadow = true;

    onionRingsGroup.add(ring1, ring2);
    onionRingsGroup.position.y = 0.36;

    // 8. Heirloom Tomato Slices
    const tomatoGroup = new THREE.Group();
    const tomatoGeo = new THREE.CylinderGeometry(0.7, 0.7, 0.12, 24);
    const tomato1 = new THREE.Mesh(tomatoGeo, tomatoMat);
    tomato1.position.set(-0.35, 0, 0.1);
    tomato1.rotation.y = 0.4;
    tomato1.castShadow = true;

    const tomato2 = new THREE.Mesh(tomatoGeo, tomatoMat);
    tomato2.position.set(0.35, 0.02, -0.05);
    tomato2.rotation.y = -0.5;
    tomato2.castShadow = true;

    tomatoGroup.add(tomato1, tomato2);
    tomatoGroup.position.y = 0.48;

    // 9. Crisp Ruffled Butter Lettuce
    const lettuceGroup = new THREE.Group();
    const numLeaves = 8;
    for (let i = 0; i < numLeaves; i++) {
      const leafGeo = new THREE.ConeGeometry(0.72, 0.22, 6);
      const leaf = new THREE.Mesh(leafGeo, lettuceMat);
      const angle = (i * Math.PI * 2) / numLeaves;
      leaf.position.set(Math.cos(angle) * 1.05, 0, Math.sin(angle) * 1.05);
      leaf.rotation.x = Math.PI / 2 + (Math.random() - 0.5) * 0.4;
      leaf.rotation.z = angle + Math.PI / 2;
      leaf.scale.set(1.4, 0.42, 1.2);
      leaf.castShadow = true;
      lettuceGroup.add(leaf);
    }
    lettuceGroup.position.y = 0.65;

    // 10. Golden Glazed Brioche Crown
    const topBunGeo = new THREE.SphereGeometry(1.35, 40, 24, 0, Math.PI * 2, 0, Math.PI * 0.52);
    topBunGeo.scale(1, 0.68, 1);
    const topBun = new THREE.Mesh(topBunGeo, bunMat);
    topBun.castShadow = true;
    topBun.receiveShadow = true;
    topBun.position.y = 0.85;

    // 11. Toasted Sesame Seeds (95 seeds)
    const seedGeo = new THREE.ConeGeometry(0.024, 0.065, 4);
    const seedMat = new THREE.MeshStandardMaterial({
      color: '#fdf5e6',
      roughness: 0.35,
    });
    const seedsGroup = new THREE.Group();
    const numSeeds = 95;
    for (let i = 0; i < numSeeds; i++) {
      const phi = Math.random() * Math.PI * 0.38;
      const theta = Math.random() * Math.PI * 2;
      const r = 1.35;
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * 0.68 * Math.cos(phi);
      const z = r * Math.sin(phi) * Math.sin(theta);

      const seed = new THREE.Mesh(seedGeo, seedMat);
      seed.position.set(x, y, z);
      seed.lookAt(x * 1.5, y * 1.5, z * 1.5);
      seedsGroup.add(seed);
    }
    topBun.add(seedsGroup);

    // 12. Charcoal Smoke Plumes & Sizzle Particles
    const smokeGroup = new THREE.Group();
    const smokeParticleCount = 28;
    const smokeMat = new THREE.MeshStandardMaterial({
      color: '#1a1410',
      roughness: 0.9,
      transparent: true,
      opacity: 0.38,
    });
    for (let s = 0; s < smokeParticleCount; s++) {
      const sMesh = new THREE.Mesh(new THREE.SphereGeometry(0.25 + Math.random() * 0.25, 8, 8), smokeMat);
      sMesh.position.set(
        (Math.random() - 0.5) * 2.2,
        -0.2 + (Math.random() - 0.5) * 1.0,
        -0.8 - Math.random() * 0.8
      );
      smokeGroup.add(sMesh);
    }
    burgerGroup.add(smokeGroup);

    // 13. Flying Sesame Seeds & Spice Embers
    const flyingSpecksGroup = new THREE.Group();
    const specksCount = 40;
    const specksGeo = new THREE.BufferGeometry();
    const specksPos = new Float32Array(specksCount * 3);
    for (let p = 0; p < specksCount; p++) {
      specksPos[p * 3] = (Math.random() - 0.5) * 3.2;
      specksPos[p * 3 + 1] = (Math.random() - 0.5) * 2.5;
      specksPos[p * 3 + 2] = (Math.random() - 0.5) * 2.0;
    }
    specksGeo.setAttribute('position', new THREE.BufferAttribute(specksPos, 3));
    const specksMat = new THREE.PointsMaterial({
      color: '#f5b041',
      size: 0.06,
      transparent: true,
      opacity: 0.8,
    });
    const flyingSpecks = new THREE.Points(specksGeo, specksMat);
    flyingSpecksGroup.add(flyingSpecks);
    burgerGroup.add(flyingSpecksGroup);

    // Assembly
    burgerGroup.add(bottomBun);
    burgerGroup.add(sauceLayer);
    burgerGroup.add(baconGroup);
    burgerGroup.add(patty);
    burgerGroup.add(cheese);
    burgerGroup.add(pickleChipsGroup);
    burgerGroup.add(onionRingsGroup);
    burgerGroup.add(tomatoGroup);
    burgerGroup.add(lettuceGroup);
    burgerGroup.add(topBun);

    // Floating Ambient Ingredients around the Burger (hero mode)
    const floaters: { mesh: THREE.Mesh | THREE.Group; speed: number; rotX: number; rotY: number; baseY: number }[] = [];
    if (mode === 'hero' || mode === 'signature') {
      const onionFloat = new THREE.Mesh(new THREE.TorusGeometry(0.45, 0.05, 12, 28), onionMat);
      onionFloat.position.set(-2.2, 0.8, -0.6);
      floatingGroup.add(onionFloat);
      floaters.push({ mesh: onionFloat, speed: 0.8, rotX: 0.01, rotY: 0.015, baseY: 0.8 });

      const floatLettuce = new THREE.Mesh(new THREE.ConeGeometry(0.5, 0.15, 5), lettuceMat);
      floatLettuce.position.set(2.4, 0.5, -0.3);
      floatLettuce.scale.set(1.5, 0.3, 1.2);
      floatingGroup.add(floatLettuce);
      floaters.push({ mesh: floatLettuce, speed: 1.1, rotX: 0.012, rotY: 0.008, baseY: 0.5 });

      const floatTomato = new THREE.Mesh(tomatoGeo, tomatoMat);
      floatTomato.position.set(-2.0, -0.6, 0.5);
      floatTomato.rotation.x = 0.5;
      floatingGroup.add(floatTomato);
      floaters.push({ mesh: floatTomato, speed: 0.9, rotX: 0.009, rotY: 0.014, baseY: -0.6 });

      const floatPickle = new THREE.Mesh(pickleGeo, pickleMat);
      floatPickle.position.set(2.2, -0.7, 0.4);
      floatPickle.rotation.z = 0.4;
      floatingGroup.add(floatPickle);
      floaters.push({ mesh: floatPickle, speed: 1.2, rotX: 0.015, rotY: 0.01, baseY: -0.7 });
    }

    // Mouse & Touch interaction handlers for 360° inspection
    let isPointerDown = false;
    let startX = 0;
    let startY = 0;

    const handlePointerDown = (clientX: number, clientY: number) => {
      if (!interactive) return;
      isPointerDown = true;
      startX = clientX;
      startY = clientY;
      animStateRef.current.isUserDragging = true;
    };

    const handlePointerMove = (clientX: number, clientY: number) => {
      const rect = container.getBoundingClientRect();
      const nx = ((clientX - rect.left) / rect.width) * 2 - 1;
      const ny = -(((clientY - rect.top) / rect.height) * 2 - 1);
      animStateRef.current.targetMouseX = nx;
      animStateRef.current.targetMouseY = ny;

      if (isPointerDown && interactive) {
        const deltaX = clientX - startX;
        const deltaY = clientY - startY;
        animStateRef.current.manualRotationY += deltaX * 0.007;
        animStateRef.current.manualRotationX = Math.max(
          -0.6,
          Math.min(0.6, animStateRef.current.manualRotationX + deltaY * 0.007)
        );
        startX = clientX;
        startY = clientY;
      }
    };

    const handlePointerUp = () => {
      isPointerDown = false;
      animStateRef.current.isUserDragging = false;
    };

    const onMouseDown = (e: MouseEvent) => handlePointerDown(e.clientX, e.clientY);
    const onMouseMove = (e: MouseEvent) => handlePointerMove(e.clientX, e.clientY);
    const onMouseUp = () => handlePointerUp();

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) handlePointerDown(e.touches[0].clientX, e.touches[0].clientY);
    };
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 1) handlePointerMove(e.touches[0].clientX, e.touches[0].clientY);
    };
    const onTouchEnd = () => handlePointerUp();

    container.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    container.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd);

    // Resize observer
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // Animation Render Loop with Advanced Playback Engine
    const clock = new THREE.Clock();
    let animFrameId: number;
    let lastTimeUpdate = 0;

    const animate = () => {
      animFrameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();

      const state = animStateRef.current;
      const isGif = state.isGifLoop || mode === 'gif';
      const isPlaying = state.isGifPlaying;
      const speed = state.gifSpeed || 1.0;
      const duration = state.duration;

      // Update virtual playback time
      if (state.scrubProgress !== null && state.scrubProgress !== undefined) {
        state.virtualTime = state.scrubProgress * duration;
      } else if (isGif && isPlaying) {
        state.virtualTime += delta * speed;
        if (state.loopMode === 'once') {
          if (state.virtualTime >= duration) state.virtualTime = duration;
        } else {
          // continuous or ping-pong
          if (state.virtualTime > duration) {
            state.virtualTime = state.virtualTime % duration;
          }
        }
      }

      // Compute normalized progress [0..1]
      const rawProgress = Math.min(1, Math.max(0, state.virtualTime / duration));
      let animProgress = rawProgress;

      if (state.loopMode === 'ping-pong') {
        // ping pong bounce
        animProgress = rawProgress < 0.5 ? rawProgress * 2 : (1 - rawProgress) * 2;
      }

      // Fire progress update callback periodically (approx 15-20 times/sec to avoid React re-render thrashing)
      const now = performance.now();
      if (now - lastTimeUpdate > 48 && onProgressUpdateRef.current && isGif) {
        lastTimeUpdate = now;
        onProgressUpdateRef.current(rawProgress, state.virtualTime, duration);
      }

      // Damping
      state.mouseX += (state.targetMouseX - state.mouseX) * 0.06;
      state.mouseY += (state.targetMouseY - state.mouseY) * 0.06;
      const mX = state.mouseX;
      const mY = state.mouseY;

      // ==========================================
      // ANIMATION TYPE CHOREOGRAPHY CALCULATIONS
      // ==========================================
      let baseSep = state.explodedOffset;
      const animType = state.animationType;

      // Reset layer specific rotations & scale
      bottomBun.position.set(0, -0.75, 0);
      sauceLayer.position.set(0, -0.52, 0);
      baconGroup.position.set(0, -0.36, 0);
      patty.position.set(0, -0.12, 0);
      cheese.position.set(0, 0.12, 0);
      pickleChipsGroup.position.set(0, 0.24, 0);
      onionRingsGroup.position.set(0, 0.36, 0);
      tomatoGroup.position.set(0, 0.48, 0);
      lettuceGroup.position.set(0, 0.65, 0);
      topBun.position.set(0, 0.85, 0);

      topBun.rotation.set(0, 0, 0);
      lettuceGroup.rotation.set(0, 0, 0);
      onionRingsGroup.rotation.set(0, 0, 0);
      pickleChipsGroup.rotation.set(0, 0, 0);
      baconGroup.rotation.set(0, 0, 0);

      if (isGif) {
        if (animType === 'zero-g') {
          // 1. Zero-G Levitation: smooth harmonic sinusoidal expansion with zero-g wobble
          const wave = (Math.sin(animProgress * Math.PI * 2 - Math.PI / 2) + 1) / 2;
          const eased = wave * wave * (3 - 2 * wave);
          baseSep = THREE.MathUtils.lerp(0.04, 0.94, eased);

          topBun.rotation.z = Math.sin(state.virtualTime * 3) * 0.05;
          lettuceGroup.rotation.y = Math.cos(state.virtualTime * 2.5) * 0.08;
          onionRingsGroup.rotation.z = Math.sin(state.virtualTime * 3.2) * 0.1;
          pickleChipsGroup.rotation.y = Math.cos(state.virtualTime * 2.8) * 0.08;
        } else if (animType === 'cascade') {
          // 2. Cascade Gravity Drop: layers fall sequentially with physics bounce!
          const p = animProgress;
          // Staggered arrival times
          const getDropY = (stepIdx: number, basePos: number) => {
            const delay = stepIdx * 0.09;
            const t = Math.max(0, Math.min(1, (p - delay) / 0.28));
            // Bounce easing
            let bounce = 1;
            if (t < 0.7) {
              bounce = (1 - t / 0.7);
            } else {
              const b = (t - 0.7) / 0.3;
              bounce = Math.sin(b * Math.PI) * 0.15;
            }
            return basePos + (1 - t) * 3.5 + bounce * 0.4;
          };

          bottomBun.position.y = getDropY(0, -0.75);
          sauceLayer.position.y = getDropY(1, -0.52);
          baconGroup.position.y = getDropY(2, -0.36);
          patty.position.y = getDropY(3, -0.12);
          cheese.position.y = getDropY(4, 0.12);
          pickleChipsGroup.position.y = getDropY(5, 0.24);
          onionRingsGroup.position.y = getDropY(6, 0.36);
          tomatoGroup.position.y = getDropY(7, 0.48);
          lettuceGroup.position.y = getDropY(8, 0.65);
          topBun.position.y = getDropY(9, 0.85);

          baseSep = 0; // Handled directly by drop calculation
        } else if (animType === 'sizzle-melt') {
          // 3. Sizzle & Molten Sear: Heat pulsation, molten dripping cheese, energetic steam
          const sizzleWave = (Math.sin(animProgress * Math.PI * 2) + 1) / 2;
          baseSep = 0.35 + sizzleWave * 0.25;

          // Intense glowing embers
          emberLight.intensity = 5.0 + Math.sin(state.virtualTime * 24) * 2.2;
          emberLight.color.set('#ff4500');

          // Cheese melting stretch
          cheese.scale.set(1 + sizzleWave * 0.08, 1, 1 + sizzleWave * 0.08);
          baconGroup.rotation.z = Math.sin(state.virtualTime * 8) * 0.02;
        } else if (animType === 'orbit') {
          // 4. 360° Cinematic Orbit Slice: layers hover suspended while camera rotates 360 degrees
          baseSep = 0.78;
          state.manualRotationY = animProgress * Math.PI * 2;
          topBun.rotation.x = Math.sin(state.virtualTime * 2) * 0.08;
          tomatoGroup.rotation.z = Math.cos(state.virtualTime * 2) * 0.06;
        } else if (animType === 'macro-reveal') {
          // 5. Macro Dissection: ultra-deep separation isolating each element
          const wave = (Math.sin(animProgress * Math.PI * 2 - Math.PI / 2) + 1) / 2;
          baseSep = THREE.MathUtils.lerp(0.2, 1.25, wave);
        }
      }

      // If not cascade, apply separation to layer Y positions
      if (animType !== 'cascade' || !isGif) {
        bottomBun.position.y = -0.75 - baseSep * 0.75;
        sauceLayer.position.y = -0.52 - baseSep * 0.6;
        baconGroup.position.y = -0.36 - baseSep * 0.42;
        patty.position.y = -0.12 - baseSep * 0.18;
        cheese.position.y = 0.12 + baseSep * 0.08;
        pickleChipsGroup.position.y = 0.24 + baseSep * 0.28;
        onionRingsGroup.position.y = 0.36 + baseSep * 0.52;
        tomatoGroup.position.y = 0.48 + baseSep * 0.78;
        lettuceGroup.position.y = 0.65 + baseSep * 1.08;
        topBun.position.y = 0.85 + baseSep * 1.45;
      }

      // Flying specks expand radially outward as burger explodes
      flyingSpecksGroup.scale.set(1 + baseSep * 0.8, 1 + baseSep * 0.8, 1 + baseSep * 0.8);
      flyingSpecks.rotation.y = state.virtualTime * 0.15;

      // Smoke visibility & breathing
      smokeGroup.visible = state.enableSmoke;
      if (smokeGroup.visible) {
        smokeGroup.children.forEach((s, idx) => {
          s.position.y += Math.sin(state.virtualTime * 2 + idx) * 0.0018;
        });
        smokeGroup.rotation.z = Math.sin(state.virtualTime * 0.6) * 0.08;
      }

      // Camera Angle Preset Choreography
      let targetCamX = 0;
      let targetCamY = 0.8;
      let targetCamZ = 5.4 - baseSep * 0.4;

      if (state.cameraPreset === 'angled') {
        targetCamX = 1.2;
        targetCamY = 1.6;
        targetCamZ = 4.8;
      } else if (state.cameraPreset === 'top') {
        targetCamX = 0;
        targetCamY = 4.4;
        targetCamZ = 2.4;
      } else if (state.cameraPreset === 'closeup') {
        targetCamX = 0;
        targetCamY = 0.2;
        targetCamZ = 3.6;
      }

      camera.position.x += (targetCamX - camera.position.x) * 0.08;
      camera.position.y += (targetCamY - camera.position.y) * 0.08;
      camera.position.z += (targetCamZ - camera.position.z) * 0.08;
      camera.lookAt(0, 0.1, 0);

      // Auto-spin and manual rotation
      if (mode === 'exploded-lab' || mode === 'gif') {
        if (state.autoSpin && !state.isUserDragging && animType !== 'orbit') {
          state.manualRotationY += 0.006 * speed;
        }
        burgerGroup.rotation.y = state.manualRotationY;
        burgerGroup.rotation.x = state.manualRotationX + mY * 0.15;
      } else if (mode === 'hero') {
        if (state.autoSpin) {
          burgerGroup.rotation.y = state.virtualTime * 0.28 + mX * 0.45;
        } else {
          burgerGroup.rotation.y = mX * 0.6;
        }
        burgerGroup.rotation.x = mY * 0.25;
      } else if (mode === 'signature') {
        burgerGroup.rotation.y = mX * 1.2;
        burgerGroup.rotation.x = mY * 0.4;
      }

      // Floating background ingredients
      floaters.forEach((f, idx) => {
        f.mesh.position.y = f.baseY + Math.sin(state.virtualTime * f.speed + idx) * 0.14;
        f.mesh.rotation.x += f.rotX;
        f.mesh.rotation.y += f.rotY;
      });

      renderer.render(scene, camera);
    };

    animFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animFrameId);
      container.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      container.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
      window.removeEventListener('resize', handleResize);

      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      keyLight.dispose();
      fillLight.dispose();
      rimLight.dispose();
      emberLight.dispose();
    };
  }, [mode]);

  return (
    <div
      ref={mountRef}
      className={`burger-3d-container ${className}`}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        minHeight: '380px',
        cursor: interactive ? 'grab' : 'default',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        animStateRef.current.targetMouseX = 0;
        animStateRef.current.targetMouseY = 0;
      }}
    >
      {!webglSupported && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'radial-gradient(circle, #2a1a10 0%, #0d0a08 100%)',
            color: 'var(--text-secondary)',
            fontSize: '14px',
            borderRadius: 'var(--radius-lg)',
          }}
        >
          <span>3D WebGL preview requires hardware acceleration.</span>
        </div>
      )}

      {showLabels && (
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 10 }}>
          <div
            style={{
              position: 'absolute',
              top: '12%',
              left: '12%',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
            }}
          >
            <div
              style={{
                background: 'rgba(20, 16, 13, 0.88)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(243, 156, 18, 0.4)',
                padding: '6px 14px',
                borderRadius: '6px',
                fontSize: '12px',
                fontWeight: 600,
                color: 'var(--accent-gold)',
                boxShadow: '0 4px 14px rgba(0,0,0,0.5)',
              }}
            >
              Artisan Brioche Crown & Sesame
            </div>
            <div
              style={{
                width: '40px',
                height: '1px',
                background: 'linear-gradient(to right, rgba(243, 156, 18, 0.6), transparent)',
              }}
            />
          </div>

          <div
            style={{
              position: 'absolute',
              top: '36%',
              right: '8%',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              flexDirection: 'row-reverse',
            }}
          >
            <div
              style={{
                background: 'rgba(20, 16, 13, 0.88)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(241, 196, 15, 0.4)',
                padding: '6px 14px',
                borderRadius: '6px',
                fontSize: '12px',
                fontWeight: 600,
                color: '#f1c40f',
                boxShadow: '0 4px 14px rgba(0,0,0,0.5)',
              }}
            >
              18-Month Aged Sharp Cheddar Blanket
            </div>
            <div
              style={{
                width: '40px',
                height: '1px',
                background: 'linear-gradient(to left, rgba(241, 196, 15, 0.6), transparent)',
              }}
            />
          </div>

          <div
            style={{
              position: 'absolute',
              bottom: '24%',
              right: '10%',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              flexDirection: 'row-reverse',
            }}
          >
            <div
              style={{
                background: 'rgba(20, 16, 13, 0.88)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(230, 126, 34, 0.4)',
                padding: '6px 14px',
                borderRadius: '6px',
                fontSize: '12px',
                fontWeight: 600,
                color: '#e67e22',
                boxShadow: '0 4px 14px rgba(0,0,0,0.5)',
              }}
            >
              45-Day Dry-Aged Smashed Patty
            </div>
            <div
              style={{
                width: '40px',
                height: '1px',
                background: 'linear-gradient(to left, rgba(230, 126, 34, 0.6), transparent)',
              }}
            />
          </div>

          <div
            style={{
              position: 'absolute',
              bottom: '14%',
              left: '12%',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
            }}
          >
            <div
              style={{
                background: 'rgba(20, 16, 13, 0.88)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(231, 76, 60, 0.4)',
                padding: '6px 14px',
                borderRadius: '6px',
                fontSize: '12px',
                fontWeight: 600,
                color: '#e74c3c',
                boxShadow: '0 4px 14px rgba(0,0,0,0.5)',
              }}
            >
              Applewood Smoked Bacon & Amber Sauce
            </div>
            <div
              style={{
                width: '40px',
                height: '1px',
                background: 'linear-gradient(to right, rgba(231, 76, 60, 0.6), transparent)',
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};
