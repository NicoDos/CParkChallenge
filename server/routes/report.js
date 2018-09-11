const express = require('express');
const reports = require('../data/reports.json');

const router = express.Router();

module.exports = (app) => {
  router.get('/report/:lat/:long', (req, res) => {
    res.status(200).send(reports);
  });

  router.post('/report', (req, res) => {
    const data = req.body || {};
    const success = { msg: `Successfully added ${JSON.stringify(data)}` };

    res.status(200).json(success);
  });

  app.use('/', router);
};
