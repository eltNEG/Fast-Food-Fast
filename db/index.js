import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  // ssl: true,
});

export default {
  query: (text, params, callback) => pool.query(text, params, (err, res) => {
    if (callback) {
      return callback(err, res);
    }
    return res;
  }),
  getClient: async () => pool.connect(),
};
