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
    var url = urlBase + "/getshareinfo?" + shareCode;

    httpReq.onreadystatechange = function() {
        if (httpReq.readyState == 4 && httpReq.status == 200) {
            shareInfo = JSON.parse(httpReq.responseText);

            // start to initialize page
            document.getElementById("share_owner").innerText = 
                shareInfo.user + document.getElementById("share_owner").innerText;
            document.title.innerText = shareInfo.user + document.title.innerText;
            document.getElementById("share_limit").innerText += getShareDate(shareInfo.share_end);
         }

         if (httpReq.readyState == 4 && httpReq.status == 404) {
            redirect404();
         }
    };

    httpReq.open("GET", url, true);
    httpReq.send();	
}

function getShareDate(timestamp) {
    var date = new Date(timestamp);
    return date.toUTCString();
}

function clickSubmit() {
    var shareCode = getShareCode();
    var httpReq = getHttpRequest();
    var password = document.getElementById("share_pwd").value;
    var url = urlBase + "/getplaypage?share_code=" + shareCode + 
        "&password=" + password;

    httpReq.onreadystatechange = function() {
        if (httpReq.readyState == 4 && httpReq.status == 200) {
            var playerURL = JSON.parse(httpReq.responseText).url;
            if (playerURL == "") {
                alert("输入的密码不对哦！")
            } else {
                window.location.replace(playerURL);
            }
         }
    };

    httpReq.open("GET", url, true);
    httpReq.send();	
}

function redirect404() {
    var url404 = document.location.origin + '/s/404.html';
    window.location.replace(url404);
}

function getHttpRequest() {
    return window.XMLHttpRequest ? 
        new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
}
