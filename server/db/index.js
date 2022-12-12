const db = require("./db");
// const { Sequelize } = db;
const User = require("./User");
const Product = require("./Product");
const Order = require("./Order");
const Tag = require("./Tag");
const LineItem = require("./LineItem");
// const { DataTypes } = require("sequelize");

User.hasMany(Order);
Product.hasMany(Tag);
LineItem.belongsTo(Product);
Order.belongsTo(User);
Order.hasMany(LineItem);

module.exports = {
  db,
  User,
  Product,
  Order,
  Tag,
  LineItem,
};
