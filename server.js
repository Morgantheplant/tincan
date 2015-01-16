var express = require('express');

var app = express('');
var http = require('http');
var port = process.env.PORT || 3005;

// app.use(express.basicAuth(function(user, pass, callback) {
//  var result = (user === 'moo' && pass === '123');
//  callback(null /* error */, result);
// }));

app.configure(function () {
    app.use(
        "/", 
        express.static(__dirname) 
    );
    // app.use('login', express.static(__dirname + '/pages/login'))
});


// app.get('/login', function(req, res) {
//   res.render('index');
// });


app.get('/', function(req, res) {
    res.render('index');
  });

app.listen(port);
