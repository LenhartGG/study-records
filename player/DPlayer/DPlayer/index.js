var dp = new DPlayer({
    container: document.getElementById('dplayer'),
    // screenshot: true,
    hotkey: true,
    autoplay: false,
    loop: false,
    lang: "zh-cn",  //可选值: 'en', 'zh-cn', 'zh-tw'
    mutex: true,    //阻止多个播放器同时播放
    video: {
        name: 'HD',
        url: 'movie.mp4',
        type: 'mp4',
        defaultQuality: 0,
        pic: 'poster.jpg',
        // thumbnails: 'poster.jpg',
        // quality: [
        //     {
        //         name: 'HD',
        //         url: 'movie.mp4',
        //         type: 'mp4',
        //     },
        //     {
        //         name: 'SD',
        //         url: 'movie.mp4',
        //         type: 'mp4',
        //     },
        // ],
    },
    // subtitle: {  //字幕链接
    //     url: 'webvtt.vtt',
    // },
    // danmaku: {
    //     id: 'demo',
    //     api: 'https://api.prprpr.me/dplayer/',
    // },
});
