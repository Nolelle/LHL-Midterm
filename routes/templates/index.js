/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");
const router = express.Router();

module.exports = (makeRequest) => {
  //GET /
  router.get("/", (req, res) => {
    const templateVars = {
      cookie: req.cookies.email,
    };
    console.log(templateVars);
    res.render("index", templateVars);
  });
  return router;
};
