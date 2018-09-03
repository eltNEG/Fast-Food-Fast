import express from 'express';
import routes from './routes';

const app = express();
const port = process.env.PORT || 3000;

routes(app);
const server = app.listen(port);

console.log(`Serving app on: http://localhost:${port}`);

export default server;
