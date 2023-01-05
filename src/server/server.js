var express = require('express');
var app = express();
var PORT = 62264;
//Static files
app.use(express.static('./'));
//Middleware
//Routes
app.get('/', function (req, res) {
    res.sendFile('index.html');
});
app.get('/blog', function (req, res) {
    res.sendFile('blog.html');
});
app.listen(PORT, function () {
    console.log('App listening on port ' + PORT);
});
