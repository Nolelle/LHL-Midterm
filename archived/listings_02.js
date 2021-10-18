/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");
const router = express.Router();

const handleDbResponse = (queryPromise, res) =>
  queryPromise
    .then((data) => data.rows)
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err.message });
    });

const updateListingById = (db, res, id, fields) => {
  let query = `UPDATE listings SET
  description = ${fields.description},
  image_url = ${fields.image_url},
  price = ${fields.price},
  sold = ${fieLds.sold},
  active = ${fields.active}
  WHERE id = ${id}`;
  return handleDbResponse(db.query(query), res);
};

const deleteListingById = (db, res, id, fields) => {
  let query = `DELETE FROM listings WHERE id = ${id}`;
  return handleDbResponse(db.query(query), res);
};

module.exports = (db) => {
  // GET /listings/new (render a form which would allow users to enter information about there product they are selling (ex. price, condition, images, etc))
  // router.get("/new", (req, res) => {
  //   res.render("listings/new");
  // });

  // // GET /listing/:listingsID render a page with just that posting, will show comments (if any) for that posting
  // router.get("/:listingId", (req, res) => {
  //   queryListingById(db, res, req.params.listingId).then((data) => {
  //     console.log(data);
  //     res.render("listings/show", { listing: data[0] });
  //   });
  // });

  //GET /listings/:listingid/edit (edit the one listing -- needs to add user verification)
  router.get("/:listingId/edit", (req, res) => {
    console.log("req.params", req.params);
    queryListingById(db, res, req.params.listingId).then((data) => {
      console.log(data);
      res.render("listings/edit", { listing: data[0] });
    });
  });

  //POST /listings/
  router.post("/:listingId/edit", (req, res) => {
    console.log(req.body);
    updateListingById(db, res, req.params.listingId, req.body).then((data) => {
      console.log(data);
      res.redirect("/listings/" + req.params.listingId);
    });
  });

  router.post("/:listingId/delete", (req, res) => {
    deleteListingById(db, res, req.params.listingId).then((data) => {
      console.log(data);
      res.render("listings/delete", { listing: data[0] });
    });
  });

  // POST /listings (post new created posting to posting table, and then redirect to /)

  // POST /listing/:listingid/comments (a button to create create a new comment, in the comments section under a listing)

  return router;
};
