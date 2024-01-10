const validator = require('validator');

exports.signupDataValidator = async (req, res, next) => {
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

  // Check password (using a simple check, you might want to use more complex validation)
  //if (!validator.isStrongPassword(password)) {
  //    return res.status(400).json({ error: 'Password must be strong' });
  //}

  // If validation passes, call the next middleware
  next();
};

exports.loginDataValidator = async (req, res, next) => {
  const username  = req.body.user_name;
  const email  = req.body.user_email;
  const password  = req.body.user_password;

  // Check username
  if (!validator.isLength(username, { min: 2 })) {
    return res.status(400).json({ error: 'Username must have at least 2 characters' });
  }

  // Check email
  if (!validator.isEmail(email)) {
    return res.status(400).json({ error: 'Invalid email address' });
  }

  // Check password (using a simple check, you might want to use more complex validation)
  //if (!validator.isStrongPassword(password)) {
  //    return res.status(400).json({ error: 'Password must be strong' });
  //}

  // If validation passes, call the next middleware
  next();
};
