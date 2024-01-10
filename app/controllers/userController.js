const bcrypt = require('bcrypt'); 
const userDB = require('../models/userModel');
const jwt = require('jsonwebtoken');

exports.createUser = async (req, res) => {
  try {
    // Create a new database entry
    const user = new userDB ({
      userName: req.body.user_name,
      userEmail: req.body.user_email,
      userPassword: req.body.user_password, 
    });
    const existingUser = await userDB.findOne({userName: user.userName});
    if (!existingUser){
      const newUser = await user.save();
      console.log("Created account successfully");// debugging
      await exports.loginUser(req, res);
    }
    else {
      // Send error status
      res.status(400).json({ 
        message: "Username already exists! Please choose a different username." 
      });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.loginUser = async (req, res, user)=> {
  try {
    // Get user login data
    const login = {
      userName: req.body.user_name,
      userPassword: req.body.user_password, 
    };
    // Check if the username exists in the database
    const existingUser = await userDB.findOne({userName: login.userName});
    // Return error message if it does not exist
    if (!existingUser) {
      res.status(400).json({message: 'Username does not exist'});
    } else {
      // Check if the password matches
      const isPasswordMatch  = await bcrypt.compare(
        login.userPassword, existingUser.userPassword);
      if (!isPasswordMatch) {
        res.status(200).json({message: 'Incorrect password'});
      } else {
        const secretKey = process.env.SECRETKEY || 'default_key';
        const token = jwt.sign(
          {userId: existingUser._id}, 
          secretKey, 
          {expiresIn:'1h'});
        // Send response
        res.status(201).json({token});
        console.log("User logged in sucessfully");
      }
    }
  } catch(err) {
    res.status(500).json({ message: err.message });
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
    console.log({message: 'Deleted account successfully'})
  } catch (err) {
    console.error('Error deleting user:', err.message);
    res.status(500).json({message: 'Internal Server Error'});
  }
};
