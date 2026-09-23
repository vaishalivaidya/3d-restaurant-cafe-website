import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';

export interface CinematicCulinary3DProps {
  step: number; // 1 to 5
  interactive?: boolean;
  className?: string;
  onStepChange?: (step: number) => void;
}

export const CinematicCulinary3D: React.FC<CinematicCulinary3DProps> = ({
  step = 1,
  interactive = true,
  className = '',
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [webglSupported, setWebglSupported] = useState<boolean>(true);
  const stepRef = useRef(step);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0, isDown: false, lastX: 0, rotY: 0 });

  useEffect(() => {
    stepRef.current = step;
  }, [step]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Check WebGL availability
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

    const width = container.clientWidth || 640;
    const height = container.clientHeight || 580;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 50);
    camera.position.set(0, 0.4, 5.0);

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // ========================================================
    // PROCEDURAL TEXTURES (PBR Food Details)
    // ========================================================
    const createBunTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 1024;
      canvas.height = 1024;
      const ctx = canvas.getContext('2d')!;

      const grad = ctx.createRadialGradient(512, 512, 80, 512, 512, 512);
      grad.addColorStop(0, '#e58e38');
      grad.addColorStop(0.45, '#c56b20');
      grad.addColorStop(0.8, '#914211');
      grad.addColorStop(1, '#5a2205');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 1024, 1024);

      // Micro flour and butter pores
      for (let i = 0; i < 6000; i++) {
        const x = Math.random() * 1024;
        const y = Math.random() * 1024;
        const r = Math.random() * 2 + 0.5;
        ctx.fillStyle = Math.random() > 0.5 ? 'rgba(255, 235, 200, 0.14)' : 'rgba(70, 25, 5, 0.1)';
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
      }
      return new THREE.CanvasTexture(canvas);
    };

    const createPattyTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 1024;
      canvas.height = 1024;
      const ctx = canvas.getContext('2d')!;

      ctx.fillStyle = '#2c150c';
      ctx.fillRect(0, 0, 1024, 1024);

      // Craggy meat texture
      for (let i = 0; i < 10000; i++) {
        const x = Math.random() * 1024;
        const y = Math.random() * 1024;
        const r = Math.random() * 3 + 1;
        const tone = Math.floor(Math.random() * 45);
        ctx.fillStyle = `rgb(${40 + tone}, ${18 + Math.floor(tone * 0.4)}, ${8 + Math.floor(tone * 0.3)})`;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
      }

      // Hot cast-iron grill sear marks
      ctx.strokeStyle = 'rgba(15, 8, 4, 0.88)';
      ctx.lineWidth = 18;
      ctx.lineCap = 'round';
      for (let x = -400; x < 1500; x += 110) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x + 450, 1024);
        ctx.stroke();
      }
      return new THREE.CanvasTexture(canvas);
    };

    const createTomatoTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 512;
      canvas.height = 512;
      const ctx = canvas.getContext('2d')!;

      ctx.fillStyle = '#d32f2f';
      ctx.fillRect(0, 0, 512, 512);

      // Inner pulp segments
      const cx = 256;
      const cy = 256;
      const numSegments = 5;
      for (let i = 0; i < numSegments; i++) {
        const angle = (i * Math.PI * 2) / numSegments;
        const sx = cx + Math.cos(angle) * 110;
        const sy = cy + Math.sin(angle) * 110;

        ctx.fillStyle = '#8b1313';
        ctx.beginPath();
        ctx.arc(sx, sy, 45, 0, Math.PI * 2);
        ctx.fill();

        // Seeds inside cavity
        ctx.fillStyle = '#fbc02d';
        ctx.beginPath();
        ctx.arc(sx - 10, sy - 8, 5, 0, Math.PI * 2);
        ctx.arc(sx + 10, sy + 6, 4.5, 0, Math.PI * 2);
        ctx.fill();
      }
      return new THREE.CanvasTexture(canvas);
    };

    const bunTex = createBunTexture();
    const pattyTex = createPattyTexture();
    const tomatoTex = createTomatoTexture();

    // ========================================================
    // LIGHTING (Cinematic 3-Point Warm Hearth Setup)
    // ========================================================
    const ambientLight = new THREE.AmbientLight(0xffeedd, 1.2);
    scene.add(ambientLight);

    // Warm Key Light (Golden Butter & Toasted Brioche)
    const keyLight = new THREE.DirectionalLight(0xffa726, 3.2);
    keyLight.position.set(4, 5, 4);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 2048;
    keyLight.shadow.mapSize.height = 2048;
    keyLight.shadow.bias = -0.001;
    scene.add(keyLight);

    // Cool Soft Fill Light
    const fillLight = new THREE.DirectionalLight(0xffffff, 1.4);
    fillLight.position.set(-4, 2, 3);
    scene.add(fillLight);

    // Fiery Hearth Rim Light (Separates burger from dark background)
    const rimLight = new THREE.DirectionalLight(0xff5722, 4.5);
    rimLight.position.set(0, 3, -4);
    scene.add(rimLight);

    // Under-Glow Fire Accent
    const hearthGlow = new THREE.PointLight(0xff6f00, 2.5, 6);
    hearthGlow.position.set(0, -1.8, 0.5);
    scene.add(hearthGlow);

    // ========================================================
    // BURGER MESH COMPONENTS
    // ========================================================
    const burgerGroup = new THREE.Group();
    scene.add(burgerGroup);

    // 1. TOP BRIOCHE CROWN
    const topBunGeo = new THREE.SphereGeometry(1.4, 48, 32, 0, Math.PI * 2, 0, Math.PI * 0.44);
    topBunGeo.scale(1, 0.56, 1);
    const topBunMat = new THREE.MeshPhysicalMaterial({
      map: bunTex,
      color: 0xffffff,
      roughness: 0.35,
      clearcoat: 0.45,
      clearcoatRoughness: 0.25,
      reflectivity: 0.7,
    });
    const topBunMesh = new THREE.Mesh(topBunGeo, topBunMat);
    topBunMesh.castShadow = true;

    // Sesame Seeds on Top Bun
    const seedGeo = new THREE.ConeGeometry(0.022, 0.055, 6);
    seedGeo.rotateX(Math.PI / 2);
    const seedMat = new THREE.MeshStandardMaterial({
      color: 0xfffae8,
      roughness: 0.3,
    });
    const seedInst = new THREE.InstancedMesh(seedGeo, seedMat, 75);
    const dummy = new THREE.Object3D();
    for (let i = 0; i < 75; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0) * 0.36; // Keep in upper crown
      const r = 1.39;
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.cos(phi) * 0.56 + 0.01;
      const z = r * Math.sin(phi) * Math.sin(theta);
      dummy.position.set(x, y, z);
      dummy.lookAt(x * 1.5, y * 1.5, z * 1.5);
      dummy.updateMatrix();
      seedInst.setMatrixAt(i, dummy.matrix);
    }
    seedInst.instanceMatrix.needsUpdate = true;
    topBunMesh.add(seedInst);
    burgerGroup.add(topBunMesh);

    // 2. MOLTEN AGED CHEDDAR
    const cheeseShape = new THREE.Shape();
    const cSize = 1.35;
    cheeseShape.moveTo(-cSize, -cSize);
    cheeseShape.lineTo(cSize, -cSize);
    cheeseShape.lineTo(cSize, cSize);
    cheeseShape.lineTo(-cSize, cSize);
    cheeseShape.closePath();
    const cheeseGeo = new THREE.ExtrudeGeometry(cheeseShape, {
      depth: 0.04,
      bevelEnabled: true,
      bevelSegments: 4,
      steps: 1,
      bevelSize: 0.02,
      bevelThickness: 0.02,
    });
    cheeseGeo.rotateX(Math.PI / 2);

    // Deform cheese corners downward like molten draping
    const posAttr = cheeseGeo.attributes.position;
    for (let i = 0; i < posAttr.count; i++) {
      const x = posAttr.getX(i);
      const z = posAttr.getZ(i);
      const dist = Math.sqrt(x * x + z * z);
      if (dist > 1.0) {
        posAttr.setY(i, posAttr.getY(i) - (dist - 1.0) * 0.38);
      }
    }
    cheeseGeo.computeVertexNormals();

    const cheeseMat = new THREE.MeshPhysicalMaterial({
      color: 0xf59e0b,
      roughness: 0.22,
      clearcoat: 0.65,
      clearcoatRoughness: 0.15,
      metalness: 0.02,
    });
    const cheeseMesh = new THREE.Mesh(cheeseGeo, cheeseMat);
    cheeseMesh.castShadow = true;
    burgerGroup.add(cheeseMesh);

    // 3. CHARRED WAGYU SMASH PATTY
    const pattyGeo = new THREE.CylinderGeometry(1.36, 1.4, 0.32, 48);
    // Add craggy smash perimeter irregularities
    const pPos = pattyGeo.attributes.position;
    for (let i = 0; i < pPos.count; i++) {
      const y = pPos.getY(i);
      if (Math.abs(y) < 0.14) {
        const noise = (Math.sin(pPos.getX(i) * 12) + Math.cos(pPos.getZ(i) * 12)) * 0.04;
        pPos.setX(i, pPos.getX(i) * (1 + noise));
        pPos.setZ(i, pPos.getZ(i) * (1 + noise));
      }
    }
    pattyGeo.computeVertexNormals();

    const pattyMat = new THREE.MeshPhysicalMaterial({
      map: pattyTex,
      color: 0x5a301e,
      roughness: 0.68,
      metalness: 0.05,
      clearcoat: 0.25,
      clearcoatRoughness: 0.3,
    });
    const pattyMesh = new THREE.Mesh(pattyGeo, pattyMat);
    pattyMesh.castShadow = true;
    pattyMesh.receiveShadow = true;
    burgerGroup.add(pattyMesh);

    // 4. RED ONION RINGS
    const onionGroup = new THREE.Group();
    const onionMat = new THREE.MeshPhysicalMaterial({
      color: 0x880e4f,
      roughness: 0.25,
      clearcoat: 0.5,
      clearcoatRoughness: 0.2,
    });
    for (let i = 0; i < 3; i++) {
      const rInner = 0.55 + i * 0.28;
      const rOuter = rInner + 0.12;
      const ringGeo = new THREE.RingGeometry(rInner, rOuter, 36);
      ringGeo.rotateX(-Math.PI / 2);
      const ringMesh = new THREE.Mesh(ringGeo, onionMat);
      ringMesh.position.set((i - 1) * 0.15, 0, (i % 2 === 0 ? 0.1 : -0.1));
      ringMesh.rotation.z = i * 0.4;
      onionGroup.add(ringMesh);
    }
    burgerGroup.add(onionGroup);

    // 5. JUICY BEEFSTEAK TOMATOES
    const tomatoGroup = new THREE.Group();
    const tomatoGeo = new THREE.CylinderGeometry(0.85, 0.85, 0.16, 36);
    const tomatoMat = new THREE.MeshPhysicalMaterial({
      map: tomatoTex,
      color: 0xee2c2c,
      roughness: 0.15,
      clearcoat: 0.95,
      clearcoatRoughness: 0.08,
      transmission: 0.08,
    });
    const t1 = new THREE.Mesh(tomatoGeo, tomatoMat);
    t1.position.set(-0.45, 0, 0.1);
    t1.rotation.y = 0.3;
    t1.rotation.z = 0.05;
    t1.castShadow = true;
    const t2 = new THREE.Mesh(tomatoGeo, tomatoMat);
    t2.position.set(0.48, 0, -0.1);
    t2.rotation.y = -0.4;
    t2.rotation.z = -0.06;
    t2.castShadow = true;
    tomatoGroup.add(t1);
    tomatoGroup.add(t2);
    burgerGroup.add(tomatoGroup);

    // 6. FRESH RUFFLED HEIRLOOM LETTUCE
    const lettuceGeo = new THREE.PlaneGeometry(2.6, 2.6, 32, 32);
    lettuceGeo.rotateX(-Math.PI / 2);
    const lPos = lettuceGeo.attributes.position;
    for (let i = 0; i < lPos.count; i++) {
      const x = lPos.getX(i);
      const z = lPos.getZ(i);
      const r = Math.sqrt(x * x + z * z);
      // Ruffled wavy curling edge
      const wave = Math.sin(x * 9) * Math.cos(z * 9) * 0.14;
      const droop = r > 0.9 ? -(r - 0.9) * 0.35 : 0;
      lPos.setY(i, wave + droop);
    }
    lettuceGeo.computeVertexNormals();

    const lettuceMat = new THREE.MeshPhysicalMaterial({
      color: 0x388e3c,
      roughness: 0.32,
      transmission: 0.15,
      clearcoat: 0.4,
      clearcoatRoughness: 0.3,
      side: THREE.DoubleSide,
    });
    const lettuceMesh = new THREE.Mesh(lettuceGeo, lettuceMat);
    lettuceMesh.castShadow = true;
    burgerGroup.add(lettuceMesh);

    // 7. BOTTOM TOASTED BRIOCHE HEEL
    const bBunGeo = new THREE.CylinderGeometry(1.36, 1.3, 0.4, 48);
    const bBunMat = new THREE.MeshPhysicalMaterial({
      map: bunTex,
      color: 0xffffff,
      roughness: 0.45,
      clearcoat: 0.35,
    });
    const bottomBunMesh = new THREE.Mesh(bBunGeo, bBunMat);
    bottomBunMesh.castShadow = true;
    bottomBunMesh.receiveShadow = true;
    burgerGroup.add(bottomBunMesh);

    // 8. CAST IRON SEARING PLATE (Active in Step 2)
    const plateGeo = new THREE.CylinderGeometry(2.2, 2.3, 0.18, 48);
    const plateMat = new THREE.MeshStandardMaterial({
      color: 0x181513,
      roughness: 0.85,
      metalness: 0.8,
    });
    const castIronPlate = new THREE.Mesh(plateGeo, plateMat);
    castIronPlate.position.set(0, -1.2, 0);
    castIronPlate.receiveShadow = true;

    // Glowing searing grill marks on the cast iron
    const grillGrateGeo = new THREE.RingGeometry(0.2, 2.0, 36);
    grillGrateGeo.rotateX(-Math.PI / 2);
    const grillGrateMat = new THREE.MeshBasicMaterial({
      color: 0xff5722,
      transparent: true,
      opacity: 0.45,
    });
    const grillGlow = new THREE.Mesh(grillGrateGeo, grillGrateMat);
    grillGlow.position.y = 0.1;
    castIronPlate.add(grillGlow);
    scene.add(castIronPlate);

    // ========================================================
    // STEAM & SIZZLE PARTICLES
    // ========================================================
    const steamCount = 36;
    const steamGeo = new THREE.BufferGeometry();
    const steamPositions = new Float32Array(steamCount * 3);
    const steamOpacities = new Float32Array(steamCount);
    const steamSpeeds = new Float32Array(steamCount);

    for (let i = 0; i < steamCount; i++) {
      steamPositions[i * 3 + 0] = (Math.random() - 0.5) * 1.5;
      steamPositions[i * 3 + 1] = 0.2 + Math.random() * 1.8;
      steamPositions[i * 3 + 2] = (Math.random() - 0.5) * 1.5;
      steamOpacities[i] = Math.random() * 0.4;
      steamSpeeds[i] = 0.008 + Math.random() * 0.012;
    }
    steamGeo.setAttribute('position', new THREE.BufferAttribute(steamPositions, 3));

    // Particle Canvas Texture
    const steamCanvas = document.createElement('canvas');
    steamCanvas.width = 64;
    steamCanvas.height = 64;
    const sCtx = steamCanvas.getContext('2d')!;
    const sGrad = sCtx.createRadialGradient(32, 32, 4, 32, 32, 32);
    sGrad.addColorStop(0, 'rgba(255, 240, 220, 0.85)');
    sGrad.addColorStop(0.5, 'rgba(230, 210, 190, 0.35)');
    sGrad.addColorStop(1, 'rgba(200, 180, 160, 0)');
    sCtx.fillStyle = sGrad;
    sCtx.fillRect(0, 0, 64, 64);
    const steamTex = new THREE.CanvasTexture(steamCanvas);

    const steamMat = new THREE.PointsMaterial({
      size: 0.42,
      map: steamTex,
      transparent: true,
      opacity: 0.35,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const steamPoints = new THREE.Points(steamGeo, steamMat);
    scene.add(steamPoints);

    // ========================================================
    // INTERACTION LISTENERS (Mouse subtle orbit)
    // ========================================================
    const onMouseDown = (e: MouseEvent) => {
      mouseRef.current.isDown = true;
      mouseRef.current.lastX = e.clientX;
    };
    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / height) * 2 - 1);
      mouseRef.current.targetX = x * 0.35;
      mouseRef.current.targetY = y * 0.2;

      if (mouseRef.current.isDown) {
        const delta = e.clientX - mouseRef.current.lastX;
        mouseRef.current.rotY += delta * 0.01;
        mouseRef.current.lastX = e.clientX;
      }
    };
    const onMouseUp = () => {
      mouseRef.current.isDown = false;
    };

    if (interactive) {
      container.addEventListener('mousedown', onMouseDown);
      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', onMouseUp);
    }

    // ========================================================
    // ANIMATION & STEP TARGET COORDINATES
    // ========================================================
    let reqId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      reqId = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();
      const currentStep = stepRef.current;

      // Smooth mouse lerp
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.08;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.08;

      // Base rotation from user drag + gentle idle spin
      const idleSpin = currentStep === 5 ? time * 0.25 : time * 0.15;
      burgerGroup.rotation.y = mouseRef.current.rotY + idleSpin + mouseRef.current.x;
      burgerGroup.rotation.x = mouseRef.current.y * 0.5;

      // Target positions per step
      let topBunY = 0.65;
      let cheeseY = 0.35;
      let pattyY = 0.18;
      let onionY = 0.02;
      let tomatoY = -0.16;
      let lettuceY = -0.36;
      let bottomBunY = -0.68;

      let camZ = 5.0;
      let camY = 0.4;
      let camX = 0;
      let plateY = -5.0; // Hidden by default
      let steamTargetOpacity = 0.3;
      let hearthGlowIntensity = 2.0;

      // Step-specific choreography
      if (currentStep === 1) {
        // STEP 01: FRESH INGREDIENTS (Floating in zero gravity space)
        const float1 = Math.sin(time * 2.0) * 0.08;
        const float2 = Math.cos(time * 1.8) * 0.08;
        const float3 = Math.sin(time * 2.2 + 1) * 0.08;

        topBunY = 1.75 + float1;
        cheeseY = 1.15 + float2;
        pattyY = 0.55 + float3;
        onionY = 0.05 + float1;
        tomatoY = -0.45 + float2;
        lettuceY = -1.05 + float3;
        bottomBunY = -1.75 + float1;

        camZ = 5.4;
        camY = 0.3;
        steamTargetOpacity = 0.12;
      } else if (currentStep === 2) {
        // STEP 02: SEARING OVER FIRE & CAST IRON
        // Searing plate appears, patty is centered on cast iron with sizzle
        plateY = -0.45;
        pattyY = -0.25;
        // Other layers float up/away to focus on the searing patty
        topBunY = 3.5;
        cheeseY = 3.0;
        onionY = 2.5;
        tomatoY = 2.0;
        lettuceY = -3.0;
        bottomBunY = -3.5;

        // Dynamic low camera angle
        camZ = 4.2;
        camY = 0.8;
        camX = 0.3;
        steamTargetOpacity = 0.85; // Heavy sizzle smoke
        hearthGlowIntensity = 4.5 + Math.sin(time * 12) * 1.5; // Flickering fire
        grillGlow.material.opacity = 0.65 + Math.sin(time * 8) * 0.25;
      } else if (currentStep === 3) {
        // STEP 03: LAYER-BY-LAYER ASSEMBLY
        // Layers are in balanced assembly explosion
        topBunY = 1.25;
        cheeseY = 0.75;
        pattyY = 0.42;
        onionY = 0.15;
        tomatoY = -0.12;
        lettuceY = -0.42;
        bottomBunY = -0.85;

        camZ = 4.8;
        camY = 0.5;
        camX = -0.2;
        steamTargetOpacity = 0.35;
      } else if (currentStep === 4) {
        // STEP 04: MELT & GLAZE (Close-up camera on melting cheese & glossy patty)
        topBunY = 0.72;
        cheeseY = 0.34;
        pattyY = 0.16;
        onionY = -0.02;
        tomatoY = -0.18;
        lettuceY = -0.38;
        bottomBunY = -0.7;

        // Macro food commercial angle
        camZ = 3.5;
        camY = 0.25;
        camX = 0.35;
        steamTargetOpacity = 0.7; // Thick melting steam
      } else if (currentStep === 5) {
        // STEP 05: SERVED HOT TO TABLE
        // Full, compact artisan burger
        topBunY = 0.58;
        cheeseY = 0.32;
        pattyY = 0.15;
        onionY = -0.02;
        tomatoY = -0.18;
        lettuceY = -0.36;
        bottomBunY = -0.68;

        // Hero push-in camera
        camZ = 4.3 - Math.sin(time * 0.4) * 0.3;
        camY = 0.3;
        camX = 0;
        steamTargetOpacity = 0.4;
      }

      // Smooth position lerping for all food meshes
      const lerpSpeed = 0.085;
      topBunMesh.position.y += (topBunY - topBunMesh.position.y) * lerpSpeed;
      cheeseMesh.position.y += (cheeseY - cheeseMesh.position.y) * lerpSpeed;
      pattyMesh.position.y += (pattyY - pattyMesh.position.y) * lerpSpeed;
      onionGroup.position.y += (onionY - onionGroup.position.y) * lerpSpeed;
      tomatoGroup.position.y += (tomatoY - tomatoGroup.position.y) * lerpSpeed;
      lettuceMesh.position.y += (lettuceY - lettuceMesh.position.y) * lerpSpeed;
      bottomBunMesh.position.y += (bottomBunY - bottomBunMesh.position.y) * lerpSpeed;

      // Cast iron plate lerp
      castIronPlate.position.y += (plateY - castIronPlate.position.y) * lerpSpeed;

      // Camera lerp
      camera.position.z += (camZ - camera.position.z) * 0.06;
      camera.position.y += (camY - camera.position.y) * 0.06;
      camera.position.x += (camX - camera.position.x) * 0.06;
      camera.lookAt(0, currentStep === 2 ? 0.0 : 0.1, 0);

      // Light & Steam lerp
      hearthGlow.intensity += (hearthGlowIntensity - hearthGlow.intensity) * 0.1;
      steamMat.opacity += (steamTargetOpacity - steamMat.opacity) * 0.08;

      // Animate Steam Particles rising
      const sPositions = steamGeo.attributes.position.array as Float32Array;
      for (let i = 0; i < steamCount; i++) {
        sPositions[i * 3 + 1] += steamSpeeds[i] * (currentStep === 2 ? 2.5 : 1.0);
        sPositions[i * 3 + 0] += Math.sin(time * 3 + i) * 0.002;
        if (sPositions[i * 3 + 1] > 2.6) {
          sPositions[i * 3 + 1] = currentStep === 2 ? -0.2 : 0.1;
          sPositions[i * 3 + 0] = (Math.random() - 0.5) * 1.3;
          sPositions[i * 3 + 2] = (Math.random() - 0.5) * 1.3;
        }
      }
      steamGeo.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const newW = container.clientWidth || 640;
      const newH = container.clientHeight || 580;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(reqId);
      window.removeEventListener('resize', handleResize);
      if (interactive) {
        container.removeEventListener('mousedown', onMouseDown);
        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('mouseup', onMouseUp);
      }
      renderer.dispose();
      topBunGeo.dispose();
      topBunMat.dispose();
      cheeseGeo.dispose();
      cheeseMat.dispose();
      pattyGeo.dispose();
      pattyMat.dispose();
      lettuceGeo.dispose();
      lettuceMat.dispose();
      bBunGeo.dispose();
      bBunMat.dispose();
      steamGeo.dispose();
      steamMat.dispose();
    };
  }, [interactive]);

  if (!webglSupported) {
    return (
      <div
        className={className}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '480px',
          color: 'var(--text-muted)',
        }}
      >
        <img
          src="/assets/burger_pin/burger_poster.jpg"
          alt="Artisan Burger Story"
          style={{ maxHeight: '100%', objectFit: 'contain' }}
        />
      </div>
    );
  }

  return (
    <div
      ref={mountRef}
      className={className}
      style={{
        width: '100%',
        height: '100%',
        minHeight: '480px',
        position: 'relative',
        cursor: interactive ? 'grab' : 'default',
        touchAction: 'none',
      }}
    />
  );
};
