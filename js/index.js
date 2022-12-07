const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const backGroundImg = new Image();
backGroundImg.src = './img/redwater.jpg';
function backgroundCanvas(){
    ctx.drawImage(backGroundImg, 0, 0, canvas.width , canvas.height);
}

function sound(src){
    this.sound = document.createElement('audio');
    this.sound.src = src;
    document.body.appendChild(this.sound);
    this.play = function(){
      this.sound.play();
    }
    this.stop = function(){
      this.sound.pause();
  }
}
let music = new sound('/music/Glory-Eternal.mp3');

function sound2(src){
  this.sound2 = document.createElement('audio');
  this.sound2.src = src;
  document.body.appendChild(this.sound2);
  this.play = function(){
    this.sound2.play();
  }
  this.stop = function(){
    this.sound2.pause();
}
}
let music2 = new sound('/music/WhatsApp Ptt 2022-12-07 at 10.58.16.mp3');

class Boat {
    constructor(){
        this.x = 10;
        this.y = 160;
        this.width = 55;
        this.height = 55;
        this.speedX = 0;
        this.speedY = 0;

        const boatImg = new Image();
        boatImg.src = './img/boat.jpg';
        boatImg.addEventListener('load',()=>{
        this.img = boatImg;
        }) 
    }
    draw(){
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
    moveUp() {
        this.y -= 25;
    }
    moveDown() {
        this.y += 25;
    }
    moveLeft(){
        this.x -= 25
    }
    moveRight(){
        this.x += 25
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
        this.width = 80;
        this.height = 80;
        const demonImg = new Image();
        demonImg.src = './img/demon.jpg';
        demonImg.addEventListener('load',()=>{
        this.img = demonImg;
        }) 
    }
    draw() {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
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
        this.width = 50;
        this.height = 50;
        const soulImg = new Image();
        soulImg.src = './img/soul.jpg';
        soulImg.addEventListener('load',()=>{
        this.img = soulImg;
        }) 
    }
    draw() {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
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

document.addEventListener('keydown', event => {
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

let arrayDemons = [];
let frames = 0;

function updateDemons() {
    let i = 0;
    //for (i = 0; i < arrayDemons.length; i++) {
    while(arrayDemons.length !== 0 && i < arrayDemons.length){
      arrayDemons[i].x -= 1;
      arrayDemons[i].draw();
      i++;
    }
    frames += 0.5;
    if (frames % 120 === 0) {
      let minY = 0;
      let maxY = 310;
      let y = Math.floor(Math.random() * (maxY- minY + 1) + minY);
      let x = canvas.width;
      arrayDemons.push(new Demon(x,y));
    }
  }

let arraySouls = [];
let frames2 = 5;

 function updateSouls() {
  let i = 0;
    // for (i = 0; i < arraySouls.length; i++) {
      while(arraySouls.length !== 0 && i < arraySouls.length){
      arraySouls[i].x -= 0.5;
      arraySouls[i].draw();
      i++;
    }
    frames2 += 0.5;
    if (frames % 120 === 0) {
      let minY = 0;
      let maxY = 310;
      let y = Math.floor(Math.random() * (maxY- minY + 1) + minY);
      let x = canvas.width;
      arraySouls.push(new Soul(x,y));
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
  }

 function gameStart(){
    backgroundCanvas();
    boat1.draw();
    music.play();
  }

 function clearCanvas(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    backgroundCanvas();
    clearInterval(animation);
    arraySouls = [];
    arrayDemons = [];
    music.stop();
  }

  document.addEventListener('keydown',(event)=>{
    if(event.keyCode === 32){
      clearCanvas();
    }
  })

function crashDemon(demon) {
  //console.log('condition four',(boat1.bottom() > demon.top()))
 // console.log('condition three',(boat1.left() < demon.right()))
  //console.log('condition two',(boat1.right() > demon.left()))
 //  console.log('condition one',(boat1.top() < demon.bottom()))
 //console.log('boat position: ', boat1.top(), boat1.left(), boat1.right(), boat1.bottom())
 // console.log('demon position: ', demon.top(), demon.left(), demon.right(), demon.bottom())
 return !(
      boat1.top() > demon.bottom() ||
      boat1.right() < demon.left() ||
      boat1.left() > demon.right() ||
      boat1.bottom() < demon.top() 
    );
  
    // if(boat1.bottom() >= demon.top() &&
    // boat1.top() <= demon.bottom() &&
    // boat1.right() >= demon.left() &&
    // boat1.left() <= demon.right());
    // return true;
  }

function checkCollisionDemons() {
    const collisionDemon = arrayDemons.some(function (demon) {
        return crashDemon(demon);
    });
    console.log('collisionDaemon: ',collisionDemon)
    if(collisionDemon) {
      clearCanvas();
      ctx.font = "55px Comic Sans MS";
      ctx.fillStyle = "red";
      ctx.textAlign = "center";
      ctx.fillText(`OH NO YOU'RE DAMNED!`, canvas.width/2, canvas.height/2);
    }
  }

  function crashSoul(soul) {
    return !(
      boat1.top() > soul.bottom() ||
      boat1.right() < soul.left()||
      boat1.left() > soul.right() ||
      boat1.bottom() < soul.top() 
    );
  }

  function checkCollisionSouls(){
    for(let i = 0; i < arraySouls.length; i++){
      //check for a collision
      if(crashSoul(arraySouls[i])){
        console.log('i touched a soul :)')
        arraySouls.splice(i, 1);
      }
    }
    // const collisionSouls = arraySouls.some(function (soul) {
     //  return crashSoul(soul);
  // });
    //if(collisionSouls){
      //console.log('i touched a soul :)')
      // Find the soul inside arraySouls and remove it from the array
      //const nonTouchedSouls =arraySouls.filter(soul => crashSoul(soul))
      //console.log('nonTouchedSouls', nonTouchedSouls.length)
      // increase the score of the userr
      // arraySouls[i]
    //}
  }

window.onload = () => {
    backgroundCanvas();
    document.getElementById('button-one').onclick = () => {
      gameStart(); 
      animation = setInterval(updateCanvas, 8);
    };
    document.getElementById('button-two').onclick = () => {
      clearCanvas();
    };
};