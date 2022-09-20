const db = require('./db');
const { Sequelize } = db;

const Tag = db.define('tag', {
    tagName:{
        type: Sequelize.STRING,
        unique: true
    }
})

module.exports=Tag