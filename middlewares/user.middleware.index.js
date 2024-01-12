/*
 * Collect user validation related middleware functions
 */

const isSignupDataValid = require("./isSignupDataValid.middleware");
const isLoginDataValid = require("./isLoginDataValid.middleware");
const isExistingUser = require("./isExistingUser.middleware");
const verifyPassword = require("./verifyPassword.middleware");
const generateSessionToken = require("./generateSessionToken.middleware");
const authenticateSessionToken =require("./authenticateSessionToken.middleware");
const isNewUser = require("./isNewUser.middleware");
const addNewUserToDatabase = require("./addNewUserToDatabase.middleware");

module.exports = {
  isSignupDataValid,
  isLoginDataValid,
  isExistingUser,
  verifyPassword,
  generateSessionToken,
  authenticateSessionToken,
  isNewUser,
  addNewUserToDatabase,
};

