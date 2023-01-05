const express = require('express');

const app = express();
const PORT = 62264;

//Static files
app.use(express.static('./'));

//Middleware

//Routes
app.get('/', (req, res) => {
  res.sendFile('index.html');
});

app.get('/blog', (req, res) => {
  res.sendFile('blog.html');
});

app.listen(PORT, () => {
  console.log('App listening on port ' + PORT);
});