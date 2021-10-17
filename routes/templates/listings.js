/*
 * All routes for listings are defined here
 * Since this file is loaded in server.js into,
 *   these routes are mounted onto /listings
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();

module.exports = () => {
  router.get("/", (req, res) => {
    res.render("index")
  });
  router.get("/:id", (req, res) => {
    res.render("singleListing")
  });
  return router;
};
