/*
 * Import module dependencies
 */

const express = require("express");
const router = express.Router();
const userController = require('../controllers/userController');
const userMiddlewareIndex = require("../middlewares/user.middleware.index");

/*
 * Router for user signup
 */

router.post('/signup',
  userMiddlewareIndex.isSignupDataValid,
  userController.createUser
);

/*
 * Router for user login
 */

router.post('/login', 
  userMiddlewareIndex.isLoginDataValid,
  userController.loginUser
);

/*
 * Router for user account deletion 
 */

router.delete('/:username', 
  userController.deleteUserById
);

module.exports = router;
