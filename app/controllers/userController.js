const bcrypt = require('bcrypt'); 
const userDB = require('../models/userModel');

exports.createUser = async (req, res) => {
  try {
    // Create a new database entry
    const user = new userDB ({
      userName: req.body.user_name,
      userEmail: req.body.user_email,
      userPassword: req.body.user_password, 
    });
    // Check if the username already exists  
    const existingUser = await userDB.findOne({userName: user.userName});
    // findOne returns `null` if the username is not present in database. 
    // If it is `null`, create a new user,
    // else return the error message "username is already taken". 
    if (existingUser === null){
      // Parse and verify if the user provided "all" the required data.
      // Refer the schema for verification rule in models/signup.js.
      // Save the entry in the database.
      const newUser = await user.save();
      // Send response
      res.status(201).json(newUser);
      console.log(newUser);// debugging
    }
    else {
      // Send error status
      res.status(400).json({ 
        message: "Username already exists! Please choose a different username." 
      });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.loginUser = async (req, res)=> {
  try {
    // Get user login data
    const login = {
      userName: req.body.user_name,
      userPassword: req.body.user_password, 
    };
    // Check if the username exists in the database
    const existingUser = await userDB.findOne({userName: login.userName});
    // Return error message if it does not exist
    if (existingUser == null) {
      res.status(400).json({message: 'Username does not exist'});
    } else {
      // Check if the password matches
      const isPasswordMatch  = await bcrypt.compare(
        login.userPassword, existingUser.userPassword);
      if (!isPasswordMatch) {
        res.status(200).json({message: 'Incorrect password'});
        //TODO: Dashboard
      } else {
        res.send("login complete");
      }
    }
  } catch(err) {
    res.status(400).json({ 
      message: "Provide a valid username and password!" 
    });
  }
};

exports.deleteUserById = async (req, res) => {
  const userName = req.params.username; 
  const existingUser = await userDB.findOne({userName: userName});
  try {
    const deletedUser = await userDB.findByIdAndDelete(existingUser);
    if (!deletedUser) {
      return res.status(404).json({message: 'Username does not exist'});
    }
    res.status(200).json({message: 'Deleted account successfully'});
  } catch (err) {
    console.error('Error deleting user:', err.message);
    res.status(500).json({message: 'Internal Server Error'});
  }
};
