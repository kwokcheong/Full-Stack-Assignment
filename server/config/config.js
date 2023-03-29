require('dotenv').config('../.env');

module.exports = {
  username: process.env.DB_USER,
  password: process.env.DB_USER,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  dialect: 'mysql',
};
