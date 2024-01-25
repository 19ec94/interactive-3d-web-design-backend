const userDB = require("../models/userModel");

const addNewUserToDatabase = async (req, res, next) => {
  try {
    // Create a new database entry
    const user = new userDB ({
      userName: req.body.user_name,
      userEmail: req.body.user_email,
      userPassword: req.body.user_password, 
    });
    // Save the entry in database
    const newUser = await user.save();
    res.locals.existingUser = newUser;
    next();
  } catch(err) {
    const customMessage = "Error adding new user to the database."
    const errorMessage = `${customMessage} ${err.message}`; 
    throw new Error(errorMessage);
  }
};

module.exports = addNewUserToDatabase;
