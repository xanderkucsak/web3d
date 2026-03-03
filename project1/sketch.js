let myModel;
let car;
let view;
let tex;
let scalevar = 140;
let mapscale = 1
let mapX = 0;
let mapY = 0;
let mapZ = 0;

let carSpeed = 5;     
let minSpeed = 1;
let maxSpeed = 10;

let carRotation = 0;
let targetAngle = 0;
let earth;

let facingX = 1;
let facingY = 0;

function preload() {
  myModel = loadModel("/web3d/project1/bburg.stl", true);
  car = loadImage("/web3d/project1/carart.png");
  earth = loadImage("/web3d/project1/earth.jpg");
  
  //other backgrounds
 //earth = loadImage("/web3d/project1/lawn.jpg");
 //earth = loadImage("/web3d/project1/googleearth.png");
  tex = loadImage("/web3d/project1/tex.jpg");
}

function setup() {
  createCanvas(1600, 800, WEBGL);
  noCursor();

  view = createCamera();
  view.setPosition(16, 0, 5);

  perspective(PI / 3, width / height, 0.01, 10000);
}

function draw() {
  
//background(earth); - i guess this does not work in webgl
  
  background(0);

camera();               
resetMatrix();          
noLights();
imageMode(CENTER);

push()
  scale(mapscale)
image(earth,0,0,2000,1000);
  //but this does!
 pop() 
  orbitControl(0.9, 0.9, 0.021);
  lights();

  // acceleration
  if (keyIsDown(87)) carSpeed += 0.5;   // W
  if (keyIsDown(83)) carSpeed -= 0.5;   // S
  carSpeed = constrain(carSpeed, minSpeed, maxSpeed);

  let directionX = 0;
  let directionY = 0;

  if (keyIsDown(LEFT_ARROW))  directionX += carSpeed;
  if (keyIsDown(RIGHT_ARROW)) directionX -= carSpeed;
  if (keyIsDown(UP_ARROW))    directionY += carSpeed;
  if (keyIsDown(DOWN_ARROW))  directionY -= carSpeed;

  mapX += directionX;
  mapY += directionY;


//if (directionX !== 0 || directionY !== 0) {
 // targetAngle = atan2(directionY, directionX);
//}

  if (directionX !== 0 || directionY !== 0) {

  let newangle = sqrt(directionX * directionX + directionY * directionY);
 let facex = directionX / newangle;
  let facey = directionY / newangle;

//fixed lerp
  facingX = lerp(facingX, facex, 0.15);
 facingY = lerp(facingY, facey, 0.15);


  carRotation = atan2(facingY, facingX);
}
  
  //lerping
 //  carRotation = lerp(carRotation, targetAngle, 0.15)
      //if (carRotation <= PI / 2){
   //     carRotation = lerp(targetAngle, carRotation, 0.15)
   //   } else {
  //      carRotation = lerp(carRotation, targetAngle, 0.15)
  //    }
  
  push();
  translate(mapX, mapY, mapZ);
  
  //scaling controls
   if (keyIsDown(77)) scalevar = 20, mapscale = 5, carSpeed = 30, maxSpeed = 30// m
  if (keyIsDown(78)) scalevar = 140 , mapscale = 1, carSpeed = 5, maxSpeed = 10 // n
 
  
  scale(scalevar);
  fill(128, 124, 127);
  // texture(tex)
  model(myModel);
 
  pop();

  carIcon();
}

function carIcon() {
  camera();
  resetMatrix();
  noLights();

  drawingContext.disable(drawingContext.DEPTH_TEST);
  imageMode(CENTER);


  push();
  rotate(carRotation);
  image(car, 0, 0, 105, 70);
  pop();


  push();

  //only map
  translate(width / 2 - 120, -height / 2 + 120);

  rotate(carRotation);


  scale(3);

  fill(150);
  rotateX(1)
  translate(1,0.5,1)
  model(myModel);

  pop();

  drawingContext.enable(drawingContext.DEPTH_TEST);
}
