import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import { configDbDev, configDbProd } from './config/database';
import { auth, report } from './routes';

const configDb = process.env.NODE_ENV === 'production' ? configDbProd : configDbDev;

const app = express();

mongoose.Promise = require('bluebird');

mongoose.connect(configDb.url);
app.use(bodyParser.json());
app.use('/', auth);
app.use('/', report);

app.listen(8080, () => {
  console.log('App listening on port 8080!');
});
