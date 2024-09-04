let BeatParticles = [];
let video;
let bodyPose;
let poses = [];
let lhx, lhy, rhx, rhy; //left hand right hand
let lfx, lfy, rfx, rfy; //left feet right feet
let lhSpeed, rhSpeed, lfSpeed, rfSpeed;

let Num_ReturnBall = 2;
let returnBalls = [];
let triggerDist = 30;
let triggerFrameCount = 40;
let triggerPoseCounter = 0; //for validate the starting pose
let triggerPoseReady = false; //if trigger pose is ready
let handDist = 0;

let audioDing;
let audioDang;
let lastPlayed = 0;

let lhandDist;
let rhandDist;
let lFootDist;
let rFootDist;

let gx;
let gy;
let rx;
let ry;
let bx;
let by;

let score = 0;
let counter = 0;

function preload() {
  // Load the bodyPose model
  bodyPose = ml5.bodyPose("BlazePose");
  
  
  audioDing = loadSound('ding.wav');
  audioDang = loadSound('dang.wav');
  
}

function setup() {
  createCanvas(640, 480);
  background(0);
  noStroke();
  createBeatParticle();

  // Create the video and hide it
  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide();

  //for (let i = 0; i < Num_ReturnBall; i++) {
  //  returnBalls.push(new returnBall(random(width), random(height)));
  //}

  // Start detecting poses in the webcam video
  bodyPose.detectStart(video, gotPoses);
  system = new ParticleSystem(createVector(width / 2, 50));
  //lfsystem = new ParticleSystem(createVector(width / 3, 50));
  //rfsystem = new ParticleSystem(createVector(width / 4, 50));
  
}

function draw() {
  // Draw the webcam video
  //scale(-1, 1);
  
  translate(video.width, 0);
  scale(-1, 1);
  image(video, 0, 0, width, height);
  //background(0);
  drawPoints();
  triggerPose();
  system.run();
  //lfsystem.origin.set(lfx, lfy);
  //lfsystem.run();
  //lfsystem.addParticle();
  //rfsystem.origin.set(rfx, rfy);
  //rfsystem.run();
  //rfsystem.addParticle();
  //console.log(frameRate());
  push();
  
   fill(255);
  stroke(4);
  //strokeWeight(4);
  textSize(50);
  text(score, width/2, height/2);
  
  pop();

  for (let i = BeatParticles.length - 1; i >= 0; i--) {
    BeatParticles[i].update();
    BeatParticles[i].display();
    if (BeatParticles[i].isFinished()) {
      BeatParticles.splice(i, 1);
    }
  }
  
  if (millis() - lastPlayed > 1000) {
    lastPlayed = millis();
    counter ++;
  }
  
  if (counter < 10) {
    playAudioDang();
  }
  if (counter == 11) {
    playAudioDing();
    counter = 0;
  }
  
  
}

function createBeatParticle() {
  addScore();
  console.log(score);
   let r = new BeatParticle(random(width/2 )+ width/4, random(height/3 )+ height /3);
  r.colorType = r.getColor('r');
  let g = new BeatParticle(random(width/2 )+ width/4, random(height/3 )+ height /3);
  g.colorType = g.getColor('g');
  let b = new BeatParticle(random(width/2 )+ width/4, random(height/3 )+ height*2/3);
  b.colorType = b.getColor('b');
  //let y = new BeatParticle(random(width/2 )+ width/4, random(height/2 )+ height /2);
  //y.colorType = y.getColor('y');
  //BeatParticles.push(y);
  //let y = new BeatParticle(random(width/2 )+ width/4, random(height/2 )+ height /2);
  //y.colorType = y.getColor('y');
  BeatParticles.push(r);
  rx = r.x;
  ry = r.y;
  BeatParticles.push(g);
  gx = g.x;
  gy = g.y;
  BeatParticles.push(b);
  bx = b.x;
  by = b.y;
  //BeatParticles.push(y);

  setTimeout(createBeatParticle, 11000); // create a new particle every 4 seconds
}

