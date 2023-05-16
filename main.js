song1 = "";
song2 = "";
LeftWristX = 0;
LeftWristY = 0;
RightWristX = 0;
RightWristY = 0;
ScoreLeftWrist = 0;
ScoreRightWrist = 0;
Song1_status = "";
Song2_status = "";

function preload() {
song1 = loadSound("Song1.mp3");
song2 = loadSound("music2.mp3");
}
function setup() {
    canvas = createCanvas(600, 600);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    PoseNet = ml5.poseNet(video,ModelLoaded);
    PoseNet.on('pose',gotposes);
}
function draw() {
    image(video, 0, 0, 600, 600);
    Song1_status = song1.isPlaying();
    Song2_status = song2.isPlaying();

    fill("#FF0000");
    stroke("#FF0000");
    if(ScoreRightWrist > 0.2)
    {
    circle(RightWristX,RightWristY,20);
    song2.stop();
    if (Song1_status == false) {
        song1.play();
        document.getElementById("song").innerHTML = "Playing Harry Potter song";
    }
    }

    if(ScoreLeftWrist > 0.2)
    {
    circle(LeftWristX,LeftWristY,20);
    song1.stop();
    if (Song2_status == false) {
        song2.play();
        document.getElementById("song").innerHTML = "Playing Peter pan song";
    }
    }

if(song1 = false){
    document.getElementById("song").innerHTML = "Peter pan song playing";
    aud.onplaying(true);
}
}

function ModelLoaded() {
    console.log("PoseNet is initialized");
}

function gotposes(results) {
    if(results.length > 0) {
        console.log(results);
        ScoreRightWrist = results[0].pose.keypoints[10].score;
        ScoreLeftWrist = results[0].pose.keypoints[9].score;
        LeftWristX = results[0].pose.leftWrist.x ;
        LeftWristY = results[0].pose.leftWrist.y ;
        RightWristX = results[0].pose.rightWrist.x ;
        RightWristY = results[0].pose.rightWrist.y ;
        console.log("Left Wrist X = " + LeftWristX + "Right Wrist X = " + RightWristX + "Left Wrist Y = " + LeftWristY + "Right Wrist Y = " + RightWristY);

    }
}

function play() {
    song.play();
    song.setVolume(1);
    song.rate(1);
}