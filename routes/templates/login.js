/*
 * All template routes for localhost:8080:/login are defined here
 */
const express = require("express");
const router = express.Router();



module.exports = (makeRequest) => {
  router.get("/", (req, res) => {
    res.render("login")
  });

  // router.post("/", (req, res) => {
  //   makeRequest(`http://localhost:8080/api/login`)
  //     .then((users) => {
  //       res.cookie("id", object);
  //       res.redirect("/");
  //     })
  // });
  return router;
};

