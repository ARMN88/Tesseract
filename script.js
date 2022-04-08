eruda.init();

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

ctx.setTransform(1, 0, 0, -1, canvas.width/2,canvas.height/2);

ctx.strokeStyle = "white";
ctx.fillStyle = "white";

let angle = 0;
const distance = 3;
let size = canvas.height*1.8;

let cube = [
  new Matrix([
    [-1],[-1],[-1],[-1]
  ]),
  new Matrix([
    [-1],[1],[-1],[-1]
  ]),
  new Matrix([
    [1],[1],[-1],[-1]
  ]),
  new Matrix([
    [1],[-1],[-1],[-1]
  ]),
  new Matrix([
    [-1],[-1],[1],[-1]
  ]),
  new Matrix([
    [-1],[1],[1],[-1]
  ]),
  new Matrix([
    [1],[1],[1],[-1]
  ]),
  new Matrix([
    [1],[-1],[1],[-1]
  ]),
  new Matrix([
    [-1],[-1],[-1],[1]
  ]),
  new Matrix([
    [-1],[1],[-1],[1]
  ]),
  new Matrix([
    [1],[1],[-1],[1]
  ]),
  new Matrix([
    [1],[-1],[-1],[1]
  ]),
  new Matrix([
    [-1],[-1],[1],[1]
  ]),
  new Matrix([
    [-1],[1],[1],[1]
  ]),
  new Matrix([
    [1],[1],[1],[1]
  ]),
  new Matrix([
    [1],[-1],[1],[1]
  ])
]

let projection2d = new Matrix([
  [1, 0, 0],
  [0, 1, 0],
]);

let projection3d = new Matrix([
  [1, 0, 0, 0],
  [0, 1, 0, 0],
  [0, 0, 1, 0],
]);

let rotationXW = new Matrix([
  [Math.cos(Math.PI/6), 0, 0, -Math.sin(Math.PI/6)],
  [0, 1, 0, 0],
  [0, 0, 1, 0],
  [Math.sin(Math.PI/6), 0, 0, Math.cos(Math.PI/6)],
]);

let rotationZW = new Matrix([
  [1, 0, 0, 0],
  [0, 1, 0, 0],
  [0, 0, 1, 0],
  [0, 0, 0, 1]
]);

function Update() {
  requestAnimationFrame(Update);
  ctx.clearRect(-canvas.width/2, canvas.height/2, canvas.width, -canvas.height);
  // update rotations
  rotationZW.array = [
    [1, 0, 0, 0],
    [0, 1, 0, 0],
    [0, 0, Math.cos(angle), -Math.sin(angle)],
    [0, 0, Math.sin(angle), Math.cos(angle)],
  ]
  // apply matrix transformation
  let final = [];
  for(let point of cube) {
    let transformed = point;
    // rotate
    transformed = Matrix.multiply(rotationZW, transformed);
    transformed = Matrix.multiply(rotationXW, transformed);
    // project 4d to 3d
    let w = 1 / (distance - transformed.array[3][0]);
    projection3d.array = [
      [w, 0, 0, 0],
      [0, w, 0, 0],
      [0, 0, w, 0],
    ]
    transformed = Matrix.multiply(projection3d, transformed);
    // project 3d to 2d
    let z = 1 / (distance - transformed.array[2][0]);
    projection2d.array = [
      [z, 0, 0],
      [0, z, 0],
    ]
    transformed = Matrix.multiply(projection2d, transformed);
    transformed = Matrix.scale(transformed, size);
    final.push(transformed);
    ctx.beginPath();
    ctx.arc(transformed.array[0][0], transformed.array[1][0], 5, 0, Math.PI*2);
    ctx.fill();
  }
  DrawCube(final);
  angle -= 0.01;
}

function Connect(offset, i, j, points) {
  let a = points[i+offset].array;
  let b = points[j+offset].array;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(a[0][0], a[1][0]);
  ctx.lineTo(b[0][0], b[1][0]);
  ctx.stroke();
}

function DrawCube(array) {
  ctx.strokeStyle = "green";
  for(let i = 0; i < 4; i++) {
    Connect(0, i, (i+1) % 4, array);
    Connect(0, i+4, ((i+1) % 4)+4, array);
    Connect(0, i, i+4, array);
  }
  ctx.strokeStyle = "red";
  for(let i = 0; i < 4; i++) {
    Connect(8, i, (i+1) % 4, array);
    Connect(8, i+4, ((i+1) % 4)+4, array);
    Connect(8, i, i+4, array);
  }
  ctx.strokeStyle = "dodgerblue";
  for(let i = 0; i < 8; i++) {
    Connect(0, i, i+8, array);
  }
}

window.onload = function() {
  Update();
}

window.onresize = () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
  ctx.setTransform(1, 0, 0, -1, canvas.width/2,canvas.height/2);
  ctx.strokeStyle = "white";
  ctx.fillStyle = "white";
}

window.onwheel = function(e) {
  size -= e.deltaY;
  size = Math.max(1, size);
}
