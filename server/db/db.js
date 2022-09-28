const Sequelize = require("sequelize");

const config = {};

if (process.env.QUIET) {
  config.logging = false;
}

// const db = new Sequelize({
//   database: "dav3ctroc2p7sm",
//   username: "oexgfvznbbkyxi",
//   password: "a9341c6af3af5f6f6b1af859a432d34ac5f595e508adbe197bb08155ce65423b",
//   host: "ec2-3-219-19-205.compute-1.amazonaws.com",
//   port: 5432,
//   dialect: "postgres",
//   dialectOptions: {
//     ssl: {
//       require: true, // This will help, but cause error
//       rejectUnauthorized: false // This will fix error
//     }
//   },
// });

const db = new Sequelize(
  process.env.DATABASE_URL || "postgres://localhost/dexter",
  {
    dialect: "postgres",
    dialectOptions: {
      ssl: process.env.DATABASE_URL ? true : false,
    },
    logging: false,
  }
);

module.exports = db;
