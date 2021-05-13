const dbConfig = require("../../database/config");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// console.log(db.sequelize.Sequelize)

db.clientes = require('./cliente')(sequelize, Sequelize);
db.articulos = require('./articulos')(sequelize, Sequelize);
db.cotizaciones = require('./cotizaciones')(sequelize, Sequelize);
db.detalles = require('./detalles')(sequelize, Sequelize);

module.exports = {
  db
};