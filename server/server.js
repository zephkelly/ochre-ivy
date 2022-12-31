var express = require('express');
var cookieParser = require('cookie-parser');
var app = express();
var PORT = 62264;
app.use(cookieParser());
app.use(express.static('../ochre-ivy/dist'));
app.get('/', function (req, res) {
    res.sendFile('index.html');
});
//Routes
app.get('/setuser', function (req, res) {
    res.cookie('user', 'John');
    res.send('User is set');
});
app.get('/getuser', function (req, res) {
    res.send(req.cookies);
});
app.listen(PORT, function () {
    console.log('Example app listening on port ' + PORT);
});
