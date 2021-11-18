song_1 = "";
song_2 = "";
left_wrist_x = 0;
left_wrist_y = 0;
right_wrist_x = 0;
right_wrist_y = 0;
score_left_wrist = 0;
score_right_wrist = 0;
song1_status="";
song2_status="";

function preload()
{
    song_1 = loadSound("music.mp3");
    song_2 = loadSound("music2.mp3");
}

function setup()
{
    canvas = createCanvas(600,500);
    canvas.center(); 
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotPoses);
    
}

function draw()
{
    image(video,0,0,600,500);
    song1_status= song_1.isPlaying();
    song2_status= song_2.isPlaying();
    fill("FF5733");
    stroke("FF5733");
    if (score_right_wrist >= 0.2)
    {
        circle(right_wrist_x, right_wrist_y, 20);
        song2.stop();
        if (song1 == false)
        {
            song1.play();
            document.getElementById("song_name").innerHTML = "Playing Harry Potter song";
        }

    }

    if (score_left_wrist >= 0.2)
    {
        circle(left_wrist_x, leftt_wrist_y, 20);
        song1.stop();
        if (song2 == false)
        {
            song2.play();
            document.getElementById("song_name").innerHTML = "Playing Peter Pan song";
        }

    }
}

function modelLoaded()
{
    console.log("Posenet is intialized");
}

function gotPoses(results)
{
    if (results.length > 0)
    {
        console.log(results);
        score_right_wrist = results[0].pose.keypoints[10].score;
        score_left_wrist = results[0].pose.keypoints[9].score;
        right_wrist_x = results[0].pose.rightWrist.x;
        right_wrist_y = results[0].pose.rightWrist.y;
        left_wrist_x = results[0].pose.leftWrist.x;
        left_wrist_y = results[0].pose.leftWrist.y;
    } 
}

function play()
{
    song.play();
    song.setVolume(1);
    song.rate(1);
}