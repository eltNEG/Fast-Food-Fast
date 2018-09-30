import { Order, testOrder } from '../models/orderModel';

const orderManager = new Order({ 0: testOrder }, 0);

const ordersController = (req, res) => res.status(200).json({
  success: true,
  message: 'list of all orders',
  orders: orderManager.getOrders(),
});

const getOrderController = (req, res) => {
  const { orderId } = req.params;
  const requestedOrder = orderManager.getOrder(orderId);
  if (requestedOrder) {
    return res.status(200).json({
      success: true,
      message: `details of order with id ${orderId}`,
      order: requestedOrder,
    });
  }
  return res.status(400).json({
    success: false,
    message: `no order with order id ${orderId}`,
  });
};

const newOrderController = (req, res) => {
  const { customerName, customerAddress, foodOrdered } = req.body;
  if (customerName && customerAddress && foodOrdered) {
    return res.status(201).json({
      success: true,
      message: 'new order successfully created',
      order: orderManager.newOrder(customerName, customerAddress, foodOrdered),
    });
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
    if (typeof order === 'string') {
      let statusCode;
      if (order === 'order not found') {
        statusCode = 404;
      } else {
        (
          statusCode = 400
        );
      }
      return res.status(statusCode).json({
        success: false,
        message: order,
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
      message: 'order update was successful',
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
