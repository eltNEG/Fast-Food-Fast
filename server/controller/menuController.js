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
      data: {
        menu: dbRes.rows,
      },
    }))
    .then(() => client.release()));
};

const postMenu = (req, res) => {
  // get params
  const { menu } = req.body;

  if (!menu) {
    return res.status(422).json({
      success: true,
      message: 'Incomplete input parameter',
    });
  }
  // query
  // change food to menu
  const query = `
            INSERT INTO Foods (foodName) VALUES ($1) RETURNING *;
        `;
  return db.getClient().then(client => client
    .query(query, [menu])
    .then(dbRes => res.status(201).json({
      success: true,
      message: 'new menu added successfully',
      data: {
        menu: dbRes.rows,
      },
    })).catch(() => res.status(400).json({
      success: false,
      message: 'db error - add menu item not successful',
    }))
    .then(() => client.release()));
};

export default {
  getMenu,
  postMenu,
};
