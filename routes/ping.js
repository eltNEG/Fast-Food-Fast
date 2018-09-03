import express from 'express';

const pingRoute = express.Router();

const pingController = (req, res) => res.send('pong');

pingRoute.route('/ping').get(pingController);

export default pingRoute;
