const userDB = require("../models/userModel");

const isExistingUser = async (req, res, next) => {
  try {
    // Check if the username exists in the database
    const existingUser = await userDB.findOne({userName: req.body.user_name});
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
      res.locals.existingUser = existingUser;
      next();
    }
  } catch (err) {
    const customMessage = "Error while finding the user in the database."
    const errorMessage = `${customMessage} ${err.message}`; 
    throw new Error(errorMessage);
  }
};

module.exports = isExistingUser;
