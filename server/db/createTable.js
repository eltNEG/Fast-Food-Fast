// create table
import db from './index';

const createTables = async () => {
  const client = await db.getClient();

  client
    .query(
      `
CREATE TABLE IF NOT EXISTS Roles (
  roleId SERIAL PRIMARY KEY,
  role VARCHAR( 255 ) UNIQUE NOT NULL );

CREATE TABLE IF NOT EXISTS Users (
    userId SERIAL PRIMARY KEY ,
    username VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(255) REFERENCES Roles(role)
  );

CREATE TABLE IF NOT EXISTS Orders (
    orderId SERIAL PRIMARY KEY,
    customerName VARCHAR(255) NOT NULL,
    customerAddress VARCHAR(255) NOT NULL,
    foodOrdered VARCHAR(255) NOT NULL,
    dateOrdered DATE NOT NULL DEFAULT CURRENT_DATE,
    orderStatus VARCHAR(30) NOT NULL,
    fk_userId INT REFERENCES Users(userId) );

CREATE TABLE IF NOT EXISTS Foods (
    foodId SERIAL PRIMARY KEY,
    foodName VARCHAR(255) NOT NULL UNIQUE
    url VARCHAR (255)
);
`,
    )
    .then(() => console.log('Tables created'))
    .catch(console.log)
    .then(() => client.release());
};

createTables();
