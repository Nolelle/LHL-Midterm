/*
 * All routes for api/favourites are defined here
 */

const express = require("express");
const router = express.Router();

const queryGetFavListingsByUserID = function (db, userID) {
  let query = `SELECT favourites.id AS favourites_id, listing_id, listings.*
  FROM favourites
  JOIN listings ON favourites.listing_id = listings.id
  WHERE favourites.user_id = $1`;
  return db.query(query, [userID]).then((response) => {
    return response.rows;
  });
};

const queryGetAllUserIDFavourites = function (db, userID) {
  let query = `
  SELECT *
  FROM favourites
  WHERE user_id = $1
 `;
  return db.query(query, [userID]).then((response) => {
    return response.rows;
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

  router.get("/users/:id", (req, res) => {
    queryGetAllUserIDFavourites(db, req.params.id)
      .then((userFavourites) => {
        res.json(userFavourites);
      })
      .catch((error) => {
        console.log(error);
        res.send(error);
      });
  });

  return router;
};
