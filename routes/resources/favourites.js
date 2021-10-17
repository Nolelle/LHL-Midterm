/*
 * All routes for favourites are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /favourites
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");
const router = express.Router();


const queryGetFavsByUserID = function (db, userID) {
  let query = `SELECT * FROM favourites WHERE user_id = $1`
  return db.query(query, [userID]).then((response) => {
    return response.rows
  })
}

module.exports = (db) => {
  router.get("/", (req, res) => {
    queryGetFavsByUserID(db, req.query.userID)
      .then((favouriteRows) => {
        res.status(200)
        res.send(favouriteRows)

      })
      .catch((error) => {
        console.log(error)
        res.send(error)
      })
  });
  return router;
};
