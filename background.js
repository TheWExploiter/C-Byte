const canvas = document.getElementById('background');
const ctx = canvas.getContext('2d');

let width, height;
let points = [];

function resize() {
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;
}

window.addEventListener('resize', resize);
resize();

function createPoint() {
  return {
    x: Math.random() * width,
    y: Math.random() * height,
    vx: (Math.random() - 0.5) * 0.5,
    vy: (Math.random() - 0.5) * 0.5,
    alpha: 1
  };
}

for (let i = 0; i < 100; i++) {
  points.push(createPoint());
}

function draw() {
  ctx.clearRect(0, 0, width, height);
  
  for (let point of points) {
    point.x += point.vx;
    point.y += point.vy;
    point.alpha -= 0.001;

    if (point.alpha <= 0 || point.x < 0 || point.x > width || point.y < 0 || point.y > height) {
      Object.assign(point, createPoint());
    }

    ctx.beginPath();
    ctx.arc(point.x, point.y, 2, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(180, 120, 255, ${point.alpha})`;
    ctx.fill();
  }

  for (let i = 0; i < points.length; i++) {
    for (let j = i + 1; j < points.length; j++) {
      const dx = points[i].x - points[j].x;
      const dy = points[i].y - points[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      
      if (dist < 150) {
        ctx.beginPath();
        ctx.moveTo(points[i].x, points[i].y);
        ctx.lineTo(points[j].x, points[j].y);
        ctx.strokeStyle = `rgba(140, 80, 255, ${(1 - dist / 150) * 0.5})`;
        ctx.stroke();
      }
    }
  }

  requestAnimationFrame(draw);
}

draw();
