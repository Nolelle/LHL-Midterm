/*
 * All template routes for localhost:8080:/listings are defined here
 */

const express = require("express");
const router = express.Router();

module.exports = (makeRequest) => {
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

  router.get("/new", (req, res) => {
    let templateVars = {
      emailCookie: req.cookies.email,
      userID: req.cookies.userID,
    };
    res.render("newListing", templateVars);
  });

  router.get("/:id", (req, res) => {
    let templateVars = {
      emailCookie: req.cookies.email,
      userID: req.cookies.userID,
    };
    // req dosent know serverhost (localhost) automatically, so its hard coded into this request
    // TODO: add server host and port to .env file
    makeRequest(`http://localhost:8080/api/comments?listingID=${req.params.id}`)
      .then((comments) => {
        templateVars["comments"] = JSON.parse(comments);
        makeRequest(`http://localhost:8080/api/listings/${req.params.id}`).then(
          (listing) => {
            templateVars["listing"] = JSON.parse(listing);
            makeRequest(
              `http://localhost:8080/api/favourites/users/${req.cookies.userID}`
            )
              .then((favourites) => {
                let parsedFavourites = JSON.parse(favourites);
                let isFavourite = false;
                for (let favourite of parsedFavourites) {
                  if (favourite.listing_id === parseInt(req.params.id)) {
                    isFavourite = true;
                  }
                }
                templateVars["isFavourite"] = isFavourite;
                res.render("singleListing", templateVars);
              })
              .catch((error) => {
                console.log(error);
              });
          }
        );
      })
      .catch((error) => {
        console.log(error);
      });
  });

  router.get("/:id/edit", (req, res) => {
    // change singleListing to edit listing page, and fill in template vars (getting from listing id) to fill out the form
    let templateVars = {
      emailCookie: req.cookies.email,
      userID: req.cookies.userID,
    };
    makeRequest(`http://localhost:8080/api/listings/${req.params.id}`)
      .then((listing) => {
        templateVars["listing"] = JSON.parse(listing);
        res.render("editListing", templateVars);
      })
      .catch((error) => {
        console.log(error);
      });
  });

  return router;
};
