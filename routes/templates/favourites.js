/*
 * All template routes for favourites are defined here
 */

const express = require("express");
const router = express.Router();



module.exports = (db) => {
  router.get("/", (req, res) => {
    // TODO: filter out the listings that are not favourited
    
    res.render("index")
  });
  return router;
};
