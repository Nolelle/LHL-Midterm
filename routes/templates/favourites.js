/*
 * All template routes for localhost:8080:/favourites are defined here
 */

const express = require("express");
const router = express.Router();

module.exports = (makeRequest) => {
  router.get("/:id", (req, res) => {
    makeRequest(`http://localhost:8080/api/favourites/${req.params.id}`)
      .then((data) => {
        const orderedListings = JSON.parse(data);
        const templateVars = {
          orderedListings,
          emailCookie: req.cookies.email,
          userID: req.cookies.userID,
        };
        res.render("favourites", templateVars);
      })
      .catch((error) => {
        console.log(error);
      });
  });
  return router;
};
