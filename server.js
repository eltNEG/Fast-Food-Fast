import express from 'express';
import config from './config';
import routes from './routes';

config();
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
routes(app);
const server = app.listen(port);

console.log(`Serving app on: http://localhost:${port}`);

export default server;
