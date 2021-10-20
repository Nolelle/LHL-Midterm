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
  return db.query(query, [1]).then((response) => {
    return response.rows;
  });
};

module.exports = (db) => {
  //GET /api/favourites
  router.get("/", (req, res) => {
    queryGetFavListingsByUserID(db, req.query.userID)
      .then((favouriteRows) => {
        res.json(favouriteRows);
      })
      .catch((error) => {
        console.log(error);
        res.send(error);
      });
  });
  return router;
};
