/**
 * BÙI THANH VƯƠNG — PORTFOLIO CORE APPLICATION CONTROLLER
 * Handles:
 * - Dynamic rendering of Skills, Experience, Projects & Blueprint Modal
 * - 60fps 3D Perspective Tilt & Specular Glare Engine (Vanilla-Tilt physics)
 * - Dual-Ring Magnetic Luxury Cursor & Ambient Spotlight
 * - GSAP + ScrollTrigger Section Transitions & Counter Animations
 * - Interactive SQL Optimization Simulator (-30% Latency Benchmark)
 */

(function () {
  const data = window.PORTFOLIO_DATA;
  if (!data) return;

  /* ========================================================================
     1. RENDER SKILLS MATRIX (3D TILT CARDS)
     ======================================================================== */
  function renderSkills() {
    const container = document.getElementById("skills-grid-container");
    if (!container) return;

    container.innerHTML = data.skillPillars
      .map(
        (pillar) => `
      <div class="tilt-card-wrapper reveal-up">
        <article class="tilt-card corner-ornament h-full p-7 md:p-8 flex flex-col justify-between" data-tilt-max="6">
          <div class="tilt-glare"></div>

          <div class="depth-layer-1">
            <!-- Header -->
            <div class="flex items-center justify-between border-b border-[rgba(201,169,110,0.14)] pb-4 mb-5">
              <div class="flex items-center gap-3">
                <span class="font-mono-tech text-xs px-2.5 py-1 rounded-sm bg-[rgba(201,169,110,0.1)] text-[#C9A96E] border border-[rgba(201,169,110,0.28)]">
                  PILLAR // ${pillar.id}
                </span>
                <span class="font-mono-tech text-[11px] uppercase tracking-widest text-[#6E6A61]">
                  ${pillar.skills.length} MODULES
                </span>
              </div>
              <span class="w-2 h-2 rounded-full" style="background-color: ${pillar.accent}; box-shadow: 0 0 10px ${pillar.accent}"></span>
            </div>

            <!-- Title & Description -->
            <h3 class="font-display text-2xl md:text-3xl font-medium text-[#F4F1EA] tracking-wide mb-1.5">
              ${pillar.category}
            </h3>
            <p class="font-mono-tech text-xs text-[#C9A96E] mb-4">
              ${pillar.subtitle}
            </p>
            <p class="text-sm text-[#A6A196] leading-relaxed mb-6">
              ${pillar.description}
            </p>
          </div>

          <!-- Skills Badges -->
          <div class="depth-layer-2 pt-2">
            <div class="flex flex-wrap gap-2">
              ${pillar.skills
                .map(
                  (skill) => `
                <div class="tech-pill group" title="${skill.level}">
                  <span class="w-1.5 h-1.5 rounded-full bg-[#C9A96E] opacity-70 group-hover:opacity-100 transition-opacity"></span>
                  <span class="font-medium text-[#F4F1EA]">${skill.name}</span>
                  <span class="text-[10px] text-[#6E6A61] group-hover:text-[#C9A96E] transition-colors ml-0.5">
                    [${skill.tag}]
                  </span>
                </div>
              `
                )
                .join("")}
            </div>
          </div>
        </article>
      </div>
    `
      )
      .join("");
  }

  /* ========================================================================
     2. RENDER PROJECTS (3D INTERACTIVE CARDS + CATEGORY FILTER)
     ======================================================================== */
  function renderProjects(filterCategory = "all") {
    const container = document.getElementById("projects-grid-container");
    if (!container) return;

    const filtered =
      filterCategory === "all"
        ? data.projects
        : data.projects.filter((p) => p.category === filterCategory);

    container.innerHTML = filtered
      .map(
        (project) => `
      <div class="tilt-card-wrapper project-card-item" data-project-id="${project.id}">
        <article class="tilt-card corner-ornament p-7 md:p-10 transition-all duration-500" data-tilt-max="4.5">
          <div class="tilt-glare"></div>

          <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <!-- Left Column: Index, Meta & Primary Narrative (7 cols) -->
            <div class="lg:col-span-7 depth-layer-1 flex flex-col justify-between h-full">
              <div>
                <div class="flex flex-wrap items-center gap-3 mb-4">
                  <span class="font-mono-tech text-xs px-2.5 py-1 bg-[rgba(201,169,110,0.12)] text-[#E6CFA3] border border-[rgba(201,169,110,0.3)]">
                    ${project.index} // ${project.codeName}
                  </span>
                  <span class="font-mono-tech text-xs px-2.5 py-1 bg-[rgba(100,166,135,0.12)] text-[#64A687] border border-[rgba(100,166,135,0.3)]">
                    ● ${project.impactBadge}
                  </span>
                  <span class="font-mono-tech text-xs text-[#6E6A61] ml-auto">
                    ${project.organization} • ${project.period}
                  </span>
                </div>

                <h3 class="font-display text-3xl md:text-4xl font-medium text-[#F4F1EA] leading-tight mb-2">
                  ${project.title}
                </h3>
                <p class="font-mono-tech text-xs md:text-sm text-[#C9A96E] mb-5">
                  ${project.subtitle}
                </p>

                <p class="text-[#A6A196] text-sm md:text-base leading-relaxed mb-6">
                  ${project.summary}
                </p>

                <!-- Key Achievements List -->
                <div class="space-y-2.5 mb-7">
                  ${project.keyAchievements
                    .map(
                      (item) => `
                    <div class="flex items-start gap-3 text-sm text-[#D8D4CB]">
                      <span class="text-[#C9A96E] font-mono-tech mt-0.5">▹</span>
                      <span>${item}</span>
                    </div>
                  `
                    )
                    .join("")}
                </div>
              </div>

              <!-- Tech Stack Tags -->
              <div class="pt-4 border-t border-[rgba(201,169,110,0.12)] flex flex-wrap gap-2">
                ${project.technologies
                  .map(
                    (tech) => `
                  <span class="tech-pill">${tech}</span>
                `
                  )
                  .join("")}
              </div>
            </div>

            <!-- Right Column: Architectural Telemetry Preview & Blueprint Trigger (5 cols) -->
            <div class="lg:col-span-5 depth-layer-2 flex flex-col justify-between bg-[rgba(9,9,11,0.75)] border border-[rgba(201,169,110,0.18)] p-6 rounded-sm">
              <div>
                <div class="flex items-center justify-between border-b border-[rgba(201,169,110,0.12)] pb-3 mb-4">
                  <span class="font-mono-tech text-[11px] uppercase tracking-widest text-[#C9A96E]">
                    SYSTEM ARCHITECTURE PREVIEW
                  </span>
                  <span class="font-mono-tech text-[11px] text-[#64A687]">ACTIVE SPEC</span>
                </div>

                <!-- Pipeline Layers Mini Diagram -->
                <div class="space-y-2 mb-6">
                  ${project.blueprint.architectureLayers
                    .slice(0, 4)
                    .map(
                      (layer, idx) => `
                    <div class="flex items-center gap-3 p-2.5 bg-[rgba(255,255,255,0.02)] border border-[rgba(201,169,110,0.1)] rounded-sm text-xs">
                      <span class="font-mono-tech text-[10px] text-[#C9A96E] px-1.5 py-0.5 bg-[rgba(201,169,110,0.1)]">
                        L${idx + 1}
                      </span>
                      <span class="text-[#D8D4CB] font-mono-tech text-[11.5px] truncate">${layer}</span>
                    </div>
                  `
                    )
                    .join("")}
                </div>

                <!-- Performance Benchmark Mini Widget -->
                <div class="p-4 bg-[rgba(201,169,110,0.04)] border border-[rgba(201,169,110,0.14)] rounded-sm mb-6">
                  <div class="text-[11px] font-mono-tech text-[#A6A196] mb-2">
                    ${project.blueprint.benchmark.metricName}
                  </div>
                  <div class="flex justify-between text-xs font-mono-tech mb-1">
                    <span class="text-[#6E6A61]">Trước: ${project.blueprint.benchmark.beforeValue}</span>
                    <span class="text-[#64A687] font-semibold">Sau: ${project.blueprint.benchmark.afterValue}</span>
                  </div>
                  <div class="benchmark-bar">
                    <div class="benchmark-fill bg-gradient-to-r from-[#C9A96E] to-[#64A687]" style="width: ${project.blueprint.benchmark.afterPercent}%"></div>
                  </div>
                </div>
              </div>

              <!-- Action Button: Open Interactive Blueprint Modal -->
              <button
                type="button"
                class="btn-luxury-outline w-full justify-center py-3 text-xs open-blueprint-btn"
                data-project-id="${project.id}"
              >
                <span>Khám phá Bản vẽ Kiến trúc & Code</span>
                <svg class="w-4 h-4 text-[#C9A96E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>
          </div>
        </article>
      </div>
    `
      )
      .join("");

    // Re-bind 3D Tilt & Modal Triggers
    init3DTiltCards();
    bindBlueprintModalButtons();
  }

  /* ========================================================================
     3. INTERACTIVE BLUEPRINT MODAL (SCHEMA / BENCHMARK / SOURCE CODE)
     ======================================================================== */
  function bindBlueprintModalButtons() {
    const buttons = document.querySelectorAll(".open-blueprint-btn");
    buttons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const projectId = btn.getAttribute("data-project-id");
        openBlueprintModal(projectId);
      });
    });
  }

  function openBlueprintModal(projectId) {
    const project = data.projects.find((p) => p.id === projectId);
    const modal = document.getElementById("blueprint-modal");
    const content = document.getElementById("blueprint-modal-body");
    if (!project || !modal || !content) return;

    content.innerHTML = `
      <!-- Modal Top Header -->
      <div class="flex items-start justify-between gap-4 p-6 md:p-8 border-b border-[rgba(201,169,110,0.2)] bg-[rgba(9,9,11,0.6)]">
        <div>
          <div class="flex items-center gap-3 mb-2">
            <span class="font-mono-tech text-xs px-2.5 py-0.5 bg-[rgba(201,169,110,0.15)] text-[#E6CFA3] border border-[rgba(201,169,110,0.3)]">
              ARCHITECTURE BLUEPRINT // ${project.index}
            </span>
            <span class="font-mono-tech text-xs text-[#64A687]">
              ${project.stackPrimary}
            </span>
          </div>
          <h3 class="font-display text-2xl md:text-4xl text-[#F4F1EA]">
            ${project.title}
          </h3>
        </div>
        <button
          type="button"
          id="close-blueprint-btn"
          class="p-2.5 text-[#A6A196] hover:text-[#F4F1EA] border border-[rgba(201,169,110,0.2)] hover:border-[#C9A96E] transition-colors"
          aria-label="Đóng cửa sổ"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Modal Body -->
      <div class="p-6 md:p-8 space-y-8">
        <!-- Row 1: Layered Architecture & Database Entities -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Architecture Flow -->
          <div class="p-5 bg-[rgba(255,255,255,0.02)] border border-[rgba(201,169,110,0.15)]">
            <h4 class="font-mono-tech text-xs uppercase tracking-widest text-[#C9A96E] mb-4">
              01 // Luồng Kiến trúc Phân tầng (Layered Pipeline)
            </h4>
            <div class="space-y-2.5">
              ${project.blueprint.architectureLayers
                .map(
                  (layer, i) => `
                <div class="flex items-center gap-3 p-2.5 bg-[#09090B] border border-[rgba(201,169,110,0.12)] text-xs font-mono-tech">
                  <span class="text-[#C9A96E] font-semibold">0${i + 1}</span>
                  <span class="text-[#F4F1EA]">${layer}</span>
                </div>
              `
                )
                .join("")}
            </div>
          </div>

          <!-- Database Schema Entities -->
          <div class="p-5 bg-[rgba(255,255,255,0.02)] border border-[rgba(201,169,110,0.15)]">
            <h4 class="font-mono-tech text-xs uppercase tracking-widest text-[#C9A96E] mb-4">
              02 // Lược đồ Cơ sở dữ liệu (Core Schema Entities)
            </h4>
            <div class="space-y-3">
              ${project.blueprint.schemaEntities
                .map(
                  (entity) => `
                <div class="p-3 bg-[#09090B] border border-[rgba(201,169,110,0.12)]">
                  <div class="font-mono-tech text-xs text-[#64A687] font-semibold mb-1">
                    TABLE: ${entity.table}
                  </div>
                  <div class="font-mono-tech text-[11.5px] text-[#A6A196]">
                    ${entity.fields}
                  </div>
                </div>
              `
                )
                .join("")}
            </div>
          </div>
        </div>

        <!-- Row 2: Representative Backend Code Implementation -->
        <div>
          <div class="flex items-center justify-between mb-3">
            <h4 class="font-mono-tech text-xs uppercase tracking-widest text-[#C9A96E]">
              03 // Minh họa Cấu trúc Mã nguồn (${project.blueprint.codeTitle})
            </h4>
            <span class="font-mono-tech text-[11px] text-[#6E6A61]">PRODUCTION PATTERN</span>
          </div>
          <pre class="code-window p-5"><code>${project.blueprint.codeSnippet}</code></pre>
        </div>
      </div>
    `;

    modal.classList.add("is-open");
    document.body.style.overflow = "hidden";

    const closeBtn = document.getElementById("close-blueprint-btn");
    if (closeBtn) {
      closeBtn.addEventListener("click", closeBlueprintModal);
    }
  }

  function closeBlueprintModal() {
    const modal = document.getElementById("blueprint-modal");
    if (!modal) return;
    modal.classList.remove("is-open");
    document.body.style.overflow = "";
  }

  /* ========================================================================
     4. 60FPS 3D TILT & SPECULAR GLARE ENGINE (VANILLA-TILT PHYSICS)
     ======================================================================== */
  function init3DTiltCards() {
    const cards = document.querySelectorAll(".tilt-card");
    if (window.matchMedia("(pointer: coarse)").matches) return;

    cards.forEach((card) => {
      if (card.dataset.tiltInitialized === "true") return;
      card.dataset.tiltInitialized = "true";

      const maxTilt = parseFloat(card.dataset.tiltMax || "5.5");
      let rafId = null;

      card.addEventListener("mouseenter", () => {
        card.classList.remove("is-resetting");
      });

      card.addEventListener(
        "mousemove",
        (e) => {
          if (rafId) cancelAnimationFrame(rafId);
          rafId = requestAnimationFrame(() => {
            const rect = card.getBoundingClientRect();
            const relX = e.clientX - rect.left;
            const relY = e.clientY - rect.top;
            const pctX = Math.min(Math.max(relX / rect.width, 0), 1);
            const pctY = Math.min(Math.max(relY / rect.height, 0), 1);

            const rotateY = (pctX - 0.5) * (maxTilt * 2);
            const rotateX = (0.5 - pctY) * (maxTilt * 2);

            card.style.transform = `perspective(1200px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.012, 1.012, 1.012)`;
            card.style.setProperty("--glare-x", `${(pctX * 100).toFixed(1)}%`);
            card.style.setProperty("--glare-y", `${(pctY * 100).toFixed(1)}%`);
          });
        },
        { passive: true }
      );

      card.addEventListener("mouseleave", () => {
        if (rafId) cancelAnimationFrame(rafId);
        card.classList.add("is-resetting");
        card.style.transform =
          "perspective(1200px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
      });
    });
  }

  /* ========================================================================
     5. INTERACTIVE SQL OPTIMIZATION SIMULATOR (-30% LATENCY BENCHMARK)
     ======================================================================== */
  function initSqlSimulator() {
    const btnRunUnoptimized = document.getElementById("sim-btn-legacy");
    const btnRunOptimized = document.getElementById("sim-btn-optimized");
    if (!btnRunUnoptimized || !btnRunOptimized) return;

    const latencyDisplay = document.getElementById("sim-latency-value");
    const barFill = document.getElementById("sim-latency-bar");
    const planOutput = document.getElementById("sim-query-plan");
    const statusBadge = document.getElementById("sim-status-badge");

    btnRunUnoptimized.addEventListener("click", () => {
      btnRunUnoptimized.classList.add("active");
      btnRunOptimized.classList.remove("active");

      if (latencyDisplay) latencyDisplay.textContent = "420 ms (Baseline)";
      if (barFill) {
        barFill.style.width = "100%";
        barFill.className = "benchmark-fill bg-[#D4846A]";
      }
      if (statusBadge) {
        statusBadge.textContent = "SEQ SCAN // N+1 GRAPHQL RESOLVER";
        statusBadge.className = "font-mono-tech text-xs px-2.5 py-1 bg-[rgba(212,132,106,0.15)] text-[#D4846A]";
      }
      if (planOutput) {
        planOutput.innerHTML = `<span class="text-[#D4846A]">[EXPLAIN ANALYZE — BEFORE OPTIMIZATION]</span>
-> Seq Scan on parts p (cost=0.00..1842.50 rows=48200)
   -> Nested Loop Left Join on revisions r (N+1 GraphQL Resolver Calls)
      -> Filter: (versions.status = 'published')
<span class="text-[#A6A196]">Execution Time: 420.18 ms | Buffer Reads: High</span>`;
      }
    });

    btnRunOptimized.addEventListener("click", () => {
      btnRunOptimized.classList.add("active");
      btnRunUnoptimized.classList.remove("active");

      if (latencyDisplay) latencyDisplay.textContent = "294 ms (-30% Faster)";
      if (barFill) {
        barFill.style.width = "70%";
        barFill.className = "benchmark-fill bg-gradient-to-r from-[#C9A96E] to-[#64A687]";
      }
      if (statusBadge) {
        statusBadge.textContent = "COMPOSITE INDEX // SERVICE-REPOSITORY BATCHED";
        statusBadge.className = "font-mono-tech text-xs px-2.5 py-1 bg-[rgba(100,166,135,0.15)] text-[#64A687]";
      }
      if (planOutput) {
        planOutput.innerHTML = `<span class="text-[#64A687]">[EXPLAIN ANALYZE — AFTER BÙI THANH VƯƠNG OPTIMIZATION]</span>
-> Index Scan using idx_parts_group_rev on parts p (cost=0.42..312.10)
   -> Index Cond: ((group_id = $1) AND (status = 'published'))
   -> DataLoader Batching via PartVersionRepository (Single Roundtrip)
<span class="text-[#E6CFA3]">Execution Time: 294.05 ms (-30.0% Latency Reduction) | Index Hit: 99.4%</span>`;
      }
    });
  }

  /* ========================================================================
     6. LUXURY MAGNETIC CURSOR & AMBIENT SPOTLIGHT
     ======================================================================== */
  function initLuxuryCursor() {
    const dot = document.getElementById("cursor-dot");
    const ring = document.getElementById("cursor-ring");
    const spotlight = document.getElementById("ambient-spotlight");

    if (!dot || !ring || window.matchMedia("(pointer: coarse)").matches) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;

    window.addEventListener(
      "mousemove",
      (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;

        if (spotlight) {
          spotlight.style.left = `${mouseX}px`;
          spotlight.style.top = `${mouseY}px`;
        }
      },
      { passive: true }
    );

    function renderCursorLoop() {
      ringX += (mouseX - ringX) * 0.16;
      ringY += (mouseY - ringY) * 0.16;
      ring.style.transform = `translate3d(${ringX.toFixed(1)}px, ${ringY.toFixed(1)}px, 0) translate(-50%, -50%)`;
      requestAnimationFrame(renderCursorLoop);
    }
    requestAnimationFrame(renderCursorLoop);

    // Hover expansion on interactive elements
    document.addEventListener("mouseover", (e) => {
      const target = e.target.closest("a, button, .tilt-card, .tech-pill, input, textarea");
      if (target) {
        ring.classList.add("is-hovering");
      } else {
        ring.classList.remove("is-hovering");
      }
    });
  }

  /* ========================================================================
     7. GSAP + SCROLLTRIGGER SECTION ANIMATIONS & METRIC COUNTERS
     ======================================================================== */
  function initGSAPAnimations() {
    if (typeof gsap === "undefined") return;

    if (typeof ScrollTrigger !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);
    }

    // Hero Entrance Choreography
    gsap.fromTo(
      ".hero-stagger",
      { y: 28, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.05,
        stagger: 0.12,
        ease: "power3.out",
        delay: 0.1
      }
    );

    // Section Headers & Reveal Blocks
    const revealElements = document.querySelectorAll(".reveal-up");
    revealElements.forEach((el) => {
      gsap.fromTo(
        el,
        { y: 36, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.95,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            toggleActions: "play none none none"
          }
        }
      );
    });

    // Animated Counters
    const counters = document.querySelectorAll("[data-counter-target]");
    counters.forEach((counterEl) => {
      const targetVal = parseInt(counterEl.getAttribute("data-counter-target"), 10);
      const prefix = counterEl.getAttribute("data-counter-prefix") || "";
      const suffix = counterEl.getAttribute("data-counter-suffix") || "";

      const obj = { val: 0 };
      gsap.to(obj, {
        val: targetVal,
        duration: 1.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: counterEl,
          start: "top 90%"
        },
        onUpdate: () => {
          counterEl.textContent = `${prefix}${Math.round(obj.val)}${suffix}`;
        }
      });
    });
  }

  /* ========================================================================
     8. PROJECT FILTER TABS, CLOCK & CLIPBOARD COPY ACTIONS
     ======================================================================== */
  function initUIControls() {
    // Filter buttons
    const filterBtns = document.querySelectorAll("[data-project-filter]");
    filterBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        const category = btn.getAttribute("data-project-filter");
        filterBtns.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        renderProjects(category);

        if (typeof gsap !== "undefined") {
          gsap.fromTo(
            "#projects-grid-container .project-card-item",
            { y: 24, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6, stagger: 0.12, ease: "power3.out" }
          );
        }
      });
    });

    // Close modal on backdrop click or Escape
    const modalBackdrop = document.getElementById("blueprint-modal");
    if (modalBackdrop) {
      modalBackdrop.addEventListener("click", (e) => {
        if (e.target === modalBackdrop) closeBlueprintModal();
      });
    }
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeBlueprintModal();
    });

    // Copy to clipboard buttons
    const copyBtns = document.querySelectorAll("[data-copy-value]");
    copyBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        const val = btn.getAttribute("data-copy-value");
        const label = btn.getAttribute("data-copy-label") || "Thông tin";
        if (navigator.clipboard && val) {
          navigator.clipboard.writeText(val).then(() => {
            showLuxuryToast(`Đã sao chép ${label}: ${val}`);
          });
        } else {
          showLuxuryToast(`${label}: ${val}`);
        }
      });
    });

    // Contact Quick Dispatch Form (Opens pre-filled mailto or shows confirmation)
    const contactForm = document.getElementById("luxury-contact-form");
    if (contactForm) {
      contactForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const senderName = document.getElementById("sender-name")?.value || "Nhà tuyển dụng";
        const senderCompany = document.getElementById("sender-company")?.value || "";
        const senderMessage = document.getElementById("sender-message")?.value || "";

        const subject = encodeURIComponent(
          `[Portfolio Contact] Cơ hội hợp tác Backend Developer — từ ${senderName} ${senderCompany ? `(${senderCompany})` : ""}`
        );
        const body = encodeURIComponent(
          `Xin chào Bùi Thanh Vương,\n\nTôi là ${senderName}${senderCompany ? ` từ ${senderCompany}` : ""}.\n\n${senderMessage}\n\nTrân trọng!`
        );

        showLuxuryToast("Đang mở trình gửi Email kết nối trực tiếp tới bthvuong23@gmail.com...");
        setTimeout(() => {
          window.location.href = `mailto:bthvuong23@gmail.com?subject=${subject}&body=${body}`;
        }, 500);
      });
    }

    // Live Ho Chi Minh City Time Clock (GMT+7)
    const clockEl = document.getElementById("hcm-live-clock");
    function updateClock() {
      if (!clockEl) return;
      try {
        const now = new Date();
        const formatter = new Intl.DateTimeFormat("vi-VN", {
          timeZone: "Asia/Ho_Chi_Minh",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false
        });
        clockEl.textContent = `${formatter.format(now)} GMT+7`;
      } catch (err) {
        clockEl.textContent = "TP.HCM // GMT+7";
      }
    }
    updateClock();
    setInterval(updateClock, 1000);
  }

  function showLuxuryToast(message) {
    const toast = document.getElementById("luxury-toast");
    const toastText = document.getElementById("luxury-toast-text");
    if (!toast || !toastText) return;

    toastText.textContent = message;
    toast.classList.add("show");
    clearTimeout(window.__toastTimer);
    window.__toastTimer = setTimeout(() => {
      toast.classList.remove("show");
    }, 3400);
  }

  /* ========================================================================
     BOOTSTRAP APPLICATION
     ======================================================================== */
  function initApp() {
    renderSkills();
    renderProjects("all");
    init3DTiltCards();
    initSqlSimulator();
    initLuxuryCursor();
    initUIControls();
    initGSAPAnimations();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initApp);
  } else {
    initApp();
  }
})();
