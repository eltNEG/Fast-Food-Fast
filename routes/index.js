import {pingRoute} from './pingRoute';
import {orderRoute} from './orderRoute';

const apiVersion = '/api/v1';

const routes = (app) => {
  app.use(apiVersion, pingRoute);
  app.use(apiVersion, orderRoute);
};

export default routes;
