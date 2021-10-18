/*
 * All routes for listings are defined here
 */

const queryGetListingById = function (db, id) {
  let query = `SELECT * FROM listings where id = $1;`
  return db.query(query, [id]).then((response) => {
    return response.rows[0]
  })
}


const express = require("express");
const router = express.Router();

module.exports = (db) => {
  // home
  router.get("/", (req, res) => {
    let query = `SELECT * FROM listings`;
    console.log(query);
    db.query(query)
      .then((data) => {
        const listings = data.rows;
        res.json({ listings });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  // GET /api/listing/:id render a page with just that posting, will show comments (if any) for that posting
  router.get("/:id", (req, res) => {
    queryGetListingById(db, req.params.id)
      .then((listing) => {
        res.send(listing)
      });
  });



  return router;
};









// ** IGNORE** //
// //GET /listings/:listingid/edit (edit the one listing -- needs to add user verification)
// router.get("/:id/edit", (req, res) => {
//   console.log("req.params", req.params);
//   queryGetListingById(db, req.params.id)
//   .then((listing) => {
//     res.send(listing)
//   });
// });
