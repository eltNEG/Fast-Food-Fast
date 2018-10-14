import express from 'express';


const baseRoute = express.Router();

baseRoute.route('/').all((req, res) => res.status(200).json({
  success: true,
  message: 'Welcome to Fast-Food-Fast',
}));

export default baseRoute;
