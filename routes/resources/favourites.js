/*
 * All routes for api/favourites are defined here
 */

const express = require("express");
const router = express.Router();

const queryGetFavListingsByUserID = function (db, userID) {
  let query = `SELECT favourites.id AS favourites_id, listing_id, listings.*
  FROM favourites
  JOIN listings ON favourites.listing_id = listings.id
  WHERE listings.user_id = $1`;
  return db.query(query, [userID]).then((response) => {
    return response.rows;
  });
};

const addFavouriteForListing = (db, userID, listingID) => {
  let query = `INSERT INTO favourites (user_id,listing_id) VALUES
  ($1,$2)
  `;
  return db.query(query, [userID, listingID]).then((response) => {
    return response;
  });
};

const deleteFavouriteForListing = (db, userID, listingID) => {
  let query = `DELETE FROM favourites
  WHERE user_id = $1 AND listing_id = $2`;
  return db.query(query, [userID, listingID]).then((response) => {
    return response;
  });
};

module.exports = (db) => {
  //GET /api/favourites/:id
  router.get("/:id", (req, res) => {
    queryGetFavListingsByUserID(db, req.params.id)
      .then((userFavouriteListings) => {
        res.json(userFavouriteListings);
      })
      .catch((error) => {
        console.log(error);
        res.send(error);
      });
  });

  router.post("/:id/addFavourite", (req, res) => {
    console.log("req is :", req.body);
    addFavouriteForListing(db, req.params.id, req.body.listingID)
      .then(() => {
        console.log(
          `Added listing id ${req.body.listingID} to favourites table for user ${req.params.id}.`
        );
        res.send(
          `Added listing id ${req.body.listingID} to favourites table for user ${req.params.id}.`
        );
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });
  router.post("/:id/removeFavourite", (req, res) => {
    console.log("req is :", req.body);
    deleteFavouriteForListing(db, req.params.id, req.body.listingID)
      .then(() => {
        console.log(
          `Removed listing id ${req.body.listingID} favourites table for user ${req.params.id}.`
        );
        res.send(
          `Removed listing id${req.body.listingID} favourites table for user ${req.params.id}.`
        );
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });
  return router;
};
