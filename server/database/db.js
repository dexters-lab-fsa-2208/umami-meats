const Sequelize = require("sequelize");

const config = {};

if (process.env.QUIET) {
  config.logging = false;
}

//you name this whatever your project is
const db = new Sequelize(
  process.env.DATABASE_URL || "postgres://localhost/acme_db",
  config
);

module.exports = db;
