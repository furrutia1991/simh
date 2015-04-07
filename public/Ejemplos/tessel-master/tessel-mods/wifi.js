var http = require('http');
var ws = require("nodejs-websocket");

var statusCode = 200;
var count = 1;

setImmediate(function start () {
  console.log('http request #' + (count++))
  // http.get("http://172.25.4.202:8080", function (res) {
  //   console.log('# statusCode', res.statusCode)
  //
  //   var bufs = [];
  //   res.on('data', function (data) {
  //     bufs.push(new Buffer(data));
  //     console.log('# received', new Buffer(data).toString());
  //   })
  //   res.on('close', function () {
  //     console.log('done.');
  //     setImmediate(start);
  //   })
  // }).on('error', function (e) {
  //   console.log('not ok -', e.message, 'error event')
  //   setImmediate(start);
  // });
  var connection = ws.connect('ws://172.25.4.202:8080', function() {
    // When we connect to the server, send some catchy text
    connection.sendText("lights")
  });

  // When we get text back
  connection.on('text', function(text) {
    // print it out
    console.log("Echoed back from server:", text);
  });
});
