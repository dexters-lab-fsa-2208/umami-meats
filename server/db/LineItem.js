const db = require('./db');
const { Sequelize } = db;

const LineItem = db.define('lineItem',{
    orderId: {
        type: Sequelize.INTEGER,
    },
    productId:{
        type: Sequelize.INTEGER,
    },
    qty:{
        type: Sequelize.INTEGER,
        defaultValue: 1
    }
    
})

module.exports=LineItem;