app = require('express.io')()
app.http().io()

// openshift check
var server_port = process.env.OPENSHIFT_NODEJS_PORT || 8080
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1'



// Setup the ready route, and emit talk event.
app.io.route('ready', function(req) {
    req.io.emit('talk', {
        message: 'io event from an io route on the server'
    })
})

// Setup the ready route, and emit talk event.
app.io.route('lights', function(req) {
    req.io.emit('talk', {
        message: 'get ready to blink lights'
    })
})
// Setup the ready route, and emit talk event.
app.io.route('servos', function(req) {
    req.io.emit('talk', {
        message: 'get ready to spin servos'
    })
})

// Send the client html.
app.get('/', function(req, res) {
    res.sendfile(__dirname + '/index.html')
})

// app.listen(8080)
app.listen(server_port, server_ip_address, function () {
  console.log( "Listening on " + server_ip_address + ", server_port " + server_port )
});
