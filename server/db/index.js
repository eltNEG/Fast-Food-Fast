import { Pool } from 'pg';

let useSSL; let
  conStr;
if (process.env.NODE_ENV === 'development') {
  useSSL = false;
  conStr = process.env.DATABASE_URL_DEV;
} else if (process.env.NODE_ENV === 'localtest') {
  useSSL = false;
  conStr = process.env.DATABASE_URL_TEST;
} else {
  useSSL = true;
  conStr = process.env.DATABASE_URL;
}
console.log(useSSL);
console.log(conStr);
const pool = new Pool({
  connectionString: conStr,
  ssl: useSSL,
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
