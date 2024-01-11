const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const userValidator = require('../validators/userValidator');

router.post('/signup',
  userValidator.signupDataValidator,
  userController.createUser
);
router.post('/login', 
  userValidator.loginDataValidator,
  userController.loginUser
);
router.delete('/:username', 
  userController.deleteUserById
);

module.exports = router;
