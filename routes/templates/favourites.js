/*
 * All template routes for localhost:8080:/favourites are defined here
 */

const express = require("express");
const router = express.Router();

module.exports = (makeRequest) => {
  router.get("/", (req, res) => {
    makeRequest(`http://localhost:8080/api/listings`)
      .then((data) => {
        const orderedListings = JSON.parse(data);
        const templateVars = {
          orderedListings,
          emailCookie: req.cookies.email,
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
