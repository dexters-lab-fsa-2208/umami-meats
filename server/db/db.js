const Sequelize = require('sequelize');

const config = {ssl: {
  rejectUnauthorized: false,
}};

if(process.env.QUIET){
  config.logging = false;
}

//you name this whatever your project is
const db = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/dexter', config);

module.exports = db;
