const db = require("./db");
const { Sequelize } = db;

const Product = db.define("product", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  price: {
    type: Sequelize.DECIMAL,
    allowNull: false,
  },
  grade: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  qty: {
    type: Sequelize.INTEGER,
    defaultValue: 1,
  },
  img: {
    type: Sequelize.STRING,
  },
  desc: {
    type: Sequelize.TEXT,
  },
  tagId: {
    type: Sequelize.INTEGER,
  },
});

module.exports = Product;
