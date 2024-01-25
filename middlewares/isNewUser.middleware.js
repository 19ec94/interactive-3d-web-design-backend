const userDB = require("../models/userModel");

const isNewUser = async (req, res, next) => {
  // find if the username already exisits in the database
  try { 
    const existingUser = await userDB.findOne({userName: req.body.user_name});
    if (existingUser) {
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
    } else {
      next();
    }
  } catch(err) {
    const customMessage = "Error finding the user in the database."
    const errorMessage = `${customMessage} ${err.message}`; 
    throw new Error(errorMessage);
  }
};

module.exports = isNewUser;
