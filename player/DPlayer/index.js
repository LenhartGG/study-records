const dp = new DPlayer({
    container: document.getElementById('dplayer'),
    // screenshot: true,
    hotkey: true,
    autoplay: true,
    loop: true,
    lang: "zh-cn",  //可选值: 'en', 'zh-cn', 'zh-tw'
    video: {
        quality: [
            {
                name: 'HD',
                url: 'movie.mp4',
                type: 'mp4',
            },
            {
                name: 'SD',
                url: 'movie.mp4',
                type: 'mp4',
            },
        ],
        defaultQuality: 0,
        pic: 'demo.jpg',
        thumbnails: 'thumbnails.jpg',
    },
    // subtitle: {  //字幕链接
    //     url: 'webvtt.vtt',
    // },
    danmaku: {
        id: 'demo',
        api: 'https://api.prprpr.me/dplayer/',
    },
});
