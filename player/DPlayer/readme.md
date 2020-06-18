# Web notes sharing demo using documents


## Dplayer

## MSE(Media Source Extensions) 支持

1.HLS
```
const dp = new DPlayer({
    container: document.getElementById('dplayer'),
    video: {
        url: 'demo.m3u8',
        type: 'hls',
    },
    pluginOptions: {
        hls: {
            // hls config
        },
    },
});
console.log(dp.plugins.hls); // Hls 实例
```

```
// 另一种方式，使用 customType
const dp = new DPlayer({
    container: document.getElementById('dplayer'),
    video: {
        url: 'demo.m3u8',
        type: 'customHls',
        customType: {
            customHls: function(video, player) {
                const hls = new Hls();
                hls.loadSource(video.src);
                hls.attachMedia(video);
            },
        },
    },
});
```

2.FLV

需要在 DPlayer.min.js 前面加载 flv.js。

```
const dp = new DPlayer({
    container: document.getElementById('dplayer'),
    video: {
        url: 'demo.flv',
        type: 'flv',
    },
    pluginOptions: {
        flv: {
            // flv config
        },
    },
});
console.log(dp.plugins.flv); // flv 实例
```
```
// 另一种方式，使用 customType
const dp = new DPlayer({
    container: document.getElementById('dplayer'),
    video: {
        url: 'demo.flv',
        type: 'customFlv',
        customType: {
            customFlv: function(video, player) {
                const flvPlayer = flvjs.createPlayer({
                    type: 'flv',
                    url: video.src,
                });
                flvPlayer.attachMediaElement(video);
                flvPlayer.load();
            },
        },
    },
});
```

3.配合其他 MSE 库使用

```
<script src="pearplayer.js"></script>
```
```
const dp = new DPlayer({
    container: document.getElementById('dplayer'),
    video: {
        url: 'https://qq.webrtc.win/tv/Pear-Demo-Yosemite_National_Park.mp4',
        type: 'pearplayer',
        customType: {
            pearplayer: function(video, player) {
                new PearPlayer(video, {
                    src: video.src,
                    autoplay: player.options.autoplay,
                });
            },
        },
    },
});
```