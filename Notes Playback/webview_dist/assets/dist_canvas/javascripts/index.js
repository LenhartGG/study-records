var interval = null;
var points = [];  //当前的points
var pWidth = "";
var pHeight = "";
var canvas = document.getElementById("canvas");
var bgImg = document.getElementById("bgImg");
var ctx = canvas.getContext("2d");
var url = '';
var currentDot = 0;
var dataPoints = [];
var currentStroke = 0;
var baseTS = '';
var step = 10;    //0.01s 渲染一次
var isPaused = false;  //是否暂停
var pausedObj;        //暂停的时刻ts
var audio = document.getElementById("audio");          //音频
var timer;      //用于暂停
var progress_track = document.getElementsByClassName('progress_track')[0];
var progress_current = progress_track.getElementsByClassName('progress_current')[0];
var progress_circle = progress_current.getElementsByClassName('circle')[0];
var progress_bubble = progress_circle.getElementsByClassName('bubble')[0];
var progress_totaltime = document.getElementsByClassName('progress_totaltime')[0];
$(function () {
    console.log($("#bgImg"));

    var jsonData = window.Native.getData();
//    alert("jsonData"+jsonData);
    url = 'images';

    var data = JSON.parse(jsonData);
    initCanvas()
    initAudio(data);


    //开始
    $('#start').click(function (){
        //alert("start")
        handleStart(data);
    });
    //停止
    $('#stop').click(function (){
        handleStop();
    });
    //播放
    $('#play').click(function (){
        handlePlay(data);

        timer = setInterval(setProgress, 200);
        audio.addEventListener('ended', pauseAudio); //监听 播放结束

        $('#pause').css('display', 'block');
        $('#play').css('display', 'none');
    });
    //暂停
    $('#pause').click(function (){
        $('#play').css('display', 'block');
        $('#pause').css('display', 'none');
        handlePause();

        audio.pause();
        clearInterval(timer);
    });

})

//在android代码中调用此方法
function showInfoFromJava(msg){
   alert("来自客户端的信息："+msg);
//   destroyAudio();
//    var audio = document.getElementById("audio");
    audio.pause();
}

function initAudio(data){
    $("#audio").attr("src", './'+url+'/'+data.audioFile);
    //设置视频总时长
    window.onload = function(){
        progress_totaltime.innerHTML = formatTime(audio.duration);
        //alert(audio.duration)
    }
    progress_totaltime.innerHTML = formatTime(audio.duration);

}

function destroyAudio(){
    audio.stop();
    if(audio.played){
        audio.stop();
    }
}

function initCanvas(){

    var width = $("#bgImg").width();
    var height = $("#bgImg").height();
    var ratio = window.devicePixelRatio || 1;
    canvas.style.width = width + "px";
    canvas.style.height = height + "px";
    canvas.width = width * ratio;
    canvas.height = height * ratio;
    pWidth = canvas.width;
    pHeight = canvas.height;
    $("#canvas").css({
        "background-image": 'url(./images/paperBg.jpg)',
        "background-size": "cover"
    });
}

function clearCanvas()
{  
    // dataPoints = [];
    currentDot = 0;
    points = [];
    console.log(pWidth);
    console.log(pHeight);
    ctx.clearRect(0,0,pWidth, pHeight); 
}  

function handleStart(data){
//    alert("handleStart");
    clearCanvas();
    console.log("start");
    clearInterval(interval);
    console.log("interval: "+ interval);
    interval = null;
    
    if(interval){
        return;
    }

    dataPoints = data.points;
    currentStroke = dataPoints[0].strokeNum;
    // baseTS = "";

    document.getElementById("audio").play();
    if (data.noteType === 2) {
        baseTS = parseInt(data.create_time_stamp);
    } else {
        baseTS = parseInt(dataPoints[0].ts);
    }
    interval = setInterval(() => {
        // console.log(baseTS - parseInt(dataPoints[currentDot].ts));
        //当时间开始时间加上若干step时间接近点阵数据时间ts时开始画点连线
        //reset： false 时，是在一个线段的点，
        if (Math.abs(baseTS - parseInt(dataPoints[currentDot].ts)) < step) {
            dataPoints[currentDot].reset = false;
            if (dataPoints[currentDot].strokeNum !== currentStroke) {
                dataPoints[currentDot].reset = true;
                currentStroke = dataPoints[currentDot].strokeNum;
            }
            points.push(dataPoints[currentDot]);
            drawToCanvas(points);
            currentDot += 1;
        } else {
            baseTS += step;
        }
        //当所有点都渲染之后，退出 setInterval
        if (currentDot > dataPoints.length - 1) {
            clearInterval(interval);
            points = [];
            console.log("interval: "+ interval);
            interval = null;
        }
    }, step);

}

