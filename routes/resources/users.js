/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");
const router = express.Router();

const queryCheckInputEmailForUserID = function (db, email) {
  let query = `SELECT * FROM users WHERE users.email = $1`;
  return db.query(query, [email]).then((response) => {
    return response.rows[0];
  });
};

const queryUsers = (db) => {
  let query = `SELECT * FROM users;`;
  return db.query(query).then((response) => {
    return response.rows;
  });
};

module.exports = (db) => {
  router.get("/", (req, res) => {
    queryUsers(db)
      .then((users) => {
        res.json(users);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });
  router.post("/login", (req, res) => {
    queryCheckInputEmailForUserID(db, req.body.email)
      .then((userID) => {
        res.cookie("userID", userID.id);
        res.cookie("email", userID.email);
        res.redirect("/");
      })
      .catch((error) => {
        console.log(error);
        res.send(error);
      });
  });
  return router;
};
