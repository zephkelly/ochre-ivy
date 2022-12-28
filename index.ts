const PORT = 62264;

const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.sendFile('index.html', { root: __dirname });
});

app.listen(PORT, () => {
  console.log('Example app listening on port ' + PORT);
});