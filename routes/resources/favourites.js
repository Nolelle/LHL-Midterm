/*
 * All routes for api/favourites are defined here
 */

const express = require("express");
const router = express.Router();

const queryGetFavsByUserID = function (db, userID) {
  let query = `SELECT * FROM favourites WHERE user_id = $1`;
  return db.query(query, [userID]).then((response) => {
    return response.fields;
  });
};

module.exports = (db) => {
  router.get("/", (req, res) => {
    queryGetFavsByUserID(db, req.query.userID)
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
