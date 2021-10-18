/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");
const router = express.Router();

const queryUsers = (db) => {
  let query = `SELECT * FROM users;`;
  return db.query(query).then((response) => {
    return response.rows;
  });
};

module.exports = (db) => {
  //GET api/users
  router.get("/", (req, res) => {
    queryUsers(db)
      .then((users) => {
        res.json(users);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });
  return router;
};
