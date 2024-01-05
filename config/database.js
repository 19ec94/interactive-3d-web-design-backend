const mongoose = require('mongoose');

const connectToDatabase = async () => {
  try{
    const MONGODB_URL='mongodb://admin:admin()@localhost:27017/admin'
    await mongoose.connect(MONGODB_URL);
    const db = mongoose.connection
    db.on('error', console.error.bind(console, 'MongoDB connection error:'));
    db.once('open', () => { 
      console.log('Connected to database sucessfully'); }
    );
  } catch (err) {
    console.error('Error connecting to database', err.message);
    //process.exit(1);
  }
  //
};

module.exports = connectToDatabase;
