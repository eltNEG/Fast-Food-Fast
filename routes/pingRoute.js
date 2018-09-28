import express from 'express';

const pingRoute = express.Router();

const pingController = (req, res) => res.status(200).json({
    success: true,
    message: 'pong'
});

pingRoute.route('/ping').get(pingController);

export default pingRoute;
