const Sequelize = require("sequelize");
const pg = require("pg");

let db;

const config = {
  port: 5432,
  dialect: "postgres",
  dialectModule: pg,
  dialectOptions: {
    ssl: process.env.DB_NAME
      ? {
          require: true,
          rejectUnauthorized: false,
        }
      : false,
  },
  // logging: false,
};

if (process.env.DB_NAME) {
  config.database = process.env.DB_NAME;
  config.username = process.env.DB_USER;
  config.password = process.env.DB_PASS;
  config.host = process.env.DB_HOST;
  config.port = '6543';
  db = new Sequelize(config);
} else {
  db = new Sequelize("postgres://localhost/dexter", config);
}

module.exports = db;
