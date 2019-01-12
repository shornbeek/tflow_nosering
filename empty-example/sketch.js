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
 
function setup() {
  createCanvas(1640, 1480);
  video = createCapture(VIDEO);
  video.hide();
  console.log(ml5);
  poseNet = ml5.poseNet(video, modelReady);
  poseNet.on('pose', gotPoses);
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
    noseX = lerp(noseX, nX, 0.8);
    noseY = lerp(noseY, nY, 0.4);
    eyelX = lerp(eyelX, eX, 0.8);
    eyelY = lerp(eyelY, eY, 0.4);
    eyelXa = lerp(eyelX, eXa, 0.8);
    eyelYa = lerp(eyelY, eYa, 0.7);
  }
}

function modelReady() {
  console.log('model ready');
}

function draw() {
  image(video, 0, 0);
  
  let d = dist(noseX, noseY, eyelX, eyelY);

  fill(155, 110, 110);
  ellipse(noseX, noseY, 5, 5, d);
  fill(10,90,255);
  ellipse(eyelX, eyelY, 50);

  fill(0,0,255);
  ellipse(eyelXa, eyelYa, 50);
  ellipse(eyelXa, eyelYa, 50);
  line(eyelXa, eyelYa, eyelX, eyelY, 0, 20, 0, 20);
 

}