function handleStop(){

    console.log("stop");
    console.log("interval: "+ interval);
    clearInterval(interval);
    interval = null;
    clearCanvas()
}

function handlePlay(data){
    setProgress()
//    alert("play");
    clearInterval(interval);
    console.log("interval: "+ interval);
    interval = null;

    dataPoints = data.points;
    currentStroke = dataPoints[0].strokeNum;
    // baseTS = "";

    document.getElementById("audio").play();
    if (data.noteType === 2) {
        baseTS = parseInt(data.create_time_stamp);
    } else {
        baseTS = parseInt(dataPoints[0].ts);
    }
    // 每10ms执行一次，
    interval = setInterval(() => {
        // console.log(baseTS - parseInt(dataPoints[currentDot].ts));
        //当开始时间加上间歇时间step，接近点阵数据时间ts时开始画点连线
        //reset： false 时，是在一个线段的点，
        // if(!isPaused){
        //     // pausedTime = currentDot;
        //     baseTS = dataPoints[currentDot].ts;
        // } 
        if(isPaused){
            // currentDot = pausedTime?pausedTime:currentDot;
            // if(pausedTime) console.log(pausedTime);
            if(currentDot>=dataPoints.length){
                clearInterval(interval);
                points = [];
                console.log("interval: "+ interval);
                interval = null;
                return;
            }
            baseTS = dataPoints[currentDot].ts;
            isPaused = false;
        }
        if (Math.abs(baseTS - parseInt(dataPoints[currentDot].ts)) < step) {
            dataPoints[currentDot].reset = false;
            if (dataPoints[currentDot].strokeNum !== currentStroke) {
                dataPoints[currentDot].reset = true;
                currentStroke = dataPoints[currentDot].strokeNum;
            }
            points.push(dataPoints[currentDot]);
            drawToCanvas(points);
            currentDot += 1;
        } else {
            baseTS += step;
        }
        //当所有点都渲染之后，退出 setInterval
        if (currentDot > dataPoints.length - 1) {
            clearInterval(interval);
            points = [];
            console.log("interval: "+ interval);
            interval = null;
        }
    }, step);
}

function handlePause(){

    isPaused = true;
    clearInterval(interval);
    console.log("interval: "+ interval);
    interval = null;
}

function drawToCanvas(jsonData) {
    // console.log(jsonData)
    var length = jsonData.length;
    for (var index = 1; index < length; index++) {
        var startItem = jsonData[index - 1];
        var xPosStart = startItem["x"];
        var yPosStart = startItem["y"];
        var resetStart = startItem["reset"];
        var endItem = jsonData[index];
        var xPosEnd = endItem["x"];
        var yPosEnd = endItem["y"];
        var resetEnd = jsonData[index]["reset"];
        if (!resetEnd) {
            var ratio = window.devicePixelRatio || 1;
            //ctx.strokeStyle = "black";
            ctx.strokeStyle = jsonData[index]['pointColor'];
            ctx.lineWidth = ratio;
            var bookWidth = 3750;
            var bookHeight = 5600;
            var scaleX = pWidth / bookWidth;
            var scaleY = pHeight / bookHeight;
            xPosStart = (xPosStart - 160) * scaleX;
            yPosStart = (yPosStart - 60) * scaleY;
            xPosEnd = (xPosEnd - 160) * scaleX;
            yPosEnd = (yPosEnd - 60) * scaleY;
            ctx.beginPath();
            // console.log(parseInt(xPosStart), parseInt(yPosStart));
            // console.log(parseInt(xPosEnd), parseInt(yPosEnd));
            ctx.moveTo(xPosStart, yPosStart);
            ctx.lineTo(xPosEnd, yPosEnd);
            ctx.stroke();
            
        }
    }
}
function pauseAudio() {
    clearInterval(timer);
    setProgress();
}


/*设置进度条*/
function setProgress() {
    // console.log(progress_range.offsetWidth);
    // console.log((video.currentTime / video.duration));
    progress_current.style.width = (audio.currentTime / audio.duration) * progress_track.offsetWidth + 'px';
    progress_circle.style.left = (audio.currentTime / audio.duration) * progress_track.offsetWidth - 5 + 'px';
    progress_bubble.innerHTML = formatTime(audio.currentTime);

}
/*规范时间*/
function formatTime(oldTime) {
    if(!oldTime){
        return "00:00";
    }
    // var hh = parseInt(oldTime / 3600);
    var mm = parseInt(oldTime / 60);
    var ss = parseInt(oldTime % 60);

    // if(hh<10){
    //     hh = '0'+hh;
    // }
    if (mm < 10) {
        mm = '0' + mm;
    }
    if (ss < 10) {
        ss = '0' + ss;
    }
    return mm + ":" + ss;
}