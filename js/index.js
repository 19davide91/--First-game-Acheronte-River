// Global variables
let score = 0;
let arrayDemons = [];
let frames = 0;
let arraySouls = [];
let frames2 = 5;
let animation = "";

// canvas
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const backGroundImg = new Image();
backGroundImg.src = "./img/redwater.jpg";
function backgroundCanvas() {
  ctx.drawImage(backGroundImg, 0, 0, canvas.width, canvas.height);
}

// sounds
let music = new sound("/music/Glory-Eternal.mp3");
let succesSound = new sound("./music/succes.mp3");
let loseSound = new sound("./music/evil-laughing.mp3");

function sound(src) {
  this.sound = document.createElement("audio");
  this.sound.src = src;
  document.body.appendChild(this.sound);
  this.play = function () {
    this.sound.play();
  };
  this.stop = function () {
    this.sound.pause();
  };
}

//classes
class Boat {
  constructor() {
    this.x = 10;
    this.y = 160;
    this.width = 55;
    this.height = 55;
    this.speedX = 0;
    this.speedY = 0;

    const boatImg = new Image();
    boatImg.src = "./img/boat.jpg";
    boatImg.addEventListener("load", () => {
      this.img = boatImg;
    });
  }
  draw() {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }
  moveUp() {
    this.y -= 20;
  }
  moveDown() {
    this.y += 20;
  }
  moveLeft() {
    this.x -= 20;
  }
  moveRight() {
    this.x += 20;
  }
  left() {
    return this.x;
  }
  right() {
    return this.x + this.width;
  }
  top() {
    return this.y;
  }
  bottom() {
    return this.y + this.height;
  }
}

let boat1 = new Boat();

class Demon {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 80;
    this.height = 80;
    const demonImg = new Image();
    demonImg.src = "./img/demon.jpg";
    demonImg.addEventListener("load", () => {
      this.img = demonImg;
    });
  }
  draw() {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }
  move() {
    this.x -= 10;
  }
  left() {
    return this.x;
  }
  right() {
    return this.x + this.width;
  }
  top() {
    return this.y;
  }
  bottom() {
    return this.y + this.height;
  }
}

class Soul {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 50;
    this.height = 50;
    const soulImg = new Image();
    soulImg.src = "./img/soul.jpg";
    soulImg.addEventListener("load", () => {
      this.img = soulImg;
    });
  }
  draw() {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }
  move() {
    this.x -= 10;
  }
  left() {
    return this.x;
  }
  right() {
    return this.x + this.width;
  }
  top() {
    return this.y;
  }
  bottom() {
    return this.y + this.height;
  }
}

document.addEventListener("keydown", (event) => {
  switch (event.keyCode) {
    case 38:
      boat1.moveUp();
      break;
    case 40:
      boat1.moveDown();
      break;
    case 37:
      boat1.moveLeft();
      break;
    case 39:
      boat1.moveRight();
      break;
  }
});

function updateDemons() {
  let i = 0;

  while (arrayDemons.length !== 0 && i < arrayDemons.length) {
    arrayDemons[i].x -= 1;
    arrayDemons[i].draw();
    i++;
  }
  frames += 0.5;
  if (frames % 120 === 0) {
    let minY = 0;
    let maxY = 310;
    let y = Math.floor(Math.random() * (maxY - minY + 1) + minY);
    let x = canvas.width;
    arrayDemons.push(new Demon(x, y));
  }
}

function updateSouls() {
  let i = 0;

  while (arraySouls.length !== 0 && i < arraySouls.length) {
    arraySouls[i].x -= 0.5;
    arraySouls[i].draw();
    i++;
  }
  frames2 += 0.5;
  if (frames % 120 === 0) {
    let minY = 0;
    let maxY = 310;
    let y = Math.floor(Math.random() * (maxY - minY + 1) + minY);
    let x = canvas.width;
    arraySouls.push(new Soul(x, y));
  }
}

function updateCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  backgroundCanvas();
  boat1.draw();
  updateDemons();
  updateSouls();
  checkCollisionDemons();
  checkCollisionSouls();
  showScore();
}

function gameStart() {
  backgroundCanvas();
  boat1.draw();
  music.play();
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  backgroundCanvas();
  clearInterval(animation);
  arraySouls = [];
  arrayDemons = [];
  music.stop();
}

document.addEventListener("keydown", (event) => {
  if (event.keyCode === 32) {
    clearCanvas();
  }
});

function checkDemonHasCrashed(demon) {
  return !(
    boat1.top() > demon.bottom() - 20 ||
    boat1.right() < demon.left() + 20 ||
    boat1.left() > demon.right() - 20 ||
    boat1.bottom() < demon.top() + 20
  );
}

function checkCollisionDemons() {
  const demonHasCrashed = arrayDemons.some(function (demon) {
    return checkDemonHasCrashed(demon);
  });
  console.log("collisionDaemon: ", demonHasCrashed);
  if (demonHasCrashed) {
    clearCanvas();
    ctx.font = "40px Comic Sans MS";
    ctx.fillStyle = "red";
    ctx.textAlign = "center";
    ctx.fillText(
      `OH NO YOU'RE DAMNED! eheh :p`,
      canvas.width / 2,
      canvas.height / 2
    );
    loseSound.play();
  }
}

function crashSoul(soul) {
  return !(
    boat1.top() > soul.bottom() - 10 ||
    boat1.right() < soul.left() + 10 ||
    boat1.left() > soul.right() - 10 ||
    boat1.bottom() < soul.top() + 10
  );
}

function checkCollisionSouls() {
  for (let i = 0; i < arraySouls.length; i++) {
    if (crashSoul(arraySouls[i])) {
      arraySouls.splice(i, 1);
      score += 10;
      succesSound.stop();
      succesSound.play();
    }
  }
}

function showScore() {
  ctx.font = "35px Comic Sans MS";
  ctx.fillStyle = "red";
  ctx.textAlign = "center";
  ctx.fillText(`Score: ${score}`, canvas.width / 2, 40);
}

window.onload = () => {
  backgroundCanvas();
  document.getElementById("button-one").onclick = () => {
    gameStart();
    animation = setInterval(updateCanvas, 8);
  };
  document.getElementById("button-two").onclick = () => {
    clearCanvas();
  };
};
