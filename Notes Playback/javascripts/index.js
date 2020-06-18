
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
$(function () {
    console.log($("#bgImg"));

    var width = $("#bgImg").width();
    var height = $("#bgImg").height();
    var ratio = window.devicePixelRatio || 1;
    canvas.style.width = width + "px";
    canvas.style.height = height + "px";
    canvas.width = width * ratio;
    canvas.height = height * ratio;
    pWidth = canvas.width;
    pHeight = canvas.height;
    
    url = 'images';
    var jsonUrl = "./vlog.json";
    $.get(jsonUrl, function (result) {
        console.log(result);

        var data = result;
        $("#title").html(data.noteName);
        var bgUrl = "./images/paperBg.jpg";
        $("#audio").attr("src", `./${url}/${data.audioFile}`);
        $("#canvas").css({
            "background-image": `url('${bgUrl}')`,
            "background-size": "cover"
        });

        //开始
        $('#start').click(function (){
            handleStart(data);
        });
        //停止
        $('#stop').click(function (){
            handleStop();
        });
        //播放
        $('#play').click(function (){
            handlePlay(data);
            $('#pause').css('display', 'inline-block');
            $('#play').css('display', 'none');
        });
        //暂停
        $('#pause').click(function (){
            $('#play').css('display', 'inline-block');
            $('#pause').css('display', 'none');
            handlePause();
        });

    })
})

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
    console.log("play");
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