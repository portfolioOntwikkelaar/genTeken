const canvas = document.getElementById("my-canvas");
const ctx = canvas.getContext("2d");
resizeCanvas();

window.addEventListener("resize", resizeCanvas);

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  draw(color, size) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, size, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
  }
}

const triangle = [
  new Point(window.innerWidth / 2, 80),
  new Point(80, window.innerHeight - 80),
  new Point(window.innerWidth - 80, window.innerHeight - 80),
];

function randomColor(time) {
  const r = 128 + Math.sin(time * 0.001) * 127;
  const g = 128 + Math.sin(time * 0.001 + 2) * 127;
  const b = 128 + Math.sin(time * 0.001 + 4) * 127;
  return `rgba(${r}, ${g}, ${b}, 0.8)`;
}

function drawFractal(startPoint, time) {
  let prev = startPoint;
  const total = 80000;
  let colorShift = 0;

  for (let i = 0; i < total; i++) {
    const corner = triangle[Math.floor(Math.random() * 3)];
    const mid = new Point((prev.x + corner.x) / 2, (prev.y + corner.y) / 2);
    const color = randomColor(time + i * 0.002);
    mid.draw(color, 0.6 + Math.sin(i * 0.001) * 0.3);
    prev = mid;
  }
}

let animationRunning = false;
let time = 0;

function animate(startPoint) {
  if (!animationRunning) return;
  time += 1;
  ctx.fillStyle = "rgba(0, 0, 0, 0.08)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  drawFractal(startPoint, time);
  requestAnimationFrame(() => animate(startPoint));
}

canvas.addEventListener("click", (e) => {
  const start = new Point(e.x, e.y);
  if (!animationRunning) {
    animationRunning = true;
    document.getElementById("instructions").style.display = "none";
    animate(start);
  }
});
