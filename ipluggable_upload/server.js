/**
 * Created by Administrator on 2017/6/5.
 */
var express = require('express'),
    path = require('path'),
    app = express(),
    fs = require('fs'),
    multiparty = require('multiparty');  // FormData解析工具
var target_path;
var config = {
    upload_dir: 'uploadfiles'
}

// 引入静态文件代码
app.use(express.static(path.join(__dirname, 'public')));

//设置允许跨域访问该服务.
app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    //Access-Control-Allow-Headers ,可根据浏览器的F12查看,把对应的粘贴在这里就行
    // res.header('Access-Control-Allow-Headers', 'Content-Type');
    // res.header('Access-Control-Allow-Methods', '*');
    // res.header('Content-Type', 'application/json;charset=utf-8');
    next();
  });

// 文件上传url
var form = new multiparty.Form();
app.post('/upload', function(req, res){
    form.parse(req, function (err, fields, files) {
        if (err){
            throw err;
        }
        // console.log(fields);
        // console.log(files);
        // fields显示非文件类型的所有key、value值
        Object.keys(fields).forEach(function(name) {
            console.log('got field named ' + name);
        });

        for (key in files){
            files[key].forEach(function (file, index) {
                target_path = config.upload_dir + '/' + file.originalFilename;
                try {
                     // 读取缓存文件，同时写入所需上传的目录
                    fs.createReadStream(file.path).pipe(fs.createWriteStream(target_path));
                    // console.log(file.originalFilename);
                    // console.log('Upload completed!');
                    res.json({infor:"success"});
                } catch (err){
                    res.json({err:err});
                }
            })
        }

        // for (key in files){
        //     files[key].forEach(function (file, index) {
        //         target_path = config.upload_dir + '/' + file.originalFilename;
        //         try {
        //              // 读取缓存文件，同时写入所需上传的目录
        //             fs.createReadStream(file.path).pipe(fs.createWriteStream(target_path));
        //             // console.log(file.originalFilename);
        //             // console.log('Upload completed!');
        //             res.json({infor:"success"});
        //             return;
        //         } catch (err){
        //             res.json({err:err});
        //             return;
        //         }
        //     })
        // }
    });
});

app.listen(8080);
console.log('Listening on port 8080');
