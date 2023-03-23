const path = require('path');
const express = require('express');
const mysql = require("mysql2");
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app = express();
const db = require('./db')
require('dotenv').config()

//set up express
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}))
app.use(cookieParser());

//Set up routers
const teachersRouter = require('./routes/TeachersRouter');

// Frontend endpoint setup
app.use('/teachers', teachersRouter);

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
    console.log(`server is running at ${PORT}`);
})