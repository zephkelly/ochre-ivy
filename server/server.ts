const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = 62264;

app.use(cookieParser());
app.use(express.static('../ochre-ivy/dist'));

app.get('/', (req, res) => {
  res.sendFile('index.html');
});
//Routes
app.get('/setuser', (req, res) => {
  res.cookie('user', 'John');
  res.send('User is set');
});

app.get('/getuser', (req, res) => {
  res.send(req.cookies);
});

app.listen(PORT, () => {
  console.log('Example app listening on port ' + PORT);
});