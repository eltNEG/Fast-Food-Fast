import pingRoute from './pingRoute';
import orderRoute from './orderRoute';
import authPing from './authPing';
import authRoute from './authRoute';
import menuRoute from './menuRoute';
import fourOhFour from './fourOhFour';
import baseRoute from './baseRoute';

const apiVersion = '/api/v1';

const routes = (app) => {
  app.use(baseRoute);
  app.use(apiVersion, pingRoute);
  app.use(apiVersion, orderRoute);
  app.use(apiVersion, authPing);
  app.use(apiVersion, menuRoute);
  app.use(apiVersion, authRoute);
  app.use(fourOhFour);
};

export default routes;
