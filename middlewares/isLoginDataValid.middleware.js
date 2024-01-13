/*
 * Import module dependencies.
 */

const validator = require('validator');
/*
 * Define logic for signup data validation
 */

const isLoginDataValid = async (req, res, next) => {
  const username  = req.body.user_name;
  const password  = req.body.user_password;

  // Check username
  if (!validator.isLength(username, { min: 2 })) {
    return res.status(400).json({ error: 'Username must have at least 2 characters' });
  }

  // Check password (using a simple check, you might want to use more complex validation)
  //if (!validator.isStrongPassword(password)) {
  //    return res.status(400).json({ error: 'Password must be strong' });
  //}

  // If validation passes, call the next middleware
  next();
};

module.exports =  isLoginDataValid ;
