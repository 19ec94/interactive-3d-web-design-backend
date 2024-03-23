/*
 * Import module dependencies
 */

const express = require("express");
const router = express.Router();
const userControllerIndex = require('../controllers/user.controller.index');
const userMiddlewareIndex = require("../middlewares/user.middleware.index");

/*
 * Router logic for user signup
 */

router.post("/signup",
  userMiddlewareIndex.isSignupDataValid,
  userMiddlewareIndex.isNewUser,
  userMiddlewareIndex.addNewUserToDatabase,
  userMiddlewareIndex.generateSessionToken,
  userControllerIndex.sendSessionToken,
);

/*
 * Router logic for user login
 */

router.post("/login", 
  userMiddlewareIndex.isLoginDataValid,
  userMiddlewareIndex.isExistingUser,
  userMiddlewareIndex.verifyPassword,
  userMiddlewareIndex.generateSessionToken,
  userControllerIndex.sendSessionToken,
);

/*
 * Router logic for user account deletion 
 */

router.delete("/:username", 
  userControllerIndex.deleteUserById
);

/*
 * Router logic for protected branch
 */

router.get( "/protected",
  userMiddlewareIndex.authenticateSessionToken,
  (req, res)=>{ res.json({message: "Authentication succcessful"})}
);
module.exports = router;

router.get("/score/:username",
  // userMiddlewareIndex.authenticateSessionToken,
  userControllerIndex.getUserScore);

router.post("/score",
  // userMiddlewareIndex.authenticateSessionToken,
  userControllerIndex.upsertResult);

router.get("/scoreboard",
  userControllerIndex.getAllScores
);
