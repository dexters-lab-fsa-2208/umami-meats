const db = require("./db");
const { Sequelize } = db;

const LineItem = db.define("lineItem", {
  productId: {
    type: Sequelize.INTEGER,
  },
  qty: {
    type: Sequelize.INTEGER,
    defaultValue: 1,
  },
  orderId: {
    type: Sequelize.INTEGER,
  },
});

module.exports = LineItem;
