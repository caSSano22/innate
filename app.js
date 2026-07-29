/* ==========================================================================
   INNATE.BOT - INTERACTIVE BASIC AGENTIC OS PLAYGROUND & BEHAVIOR SWITCHER
   ========================================================================== */

const behaviorData = {
  chess: {
    title: 'ChessBehavior',
    file: 'library/chess.py',
    skills: [
      { name: 'play_move', type: 'PHYSICAL', active: true },
      { name: 'compute_chess_move', type: 'DIGITAL', active: false },
      { name: 'calibrate_chess', type: 'DIGITAL', active: false }
    ],
    code: `<span class="code-keyword">class</span> <span class="code-class">ChessBehavior</span>(Behavior):
    <span class="code-keyword">def</span> <span class="code-class">name</span>(self) -> str:
        <span class="code-keyword">return</span> <span class="code-string">"chess_directive"</span>
    <span class="code-keyword">def</span> <span class="code-class">get_skills</span>(self) -> List[str]:
        <span class="code-keyword">return</span> [<span class="code-string">"play_move"</span>, <span class="code-string">"compute_chess_move"</span>, <span class="code-string">"calibrate_chess"</span>]
    <span class="code-keyword">def</span> <span class="code-class">get_prompt</span>(self) -> str:
        <span class="code-keyword">return</span> <span class="code-string">"""You are a chess-playing robot companion. Always think strategically and make the best possible moves. Analyze the board position carefully before deciding."""</span>`
  },
  socks: {
    title: 'CleanSocksBehavior',
    file: 'library/socks_sorting.py',
    skills: [
      { name: 'grab_sock', type: 'PHYSICAL', active: true },
      { name: 'match_pair_vision', type: 'DIGITAL', active: false },
      { name: 'fold_and_deposit', type: 'PHYSICAL', active: false }
    ],
    code: `<span class="code-keyword">class</span> <span class="code-class">CleanSocksBehavior</span>(Behavior):
    <span class="code-keyword">def</span> <span class="code-class">name</span>(self) -> str:
        <span class="code-keyword">return</span> <span class="code-string">"laundry_socks_sorter"</span>
    <span class="code-keyword">def</span> <span class="code-class">get_skills</span>(self) -> List[str]:
        <span class="code-keyword">return</span> [<span class="code-string">"grab_sock"</span>, <span class="code-string">"match_pair_vision"</span>, <span class="code-string">"fold_and_deposit"</span>]
    <span class="code-keyword">def</span> <span class="code-class">get_prompt</span>(self) -> str:
        <span class="code-keyword">return</span> <span class="code-string">"""Identify scattered socks on surface, group matching colors using stereo vision, pick up with 5+1 DOF arm and pair neatly."""</span>`
  },
  security: {
    title: 'SecurityGuardBehavior',
    file: 'library/patrol_security.py',
    skills: [
      { name: 'patrol_room_lidar', type: 'PHYSICAL', active: true },
      { name: 'detect_anomaly_vision', type: 'DIGITAL', active: false },
      { name: 'sound_alarm_signal', type: 'DIGITAL', active: false }
    ],
    code: `<span class="code-keyword">class</span> <span class="code-class">SecurityGuardBehavior</span>(Behavior):
    <span class="code-keyword">def</span> <span class="code-class">name</span>(self) -> str:
        <span class="code-keyword">return</span> <span class="code-string">"night_watchman_patrol"</span>
    <span class="code-keyword">def</span> <span class="code-class">get_skills</span>(self) -> List[str]:
        <span class="code-keyword">return</span> [<span class="code-string">"patrol_room_lidar"</span>, <span class="code-string">"detect_anomaly_vision"</span>, <span class="code-string">"sound_alarm_signal"</span>]
    <span class="code-keyword">def</span> <span class="code-class">get_prompt</span>(self) -> str:
        <span class="code-keyword">return</span> <span class="code-string">"""Autonomously navigate perimeter using 2D LiDaR, scan for movement with RGB camera, send mobile notifications if unexpected motion is detected."""</span>`
  }
};

document.addEventListener('DOMContentLoaded', () => {
  initBehaviorTabs();
  initFaqAccordions();
});

