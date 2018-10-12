import express from 'express';


const fourOhFour = express.Router();

fourOhFour.route('*').all((req, res) => res.status(404).json({
  success: false,
  message: 'route not found',
}));

export default fourOhFour;
