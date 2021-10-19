/*
 * All template routes for localhost:8080:/listings are defined here
 */
const express = require("express");
const comments = require("../resources/comments");
const router = express.Router();

module.exports = (makeRequest) => {
  router.get("/", (req, res) => {
    let templateVars = {
      cookie: req.cookies.email,
    };
    res.render("index", templateVars);
  });

  router.get("/new", (req, res) => {
    let templateVars = {
      cookie: req.cookies.email,
    };
    res.render("newListing", templateVars);
  });

  router.get("/:id", (req, res) => {
    let templateVars = {
      cookie: req.cookies.email,
    };
    // req dosent know serverhost (localhost) automatically, so its hard coded into this request
    // TODO: add server host and port to .env file
    makeRequest(
      `http://localhost:8080/api/comments?listingID=${req.params.id}`
    ).then((comments) => {
      templateVars["comments"] = JSON.parse(comments);
    });
    makeRequest(`http://localhost:8080/api/listings/${req.params.id}`)
      .then((listing) => {
        templateVars["listing"] = JSON.parse(listing);
        res.render("singleListing", templateVars);
      })
      .catch((error) => {
        console.log(error);
      })
      .catch((error) => {
        console.log(error);
      });
  });

  router.get("/:id/edit", (req, res) => {
    // change singleListing to edit listing page, and fill in template vars (getting from listing id) to fill out the form
    let templateVars = {
      cookie: req.cookies.email,
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
