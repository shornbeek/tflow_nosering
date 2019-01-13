let video;
let poseNet;
let noseX = 0;
let noseY = 0;
let eyelX = 0;
let eyelY = 0;

let eyelXrr = 0;
let eyelYrr = 0;
let eyelXa = 0;
let eyelYa = 0;

let early = 0;
let earlx = 0;
let earry = 0;
let earrx = 0;

var imgl;
var imgr;
var bg;
var bgb;
var offset = 0;
var easing = 0.05;
var noseglass;
 
function setup() {
  createCanvas(1640, 1480);
  video = createCapture(VIDEO);
  video.hide();
  console.log(ml5);
  poseNet = ml5.poseNet(video, modelReady);
  poseNet.on('pose', gotPoses);
 

  bg = loadImage("https://i.ibb.co/r7QSPMx/frontarrow.png");
  bgb = loadImage("https://i.ibb.co/c33bS87/backarrow.png");
  imgl = loadImage("https://i.ibb.co/dcmp87t/glassl.png");
  imgr = loadImage("https://i.ibb.co/PDcwcnC/glassr.png"); 

  noseglass = loadImage("https://i.ibb.co/HzWkzDb/teeth.png");



  // img.hide(imgl, imgr);
}

function gotPoses(poses) {
  console.log(poses);
  if (poses.length > 0) {
    let nX = poses[0].pose.keypoints[0].position.x;
    let nY = poses[0].pose.keypoints[0].position.y;
    let eX = poses[0].pose.keypoints[1].position.x;
    let eY = poses[0].pose.keypoints[1].position.y;
    let eXa = poses[0].pose.keypoints[2].position.x;
    let eYa = poses[0].pose.keypoints[2].position.y;

    let ely = poses[0].pose.keypoints[3].position.x;
    let elx = poses[0].pose.keypoints[3].position.y;
    let ery = poses[0].pose.keypoints[4].position.x;
    let erx = poses[0].pose.keypoints[4].position.y;

    noseX = lerp(noseX, nX,  0.8);
    noseY = lerp(noseY, nY,  0.4);
    eyelX = lerp(eyelX, eX, 0.8);
    eyelY = lerp(eyelY, eY, 0.4);
    eyelXa = lerp(eyelX, eXa, 0.8);
    eyelYa = lerp(eyelY, eYa, 0.7);

    early = lerp(early, ely, 0.7);
    earlx = lerp(earlx, elx, 0.7);
    earrx = lerp(earrx, erx, 0.4);
    earry = lerp(earry, ery, 0.4);
  }
}

function modelReady() {
  console.log('model ready');
}

function draw() {
  image(imgl, 0, 0, height/2, );
 
 
  image(bg, early, earlx, 105, 105);
  image(imgr,  0, 0); // Display at full opacity
  image(video, 0, 0);
  let d = dist(noseX, noseY, eyelX, eyelY);
  // let dis = dist(early, earlx, eyelX, eyelY)

  stroke(255, 255, 255);
  ellipse(noseX, noseY, 5, 5, d);
  // image(noseglass, noseX, noseY, d );
  stroke(127, 63, 120);
  image(imgr, eyelX, eyelY, 105, 105, );

  image(imgl, eyelXa, eyelYa, -105, 105, );
  
  // image(imgl, 50, 50,  eyelXa, eyelYa, 30);
    // line( 50, 50,  eyelXa, eyelYa);
    // rect( eyelYa, eyelY, 20, 5, 20, 5);
    

  // image(img, eyelXa, 150, 350, eyelYa, eyelX, eyelY);
  image(bg, early, earlx, 105, 105);
  // image(bgb, early, earlx, 20);
  image(bgb, earry, earrx, -105, 105);

  // background(bg);
  


 

}