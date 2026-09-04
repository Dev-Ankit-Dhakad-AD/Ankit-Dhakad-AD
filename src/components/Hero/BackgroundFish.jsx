import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const BackgroundFish = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    let scene, camera, renderer, animationFrameId;
    let headGeom, innerMat, outerMat, accentWireMat, eyeGeom, eyeMat;
    let caudalGeom, dorsalGeom, pectoralGeom, bubbleGeom, bubbleMat;
    const bubbles = [];
    const bubblesGroup = new THREE.Group();

    // Outer-scoped handler variable to prevent ReferenceErrors on unmount
    let handleResize;

    try {
      // --- Scene Setup ---
      const width = window.innerWidth || 1200;
      const height = window.innerHeight || 800;

      scene = new THREE.Scene();
      
      // Perspective camera
      camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 100);
      camera.position.set(0, 0, 16);

      // Renderer with transparency
      renderer = new THREE.WebGLRenderer({
        canvas: containerRef.current,
        alpha: true,
        antialias: true
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.25));

      // --- Lighting ---
      const ambientLight = new THREE.AmbientLight(0x020a15, 1.5);
      scene.add(ambientLight);

      const dirLight1 = new THREE.DirectionalLight(0x00f3ff, 2.5);
      dirLight1.position.set(10, 15, 10);
      scene.add(dirLight1);

      const dirLight2 = new THREE.DirectionalLight(0xf000ff, 1.5);
      dirLight2.position.set(-10, -10, -5);
      scene.add(dirLight2);

      // --- Procedural Fish Creation ---
      const fishGroup = new THREE.Group();
      scene.add(fishGroup);

      // Cyberpunk materials
      innerMat = new THREE.MeshStandardMaterial({
        color: 0x010810,
        roughness: 0.15,
        metalness: 0.95,
        transparent: true,
        opacity: 0.55,
        side: THREE.DoubleSide
      });

      outerMat = new THREE.MeshBasicMaterial({
        color: 0x00f3ff,
        wireframe: true,
        transparent: true,
        opacity: 0.5,
        side: THREE.DoubleSide
      });

      accentWireMat = new THREE.MeshBasicMaterial({
        color: 0xf000ff,
        wireframe: true,
        transparent: true,
        opacity: 0.6,
        side: THREE.DoubleSide
      });

      // Fish Head
      const head = new THREE.Group();
      fishGroup.add(head);

      headGeom = new THREE.SphereGeometry(0.85, 16, 12);
      headGeom.scale(1, 0.7, 1.3);
      const headMesh = new THREE.Mesh(headGeom, innerMat);
      const headWire = new THREE.Mesh(headGeom, outerMat);
      head.add(headMesh);
      head.add(headWire);

      // Eyes
      eyeGeom = new THREE.SphereGeometry(0.14, 8, 8);
      eyeMat = new THREE.MeshBasicMaterial({ color: 0x00f3ff, toneMapped: false });
      const leftEye = new THREE.Mesh(eyeGeom, eyeMat);
      leftEye.position.set(0.4, 0.15, 0.7);
      const rightEye = leftEye.clone();
      rightEye.position.x = -0.4;
      head.add(leftEye);
      head.add(rightEye);

      // Body segments
      const segments = [];
      let prevSegment = head;
      const numSegments = 6;
      const segmentScales = [0.8, 0.68, 0.54, 0.4, 0.28, 0.16];
      const segmentOffsets = [-0.75, -0.7, -0.6, -0.5, -0.4, -0.3];

      for (let i = 0; i < numSegments; i++) {
        const segGroup = new THREE.Group();
        segGroup.position.set(0, 0, segmentOffsets[i]);
        prevSegment.add(segGroup);

        const scale = segmentScales[i];
        const segGeom = new THREE.SphereGeometry(scale, 12, 10);
        segGeom.scale(1, 0.72, 1.1);
        
        const segMesh = new THREE.Mesh(segGeom, innerMat);
        const segWire = new THREE.Mesh(segGeom, i % 2 === 0 ? outerMat : accentWireMat);
        
        segGroup.add(segMesh);
        segGroup.add(segWire);

        segments.push(segGroup);
        prevSegment = segGroup;
      }

      // Caudal Fin
      const caudalGroup = new THREE.Group();
      caudalGroup.position.set(0, 0, -0.2);
      prevSegment.add(caudalGroup);

      const caudalShape = new THREE.Shape();
      caudalShape.moveTo(0, 0);
      caudalShape.quadraticCurveTo(0.4, 0.5, 0.9, 0.95);
      caudalShape.lineTo(0.65, 0);
      caudalShape.lineTo(0.9, -0.95);
      caudalShape.quadraticCurveTo(0.4, -0.5, 0, 0);

      caudalGeom = new THREE.ExtrudeGeometry(caudalShape, { depth: 0.02, bevelEnabled: false });
      caudalGeom.center();
      caudalGeom.rotateY(Math.PI / 2);

      const caudalMesh = new THREE.Mesh(caudalGeom, innerMat);
      const caudalWire = new THREE.Mesh(caudalGeom, accentWireMat);
      caudalGroup.add(caudalMesh);
      caudalGroup.add(caudalWire);

      // Dorsal Fin
      const dorsalShape = new THREE.Shape();
      dorsalShape.moveTo(0, 0);
      dorsalShape.quadraticCurveTo(0, 0.6, -0.6, 0.9);
      dorsalShape.quadraticCurveTo(-0.9, 0.4, -0.8, 0);
      dorsalShape.closePath();

      dorsalGeom = new THREE.ExtrudeGeometry(dorsalShape, { depth: 0.015, bevelEnabled: false });
      dorsalGeom.center();
      dorsalGeom.rotateY(Math.PI / 2);
      dorsalGeom.rotateZ(Math.PI / 5);

      const dorsalMesh = new THREE.Mesh(dorsalGeom, outerMat);
      dorsalMesh.position.set(0, 0.6, -0.1);
      segments[1].add(dorsalMesh);

      // Pectoral Fins
      const pectoralShape = new THREE.Shape();
      pectoralShape.moveTo(0, 0);
      pectoralShape.quadraticCurveTo(0.4, 0.1, 0.9, -0.3);
      pectoralShape.quadraticCurveTo(0.6, -0.6, 0, 0);

      pectoralGeom = new THREE.ExtrudeGeometry(pectoralShape, { depth: 0.015, bevelEnabled: false });
      pectoralGeom.center();
      pectoralGeom.rotateX(Math.PI / 6);

      const leftPecGroup = new THREE.Group();
      leftPecGroup.position.set(0.65, -0.15, -0.1);
      segments[0].add(leftPecGroup);
      const leftPecMesh = new THREE.Mesh(pectoralGeom, outerMat);
      leftPecGroup.add(leftPecMesh);

      const rightPecGroup = new THREE.Group();
      rightPecGroup.position.set(-0.65, -0.15, -0.1);
      segments[0].add(rightPecGroup);
      const rightPecMesh = new THREE.Mesh(pectoralGeom, outerMat);
      rightPecMesh.scale.x = -1;
      rightPecGroup.add(rightPecMesh);

      // Bubbles
      scene.add(bubblesGroup);
      const maxBubbles = 30;
      bubbleGeom = new THREE.SphereGeometry(0.06, 6, 6);
      bubbleMat = new THREE.MeshBasicMaterial({
        color: 0x00f3ff,
        wireframe: true,
        transparent: true,
        opacity: 0.4
      });

      const spawnBubble = (origin) => {
        if (bubbles.length >= maxBubbles) {
          const oldest = bubbles.shift();
          bubblesGroup.remove(oldest.mesh);
        }
        const scale = 0.5 + Math.random() * 0.8;
        const mesh = new THREE.Mesh(bubbleGeom, bubbleMat);
        mesh.scale.set(scale, scale, scale);
        mesh.position.copy(origin);
        
        const bubbleObj = {
          mesh,
          speedY: 0.03 + Math.random() * 0.04,
          speedX: -0.015 + Math.random() * 0.03,
          speedZ: -0.015 + Math.random() * 0.03,
          phase: Math.random() * 100,
          opacity: 0.6 + Math.random() * 0.3
        };
        bubblesGroup.add(mesh);
        bubbles.push(bubbleObj);
      };

      // Path Wandering
      const target = new THREE.Vector3(0, 0, -5);
      const getNewTarget = () => {
        target.x = -14 + Math.random() * 28;
        target.y = -6 + Math.random() * 12;
        target.z = -2 - Math.random() * 8;
      };
      getNewTarget();

      fishGroup.position.set(0, -2, -5);

      let swimSpeed = 0.035;
      let time = 0;
      let bubbleTimer = 0;

      // Animation Loop with internal crash safety
      const animate = () => {
        try {
          animationFrameId = requestAnimationFrame(animate);
          time += 0.015;

          const waveFreq = 7.0;
          const waveAmp = 0.18;
          const waveOffset = 0.65;

          segments.forEach((seg, index) => {
            seg.rotation.y = Math.sin(time * waveFreq - index * waveOffset) * waveAmp;
          });

          caudalGroup.rotation.y = Math.sin(time * waveFreq - (numSegments + 1) * waveOffset) * (waveAmp * 1.6);

          leftPecGroup.rotation.z = Math.sin(time * waveFreq + Math.PI / 2) * 0.16;
          leftPecGroup.rotation.y = Math.cos(time * waveFreq) * 0.1;

          rightPecGroup.rotation.z = -Math.sin(time * waveFreq + Math.PI / 2) * 0.16;
          rightPecGroup.rotation.y = -Math.cos(time * waveFreq) * 0.1;

          const dir = target.clone().sub(fishGroup.position);
          const dist = dir.length();

          if (dist < 2.5) {
            getNewTarget();
          }

          dir.normalize();

          const targetRotationY = Math.atan2(dir.x, dir.z);
          const targetRotationX = Math.atan2(-dir.y, Math.sqrt(dir.x * dir.x + dir.z * dir.z));

          let diffY = targetRotationY - fishGroup.rotation.y;
          diffY = Math.atan2(Math.sin(diffY), Math.cos(diffY));
          fishGroup.rotation.y += diffY * 0.015;

          const diffX = targetRotationX - fishGroup.rotation.x;
          fishGroup.rotation.x += diffX * 0.015;

          const rollFactor = 1.3;
          const targetRotationZ = diffY * rollFactor;
          fishGroup.rotation.z += (targetRotationZ - fishGroup.rotation.z) * 0.04;

          fishGroup.translateOnAxis(new THREE.Vector3(0, 0, 1), swimSpeed);

          bubbleTimer++;
          if (bubbleTimer % 35 === 0) {
            const mouthLocal = new THREE.Vector3(0, 0, 1.25);
            const mouthWorld = mouthLocal.clone().applyMatrix4(head.matrixWorld);
            spawnBubble(mouthWorld);
          }

          for (let i = bubbles.length - 1; i >= 0; i--) {
            const bubble = bubbles[i];
            bubble.mesh.position.y += bubble.speedY;
            bubble.mesh.position.x += bubble.speedX + Math.sin(time * 2 + bubble.phase) * 0.008;
            bubble.mesh.position.z += bubble.speedZ;

            bubble.opacity -= 0.004;
            if (bubble.mesh.material) {
              bubble.mesh.material.opacity = bubble.opacity;
            }

            if (bubble.opacity <= 0 || bubble.mesh.position.y > 15) {
              bubblesGroup.remove(bubble.mesh);
              bubbles.splice(i, 1);
            }
          }

          renderer.render(scene, camera);
        } catch (animateErr) {
          console.error("Three.js BackgroundFish Animation Loop crashed:", animateErr);
          if (animationFrameId) cancelAnimationFrame(animationFrameId);
        }
      };

      animate();

      handleResize = () => {
        const w = window.innerWidth || 1200;
        const h = window.innerHeight || 800;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      };
      window.addEventListener('resize', handleResize);

    } catch (err) {
      console.warn("Three.js BackgroundFish WebGL Context creation failed:", err);
    }

    // --- Cleanup ---
    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      
      if (handleResize) window.removeEventListener('resize', handleResize);

      if (headGeom) headGeom.dispose();
      if (innerMat) innerMat.dispose();
      if (outerMat) outerMat.dispose();
      if (accentWireMat) accentWireMat.dispose();
      if (eyeGeom) eyeGeom.dispose();
      if (eyeMat) eyeMat.dispose();
      if (caudalGeom) caudalGeom.dispose();
      if (dorsalGeom) dorsalGeom.dispose();
      if (pectoralGeom) pectoralGeom.dispose();
      if (bubbleGeom) bubbleGeom.dispose();
      if (bubbleMat) bubbleMat.dispose();

      if (bubblesGroup && scene) {
        bubbles.forEach(b => bubblesGroup.remove(b.mesh));
      }
      if (scene) scene.clear();
      if (renderer) renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={containerRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -1,
        pointerEvents: 'none',
        display: 'block',
        opacity: 0.38
      }}
    />
  );
};

export default BackgroundFish;
