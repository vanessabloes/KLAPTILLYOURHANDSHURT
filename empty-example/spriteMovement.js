// Daniel Shiffman
// http://youtube.com/thecodingtrain
// https://thecodingtrain.com/CodingChallenges/111-animated-sprite.html

// Horse Spritesheet from
// https://opengameart.org/content/2d-platformer-art-assets-from-horse-of-spring

// Animated Sprite
// https://youtu.be/3noMeuufLZY

let spritesheet;
let spritedata;

let animation = [];

let horses = [];

function preload() {
  spritedata = loadJSON("../horse/horse.json");
  spritesheet = loadImage("../horse/horse.png");
}

function setup() {
  createCanvas(640, 480);
  let frames = spritedata.frames;
  for (let i = 0; i < frames.length; i++) {
    let pos = frames[i].position;
    let img = spritesheet.get(pos.x, pos.y, pos.w, pos.h);
    animation.push(img);
  }

  for (let i = 0; i < 5; i++) {
    horses[i] = (animation, 0, i * 75, random(0.1, 0.4));
  }
}

function show(index, len, animation, x, y) {
  let index = floor(index) % len;
  image(animation[index], x, y);
}

function animate(index, speed, x, w) {
  index += speed;
  x += speed * 15;

  if (x > width) {
    x = -w;
  }
}

function draw() {
  background(0);

  for (let horse of horses) {
    horse.show();
    horse.animate();
  }

  //   image(animation[frameCount % animation.length], 0, 0);
}
