var express = require('express');
var app = express();
app.get('/', function (req, res) {
    res.sendFile('index.html', { root: __dirname });
});
app.listen(62264, function () {
    console.log('Example app listening on port 3000!');
});
//# sourceMappingURL=index.js.map