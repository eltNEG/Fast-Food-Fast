const orderState = {
  undecided: 'undecided',
  accepted: 'accepted',
  rejected: 'rejected',
};

export const testOrder = {
  orderId: 0,
  customerName: 'test name',
  customerAddress: 'test address',
  foodOrdered: 'test-food',
  dateOrdered: (new Date()).toUTCString(),
  orderState: orderState.undecided,
  completed: false,
};

export class Order {
  constructor(baseOrders = {}, lastOrderId = 0) {
    this.orders = baseOrders;
    this.lastOrderId = lastOrderId;
  }

  getOrders() {
    return this.orders;
  }

  getOrder(orderId) {
    return this.orders[orderId];
  }

  createOrder(customerName, customerAddress, foodOrdered) {
    return {
      orderId: this.lastOrderId + 1,
      customerName,
      customerAddress,
      foodOrdered,
      dateOrdered: (new Date()).toUTCString(),
      orderState: orderState.undecided,
      completed: false,
    };
  }

  newOrder(customerName, customerAddress, foodOrdered) {
    const order = this.createOrder(customerName, customerAddress, foodOrdered);
    this.orders[order.orderId] = order;
    this.lastOrderId += 1;
    return order;
  }

  updateOrderStatus(orderId, orderStatus) {
    const order = this.getOrder(orderId);
    if (!order) {
      return false;
    }
    if (!order.completed) {
      order.orderState = orderStatus;
      return true;
    }
    return false;
  }

  completeOrder(orderId) {
    const order = this.getOrder(orderId);
    if (!order) {
      return false;
    }
    if (order.orderState !== orderState.undecided) {
      order.completed = true;
      return true;
    }
    return false;
  }
}
