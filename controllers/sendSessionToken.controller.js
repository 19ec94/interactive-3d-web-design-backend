const bcrypt = require('bcrypt'); 
const userDB = require("../models/userModel");
const jwt = require('jsonwebtoken');
require('dotenv').config();

const sendSessionToken = async (req, res)=> {
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

module.exports = sendSessionToken;
