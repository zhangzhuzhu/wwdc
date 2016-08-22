/**
 * Created by zxz on 2016/2/5.
 */
var http = require('http');
var url = require('url');
var fs = require('fs');
var querystring = require('querystring');

var server = http.createServer();
var HtmlDir = __dirname+'/';

server.on('request',function(req,res){
    var urlStr = url.parse(req.url);
    console.log(HtmlDir)

    //console.log(req.url)
    //console.log(urlStr)
    //console.log(urlStr.pathname)
    switch(urlStr.pathname){
        case '/':
        //首页
            sendData( HtmlDir + './wwdc.html', req, res );
            //sendData(  './html/index.html', req, res );
            break;
        
        default:
            //处理其他情况
            sendData( HtmlDir + urlStr.pathname, req, res );
            break;


    }

});
function sendData(file,req,res){
    //console.log(file);
    fs.readFile(file,function(err,data){

        if(err){

            res.writeHead(404, {
                'content-type' : 'text/html;charset=utf-8'
            });
            res.end('<h1>页面有误</h1>');
        }else{
            var i = file.lastIndexOf('.');
            var suffix = file.substr( i+1, file.length);
            res.writeHead(200, {
                'content-type' : 'text/'+suffix +';charset=utf-8'
            });
            res.end(data);
        }


    })
}
server.listen(80);