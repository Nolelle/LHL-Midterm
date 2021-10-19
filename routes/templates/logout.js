/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");
const router = express.Router();

module.exports = () => {
  //POST logout
  router.post("/", (req, res) => {
    res.clearCookie("email");
    res.redirect("/");
  });
  return router;
};
