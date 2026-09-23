import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import {
  getBunTexture,
  getPattyTexture,
  getTomatoTexture,
  getMeltedCheeseTexture,
} from './FoodMaterials';

interface Burger3DProps {
  mode?: 'hero' | 'story' | 'signature';
  step?: number; // 1 to 5 for story mode
  interactive?: boolean;
  explodedOffset?: number; // 0 (assembled) to 1 (fully exploded)
  className?: string;
  showLabels?: boolean;
}

export const Burger3D: React.FC<Burger3DProps> = ({
  mode = 'hero',
  step = 5,
  interactive = true,
  explodedOffset = 0,
  className = '',
  showLabels = false,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [webglSupported, setWebglSupported] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  // References for animation loop
  const animStateRef = useRef({
    step,
    explodedOffset,
    mouseX: 0,
    mouseY: 0,
    targetMouseX: 0,
    targetMouseY: 0,
  });

  useEffect(() => {
    animStateRef.current.step = step;
    animStateRef.current.explodedOffset = explodedOffset;
  }, [step, explodedOffset]);

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

    const width = container.clientWidth || 600;
    const height = container.clientHeight || 500;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0.8, 5.2);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.appendChild(renderer.domElement);

    // Group containers
    const burgerGroup = new THREE.Group();
    scene.add(burgerGroup);

    const floatingGroup = new THREE.Group();
    scene.add(floatingGroup);

    // Three-point Studio Lighting (Skill Guidelines)
    // Key Light: Warm golden light
    const keyLight = new THREE.DirectionalLight('#ffddaa', 3.2);
    keyLight.position.set(4, 6, 4);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    scene.add(keyLight);

    // Fill Light: Soft ambient light
    const fillLight = new THREE.DirectionalLight('#99bbdd', 1.2);
    fillLight.position.set(-4, 2, 2);
    scene.add(fillLight);

    // Rim Light: Sharp highlight from behind
    const rimLight = new THREE.DirectionalLight('#e67e22', 4.0);
    rimLight.position.set(0, 4, -4.5);
    scene.add(rimLight);

    // Ambient light
    const ambientLight = new THREE.AmbientLight('#2a1e17', 1.8);
    scene.add(ambientLight);

    // Ember Underglow (for grill mode & ambience)
    const emberLight = new THREE.PointLight('#e67e22', 3.0, 6);
    emberLight.position.set(0, -1.8, 0);
    scene.add(emberLight);

    // Soft Contact Shadow Plane underneath
    const shadowGeo = new THREE.PlaneGeometry(5, 5);
    const shadowMat = new THREE.ShadowMaterial({ opacity: 0.35 });
    const shadowPlane = new THREE.Mesh(shadowGeo, shadowMat);
    shadowPlane.rotation.x = -Math.PI / 2;
    shadowPlane.position.y = -1.3;
    shadowPlane.receiveShadow = true;
    scene.add(shadowPlane);

    // Shared Materials with procedural PBR textures
    const bunTex = getBunTexture();
    const pattyTex = getPattyTexture();
    const tomatoTex = getTomatoTexture();
    const cheeseTex = getMeltedCheeseTexture();

    const bunMat = new THREE.MeshStandardMaterial({
      map: bunTex,
      roughness: 0.38,
      metalness: 0.05,
      bumpMap: bunTex,
      bumpScale: 0.03,
    });

    const pattyMat = new THREE.MeshStandardMaterial({
      map: pattyTex,
      roughness: 0.65,
      metalness: 0.1,
      bumpMap: pattyTex,
      bumpScale: 0.08,
    });

    const cheeseMat = new THREE.MeshStandardMaterial({
      map: cheeseTex,
      roughness: 0.22,
      metalness: 0.02,
      color: '#f5b041',
      emissive: '#d35400',
      emissiveIntensity: 0.1,
    });

    const tomatoMat = new THREE.MeshStandardMaterial({
      map: tomatoTex,
      roughness: 0.2,
      metalness: 0.05,
    });

    const lettuceMat = new THREE.MeshStandardMaterial({
      color: '#27ae60',
      roughness: 0.45,
      metalness: 0.02,
      side: THREE.DoubleSide,
    });

    const sauceMat = new THREE.MeshStandardMaterial({
      color: '#c0392b',
      roughness: 0.1,
      metalness: 0.15,
    });

    // 1. Bottom Bun (Rounded cylinder with soft bevel)
    const bottomBunGeo = new THREE.CylinderGeometry(1.22, 1.15, 0.42, 40);
    const bottomBun = new THREE.Mesh(bottomBunGeo, bunMat);
    bottomBun.castShadow = true;
    bottomBun.receiveShadow = true;
    bottomBun.position.y = -0.7;

    // 2. Bottom Sauce Layer
    const sauceGeo = new THREE.CylinderGeometry(1.15, 1.15, 0.08, 32);
    const sauceLayer = new THREE.Mesh(sauceGeo, sauceMat);
    sauceLayer.position.y = -0.46;

    // 3. Crisp Lettuce Layer (Ruffled wavy geometry)
    const lettuceGroup = new THREE.Group();
    const numLeaves = 8;
    for (let i = 0; i < numLeaves; i++) {
      const leafGeo = new THREE.ConeGeometry(0.7, 0.2, 5);
      const leaf = new THREE.Mesh(leafGeo, lettuceMat);
      const angle = (i * Math.PI * 2) / numLeaves;
      leaf.position.set(Math.cos(angle) * 1.05, 0, Math.sin(angle) * 1.05);
      leaf.rotation.x = Math.PI / 2 + (Math.random() - 0.5) * 0.4;
      leaf.rotation.z = angle + Math.PI / 2;
      leaf.scale.set(1.4, 0.4, 1.2);
      leaf.castShadow = true;
      lettuceGroup.add(leaf);
    }
    lettuceGroup.position.y = -0.36;

    // 4. Tomato Slices (2 overlapping juicy slices)
    const tomatoGroup = new THREE.Group();
    const tomatoGeo = new THREE.CylinderGeometry(0.68, 0.68, 0.11, 24);
    const tomato1 = new THREE.Mesh(tomatoGeo, tomatoMat);
    tomato1.position.set(-0.35, 0, 0.1);
    tomato1.rotation.y = 0.4;
    tomato1.castShadow = true;

    const tomato2 = new THREE.Mesh(tomatoGeo, tomatoMat);
    tomato2.position.set(0.35, 0.02, -0.05);
    tomato2.rotation.y = -0.5;
    tomato2.castShadow = true;

    tomatoGroup.add(tomato1, tomato2);
    tomatoGroup.position.y = -0.22;

    // 5. Melted Cheese (Curved draped square with dripping corners)
    const cheeseGeo = new THREE.BoxGeometry(1.68, 0.06, 1.68, 6, 1, 6);
    // Displace corners downwards for realistic melt drip
    const posAttr = cheeseGeo.attributes.position;
    for (let i = 0; i < posAttr.count; i++) {
      const x = posAttr.getX(i);
      const z = posAttr.getZ(i);
      const distFromCenter = Math.sqrt(x * x + z * z);
      if (distFromCenter > 0.9) {
        posAttr.setY(i, posAttr.getY(i) - (distFromCenter - 0.8) * 0.35);
      }
    }
    cheeseGeo.computeVertexNormals();
    const cheese = new THREE.Mesh(cheeseGeo, cheeseMat);
    cheese.rotation.y = Math.PI / 4;
    cheese.position.y = -0.08;
    cheese.castShadow = true;

    // 6. Charred Grilled Beef Patty
    const pattyGeo = new THREE.CylinderGeometry(1.3, 1.34, 0.46, 36);
    const patty = new THREE.Mesh(pattyGeo, pattyMat);
    patty.castShadow = true;
    patty.receiveShadow = true;
    patty.position.y = 0.12;

    // 7. Top Bun Dome
    const topBunGeo = new THREE.SphereGeometry(1.32, 40, 24, 0, Math.PI * 2, 0, Math.PI * 0.52);
    topBunGeo.scale(1, 0.68, 1);
    const topBun = new THREE.Mesh(topBunGeo, bunMat);
    topBun.castShadow = true;
    topBun.receiveShadow = true;
    topBun.position.y = 0.38;

    // 8. Toasted Sesame Seeds on top bun
    const seedGeo = new THREE.ConeGeometry(0.024, 0.06, 4);
    const seedMat = new THREE.MeshStandardMaterial({
      color: '#fdf5e6',
      roughness: 0.3,
    });
    const seedsGroup = new THREE.Group();
    const numSeeds = 90;
    for (let i = 0; i < numSeeds; i++) {
      const phi = Math.random() * Math.PI * 0.38;
      const theta = Math.random() * Math.PI * 2;
      const r = 1.32;
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * 0.68 * Math.cos(phi);
      const z = r * Math.sin(phi) * Math.sin(theta);

      const seed = new THREE.Mesh(seedGeo, seedMat);
      seed.position.set(x, y, z);
      seed.lookAt(x * 1.5, y * 1.5, z * 1.5);
      seedsGroup.add(seed);
    }
    topBun.add(seedsGroup);

    // Assembly of burger layers
    burgerGroup.add(bottomBun);
    burgerGroup.add(sauceLayer);
    burgerGroup.add(lettuceGroup);
    burgerGroup.add(tomatoGroup);
    burgerGroup.add(cheese);
    burgerGroup.add(patty);
    burgerGroup.add(topBun);

    // Floating Ambient Ingredients around the Burger (hero mode)
    const floaters: { mesh: THREE.Mesh | THREE.Group; speed: number; rotX: number; rotY: number; baseY: number }[] = [];
    if (mode === 'hero' || mode === 'signature') {
      // Floating onion ring
      const onionGeo = new THREE.TorusGeometry(0.45, 0.06, 12, 28);
      const onionMat = new THREE.MeshStandardMaterial({ color: '#8e44ad', roughness: 0.3 });
      const onion = new THREE.Mesh(onionGeo, onionMat);
      onion.position.set(-2.2, 0.8, -0.6);
      floatingGroup.add(onion);
      floaters.push({ mesh: onion, speed: 0.8, rotX: 0.01, rotY: 0.015, baseY: 0.8 });

      // Floating crisp lettuce leaf
      const floatLettuce = new THREE.Mesh(new THREE.ConeGeometry(0.5, 0.15, 5), lettuceMat);
      floatLettuce.position.set(2.4, 0.5, -0.3);
      floatLettuce.scale.set(1.5, 0.3, 1.2);
      floatingGroup.add(floatLettuce);
      floaters.push({ mesh: floatLettuce, speed: 1.1, rotX: 0.012, rotY: 0.008, baseY: 0.5 });

      // Floating tomato slice
      const floatTomato = new THREE.Mesh(tomatoGeo, tomatoMat);
      floatTomato.position.set(-2.0, -0.6, 0.5);
      floatTomato.rotation.x = 0.5;
      floatingGroup.add(floatTomato);
      floaters.push({ mesh: floatTomato, speed: 0.9, rotX: 0.009, rotY: 0.014, baseY: -0.6 });

      // Floating pickle slice
      const pickleGeo = new THREE.CylinderGeometry(0.4, 0.4, 0.09, 20);
      const pickleMat = new THREE.MeshStandardMaterial({ color: '#27ae60', roughness: 0.35 });
      const pickle = new THREE.Mesh(pickleGeo, pickleMat);
      pickle.position.set(2.2, -0.7, 0.4);
      pickle.rotation.z = 0.4;
      floatingGroup.add(pickle);
      floaters.push({ mesh: pickle, speed: 1.2, rotX: 0.015, rotY: 0.01, baseY: -0.7 });
    }

    // Grill mesh for story Step 2
    const grillGroup = new THREE.Group();
    const grillMat = new THREE.MeshStandardMaterial({
      color: '#1a1a1a',
      metalness: 0.9,
      roughness: 0.25,
    });
    for (let g = -1.8; g <= 1.8; g += 0.28) {
      const grateGeo = new THREE.CylinderGeometry(0.035, 0.035, 3.8, 12);
      const grate = new THREE.Mesh(grateGeo, grillMat);
      grate.rotation.z = Math.PI / 2;
      grate.position.set(0, -0.4, g);
      grillGroup.add(grate);
    }
    grillGroup.visible = false;
    scene.add(grillGroup);

    // Hot Sizzle Particles for grill (smoke / steam)
    const particleCount = 45;
    const particleGeo = new THREE.BufferGeometry();
    const particlePos = new Float32Array(particleCount * 3);
    for (let p = 0; p < particleCount; p++) {
      particlePos[p * 3] = (Math.random() - 0.5) * 2;
      particlePos[p * 3 + 1] = -0.3 + Math.random() * 2;
      particlePos[p * 3 + 2] = (Math.random() - 0.5) * 2;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePos, 3));
    const particleMat = new THREE.PointsMaterial({
      color: '#e67e22',
      size: 0.08,
      transparent: true,
      opacity: 0.5,
      blending: THREE.AdditiveBlending,
    });
    const steamParticles = new THREE.Points(particleGeo, particleMat);
    steamParticles.visible = false;
    scene.add(steamParticles);

    // Mouse movement interaction handlers
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      animStateRef.current.targetMouseX = x;
      animStateRef.current.targetMouseY = y;
    };

    container.addEventListener('mousemove', handleMouseMove);

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

    // Animation Render Loop
    let clock = new THREE.Clock();
    let animFrameId: number;

    const animate = () => {
      animFrameId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Smooth mouse damping (cubic interpolation)
      animStateRef.current.mouseX += (animStateRef.current.targetMouseX - animStateRef.current.mouseX) * 0.05;
      animStateRef.current.mouseY += (animStateRef.current.targetMouseY - animStateRef.current.mouseY) * 0.05;

      const mX = animStateRef.current.mouseX;
      const mY = animStateRef.current.mouseY;
      const currentStep = animStateRef.current.step;
      const currentExploded = animStateRef.current.explodedOffset;

      // Base rotation and parallax
      if (mode === 'hero') {
        burgerGroup.rotation.y = elapsed * 0.28 + mX * 0.45;
        burgerGroup.rotation.x = mY * 0.25;
        camera.position.z = 5.2 - currentExploded * 0.8;
      } else if (mode === 'signature') {
        burgerGroup.rotation.y = mX * 1.2;
        burgerGroup.rotation.x = mY * 0.4;
      } else if (mode === 'story') {
        // Step-specific camera choreography and visibility
        if (currentStep === 1) {
          // Fresh Ingredients floating separately
          grillGroup.visible = false;
          steamParticles.visible = false;
          burgerGroup.rotation.y = elapsed * 0.2;
          camera.position.set(0, 0.4, 5.8);
        } else if (currentStep === 2) {
          // Grill: Patty on hot sizzling grill
          grillGroup.visible = true;
          steamParticles.visible = true;
          burgerGroup.rotation.y = 0.4;
          camera.position.set(0, 1.2, 4.4);
          camera.lookAt(0, 0, 0);

          // Animate steam/smoke particles upwards
          const positions = particleGeo.attributes.position.array as Float32Array;
          for (let p = 0; p < particleCount; p++) {
            positions[p * 3 + 1] += 0.02;
            if (positions[p * 3 + 1] > 2.0) {
              positions[p * 3 + 1] = -0.3;
              positions[p * 3] = (Math.random() - 0.5) * 1.5;
              positions[p * 3 + 2] = (Math.random() - 0.5) * 1.5;
            }
          }
          particleGeo.attributes.position.needsUpdate = true;
          emberLight.intensity = 4.0 + Math.sin(elapsed * 12) * 1.2; // Sizzling glow
        } else if (currentStep === 3) {
          // Build: Layers moving into place
          grillGroup.visible = false;
          steamParticles.visible = false;
          burgerGroup.rotation.y = elapsed * 0.35;
          camera.position.set(0, 0.9, 5.0);
        } else if (currentStep === 4) {
          // Final touch: melting cheese and dripping sauce
          grillGroup.visible = false;
          steamParticles.visible = false;
          burgerGroup.rotation.y = elapsed * 0.25;
          camera.position.set(0, 0.5, 4.2);
        } else if (currentStep === 5) {
          // Serve: Burger assembled close to camera
          grillGroup.visible = false;
          steamParticles.visible = false;
          burgerGroup.rotation.y = elapsed * 0.35 + mX * 0.4;
          camera.position.set(0, 0.4, 4.5);
        }
      }

      // Calculate vertical offsets for ingredients based on exploded factor or step
      let sep = currentExploded;
      if (mode === 'story') {
        if (currentStep === 1) sep = 1.35; // Maximum separation
        else if (currentStep === 2) sep = 0.9;
        else if (currentStep === 3) sep = 0.55;
        else if (currentStep === 4) sep = 0.15;
        else sep = 0; // Assembled
      }

      // Animate layer separation smoothly
      bottomBun.position.y = -0.7 - sep * 0.8;
      sauceLayer.position.y = -0.46 - sep * 0.5;
      lettuceGroup.position.y = -0.36 - sep * 0.25;
      tomatoGroup.position.y = -0.22 + sep * 0.05;
      cheese.position.y = -0.08 + sep * 0.35;
      patty.position.y = 0.12 + sep * 0.65;
      topBun.position.y = 0.38 + sep * 1.15;

      // In Step 2 (Grill), focus primarily on patty
      if (mode === 'story' && currentStep === 2) {
        bottomBun.visible = false;
        topBun.visible = false;
        lettuceGroup.visible = false;
        tomatoGroup.visible = false;
        cheese.visible = false;
        sauceLayer.visible = false;
        patty.position.y = -0.15;
      } else {
        bottomBun.visible = true;
        topBun.visible = true;
        lettuceGroup.visible = true;
        tomatoGroup.visible = true;
        cheese.visible = true;
        sauceLayer.visible = true;
      }

      // Animate floating background ingredients
      floaters.forEach((f, idx) => {
        f.mesh.position.y = f.baseY + Math.sin(elapsed * f.speed + idx) * 0.14;
        f.mesh.rotation.x += f.rotX;
        f.mesh.rotation.y += f.rotY;
      });

      renderer.render(scene, camera);
    };

    animFrameId = requestAnimationFrame(animate);

    // Cleanup
    return () => {
      cancelAnimationFrame(animFrameId);
      container.removeEventListener('mousemove', handleMouseMove);
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
            borderRadius: '16px',
            padding: '24px',
            textAlign: 'center',
          }}
        >
          <div>
            <div style={{ fontSize: '48px', marginBottom: '12px' }}>🍔</div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '20px', color: '#f5b041' }}>
              Handcrafted Artisanal Burger
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '13px', marginTop: '6px' }}>
              Double dry-aged smash patty, smoked cheddar, brioche bun
            </p>
          </div>
        </div>
      )}

      {/* Signature Dish Annotation Labels (when requested) */}
      {showLabels && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            zIndex: 10,
          }}
        >
          {/* Label 1: Premium Brioche Bun */}
          <div
            style={{
              position: 'absolute',
              top: '18%',
              left: '8%',
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
                color: '#f5b041',
                boxShadow: '0 4px 14px rgba(0,0,0,0.5)',
              }}
            >
              Toasted Brioche Bun
            </div>
            <div
              style={{
                width: '40px',
                height: '1px',
                background: 'linear-gradient(to right, rgba(243, 156, 18, 0.6), transparent)',
              }}
            />
          </div>

          {/* Label 2: Fresh Lettuce & Tomato */}
          <div
            style={{
              position: 'absolute',
              top: '42%',
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
                border: '1px solid rgba(46, 204, 113, 0.4)',
                padding: '6px 14px',
                borderRadius: '6px',
                fontSize: '12px',
                fontWeight: 600,
                color: '#2ecc71',
                boxShadow: '0 4px 14px rgba(0,0,0,0.5)',
              }}
            >
              Organic Butter Lettuce & Heirloom Tomato
            </div>
            <div
              style={{
                width: '40px',
                height: '1px',
                background: 'linear-gradient(to left, rgba(46, 204, 113, 0.6), transparent)',
              }}
            />
          </div>

          {/* Label 3: Smoked Cheddar Melt */}
          <div
            style={{
              position: 'absolute',
              top: '56%',
              left: '10%',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
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
              Aged Smoked Cheddar Melt
            </div>
            <div
              style={{
                width: '40px',
                height: '1px',
                background: 'linear-gradient(to right, rgba(241, 196, 15, 0.6), transparent)',
              }}
            />
          </div>

          {/* Label 4: Grilled Prime Patty */}
          <div
            style={{
              position: 'absolute',
              bottom: '22%',
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

          {/* Label 5: House Amber Sauce */}
          <div
            style={{
              position: 'absolute',
              bottom: '10%',
              left: '14%',
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
              Secret House Amber Sauce
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
