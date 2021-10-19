/*
 * All template routes for localhost:8080:/logout are defined here
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
