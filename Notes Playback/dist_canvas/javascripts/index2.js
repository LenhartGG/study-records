var CANVAS = document.getElementById("canvas");
var BGImg = document.getElementById("bgImg");
var ctx = canvas.getContext("2d");

var pWidth = "";
var pHeight = "";

$(function () {
    // var width = $("#bgImg").width();
    // var height = $("#bgImg").height();
    var width = 429;
    var height = 637;

    
    
    var ratio = window.devicePixelRatio || 1;
    
    // if (ratio !== 1) {
        canvas.width = width * ratio;
        canvas.height = height * ratio;
        pWidth = canvas.width;
        pHeight = canvas.height;
    // }
    console.log("ratio: "+ratio);
    console.log("width: "+width);
    console.log("height: "+height);
    console.log("pWidth: "+pWidth);
    console.log("pHeight: "+pHeight);

    url = 'images';
    var jsonUrl = "./vlog.json";
    $.get(jsonUrl, function (result) {
        console.log(result);

        var data = result;
        
        $("#title").html(data.noteName);
        var bgUrl = "./images/paperBg.jpg";
        $("#canvas").css({
            "background-image": `url('${bgUrl}')`,
            "background-size": "cover"
        });

        initCanvas(data);
    })
})


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

function initCanvas(data) {
    var dataPoints = data.points;

    var baseTS = '';
    var currentDot = 0;
    var currentStroke = 0;
    var step = 10;    //0.01s 渲染一次
    var points = [];

    if (data.noteType === 2) {
        baseTS = parseInt(data.create_time_stamp);
    } else {
        baseTS = parseInt(dataPoints[0].ts);
    }

    var interval = setInterval(() => {
        
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
            ctx.clearRect(0,0,pWidth, pHeight); 
            drawToCanvas(points);
            //将canvas转换成image
            convertToImage();    
            function convertToImage(){
                // ctx.drawImage(canvasNode, 0, 0);
                var imgData = canvas.toDataURL("image/png");
                return imgData;
            }

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