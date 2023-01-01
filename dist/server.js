var express = require('express');
var app = express();
var PORT = 62264;
//Static files
app.use(express.static('./ochre-ivy/dist'));
//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//Routes
app.get('/', function (req, res) {
    res.sendFile('index.html');
});
app.get('/blog', function (req, res) {
    res.sendFile('blog.html');
});
app.listen(PORT, function () {
    console.log('Example app listening on port ' + PORT);
});
