/*
 * All template routes for localhost:8080:/logout are defined here
 */

const express = require("express");
const router = express.Router();

module.exports = () => {
  router.post("/", (req, res) => {
    res.clearCookie("email");
    res.clearCookie("userID");
    res.redirect("/");
  });
  return router;
};
