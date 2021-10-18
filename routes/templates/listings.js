/*
 * All routes for listings are defined here
 */

const express = require("express");
const comments = require("../resources/comments");
const router = express.Router();

module.exports = (makeRequest) => {
  router.get("/", (req, res) => {
    res.render("index");
  });
  router.get("/:id", (req, res) => {
    let templateVars = {}
    // req dosent know serverhost (localhost) automatically, so its hard coded into this request
    // TODO: add server host and port to .env file
    makeRequest(`http://localhost:8080/api/comments?listingID=${req.params.id}`)
      .then((data) => {
        templateVars["comments"] = JSON.parse(data)
        res.render("singleListing",templateVars);
      })
      .catch(error => {
        console.log(error)
      })
  });
  return router;
};
