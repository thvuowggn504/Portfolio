import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import * as THREE from "three";

/**
 * ============================================================================
 * BÙI THANH VƯƠNG — QUIET LUXURY BACKEND DEVELOPER PORTFOLIO (REACT EDITION)
 * Tech Stack: React 18+, Framer Motion, Three.js WebGL, Tailwind CSS, 3D Tilt
 * ============================================================================
 */

const PROFILE_DATA = {
  name: "Bùi Thanh Vương",
  role: "Backend Developer (Chuyên PHP/Laravel & Java/Spring Boot)",
  phone: "034 6638 136",
  email: "bthvuong23@gmail.com",
  location: "TP. Hồ Chí Minh",
  summary:
    "Có kinh nghiệm xây dựng hệ thống PLM, SCM; thế mạnh về thiết kế cơ sở dữ liệu, tối ưu truy vấn SQL (giảm 30% thời gian), phát triển RESTful/GraphQL API và áp dụng Service-Repository Pattern.",
};

const SKILL_GROUPS = [
  {
    id: "01",
    title: "Programming & Backend",
    subtitle: "Core Languages, Frameworks & API Protocols",
    items: [
      "PHP 8+",
      "Java",
      "SQL",
      "Laravel",
      "Spring Boot",
      "Eloquent ORM",
      "Spring Data JPA",
      "RESTful API",
      "GraphQL",
    ],
  },
  {
    id: "02",
    title: "Database & Architecture",
    subtitle: "Relational Modeling, Tuning & Clean Architecture",
    items: [
      "PostgreSQL",
      "MySQL",
      "Database Schema Design",
      "Indexing",
      "Service-Repository Pattern",
      "Business Logic",
      "Versioning",
    ],
  },
  {
    id: "03",
    title: "Tools & Security",
    subtitle: "Containerization, Version Control & Request Guards",
    items: [
      "Git",
      "Gitflow",
      "Docker",
      "Docker Compose",
      "Postman",
      "FormRequest",
      "Middleware",
    ],
  },
  {
    id: "04",
    title: "Frontend (Hỗ trợ thêm)",
    subtitle: "Modern UI Integration & Reactive State",
    items: ["React Hooks", "Axios", "Tailwind CSS"],
  },
];

const PROJECTS = [
  {
    id: "plm",
    code: "01 // TCOM — PLM SYSTEM",
    title: "Hệ thống Quản lý Vòng đời Sản phẩm (PLM)",
    stack: "PHP 8+ • Laravel • PostgreSQL • GraphQL • Docker",
    badge: "-30% SQL Query Time",
    period: "02/2025 - 08/2025",
    highlights: [
      "Thiết kế schema PostgreSQL chuẩn hóa cho các thực thể: Parts, Revisions, Versions, Groups.",
      "Tối ưu hóa truy vấn SQL và đánh chỉ mục giúp giảm 30% thời gian thực thi.",
      "Triển khai luồng quản lý phiên bản chặt chẽ: Draft → Published → Archived.",
      "Phát triển GraphQL API áp dụng Service-Repository Pattern, bảo mật bằng FormRequest và Custom Middleware trên môi trường Docker.",
    ],
    tags: [
      "PHP 8+",
      "Laravel",
      "PostgreSQL",
      "GraphQL",
      "Service-Repository",
      "FormRequest",
      "Custom Middleware",
      "Docker",
    ],
  },
  {
    id: "scm",
    code: "02 // TCOM — SCM SYSTEM",
    title: "Hệ thống Quản lý Chuỗi Cung ứng (SCM: WMS & TMS)",
    stack: "Java • Spring Boot • Spring Data JPA • RESTful API",
    badge: "@Transactional & @Scheduled",
    period: "02/2025 - 08/2025",
    highlights: [
      "Phát triển WMS (Warehouse Management System) quản lý kho bãi và định lượng tồn kho kép (Available Quantity / Reserved Quantity).",
      "Đảm bảo tính toàn vẹn dữ liệu giao dịch đồng thời với @Transactional và tự động hóa tác vụ ngầm bằng @Scheduled.",
      "Phát triển TMS (Transport Management System) quản lý đội phương tiện vận tải và điều phối tài xế.",
    ],
    tags: [
      "Java",
      "Spring Boot",
      "Spring Data JPA",
      "@Transactional",
      "@Scheduled",
      "WMS",
      "TMS",
      "RESTful API",
    ],
  },
  {
    id: "survey",
    code: "03 // PERSONAL FLAGSHIP",
    title: "Hệ thống Khảo sát & Đánh giá Tương tác",
    stack: "Laravel • GraphQL • MySQL • React • Tailwind CSS • Docker • Nginx",
    badge: "Real-Time Multi-Tab Sync",
    period: "2025",
    highlights: [
      "Xây dựng đầy đủ chức năng CRUD câu hỏi (Questions) và lựa chọn (Options) linh hoạt.",
      "Tích hợp GraphQL API kết hợp kỹ thuật Optimistic Updates giúp giao diện phản hồi tức thì.",
      "Đồng bộ dữ liệu real-time mượt mà giữa các tab trình duyệt đang mở, đóng gói hoàn chỉnh với Docker & Nginx.",
    ],
    tags: [
      "Laravel",
      "GraphQL",
      "MySQL",
      "React Hooks",
      "Tailwind CSS",
      "Optimistic Updates",
      "Docker",
      "Nginx",
    ],
  },
];

