import express from 'express';
import ordersController from '../controller/ordersController';
import jwtAuthenticator from '../customMiddleware/jwtAuthenticator';
import onlyAdmin from '../customMiddleware/onlyAdmin';
import validate from '../customMiddleware/validator';

const orderRoute = express.Router();

orderRoute
  .route('/orders')
  .get(jwtAuthenticator, onlyAdmin, ordersController.getOrders)
  .post(jwtAuthenticator, validate, ordersController.postOrders);

orderRoute
  .route('/orders/:orderId')
  .get(jwtAuthenticator, onlyAdmin, validate, ordersController.getSpecificOrder)
  .put(jwtAuthenticator, onlyAdmin, validate, ordersController.updateOrderStatus);

orderRoute
  .route('/users/:userId/orders')
  .get(jwtAuthenticator, validate, ordersController.getSpecificUserOrder);

export default orderRoute;
