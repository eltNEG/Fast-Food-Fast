import express from 'express';
import controller from '../controller'

export const orderRoute = express.Router();

orderRoute.route('/orders')
.get(controller.ordersController)
.post(controller.newOrderController)

orderRoute.route('/order/:orderId')
.get(controller.getOrderController)
.put(controller.updateStatusController)

