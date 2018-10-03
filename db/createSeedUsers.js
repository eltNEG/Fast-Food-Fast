import db from "./index";

const seedRoles = async role => {
  const client = await db.getClient();
  const query = `
  INSERT INTO Roles (role) VALUES($1) RETURNING roleId;
    `;
  client
    .query(query, [role])
    .then(() => console.log("role created"))
    .catch(console.log)
    .then(() => client.release());
};

const seedUser = async (username, hashedPassword, role) => {
  const client = await db.getClient();
  const query = `
    INSERT INTO Users (username, password, role) VALUES($1, $2, $3) RETURNING userid;
    `;
  client
    .query(query, [username, hashedPassword, role])
    .then(() => console.log("user created"))
    .catch(console.log)
    .then(() => client.release());
};

seedRoles('admin')
seedRoles('user')
seedUser(
  "admin1",
  "$2b$10$pfwHPrvsP9vP5F1zIEE8dOKVKhF9l0hllrKQRHh7RBzQ6mgVwPYNC",
  "admin"
);
seedUser(
  "testuser",
  "$2b$10$3m6OLNEsFsBEiFlg1f8dCOIerpV7gAullBVRhq8ylHjvThX6F/fXm",
  "user"
);
