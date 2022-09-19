const db = require('./db');
const { Sequelize } = db;

const Order = db.define('order',{
    userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    isCart:{
        type: Sequelize.BOOLEAN,
        defaultValue: true
    },
    address:{
        type: Sequelize.STRING,
        allowNull: false
    }
})

module.exports=Order;