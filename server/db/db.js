const Sequelize = require("sequelize");
const pg = require("pg");

const db =
  process.env.NODE_ENV === "development"
    ? new Sequelize("postgres://localhost/dexter", {
        dialect: "postgres",
        logging: false,
      })
    : new Sequelize({
        database: "testdbfordeploy",
        username: "postgres",
        password: "password",
        host: "testdb.czw8tftookde.us-east-1.rds.amazonaws.com",
        port: 5432,
        dialect: "postgres",
        dialectModule: pg,
        dialectOptions: {
          ssl: {
            require: true,
            rejectUnauthorized: false,
          },
        },
      });

module.exports = db;
