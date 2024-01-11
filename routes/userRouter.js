/*
 * Import module dependencies
 */

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const userValidator = require('../middlewares/userValidator');

/*
 * Router for user signup
 */

router.post('/signup',
  userValidator.signupDataValidator,
  userController.createUser
);

/*
 * Router for user login
 */

router.post('/login', 
  userValidator.loginDataValidator,
  userController.loginUser
);

/*
 * Router for user account deletion 
 */

router.delete('/:username', 
  userController.deleteUserById
);

module.exports = router;
