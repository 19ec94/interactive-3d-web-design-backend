const userDB = require('../models/userModel');

const deleteUserById = async (req, res) => {
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

module.exports = deleteUserById;
