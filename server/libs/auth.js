import jwt from 'jsonwebtoken';

const JWTSECRET = 'VAUamVy56s/Arg$';

export function verifyJWTToken(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, JWTSECRET, (err, decodedToken) => {
      if (err || !decodedToken) {
        return reject(err);
      }

      return resolve(decodedToken);
    });
  });
}

export function createJWToken(details = {}) {
  const token = jwt.sign({
    data: details.sessionData,
  }, JWTSECRET, {
    expiresIn: details.maxAge,
    algorithm: 'HS256',
  });

  return token;
}

export default {
  verifyJWTToken,
  createJWToken,
};
