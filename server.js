var PORT = 62264;
var express = require('express');
var app = express();
app.use(express.static('./dist'));
app.get('/', function (req, res) {
    res.sendFile('index.html', { root: __dirname });
    console.log(__dirname);
});
app.listen(PORT, function () {
    console.log('Example app listening on port ' + PORT);
});
//# sourceMappingURL=server.js.map