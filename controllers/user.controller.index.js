/*
 * Import module dependencies.
 */
const bcrypt = require('bcrypt'); 
const userDB = require('../models/userModel');
const jwt = require('jsonwebtoken');
require('dotenv').config();

/*
 * Handle sign up logic.
 * Create a new user record and append it `userdb` database.
 */

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
    } else {
      res.status(400).json(
        { 
          "status": "error",
          "data": {},
          "error": {
            "code": 400,
            "message": "Username is already taken!" 
          }
        }
      );
    }
  } catch (err) {
    res.status(500).json(
      { 
        "status": "error",
        "data": {},
        "error": {
          "code": 500,
          "message": err.message
        }
      }
    );
  }
};

/*
 * Handle log in logic.
 * Issue a session token on successful login.
 */

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
    if (!existingUser) {
      res.status(404).json(
        {
          "status": "error",
          "data": {},
          "error": {
            "code": 404,
            "message": 'Username does not exist.'
          }
        }
      );
    } else {
      // Check if the password matches
      const isPasswordMatch  = await bcrypt.compare(
        login.userPassword, existingUser.userPassword
      );

      if (!isPasswordMatch) {
        res.status(400).json(
          {
            "status": "error",
            "data": {},
            "error": {
              "code": 400,
              "message": 'Incorrect password'
            }
          }
        );
      } else {
        const sessionTokenSecretKey = process.env.SESSION_TOKEN_SECRET_KEY;
        const sessionTokenDuration = process.env.SESSION_TOKEN_DURATION;

        const sessionToken = await jwt.sign(
          { userId: existingUser._id }, 
          sessionTokenSecretKey, 
          { expiresIn: sessionTokenDuration }
        );

        res.cookie('sessionToken', sessionToken, { httpOnly: true });

        res.status(201).json(
          {
            "status": "sucesss",
            "data": { 
              "userName": existingUser.userName,
              "userEmail": existingUser.userEmail,
              "token": sessionToken
            },
          }
        );

        console.log("User logged in sucessfully");
      }
    }
  } catch(err) {
    res.status(500).json(
      {
        "status": "error",
        "data": {},
        "error": {
          "code": 500,
          "message": err.message 
        }
      }
    );
  }
};

exports.deleteUserById = async (req, res) => {
  const userName = req.params.username; 
  const existingUser = await userDB.findOne({userName: userName});

  try {
    const deletedUser = await userDB.findByIdAndDelete(existingUser);

    if (!deletedUser) {
      res.status(400).json(
        {
          "status": "error",
          "data": {},
          "error": {
            "code": 400,
            "message": "Username does not exist!"
          }
        }
      );
    } else {
      res.status(204).json(
        {
          "status": "success",
          "data": {},
        }
      );
      console.log( { message: 'Deleted account successfully' });
    }
  } catch (err) {
    res.status(500).json(
      {
        "status": "error",
        "data": {},
        "error": {
          "code": 500,
          "message": err.message 
        }
      }
    );

    console.error('Error deleting user:', err.message);
  }
};
