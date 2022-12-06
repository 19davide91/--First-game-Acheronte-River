const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const backGroundImg = new Image();
backGroundImg.src = './img/redwater.jpg';
function backgroundCanvas(){
    ctx.drawImage(backGroundImg, 0, 0, canvas.width , canvas.height);
}

class Boat {
    constructor(){
        this.x = 10;
        this.y = 160;
        this.speedX = 0;
        this.speedY = 0;

        const boatImg = new Image();
        boatImg.src = './img/boat.jpg';
        boatImg.addEventListener('load',()=>{
        this.img = boatImg;
        }) 
    }
    draw(){
        ctx.drawImage(this.img, this.x, this.y, 60, 60);
    }
    moveUp() {
        this.y -= 20;
    }
    moveDown() {
        this.y += 20;
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

let boat1 = new Boat()

class Demon{
    constructor(x,y){
        this.x = x;
        this.y = y;
        const demonImg = new Image();
        demonImg.src = './img/demon.jpg';
        demonImg.addEventListener('load',()=>{
        this.img = demonImg;
        }) 
    }
    draw() {
        ctx.drawImage(this.img, this.x, this.y, 80, 80);
    }
    move(){
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

class Soul{
    constructor(x,y){
        this.x = x;
        this.y = y;
        const soulImg = new Image();
        soulImg.src = './img/soul.jpg';
        soulImg.addEventListener('load',()=>{
        this.img = soulImg;
        }) 
    }
    draw() {
        ctx.drawImage(this.img, this.x, this.y, 50, 50);
    }
    move(){
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

let soul1 = new Soul(canvas.width, 50);

document.addEventListener('keydown', event => {
    switch (event.keyCode) {
      case 38:
        boat1.moveUp();
        break;
      case 40:
        boat1.moveDown();
        break;
    }
  });

let arrayDemons = [];
let frames = 0;

function updateDemons() {
    for (i = 0; i < arrayDemons.length; i++) {
      arrayDemons[i].x -= 1;
      arrayDemons[i].draw();
    }
    frames += 0.5;
    if (frames % 120 === 0) {
      let minY = 0;
      let maxY = 310;
      let y = Math.floor(Math.random() * (maxY- minY + 1) + minY);
      let x = canvas.width-100;
      arrayDemons.push(new Demon(x,y));
    }
  }

let arraySouls = [];
let frames2 = 5;

 function updateSouls() {
    for (i = 0; i < arraySouls.length; i++) {
      arraySouls[i].x -= 1;
      arraySouls[i].draw();
    }
    frames2 += 0.5;
    if (frames % 120 === 0) {
      let minY = 0;
      let maxY = 310;
      let y = Math.floor(Math.random() * (maxY- minY + 1) + minY);
      let x = canvas.width-100;
      arraySouls.push(new Soul(x,y));
    }
  }

 function updateCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    backgroundCanvas();
    boat1.draw();
    updateDemons();
    updateSouls();
  }

 function gameStart(){
    backgroundCanvas();
    boat1.draw();
    updateDemons();
    updateSouls();
  }

 function clearCanvas(){
    clearInterval(animation);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    backgroundCanvas();
  }

window.onload = () => {
    backgroundCanvas();
    document.getElementById('button-one').onclick = () => {
      gameStart(); 
      animation = setInterval(updateCanvas, 5);
    };
    document.getElementById('button-two').onclick = () => {
         clearCanvas();
        };
};