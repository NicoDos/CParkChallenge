import { Router } from 'express';
import Report from '../models/report';

Report.ensureIndexes();
Report.on('index', (error) => {
  if (error) {
    console.log(error);
  }
});

const router = Router();
const maxDistanceInMeters = 10000;

router.get('/report/:lat/:long', (req, res) => {
  const { lat, long } = req.params;

  Report
    .aggregate(
      [
        {
          $geoNear: {
            near: {
              type: 'Point',
              coordinates: [parseFloat(lat), parseFloat(long)],
            },
            maxDistance: maxDistanceInMeters,
            distanceField: 'distance',
            spherical: true,
          },
        },
        { $skip: 0 },
        {
          $sort: {
            time: -1,
          },
        },
      ], (error, reports) => {
        if (error) {
          return res.status(500).send(error);
        }

        return res.status(200).json(reports);
      },
    );
});

router.post('/report', (req, res) => {
  const { body } = req;
  const data = {
    title: body.title,
    time: new Date(),
    position: {
      type: 'Point',
      coordinates: [body.position[0], body.position[1]],
    },
  };
  const successMsg = { msg: `Successfully added ${JSON.stringify(data)}` };
  const newReport = new Report(data);

  newReport.save((error) => {
    if (error) {
      return res.status(500).send(error);
    }

    return res.status(200).json(successMsg);
  });
});

export default router;