class BeatParticle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 100;
    this.alpha = 0;
    this.startTime = millis();
    this.fadeInDuration = 11000; // 2 seconds to fade in
    this.fullOpacityDuration = 200; // 0.2 seconds at full opacity
    this.fadeOutDuration = 10; // 0.1 second to fade out
    //this.r = random([0,255]);
    //this.g = random([0,255]);
    //this.b = random([0,255]);
  }

  getColor(cIn) {
    //let cChoices = ['r', 'g', 'b', 'y'];
    //let inputColorType = random(cChoices);
  let inputColorType = cIn;
    
    if (inputColorType == "r") {
      this.r = 255;
      this.g = 0;
      this.b = 0;
    } else if (inputColorType == "g") {
      this.r = 0;
      this.g = 255;
      this.b = 0;
    } else if (inputColorType == "b") {
      this.r = 0;
      this.g = 0;
      this.b = 255;
    } else if (inputColorType == "y") {
      this.r = 255;
      this.g = 255;
      this.b = 0;
    }
    return inputColorType;
  }

  update() {
    let elapsed = millis() - this.startTime;

    if (elapsed < this.fadeInDuration) {
      // fading in
      this.alpha = map(elapsed, 0, this.fadeInDuration, 0, 255);
    } else if (elapsed < this.fadeInDuration + this.fullOpacityDuration) {
      // full opacity
      this.alpha = 255;
    } else if (
      elapsed <
      this.fadeInDuration + this.fullOpacityDuration + this.fadeOutDuration
    ) {
      // fading out
      let fadeOutElapsed =
        elapsed - this.fadeInDuration - this.fullOpacityDuration;
      this.alpha = map(fadeOutElapsed, 0, this.fadeOutDuration, 255, 0);
    } else {
      // finished
      this.alpha = 0;
    }
  }

  display() {
    fill(this.r, this.g, this.b, this.alpha);
      stroke(155,0,72);
    strokeWeight(10);
    ellipse(this.x, this.y, this.size, this.size);
  }

  isFinished() {
    return (
      this.alpha === 0 &&
      millis() >
        this.startTime +
          this.fadeInDuration +
          this.fullOpacityDuration +
          this.fadeOutDuration
    );
  }
}

function drawPoints() {
  // Draw all the tracked landmark points
  for (let i = 0; i < poses.length; i++) {
    let pose = poses[0];

    //lhSpeed = dist(lhx,lhy,pose.keypoints[17].x,pose.keypoints[17].y);
    //console.log(lhSpeed);
    lhx = pose.keypoints[17].x;
    lhy = pose.keypoints[17].y; //left hand
    //left hand
    push();
    fill(0, 255, 0);
    stroke(255);
    strokeWeight(10);
    circle(lhx, lhy, 60);
    pop();
    //let lr = returnBalls[0];
    //lr.attractedTo(lhx, lhy);
    //lr.move();
    //lr.slowDown();
    //lr.display();

    rhx = pose.keypoints[18].x;
    rhy = pose.keypoints[18].y; //right hand
    push();
    fill(255, 0, 0);
    stroke(255);
    strokeWeight(10);
    circle(rhx, rhy, 60);
    pop();
    //let rr = returnBalls[1];
    //rr.attractedTo(rhx, rhy);
    //rr.move();
    //rr.slowDown();
    //rr.display();

    lfx = pose.keypoints[32].x; //left foot
    lfy = pose.keypoints[32].y;
    //left hand
    fill(0,0, 255);
    stroke(255);
    strokeWeight(10);
    circle(lfx, lfy, 60);

    rfx = pose.keypoints[31].x; //right foot
    rfy = pose.keypoints[31].y;
    //left hand
    fill(0, 0, 255);
    stroke(255);
    strokeWeight(10);
    circle(rfx, rfy, 60);
  }

  //calculate the distance between two hands
  if (lhx) {
    handDist = dist(lhx, lhy, rhx, rhy);
    //console.log(handDist);
  } else {
    handDist = 0;
  }
}

