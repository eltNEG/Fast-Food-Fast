import { Order, testOrder } from '../models/orderModel';

const orderManager = new Order({ 0: testOrder }, 0);

const ordersController = (req, res) => res.status(200).json(orderManager.getOrders());

const getOrderController = (req, res) => {
  const { orderId } = req.params;
  const requestedOrder = orderManager.getOrder(orderId);
  if (requestedOrder) {
    return res.status(200).json(requestedOrder);
  }
  return res.status(400).json({
    success: false,
    message: `no order with order id ${orderId}`,
  });
};

const newOrderController = (req, res) => {
  const { customerName, customerAddress, foodOrdered } = req.body;
  if (customerName && customerAddress && foodOrdered) {
    return res.status(201).json(orderManager.newOrder(customerName, customerAddress, foodOrdered));
  }
  return res.status(400).json({
    success: false,
    error: 'invalid parameters',
  });
};

const updateStatusController = (req, res) => {
  const { completed, orderStatus } = req.body;
  const { orderId } = req.params;
  let order;

  if (orderStatus === 'accepted' || orderStatus === 'rejected') {
    order = orderManager.updateOrderStatus(orderId, orderStatus);
    if (!order) {
      return res.status(400).json({
        success: false,
        message: 'update orderStatus request not completed',
      });
    }
  }

  if (completed === true) {
    order = orderManager.completeOrder(orderId);
    if (!order) {
      return res.status(400).json({
        success: false,
        message: 'completeOrder request not completed',
      });
    }
  }

  if (order) {
    return res.status(201).json({
      success: true,
      order,
    });
  }
  return res.status(400).json({
    success: false,
    message: 'invalid request parameter',
  });
};

export default {
  ordersController,
  getOrderController,
  newOrderController,
  updateStatusController,

};
