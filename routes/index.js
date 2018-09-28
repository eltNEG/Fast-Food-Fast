import pingRoute from './pingRoute';
import orderRoute from './orderRoute';
import authPing from './authPing';
import authRoute from './authRoute'

const apiVersion = '/api/v1';

const routes = (app) => {
  app.use(apiVersion, pingRoute);
  app.use(apiVersion, orderRoute);
  app.use(apiVersion, authRoute);
  app.use(apiVersion, authPing);
};

export default routes;