function triggerPose() {
  if (handDist < triggerDist) {
    //trigger the detection for start pose
    if (triggerPoseCounter >= triggerFrameCount) {
      triggerPoseReady = true;
      //console.log("Ready for release!");
      system.origin.set((lhx + rhx) / 2, (lhy + rhy) / 2);
      system.addParticle();
    } else {
      //charging
      //console.log("Charging...");
      system.origin.set((lhx + rhx) / 2, (lhy + rhy) / 2);
      system.addParticle();
      triggerPoseCounter++;
    }
  } else {
    if (triggerPoseReady) {
      //release
      //console.log("Release!!!");
      triggerPoseCounter = 0;
      triggerPoseReady = false;
    } else {
      triggerPoseCounter = 0;
      //console.log("Nothing happens.");
    }
  }
}

// Callback function for when bodyPose outputs data
function gotPoses(results) {
  // Save the output to the poses variable
  poses = results;
}


// dang dang dang ding
function playAudioDing() {
  if (!audioDing.isPlaying()) {
    audioDing.play();
  }
}

function playAudioDang() {
  if (!audioDang.isPlaying()) {
    audioDang.play();
  }
}

//score

function addScore() {
  lHandDist = dist(lhx, lhy, gx, gy);
  rHandDist = dist(rhx, rhy, rx, ry);
  lFootDist = dist(lfx, lfy, bx, by);
  rFootDist = dist(rfx, rfy, bx, by);

  console.log(lHandDist,rHandDist,lFootDist,rFootDist);
  if(lHandDist < 50) {
    score ++;
  }
  if(rHandDist < 50) {
    score ++;
  }
  if(rFootDist < 50 || lFootDist < 50) {
    score ++;
  }
  
}

// A simple Particle class
let Particle = function (position) {
  this.acceleration = createVector(0, 0.05);
  this.velocity = createVector(random(-1, 1), random(-1, 0));
  this.position = position.copy();
  this.lifespan = 255;
};

Particle.prototype.run = function () {
  this.update();
  this.display();
};

// Method to update position
Particle.prototype.update = function () {
  this.velocity.add(this.acceleration);
  this.position.add(this.velocity);
  this.lifespan -= 2;
};

// Method to display
Particle.prototype.display = function () {
  stroke(155, 0, 49, this.lifespan);
  strokeWeight(14);
  fill(255, 201, 9, this.lifespan);
  ellipse(this.position.x, this.position.y, 12, 12);
};

// Is the particle still useful?
Particle.prototype.isDead = function () {
  return this.lifespan < 0;
};

let ParticleSystem = function (position) {
  this.origin = position.copy();
  this.particles = [];
};

ParticleSystem.prototype.addParticle = function () {
  this.particles.push(new Particle(this.origin));
};

ParticleSystem.prototype.run = function () {
  for (let i = this.particles.length - 1; i >= 0; i--) {
    let p = this.particles[i];
    p.run();
    if (p.isDead()) {
      this.particles.splice(i, 1);
    }
  }
};

class returnBall {
  constructor(x, y) {
    // properties
    this.x = x;
    this.y = y;
    this.xSpd = random(-1, 1);
    this.ySpd = random(-5, -3);
    this.dia = 60;
  }
  // methods
  attractedTo(targetX, targetY) {
    // By calculating "target position - this position"
    // we can get the direction to the target.
    // Then we will arbitrary decrease the acceleration to reach the target
    let xAcc = (targetX - this.x) * 0.15;
    let yAcc = (targetY - this.y) * 0.15;
    this.xSpd += xAcc;
    this.ySpd += yAcc;
  }
  slowDown() {
    this.xSpd = this.xSpd * 0.92;
    this.ySpd = this.ySpd * 0.92; // 3% less per frame
  }
  move() {
    this.x += this.xSpd;
    this.y += this.ySpd;
  }
  display() {
    push();
    stroke(155, 0, 49);
    strokeWeight(14);
    fill(255, 201, 9);
    //ellipse(this.position.x, this.position.y, 12, 12);
    translate(this.x, this.y);
    circle(0, 0, this.dia);
    pop();
  }
}