function initBehaviorTabs() {
  const tabBtns = document.querySelectorAll('.tab-btn');
  tabBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const behaviorKey = btn.dataset.behavior;
      updatePlayground(behaviorKey);
    });
  });
}

function updatePlayground(key) {
  const data = behaviorData[key];
  if (!data) return;

  const codeSnippetEl = document.getElementById('codeSnippet');
  if (codeSnippetEl) codeSnippetEl.innerHTML = data.code;

  const githubFileEl = document.getElementById('githubFileBtn');
  if (githubFileEl) {
    githubFileEl.href = `https://github.com/innate-inc/behavior-examples/blob/main/${data.file}`;
  }

  const skillsContainer = document.getElementById('skillsListContainer');
  if (skillsContainer) {
    skillsContainer.innerHTML = data.skills.map(s => `
      <div class="skill-row ${s.active ? 'active' : ''}">
        <span style="font-family: var(--font-display); font-size: 0.95rem; font-weight: 500;">${s.name}</span>
        <span class="skill-tag-${s.type.toLowerCase()}">${s.type}</span>
      </div>
    `).join('');
  }
}

function initFaqAccordions() {
  const faqItems = document.querySelectorAll('.faq-innate-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-innate-question');
    if (question) {
      question.addEventListener('click', () => {
        item.classList.toggle('open');
        const answer = item.querySelector('.faq-innate-answer');
        if (answer) {
          if (item.classList.contains('open')) {
            answer.style.maxHeight = answer.scrollHeight + 'px';
          } else {
            answer.style.maxHeight = '0px';
          }
        }
      });
    }
  });
}

function openPreorderModal() {
  const modal = document.getElementById('preorderModal');
  if (modal) modal.classList.add('open');
}

function closePreorderModal() {
  const modal = document.getElementById('preorderModal');
  if (modal) modal.classList.remove('open');
}

function submitPreorder(e) {
  e.preventDefault();
  closePreorderModal();
  showInnateToast('⚡ Reservation submitted! Confirmation sent to email.');
}

document.addEventListener('DOMContentLoaded', () => {
  initBehaviorTabs();
  initFaqAccordions();
  init3DRobotVisualizer();
});

// Three.js 3D Robot Exploded Assembly Visualizer
let scene, camera, renderer;
let headGroup, gpuGroup, armGroup, chassisGroup;
let isAutoRotating = true;
let targetExplode = 0;
let currentExplode = 0;

