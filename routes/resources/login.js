/*
 * All routes for api/login are defined here
 */

const express = require("express");
const router = express.Router();

const queryCheckInputEmailForUserID = function (db, email) {
  let query = `SELECT * FROM users WHERE users.email = $1`;
  return db.query(query, [email]).then((response) => {
    return response.rows[0]
  });
};
const queryUsers = (db) => {
  let query = `SELECT * FROM users;`;
  return db.query(query).then((response) => {
    return response.rows;
  });
};


module.exports = (db) => {
  // GET /api/login
  router.post("/", (req, res) => {
    queryCheckInputEmailForUserID(db, req.body.email)
      .then((userID) => {
        res.cookie("userID", userID.id)
        res.cookie("email", userID.email)
        res.redirect("/")
      })
      .catch((error) => {
        console.log(error);
        res.send(error);
      });
  });
  return router;
};

