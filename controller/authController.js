import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import db from '../db';

export const createUser = (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({
      success: false,
      message: 'incomplete parameters',
    });
  }
  const query = `
      INSERT INTO Users (username, password, role) VALUES($1, $2, $3) RETURNING userid;
      `;
  const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync());
  return db.getClient().then(client => client
    .query(query, [username, hashedPassword, 'user'])
    .then(dbRes => res.status(201).json({
      success: true,
      message: 'user succesfully created',
      userId: dbRes.rows[0].userid,
    }))
    .catch((err) => {
      console.log(err);
      res.status(400).json({
        success: false,
        message: 'username already exist',
      });
    })
    .then(client.release()));
};

export const getUser = async (username, client) => {
  const query = `
          SELECT *
          FROM Users
          WHERE username = $1
          LIMIT 1
      `;

  return client.query(query, [username]).then(res => res.rows[0]);
};
