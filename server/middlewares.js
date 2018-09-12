import { verifyJWTToken } from './libs/auth';

const verifyJWTMW = (req, res, next) => {
  const token = (req.method === 'POST') ? req.body.token : req.query.token;

  verifyJWTToken(token)
    .then((decodedToken) => {
      req.user = decodedToken.data;
      next();
    })
    .catch((error) => {
      res.status(400)
        .json({ message: 'Invalid auth token provided.', error });
    });
};

export default verifyJWTMW;
