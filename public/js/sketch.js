// Copyright (c) 2018 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
PoseNet example using p5.js
=== */

let video;
let poseNet;
let poses = [];
let l1=false;
let l2=false;
let l3=false;
let cycle=0;
var prev=0;
var saved = false;

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.size(width, height);

  // Create a new poseNet method with a single detection
  poseNet = ml5.poseNet(video, modelReady);
  // This sets up an event that fills the global variable "poses"
  // with an array every time new poses are detected
  poseNet.on('pose', function(results) {
    poses = results;
  });
  // Hide the video element, and just show the canvas
  video.hide();
}

function modelReady() {
  select('#status').html('Model Loaded');
}

function draw() {
  image(video, 0, 0, width, height);

  // We can call both functions to draw all keypoints and the skeletons
  drawKeypoints();
  drawSkeleton();
}

// A function to draw ellipses over the detected keypoints
function drawKeypoints()  {
  // Loop through all the poses detected
  for (let i = 0; i < poses.length; i++) {
    // For each pose detected, loop through all the keypoints
    let pose = poses[i].pose;
    for (let j = 0; j < pose.keypoints.length; j++) {
      // A keypoint is an object describing a body part (like rightArm or leftShoulder)
      let keypoint = pose.keypoints[j];
      // Only draw an ellipse is the pose probability is bigger than 0.2
      if (keypoint.score > 0.2) {
        fill(255, 0, 0);
        noStroke();
        ellipse(keypoint.position.x, keypoint.position.y, 10, 10);
      }
    }
  }

  if(poses.length!=0){
    l1=true;
    if(abs(poses[0].pose.leftShoulder.y-poses[0].pose.leftWrist.y)<30&&abs(poses[0].pose.rightShoulder.y-poses[0].pose.rightWrist.y)<30&&l1==true){
      l2=true;
      l3=false;
      l1=false;
      
    }

    if(poses[0].pose.leftWrist.y<poses[0].pose.leftEye.y && poses[0].pose.rightWrist.y<poses[0].pose.rightEye.y && l2==true){
      l3=true;
      l2=false;
      l1=false;
    
     
    }
    if(poses[0].pose.leftWrist.y < (poses[0].pose.leftShoulder.y-30) && poses[0].pose.rightWrist.y < (poses[0].pose.rightShoulder.y-30) && l3==true){
      l1=true;
      l2=false;
      l3=false;
      
      cycle++;
      
      
    }

    if(cycle!=prev){
      console.log(cycle);
      // document.getElementById("sarthak").innerHTML=cycle;
      $("#sarthak").fadeOut("slow",()=>{
        $("#sarthak").html(cycle);
        $("#sarthak").fadeIn();
      });
    }
    if(cycle==10 && saved==false){
      console.log("e over");
    //   $.ajax({
    //     type:"GET",
    //     url :"/save/sarthak",
    //     success : function(msg){
    //        console.log(msg);
    //        saved=true;
       
    //     }
    // });
    }
    prev=cycle;
    
  }
 
}

function xAxis(lx,ly){

  

}

// A function to draw the skeletons
function drawSkeleton() {
  // Loop through all the skeletons detected
  for (let i = 0; i < poses.length; i++) {
    let skeleton = poses[i].skeleton;
    // For every skeleton, loop through all body connections
    for (let j = 0; j < skeleton.length; j++) {
      let partA = skeleton[j][0];
      let partB = skeleton[j][1];
      stroke(255, 0, 0);
      line(partA.position.x, partA.position.y, partB.position.x, partB.position.y);
    }
  }
}
