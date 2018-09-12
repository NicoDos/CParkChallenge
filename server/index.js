import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import configDB from './config/database-dev';
import { auth, report } from './routes';

const app = express();

mongoose.Promise = require('bluebird');

mongoose.connect(configDB.url);
app.use(bodyParser.json());
app.use('/', auth);
app.use('/', report);

app.listen(8080, () => {
  console.log('App listening on port 8080!');
});
