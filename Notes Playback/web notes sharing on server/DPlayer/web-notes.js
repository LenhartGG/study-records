var dp = new DPlayer({
    container: document.getElementById('dplayer'),
    // screenshot: true,
    hotkey: true,
    autoplay: true,
    loop: false,
    lang: "zh-cn",  //可选值: 'en', 'zh-cn', 'zh-tw'
    mutex: true,    //阻止多个播放器同时播放
    video: {
        name: 'HD',
        url: getUrl(),
        type: 'mp4',
        defaultQuality: 0,
        pic: './DPlayer/poster.jpg',
    }
});


function getShareVideoCode() {
    var shareID  = window.location.search.substring(1);
    
    if (!shareID) {
        var hash = window.location.hash;
        shareID = hash.slice(hash.indexOf('?') + 1);
    }
    
    return shareID.replace('?', '');
}

function getUrl() {
    var urlBase = document.location.origin + '/playvideo?';
    return urlBase + getShareVideoCode()
}