function init3DRobotVisualizer() {
  const canvas = document.getElementById('robot3dCanvas');
  if (!canvas || typeof THREE === 'undefined') return;

  const width = canvas.clientWidth || 600;
  const height = canvas.clientHeight || 460;

  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x0d1117);

  camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
  camera.position.set(4, 3.5, 6);
  camera.lookAt(0, 0, 0);

  renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  // Lights
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
  scene.add(ambientLight);

  const dirLight1 = new THREE.DirectionalLight(0xffffff, 0.8);
  dirLight1.position.set(5, 10, 7);
  scene.add(dirLight1);

  const blueLight = new THREE.PointLight(0x401FFB, 2, 10);
  blueLight.position.set(0, 2, 0);
  scene.add(blueLight);

  // Materials
  const metalMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.3, metalness: 0.8 });
  const darkMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.5 });
  const blueGlowMat = new THREE.MeshStandardMaterial({ color: 0x401FFB, emissive: 0x401FFB, emissiveIntensity: 0.6, roughness: 0.2 });
  const glassMat = new THREE.MeshStandardMaterial({ color: 0x38bdf8, roughness: 0.1, transparent: true, opacity: 0.7 });

  // 1. Chassis Group (Base)
  chassisGroup = new THREE.Group();
  const baseMesh = new THREE.Mesh(new THREE.BoxGeometry(2, 0.4, 1.6), metalMat);
  chassisGroup.add(baseMesh);

  // 4 Wheels
  const wheelGeo = new THREE.CylinderGeometry(0.25, 0.25, 0.15, 16);
  const wheelPositions = [
    [-0.9, -0.15, 0.85], [0.9, -0.15, 0.85],
    [-0.9, -0.15, -0.85], [0.9, -0.15, -0.85]
  ];
  wheelPositions.forEach(pos => {
    const wheel = new THREE.Mesh(wheelGeo, darkMat);
    wheel.rotation.z = Math.PI / 2;
    wheel.position.set(...pos);
    chassisGroup.add(wheel);
  });
  scene.add(chassisGroup);

  // 2. GPU / Onboard Compute Group
  gpuGroup = new THREE.Group();
  gpuGroup.position.set(0, 0.35, 0);
  const gpuCore = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.3, 1.0), blueGlowMat);
  gpuGroup.add(gpuCore);
  const heatsink = new THREE.Mesh(new THREE.BoxGeometry(1.0, 0.15, 0.8), metalMat);
  heatsink.position.y = 0.2;
  gpuGroup.add(heatsink);
  scene.add(gpuGroup);

  // 3. Head & Sensors Group
  headGroup = new THREE.Group();
  headGroup.position.set(0, 1.1, 0);
  const headDome = new THREE.Mesh(new THREE.CylinderGeometry(0.4, 0.5, 0.5, 24), darkMat);
  headGroup.add(headDome);
  
  // Stereo Cameras
  const cam1 = new THREE.Mesh(new THREE.SphereGeometry(0.1, 16, 16), glassMat);
  cam1.position.set(-0.18, 0.05, 0.4);
  const cam2 = new THREE.Mesh(new THREE.SphereGeometry(0.1, 16, 16), glassMat);
  cam2.position.set(0.18, 0.05, 0.4);
  headGroup.add(cam1, cam2);

  // LiDaR Dome
  const lidar = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 0.2, 16), blueGlowMat);
  lidar.position.y = 0.35;
  headGroup.add(lidar);
  scene.add(headGroup);

  // 4. Robotic Arm Group (5+1 DOF)
  armGroup = new THREE.Group();
  armGroup.position.set(0.6, 0.5, 0);

  const shoulder = new THREE.Mesh(new THREE.SphereGeometry(0.2, 16, 16), metalMat);
  const upperArm = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.8), darkMat);
  upperArm.position.set(0.2, 0.4, 0);
  upperArm.rotation.z = -Math.PI / 4;

  const forearm = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.7), metalMat);
  forearm.position.set(0.6, 0.8, 0);
  forearm.rotation.z = Math.PI / 6;

  const gripper = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.15, 0.2), blueGlowMat);
  gripper.position.set(0.8, 1.1, 0);

  armGroup.add(shoulder, upperArm, forearm, gripper);
  scene.add(armGroup);

  // Explode Controls Hook
  const slider = document.getElementById('explodeSlider');
  if (slider) {
    slider.addEventListener('input', (e) => {
      targetExplode = parseFloat(e.target.value) / 100;
    });
  }

  const rotateBtn = document.getElementById('toggleAutoRotate');
  if (rotateBtn) {
    rotateBtn.addEventListener('click', () => {
      isAutoRotating = !isAutoRotating;
      rotateBtn.textContent = isAutoRotating ? 'Rotate On' : 'Rotate Off';
      rotateBtn.style.background = isAutoRotating ? 'var(--blue)' : '#475569';
    });
  }

  // Scroll-driven animation hook
  window.addEventListener('scroll', () => {
    const section = document.querySelector('.diagram-section');
    if (!section) return;
    const rect = section.getBoundingClientRect();
    const windowH = window.innerHeight;

    if (rect.top < windowH && rect.bottom > 0) {
      const progress = Math.min(Math.max((windowH - rect.top) / (windowH + rect.height), 0), 1);
      targetExplode = progress;
      if (slider) slider.value = Math.round(progress * 100);
    }
  });

  // Render Loop
  function animate() {
    requestAnimationFrame(animate);

    // Smooth Explode Interpolation
    currentExplode += (targetExplode - currentExplode) * 0.08;

    // Separate Assembly Components
    headGroup.position.y = 1.1 + currentExplode * 1.8;
    gpuGroup.position.z = -currentExplode * 1.5;
    armGroup.position.x = 0.6 + currentExplode * 1.6;
    chassisGroup.position.y = -currentExplode * 1.2;

    if (isAutoRotating) {
      scene.rotation.y += 0.008;
    }

    renderer.render(scene, camera);
  }

  animate();

  // Window Resize
  window.addEventListener('resize', () => {
    if (!canvas) return;
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  });
}

