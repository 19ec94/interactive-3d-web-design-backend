const bcrypt = require('bcrypt'); 
const userDB = require("../models/userModel");

const verifyPassword = async (req, res, next) => {
  try {
    const existingUser = await userDB.findOne({userName: req.body.user_name});

    const isPasswordMatched  = await bcrypt.compare(
      req.body.user_password, existingUser.userPassword
    );
    if (!isPasswordMatched) {
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
      next();
    }
  } catch (err) {
    const customMessage = "Error while verifying password."
    const errorMessage = `${customMessage} ${err.message}`; 
    throw new Error(errorMessage);
  }
};

module.exports = verifyPassword;
