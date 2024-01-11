/*
 * Collect user validation related middleware functions
 */

const isSignupDataValid = require("./isSignupDataValid.middleware");
const isLoginDataValid = require("./isLoginDataValid.middleware");

module.exports = {
  isSignupDataValid,
  isLoginDataValid,
};

