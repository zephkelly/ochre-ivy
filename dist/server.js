var express = require('express');

var app = express();
var PORT = 62264;

app.use(express.static('./'));

app.get('/', function (req, res) {
    res.sendFile('index.html');
});

app.listen(PORT, function () {
    console.log('Example app listening on port ' + PORT);
});
