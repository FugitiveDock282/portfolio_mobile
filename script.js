// === Intro text for typewriter effect
const introText = `
Initializing fdock282's Portfolio...
Loading assets ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ 100%
Reticulating splines...
Welcome to Barshan's portfolio!
`;

const introEl = document.getElementById('intro-text');
const cursor = document.querySelector('.cursor');
const content = document.getElementById('content');
const commandPrompt = document.getElementById('command-prompt');
const fakeCmdInput = document.getElementById('fake-cmd-input');
const themeToggleBtn = document.getElementById('theme-toggle');

let i = 0;

// Typewriter Intro
function typeWriter() {
  if (i < introText.length) {
    introEl.textContent += introText.charAt(i);
    i++;
    setTimeout(typeWriter, 40);
  } else {
    setTimeout(() => {
      document.getElementById('terminal-intro').style.display = 'none';
      content.classList.remove('hidden');
    }, 1000);
  }
}

// Fake Command Prompt Typing
function simulateCommandTyping(cmd) {
  let j = 0;
  function type() {
    if (j < cmd.length) {
      fakeCmdInput.textContent += cmd.charAt(j);
      j++;
      setTimeout(type, 80);
    }
  }
  type();
}

// Theme Switcher
themeToggleBtn.addEventListener('click', () => {
  const isAmber = document.body.getAttribute('data-theme') === 'amber';
  document.body.setAttribute('data-theme', isAmber ? 'lime' : 'amber');
});

// Default theme on load
document.body.setAttribute('data-theme', 'lime');

// Start typing on load
window.onload = () => {
  typeWriter();
  startStarfield();
};

/* === Starfield Animation === */
const canvas = document.getElementById('starfield');
const ctx = canvas.getContext('2d');

let stars = [];
const numStars = 120;

function randomRange(min, max) {
  return Math.random() * (max - min) + min;
}

function createStars() {
  stars = [];
  for (let i = 0; i < numStars; i++) {
    stars.push({
      x: randomRange(0, window.innerWidth),
      y: randomRange(0, window.innerHeight),
      size: Math.random() * 1.3,
      speed: randomRange(0.02, 0.15),
      alpha: randomRange(0.1, 1),
      twinkleDir: Math.random() > 0.5 ? 1 : -1,
    });
  }
}

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  createStars();
}

window.addEventListener('resize', () => {
  resizeCanvas();
});

function updateStars() {
  stars.forEach(star => {
    star.x -= star.speed;
    star.alpha += 0.005 * star.twinkleDir;
    if (star.alpha >= 1) {
      star.alpha = 1;
      star.twinkleDir = -1;
    } else if (star.alpha <= 0.1) {
      star.alpha = 0.1;
      star.twinkleDir = 1;
    }
    if (star.x < 0) {
      star.x = window.innerWidth;
      star.y = randomRange(0, window.innerHeight);
      star.size = Math.random() * 1.3;
      star.speed = randomRange(0.02, 0.15);
    }
  });
}

function drawStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  stars.forEach(star => {
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(168, 255, 96, ${star.alpha})`;
    ctx.shadowColor = 'rgba(168, 255, 96, 0.7)';
    ctx.shadowBlur = 4;
    ctx.fill();
  });
}

function animateStarfield() {
  updateStars();
  drawStars();
  requestAnimationFrame(animateStarfield);
}

function startStarfield() {
  resizeCanvas();
  animateStarfield();
}

