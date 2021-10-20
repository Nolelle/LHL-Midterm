/*
 * All template routes for localhost:8080:/login are defined here
 */
const express = require("express");
const router = express.Router();

module.exports = () => {
  //GET login
  router.get("/", (req, res) => {
    res.render("login");
  });

  router.post("/", (req, res) => {
    const inputEmail = req.body.email;
    const inputPassword = req.body.password;
    res.cookie("email", inputEmail);
    res.redirect("/");
  });
  return router;
};
