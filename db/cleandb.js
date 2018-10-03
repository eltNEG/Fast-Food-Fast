import db from './index';

const createTables = async () => {
  const client = await db.getClient();

  client
    .query(
      `
        drop table if exists Orders;
        drop table if exists Foods;
        drop table if exists Users;
        drop table if exists Roles;    
        `,
    )
    .then(() => console.log('tables dropped'))
    .catch(console.log)
    .then(() => client.release());
};

createTables();
