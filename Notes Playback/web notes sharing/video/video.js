var player = document.getElementsByClassName('player')[0];
var video = document.getElementById('video');
var back_off = document.getElementsByClassName('back_off')[0];
var play = document.getElementsByClassName('play')[0];
var fast_forward = document.getElementsByClassName('fast_forward')[0];
var progress_track = document.getElementsByClassName('progress_track')[0];
var progress_current = progress_track.getElementsByClassName('progress_current')[0];
var progress_circle = progress_current.getElementsByClassName('circle')[0];
var progress_bubble = progress_circle.getElementsByClassName('bubble')[0];
var progress_totaltime = document.getElementsByClassName('progress_totaltime')[0];
var progress_buffered = document.getElementsByClassName('progress_buffered')[0];

var clickNum = 0;   //用于判断要播放还是暂停
var timmer = null;  //进度条时间控制器

$(function () {
    createVideoPlayer();
})

function createVideoPlayer() {
    
    //设置视频总时长
    video.onload = function(){
        progress_totaltime.innerHTML = formatTime(video.duration);
    }
    progress_totaltime.innerHTML = formatTime(video.duration);
    
    // console.log( "length: "+video.buffered.length + " Start: " + video.buffered.start(0)
    // + " End: " + video.buffered.end(0));

    //播放/暂停
    play.onclick = function (e) {
        // console.log(e);
        if (clickNum == 0) {
            video.play();   //播放
            clickNum = 1;
            e.target.src = './images/xhdpi-play.png';
            
            timer = setInterval(setProgress, 200);

            video.addEventListener('ended', pauseVideo); //监听 播放结束

        } else {
            video.pause();   //暂停
            clickNum = 0;
            e.target.src = './images/xhdpi-pause.png';
            clearInterval(timer);
        }
    }

    //后退
    back_off.onclick = function () {
        video.currentTime = video.currentTime - 15;
        setProgress();
    }
    //快进
    fast_forward.onclick = function () {
        video.currentTime = video.currentTime + 15;
        setProgress();
    }

    //可以点击轨道改变进度
    progress_track.onmousedown = function (ev) {
        changeProgress(ev);
        setProgress();
    }
    //鼠标拖动小圆改变进度
    progress_circle.onmousedown = function (ev) {
        
        document.onmousemove = function (ev) {
            setProgress();
            changeProgress(ev);
        }
        document.onmouseup = function () {      //当鼠标松开后关闭移动事件和自身事件
            
            setProgress();
            document.onmousemove = null;
            document.onmouseup = null;
        }
        return false;
    }

    //设置进度条
    // timer = setInterval(setProgress, 1000);


}

function changeProgress(ev) {
    // console.log(ev.clientX);

    trackWidth = progress_track.offsetWidth;
    
    var ev = ev || event;
    var l = ev.clientX - 5;          //获取圆距左端的距离
    if (l < 0) {
        l = 0;
    }
    else if (l > trackWidth) {
        l = trackWidth;
    }
    progress_circle.style.left = l-5 + "px";
    progress_current.style.width = l + "px";
    video.currentTime = (l / trackWidth) * video.duration;    //设置当前时间，以改变真正的播放进度
}


function pauseVideo() {
    clickNum = 0;
    play.src = './images/xhdpi-pause.png';
    clearInterval(timer);
    setProgress();
}


function setProgress() {
    // console.log(progress_range.offsetWidth);
    // console.log((video.currentTime / video.duration));
    progress_current.style.width = (video.currentTime / video.duration) * progress_track.offsetWidth + 'px';
    progress_circle.style.left = (video.currentTime / video.duration) * progress_track.offsetWidth - 5 + 'px';
    progress_bubble.innerHTML = formatTime(video.currentTime);
    // console.log(video);
    setBufferedProgress();
}
function setBufferedProgress(){
    // console.log( "length: "+video.buffered.length + " Start: " + video.buffered.start(0)
    // + " End: " + video.buffered.end(0));
    
    progress_buffered.style.left = (video.buffered.start(0) / video.duration)*100 + "%";
    progress_buffered.style.right = (1 - video.buffered.end(0) / video.duration)*100 + "%";
    // console.log((video.buffered.start(0) / video.duration)*100 + "%");
    // console.log((video.buffered.end(0) / video.duration)*100 + "%");
    
    
    
    
}

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