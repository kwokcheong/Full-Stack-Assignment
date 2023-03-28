const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const db = require('./models');
require('dotenv').config();

//set up express, jsonParser is used to parse JSON data sent in the request body.
app.use(express.json());

//CORS middleware is used to configure your API to allow requests from other domains or to restrict access.
app.use(cors());

// UrlencodedParser is used to parse data coming from HTML form submissions
app.use(bodyParser.urlencoded({ extended: true }));

//Set up routers
const apiRouter = require('./routes/ApiRouter');
app.use('/api', apiRouter);

const PORT = process.env.PORT || 3001;

db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`server is running at ${PORT}`);
  });
});
