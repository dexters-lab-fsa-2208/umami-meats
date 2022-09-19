const db = require("./db");
const { Sequelize } = db;
//jwt auth imported here

const User = db.define("user", {
  username: {
    type: Sequelize.STRING,
  },
  password: {
    type: Sequelize.STRING,
  },
  email: {
    type: Sequelize.STRING,
  },
  fName: {
    type: Sequelize.STRING,
  },
  lName: {
    type: Sequelize.STRING,
  },
});

//create authentication

User.prototype.getCart = async function () {};

User.prototype.addToCart = async function () {
  //    grab the order associated with the user
  //    orders are your cart
};

User.prototype.removeFromCart = async function () {};

//coverting order model from cart to actual placed order
User.prototype.createOrder = async function () {};

module.exports = User;
