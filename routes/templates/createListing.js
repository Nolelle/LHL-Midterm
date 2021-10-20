/*
 * All template routes for localhost:8080:/createListing are defined here
 */

const express = require("express");
const router = express.Router();

module.exports = () => {
  router.get("/", (req, res) => {
    let templateVars = {
      emailCookie: req.cookies.email,
    };
    res.render("newListing", templateVars);
  });
  return router;
};
