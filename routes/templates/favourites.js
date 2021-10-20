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
        const firstTripletOrderedListings = orderedListings.slice(0, 3);
        const secondTripletOrderedListings = orderedListings.slice(3, 6);
        const templateVars = {
          orderedListings,
          firstTripletOrderedListings,
          secondTripletOrderedListings,
          emailCookie: req.cookies.email,
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
        let start = 6;
        let end = 9;
        const orderedListings = JSON.parse(favouriteListings);
        const firstTripletOrderedListings = orderedListings.slice(start, end);
        const secondTripletOrderedListings = orderedListings.slice(
          end,
          end + 3
        );
        const templateVars = {
          orderedListings,
          firstTripletOrderedListings,
          secondTripletOrderedListings,
          emailCookie: req.cookies.email,
        };
        res.render("favourites", templateVars);
      })
      .catch((error) => {
        console.log(error);
      });
  });
  return router;
};
