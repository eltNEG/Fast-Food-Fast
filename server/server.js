import express from 'express';
import loadConfig from './config';
import routes from './routes';
import { validateURI } from './customMiddleware/validator';


loadConfig();
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('UI'))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(validateURI);
routes(app);
const server = app.listen(port);

// console.log(`Serving app on: http://localhost:${port}`);

export default server;
