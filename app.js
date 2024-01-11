/*
 * Import module dependencies.
 */

const express = require('express');
const path = require('path');
const cors = require('cors');
require('dotenv').config();

/*
 * Import routes.
 */

const indexRouter = require("./routes/indexRouter");
const userRouter = require('./routes/userRouter');

/*
 * Import data to configure and connect to database. 
 */

const connectToDataBase = require('./config/database.js');
// configure and connect to database
connectToDataBase();

// Start application
const app = express();

// Set view engine
app.set('view-engine', 'ejs');
app.set('views', path.join(__dirname, './views'));

/*
 * Setup middlewares globally.
 */

app.use(express.json())
app.use(express.urlencoded({extended: false}));
app.use(cors())


/*
 * Setup routes.
 */

app.use("/", indexRouter);
app.use('/user', userRouter);

module.exports = app;
