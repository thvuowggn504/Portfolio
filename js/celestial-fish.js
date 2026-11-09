/**
 * ============================================================================
 * CELESTIAL WHITE SILK FISH & SOLAR SUNBIRD ON BRANCH ENGINE (60FPS CANVAS)
 * Thiết kế độc quyền cho Portfolio Bùi Thanh Vương — Quiet Luxury Edition
 *
 * 1. CÁ LỤA TRẮNG NGỌC TRAI HOÀN MỸ (Celestial White Veil-Tail Koi / Betta):
 *    - Phần đầu tròn trịa, đầy đặn (Sculpted Rounded Crown & Plump Cheeks),
 *      có nắp mang mềm, mắt ngọc và râu lụa mảnh.
 *    - Hệ vây lụa siêu bồng bềnh đa tầng (Multi-Ray Ruffled Silk Veils):
 *      + Đôi vây ngực lớn dạng cánh bướm lụa (5 tia vật lý mỗi bên tạo viền lượn sóng).
 *      + Vây lưng cao uốn lượn như dải lụa trắng.
 *      + Bộ đuôi đại lễ 11 dải lụa (16 đốt/dải) kết nối bằng đường cong Bezier
 *        tạo màng lụa xếp nếp bồng bềnh trong nước.
 *    - Khóa vùng nhìn thông minh (Elastic Viewport Containment):
 *      + Khi cuộn xuống (kể cả cuộn cực nhanh): Cá uốn mình hướng đầu xuống dưới,
 *        quẫy vây bơi theo dòng nước nhưng LUÔN giữ trong khung hình (không bao giờ
 *        trôi mất xuống đáy màn hình).
 *      + Khi cuộn lên: Cá uốn chữ C hướng lên trên.
 *      + Khi dừng cuộn: Cá lơ lửng dáng chữ C bồng bềnh và tỏa vệt ánh sao 4 cánh.
 *
 * 2. CHÚ CHIM MẶT TRỜI TRÊN CÀNH CÂY NHỎ BÊN TRÁI (Celestial Sunbird):
 *    - Đậu yên bình trên một cành cây nghệ thuật có lá và nụ vàng ở rìa trái màn hình.
 *    - Khi cuộn trang xuống: Cành cây khẽ nhún theo lực bật, chú chim mặt trời
 *      tung đôi cánh ánh vàng kim bay vút lên phía trên, tỏa bụi nắng ấm.
 *    - Khi dừng cuộn: Chú chim lượn vòng êm ái đáp về đậu lại đúng trên cành cây,
 *      khép cánh mượt mà và làm cành cây khẽ đung đưa.
 * ============================================================================
 */

