import pingRoute from './pingRoute';
import orderRoute from './orderRoute';
import authPing from './authPing';
import authRoute from './authRoute';
import menuRoute from './menuRoute';

const apiVersion = '/api/v1';

const routes = (app) => {
  app.use(apiVersion, pingRoute);
  app.use(apiVersion, orderRoute);
  app.use(apiVersion, authPing);
  app.use(apiVersion, authRoute);
};

export default routes;
