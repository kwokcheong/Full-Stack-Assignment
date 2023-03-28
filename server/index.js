const express = require('express');
const mysql2 = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const db = require('./models');
require('dotenv').config();

// Set up express, jsonParser is used to parse JSON data sent in the request body.
app.use(express.json());

// CORS middleware is used to configure your API to allow requests from other domains or to restrict access.
app.use(cors());

// UrlencodedParser is used to parse data coming from HTML form submissions
app.use(bodyParser.urlencoded({ extended: true }));

// Set up DB open the connection to MySQL server
const connection = mysql2.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

// Create the database and close the connection
const createDatabase = async () => {
  await connection
    .promise()
    .query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`);
  console.log(`Database ${process.env.DB_NAME} created successfully`);
  connection.end();
};

// Set up routers
const apiRouter = require('./routes/ApiRouter');
app.use('/api', apiRouter);

const PORT = process.env.PORT || 3001;

createDatabase()
  .then(() => {
    db.sequelize.sync().then(() => {
      app.listen(PORT, () => {
        console.log(`Server is running at ${PORT}`);
      });
    });
  })
  .catch((error) => {
    console.error(`Error creating database: ${error.message}`);
  });