/**
 * 3D Interactive Card using Framer Motion Spring Physics (60fps)
 */
function LuxuryTiltCard({ children, className = "" }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 180, damping: 22 });
  const mouseYSpring = useSpring(y, { stiffness: 180, damping: 22 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5.5deg", "-5.5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5.5deg", "5.5deg"]);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const pctX = (e.clientX - rect.left) / rect.width - 0.5;
    const pctY = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(pctX);
    y.set(pctY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className={`relative bg-[#111319]/90 border border-[#C9A96E]/20 hover:border-[#C9A96E]/50 transition-colors duration-500 backdrop-blur-xl ${className}`}
    >
      <div style={{ transform: "translateZ(20px)" }}>{children}</div>
    </motion.div>
  );
}

/**
 * Three.js WebGL 3D Architectural Core Canvas
 */
function ThreeArchitecturalCore() {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      42,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.z = 7.4;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    // Inner Obsidian Core
    const coreGeo = new THREE.IcosahedronGeometry(1.15, 1);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x12141c,
      roughness: 0.3,
      metalness: 0.85,
      flatShading: true,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    group.add(coreMesh);

    // Champagne Gold Geodesic Wireframe
    const cageGeo = new THREE.IcosahedronGeometry(1.5, 1);
    const cageEdges = new THREE.EdgesGeometry(cageGeo);
    const cageMat = new THREE.LineBasicMaterial({
      color: 0xc9a96e,
      transparent: true,
      opacity: 0.55,
    });
    const cageLines = new THREE.LineSegments(cageEdges, cageMat);
    group.add(cageLines);

    // Orbital Rings
    const ringGeo = new THREE.TorusGeometry(2.3, 0.008, 16, 100);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0xc9a96e,
      transparent: true,
      opacity: 0.4,
    });
    const ring1 = new THREE.Mesh(ringGeo, ringMat);
    ring1.rotation.set(Math.PI / 3, 0.2, 0);
    group.add(ring1);

    // Lights
    scene.add(new THREE.AmbientLight(0xf4f1ea, 0.6));
    const pointLight = new THREE.PointLight(0xc9a96e, 2.2, 20);
    pointLight.position.set(4, 4, 5);
    scene.add(pointLight);

    let mouseX = 0;
    let mouseY = 0;
    const onMouseMove = (e) => {
      mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", onMouseMove, { passive: true });

    let frameId;
    const clock = new THREE.Clock();
    const animate = () => {
      frameId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();
      coreMesh.rotation.y = t * 0.2;
      cageLines.rotation.y = -t * 0.15;
      ring1.rotation.z = t * 0.3;
      group.rotation.y += (mouseX * 0.6 - group.rotation.y) * 0.05;
      group.rotation.x += (-mouseY * 0.4 - group.rotation.x) * 0.05;
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("mousemove", onMouseMove);
      renderer.dispose();
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} className="w-full h-[460px]" />;
}

/**
 * Celestial White Silk Fish, Stardust Trail & Gentle Water Ripples (React Canvas Hook)
 */
function CelestialWhiteFishCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const onResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    onResize();
    window.addEventListener("resize", onResize);

    const NUM_NODES = 24;
    const SEG_LEN = 8.8;
    const WIDTHS = [
      11.5, 16.2, 18.8, 19.4, 18.6, 17.2, 15.5, 13.8, 12.0, 10.2,
      8.6, 7.2, 5.9, 4.8, 3.9, 3.1, 2.5, 2.0, 1.6, 1.3, 1.0, 0.8, 0.6, 0.4
    ];

    const spine = Array.from({ length: NUM_NODES }, (_, i) => ({
      x: width * 0.72,
      y: height * 0.42 - i * SEG_LEN,
      angle: Math.PI * 0.5,
    }));

    const stars = [];
    const ripples = [];
    let heading = Math.PI * 0.5;
    let targetHeading = Math.PI * 0.5;
    let scrollMode = "idle";
    let scrollMomentum = 0;
    let lastScrollY = window.scrollY || 0;
    let lastScrollTime = performance.now();

    // Sunbird & Left Branch state
    const sunbird = {
      state: "perched",
      x: 96,
      y: height * 0.52 - 18,
      wingOpen: 0,
      wingPhase: 0,
      branchSway: 0,
      branchVel: 0,
    };

    const onScroll = () => {
      const sy = window.scrollY || 0;
      const dy = sy - lastScrollY;
      lastScrollY = sy;
      if (Math.abs(dy) < 0.5) return;
      lastScrollTime = performance.now();
      scrollMomentum = Math.min(scrollMomentum + Math.abs(dy) * 0.032, 3.5);
      scrollMode = dy > 0 ? "down" : "up";
      if (sunbird.state === "perched") {
        sunbird.branchVel += 0.06;
      }
      sunbird.state = "flying_up";
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    let rafId;
    const animate = (now) => {
      rafId = requestAnimationFrame(animate);
      const t = now * 0.001;
      ctx.clearRect(0, 0, width, height);

      scrollMomentum *= 0.945;
      if (now - lastScrollTime > 420) {
        scrollMode = "idle";
        if (sunbird.state === "flying_up") sunbird.state = "returning";
      }

      // 1. Update & Draw Left Branch + Sunbird
      sunbird.branchVel += -sunbird.branchSway * 0.12;
      sunbird.branchVel *= 0.88;
      sunbird.branchSway += sunbird.branchVel;

      const baseY = height * 0.52;
      const perchX = width < 640 ? 64 : 102;
      const swayOffset = Math.sin(sunbird.branchSway) * 14;
      const perchY = baseY - 18 + swayOffset;

      if (sunbird.state === "perched") {
        sunbird.x = perchX;
        sunbird.y = perchY;
        sunbird.wingOpen += (0 - sunbird.wingOpen) * 0.18;
      } else if (sunbird.state === "flying_up") {
        sunbird.wingPhase += 0.35;
        sunbird.wingOpen += (1 - sunbird.wingOpen) * 0.2;
        const flyX = perchX + 18 + Math.sin(t * 3.2) * 18;
        const flyY = height * 0.2 + Math.cos(t * 2.6) * 14;
        sunbird.x += (flyX - sunbird.x) * 0.08;
        sunbird.y += (flyY - sunbird.y) * 0.085;
      } else {
        sunbird.wingPhase += 0.25;
        sunbird.x += (perchX - sunbird.x) * 0.095;
        sunbird.y += (perchY - sunbird.y) * 0.095;
        if (Math.hypot(perchX - sunbird.x, perchY - sunbird.y) < 3.5) {
          sunbird.state = "perched";
          sunbird.branchVel += 0.05;
        }
      }

      // Draw Branch
      ctx.beginPath();
      ctx.moveTo(-4, baseY + 18);
      ctx.quadraticCurveTo(perchX * 0.55, baseY - 12 + swayOffset * 0.6, perchX + 44, baseY - 24 + swayOffset * 1.2);
      ctx.strokeStyle = "rgba(201, 169, 110, 0.82)";
      ctx.lineWidth = 2.5;
      ctx.stroke();

      // Draw Sunbird
      ctx.save();
      ctx.translate(sunbird.x, sunbird.y);
      ctx.beginPath();
      ctx.arc(0, -6, 6, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(238, 216, 172, 0.95)";
      ctx.fill();
      ctx.restore();

      // 2. Update & Draw Celestial White Fish (Viewport-clamped)
      const minX = Math.max(width * 0.18, 155);
      const maxX = width - Math.max(width * 0.1, 95);
      const minY = height * 0.16;
      const maxY = height * 0.8;

      if (scrollMode === "down") {
        targetHeading = Math.PI * 0.5 + Math.sin(t * 2.0) * 0.45;
      } else if (scrollMode === "up") {
        targetHeading = -Math.PI * 0.5 + Math.sin(t * 2.0) * 0.45;
      } else {
        const tx = (minX + maxX) * 0.54 + Math.sin(t * 0.25) * ((maxX - minX) * 0.36);
        const ty = height * 0.48 + Math.sin(t * 0.5) * ((maxY - minY) * 0.24);
        targetHeading = Math.atan2(ty - spine[0].y, tx - spine[0].x);
      }

      let diff = targetHeading - heading;
      while (diff > Math.PI) diff -= Math.PI * 2;
      while (diff < -Math.PI) diff += Math.PI * 2;
      heading += diff * 0.048;

      const speed = 1.5 + scrollMomentum * 0.7;
      const swimPhase = t * (3.2 + scrollMomentum);
      const moveAngle = heading + Math.sin(swimPhase) * 0.12;

      let stepX = Math.cos(moveAngle) * speed;
      let stepY = Math.sin(moveAngle) * speed;
      if (scrollMode === "down" && spine[0].y > height * 0.68 && stepY > 0) {
        stepY *= Math.max(0, 1 - (spine[0].y - height * 0.68) / (height * 0.14));
      } else if (scrollMode === "up" && spine[0].y < height * 0.3 && stepY < 0) {
        stepY *= Math.max(0, 1 - (height * 0.3 - spine[0].y) / (height * 0.14));
      }

      spine[0].x = Math.max(minX, Math.min(maxX, spine[0].x + stepX));
      spine[0].y = Math.max(minY, Math.min(maxY, spine[0].y + stepY));
      spine[0].angle = moveAngle;

      for (let i = 1; i < NUM_NODES; i++) {
        const prev = spine[i - 1];
        const curr = spine[i];
        let segAngle = Math.atan2(curr.y - prev.y, curr.x - prev.x);
        const wave = Math.sin(swimPhase - i * 0.34) * (0.05 + (i / NUM_NODES) * 0.1);
        let d = prev.angle + Math.PI + wave - segAngle;
        while (d > Math.PI) d -= Math.PI * 2;
        while (d < -Math.PI) d += Math.PI * 2;
        segAngle += d * 0.4;
        curr.x = prev.x + Math.cos(segAngle) * SEG_LEN;
        curr.y = prev.y + Math.sin(segAngle) * SEG_LEN;
        curr.angle = segAngle - Math.PI;
      }

      // Emit stardust from tail tip
      const tailTip = spine[NUM_NODES - 1];
      if (Math.random() < 0.58) {
        stars.push({
          x: tailTip.x + (Math.random() - 0.5) * 14,
          y: tailTip.y + (Math.random() - 0.5) * 14,
          size: 1.5 + Math.random() * 2.5,
          alpha: 0.85,
        });
      }
      if (Math.random() < 0.04) {
        ripples.push({ x: spine[12].x, y: spine[12].y, r: 4, alpha: 0.18 });
      }

      // Draw gentle water ripples
      for (let i = ripples.length - 1; i >= 0; i--) {
        const rp = ripples[i];
        rp.r += 0.9;
        rp.alpha *= 0.965;
        if (rp.alpha < 0.008) {
          ripples.splice(i, 1);
          continue;
        }
        ctx.beginPath();
        ctx.arc(rp.x, rp.y, rp.r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(244, 241, 234, ${rp.alpha})`;
        ctx.stroke();
      }

      // Draw stardust trail
      for (let i = stars.length - 1; i >= 0; i--) {
        const s = stars[i];
        s.y -= 0.15;
        s.alpha -= 0.01;
        if (s.alpha <= 0.01) {
          stars.splice(i, 1);
          continue;
        }
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${s.alpha})`;
        ctx.fill();
      }

      // Draw rounded head dome + flowing white body contour
      const head = spine[0];
      ctx.beginPath();
      ctx.arc(head.x + Math.cos(head.angle) * 4, head.y + Math.sin(head.angle) * 4, WIDTHS[1], 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255, 255, 255, 0.96)";
      ctx.fill();

      ctx.beginPath();
      for (let i = 0; i < 18; i++) {
        const n = spine[i];
        const p = n.angle + Math.PI * 0.5;
        const lx = n.x + Math.cos(p) * WIDTHS[i];
        const ly = n.y + Math.sin(p) * WIDTHS[i];
        if (i === 0) ctx.moveTo(lx, ly);
        else ctx.lineTo(lx, ly);
      }
      for (let i = 17; i >= 0; i--) {
        const n = spine[i];
        const p = n.angle - Math.PI * 0.5;
        ctx.lineTo(n.x + Math.cos(p) * WIDTHS[i], n.y + Math.sin(p) * WIDTHS[i]);
      }
      ctx.closePath();
      ctx.fillStyle = "rgba(255, 255, 255, 0.94)";
      ctx.fill();
    };
    rafId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-20 mix-blend-screen"
    />
  );
}

export default function PortfolioBuiThanhVuong() {
  const [activeFilter, setActiveFilter] = useState("all");

  const filteredProjects =
    activeFilter === "all"
      ? PROJECTS
      : PROJECTS.filter((p) => p.id === activeFilter);

  return (
    <div className="min-h-screen bg-[#09090B] text-[#F4F1EA] selection:bg-[#C9A96E]/30">
      <CelestialWhiteFishCanvas />
      {/* HERO SECTION */}
      <section className="max-w-7xl mx-auto px-6 pt-24 pb-20 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7 space-y-6"
        >
          <div className="inline-block px-3 py-1 text-xs font-mono tracking-widest uppercase border border-[#C9A96E]/40 text-[#E6CFA3] bg-[#C9A96E]/10">
            {PROFILE_DATA.role}
          </div>
          <h1 className="text-5xl md:text-7xl font-serif tracking-tight">
            {PROFILE_DATA.name}
          </h1>
          <p className="text-[#A6A196] text-lg leading-relaxed max-w-2xl">
            {PROFILE_DATA.summary}
          </p>
          <div className="flex flex-wrap gap-4 font-mono text-xs text-[#E6CFA3]">
            <span>SĐT: {PROFILE_DATA.phone}</span>
            <span>•</span>
            <span>Email: {PROFILE_DATA.email}</span>
            <span>•</span>
            <span>Địa điểm: {PROFILE_DATA.location}</span>
          </div>
        </motion.div>

        <div className="lg:col-span-5 border border-[#C9A96E]/20 bg-[#0F1015]/80">
          <ThreeArchitecturalCore />
        </div>
      </section>

      {/* SKILLS SECTION */}
      <section className="max-w-7xl mx-auto px-6 py-20 border-t border-[#C9A96E]/15">
        <h2 className="text-3xl md:text-5xl font-serif mb-12">
          Kỹ năng Chuyên môn
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SKILL_GROUPS.map((group) => (
            <LuxuryTiltCard key={group.id} className="p-8">
              <div className="text-xs font-mono text-[#C9A96E] mb-2">
                PILLAR // {group.id}
              </div>
              <h3 className="text-2xl font-serif mb-1">{group.title}</h3>
              <p className="text-xs font-mono text-[#A6A196] mb-6">
                {group.subtitle}
              </p>
              <div className="flex flex-wrap gap-2">
                {group.items.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 text-xs font-mono border border-[#C9A96E]/25 bg-white/[0.02]"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </LuxuryTiltCard>
          ))}
        </div>
      </section>

      {/* PROJECTS & EXPERIENCE SECTION */}
      <section className="max-w-7xl mx-auto px-6 py-20 border-t border-[#C9A96E]/15">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-12">
          <h2 className="text-3xl md:text-5xl font-serif">
            Kinh nghiệm tại TCOM &amp; Dự án
          </h2>
          <div className="flex gap-2">
            {["all", "plm", "scm", "survey"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveFilter(tab)}
                className={`px-4 py-1.5 text-xs font-mono uppercase border transition-colors ${
                  activeFilter === tab
                    ? "border-[#C9A96E] bg-[#C9A96E]/20 text-[#F4F1EA]"
                    : "border-[#C9A96E]/20 text-[#A6A196]"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.45 }}
            className="space-y-6"
          >
            {filteredProjects.map((project) => (
              <LuxuryTiltCard key={project.id} className="p-8 md:p-10">
                <div className="flex flex-wrap justify-between gap-2 text-xs font-mono text-[#C9A96E] mb-3">
                  <span>{project.code}</span>
                  <span className="text-[#64A687]">{project.badge}</span>
                </div>
                <h3 className="text-3xl font-serif mb-2">{project.title}</h3>
                <p className="text-xs font-mono text-[#A6A196] mb-5">
                  {project.stack} ({project.period})
                </p>
                <ul className="space-y-2 text-sm text-[#D8D4CB] mb-6">
                  {project.highlights.map((item, idx) => (
                    <li key={idx}>▹ {item}</li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 text-xs font-mono border border-[#C9A96E]/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </LuxuryTiltCard>
            ))}
          </motion.div>
        </AnimatePresence>
      </section>
    </div>
  );
}
