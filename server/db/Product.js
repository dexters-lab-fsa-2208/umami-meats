const db = require('./db');
const Tag = require('./Tag');
const { Sequelize } = db;

const Product = db.define('product', {
    name:{
        type: Sequelize.STRING,
        allowNull: false
    },
    price:{
        type: Sequelize.DECIMAL,
        allowNull: false
    },
    grade: {
        type: Sequelize.STRING,
        allowNull: false
    },
    qty:{
        type: Sequelize.INTEGER,
        defaultValue: 1
    },
    img:{
        type: Sequelize.STRING,
    },
    desc:{
        type: Sequelize.TEXT,
    },
    type: {
        type: Sequelize.STRING
    },
    // tagId:{
    //     type: Sequelize.INTEGER,
    // },
    tagName:{
        type: Sequelize.STRING,
        references: {
        model: Tag,
        key: "tagName"
    }
    }
})

module.exports=Product;