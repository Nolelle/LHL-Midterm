/*
 * All template routes for localhost:8080:/ are defined here
 */

const express = require("express");
const router = express.Router();

module.exports = (makeRequest) => {
  //GET /
  router.get("/", (req, res) => {
    makeRequest(`http://localhost:8080/api/listings/page/0`)
      .then((data) => {
        const orderedListings = JSON.parse(data);
        // TODO: IMPLEMENT PAGE STATUS BY setting a page cookie
        const templateVars = {
          orderedListings,
          emailCookie: req.cookies.email,
          userID: req.cookies.userID,
          pageNumber: 0,
        };
        res.render("index", templateVars);
      })
      .catch((error) => {
        console.log(error);
      });
  });

  router.get("/search", (req, res) => {
    let templateVars = {
      emailCookie: req.cookies.email,
      userID: req.cookies.userID,
      pageNumber: 0,
    };
    makeRequest(
      `http://localhost:8080/api/listings/search?title=${req.query.title}&minimum_price=${req.query.minimum_price}&maximum_price=&${req.query.maximum_price}condition=${req.query.condition}`
    )
      .then((listings) => {
        console.log(listings);
        templateVars["orderedListings"] = JSON.parse(listings);
        res.render("index", templateVars);
      })
      .catch((error) => {
        console.log(error);
      });
  });
  router.get("/nextpage", (req, res) => {
    makeRequest(`http://localhost:8080/api/listings/page`)
      .then((listings) => {
        const orderedListings = JSON.parse(listings);
        const templateVars = {
          orderedListings,
          emailCookie: req.cookies.email,
          userID: req.cookies.userID,
        };
        res.render("index", templateVars);
      })
      .catch((error) => {
        console.log(error);
      });
  });

  //TODO!!!!
  router.get("/previouspage", (req, res) => {
    let templateVars = {
      emailCookie: req.cookies.email,
      userID: req.cookies.userID,
    };
    makeRequest()
      .then((listings) => {
        templateVars["orderedListings"] = JSON.parse(listings);
        res.render("index", templateVars);
      })
      .catch((error) => {
        console.log(error);
      });
  });

  return router;
};
