/*
 * All template routes for localhost:8080:/listings are defined here
 */
const express = require("express");
const comments = require("../resources/comments");
const router = express.Router();

module.exports = (makeRequest) => {
  //We may use this route for our search button
  router.get("/", (req, res) => {
    makeRequest(`http://localhost:8080/api/listings`)
      .then((data) => {
        const orderedListings = JSON.parse(data);
        orderedListings.push({
          id: 3,
          user_id: 1,
          favourite_id: 1,
          image_url: "https://ibb.co/VCx1ZWF",
          condition: "good",
          price: 500,
          description: "description",
          date_created: "2021-10-16T00:00:00.000Z",
          date_modified: "2021-10-16T00:00:00.000Z",
          sold: false,
          active: true,
          comment_id: 1,
        });
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

  router.get("/new", (req, res) => {
    let templateVars = {
      emailCookie: req.cookies.email,
    };
    res.render("newListing", templateVars);
  });

  router.get("/:id", (req, res) => {
    console.log("Got here:")
    let templateVars = {
      emailCookie: req.cookies.email,
    };
    // req dosent know serverhost (localhost) automatically, so its hard coded into this request
    // TODO: add server host and port to .env file
    makeRequest(`http://localhost:8080/api/comments?listingID=${req.params.id}`)
      .then((comments) => {
        templateVars["comments"] = JSON.parse(comments);
        makeRequest(`http://localhost:8080/api/listings/${req.params.id}`)
          .then((listing) => {
            templateVars["listing"] = JSON.parse(listing);
            res.render("singleListing", templateVars);
          })
          // TODO REVIEW: CAN I DELETE THIS?
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });

  });

  router.get("/:id/edit", (req, res) => {
    // change singleListing to edit listing page, and fill in template vars (getting from listing id) to fill out the form
    let templateVars = {
      emailCookie: req.cookies.email,
    };
    makeRequest(`http://localhost:8080/api/listings/${req.params.id}`)
      .then((listing) => {
        templateVars["listing"] = JSON.parse(listing);
        console.log(templateVars);
        // TODO: Render editListing
        res.render("editListing", templateVars);
      })
      .catch((error) => {
        console.log(error);
      });
  });

  return router;
};
