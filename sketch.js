let t = 0;

function setup() {
  const holder = select('#canvas-holder');
  const w = holder ? holder.width : windowWidth;
  const h = 420;
  let canvas = createCanvas(w, h);
  canvas.parent('canvas-holder');
  noStroke();
  colorMode(HSB, 360, 100, 100, 100);
}

function windowResized() {
  const holder = select('#canvas-holder');
  if (holder) {
    resizeCanvas(holder.width, 420);
  } else {
    resizeCanvas(windowWidth, 420);
  }
}

function draw() {
  background(230, 20, 10, 100); 

  t += 0.002 + (mouseX / max(1, width)) * 0.01;

  let cols = 24;
  let rows = 8;
  let cellW = width / cols;
  let cellH = height / rows;

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let x = i * cellW + cellW * 0.5;
      let y = j * cellH + cellH * 0.5;

      let n = noise(i * 0.15 + t * 0.6, j * 0.15 + t * 0.6);
      let r = map(n, 0, 1, 6, cellW * 0.6);

      let hue = map(i + j, 0, cols + rows, 180, 280);
      let alpha = map(n, 0, 1, 40, 100);

      fill(hue, 60, 100, alpha);
      ellipse(
        x + (noise(i * 0.3, j * 0.3, t) * 30 - 15),
        y + (noise(j * 0.3, i * 0.3, t) * 20 - 10),
        r + r * ((mouseY / height) - 0.5)
      );
    }
  }

  for (let k = 0; k < 6; k++) {
    burbuja(k);
  }
}

function burbuja(seed) {
  let px = width * noise(t + seed);
  let py = height * noise(t + seed + 10);
  let size = 80 + 60 * noise(seed * 0.5 + t);
  fill(200, 40, 100, 10);
  ellipse(px, py, size);
}
