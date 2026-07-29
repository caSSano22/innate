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

function showInnateToast(msg) {
  const toast = document.createElement('div');
  toast.style.cssText = `
    position: fixed; bottom: 28px; right: 28px; z-index: 1000;
    background: #000; color: #fff; border: 1px solid #401FFB;
    padding: 14px 22px; border-radius: 8px; font-family: var(--font-mono);
    font-size: 0.88rem; box-shadow: 0 10px 30px rgba(64,31,251,0.4);
  `;
  toast.textContent = msg;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 4000);
}
