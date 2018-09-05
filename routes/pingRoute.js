import express from 'express';

export const pingRoute = express.Router();

const pingController = (req, res) => res.status(200).send('pong');

pingRoute.route('/ping').get(pingController);
