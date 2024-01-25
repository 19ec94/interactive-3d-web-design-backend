/*
 * Import module dependencies.
 */

const sendSessionToken = require("./sendSessionToken.controller");
const deleteUserById = require("./deleteAccount.controller");

module.exports = {
  sendSessionToken,
  deleteUserById,
}
