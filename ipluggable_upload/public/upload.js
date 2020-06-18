function fileSelected() {
    var file = document.getElementById('fileToUpload').files[0];
    if (file) {
        var fileSize = 0;
        if (file.size > 1024 * 1024)
            fileSize = (Math.round(file.size * 100 / (1024 * 1024)) / 100).toString() + 'MB';
        else
            fileSize = (Math.round(file.size * 100 / 1024) / 100).toString() + 'KB';

        document.getElementById('fileName').innerHTML = 'Name: ' + file.name;
        document.getElementById('fileSize').innerHTML = 'Size: ' + fileSize;
        document.getElementById('fileType').innerHTML = 'Type: ' + file.type;
    }
}

// function uploadFile(){
    
//     var files = document.getElementById('fileToUpload').files;
    
//     var method = 'POST';
//     var ContentType = "application/json";
//     // var param = {
//     //     url: GlobalLogUrl
//     // }
    
//     var request = $.ajax({
//         // url: getCategoryUrl,
//         url: "127.0.0.1:8080/fileToUpload",
//         method: "post",
//         contentType: "application/json",
//         crossDomain:true,
//         // data: JSON.stringify(param)
//         data: files
//     });
//     request.done(function( data ) {
//         console.log(data);
        

//     });
//     request.fail(function ( jqXHR, textStatus ) {
//         console.log( "Request failed: " + textStatus );
//     })
// }

var files;
var index = 0;
var xhr;
var fd;

function uploadFile() {
    index = 0;
    files = document.getElementById('fileToUpload').files;

    // 单文件上传
    // fd.append("fileToUpload", files[0]);

    // 多文件上传
    // for (key in files){
    //     fd.append("fileToUpload", files[key]);
    // }
    xmlAjax();
}
function xmlAjax(){
    xhr = null;
    fd = null;

    xhr = new XMLHttpRequest();
    fd = new FormData();
    fd.append("author", "connie");
    fd.append("name", "Html 5 File API/FormData");
    
    fd.append("fileToUpload", files[index]);



    /* event listners */
    // xhr.upload.addEventListener("progress", uploadProgress, false);
    xhr.addEventListener("load", uploadComplete, false);
    xhr.addEventListener("error", uploadFailed, false);
    xhr.addEventListener("abort", uploadCanceled, false);
    /* Be sure to change the url below to the url of your upload server side script */
    xhr.open("POST", "http://127.0.0.1:8080/upload");
    xhr.send(fd);
}

function uploadProgress(evt) {
    if (evt.lengthComputable) {
        var percentComplete = Math.round(evt.loaded * 100 / evt.total);
        document.getElementById('progressNumber').innerHTML = percentComplete.toString() + '%';
    }
    else {
        document.getElementById('progressNumber').innerHTML = 'unable to compute';
    }
}

function uploadComplete(evt) {
    /* This event is raised when the server send back a response */
    // alert(evt.target.responseText);
    index++;
    if(index >= files.lengh){
        return;
    }
    xmlAjax();
}

function uploadFailed(evt) {
    alert("There was an error attempting to upload the file.");
}

function uploadCanceled(evt) {
    alert("The upload has been canceled by the user or the browser dropped the connection.");
}
