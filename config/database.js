const mongoose = require('mongoose');
require('dotenv').config();

const dbHost = process.env.DB_HOST || 'localhost';
const dbPort = process.env.DB_PORT || 27017;
const dbName = process.env.DB_NAME || 'interactive_3d_wed_design' ;
const dbUser = process.env.DB_USER || '';
const dbPassword = process.env.DB_PASSWORD || '';

const DATABASE_URI=`mongodb://${dbUser}:${dbPassword}@${dbHost}:${dbPort}/${dbName}`;
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