(function () {
  function initCelestialNatureCanvas() {
    const canvas = document.getElementById("celestial-fish-canvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    function resizeCanvas() {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    function clamp(val, min, max) {
      return Math.max(min, Math.min(max, val));
    }

    function normalizeAngleDiff(target, current) {
      let diff = target - current;
      while (diff > Math.PI) diff -= Math.PI * 2;
      while (diff < -Math.PI) diff += Math.PI * 2;
      return diff;
    }

    /* ========================================================================
       PART A: CELESTIAL WHITE SILK FISH SETUP (ROUNDED HEAD & ULTRA-BILLOWING FINS)
       ======================================================================== */
    const NUM_SPINE_NODES = 26;
    const SEG_LENGTH = 8.8;

    // Anatomical width profile: Rounded, fuller head & cheeks -> graceful taper -> slender tail stem
    const BODY_WIDTHS = [
      11.5, 16.2, 18.8, 19.4, 18.6, 17.2, 15.5, 13.8, 12.0, 10.2,
      8.6, 7.2, 5.9, 4.8, 3.9, 3.1, 2.5, 2.0, 1.6, 1.3,
      1.0, 0.8, 0.6, 0.5, 0.4, 0.3
    ];

    const startX = width * 0.72;
    const startY = height * 0.42;

    const spine = [];
    for (let i = 0; i < NUM_SPINE_NODES; i++) {
      const initAngle = Math.PI * 0.5 - i * 0.085;
      spine.push({
        x: startX - Math.cos(initAngle) * i * SEG_LENGTH,
        y: startY - Math.sin(initAngle) * i * SEG_LENGTH,
        angle: initAngle
      });
    }

    // 11 Flowing Tail Silk Ribbons (Full Halfmoon / Veil-Tail Fan)
    const NUM_TAIL_RIBBONS = 11;
    const RIBBON_NODES = 16;
    const tailRibbons = [];

    for (let r = 0; r < NUM_TAIL_RIBBONS; r++) {
      const spreadFactor = (r - (NUM_TAIL_RIBBONS - 1) / 2) / ((NUM_TAIL_RIBBONS - 1) / 2); // -1 .. +1
      const nodes = [];
      for (let j = 0; j < RIBBON_NODES; j++) {
        nodes.push({ x: startX, y: startY });
      }
      tailRibbons.push({
        spread: spreadFactor,
        // Center-outer wave profile for a lush scalloped bridal-veil tail
        lengthFactor: 1.08 - Math.pow(Math.abs(spreadFactor), 1.6) * 0.26,
        phaseOffset: r * 0.55,
        nodes
      });
    }

    // Pectoral Butterfly Veil Fins (5 dynamic ray chains per side for ultra-billowing motion)
    const PEC_RAYS = 5;
    const PEC_NODES = 6;
    const pectoralFins = { left: [], right: [] };
    for (const sideKey of ["left", "right"]) {
      for (let r = 0; r < PEC_RAYS; r++) {
        const nodes = [];
        for (let j = 0; j < PEC_NODES; j++) {
          nodes.push({ x: startX, y: startY });
        }
        pectoralFins[sideKey].push({
          rayIndex: r,
          ratio: r / (PEC_RAYS - 1), // 0 (leading edge) to 1 (trailing silk lobe)
          nodes
        });
      }
    }

    const fish = {
      x: startX,
      y: startY,
      heading: Math.PI * 0.5,
      targetHeading: Math.PI * 0.5,
      angularVelocity: 0,
      speed: 1.5,
      baseSpeed: 1.45,
      swimPhase: 0,
      finPhase: 0,
      cCurveBias: 0.48,
      targetX: startX,
      targetY: startY,
      scrollMode: "idle", // "down" | "up" | "idle"
      scrollMomentum: 0,
      waterFlowY: 0 // Simulated water stream velocity when scrolling
    };

    /* ========================================================================
       PART B: SOLAR SUNBIRD ON LEFT BRANCH SETUP (CHIM MẶT TRỜI & CÀNH CÂY)
       ======================================================================== */
    const branch = {
      getBaseY: () => height * 0.52,
      getPerchX: () => (width < 640 ? 64 : 102),
      getPerchY: () => height * 0.52 - 18,
      swayAngle: 0,
      swayVelocity: 0
    };

    const sunbird = {
      state: "perched", // "perched" | "flying_up" | "returning"
      x: branch.getPerchX(),
      y: branch.getPerchY(),
      vx: 0,
      vy: 0,
      wingPhase: 0,
      wingOpenAmount: 0, // 0 = folded neatly, 1 = full flapping wings
      bodyTilt: 0,
      headPitch: 0,
      breathPhase: 0,
      flightTargetX: 110,
      flightTargetY: height * 0.2,
      featherSparkles: []
    };

    /* ========================================================================
       PART C: UNIFIED SCROLL & MOUSE INTERACTION
       ======================================================================== */
    let lastScrollY = window.scrollY || 0;
    let lastScrollTime = performance.now();

    window.addEventListener(
      "scroll",
      () => {
        const currentScrollY = window.scrollY || 0;
        const dy = currentScrollY - lastScrollY;
        lastScrollY = currentScrollY;

        if (Math.abs(dy) < 0.5) return;

        const now = performance.now();
        lastScrollTime = now;

        // Clamp scroll momentum so fast scroll never shoots the fish off-screen
        fish.scrollMomentum = clamp(fish.scrollMomentum + Math.abs(dy) * 0.032, 0, 3.6);
        fish.waterFlowY = clamp(dy * 0.35, -14, 14);

        // Safe horizontal weaving band inside the viewport
        const minSafeX = Math.max(width * 0.22, 160);
        const maxSafeX = width - Math.max(width * 0.14, 110);
        const centerSafeX = (minSafeX + maxSafeX) * 0.5;
        const ampSafeX = (maxSafeX - minSafeX) * 0.38;

        if (dy > 0) {
          // CUỘN XUỐNG:
          // 1. Cá hướng đầu xuống dưới, bơi uyển chuyển trong vùng an toàn giữa-dưới màn hình
          fish.scrollMode = "down";
          fish.targetX = centerSafeX + Math.sin(currentScrollY * 0.004) * ampSafeX;
          fish.targetY = height * 0.62 + Math.cos(currentScrollY * 0.003) * (height * 0.1);

          // 2. Chú chim mặt trời bật khỏi cành cây bay lên trên!
          if (sunbird.state === "perched") {
            branch.swayVelocity += 0.065; // Nhún cành cây khi chim bật nhảy
            spawnWaterRipple(sunbird.x, sunbird.y, 42, 0.2);
          }
          sunbird.state = "flying_up";
          sunbird.flightTargetX = branch.getPerchX() + 18 + Math.sin(currentScrollY * 0.008) * 34;
          sunbird.flightTargetY = clamp(
            height * 0.18 + Math.cos(currentScrollY * 0.006) * (height * 0.08),
            95,
            height * 0.36
          );
        } else {
          // CUỘN LÊN:
          // 1. Cá uốn vòng chữ C hướng đầu lên trên, giữ trong vùng an toàn giữa-trên màn hình
          fish.scrollMode = "up";
          fish.targetX = centerSafeX + Math.cos(currentScrollY * 0.004) * ampSafeX;
          fish.targetY = height * 0.34 + Math.sin(currentScrollY * 0.003) * (height * 0.1);

          // Chú chim mặt trời cũng tung cánh bay lượn nhẹ khi cuộn
          if (sunbird.state === "perched") {
            branch.swayVelocity += 0.05;
          }
          sunbird.state = "flying_up";
          sunbird.flightTargetX = branch.getPerchX() + 14 + Math.cos(currentScrollY * 0.008) * 28;
          sunbird.flightTargetY = clamp(height * 0.24, 95, height * 0.38);
        }

        if (Math.abs(dy) > 16 && Math.random() < 0.35) {
          spawnWaterRipple(spine[12].x, spine[12].y, 68, 0.22);
        }
      },
      { passive: true }
    );

    // Gentle mouse ripples
    let lastRippleMouseTime = 0;
    window.addEventListener(
      "mousemove",
      (e) => {
        const now = performance.now();
        if (now - lastRippleMouseTime > 260 && Math.random() < 0.45) {
          lastRippleMouseTime = now;
          spawnWaterRipple(e.clientX, e.clientY, 40, 0.11);
        }
      },
      { passive: true }
    );

    window.addEventListener(
      "click",
      (e) => {
        if (e.target.closest("button, a, input, textarea, #blueprint-modal-body")) {
          spawnWaterRipple(e.clientX, e.clientY, 52, 0.16);
          return;
        }
        spawnWaterRipple(e.clientX, e.clientY, 92, 0.3);
        for (let i = 0; i < 10; i++) {
          spawnStardust(e.clientX, e.clientY, true);
        }
        fish.targetX = clamp(e.clientX, 160, width - 110);
        fish.targetY = clamp(e.clientY, 110, height - 110);
      },
      { passive: true }
    );

    /* ========================================================================
       PART D: STARDUST TRAIL & GENTLE WATER RIPPLE POOLS
       ======================================================================== */
    const stardustPool = [];
    const MAX_STARDUST = 150;

    const pathTrail = [];
    const MAX_TRAIL_POINTS = 52;

    const waterRipples = [];
    const MAX_RIPPLES = 20;

    const waterMotes = [];
    const NUM_MOTES = 38;
    for (let i = 0; i < NUM_MOTES; i++) {
      waterMotes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        r: 0.8 + Math.random() * 1.9,
        vy: -0.18 - Math.random() * 0.28,
        vx: (Math.random() - 0.5) * 0.2,
        phase: Math.random() * Math.PI * 2,
        alpha: 0.14 + Math.random() * 0.24
      });
    }

    function spawnStardust(x, y, isBurst = false, isSolarGold = false) {
      if (stardustPool.length >= MAX_STARDUST) {
        stardustPool.shift();
      }
      const angle = Math.random() * Math.PI * 2;
      const spd = isBurst ? 0.45 + Math.random() * 1.35 : 0.08 + Math.random() * 0.38;
      const useGold = isSolarGold || Math.random() < 0.36;

      stardustPool.push({
        x: x + (Math.random() - 0.5) * 10,
        y: y + (Math.random() - 0.5) * 10,
        vx: Math.cos(angle) * spd,
        vy: Math.sin(angle) * spd - 0.12,
        size: isBurst ? 2.2 + Math.random() * 2.8 : 1.5 + Math.random() * 2.6,
        alpha: 0.8 + Math.random() * 0.2,
        decay: 0.0065 + Math.random() * 0.008,
        twinklePhase: Math.random() * Math.PI * 2,
        twinkleSpeed: 0.08 + Math.random() * 0.1,
        isFourPointStar: Math.random() < 0.62,
        color: useGold ? "230, 207, 163" : "255, 255, 255"
      });
    }

    function spawnWaterRipple(x, y, maxRadius = 70, maxAlpha = 0.2) {
      if (waterRipples.length >= MAX_RIPPLES) {
        waterRipples.shift();
      }
      waterRipples.push({
        x,
        y,
        radius: 4,
        maxRadius,
        alpha: maxAlpha,
        lineWidth: 1.35
      });
    }

    /* ========================================================================
       PART E: UPDATE FISH KINEMATICS (WITH STRICT VIEWPORT CONTAINMENT)
       ======================================================================== */
    function updateFishPhysics(time, dt) {
      const now = performance.now();
      const timeSinceScroll = now - lastScrollTime;

      fish.scrollMomentum *= 0.945;
      fish.waterFlowY *= 0.92;
      if (fish.scrollMomentum < 0.02) fish.scrollMomentum = 0;

      // Return to idle floating when user stops scrolling
      if (timeSinceScroll > 420) {
        fish.scrollMode = "idle";
      }

      // Safe viewport bounds so fish NEVER leaves the screen
      const minX = Math.max(width * 0.18, 155);
      const maxX = width - Math.max(width * 0.1, 95);
      const minY = height * 0.16;
      const maxY = height * 0.8;

      if (fish.scrollMode === "down") {
        // Point downward (+PI/2) with an organic S-wave weave
        const weave = Math.sin(time * 2.1) * 0.48;
        fish.targetHeading = Math.PI * 0.5 + weave;
      } else if (fish.scrollMode === "up") {
        // Point upward (-PI/2) with an organic S-wave weave
        const weave = Math.sin(time * 2.1) * 0.48;
        fish.targetHeading = -Math.PI * 0.5 + weave;
      } else {
        // Idle state: Buoyant C-curve / Figure-8 floating glide inside safe zone
        const centerX = (minX + maxX) * 0.54;
        const centerY = height * 0.48;
        const rx = (maxX - minX) * 0.36;
        const ry = (maxY - minY) * 0.34;

        const orbitT = time * 0.25;
        fish.targetX = centerX + Math.sin(orbitT) * rx;
        fish.targetY = centerY + Math.sin(orbitT * 2) * ry * 0.68;

        const dx = fish.targetX - fish.x;
        const dy = fish.targetY - fish.y;
        fish.targetHeading = Math.atan2(dy, dx);
      }

      // Smooth steering when approaching edges during idle patrol
      if (fish.scrollMode === "idle") {
        if (fish.x < minX + 40) {
          fish.targetHeading = normalizeAngleDiff(0, fish.heading) * 0.5 + fish.heading;
        } else if (fish.x > maxX - 40) {
          fish.targetHeading = normalizeAngleDiff(Math.PI, fish.heading) * 0.5 + fish.heading;
        }
        if (fish.y < minY + 40) {
          fish.targetHeading = Math.PI * 0.5;
        } else if (fish.y > maxY - 40) {
          fish.targetHeading = -Math.PI * 0.5;
        }
      }

      // Smooth angular velocity & C-curve posture bias
      const angleDiff = normalizeAngleDiff(fish.targetHeading, fish.heading);
      const turnRate = fish.scrollMode === "idle" ? 0.036 : 0.075;
      fish.angularVelocity += (angleDiff * turnRate - fish.angularVelocity) * 0.2;
      fish.heading += fish.angularVelocity;

      // Keep a prominent, buoyant C-curve silhouette ("hình dáng chữ C cá bồng bềnh")
      const targetCCurve =
        clamp(fish.angularVelocity * 13.5, -0.95, 0.95) +
        Math.sin(time * 1.05) * 0.34;
      fish.cCurveBias += (targetCCurve - fish.cCurveBias) * 0.065;

      // Swimming speed & undulation frequency
      const targetSpeed = fish.baseSpeed + fish.scrollMomentum * 0.72;
      fish.speed += (targetSpeed - fish.speed) * 0.1;

      const swimFreq = 3.2 + fish.scrollMomentum * 1.25;
      fish.swimPhase += dt * swimFreq;
      fish.finPhase += dt * (2.6 + fish.scrollMomentum * 0.95);

      const headWave = Math.sin(fish.swimPhase) * 0.12;
      const moveAngle = fish.heading + headWave;

      let stepX = Math.cos(moveAngle) * fish.speed;
      let stepY = Math.sin(moveAngle) * fish.speed;

      // CRITICAL FIX: When scrolling down or up, prevent the fish from swimming off
      // the bottom or top of the screen! As it reaches the lower/upper comfort zone,
      // the water current flows past it while the fish stays gracefully in view.
      if (fish.scrollMode === "down" && fish.y > height * 0.68 && stepY > 0) {
        const damp = clamp(1 - (fish.y - height * 0.68) / (height * 0.14), 0, 1);
        stepY *= damp;
      } else if (fish.scrollMode === "up" && fish.y < height * 0.3 && stepY < 0) {
        const damp = clamp(1 - (height * 0.3 - fish.y) / (height * 0.14), 0, 1);
        stepY *= damp;
      }

      fish.x += stepX;
      fish.y += stepY;

      // Hard elastic safety clamp so the fish is 100% guaranteed to stay on screen
      if (fish.x < minX) fish.x += (minX - fish.x) * 0.15;
      if (fish.x > maxX) fish.x -= (fish.x - maxX) * 0.15;
      if (fish.y < minY) fish.y += (minY - fish.y) * 0.15;
      if (fish.y > maxY) fish.y -= (fish.y - maxY) * 0.15;

      // Update Spine Node 0 (Head)
      spine[0].x = fish.x;
      spine[0].y = fish.y;
      spine[0].angle = moveAngle;

      // Update 26-Node Inverse Kinematics Spine Chain
      // Also apply subtle counter-scroll water drift so the tail streams against the scroll direction
      const waterCounterDriftY = -fish.waterFlowY * 0.18;

      for (let i = 1; i < NUM_SPINE_NODES; i++) {
        const prev = spine[i - 1];
        const curr = spine[i];

        curr.y += waterCounterDriftY * (i / NUM_SPINE_NODES);

        const dx = curr.x - prev.x;
        const dy = curr.y - prev.y;
        let segAngle = Math.atan2(dy, dx);

        const progress = i / NUM_SPINE_NODES;
        const waveOffset =
          Math.sin(fish.swimPhase - i * 0.33) * (0.05 + progress * 0.11) +
          fish.cCurveBias * 0.068 * progress;

        const desiredAngle = prev.angle + Math.PI + waveOffset;
        const diff = normalizeAngleDiff(desiredAngle, segAngle);
        segAngle += diff * 0.4;

        curr.x = prev.x + Math.cos(segAngle) * SEG_LENGTH;
        curr.y = prev.y + Math.sin(segAngle) * SEG_LENGTH;
        curr.angle = segAngle - Math.PI;
      }

      // Update Pectoral Butterfly Veil Fin Rays (Left & Right)
      const shoulder = spine[3];
      for (const side of [-1, 1]) {
        const sideKey = side === -1 ? "left" : "right";
        const rays = pectoralFins[sideKey];
        const perp = shoulder.angle + side * Math.PI * 0.5;
        const baseAttachX = shoulder.x + Math.cos(perp) * (BODY_WIDTHS[3] * 0.68);
        const baseAttachY = shoulder.y + Math.sin(perp) * (BODY_WIDTHS[3] * 0.68);

        rays.forEach((ray) => {
          ray.nodes[0].x = baseAttachX;
          ray.nodes[0].y = baseAttachY;

          // Fan out the 5 rays from wide sweep to trailing inner lobe
          const sweepAngle =
            shoulder.angle +
            Math.PI +
            side * (1.05 - ray.ratio * 0.58) +
            Math.sin(fish.finPhase - ray.ratio * 1.1 + (side === 1 ? 0 : 0.6)) * 0.28;

          const raySegLen = (11.5 - Math.abs(ray.ratio - 0.35) * 3.2);

          for (let j = 1; j < PEC_NODES; j++) {
            const prevNode = ray.nodes[j - 1];
            const node = ray.nodes[j];
            const flutter =
              Math.sin(fish.finPhase * 1.3 - j * 0.55 - ray.ratio * 1.4) * (1.4 + j * 0.45);

            const idealX =
              prevNode.x +
              Math.cos(sweepAngle) * raySegLen +
              Math.cos(sweepAngle + Math.PI * 0.5) * flutter * 0.35;
            const idealY =
              prevNode.y +
              Math.sin(sweepAngle) * raySegLen +
              Math.sin(sweepAngle + Math.PI * 0.5) * flutter * 0.35 +
              waterCounterDriftY * 0.25;

            node.x += (idealX - node.x) * (0.42 - j * 0.03);
            node.y += (idealY - node.y) * (0.42 - j * 0.03);

            const ndx = node.x - prevNode.x;
            const ndy = node.y - prevNode.y;
            const dist = Math.hypot(ndx, ndy) || 0.001;
            if (dist > raySegLen) {
              node.x = prevNode.x + (ndx / dist) * raySegLen;
              node.y = prevNode.y + (ndy / dist) * raySegLen;
            }
          }
        });
      }

      // Update 11-Ray Flowing Tail Silk Veil
      const tailAnchor = spine[16];
      const tailEnd = spine[NUM_SPINE_NODES - 1];
      const tailDirAngle = tailEnd.angle + Math.PI;

      tailRibbons.forEach((ribbon) => {
        const perpAngle = tailAnchor.angle + Math.PI * 0.5;
        ribbon.nodes[0].x = tailAnchor.x + Math.cos(perpAngle) * ribbon.spread * 7.0;
        ribbon.nodes[0].y = tailAnchor.y + Math.sin(perpAngle) * ribbon.spread * 7.0;

        const segLen = 7.8 * ribbon.lengthFactor;
        for (let j = 1; j < RIBBON_NODES; j++) {
          const prevNode = ribbon.nodes[j - 1];
          const node = ribbon.nodes[j];

          const flutter =
            Math.sin(fish.swimPhase * 1.2 - j * 0.38 + ribbon.phaseOffset) *
            (1.5 + j * 0.35);

          // Wide, billowing fan angle (140-degree Halfmoon veil spread)
          const fanAngle = tailDirAngle + ribbon.spread * 0.68;
          const idealX =
            prevNode.x +
            Math.cos(fanAngle) * segLen +
            Math.cos(fanAngle + Math.PI * 0.5) * flutter * 0.32;
          const idealY =
            prevNode.y +
            Math.sin(fanAngle) * segLen +
            Math.sin(fanAngle + Math.PI * 0.5) * flutter * 0.32 +
            waterCounterDriftY * 0.35;

          node.x += (idealX - node.x) * (0.38 - j * 0.014);
          node.y += (idealY - node.y) * (0.38 - j * 0.014);

          const ndx = node.x - prevNode.x;
          const ndy = node.y - prevNode.y;
          const dist = Math.hypot(ndx, ndy) || 0.001;
          if (dist > segLen) {
            node.x = prevNode.x + (ndx / dist) * segLen;
            node.y = prevNode.y + (ndy / dist) * segLen;
          }
        }
      });

      // Record luminous wake ribbon & shift existing wake with water flow
      for (let i = 0; i < pathTrail.length; i++) {
        pathTrail[i].y -= fish.waterFlowY * 0.55;
      }
      const centerRibbonTip = tailRibbons[Math.floor(NUM_TAIL_RIBBONS / 2)].nodes[RIBBON_NODES - 1];
      pathTrail.unshift({
        x: centerRibbonTip.x,
        y: centerRibbonTip.y
      });
      if (pathTrail.length > MAX_TRAIL_POINTS) {
        pathTrail.pop();
      }

      // Emit Stardust Particles along the billowing tail & pectoral fins
      const emitChance = 0.58 + Math.min(fish.scrollMomentum * 0.16, 0.4);
      if (Math.random() < emitChance) {
        const randomRibbon = tailRibbons[Math.floor(Math.random() * NUM_TAIL_RIBBONS)];
        const tipNode = randomRibbon.nodes[RIBBON_NODES - 1 - Math.floor(Math.random() * 4)];
        spawnStardust(tipNode.x, tipNode.y, false, false);
      }
    }

    /* ========================================================================
       PART F: UPDATE LEFT-SIDE SUNBIRD & SPRING BRANCH PHYSICS
       ======================================================================== */
    function updateSunbirdAndBranch(time, dt) {
      const now = performance.now();
      const timeSinceScroll = now - lastScrollTime;

      // Spring-damper physics for the branch sway
      const springK = 0.12;
      const damping = 0.88;
      branch.swayVelocity += -branch.swayAngle * springK;
      branch.swayVelocity *= damping;
      branch.swayAngle += branch.swayVelocity;

      const perchX = branch.getPerchX();
      const perchY = branch.getPerchY() + Math.sin(branch.swayAngle) * 14;

      // Transition from flying back to landing when scroll stops
      if (sunbird.state === "flying_up" && timeSinceScroll > 360) {
        sunbird.state = "returning";
      }

      if (sunbird.state === "perched") {
        // Locked smoothly onto the swaying branch
        sunbird.x = perchX;
        sunbird.y = perchY;
        sunbird.wingOpenAmount += (0 - sunbird.wingOpenAmount) * 0.18;
        sunbird.bodyTilt += (branch.swayAngle * 0.5 - sunbird.bodyTilt) * 0.15;
        sunbird.breathPhase += dt * 2.6;
        sunbird.headPitch = Math.sin(time * 1.4) * 0.08;
      } else if (sunbird.state === "flying_up") {
        // Vigorous, graceful wing flapping upward
        sunbird.wingPhase += dt * 22.0;
        sunbird.wingOpenAmount += (1 - sunbird.wingOpenAmount) * 0.22;

        // Hover & ascend toward upper-left flight target
        const hoverX = sunbird.flightTargetX + Math.sin(time * 3.4) * 18;
        const hoverY = sunbird.flightTargetY + Math.cos(time * 2.8) * 12;

        sunbird.x += (hoverX - sunbird.x) * 0.075;
        sunbird.y += (hoverY - sunbird.y) * 0.085;

        // Tilt upward while ascending
        sunbird.bodyTilt += (-0.28 - sunbird.bodyTilt) * 0.14;

        // Emit golden solar dust sparkles from flapping wings
        if (Math.random() < 0.42) {
          spawnStardust(sunbird.x - 8, sunbird.y + 6, false, true);
        }
      } else if (sunbird.state === "returning") {
        // Glide smoothly back down to the branch perch
        sunbird.wingPhase += dt * 15.0;
        const dx = perchX - sunbird.x;
        const dy = perchY - sunbird.y;
        const dist = Math.hypot(dx, dy);

        sunbird.x += dx * 0.095;
        sunbird.y += dy * 0.095;

        // Slight glide posture
        sunbird.bodyTilt += (0.12 - sunbird.bodyTilt) * 0.14;

        if (dist < 22) {
          sunbird.wingOpenAmount += (0.25 - sunbird.wingOpenAmount) * 0.15;
        } else {
          sunbird.wingOpenAmount += (0.85 - sunbird.wingOpenAmount) * 0.15;
        }

        if (dist < 3.2) {
          sunbird.state = "perched";
          sunbird.x = perchX;
          sunbird.y = perchY;
          // Gentle downward bounce on the branch upon landing!
          branch.swayVelocity += 0.055;
        }
      }
    }

    /* ========================================================================
       PART G: RENDERING — WATER, STARDUST, WHITE SILK FISH & SUNBIRD
       ======================================================================== */
    function drawGentleWaterAndMotes(time) {
      // 1. Floating underwater pearl motes (reacting to water flow during scroll)
      for (let i = 0; i < waterMotes.length; i++) {
        const m = waterMotes[i];
        m.y += m.vy - fish.waterFlowY * 0.45;
        m.x += m.vx + Math.sin(time * 0.65 + m.phase) * 0.14;

        if (m.y < -10) m.y = height + 10;
        if (m.y > height + 10) m.y = -10;
        if (m.x < -10) m.x = width + 10;
        if (m.x > width + 10) m.x = -10;

        const pulse = 0.65 + 0.35 * Math.sin(time * 1.5 + m.phase);
        ctx.beginPath();
        ctx.arc(m.x, m.y, m.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(244, 241, 234, ${(m.alpha * pulse).toFixed(3)})`;
        ctx.fill();
      }

      // 2. Expanding Concentric Water Ripples
      for (let i = waterRipples.length - 1; i >= 0; i--) {
        const rip = waterRipples[i];
        rip.y -= fish.waterFlowY * 0.35;
        rip.radius += (rip.maxRadius - rip.radius) * 0.045 + 0.45;
        rip.alpha *= 0.968;

        if (rip.alpha < 0.006 || rip.radius >= rip.maxRadius) {
          waterRipples.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.beginPath();
        ctx.arc(rip.x, rip.y, rip.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(244, 241, 234, ${rip.alpha.toFixed(3)})`;
        ctx.lineWidth = rip.lineWidth;
        ctx.stroke();

        if (rip.radius > 14) {
          ctx.beginPath();
          ctx.arc(rip.x, rip.y, rip.radius * 0.66, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(201, 169, 110, ${(rip.alpha * 0.65).toFixed(3)})`;
          ctx.lineWidth = 0.75;
          ctx.stroke();
        }
        ctx.restore();
      }
    }

    function drawStardustAndWake() {
      ctx.save();

      // 1. Soft Luminous Silk Wake
      if (pathTrail.length > 3) {
        for (let i = 0; i < pathTrail.length - 1; i++) {
          const p1 = pathTrail[i];
          const p2 = pathTrail[i + 1];
          const ratio = 1 - i / pathTrail.length;
          const alpha = ratio * 0.18;

          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(255, 255, 255, ${alpha.toFixed(3)})`;
          ctx.lineWidth = ratio * 3.5;
          ctx.lineCap = "round";
          ctx.stroke();
        }
      }

      // 2. 4-Point Celestial Stars & Pearl Motes
      for (let i = stardustPool.length - 1; i >= 0; i--) {
        const s = stardustPool[i];
        s.x += s.vx;
        s.y += s.vy - fish.waterFlowY * 0.4;
        s.alpha -= s.decay;
        s.twinklePhase += s.twinkleSpeed;

        if (s.alpha <= 0.01) {
          stardustPool.splice(i, 1);
          continue;
        }

        const twinkle = 0.55 + 0.45 * Math.sin(s.twinklePhase);
        const curAlpha = Math.max(0, s.alpha * twinkle);

        ctx.save();
        ctx.translate(s.x, s.y);

        const glowGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, s.size * 2.9);
        glowGrad.addColorStop(0, `rgba(${s.color}, ${(curAlpha * 0.88).toFixed(3)})`);
        glowGrad.addColorStop(0.45, `rgba(${s.color}, ${(curAlpha * 0.3).toFixed(3)})`);
        glowGrad.addColorStop(1, `rgba(${s.color}, 0)`);

        ctx.fillStyle = glowGrad;
        ctx.beginPath();
        ctx.arc(0, 0, s.size * 2.9, 0, Math.PI * 2);
        ctx.fill();

        if (s.isFourPointStar) {
          const arm = s.size * 2.2;
          const waist = s.size * 0.36;
          ctx.beginPath();
          ctx.moveTo(0, -arm);
          ctx.quadraticCurveTo(waist, -waist, arm, 0);
          ctx.quadraticCurveTo(waist, waist, 0, arm);
          ctx.quadraticCurveTo(-waist, waist, -arm, 0);
          ctx.quadraticCurveTo(-waist, -waist, 0, -arm);
          ctx.closePath();
          ctx.fillStyle = `rgba(255, 255, 255, ${Math.min(1, curAlpha * 1.15).toFixed(3)})`;
          ctx.fill();
        } else {
          ctx.beginPath();
          ctx.arc(0, 0, s.size * 0.72, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${curAlpha.toFixed(3)})`;
          ctx.fill();
        }

        ctx.restore();
      }

      ctx.restore();
    }

    /**
     * Draw Ultra-Billowing Butterfly Silk Pectoral & Ventral Fins
     */
    function drawBillowingPectoralAndVentralFins() {
      ctx.save();

      for (const side of [-1, 1]) {
        const sideKey = side === -1 ? "left" : "right";
        const rays = pectoralFins[sideKey];
        const base = rays[0].nodes[0];
        const outerTip = rays[2].nodes[PEC_NODES - 1];

        // 1. Billowing Silk Membrane connecting all 5 dynamic fin rays
        const finGrad = ctx.createRadialGradient(
          base.x,
          base.y,
          3,
          outerTip.x,
          outerTip.y,
          68
        );
        finGrad.addColorStop(0, "rgba(255, 255, 255, 0.78)");
        finGrad.addColorStop(0.45, "rgba(250, 248, 244, 0.44)");
        finGrad.addColorStop(0.8, "rgba(230, 207, 163, 0.16)");
        finGrad.addColorStop(1, "rgba(255, 255, 255, 0.02)");

        ctx.beginPath();
        ctx.moveTo(base.x, base.y);

        // Trace leading ray (ray 0) out to its tip
        for (let j = 1; j < PEC_NODES; j++) {
          ctx.lineTo(rays[0].nodes[j].x, rays[0].nodes[j].y);
        }

        // Trace scalloped, wavy silk rim across all ray tips (0 -> 4)
        for (let r = 0; r < PEC_RAYS - 1; r++) {
          const tipA = rays[r].nodes[PEC_NODES - 1];
          const tipB = rays[r + 1].nodes[PEC_NODES - 1];
          const midSub = rays[r].nodes[PEC_NODES - 2];
          const cx = (tipA.x + tipB.x) * 0.5 + (tipA.x - midSub.x) * 0.25;
          const cy = (tipA.y + tipB.y) * 0.5 + (tipA.y - midSub.y) * 0.25;
          ctx.quadraticCurveTo(cx, cy, tipB.x, tipB.y);
        }

        // Trace trailing ray (ray 4) back to body waist (spine[8])
        for (let j = PEC_NODES - 2; j >= 1; j--) {
          ctx.lineTo(rays[PEC_RAYS - 1].nodes[j].x, rays[PEC_RAYS - 1].nodes[j].y);
        }

        const bodyJoin = spine[7];
        const joinPerp = bodyJoin.angle + side * Math.PI * 0.5;
        ctx.lineTo(
          bodyJoin.x + Math.cos(joinPerp) * (BODY_WIDTHS[7] * 0.65),
          bodyJoin.y + Math.sin(joinPerp) * (BODY_WIDTHS[7] * 0.65)
        );
        ctx.closePath();

        ctx.fillStyle = finGrad;
        ctx.fill();

        // 2. Delicate glowing silk rays & ruffled edge highlight
        rays.forEach((ray) => {
          ctx.beginPath();
          ctx.moveTo(ray.nodes[0].x, ray.nodes[0].y);
          for (let j = 1; j < PEC_NODES - 1; j++) {
            const xc = (ray.nodes[j].x + ray.nodes[j + 1].x) * 0.5;
            const yc = (ray.nodes[j].y + ray.nodes[j + 1].y) * 0.5;
            ctx.quadraticCurveTo(ray.nodes[j].x, ray.nodes[j].y, xc, yc);
          }
          ctx.strokeStyle = "rgba(255, 255, 255, 0.34)";
          ctx.lineWidth = 0.85;
          ctx.stroke();
        });

        // 3. Flowing Ventral / Pelvic Silk Streamers (near spine[10])
        const pelvicNode = spine[10];
        const pPerp = pelvicNode.angle + side * Math.PI * 0.5;
        const px = pelvicNode.x + Math.cos(pPerp) * (BODY_WIDTHS[10] * 0.6);
        const py = pelvicNode.y + Math.sin(pPerp) * (BODY_WIDTHS[10] * 0.6);
        const pWave = Math.sin(fish.finPhase * 1.15 - 1.2 + side) * 0.3;
        const pAngle = pelvicNode.angle + Math.PI + side * (0.62 + pWave);
        const pTipX = px + Math.cos(pAngle) * 44;
        const pTipY = py + Math.sin(pAngle) * 44;

        const vGrad = ctx.createLinearGradient(px, py, pTipX, pTipY);
        vGrad.addColorStop(0, "rgba(255, 255, 255, 0.58)");
        vGrad.addColorStop(0.65, "rgba(244, 241, 234, 0.24)");
        vGrad.addColorStop(1, "rgba(255, 255, 255, 0)");

        ctx.beginPath();
        ctx.moveTo(px, py);
        ctx.quadraticCurveTo(
          px + Math.cos(pAngle - side * 0.25) * 26,
          py + Math.sin(pAngle - side * 0.25) * 26,
          pTipX,
          pTipY
        );
        ctx.quadraticCurveTo(
          (pTipX + spine[13].x) * 0.5,
          (pTipY + spine[13].y) * 0.5,
          spine[13].x,
          spine[13].y
        );
        ctx.closePath();
        ctx.fillStyle = vGrad;
        ctx.fill();
      }

      ctx.restore();
    }

    /**
     * Draw 11-Ray Grand Bridal-Silk Tail Veil
     */
    function drawFlowingTailVeil() {
      ctx.save();

      // 1. Multi-folded Gossamer Silk Membrane between adjacent ribbons
      for (let r = 0; r < NUM_TAIL_RIBBONS - 1; r++) {
        const ribA = tailRibbons[r].nodes;
        const ribB = tailRibbons[r + 1].nodes;

        const anchor = ribA[0];
        const tipA = ribA[RIBBON_NODES - 1];
        const tipB = ribB[RIBBON_NODES - 1];
        const subA = ribA[RIBBON_NODES - 2];

        const veilGrad = ctx.createLinearGradient(
          anchor.x,
          anchor.y,
          (tipA.x + tipB.x) * 0.5,
          (tipA.y + tipB.y) * 0.5
        );
        // Alternating subtle luminance to create 3D silk pleat folds
        const foldAlpha = r % 2 === 0 ? 0.58 : 0.44;
        veilGrad.addColorStop(0, `rgba(255, 255, 255, ${foldAlpha})`);
        veilGrad.addColorStop(0.5, `rgba(248, 246, 240, ${(foldAlpha * 0.62).toFixed(2)})`);
        veilGrad.addColorStop(0.85, "rgba(230, 207, 163, 0.15)");
        veilGrad.addColorStop(1, "rgba(255, 255, 255, 0.01)");

        ctx.beginPath();
        ctx.moveTo(ribA[0].x, ribA[0].y);
        for (let j = 1; j < RIBBON_NODES; j++) {
          ctx.lineTo(ribA[j].x, ribA[j].y);
        }
        // Scalloped ruffled outer edge between tipA and tipB
        const ruffleX = (tipA.x + tipB.x) * 0.5 + (tipA.x - subA.x) * 0.35;
        const ruffleY = (tipA.y + tipB.y) * 0.5 + (tipA.y - subA.y) * 0.35;
        ctx.quadraticCurveTo(ruffleX, ruffleY, tipB.x, tipB.y);

        for (let j = RIBBON_NODES - 2; j >= 0; j--) {
          ctx.lineTo(ribB[j].x, ribB[j].y);
        }
        ctx.closePath();

        ctx.fillStyle = veilGrad;
        ctx.fill();
      }

      // 2. Continuous Luminous Ruffled Rim along the outer tail veil
      ctx.beginPath();
      const firstTip = tailRibbons[0].nodes[RIBBON_NODES - 1];
      ctx.moveTo(firstTip.x, firstTip.y);
      for (let r = 0; r < NUM_TAIL_RIBBONS - 1; r++) {
        const tipA = tailRibbons[r].nodes[RIBBON_NODES - 1];
        const tipB = tailRibbons[r + 1].nodes[RIBBON_NODES - 1];
        const subA = tailRibbons[r].nodes[RIBBON_NODES - 2];
        const cx = (tipA.x + tipB.x) * 0.5 + (tipA.x - subA.x) * 0.35;
        const cy = (tipA.y + tipB.y) * 0.5 + (tipA.y - subA.y) * 0.35;
        ctx.quadraticCurveTo(cx, cy, tipB.x, tipB.y);
      }
      ctx.strokeStyle = "rgba(255, 255, 255, 0.38)";
      ctx.lineWidth = 1.1;
      ctx.stroke();

      // 3. Individual Silk Filaments
      tailRibbons.forEach((ribbon, idx) => {
        const nodes = ribbon.nodes;
        const tip = nodes[RIBBON_NODES - 1];
        const strokeGrad = ctx.createLinearGradient(nodes[0].x, nodes[0].y, tip.x, tip.y);
        strokeGrad.addColorStop(0, "rgba(255, 255, 255, 0.72)");
        strokeGrad.addColorStop(0.65, "rgba(244, 241, 234, 0.35)");
        strokeGrad.addColorStop(1, "rgba(230, 207, 163, 0)");

        ctx.beginPath();
        ctx.moveTo(nodes[0].x, nodes[0].y);
        for (let j = 1; j < RIBBON_NODES - 1; j++) {
          const xc = (nodes[j].x + nodes[j + 1].x) * 0.5;
          const yc = (nodes[j].y + nodes[j + 1].y) * 0.5;
          ctx.quadraticCurveTo(nodes[j].x, nodes[j].y, xc, yc);
        }
        ctx.strokeStyle = strokeGrad;
        ctx.lineWidth = idx === 5 ? 1.5 : 0.9;
        ctx.stroke();
      });

      ctx.restore();
    }

    /**
     * Draw Sculpted Rounded Head, Pearlescent White Body & High Billowing Dorsal Veil
     */
    function drawFishBodyAndRoundedHead() {
      const leftPts = [];
      const rightPts = [];

      for (let i = 0; i < 20; i++) {
        const node = spine[i];
        const w = BODY_WIDTHS[i];
        const perp = node.angle + Math.PI * 0.5;

        leftPts.push({
          x: node.x + Math.cos(perp) * w,
          y: node.y + Math.sin(perp) * w
        });
        rightPts.push({
          x: node.x - Math.cos(perp) * w,
          y: node.y - Math.sin(perp) * w
        });
      }

      ctx.save();

      const head = spine[0];
      const neck = spine[2];
      const mid = spine[6];
      const tailBase = spine[18];

      // 1. Soft Ambient Pearl Halo around the Fish
      const auraGrad = ctx.createRadialGradient(mid.x, mid.y, 6, mid.x, mid.y, 88);
      auraGrad.addColorStop(0, "rgba(255, 255, 255, 0.18)");
      auraGrad.addColorStop(0.55, "rgba(230, 207, 163, 0.07)");
      auraGrad.addColorStop(1, "rgba(255, 255, 255, 0)");
      ctx.fillStyle = auraGrad;
      ctx.beginPath();
      ctx.arc(mid.x, mid.y, 88, 0, Math.PI * 2);
      ctx.fill();

      // 2. Main Pearlescent White Body with a Sculpted, Rounded Head Dome
      const bodyGrad = ctx.createLinearGradient(head.x, head.y, tailBase.x, tailBase.y);
      bodyGrad.addColorStop(0, "rgba(255, 255, 255, 0.99)");
      bodyGrad.addColorStop(0.32, "rgba(251, 249, 245, 0.96)");
      bodyGrad.addColorStop(0.72, "rgba(242, 238, 229, 0.86)");
      bodyGrad.addColorStop(1, "rgba(255, 255, 255, 0.28)");

      // Calculate rounded cranial arc control points so the head is round & plump (not pointy)
      const headPerp = head.angle + Math.PI * 0.5;
      const crownApexX = head.x + Math.cos(head.angle) * 14.5;
      const crownApexY = head.y + Math.sin(head.angle) * 14.5;

      const crownLeftCtrlX = crownApexX + Math.cos(headPerp) * 13.5;
      const crownLeftCtrlY = crownApexY + Math.sin(headPerp) * 13.5;

      const crownRightCtrlX = crownApexX - Math.cos(headPerp) * 13.5;
      const crownRightCtrlY = crownApexY - Math.sin(headPerp) * 13.5;

      ctx.beginPath();
      // Start at right cheek (rightPts[0]) and curve smoothly over the rounded forehead dome to leftPts[0]
      ctx.moveTo(rightPts[0].x, rightPts[0].y);
      ctx.bezierCurveTo(
        crownRightCtrlX,
        crownRightCtrlY,
        crownLeftCtrlX,
        crownLeftCtrlY,
        leftPts[0].x,
        leftPts[0].y
      );

      // Left contour down to tail
      for (let i = 0; i < leftPts.length - 1; i++) {
        const xc = (leftPts[i].x + leftPts[i + 1].x) * 0.5;
        const yc = (leftPts[i].y + leftPts[i + 1].y) * 0.5;
        ctx.quadraticCurveTo(leftPts[i].x, leftPts[i].y, xc, yc);
      }

      ctx.lineTo(tailBase.x, tailBase.y);

      // Right contour back up to right cheek
      for (let i = rightPts.length - 1; i > 0; i--) {
        const xc = (rightPts[i].x + rightPts[i - 1].x) * 0.5;
        const yc = (rightPts[i].y + rightPts[i - 1].y) * 0.5;
        ctx.quadraticCurveTo(rightPts[i].x, rightPts[i].y, xc, yc);
      }
      ctx.closePath();

      ctx.fillStyle = bodyGrad;
      ctx.shadowColor = "rgba(255, 255, 255, 0.5)";
      ctx.shadowBlur = 20;
      ctx.fill();
      ctx.shadowBlur = 0;

      // 3. 3D Pearl Crown & Dorsal Ridge Highlight (Gives the rounded head volume & plushness)
      const crownCenter = {
        x: head.x + Math.cos(head.angle) * 2,
        y: head.y + Math.sin(head.angle) * 2
      };
      const crownGlow = ctx.createRadialGradient(
        crownCenter.x,
        crownCenter.y,
        1,
        crownCenter.x,
        crownCenter.y,
        16
      );
      crownGlow.addColorStop(0, "rgba(255, 255, 255, 0.95)");
      crownGlow.addColorStop(0.6, "rgba(244, 241, 234, 0.35)");
      crownGlow.addColorStop(1, "rgba(230, 207, 163, 0)");
      ctx.fillStyle = crownGlow;
      ctx.beginPath();
      ctx.arc(crownCenter.x, crownCenter.y, 15, 0, Math.PI * 2);
      ctx.fill();

      // Subtle Gill Curves (Nắp mang cá mềm mại ở spine[2])
      for (const side of [-1, 1]) {
        const gPerp = neck.angle + side * Math.PI * 0.5;
        const gx = neck.x + Math.cos(gPerp) * (BODY_WIDTHS[2] * 0.58);
        const gy = neck.y + Math.sin(gPerp) * (BODY_WIDTHS[2] * 0.58);
        ctx.beginPath();
        ctx.arc(
          gx,
          gy,
          5.5,
          neck.angle + Math.PI * 0.65,
          neck.angle + Math.PI * 1.35
        );
        ctx.strokeStyle = "rgba(201, 169, 110, 0.28)";
        ctx.lineWidth = 0.9;
        ctx.stroke();
      }

      // 4. Expressive Obsidian-Pearl Eyes on the Rounded Head
      const eyeNode = spine[1];
      const eyePerp = eyeNode.angle + Math.PI * 0.5;
      const eyeOffset = BODY_WIDTHS[1] * 0.72;
      for (const side of [-1, 1]) {
        const ex = eyeNode.x + Math.cos(eyePerp) * (eyeOffset * side);
        const ey = eyeNode.y + Math.sin(eyePerp) * (eyeOffset * side);

        ctx.beginPath();
        ctx.arc(ex, ey, 2.1, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(18, 20, 26, 0.82)";
        ctx.fill();

        // Champagne iris ring & white specular glint
        ctx.strokeStyle = "rgba(201, 169, 110, 0.7)";
        ctx.lineWidth = 0.7;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(ex + 0.5, ey - 0.5, 0.7, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255, 255, 255, 0.95)";
        ctx.fill();
      }

      // 5. Delicate Flowing Silk Whiskers from the Rounded Snout
      for (const side of [-1, 1]) {
        const bx = crownApexX + Math.cos(headPerp) * (7.5 * side) - Math.cos(head.angle) * 3;
        const by = crownApexY + Math.sin(headPerp) * (7.5 * side) - Math.sin(head.angle) * 3;
        const wAngle =
          head.angle + Math.PI * 0.68 * side + Math.sin(fish.finPhase + side) * 0.28;
        const wx = bx + Math.cos(wAngle) * 24;
        const wy = by + Math.sin(wAngle) * 24;

        ctx.beginPath();
        ctx.moveTo(bx, by);
        ctx.quadraticCurveTo(
          bx + Math.cos(head.angle + side * 0.95) * 14,
          by + Math.sin(head.angle + side * 0.95) * 14,
          wx,
          wy
        );
        ctx.strokeStyle = "rgba(255, 255, 255, 0.62)";
        ctx.lineWidth = 0.95;
        ctx.stroke();
      }

      // 6. High Billowing Dorsal Silk Veil (Vây lưng lụa bồng bềnh từ đốt 3 đến đốt 16)
      const dorsalPts = [];
      for (let i = 3; i <= 16; i++) {
        const n = spine[i];
        const perp = n.angle + Math.PI * 0.5;
        const billow =
          Math.sin(fish.finPhase * 1.25 - i * 0.42) * (12 + (i - 3) * 1.85) +
          fish.cCurveBias * 22;
        dorsalPts.push({
          x: n.x + Math.cos(perp) * billow,
          y: n.y + Math.sin(perp) * billow
        });
      }

      ctx.beginPath();
      ctx.moveTo(spine[3].x, spine[3].y);
      for (let i = 0; i < dorsalPts.length - 1; i++) {
        const xc = (dorsalPts[i].x + dorsalPts[i + 1].x) * 0.5;
        const yc = (dorsalPts[i].y + dorsalPts[i + 1].y) * 0.5;
        ctx.quadraticCurveTo(dorsalPts[i].x, dorsalPts[i].y, xc, yc);
      }
      for (let i = 16; i >= 3; i--) {
        ctx.lineTo(spine[i].x, spine[i].y);
      }
      ctx.closePath();

      const dorsalGrad = ctx.createLinearGradient(
        spine[5].x,
        spine[5].y,
        dorsalPts[7].x,
        dorsalPts[7].y
      );
      dorsalGrad.addColorStop(0, "rgba(255, 255, 255, 0.82)");
      dorsalGrad.addColorStop(0.55, "rgba(244, 241, 234, 0.42)");
      dorsalGrad.addColorStop(1, "rgba(230, 207, 163, 0.06)");
      ctx.fillStyle = dorsalGrad;
      ctx.fill();

      ctx.restore();
    }

    /**
     * Draw Left-Side Artisanal Branch & Celestial Sunbird (Chú Chim Mặt Trời)
     */
    function drawBranchAndSunbird(time) {
      const baseY = branch.getBaseY();
      const perchX = branch.getPerchX();
      const swayOffset = Math.sin(branch.swayAngle) * 14;
      const tipX = perchX + 46;
      const tipY = baseY - 24 + swayOffset * 1.25;

      ctx.save();

      // ----------------------------------------------------------------------
      // 1. DRAW ARTISANAL SMALL BRANCH ON LEFT SCREEN EDGE
      // ----------------------------------------------------------------------
      const branchGrad = ctx.createLinearGradient(0, baseY + 12, tipX, tipY);
      branchGrad.addColorStop(0, "rgba(138, 112, 66, 0.65)");
      branchGrad.addColorStop(0.6, "rgba(201, 169, 110, 0.85)");
      branchGrad.addColorStop(1, "rgba(230, 207, 163, 0.45)");

      // Main bough
      ctx.beginPath();
      ctx.moveTo(-4, baseY + 18);
      ctx.quadraticCurveTo(
        perchX * 0.55,
        baseY - 12 + swayOffset * 0.6,
        perchX,
        baseY - 16 + swayOffset
      );
      ctx.quadraticCurveTo(
        perchX + 24,
        baseY - 19 + swayOffset * 1.1,
        tipX,
        tipY
      );
      ctx.strokeStyle = branchGrad;
      ctx.lineWidth = 2.6;
      ctx.lineCap = "round";
      ctx.stroke();

      // Secondary delicate lower twig
      ctx.beginPath();
      ctx.moveTo(perchX * 0.45, baseY - 2 + swayOffset * 0.5);
      ctx.quadraticCurveTo(
        perchX * 0.75,
        baseY + 14 + swayOffset * 0.8,
        perchX + 18,
        baseY + 8 + swayOffset * 0.9
      );
      ctx.strokeStyle = "rgba(201, 169, 110, 0.48)";
      ctx.lineWidth = 1.3;
      ctx.stroke();

      // Delicate Golden-Ivory Botanical Leaves on the Branch
      const leaves = [
        { x: perchX * 0.36, y: baseY - 4 + swayOffset * 0.4, angle: -0.65, scale: 1.0 },
        { x: tipX - 6, y: tipY + 1, angle: -0.35, scale: 0.85 },
        { x: tipX + 2, y: tipY - 3, angle: 0.25, scale: 0.75 },
        { x: perchX + 16, y: baseY + 8 + swayOffset * 0.9, angle: 0.4, scale: 0.8 }
      ];

      leaves.forEach((lf, idx) => {
        ctx.save();
        ctx.translate(lf.x, lf.y);
        ctx.rotate(lf.angle + Math.sin(time * 1.8 + idx) * 0.08 + branch.swayAngle * 0.4);
        ctx.scale(lf.scale, lf.scale);

        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.quadraticCurveTo(7, -5, 16, 0);
        ctx.quadraticCurveTo(7, 5, 0, 0);
        ctx.fillStyle = "rgba(230, 207, 163, 0.36)";
        ctx.fill();
        ctx.strokeStyle = "rgba(244, 241, 234, 0.45)";
        ctx.lineWidth = 0.6;
        ctx.stroke();
        ctx.restore();
      });

      // ----------------------------------------------------------------------
      // 2. DRAW CELESTIAL SUNBIRD (CHÚ CHIM MẶT TRỜI)
      // ----------------------------------------------------------------------
      ctx.save();
      ctx.translate(sunbird.x, sunbird.y);
      ctx.rotate(sunbird.bodyTilt);

      const breathScale = 1 + Math.sin(sunbird.breathPhase) * 0.025;
      ctx.scale(breathScale, breathScale);

      // Solar Halo Aura around the Sunbird
      const sunHalo = ctx.createRadialGradient(0, -6, 2, 0, -6, 42);
      sunHalo.addColorStop(0, "rgba(230, 207, 163, 0.28)");
      sunHalo.addColorStop(0.5, "rgba(201, 169, 110, 0.1)");
      sunHalo.addColorStop(1, "rgba(201, 169, 110, 0)");
      ctx.fillStyle = sunHalo;
      ctx.beginPath();
      ctx.arc(0, -6, 42, 0, Math.PI * 2);
      ctx.fill();

      // Tiny Feet gripping the branch (visible when perched)
      if (sunbird.state === "perched" || sunbird.wingOpenAmount < 0.4) {
        ctx.strokeStyle = "rgba(230, 207, 163, 0.85)";
        ctx.lineWidth = 1.1;
        ctx.beginPath();
        ctx.moveTo(-2, 0);
        ctx.lineTo(-1, 3.5);
        ctx.moveTo(2, 0);
        ctx.lineTo(3, 3.5);
        ctx.stroke();
      }

      // Back Wing (When flying / flapping)
      if (sunbird.wingOpenAmount > 0.05) {
        const flap = Math.sin(sunbird.wingPhase);
        const wingElevation = -14 - flap * 16 * sunbird.wingOpenAmount;
        const wingSpreadX = -18 - Math.cos(sunbird.wingPhase) * 6 * sunbird.wingOpenAmount;

        ctx.save();
        ctx.beginPath();
        ctx.moveTo(-2, -8);
        ctx.quadraticCurveTo(
          wingSpreadX * 0.6,
          wingElevation - 8,
          wingSpreadX,
          wingElevation
        );
        ctx.quadraticCurveTo(
          wingSpreadX * 0.5,
          wingElevation + 10,
          -6,
          -4
        );
        ctx.closePath();
        ctx.fillStyle = "rgba(230, 207, 163, 0.48)";
        ctx.fill();
        ctx.restore();
      }

      // Long Graceful Twin Tail Streamers of the Sunbird
      const tailWag =
        sunbird.state === "perched"
          ? Math.sin(time * 2.2) * 1.8
          : Math.sin(sunbird.wingPhase * 0.5) * 4.5;

      ctx.beginPath();
      ctx.moveTo(-8, -3);
      ctx.quadraticCurveTo(-18, 4 + tailWag * 0.5, -28, 12 + tailWag);
      ctx.quadraticCurveTo(-16, 1 + tailWag * 0.3, -6, -1);
      ctx.closePath();
      const tailGrad = ctx.createLinearGradient(-8, -3, -28, 12);
      tailGrad.addColorStop(0, "rgba(244, 241, 234, 0.92)");
      tailGrad.addColorStop(0.5, "rgba(230, 207, 163, 0.78)");
      tailGrad.addColorStop(1, "rgba(201, 169, 110, 0.1)");
      ctx.fillStyle = tailGrad;
      ctx.fill();

      // Sunbird Sculpted Body (Plump chest & sleek back in Champagne Gold & Pearl Ivory)
      const birdBodyGrad = ctx.createLinearGradient(8, -14, -10, 2);
      birdBodyGrad.addColorStop(0, "rgba(255, 252, 245, 0.98)");
      birdBodyGrad.addColorStop(0.45, "rgba(238, 216, 172, 0.95)");
      birdBodyGrad.addColorStop(1, "rgba(196, 158, 92, 0.9)");

      ctx.beginPath();
      ctx.moveTo(9, -9); // Throat
      ctx.quadraticCurveTo(11, -2, 3, 1); // Plump solar breast
      ctx.quadraticCurveTo(-5, 2, -10, -3); // Belly to tail base
      ctx.quadraticCurveTo(-6, -11, 2, -13); // Sleek dorsal back
      ctx.closePath();
      ctx.fillStyle = birdBodyGrad;
      ctx.shadowColor = "rgba(230, 207, 163, 0.55)";
      ctx.shadowBlur = 12;
      ctx.fill();
      ctx.shadowBlur = 0;

      // Sunbird Rounded Head & Characteristic Curved Nectar Beak
      ctx.save();
      ctx.translate(5, -12);
      ctx.rotate(sunbird.headPitch);

      // Head dome
      ctx.beginPath();
      ctx.arc(0, 0, 5.6, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255, 250, 240, 0.98)";
      ctx.fill();

      // Golden Crown Sheen
      ctx.beginPath();
      ctx.arc(-0.5, -1.2, 4.2, Math.PI * 0.9, Math.PI * 2.1);
      ctx.fillStyle = "rgba(222, 188, 124, 0.65)";
      ctx.fill();

      // Characteristic Slender Down-Curved Sunbird Beak (Mỏ cong chim mặt trời)
      ctx.beginPath();
      ctx.moveTo(4.8, -1.2);
      ctx.quadraticCurveTo(11.5, -1.8, 15.2, 2.2);
      ctx.quadraticCurveTo(10.5, -0.2, 4.5, 0.8);
      ctx.closePath();
      ctx.fillStyle = "rgba(230, 207, 163, 0.95)";
      ctx.fill();

      // Obsidian Eye + Specular Glint
      ctx.beginPath();
      ctx.arc(1.8, -0.8, 1.25, 0, Math.PI * 2);
      ctx.fillStyle = "#12141C";
      ctx.fill();

      ctx.beginPath();
      ctx.arc(2.1, -1.1, 0.45, 0, Math.PI * 2);
      ctx.fillStyle = "#FFFFFF";
      ctx.fill();

      ctx.restore();

      // Foreground Wing (Folded neatly when perched, flapping gracefully when flying)
      const flapFront = Math.sin(sunbird.wingPhase);
      const foldMix = sunbird.wingOpenAmount;

      // Interpolate between folded wing tip and flapping wing tip
      const foldedTipX = -11;
      const foldedTipY = -2;
      const flappingTipX = -6 + Math.cos(sunbird.wingPhase) * 8;
      const flappingTipY = -22 - flapFront * 18;

      const wingTipX = foldedTipX * (1 - foldMix) + flappingTipX * foldMix;
      const wingTipY = foldedTipY * (1 - foldMix) + flappingTipY * foldMix;

      const wingGrad = ctx.createLinearGradient(2, -8, wingTipX, wingTipY);
      wingGrad.addColorStop(0, "rgba(255, 255, 255, 0.96)");
      wingGrad.addColorStop(0.55, "rgba(235, 212, 168, 0.88)");
      wingGrad.addColorStop(1, "rgba(201, 169, 110, 0.35)");

      ctx.beginPath();
      ctx.moveTo(2, -8);
      ctx.quadraticCurveTo(
        (2 + wingTipX) * 0.5 - 4 * foldMix,
        (-8 + wingTipY) * 0.5 - 6 * foldMix,
        wingTipX,
        wingTipY
      );
      ctx.quadraticCurveTo(
        (wingTipX - 6) * 0.5,
        (wingTipY - 3) * 0.5 + 3,
        -5,
        -3
      );
      ctx.closePath();
      ctx.fillStyle = wingGrad;
      ctx.fill();

      ctx.restore();
      ctx.restore();
    }

    /* ========================================================================
       PART H: MASTER 60FPS ANIMATION LOOP
       ======================================================================== */
    let lastFrameTime = performance.now();

    function renderLoop(now) {
      requestAnimationFrame(renderLoop);

      const dt = Math.min((now - lastFrameTime) / 1000, 0.05);
      lastFrameTime = now;
      const elapsedSec = now * 0.001;

      ctx.clearRect(0, 0, width, height);

      // 1. Update Fish & Sunbird Physics
      updateFishPhysics(elapsedSec, dt);
      updateSunbirdAndBranch(elapsedSec, dt);

      // 2. Render Gentle Water & Motes
      drawGentleWaterAndMotes(elapsedSec);

      // 3. Render Left-Side Artisanal Branch & Celestial Sunbird
      drawBranchAndSunbird(elapsedSec);

      // 4. Render Stardust Trail & Wake
      drawStardustAndWake();

      // 5. Render Ultra-Billowing Butterfly Silk Pectoral & Ventral Fins
      drawBillowingPectoralAndVentralFins();

      // 6. Render 11-Ray Grand Bridal-Silk Tail Veil
      drawFlowingTailVeil();

      // 7. Render Rounded Head, Pearlescent Body & High Dorsal Veil
      drawFishBodyAndRoundedHead();
    }

    requestAnimationFrame(renderLoop);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initCelestialNatureCanvas);
  } else {
    initCelestialNatureCanvas();
  }
})();
