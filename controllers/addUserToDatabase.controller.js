const userDB = require("../models/userModel");
const sendSessionToken = require("./sendSessionToken.controller");


const addUserToDatabase = async (req, res) => {
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
      await sendSessionToken(req, res);
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

module.exports = addUserToDatabase;
