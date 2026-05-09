import { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { ChevronLeft, ChevronRight, Cpu, BookOpen, Shield, Award, Calendar } from 'lucide-react';
import './Experience.css';

const milestones = [
  {
    year: '2020',
    title: 'Class X (Secondary School)',
    subtitle: 'MP Board • Govt. School',
    score: 'Score: 89%',
    icon: <BookOpen size={20} />,
    details: 'Graduated secondary school with top honors (89%). Formed a rigorous foundation in physical sciences, logic-structures, and core mathematics.'
  },
  {
    year: '2022',
    title: 'Class XII & DSA Mastery',
    subtitle: 'MP Board & CodingNinjas',
    score: 'Score: 85% • DSA Certified',
    icon: <Cpu size={20} />,
    details: 'Completed Higher Secondary with 85% score. Concurrently achieved specialized Data Structures & Algorithms training via CodingNinjas, mastering runtime complexity optimization.'
  },
  {
    year: '2023 - 2026',
    title: 'Diploma in CS & Engineering',
    subtitle: 'Govt. Poly. College, Shivpuri',
    score: 'Current CGPA: 7.49 • Top 5%',
    icon: <Award size={20} />,
    details: 'Pursuing a Diploma in Computer Science & Engineering (2023 - 2026) with a 7.49 current CGPA, ranking in the top 5% of the department. Deeply specializing in low-level microcontroller integration, hardware-software handshakes, and low-latency C triggers.'
  }
];

const Experience = () => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [hasError, setHasError] = useState(false);

  const stateRef = useRef({
    currentSlide: 0,
    targetSlide: 0,
    isDragging: false,
    startX: 0,
    currentRotationY: 0,
    velocityY: 0
  });

  useEffect(() => {
    if (hasError) return;
    if (!containerRef.current || !canvasRef.current) return;

    let scene, camera, renderer, frameId;
    let splineGeom, splineMat, starGeom, starMat;
    let nodeGeom, ringGeom, ringMat;
    const nodeMeshes = [];

    const container = containerRef.current;
    const canvas = canvasRef.current;

    const width = container.clientWidth || 800;
    const height = container.clientHeight || 550;

    let handleResize, handleMouseDown, handleMouseMove, handleMouseUp;
    let handleTouchStart, handleTouchMove, handleTouchEnd;

    try {
      scene = new THREE.Scene();

      camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
      camera.position.set(0, 0, 10);

      renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        alpha: true,
        antialias: true
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.25));

      const ambientLight = new THREE.AmbientLight(0x0a101d, 2.5);
      scene.add(ambientLight);

      const light1 = new THREE.DirectionalLight(0x3b82f6, 3.5);
      light1.position.set(5, 5, 5);
      scene.add(light1);

      const light2 = new THREE.DirectionalLight(0xa855f7, 2.0);
      light2.position.set(-5, -5, -2);
      scene.add(light2);

      // --- Background Starfield ---
      const starCount = 60;
      starGeom = new THREE.BufferGeometry();
      const starPositions = new Float32Array(starCount * 3);
      for (let i = 0; i < starCount * 3; i += 3) {
        starPositions[i] = -10 + Math.random() * 20;
        starPositions[i + 1] = -5 + Math.random() * 10;
        starPositions[i + 2] = -10 + Math.random() * 10;
      }
      starGeom.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
      starMat = new THREE.PointsMaterial({
        color: 0x3b82f6,
        size: 0.05,
        transparent: true,
        opacity: 0.45,
        sizeAttenuation: true
      });
      const stars = new THREE.Points(starGeom, starMat);
      scene.add(stars);

      // --- Timeline Spline Curve ---
      const splinePoints = [
        new THREE.Vector3(-5.0, -0.5, 0),
        new THREE.Vector3(-1.8, 0.6, -1.0),
        new THREE.Vector3(1.8, -0.6, -1.0),
        new THREE.Vector3(5.0, 0.5, 0)
      ];

      const splineCurve = new THREE.CatmullRomCurve3(splinePoints);
      
      const splinePointsCount = 100;
      const splineSpacedPoints = splineCurve.getPoints(splinePointsCount);
      splineGeom = new THREE.BufferGeometry().setFromPoints(splineSpacedPoints);
      
      splineMat = new THREE.LineBasicMaterial({
        color: 0xa855f7,
        transparent: true,
        opacity: 0.4,
        linewidth: 2
      });
      const splineLine = new THREE.Line(splineGeom, splineMat);
      scene.add(splineLine);

      // --- Interactive Milestone Nodes ---
      nodeGeom = new THREE.OctahedronGeometry(0.3, 0);
      const nodeWireMat = new THREE.MeshBasicMaterial({
        color: 0x3b82f6,
        wireframe: true,
        transparent: true,
        opacity: 0.5
      });

      const nodeCoreMat = new THREE.MeshStandardMaterial({
        color: 0x080d1a,
        roughness: 0.2,
        metalness: 0.9,
        transparent: true,
        opacity: 0.8
      });

      ringGeom = new THREE.TorusGeometry(0.48, 0.02, 8, 24);
      ringMat = new THREE.MeshBasicMaterial({
        color: 0xa855f7,
        transparent: true,
        opacity: 0.4
      });

      milestones.forEach((_, index) => {
        const u = index / (milestones.length - 1);
        const position = splineCurve.getPointAt(u);

        const nodeGroup = new THREE.Group();
        nodeGroup.position.copy(position);
        scene.add(nodeGroup);

        const coreMesh = new THREE.Mesh(nodeGeom, nodeCoreMat);
        const wireMesh = new THREE.Mesh(nodeGeom, nodeWireMat);
        nodeGroup.add(coreMesh);
        nodeGroup.add(wireMesh);

        const ringMesh = new THREE.Mesh(ringGeom, ringMat);
        ringMesh.rotation.x = Math.PI / 3;
        nodeGroup.add(ringMesh);

        nodeMeshes.push({
          group: nodeGroup,
          core: coreMesh,
          wire: wireMesh,
          ring: ringMesh,
          pos: position,
          index
        });
      });

      const adjustCamera = () => {
        const w = container.clientWidth || 800;
        const h = container.clientHeight || 550;
        renderer.setSize(w, h);
        camera.aspect = w / h;
        
        if (w < 768) {
          camera.position.set(0, 0, 8.5);
        } else {
          camera.position.set(0, 0, 7.0);
        }
        camera.updateProjectionMatrix();
      };
      adjustCamera();

      handleResize = () => {
        adjustCamera();
      };
      window.addEventListener('resize', handleResize);

      handleMouseDown = (e) => {
        stateRef.current.isDragging = true;
        stateRef.current.startX = e.clientX;
      };

      handleMouseMove = (e) => {
        if (!stateRef.current.isDragging) return;
        const deltaX = e.clientX - stateRef.current.startX;
        if (Math.abs(deltaX) > 40) {
          stateRef.current.isDragging = false;
          if (deltaX > 0) {
            const prev = Math.max(0, stateRef.current.currentSlide - 1);
            stateRef.current.currentSlide = prev;
            setCurrentSlide(prev);
          } else {
            const next = Math.min(milestones.length - 1, stateRef.current.currentSlide + 1);
            stateRef.current.currentSlide = next;
            setCurrentSlide(next);
          }
        }
      };

      handleMouseUp = () => {
        stateRef.current.isDragging = false;
      };

      handleTouchStart = (e) => {
        if (e.touches.length > 0) {
          stateRef.current.isDragging = true;
          stateRef.current.startX = e.touches[0].clientX;
        }
      };

      handleTouchMove = (e) => {
        if (!stateRef.current.isDragging || e.touches.length === 0) return;
        const deltaX = e.touches[0].clientX - stateRef.current.startX;
        if (Math.abs(deltaX) > 35) {
          stateRef.current.isDragging = false;
          if (deltaX > 0) {
            const prev = Math.max(0, stateRef.current.currentSlide - 1);
            stateRef.current.currentSlide = prev;
            setCurrentSlide(prev);
          } else {
            const next = Math.min(milestones.length - 1, stateRef.current.currentSlide + 1);
            stateRef.current.currentSlide = next;
            setCurrentSlide(next);
          }
        }
      };

      handleTouchEnd = () => {
        stateRef.current.isDragging = false;
      };

      canvas.addEventListener('mousedown', handleMouseDown);
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);

      canvas.addEventListener('touchstart', handleTouchStart, { passive: true });
      canvas.addEventListener('touchmove', handleTouchMove, { passive: true });
      canvas.addEventListener('touchend', handleTouchEnd, { passive: true });

      let time = 0;
      const animate = () => {
        try {
          frameId = requestAnimationFrame(animate);
          time += 0.015;

          stars.rotation.y = time * 0.02;

          const activeIdx = stateRef.current.currentSlide;
          const activeNodePos = nodeMeshes[activeIdx] ? nodeMeshes[activeIdx].pos : new THREE.Vector3(0, 0, 0);

          const targetCamX = activeNodePos.x;
          const targetCamY = activeNodePos.y + 0.1;
          const targetCamZ = activeNodePos.z + (window.innerWidth < 768 ? 4.8 : 3.8);

          camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetCamX, 0.08);
          camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetCamY, 0.08);
          camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetCamZ, 0.08);

          nodeMeshes.forEach((node, i) => {
            const isActive = i === activeIdx;

            node.core.rotation.y += isActive ? 0.045 : 0.015;
            node.core.rotation.x += isActive ? 0.025 : 0.008;

            node.ring.rotation.z -= isActive ? 0.03 : 0.01;

            const offset = Math.sin(time * 3 + i * 2) * 0.04;
            node.group.position.y = node.pos.y + offset;

            const scaleTarget = isActive ? 1.3 : 0.85;
            node.group.scale.setScalar(THREE.MathUtils.lerp(node.group.scale.x, scaleTarget, 0.1));

            if (node.wire.material) {
              node.wire.material.color.setHex(isActive ? 0xa855f7 : 0x3b82f6);
              node.wire.material.opacity = isActive ? 0.85 : 0.45;
            }
          });

          renderer.render(scene, camera);
        } catch (animateErr) {
          console.error("Three.js Timeline Animation crashed:", animateErr);
          if (frameId) cancelAnimationFrame(frameId);
          setTimeout(() => setHasError(true), 0);
        }
      };

      animate();

    } catch (err) {
      console.warn("Three.js Timeline WebGL context initialization failed:", err);
      setTimeout(() => setHasError(true), 0);
    }

    return () => {
      if (frameId) cancelAnimationFrame(frameId);

      if (handleResize) window.removeEventListener('resize', handleResize);
      if (handleMouseMove) window.removeEventListener('mousemove', handleMouseMove);
      if (handleMouseUp) window.removeEventListener('mouseup', handleMouseUp);

      if (canvas) {
        if (handleMouseDown) canvas.removeEventListener('mousedown', handleMouseDown);
        if (handleTouchStart) canvas.removeEventListener('touchstart', handleTouchStart);
        if (handleTouchMove) canvas.removeEventListener('touchmove', handleTouchMove);
        if (handleTouchEnd) canvas.removeEventListener('touchend', handleTouchEnd);
      }

      if (splineGeom) splineGeom.dispose();
      if (splineMat) splineMat.dispose();
      if (starGeom) starGeom.dispose();
      if (starMat) starMat.dispose();
      if (nodeGeom) nodeGeom.dispose();
      if (ringGeom) ringGeom.dispose();
      if (ringMat) ringMat.dispose();

      if (scene) scene.clear();
      if (renderer) renderer.dispose();
    };
  }, [hasError]);

  const handleNext = () => {
    const next = Math.min(milestones.length - 1, stateRef.current.currentSlide + 1);
    stateRef.current.currentSlide = next;
    setCurrentSlide(next);
  };

  const handlePrev = () => {
    const prev = Math.max(0, stateRef.current.currentSlide - 1);
    stateRef.current.currentSlide = prev;
    setCurrentSlide(prev);
  };

  const activeMilestone = milestones[currentSlide] || milestones[0];

  if (hasError) {
    return (
      <section id="experience" className="experience section-container">
        <h2 className="section-title">
          Educational <span>Qualifications</span>
        </h2>
        
        <div className="experience-terminal glass">
          <div className="terminal-body">
            <div className="fallback-timeline">
              {milestones.map((ms, index) => (
                <div key={index} className="fallback-timeline-item">
                  <div className="fallback-timeline-badge">{ms.year}</div>
                  <div className="fallback-timeline-content glass">
                    <div className="fallback-header">
                      <span className="fallback-icon-box">{ms.icon}</span>
                      <div>
                        <h3>{ms.title}</h3>
                        <h4 className="text-gradient">{ms.subtitle}</h4>
                      </div>
                    </div>
                    <span className="fallback-score">{ms.score}</span>
                    <p>{ms.details}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="experience" className="experience section-container">
      <h2 className="section-title">
        Educational <span>Qualifications</span>
      </h2>

      <div className="timeline-3d-wrapper">
        <div className="hud-header-bar">
          <Calendar size={14} className="terminal-prompt" />
          <span className="telemetry-log">Qualifications History • Drag timeline or click nodes to interact</span>
        </div>

        {/* 3D WebGL Container */}
        <div ref={containerRef} className="timeline-canvas-container">
          <canvas ref={canvasRef} className="timeline-three-canvas" />
        </div>

        {/* Holographic Overlaid Info Panel */}
        <div className="hologram-info-panel glass">
          <div className="milestone-chrono-tag">
            YEAR / DURATION: <span className="text-gradient font-bold">{activeMilestone.year}</span>
          </div>

          <div className="milestone-header">
            <span className="milestone-icon text-gradient">{activeMilestone.icon}</span>
            <div className="milestone-titles">
              <h3>{activeMilestone.title}</h3>
              <h4 className="milestone-subtitle">{activeMilestone.subtitle}</h4>
            </div>
          </div>

          <div className="milestone-data-metrics">
            <span className="metric-badge magenta-badge">{activeMilestone.score}</span>
          </div>

          <p className="milestone-desc">
            {activeMilestone.details}
          </p>
        </div>

        {/* HUD Interactive Controls */}
        <div className="hud-timeline-controls">
          <button 
            className="hud-btn prev" 
            onClick={handlePrev} 
            disabled={currentSlide === 0}
            aria-label="Previous Milestone"
          >
            <ChevronLeft size={20} className="glow-icon" />
            <span className="btn-label">Back</span>
          </button>

          <div className="hud-timeline-indicators">
            {milestones.map((ms, idx) => (
              <div
                key={idx}
                className={`timeline-dot ${idx === currentSlide ? 'active' : ''}`}
                onClick={() => {
                  stateRef.current.currentSlide = idx;
                  setCurrentSlide(idx);
                }}
              >
                <span className="dot-year">{ms.year}</span>
              </div>
            ))}
          </div>

          <button 
            className="hud-btn next" 
            onClick={handleNext} 
            disabled={currentSlide === milestones.length - 1}
            aria-label="Next Milestone"
          >
            <span className="btn-label">Next</span>
            <ChevronRight size={20} className="glow-icon" />
          </button>
        </div>

        <div className="hud-footer-bar">
          <span className="diagnostic-prompt">Education History</span>
          <span className="diagnostic-prompt telemetry">Interactive 3D Spline</span>
        </div>
      </div>
    </section>
  );
};

export default Experience;
