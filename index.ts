const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.sendFile('index.html', { root: __dirname });
});

app.listen(62264, () => {
  console.log('Example app listening on port 62264!');
});