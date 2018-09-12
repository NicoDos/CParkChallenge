import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import configDB from './config/database-dev';
import routes from './routes';

const app = express();

mongoose.Promise = require('bluebird');

mongoose.connect(configDB.url);
app.use(bodyParser.json());
app.use(routes);

app.listen(8080, () => {
  console.log('App listening on port 8080!');
});
