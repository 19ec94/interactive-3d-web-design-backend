/*
 * Import module dependencies.
 */

const sendSessionToken = require("./sendSessionToken.controller");
const deleteUserById = require("./deleteAccount.controller");
const getUserScore = require("./readUserScore.controler");
const getAllScores = require("./readAllScores.controler");
const upsertResult = require("./upsertUserScore.controler");

module.exports = {
  sendSessionToken,
  deleteUserById,
  getUserScore,
  getAllScores,
  upsertResult,
}
