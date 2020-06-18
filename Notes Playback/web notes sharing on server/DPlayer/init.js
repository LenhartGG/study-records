var urlBase = document.location.origin;
var shareInfo = null;

function getShareCode() {
    var shareID  = window.location.search.substring(1);
    
    if (!shareID) {
        var hash = window.location.hash;
        shareID = hash.slice(hash.indexOf('?') + 1);
    }
    
    return shareID.replace('?', '');
}

function initPage() {
    var shareCode = getShareCode();
    var httpReq = getHttpRequest();
    var url = urlBase + "/checkvideo?" + shareCode;

    httpReq.onreadystatechange = function() {
        if (httpReq.readyState == 4 && httpReq.status == 200) {
            var srcList = ["./DPlayer/hls.js", "./DPlayer/dash.all.min.js",
                           "./DPlayer/flv.js", "./DPlayer/DPlayer.min.js", 
                           "./DPlayer/web-notes.js"];
            loadScripts(srcList)
        }

        if (httpReq.readyState== 4 && httpReq.status == 404) {
            redirect404();
        }
    };

    httpReq.open("GET", url, true);
    httpReq.send();	
}

function loadScripts(sources) {
    sources.forEach(function (src) {
        var script = document.createElement('script');
        script.src = src;
        script.async = false; //<-- the important part
        document.body.appendChild( script ); //<-- make sure to append to body instead of head 
    });
}

function redirect404() {
    var url404 = document.location.origin + '/s/404.html';
    window.location.replace(url404);
}

function getHttpRequest() {
    return window.XMLHttpRequest ? 
        new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
}
