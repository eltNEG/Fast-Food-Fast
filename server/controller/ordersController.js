import db from '../db';

const getOrders = (req, res) => {
  // define the query
  const query = `
    SELECT * FROM Orders
    `;

  // query the database and handle response
  return db.getClient().then(client => client
    .query(query)
    .then(dbRes => res.status(200).json({
      success: true,
      message: 'list of all orders',
      data: {
        orders: dbRes.rows,
      },
    }))
    .then(() => client.release()));
};

const postOrders = (req, res) => {
  // get necessary parameters
  const { customerName, customerAddress, foodOrdered } = req.body;
  const { userid } = req.decoded;
  const orderStatus = 'new';

  if (!customerName || !customerAddress || !foodOrdered) {
    return res.status(400).json({
      success: false,
      error: 'incomplete parameters',
    });
  }

  // define the query
  const query = `
    INSERT INTO Orders (customerName, customerAddress, foodOrdered, orderStatus, fk_userId) 
    VALUES($1, $2, $3, $4, $5) RETURNING *;
    `;

  // query the database and handle response
  return db.getClient().then((client) => {
    client
      .query(query, [
        customerName,
        customerAddress,
        foodOrdered,
        orderStatus,
        userid,
        // completed,
      ])
      .then(dbRes => res.status(201).json({
        success: true,
        message: 'New order created',
        data: {
          order: dbRes.rows[0],
        },
      }))
      .catch(() => res.status(400).json({
        success: false,
        message: 'db error - create new order not successful',
      }))
      .then(client.release());
  });
};

const getSpecificUserOrder = (req, res) => {
  const { userId } = req.params;
  const { userid } = req.decoded;

  if (Number(userId) !== Number(userid)) {
    return res.status(401).json({
      success: false,
      message: 'cannot get the order of another user',
    });
  }
  const query = `
    SELECT * from Orders
    where fk_userid = $1
    `;

  // query the database and handle response
  return db.getClient().then((client) => {
    client.query(query, [userId]).then(dbRes => res.status(200).json({
      success: true,
      message: 'List of orders for the specified user',
      data: {
        orders: dbRes.rows,
      },
    })).then(client.release());
  });
};

const getSpecificOrder = (req, res) => {
  const { orderId } = req.params;

  // query
  const query = `
    SELECT * from Orders
    where OrderId = $1
    `;

  // query the database and handle response
  return db.getClient().then((client) => {
    client.query(query, [orderId]).then(dbRes => res.status(200).json({
      success: true,
      message: 'details of the requested order',
      data: {
        order: dbRes.rows[0] || [],
      },
    })).then(client.release());
  });
};

// New, Processing, Cancelled or Complete
const updateOrderStatus = (req, res) => {
  const { orderId } = req.params;
  const { orderStatus } = req.body;

  // check if order status
  if (!['new', 'processing', 'cancelled', 'complete'].includes(orderStatus.toLowerCase())) {
    return res.status(422).json({
      success: true,
      message: 'order status is not accepted',
    });
  }

  // query
  /** change orderState to orderStatus */
  const query = `
      UPDATE Orders 
      SET orderStatus = $2
      WHERE orderId = $1 RETURNING *;
        `;

  // query the database and handle response
  return db.getClient().then((client) => {
    client.query(query, [orderId, orderStatus]).then(dbRes => res.status(200).json({
      success: true,
      message: 'details of the updated order',
      data: {
        order: dbRes.rows,
      },
    })).then(client.release());
  });
};

export default {
  getOrders,
  postOrders,
  getSpecificUserOrder,
  getSpecificOrder,
  updateOrderStatus,
};
