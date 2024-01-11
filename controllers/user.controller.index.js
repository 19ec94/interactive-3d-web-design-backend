/*
 * Import module dependencies.
 */

const addUserToDatabase = require("./addUserToDatabase.controller");
const sendSessionToken = require("./sendSessionToken.controller");
const deleteUserById = require("./deleteAccount.controller");


module.exports = {
  addUserToDatabase,
  sendSessionToken,
  deleteUserById,
}
