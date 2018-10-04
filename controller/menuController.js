import db from '../db';

const getMenu = (req, res) => {
  // query
  // change food to menu
  const query = `
        SELECT * FROM Foods
    `;
  return db.getClient().then(client => client
    .query(query)
    .then(dbRes => res.status(200).json({
      success: true,
      message: 'menu list',
      orders: dbRes.rows,
    }))
    .then(() => client.release()));
};

const postMenu = (req, res) => {
  // get params
  const { menu } = req.body;

  // query
  // change food to menu
  const query = `
            INSERT INTO Foods (foodName) VALUES ($1) RETURNING *;
        `;
  return db.getClient().then(client => client
    .query(query, [menu])
    .then(dbRes => res.status(200).json({
      success: true,
      message: 'new menu added successfully',
      orders: dbRes.rows,
    }))
    .then(() => client.release()));
};

export default {
  getMenu,
  postMenu,
};
