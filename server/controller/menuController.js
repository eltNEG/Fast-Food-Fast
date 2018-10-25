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
  const { menu, imgUrl } = req.body;

  if (!menu || !imgUrl) {
    return res.status(422).json({
      success: true,
      message: 'Incomplete input parameter',
    });
  }
  // query
  // change food to menu
  const query = `
            INSERT INTO Foods (foodName, url) VALUES ($1, $2) RETURNING *;
        `;
  return db.getClient().then(client => client
    .query(query, [menu, imgUrl])
    .then(dbRes => res.status(201).json({
      success: true,
      message: 'new menu added successfully',
      data: {
        menu: dbRes.rows,
      },
    })).catch((err) => {
      console.log(err);
      res.status(400).json({
        success: false,
        message: 'db error - add menu item not successful',
      });
    })
    .then(() => client.release()));
};

const updateMenu = (req, res) => {
  let query; let
    param;
  const { foodId } = req.params;
  const { menu, imgUrl } = req.body;

  // query
  /** change orderState to orderStatus */
  if (menu) {
    query = `
    UPDATE Foods 
    SET foodName = $2
    WHERE foodId = $1 RETURNING *;
      `;
    param = menu;
  } if (imgUrl) {
    query = `
    UPDATE Foods 
    SET url = $2
    WHERE foodId = $1 RETURNING *;
      `;
    param = imgUrl;
  }


  // query the database and handle response
  return db.getClient().then((client) => {
    client.query(query, [foodId, param]).then(dbRes => res.status(200).json({
      success: true,
      message: 'Menu succesfully updated',
      data: {
        menu: dbRes.rows,
      },
    })).then(client.release());
  });
};

const deleteMenu = (req, res) => {
  const { foodId } = req.params;

  const query = `
    DELETE FROM Foods
    WHERE foodId = $1;
  `;
  return db.getClient().then((client) => {
    client.query(query, [foodId]).then(() => res.status(200).json({
      success: true,
      message: 'Menu succesfully deleted',
    })).then(client.release());
  });
};

export default {
  getMenu,
  postMenu,
  updateMenu,
  deleteMenu,
};
