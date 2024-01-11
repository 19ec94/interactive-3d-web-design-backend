/*
 * Import module dependencies.
 */

const validator = require('validator');

/*
 * Define logic for signup data validation
 */

const isSignupDataValid = async (req, res, next) => {
  const username  = req.body.user_name;
  const email  = req.body.user_email;
  const password  = req.body.user_password;
  const passwordRepeat  = req.body.user_password_repeat;

  // Check username
  if (!validator.isLength(username, { min: 2 })) {
    return res.status(400).json({ error: 'Username must have at least 2 characters' });
  }

  // Check email
  if (!validator.isEmail(email)) {
    return res.status(400).json({ error: 'Invalid email address' });
  }

  //TODO:
  // Check password and repeated are same
  // Check if password is atlease two characters long 
  
  // If validation passes, call the next middleware
  next();
};

module.exports = isSignupDataValid ;
