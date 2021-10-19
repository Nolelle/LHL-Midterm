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
    makeRequest(`http://localhost:8080/api/listings`)
      .then((data) => {
        const orderedListings = JSON.parse(data);
        const templateVars = {
          orderedListings,
          cookie: req.cookies.email,
        };
        console.log(templateVars.orderedListings[0].price);
        res.render("index", templateVars);
      })
      .catch((error) => {
        console.log(error);
      });
  });
  return router;
};
