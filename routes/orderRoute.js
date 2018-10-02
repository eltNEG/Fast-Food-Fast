import express from 'express';
import ordersController from '../controller/ordersController';
import jwtAuthenticator from '../customMiddleware/jwtAuthenticator';
import onlyAdmin from '../customMiddleware/onlyAdmin';

const orderRoute = express.Router();

orderRoute
  .route('/orders')
  .get(jwtAuthenticator, onlyAdmin, ordersController.getOrders)
  .post(jwtAuthenticator, ordersController.postOrders);

orderRoute
  .route('/order/:orderId')
  .get(jwtAuthenticator, onlyAdmin, ordersController.getSpecificOrder)
  .put(ordersController.updateOrderStatus);

orderRoute
  .route('/users/:userId/orders')
  .get(ordersController.getSpecificUserOrder);

export default orderRoute;
