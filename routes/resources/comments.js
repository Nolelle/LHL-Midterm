/*
 * All routes for api/comments are defined here
 */

const express = require("express");
const router = express.Router();

// get all comments for listing
const queryGetCommentsByListingID = function (db, listingID) {
  let query = `SELECT * FROM comments WHERE listing_id = $1`
  return db.query(query, [listingID]).then((response) => {
    return response.rows
  })
}

module.exports = (db) => {
  router.get("/", (req, res) => {
    queryGetCommentsByListingID(db, req.query.listingID)
      .then((commentRows) => {
        res.status(200)
        res.send(commentRows)
      })
      .catch((error) => {
        console.log(error)
        res.send(error)
      })
  });
  return router;
};
