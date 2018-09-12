const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const configDB = require('./config/database-dev.js');

const app = express();

mongoose.connect(configDB.url);
app.use(bodyParser.json());

require('./routes')(app);

app.listen(8080, () => {
  console.log('App listening on port 8080!');
});
