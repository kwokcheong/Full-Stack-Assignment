const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app = express();
const db = require('./models');
require('dotenv').config();

//set up express
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

//Set up routers
const apiRouter = require('./routes/ApiRouter');

// Frontend endpoint setup
app.use('/api', apiRouter);

const PORT = process.env.PORT || 3001;

db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`server is running at ${PORT}`);
  });
});
