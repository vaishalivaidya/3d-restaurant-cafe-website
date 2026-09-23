import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import {
  getPizzaCrustTexture,
  getPepperoniTexture,
  getMeltedCheeseTexture,
} from './FoodMaterials';

interface Pizza3DProps {
  currentStage: number; // 1 to 9
  interactive?: boolean;
  className?: string;
}

export const Pizza3D: React.FC<Pizza3DProps> = ({
  currentStage = 1,
  interactive = true,
  className = '',
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [webglSupported, setWebglSupported] = useState(true);

  const stageRef = useRef(currentStage);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    stageRef.current = currentStage;
  }, [currentStage]);

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
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    camera.position.set(0, 3.2, 5.0);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.appendChild(renderer.domElement);

    // Studio Lighting
    const keyLight = new THREE.DirectionalLight('#ffe6cc', 2.8);
    keyLight.position.set(4, 6, 4);
    keyLight.castShadow = true;
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight('#bbd4ee', 1.2);
    fillLight.position.set(-4, 4, -2);
    scene.add(fillLight);

    // Oven Fire Glow Light
    const ovenLight = new THREE.PointLight('#e67e22', 0, 10);
    ovenLight.position.set(0, 1.5, -3.5);
    scene.add(ovenLight);

    const ambientLight = new THREE.AmbientLight('#261b14', 1.8);
    scene.add(ambientLight);

    // Master Groups
    const pizzaGroup = new THREE.Group();
    scene.add(pizzaGroup);

    // Textures
    const crustTex = getPizzaCrustTexture();
    const pepperoniTex = getPepperoniTexture();
    const meltedCheeseTex = getMeltedCheeseTexture();

    // Materials
    const rawDoughMat = new THREE.MeshStandardMaterial({
      color: '#f5e6cc',
      roughness: 0.6,
      metalness: 0.02,
    });

    const bakedCrustMat = new THREE.MeshStandardMaterial({
      map: crustTex,
      bumpMap: crustTex,
      bumpScale: 0.04,
      roughness: 0.55,
      metalness: 0.05,
    });

    const sauceMat = new THREE.MeshStandardMaterial({
      color: '#c0392b',
      roughness: 0.2,
      metalness: 0.1,
    });

    const rawMozzarellaMat = new THREE.MeshStandardMaterial({
      color: '#fcfcfc',
      roughness: 0.35,
      metalness: 0.02,
    });

    const meltedCheeseMat = new THREE.MeshStandardMaterial({
      map: meltedCheeseTex,
      roughness: 0.25,
      metalness: 0.08,
      color: '#fbe285',
      emissive: '#e67e22',
      emissiveIntensity: 0.15,
    });

    const pepperoniMat = new THREE.MeshStandardMaterial({
      map: pepperoniTex,
      roughness: 0.3,
      metalness: 0.12,
    });

    const basilMat = new THREE.MeshStandardMaterial({
      color: '#27ae60',
      roughness: 0.35,
      side: THREE.DoubleSide,
    });

    // 1. STAGE 1: Dough Ball
    const doughBallGeo = new THREE.SphereGeometry(1.2, 32, 24);
    doughBallGeo.scale(1, 0.72, 1);
    const doughBall = new THREE.Mesh(doughBallGeo, rawDoughMat);
    doughBall.position.set(0, 0.2, 0);
    doughBall.castShadow = true;
    pizzaGroup.add(doughBall);

    // 2. FLAT PIZZA BASE (Stages 2 to 9)
    const baseGroup = new THREE.Group();
    pizzaGroup.add(baseGroup);

    // Crust disc with raised outer cornicione (torus + inner cylinder)
    const innerBaseGeo = new THREE.CylinderGeometry(1.7, 1.7, 0.06, 48);
    const innerBase = new THREE.Mesh(innerBaseGeo, bakedCrustMat);
    innerBase.receiveShadow = true;
    baseGroup.add(innerBase);

    const rimGeo = new THREE.TorusGeometry(1.7, 0.18, 16, 48);
    const rim = new THREE.Mesh(rimGeo, bakedCrustMat);
    rim.rotation.x = Math.PI / 2;
    rim.position.y = 0.04;
    rim.castShadow = true;
    baseGroup.add(rim);

    // Tomato sauce disc
    const sauceGeo = new THREE.CylinderGeometry(1.6, 1.6, 0.07, 40);
    const sauceMesh = new THREE.Mesh(sauceGeo, sauceMat);
    sauceMesh.position.y = 0.01;
    baseGroup.add(sauceMesh);

    // Cheese layer (can switch material from raw to baked)
    const cheeseGeo = new THREE.CylinderGeometry(1.58, 1.58, 0.08, 40);
    const cheeseMesh = new THREE.Mesh(cheeseGeo, meltedCheeseMat);
    cheeseMesh.position.y = 0.02;
    baseGroup.add(cheeseMesh);

    // Pepperoni slices placed geometrically
    const toppingsGroup = new THREE.Group();
    const numPeps = 14;
    for (let i = 0; i < numPeps; i++) {
      const radius = i < 6 ? 0.65 : 1.25;
      const angle = (i * Math.PI * 2) / (i < 6 ? 6 : 8);
      const pepGeo = new THREE.CylinderGeometry(0.24, 0.24, 0.02, 20);
      const pep = new THREE.Mesh(pepGeo, pepperoniMat);
      pep.position.set(Math.cos(angle) * radius, 0.07, Math.sin(angle) * radius);
      pep.rotation.y = Math.random() * Math.PI;
      pep.castShadow = true;
      toppingsGroup.add(pep);
    }

    // Fresh basil leaves
    for (let b = 0; b < 6; b++) {
      const bAngle = (b * Math.PI * 2) / 6 + 0.4;
      const bRad = 0.95;
      const leafGeo = new THREE.ConeGeometry(0.18, 0.05, 5);
      const leaf = new THREE.Mesh(leafGeo, basilMat);
      leaf.position.set(Math.cos(bAngle) * bRad, 0.08, Math.sin(bAngle) * bRad);
      leaf.scale.set(1.5, 0.2, 1.0);
      leaf.rotation.x = Math.PI / 2;
      leaf.rotation.z = bAngle;
      toppingsGroup.add(leaf);
    }
    baseGroup.add(toppingsGroup);

    // 3. SEPARATE SLICE for Stage 9 (Slicing)
    const sliceGroup = new THREE.Group();
    // One triangular pulled slice
    const sliceBaseGeo = new THREE.CylinderGeometry(1.7, 1.7, 0.06, 8, 1, false, 0, Math.PI / 4);
    const sliceMesh = new THREE.Mesh(sliceBaseGeo, bakedCrustMat);
    sliceMesh.position.y = 0.02;
    sliceGroup.add(sliceMesh);

    const sliceCheeseMesh = new THREE.Mesh(
      new THREE.CylinderGeometry(1.58, 1.58, 0.08, 8, 1, false, 0, Math.PI / 4),
      meltedCheeseMat
    );
    sliceCheeseMesh.position.y = 0.04;
    sliceGroup.add(sliceCheeseMesh);

    // Cheese stretch strands connecting pulled slice
    const stretchMat = new THREE.MeshStandardMaterial({
      color: '#f9e79f',
      roughness: 0.2,
      metalness: 0.1,
    });
    for (let s = 0; s < 5; s++) {
      const strandGeo = new THREE.CylinderGeometry(0.015, 0.008, 0.5, 6);
      const strand = new THREE.Mesh(strandGeo, stretchMat);
      strand.position.set(0.6 + s * 0.1, 0.06, 0.3);
      strand.rotation.z = Math.PI / 3;
      sliceGroup.add(strand);
    }
    scene.add(sliceGroup);
    sliceGroup.visible = false;

    // Steam / Smoke Particles
    const steamGeo = new THREE.BufferGeometry();
    const steamCount = 35;
    const steamPos = new Float32Array(steamCount * 3);
    for (let p = 0; p < steamCount; p++) {
      steamPos[p * 3] = (Math.random() - 0.5) * 2.5;
      steamPos[p * 3 + 1] = 0.2 + Math.random() * 2;
      steamPos[p * 3 + 2] = (Math.random() - 0.5) * 2.5;
    }
    steamGeo.setAttribute('position', new THREE.BufferAttribute(steamPos, 3));
    const steamMat = new THREE.PointsMaterial({
      color: '#fff3e0',
      size: 0.1,
      transparent: true,
      opacity: 0.45,
      blending: THREE.AdditiveBlending,
    });
    const steamCloud = new THREE.Points(steamGeo, steamMat);
    scene.add(steamCloud);

    // Mouse listener
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mouseRef.current.targetX = x;
      mouseRef.current.targetY = y;
    };
    container.addEventListener('mousemove', handleMouseMove);

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // Animation Loop
    let clock = new THREE.Clock();
    let animId: number;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();
      const stage = stageRef.current;

      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;
      const mX = mouseRef.current.x;
      const mY = mouseRef.current.y;

      // Stage configurations
      if (stage === 1) {
        // 1. Dough ball
        doughBall.visible = true;
        baseGroup.visible = false;
        sliceGroup.visible = false;
        steamCloud.visible = false;
        ovenLight.intensity = 0;
        doughBall.rotation.y = elapsed * 0.3;
        doughBall.scale.set(1 + Math.sin(elapsed * 2) * 0.02, 0.72, 1 + Math.sin(elapsed * 2) * 0.02);
        camera.position.set(0, 2.2, 4.6);
      } else if (stage === 2) {
        // 2. Dough stretching
        doughBall.visible = false;
        baseGroup.visible = true;
        innerBase.material = rawDoughMat;
        rim.material = rawDoughMat;
        sauceMesh.visible = false;
        cheeseMesh.visible = false;
        toppingsGroup.visible = false;
        sliceGroup.visible = false;
        steamCloud.visible = false;
        ovenLight.intensity = 0;
        baseGroup.rotation.y = elapsed * 0.2;
        camera.position.set(0, 3.2, 4.2);
      } else if (stage === 3) {
        // 3. Tomato sauce spreading
        doughBall.visible = false;
        baseGroup.visible = true;
        innerBase.material = rawDoughMat;
        rim.material = rawDoughMat;
        sauceMesh.visible = true;
        sauceMesh.scale.set(
          Math.min(1, (elapsed % 3) / 2 + 0.3),
          1,
          Math.min(1, (elapsed % 3) / 2 + 0.3)
        );
        cheeseMesh.visible = false;
        toppingsGroup.visible = false;
        sliceGroup.visible = false;
        steamCloud.visible = false;
        ovenLight.intensity = 0;
        camera.position.set(0, 3.5, 4.0);
      } else if (stage === 4) {
        // 4. Mozzarella being added
        doughBall.visible = false;
        baseGroup.visible = true;
        innerBase.material = rawDoughMat;
        rim.material = rawDoughMat;
        sauceMesh.visible = true;
        sauceMesh.scale.set(1, 1, 1);
        cheeseMesh.visible = true;
        cheeseMesh.material = rawMozzarellaMat;
        toppingsGroup.visible = false;
        sliceGroup.visible = false;
        steamCloud.visible = false;
        ovenLight.intensity = 0;
        camera.position.set(0, 3.2, 4.2);
      } else if (stage === 5) {
        // 5. Pepperoni / vegetables placed
        doughBall.visible = false;
        baseGroup.visible = true;
        innerBase.material = rawDoughMat;
        rim.material = rawDoughMat;
        sauceMesh.visible = true;
        sauceMesh.scale.set(1, 1, 1);
        cheeseMesh.visible = true;
        cheeseMesh.material = rawMozzarellaMat;
        toppingsGroup.visible = true;
        sliceGroup.visible = false;
        steamCloud.visible = false;
        ovenLight.intensity = 0;
        camera.position.set(0, 3.0, 4.2);
      } else if (stage === 6) {
        // 6. Entering wood-fired oven
        doughBall.visible = false;
        baseGroup.visible = true;
        sauceMesh.visible = true;
        cheeseMesh.visible = true;
        cheeseMesh.material = rawMozzarellaMat;
        toppingsGroup.visible = true;
        sliceGroup.visible = false;
        steamCloud.visible = true;
        ovenLight.intensity = 5.0 + Math.sin(elapsed * 10) * 1.5;
        baseGroup.position.z = -1.2;
        camera.position.set(0, 2.5, 4.5);
      } else if (stage === 7) {
        // 7. Cheese melting & baking in oven
        doughBall.visible = false;
        baseGroup.visible = true;
        innerBase.material = bakedCrustMat;
        rim.material = bakedCrustMat;
        sauceMesh.visible = true;
        cheeseMesh.visible = true;
        cheeseMesh.material = meltedCheeseMat;
        toppingsGroup.visible = true;
        sliceGroup.visible = false;
        steamCloud.visible = true;
        ovenLight.intensity = 7.5 + Math.sin(elapsed * 14) * 2.5; // roaring flame glow
        baseGroup.position.z = -1.8;
        camera.position.set(0, 2.0, 4.0);
      } else if (stage === 8) {
        // 8. Pizza coming out of oven (crispy, baked)
        doughBall.visible = false;
        baseGroup.visible = true;
        baseGroup.position.z = 0;
        innerBase.material = bakedCrustMat;
        rim.material = bakedCrustMat;
        sauceMesh.visible = true;
        cheeseMesh.visible = true;
        cheeseMesh.material = meltedCheeseMat;
        toppingsGroup.visible = true;
        sliceGroup.visible = false;
        steamCloud.visible = true;
        ovenLight.intensity = 1.0;
        baseGroup.rotation.y = elapsed * 0.25;
        camera.position.set(0, 3.0, 4.5);
      } else if (stage === 9) {
        // 9. Pizza slicing & pull
        doughBall.visible = false;
        baseGroup.visible = true;
        baseGroup.position.z = 0;
        innerBase.material = bakedCrustMat;
        rim.material = bakedCrustMat;
        sauceMesh.visible = true;
        cheeseMesh.visible = true;
        cheeseMesh.material = meltedCheeseMat;
        toppingsGroup.visible = true;
        sliceGroup.visible = true;
        steamCloud.visible = true;
        ovenLight.intensity = 1.0;

        // Pulled slice offset
        sliceGroup.position.set(0.6 + Math.sin(elapsed) * 0.1, 0, 0.6 + Math.sin(elapsed) * 0.1);
        sliceGroup.rotation.y = Math.PI / 4;
        baseGroup.rotation.y = mX * 0.4;
        camera.position.set(0, 2.8, 4.2);
      }

      // Base mouse tilt
      if (stage !== 6 && stage !== 7) {
        baseGroup.rotation.x = mY * 0.3;
      }

      // Animate steam particles
      if (steamCloud.visible) {
        const positions = steamGeo.attributes.position.array as Float32Array;
        for (let p = 0; p < steamCount; p++) {
          positions[p * 3 + 1] += 0.015;
          if (positions[p * 3 + 1] > 2.5) {
            positions[p * 3 + 1] = 0.2;
            positions[p * 3] = (Math.random() - 0.5) * 2.2;
            positions[p * 3 + 2] = (Math.random() - 0.5) * 2.2;
          }
        }
        steamGeo.attributes.position.needsUpdate = true;
      }

      camera.lookAt(0, 0, 0);
      renderer.render(scene, camera);
    };

    animId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animId);
      container.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      keyLight.dispose();
      fillLight.dispose();
      ovenLight.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className={`pizza-3d-canvas-wrapper ${className}`}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        minHeight: '420px',
        cursor: interactive ? 'grab' : 'default',
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
            <div style={{ fontSize: '48px', marginBottom: '12px' }}>🍕</div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '20px', color: '#f5b041' }}>
              Wood-Fired Neapolitan Pizza
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '13px', marginTop: '6px' }}>
              San Marzano D.O.P., fresh mozzarella, cupping pepperoni & fragrant basil
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
