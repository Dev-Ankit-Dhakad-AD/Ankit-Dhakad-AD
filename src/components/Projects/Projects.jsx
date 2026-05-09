import { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { ChevronLeft, ChevronRight, CornerDownRight, ExternalLink } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import './Projects.css';

const projects = [
  {
    title: 'Annapurna Daily Needs',
    description: 'A fully functional grocery delivery ecosystem consisting of a high-performance mobile application engineered with Flutter, Kotlin, and Dart, alongside a robust management dashboard built in Next.js and React.',
    tech: ['Flutter', 'Kotlin', 'Next.js', 'React'],
    github: 'https://github.com/ankit0173',
    live: 'https://annapurnadailyneeds.vercel.app/',
    image: 'project1'
  },
  {
    title: 'MB Tractors FinTech',
    description: 'A custom finance and loan management platform designed for a tractor and multi-vehicle financing enterprise located at Fatehpur Tiraha, Shivpuri, M.P.',
    tech: ['Fintech', 'React', 'Database'],
    github: 'https://github.com/ankit0173',
    live: 'https://mbtractorshivpuri.vercel.app/',
    image: 'project2'
  },
  {
    title: 'Maa Rajrajeshwari Dhaba',
    description: 'A gorgeous, responsive business website crafted for my father\'s hotel and dhaba located on Highway NH46, 45 km from Shivpuri, featuring active menus and digital bookings.',
    tech: ['Web Tech', 'CSS Grid', 'Frontend'],
    github: 'https://github.com/ankit0173',
    live: 'https://maarajrajeshwarihotel.vercel.app/',
    image: 'project3'
  },
  {
    title: 'Attendance Manager',
    description: 'A college minor academic tracking system consisting of dedicated faculty logging interfaces and subject-wise student attendance reporting.',
    tech: ['Java / PHP', 'SQL', 'Academic Logic'],
    github: 'https://github.com/ankit0173',
    live: '#',
    image: 'project1'
  }
];

const Projects = () => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [hasError, setHasError] = useState(false);

  const stateRef = useRef({
    targetIndex: 0,
    currentSlide: 0,
    projects: projects,
    isDragging: false,
    wasGliding: false,
    startX: 0,
    startY: 0,
    currentRotationY: 0,
    velocityY: 0,
    hoveredCardIndex: -1,
    hoveredButton: null,
    cards: []
  });

  useEffect(() => {
    if (hasError) return;
    if (!containerRef.current || !canvasRef.current) return;

    let scene, camera, renderer, frameId;
    let cardGeom, particleGeom, particleMat, edgeGeom;
    const cardDataArray = [];

    const container = containerRef.current;
    const canvas = canvasRef.current;
    
    const width = container.clientWidth || 800;
    const height = container.clientHeight || 550;

    let handleMouseMove, handleMouseDown, handleMouseUp;
    let handleTouchStart, handleTouchMove, handleTouchEnd;
    let handleResize, handleDragStart, handleDragEnd;

    try {
      scene = new THREE.Scene();

      camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
      camera.position.set(0, 0.5, 8.5);

      renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        alpha: true,
        antialias: true
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.25));

      const ambientLight = new THREE.AmbientLight(0x050b18, 2.5);
      scene.add(ambientLight);

      const dirLight1 = new THREE.DirectionalLight(0x3b82f6, 3.5);
      dirLight1.position.set(5, 8, 5);
      scene.add(dirLight1);

      const dirLight2 = new THREE.DirectionalLight(0xa855f7, 2.0);
      dirLight2.position.set(-5, -5, -3);
      scene.add(dirLight2);

      // --- Cyber Dust particles ---
      particleGeom = new THREE.BufferGeometry();
      const particleCount = 100;
      const positions = new Float32Array(particleCount * 3);
      const colors = new Float32Array(particleCount * 3);

      for (let i = 0; i < particleCount * 3; i += 3) {
        positions[i] = -8 + Math.random() * 16;
        positions[i + 1] = -5 + Math.random() * 10;
        positions[i + 2] = -12 + Math.random() * 14;

        if (Math.random() > 0.5) {
          colors[i] = 0.23;    // R (3b82f6)
          colors[i + 1] = 0.51;// G
          colors[i + 2] = 0.96;// B
        } else {
          colors[i] = 0.66;    // R (a855f7)
          colors[i + 1] = 0.33;// G
          colors[i + 2] = 0.97;// B
        }
      }

      particleGeom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      particleGeom.setAttribute('color', new THREE.BufferAttribute(colors, 3));

      particleMat = new THREE.PointsMaterial({
        size: 0.045,
        vertexColors: true,
        transparent: true,
        opacity: 0.45,
        sizeAttenuation: true
      });

      const starParticles = new THREE.Points(particleGeom, particleMat);
      scene.add(starParticles);

      const R = 4.0;
      const N = projects.length;
      const angleSpacing = (Math.PI * 2) / N;

      const carouselGroup = new THREE.Group();
      carouselGroup.position.set(0, 0, -R);
      scene.add(carouselGroup);

      const wrapText = (ctx, text, x, y, maxWidth, lineHeight) => {
        const words = text.split(' ');
        let line = '';
        let currentY = y;
        for (let n = 0; n < words.length; n++) {
          const testLine = line + words[n] + ' ';
          const metrics = ctx.measureText(testLine);
          const testWidth = metrics.width;
          if (testWidth > maxWidth && n > 0) {
            ctx.fillText(line, x, currentY);
            line = words[n] + ' ';
            currentY += lineHeight;
          } else {
            line = testLine;
          }
        }
        ctx.fillText(line, x, currentY);
        return currentY;
      };

      const drawRoundRect = (ctx, x, y, w, h, r) => {
        if (typeof ctx.roundRect === 'function') {
          ctx.roundRect(x, y, w, h, r);
        } else {
          ctx.beginPath();
          ctx.moveTo(x + r, y);
          ctx.lineTo(x + w - r, y);
          ctx.quadraticCurveTo(x + w, y, x + w, y + r);
          ctx.lineTo(x + w, y + h - r);
          ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
          ctx.lineTo(x + r, y + h);
          ctx.quadraticCurveTo(x, y + h, x, y + h - r);
          ctx.lineTo(x, y + r);
          ctx.quadraticCurveTo(x, y, x + r, y);
          ctx.closePath();
        }
      };

      const drawCardTexture = (card, hoveredBtn, isFocused) => {
        const ctx = card.canvas.getContext('2d');
        const proj = card.project;

        ctx.clearRect(0, 0, 1024, 640);
        
        ctx.fillStyle = 'rgba(8, 13, 26, 0.96)';
        ctx.fillRect(0, 0, 1024, 640);

        // Soft, rounded borders on glass card
        ctx.strokeStyle = isFocused ? 'rgba(168, 85, 247, 0.55)' : 'rgba(255, 255, 255, 0.08)';
        ctx.lineWidth = 4;
        ctx.beginPath();
        drawRoundRect(ctx, 20, 20, 984, 600, 24);
        ctx.stroke();

        ctx.strokeStyle = isFocused ? 'rgba(59, 130, 246, 0.25)' : 'rgba(255, 255, 255, 0.04)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        drawRoundRect(ctx, 10, 10, 1004, 620, 30);
        ctx.stroke();

        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 44px "Outfit", sans-serif';
        ctx.fillText(proj.title, 65, 100);

        ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
        ctx.lineWidth = 2;
        ctx.beginPath(); ctx.moveTo(65, 135); ctx.lineTo(959, 135); ctx.stroke();

        ctx.fillStyle = '#9ca3af';
        ctx.font = '30px "Plus Jakarta Sans", sans-serif';
        wrapText(ctx, proj.description, 65, 210, 894, 46);

        ctx.fillStyle = '#a855f7';
        ctx.font = 'bold 26px "Outfit", sans-serif';
        const techString = proj.tech.join('  •  ');
        ctx.fillText(techString, 65, 450);

        // GitHub Button (rounded pill)
        const isGitHovered = hoveredBtn === 'github';
        ctx.fillStyle = isGitHovered ? 'rgba(168, 85, 247, 0.12)' : 'rgba(255, 255, 255, 0.03)';
        ctx.strokeStyle = isGitHovered ? '#a855f7' : 'rgba(255, 255, 255, 0.12)';
        ctx.lineWidth = 3;
        ctx.beginPath();
        drawRoundRect(ctx, 65, 510, 290, 70, 35);
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle = isGitHovered ? '#ffffff' : '#9ca3af';
        ctx.font = 'bold 24px "Plus Jakarta Sans", sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('GitHub Code', 210, 552);

        // Live Demo Button (rounded pill)
        const isLiveHovered = hoveredBtn === 'live';
        ctx.fillStyle = isLiveHovered ? 'rgba(59, 130, 246, 0.12)' : 'rgba(255, 255, 255, 0.03)';
        ctx.strokeStyle = isLiveHovered ? '#3b82f6' : 'rgba(255, 255, 255, 0.12)';
        ctx.lineWidth = 3;
        ctx.beginPath();
        drawRoundRect(ctx, 390, 510, 290, 70, 35);
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle = isLiveHovered ? '#ffffff' : '#9ca3af';
        ctx.fillText('Live Demo', 535, 552);

        ctx.textAlign = 'left';

        if (isFocused) {
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.01)';
          ctx.lineWidth = 10;
          for (let off = -300; off < 1024; off += 180) {
            ctx.beginPath(); ctx.moveTo(off, 0); ctx.lineTo(off + 640, 640); ctx.stroke();
          }
        }

        card.texture.needsUpdate = true;
      };

      cardGeom = new THREE.PlaneGeometry(5.0, 3.125);
      edgeGeom = new THREE.EdgesGeometry(cardGeom);

      projects.forEach((proj, i) => {
        const cardParent = new THREE.Group();
        cardParent.rotation.y = i * angleSpacing;
        carouselGroup.add(cardParent);

        const cardGroup = new THREE.Group();
        cardGroup.position.set(0, 0, R);
        cardParent.add(cardGroup);

        const backMat = new THREE.MeshStandardMaterial({
          color: 0x050a15,
          roughness: 0.15,
          metalness: 0.9,
          transparent: true,
          opacity: 0.9,
          side: THREE.DoubleSide
        });
        const backMesh = new THREE.Mesh(cardGeom, backMat);
        cardGroup.add(backMesh);

        const canvasMem = document.createElement('canvas');
        canvasMem.width = 1024;
        canvasMem.height = 640;

        const texture = new THREE.CanvasTexture(canvasMem);
        texture.minFilter = THREE.LinearFilter;

        const frontMat = new THREE.MeshBasicMaterial({
          map: texture,
          transparent: true,
          side: THREE.DoubleSide,
          depthWrite: false
        });
        const frontMesh = new THREE.Mesh(cardGeom, frontMat);
        frontMesh.position.set(0, 0, 0.015);
        cardGroup.add(frontMesh);

        const edgeMat = new THREE.LineBasicMaterial({
          color: 0xa855f7,
          transparent: true,
          opacity: 0.3
        });
        const borderLines = new THREE.LineSegments(edgeGeom, edgeMat);
        borderLines.position.set(0, 0, 0.025);
        cardGroup.add(borderLines);

        const cardItem = {
          parent: cardParent,
          group: cardGroup,
          canvas: canvasMem,
          texture,
          backMesh,
          frontMesh,
          borderLines,
          project: proj,
          index: i,
          hoveredButton: null
        };

        frontMesh.userData = { cardIndex: i };

        drawCardTexture(cardItem, null, i === stateRef.current.currentSlide);
        cardDataArray.push(cardItem);
      });

      stateRef.current.cards = cardDataArray;

      const raycaster = new THREE.Raycaster();
      const mouse2D = new THREE.Vector2();

      const adjustCamera = () => {
        const w = container.clientWidth || 800;
        const h = container.clientHeight || 550;
        renderer.setSize(w, h);
        camera.aspect = w / h;

        if (w < 768) {
          camera.position.set(0, 0.4, 10.5);
          carouselGroup.scale.setScalar(0.72);
        } else {
          camera.position.set(0, 0.5, 8.5);
          carouselGroup.scale.setScalar(1.0);
        }
        camera.updateProjectionMatrix();
      };
      adjustCamera();

      handleMouseMove = (e) => {
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        mouse2D.x = (x / rect.width) * 2 - 1;
        mouse2D.y = -(y / rect.height) * 2 + 1;

        if (stateRef.current.isDragging) {
          const dx = e.clientX - stateRef.current.startX;
          const deltaAngle = (dx / (rect.width || 800)) * Math.PI * 1.35;
          carouselGroup.rotation.y = stateRef.current.currentRotationY + deltaAngle;
          stateRef.current.velocityY = deltaAngle * 0.12;
          return;
        }

        raycaster.setFromCamera(mouse2D, camera);
        const targets = cardDataArray.map(c => c.frontMesh);
        const intersects = raycaster.intersectObjects(targets);

        if (intersects.length > 0) {
          const intersect = intersects[0];
          const cardIndex = intersect.object.userData.cardIndex;
          const card = cardDataArray[cardIndex];
          const uv = intersect.uv;

          const canvasX = uv.x * 1024;
          const canvasY = (1 - uv.y) * 640;

          let hoverBtn = null;
          if (canvasY >= 510 && canvasY <= 580) {
            if (canvasX >= 65 && canvasX <= 355) {
              hoverBtn = 'github';
            } else if (canvasX >= 390 && canvasX <= 680) {
              hoverBtn = 'live';
            }
          }

          if (hoverBtn) {
            canvas.style.cursor = 'pointer';
          } else {
            canvas.style.cursor = 'grab';
          }

          const tiltIntensity = 0.25;
          const localTiltY = (uv.x - 0.5) * tiltIntensity;
          const localTiltX = -(uv.y - 0.5) * tiltIntensity;

          card.group.rotation.y = THREE.MathUtils.lerp(card.group.rotation.y, localTiltY, 0.15);
          card.group.rotation.x = THREE.MathUtils.lerp(card.group.rotation.x, localTiltX, 0.15);

          if (card.hoveredButton !== hoverBtn) {
            card.hoveredButton = hoverBtn;
            drawCardTexture(card, hoverBtn, cardIndex === stateRef.current.currentSlide);
          }

          stateRef.current.hoveredCardIndex = cardIndex;
          stateRef.current.hoveredButton = hoverBtn;
        } else {
          canvas.style.cursor = 'default';
          
          if (stateRef.current.hoveredCardIndex !== -1) {
            const card = cardDataArray[stateRef.current.hoveredCardIndex];
            if (card.hoveredButton !== null) {
              card.hoveredButton = null;
              drawCardTexture(card, null, card.index === stateRef.current.currentSlide);
            }
            stateRef.current.hoveredCardIndex = -1;
            stateRef.current.hoveredButton = null;
          }
        }
      };

      handleDragStart = (clientX, clientY) => {
        stateRef.current.isDragging = true;
        stateRef.current.wasGliding = true;
        stateRef.current.startX = clientX;
        stateRef.current.startY = clientY;
        stateRef.current.currentRotationY = carouselGroup.rotation.y;
        stateRef.current.velocityY = 0;
        canvas.style.cursor = 'grabbing';
      };

      handleMouseDown = (e) => {
        handleDragStart(e.clientX, e.clientY);
      };

      handleTouchStart = (e) => {
        if (e.touches.length > 0) {
          handleDragStart(e.touches[0].clientX, e.touches[0].clientY);
        }
      };

      handleTouchMove = (e) => {
        if (!stateRef.current.isDragging || e.touches.length === 0) return;
        const dx = e.touches[0].clientX - stateRef.current.startX;
        const deltaAngle = (dx / width) * Math.PI * 1.35;
        carouselGroup.rotation.y = stateRef.current.currentRotationY + deltaAngle;
        stateRef.current.velocityY = deltaAngle * 0.12;
      };

      handleDragEnd = (clientX, clientY) => {
        if (!stateRef.current.isDragging) return;
        stateRef.current.isDragging = false;
        canvas.style.cursor = 'default';

        const dx = Math.abs(clientX - stateRef.current.startX);
        const dy = Math.abs(clientY - stateRef.current.startY);

        if (dx < 6 && dy < 6) {
          raycaster.setFromCamera(mouse2D, camera);
          const targets = cardDataArray.map(c => c.frontMesh);
          const intersects = raycaster.intersectObjects(targets);

          if (intersects.length > 0) {
            const intersect = intersects[0];
            const cardIndex = intersect.object.userData.cardIndex;
            const card = cardDataArray[cardIndex];
            const uv = intersect.uv;

            const canvasX = uv.x * 1024;
            const canvasY = (1 - uv.y) * 640;

            if (canvasY >= 510 && canvasY <= 580) {
              if (canvasX >= 65 && canvasX <= 355) {
                window.open(card.project.github, '_blank');
              } else if (canvasX >= 390 && canvasX <= 680) {
                if (card.project.live !== '#') {
                  window.open(card.project.live, '_blank');
                } else {
                  alert('Launching demo module: Standby Mode');
                }
              }
            } else {
              stateRef.current.targetIndex = -cardIndex;
            }
          }
        }
      };

      handleMouseUp = (e) => {
        handleDragEnd(e.clientX, e.clientY);
      };

      handleTouchEnd = (e) => {
        if (e.changedTouches.length > 0) {
          handleDragEnd(e.changedTouches[0].clientX, e.changedTouches[0].clientY);
        }
      };

      canvas.addEventListener('mousemove', handleMouseMove);
      canvas.addEventListener('mousedown', handleMouseDown);
      window.addEventListener('mouseup', handleMouseUp);

      canvas.addEventListener('touchstart', handleTouchStart, { passive: true });
      canvas.addEventListener('touchmove', handleTouchMove, { passive: true });
      canvas.addEventListener('touchend', handleTouchEnd, { passive: true });

      handleResize = () => {
        adjustCamera();
      };
      window.addEventListener('resize', handleResize);

      let time = 0;
      const animateScene = () => {
        try {
          frameId = requestAnimationFrame(animateScene);
          time += 0.01;

          starParticles.rotation.y = time * 0.01;

          if (stateRef.current.isDragging) {
            const rawY = carouselGroup.rotation.y;
            const normalizedIndex = ((Math.round(-rawY / angleSpacing) % N) + N) % N;
            if (normalizedIndex !== stateRef.current.currentSlide && !isNaN(normalizedIndex)) {
              stateRef.current.currentSlide = normalizedIndex;
              setCurrentSlide(normalizedIndex);
            }
          } else {
            stateRef.current.velocityY *= 0.94;
            carouselGroup.rotation.y += stateRef.current.velocityY;

            if (Math.abs(stateRef.current.velocityY) < 0.005) {
              if (stateRef.current.wasGliding) {
                const currentRotation = carouselGroup.rotation.y;
                const nearestIndexNormalized = Math.round(currentRotation / angleSpacing);
                stateRef.current.targetIndex = nearestIndexNormalized;
                stateRef.current.wasGliding = false;
                console.log("[CAROUSEL DEBUG] wasGliding active - Snapped targetIndex to:", stateRef.current.targetIndex);
              }

              const targetRot = stateRef.current.targetIndex * angleSpacing;
              
              if (Math.abs(targetRot - carouselGroup.rotation.y) > 0.001) {
                console.log("[CAROUSEL DEBUG] Lerping. Current rotation.y:", carouselGroup.rotation.y, "TargetRot:", targetRot, "targetIndex:", stateRef.current.targetIndex);
              }

              carouselGroup.rotation.y += (targetRot - carouselGroup.rotation.y) * 0.1;

              const activeIndex = ((-stateRef.current.targetIndex % N) + N) % N;
              if (activeIndex !== stateRef.current.currentSlide && !isNaN(activeIndex)) {
                console.log("[CAROUSEL DEBUG] Updating slide in loop. Old activeIndex:", stateRef.current.currentSlide, "New activeIndex:", activeIndex);
                stateRef.current.currentSlide = activeIndex;
                setCurrentSlide(activeIndex);
              }
            }
          }

          cardDataArray.forEach((card, idx) => {
            const isFocused = idx === stateRef.current.currentSlide;

            const targetScale = isFocused ? 1.05 : 0.88;
            card.group.scale.setScalar(THREE.MathUtils.lerp(card.group.scale.x, targetScale, 0.1));

            const targetZ = isFocused ? R + 0.35 : R;
            card.group.position.z = THREE.MathUtils.lerp(card.group.position.z, targetZ, 0.1);

            const opacityTarget = isFocused ? 0.6 : 0.15;
            card.borderLines.material.opacity = THREE.MathUtils.lerp(card.borderLines.material.opacity, opacityTarget, 0.1);

            if (stateRef.current.hoveredCardIndex !== idx) {
              card.group.rotation.y = THREE.MathUtils.lerp(card.group.rotation.y, 0, 0.1);
              card.group.rotation.x = THREE.MathUtils.lerp(card.group.rotation.x, 0, 0.1);
            }

            const wasTextureFocused = card.group.userData.wasFocused || false;
            if (wasTextureFocused !== isFocused) {
              card.group.userData.wasFocused = isFocused;
              drawCardTexture(card, card.hoveredButton, isFocused);
            }
          });

          renderer.render(scene, camera);
        } catch (animateErr) {
          console.error("Three.js projects exception, falling back:", animateErr);
          if (frameId) cancelAnimationFrame(frameId);
          setTimeout(() => setHasError(true), 0);
        }
      };

      animateScene();

    } catch (err) {
      console.warn("Three.js Projects WebGL fallback context activated:", err);
      setTimeout(() => setHasError(true), 0);
    }

    return () => {
      if (frameId) cancelAnimationFrame(frameId);
      
      if (handleResize) window.removeEventListener('resize', handleResize);
      if (handleMouseUp) window.removeEventListener('mouseup', handleMouseUp);

      if (canvas) {
        if (handleMouseMove) canvas.removeEventListener('mousemove', handleMouseMove);
        if (handleMouseDown) canvas.removeEventListener('mousedown', handleMouseDown);
        if (handleTouchStart) canvas.removeEventListener('touchstart', handleTouchStart);
        if (handleTouchMove) canvas.removeEventListener('touchmove', handleTouchMove);
        if (handleTouchEnd) canvas.removeEventListener('touchend', handleTouchEnd);
      }

      if (cardGeom) cardGeom.dispose();
      if (particleGeom) particleGeom.dispose();
      if (particleMat) particleMat.dispose();
      if (edgeGeom) edgeGeom.dispose();

      cardDataArray.forEach(c => {
        if (c.texture) c.texture.dispose();
        if (c.backMesh && c.backMesh.geometry) c.backMesh.geometry.dispose();
        if (c.backMesh && c.backMesh.material) c.backMesh.material.dispose();
        if (c.frontMesh && c.frontMesh.material) c.frontMesh.material.dispose();
        if (c.borderLines && c.borderLines.material) c.borderLines.material.dispose();
      });

      if (scene) scene.clear();
      if (renderer) renderer.dispose();
    };
  }, [hasError]);

  const handleNext = () => {
    console.log("[CAROUSEL DEBUG] handleNext clicked! Old targetIndex:", stateRef.current.targetIndex, "Old currentSlide:", stateRef.current.currentSlide);
    stateRef.current.targetIndex--;
    const nextSlide = (stateRef.current.currentSlide + 1) % projects.length;
    stateRef.current.currentSlide = nextSlide;
    setCurrentSlide(nextSlide);
    console.log("[CAROUSEL DEBUG] handleNext done! New targetIndex:", stateRef.current.targetIndex, "New currentSlide:", stateRef.current.currentSlide);
  };

  const handlePrev = () => {
    console.log("[CAROUSEL DEBUG] handlePrev clicked! Old targetIndex:", stateRef.current.targetIndex, "Old currentSlide:", stateRef.current.currentSlide);
    stateRef.current.targetIndex++;
    const prevSlide = (stateRef.current.currentSlide - 1 + projects.length) % projects.length;
    stateRef.current.currentSlide = prevSlide;
    setCurrentSlide(prevSlide);
    console.log("[CAROUSEL DEBUG] handlePrev done! New targetIndex:", stateRef.current.targetIndex, "New currentSlide:", stateRef.current.currentSlide);
  };

  const activeProject = projects[currentSlide] || projects[0];

  if (hasError) {
    return (
      <section id="projects" className="projects section-container">
        <h2 className="section-title">
          Featured <span>Projects</span>
        </h2>
        
        <div className="projects-grid">
          {projects.map((project, index) => (
            <div key={index} className="project-card glass">
              <div className={`project-image placeholder-${project.image}`}>
                <div className="project-overlay">
                  <a href={project.github} target="_blank" rel="noreferrer" className="project-link" aria-label="GitHub Repository">
                    <FaGithub size={24} />
                  </a>
                  {project.live !== '#' && (
                    <a href={project.live} target="_blank" rel="noreferrer" className="project-link" aria-label="Live Demo">
                      <ExternalLink size={24} />
                    </a>
                  )}
                </div>
              </div>
              
              <div className="project-info">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                
                <div className="project-tech">
                  {project.tech.map((tech, i) => (
                    <span key={i} className="tech-tag">{tech}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="projects section-container">
      <h2 className="section-title">
        Featured <span>Projects</span>
      </h2>

      <div className="projects-3d-wrapper">
        <div className="hud-header-bar">
          <span className="terminal-prompt">•</span> DRAG TO ROTATE CAROUSEL
        </div>

        <div ref={containerRef} className="projects-canvas-container">
          <canvas ref={canvasRef} className="projects-three-canvas" />
        </div>

        <div className="hud-navigation-controls">
          <button className="hud-btn prev" onClick={handlePrev} aria-label="Previous Project">
            <ChevronLeft size={20} className="glow-icon" />
            <span className="btn-label">Prev</span>
          </button>

          <div className="hud-indicators">
            <div className="index-counter">
              <span className="current">0{currentSlide + 1}</span>
              <span className="divider">/</span>
              <span className="total">0{projects.length}</span>
            </div>
            <div className="indicator-dots">
              {projects.map((_, idx) => (
                <div
                  key={idx}
                  className={`dot ${idx === currentSlide ? 'active' : ''}`}
                  onClick={() => {
                    console.log("[CAROUSEL DEBUG] Dot clicked! Index:", idx, "Old targetIndex:", stateRef.current.targetIndex, "Old currentSlide:", stateRef.current.currentSlide);
                    const diff = idx - stateRef.current.currentSlide;
                    stateRef.current.targetIndex -= diff;
                    stateRef.current.currentSlide = idx;
                    setCurrentSlide(idx);
                    console.log("[CAROUSEL DEBUG] Dot clicked done! New targetIndex:", stateRef.current.targetIndex, "New currentSlide:", stateRef.current.currentSlide);
                  }}
                />
              ))}
            </div>
          </div>

          <button className="hud-btn next" onClick={handleNext} aria-label="Next Project">
            <span className="btn-label">Next</span>
            <ChevronRight size={20} className="glow-icon" />
          </button>
        </div>

        <div className="hud-footer-bar">
          <CornerDownRight size={14} className="terminal-prompt" />
          <span className="active-title">{activeProject.title}</span>
          <span className="active-tech">• {activeProject.tech.join(' • ')}</span>
        </div>
      </div>
    </section>
  );
};

export default Projects;
