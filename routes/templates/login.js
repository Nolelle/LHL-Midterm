/*
 * All template routes for localhost:8080:/login are defined here
 */
const express = require("express");
const router = express.Router();

module.exports = () => {
  router.get("/", (req, res) => {
    res.render("login");
  });
  return router;
};
