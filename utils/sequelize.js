const { Sequelize } = require('sequelize');
const { DB_TYPE,DB_HOST,DB_USER,DB_PASSWORD,DB_NAME } = process.env;
const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: DB_TYPE,
  logging: false
});

sequelize.authenticate().then( () => {
  console.log('Connection has been established successfully.');
  sequelize.sync({logging:console.log, force:true})
      .then(() => {
          console.log(`Database & tables created!`);
      }).catch((error)=>{
          return console.error(error);
      });

}).catch((error) => {
  console.error('Unable to connect to the database:', error);
})

module.exports =  sequelize