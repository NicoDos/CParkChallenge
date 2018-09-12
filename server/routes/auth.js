import { Router } from 'express';
import User from '../models/user';
import { createJWToken } from '../libs/auth';

const newUser = new User({ email: 'nico@cpark.com', password: 'super_secret' });
newUser.save();

const router = Router();

router.post('/login', (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error('User not found.'));
      }
      return user;
    })
    .then((user) => {
      if (user.password !== password) {
        return Promise.reject(new Error('Wrong password.'));
      }
      return user;
    })
    .then((user) => {
      res.status(200)
        .json({
          success: true,
          token: createJWToken({
            sessionData: user,
            maxAge: 3600,
          }),
        });
    })
    .catch((err) => {
      res.status(401)
        .json({
          message: err || "Validation failed. Given email and password aren't matching.",
        });
    });
});

export default router;
