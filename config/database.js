const mongoose = require('mongoose');
require('dotenv').config();

const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_PORT = process.env.DB_PORT || 27017;
const DB_NAME = process.env.DB_NAME || 'interactive_3d_wed_design' ;
const DB_USER = process.env.DB_USER || '';
const DB_PASSWORD = process.env.DB_PASSWORD || '';

const DATABASE_URI=`mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`;
const connectToDatabase = async () => {
  try{
    await mongoose.connect(DATABASE_URI, {authSource: 'admin'});
    const db = mongoose.connection
    db.on('error', console.error.bind(console, 'MongoDB connection error:'));
    db.once('open', () => { 
      console.log('Connected to database sucessfully'); }
    );
  } catch (err) {
    console.error('Error connecting to database', err.message);
    process.exit(1);
  }
  //
};
module.exports = connectToDatabase;
