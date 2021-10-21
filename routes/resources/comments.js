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

const addNewComment = function (db, listing_id, msg_text, userIDcookie) {
  let query = `INSERT INTO comments (user_id,listing_id,msg_text,date_created)
  VALUES ($1,$2,$3,to_timestamp($4)) returning *`;
  return db.query(query, [
    userIDcookie,
    listing_id,
    msg_text,
    Date.now() / 1000
  ])
    .then((response) => {
      return response.rows[0];
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
  router.post("/:id", (req, res) => {
    console.log("req.body : ", req.body)
    addNewComment(db, req.params.id, req.body.msg_text, req.cookies.userID)
      .then((comments) => {
        res.json(comments)
      })
      .catch((error) => {
        console.log(error);
        res.send(error);
      });
  });
  return router;
};
