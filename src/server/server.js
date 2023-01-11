var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var authRoutes = require('./routes/authRoutes');
var blogRoutes = require('./routes/blogRoutes');
var app = express();
var PORT = 62264;
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('./'));
//Database
mongoose.connect('mongodb://localhost:27017/ochreIvy', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(function () {
    //Only make connection after database connection is established
    app.listen(PORT, function () { console.log('Listening on port ' + PORT); });
})["catch"](function (err) { return console.log(err); });
//Routes
app.get('/', function (req, res) {
    res.sendFile('index.html');
});
app.use(authRoutes);
app.use(blogRoutes);
