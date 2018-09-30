import { Pool } from 'pg';

let useSSL;
if(process.env.NODE_ENV === 'development'){
  useSSL = false
} else {
  useSSL = true
}
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: useSSL
});

module.exports = {
  query: (text, params, callback) => pool.query(text, params, (err, res) => {
    if (callback) {
      return callback(err, res);
    }
    return res;
  }),
  getClient: async () => pool.connect(),
};
