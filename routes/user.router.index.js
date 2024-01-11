/*
 * Import module dependencies
 */

const express = require("express");
const router = express.Router();
const userControllerIndex = require('../controllers/user.controller.index');
const userMiddlewareIndex = require("../middlewares/user.middleware.index");

/*
 * Router for user signup
 */

router.post('/signup',
  userMiddlewareIndex.isSignupDataValid,
  userControllerIndex.addUserToDatabase,
);

/*
 * Router for user login
 */

router.post('/login', 
  userMiddlewareIndex.isLoginDataValid,
  userControllerIndex.sendSessionToken,
);

/*
 * Router for user account deletion 
 */

router.delete('/:username', 
  userControllerIndex.deleteUserById
);

module.exports = router;
