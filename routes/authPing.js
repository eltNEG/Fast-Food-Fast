import express from 'express';
import jwt from 'jsonwebtoken';
import jwtAuthenticator from '../customMiddleware/jwtAuthenticator';

const authPingRoute = express.Router();

authPingRoute.route('/auth/ping').get((req, res) => {
  const token = jwt.sign({ a: 'pong' }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });
  return res.status(200).json({
    success: true,
    message: 'pong',
    token,
  });
});

authPingRoute
  .route('/auth/ping')
  .post(jwtAuthenticator, (req, res) => {
    const { decoded } = req;
    return res.status(200).json({
      success: true,
      message: decoded.a,
    });
  });

export default authPingRoute;
