


let video;
let poseNet;
let pose;
let skeleton;
var bubbles = [];
let gif;
let graphics;

let obj;

function preload() {

  gif = createVideo('no.MOV');

  // obj = loadModel('virtualSelf.obj', true);


}
function setup() {


  graphics = createGraphics(1000,1000);
  gif.volume(null);
  gif.hide();
  gif.loop();


  createCanvas(windowWidth, windowHeight, WEBGL);
  camera(0, 0, -30* 100, 0, 0, 0, 0, 1, 0);
  translate(-300, 0, 0);



  video = createCapture(VIDEO)
  video.hide();
  poseNet = ml5.poseNet(video);
  poseNet.on('pose', gotPoses);

}

function Bubble(x, y, z, size, rThresh) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.rThresh = rThresh;
    this.size = size;


    this.display = function() {


      console.log(y);

      let camX = map(y, 0, 200, PI/6, 0);
      camera(camX, 0, (height/2)/tan(PI/6), 0, 0, 0, 1, 0, 0);
      pop();
      ortho(-width / 2, width / 2, height / 2, -height / 2, 0, 500);

      let fov = map(size, 0, 2400, PI, 0);
      let cameraZ = (height) / tan((PI/3)/2.0);
      perspective(fov, width/height, cameraZ / 10, cameraZ  * 10);
        strokeWeight(1);
        stroke(0);
        fill('rgba(100, 100, 100,.5)');

        if(this.rThresh>50){

          if(x>z){

          rotateZ(millis()/10000);

        }

        if(x<z){

          rotateZ(millis()/-10000);
        }
      }

        if(this.y < 200){
          rotateX(millis()/(-10000));
        }
        if(this.y > 350){

          rotateX(millis()/(10000));

        }
        // translate(this.x, 5*((this.y)-(height/2)));

        // texture(graphics);

        // lights();
        // normalMaterial();

        push();
        box(300);
}

}

function gotPoses(poses){
  if(poses.length>0){
    graphics.image(gif, 0, 0, 1000, 1000);

    pose = poses[0].pose;
    skeleton = poses[0].skeleton;
  }
}

function draw() {

  translate(video.width,0);

  scale(-1,1);
  background(100, 0, 0, 0);



  if(pose){


    for(var i = 0; i < 1; i++){

      bubbles[i] = new Bubble(100,pose.leftWrist.y, pose.rightWrist.y,abs(pose.leftWrist.x-pose.rightWrist.x)*5, abs(pose.leftWrist.y-pose.rightWrist.y));

    }
       for (var i = 0; i < bubbles.length; i++) {
        bubbles[i].display();
      }
  }

}
