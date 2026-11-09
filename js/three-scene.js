/**
 * BÙI THANH VƯƠNG — 3D ARCHITECTURAL DATA CORE (Three.js WebGL Engine)
 * Quiet Luxury interactive 3D sculpture representing Database Schemas,
 * Service-Repository Decoupling, and High-Concurrency Backend Pipelines.
 * Locked at 60fps with IntersectionObserver viewport culling.
 */

(function () {
  function initHero3DScene() {
    const canvas = document.getElementById("hero-webgl-canvas");
    const container = document.getElementById("hero-3d-stage");
    if (!canvas || !container || typeof THREE === "undefined") {
      return;
    }

    // Scene, Camera & Renderer Setup
    const scene = new THREE.Scene();

    const getWidth = () => container.clientWidth || 600;
    const getHeight = () => container.clientHeight || 540;

    const camera = new THREE.PerspectiveCamera(42, getWidth() / getHeight(), 0.1, 100);
    camera.position.set(0, 0.2, 7.6);

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        antialias: true,
        alpha: true,
        powerPreference: "high-performance"
      });
    } catch (e) {
      console.warn("WebGL unavailable, using fallback.", e);
      return;
    }

    renderer.setSize(getWidth(), getHeight());
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

    // Lighting — Quiet Luxury Warm Champagne & Cool Steel Rim Light
    const ambientLight = new THREE.AmbientLight(0xf4f1ea, 0.55);
    scene.add(ambientLight);

    const champagneLight = new THREE.PointLight(0xc9a96e, 2.4, 22);
    champagneLight.position.set(4.5, 4.0, 5.0);
    scene.add(champagneLight);

    const steelRimLight = new THREE.PointLight(0x7ca3c7, 1.4, 20);
    steelRimLight.position.set(-5.0, -3.5, 3.0);
    scene.add(steelRimLight);

    const emeraldCoreLight = new THREE.PointLight(0x64a687, 1.1, 12);
    emeraldCoreLight.position.set(0, -4.0, -2.0);
    scene.add(emeraldCoreLight);

    // Master Group
    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    // 1. Inner Obsidian Faceted Core (Database Persistence Kernel)
    const coreGeo = new THREE.IcosahedronGeometry(1.18, 1);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x12141c,
      roughness: 0.28,
      metalness: 0.85,
      flatShading: true
    });
    const innerCoreMesh = new THREE.Mesh(coreGeo, coreMat);
    rootGroup.add(innerCoreMesh);

    // 2. Outer Champagne Wireframe Cage (Schema & Entity Relationships)
    const cageGeo = new THREE.IcosahedronGeometry(1.52, 1);
    const cageEdges = new THREE.EdgesGeometry(cageGeo);
    const cageMat = new THREE.LineBasicMaterial({
      color: 0xc9a96e,
      transparent: true,
      opacity: 0.52
    });
    const wireframeCage = new THREE.LineSegments(cageEdges, cageMat);
    rootGroup.add(wireframeCage);

    // 3. Vertex Nodes on the Schema Cage (Representing Tables: Parts, Revisions, Versions, Groups)
    const vertexPositions = cageGeo.attributes.position;
    const uniqueVerts = [];
    const seen = new Set();
    for (let i = 0; i < vertexPositions.count; i++) {
      const vx = vertexPositions.getX(i).toFixed(3);
      const vy = vertexPositions.getY(i).toFixed(3);
      const vz = vertexPositions.getZ(i).toFixed(3);
      const key = `${vx},${vy},${vz}`;
      if (!seen.has(key)) {
        seen.add(key);
        uniqueVerts.push(new THREE.Vector3(parseFloat(vx), parseFloat(vy), parseFloat(vz)));
      }
    }

    const nodeGroup = new THREE.Group();
    const nodeGeo = new THREE.SphereGeometry(0.048, 12, 12);
    const nodeMatGold = new THREE.MeshBasicMaterial({ color: 0xe6cfa3 });
    const nodeMatEmerald = new THREE.MeshBasicMaterial({ color: 0x64a687 });

    uniqueVerts.forEach((vec, idx) => {
      const mesh = new THREE.Mesh(nodeGeo, idx % 4 === 0 ? nodeMatEmerald : nodeMatGold);
      mesh.position.copy(vec);
      nodeGroup.add(mesh);
    });
    rootGroup.add(nodeGroup);

    // 4. Three Concentric Architectural Orbital Rings (API / Service / Repository Layers)
    const ringsGroup = new THREE.Group();
    rootGroup.add(ringsGroup);

    function createLuxuryRing(radius, tube, color, opacity, rotX, rotY, rotZ) {
      const ringContainer = new THREE.Group();
      const torusGeo = new THREE.TorusGeometry(radius, tube, 16, 120);
      const torusMat = new THREE.MeshBasicMaterial({
        color: color,
        transparent: true,
        opacity: opacity
      });
      const torusMesh = new THREE.Mesh(torusGeo, torusMat);
      ringContainer.add(torusMesh);

      // Orbiting Data Packet Sphere on the ring
      const packetGeo = new THREE.SphereGeometry(0.065, 14, 14);
      const packetMat = new THREE.MeshBasicMaterial({ color: 0xf4f1ea });
      const packetMesh = new THREE.Mesh(packetGeo, packetMat);
      packetMesh.position.set(radius, 0, 0);
      ringContainer.add(packetMesh);

      ringContainer.rotation.set(rotX, rotY, rotZ);
      return { group: ringContainer, torusMat, radius, packetMesh };
    }

    const ring1 = createLuxuryRing(2.15, 0.009, 0xc9a96e, 0.45, Math.PI / 3.1, 0.25, 0.1);
    const ring2 = createLuxuryRing(2.58, 0.007, 0x7ca3c7, 0.32, -Math.PI / 4.2, -0.4, 0.3);
    const ring3 = createLuxuryRing(2.96, 0.006, 0x64a687, 0.26, Math.PI / 2.2, 0.15, -0.35);

    ringsGroup.add(ring1.group, ring2.group, ring3.group);

    // 5. Ambient Floating Architectural Dust Particles
    const particleCount = 140;
    const particleGeo = new THREE.BufferGeometry();
    const posArray = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      const r = 2.2 + Math.random() * 2.8;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      posArray[i] = r * Math.sin(phi) * Math.cos(theta);
      posArray[i + 1] = r * Math.sin(phi) * Math.sin(theta);
      posArray[i + 2] = r * Math.cos(phi);
    }

    particleGeo.setAttribute("position", new THREE.BufferAttribute(posArray, 3));
    const particleMat = new THREE.PointsMaterial({
      size: 0.032,
      color: 0xe5cfa0,
      transparent: true,
      opacity: 0.55
    });
    const particleSystem = new THREE.Points(particleGeo, particleMat);
    scene.add(particleSystem);

    // Topology Mode Presets (Controlled by HUD Buttons)
    const modePresets = {
      schema: {
        cageScale: 1.0,
        coreScale: 1.0,
        ringsScale: 1.0,
        speedMultiplier: 1.0,
        cameraZ: 7.6,
        cageOpacity: 0.58,
        label: "POSTGRESQL / MYSQL RELATIONAL TOPOLOGY",
        telemetry: "INDEXING: COMPOSITE B-TREE // LATENCY: -30%"
      },
      service: {
        cageScale: 0.84,
        coreScale: 0.78,
        ringsScale: 1.12,
        speedMultiplier: 1.45,
        cameraZ: 7.2,
        cageOpacity: 0.35,
        label: "SERVICE-REPOSITORY DECOUPLED PIPELINE",
        telemetry: "GRAPHQL & REST // FORMREQUEST & MIDDLEWARE"
      },
      concurrency: {
        cageScale: 1.16,
        coreScale: 1.12,
        ringsScale: 0.94,
        speedMultiplier: 2.1,
        cameraZ: 6.9,
        cageOpacity: 0.75,
        label: "SPRING BOOT @TRANSACTIONAL & @SCHEDULED ENGINE",
        telemetry: "WMS AVAILABLE / RESERVED QTY // ACID LOCKED"
      }
    };

    let currentPreset = modePresets.schema;

    // Bind HUD Mode Buttons
    const modeButtons = document.querySelectorAll("[data-topology-mode]");
    const hudModeTitle = document.getElementById("hud-topology-title");
    const hudModeTelemetry = document.getElementById("hud-topology-telemetry");

    modeButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const modeKey = btn.getAttribute("data-topology-mode");
        if (modePresets[modeKey]) {
          currentPreset = modePresets[modeKey];
          modeButtons.forEach((b) => b.classList.remove("active"));
          btn.classList.add("active");

          if (hudModeTitle) hudModeTitle.textContent = currentPreset.label;
          if (hudModeTelemetry) hudModeTelemetry.textContent = currentPreset.telemetry;
        }
      });
    });

    // Mouse Interactive Parallax & Drag Controls
    let targetMouseX = 0;
    let targetMouseY = 0;
    let smoothMouseX = 0;
    let smoothMouseY = 0;
    let isPointerDown = false;
    let dragOffsetX = 0;
    let dragOffsetY = 0;
    let lastPointerX = 0;
    let lastPointerY = 0;

    window.addEventListener(
      "mousemove",
      (e) => {
        const normX = (e.clientX / window.innerWidth) * 2 - 1;
        const normY = -(e.clientY / window.innerHeight) * 2 + 1;
        targetMouseX = normX * 0.55;
        targetMouseY = normY * 0.42;

        if (isPointerDown) {
          const dx = e.clientX - lastPointerX;
          const dy = e.clientY - lastPointerY;
          dragOffsetY += dx * 0.007;
          dragOffsetX += dy * 0.007;
          lastPointerX = e.clientX;
          lastPointerY = e.clientY;
        }
      },
      { passive: true }
    );

    canvas.addEventListener("mousedown", (e) => {
      isPointerDown = true;
      lastPointerX = e.clientX;
      lastPointerY = e.clientY;
    });

    window.addEventListener("mouseup", () => {
      isPointerDown = false;
    });

    // Pause WebGL loop when scrolled out of view to preserve 60fps
    let isVisible = true;
    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            isVisible = entry.isIntersecting;
          });
        },
        { threshold: 0.05 }
      );
      observer.observe(container);
    }

    // Responsive Resize
    window.addEventListener("resize", () => {
      const w = getWidth();
      const h = getHeight();
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    });

    // Animation Loop (60fps)
    const clock = new THREE.Clock();

    function animate() {
      requestAnimationFrame(animate);
      if (!isVisible) return;

      const elapsed = clock.getElapsedTime();
      const speed = currentPreset.speedMultiplier;

      // Smooth lerp for mouse reaction
      smoothMouseX += (targetMouseX - smoothMouseX) * 0.05;
      smoothMouseY += (targetMouseY - smoothMouseY) * 0.05;

      // Smooth lerp for preset morphing
      wireframeCage.scale.lerp(
        new THREE.Vector3(currentPreset.cageScale, currentPreset.cageScale, currentPreset.cageScale),
        0.05
      );
      nodeGroup.scale.copy(wireframeCage.scale);

      innerCoreMesh.scale.lerp(
        new THREE.Vector3(currentPreset.coreScale, currentPreset.coreScale, currentPreset.coreScale),
        0.05
      );

      ringsGroup.scale.lerp(
        new THREE.Vector3(currentPreset.ringsScale, currentPreset.ringsScale, currentPreset.ringsScale),
        0.05
      );

      cageMat.opacity += (currentPreset.cageOpacity - cageMat.opacity) * 0.06;
      camera.position.z += (currentPreset.cameraZ - camera.position.z) * 0.05;

      // Rotate Core & Cage in counter-harmony
      innerCoreMesh.rotation.y = elapsed * 0.18 * speed;
      innerCoreMesh.rotation.x = elapsed * 0.11 * speed;

      wireframeCage.rotation.y = -elapsed * 0.14 * speed;
      wireframeCage.rotation.z = elapsed * 0.08 * speed;
      nodeGroup.rotation.copy(wireframeCage.rotation);

      // Orbital Rings Rotation
      ring1.group.rotation.z = elapsed * 0.32 * speed;
      ring2.group.rotation.z = -elapsed * 0.24 * speed;
      ring3.group.rotation.z = elapsed * 0.19 * speed;

      // Root group mouse parallax + drag offset
      rootGroup.rotation.y = smoothMouseX * 0.75 + dragOffsetY + Math.sin(elapsed * 0.25) * 0.08;
      rootGroup.rotation.x = -smoothMouseY * 0.55 + dragOffsetX;

      // Subtle floating levitation
      rootGroup.position.y = Math.sin(elapsed * 1.1) * 0.09;

      // Particle field slow drift
      particleSystem.rotation.y = elapsed * 0.03 + smoothMouseX * 0.2;
      particleSystem.rotation.x = -smoothMouseY * 0.15;

      renderer.render(scene, camera);
    }

    animate();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initHero3DScene);
  } else {
    initHero3DScene();
  }
})();
