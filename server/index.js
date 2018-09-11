const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

app.listen(8080, function () {
  console.log('App listening on port 8080!')
});