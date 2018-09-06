import { Order, testOrder } from '../models/orderModel';

const orderManager = new Order({ 0: testOrder }, 0);

const ordersController = (req, res) => res.status(200).json(orderManager.getOrders());

const getOrderController = (req, res) => {
  const { orderId } = req.params;
  const requestedOrder = orderManager.getOrder(orderId);
  if (requestedOrder) {
    return res.status(200).json(requestedOrder);
  }
  return res.status(400).json({ error: `no order with order id ${orderId}` });
};

const newOrderController = (req, res) => {
  const { customerName, customerAddress, foodOrdered } = req.body;
  if (customerName && customerAddress && foodOrdered) {
    return res.status(201).json(orderManager.newOrder(customerName, customerAddress, foodOrdered));
  }
  return res.status(400).json({ error: 'invalid parameters' });
};

const updateStatusController = (req, res) => {
  const { completed, orderStatus } = req.body;
  const { orderId } = req.params;
  let success;

  if (orderStatus === 'accepted' || orderStatus === 'rejected') {
    success = orderManager.updateOrderStatus(orderId, orderStatus);
    if (!success) {
      return res.status(400).json({ error: 'update orderStatus request not completed' });
    }
  }

  if (completed === true) {
    success = orderManager.completeOrder(orderId);
    if (!success) {
      return res.status(400).json({ error: 'completeOrder request not completed' });
    }
  }

  if (success) {
    const hostname = req.headers.host;
    return res.status(201).json({ uri: `http://${hostname}/api/v1/order/${orderId}` });
  }
  return res.status(400).json({ error: 'invalid request parameter' });
};

export default {
  ordersController,
  getOrderController,
  newOrderController,
  updateStatusController,

};
