// Import dependency modules
const path = require('path');
const express = require('express');
const userRoutes = require('./app/routes/userRoutes');
const connectToDataBase = require('./config/database.js');
const cors = require('cors');
require('dotenv').config()

//
// Start application
const app = express();
// Configure parsing using json
app.use(express.json())
app.use(express.urlencoded({extended: false}));
//
app.use(cors())
//
connectToDataBase();
//
// Start server
const PORT = process.env.PORT || 5000; 
app.listen(PORT, ()=> console.log(`Server running on ${PORT}`));
//
// Set view engine
app.set('view-engine', 'ejs');
app.set('views',path.join(__dirname,'./views'));
// Configure route "/"
app.get('/', async (req, res)=> {
  // NOTE: demo using EJS template engine to render a page
  res.render('about.ejs', {
    serverName: "Test user",
    serverPurpose: "Interactive 3D Web design !"
  });
});

app.use('/', userRoutes);

