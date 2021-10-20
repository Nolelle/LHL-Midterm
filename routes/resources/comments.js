/*
 * All routes for api/comments are defined here
 */

const express = require("express");
const router = express.Router();

// get all comments for listing
const queryGetCommentsByListingID = function (db, listingID) {
  let query = `SELECT * FROM comments WHERE listing_id = $1`;
  return db.query(query, [listingID]).then((response) => {
    return response.rows;
  });
};

const queryAddCommentToDB = function (db, commentParams) {
  let query = `INSERT INTO comments (user_id,listing_id,msg_text,date_created) VALUES ($1,$2,$3,$4)`;

  return db.query(query,[1, commentParams.listing_id, commentParams.msg_text, commentParams.date_created])
    .then((response) => {
      console.log("posted a comment", [1, commentParams.listing_id, commentParams.msg_text, commentParams.date_created])
      return "posted a comment successfully";
    });
};

module.exports = (db) => {
  router.get("/", (req, res) => {
    queryGetCommentsByListingID(db, req.query.listingID)
      .then((commentRows) => {
        res.json(commentRows);
      })
      .catch((error) => {
        console.log(error);
        res.send(error);
      });
  });
  router.post("/", (req, res) => {
    queryAddCommentToDB(db, req.query)
      .then((comments) => {
        res.json(comments)
      })
  });
  return router;
};
