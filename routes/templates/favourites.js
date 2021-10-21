/*
 * All template routes for localhost:8080:/favourites are defined here
 */

const express = require("express");
const router = express.Router();

module.exports = (makeRequest) => {
  //GET /favourites
  router.get("/", (req, res) => {
    makeRequest(`http://localhost:8080/api/favourites`)
      .then((data) => {
        const orderedListings = JSON.parse(data);
        const templateVars = {
          orderedListings,
          emailCookie: req.cookies.email,
          userID: req.cookies.userID

        };
        res.render("favourites", templateVars);
      })
      .catch((error) => {
        console.log(error);
      });
  });
  router.get("/nextpage", (req, res) => {
    makeRequest(`http://localhost:8080/api/favourites`)
      .then((favouriteListings) => {
        const orderedListings = JSON.parse(favouriteListings);
        const templateVars = {
          orderedListings,
          emailCookie: req.cookies.email,
          userID: req.cookies.userID
        };
        res.render("favourites", templateVars);
      })
      .catch((error) => {
        console.log(error);
      });
  });
  return router;
};
