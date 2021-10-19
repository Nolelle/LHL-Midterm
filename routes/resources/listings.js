const express = require("express");
const router = express.Router();
/*
 * All routes for listings are defined here
 */
// ***********************************QUERIES **************************************
const queryGetListingById = function (db, id) {
  let query = `SELECT * FROM listings where id = $1;`;
  return db.query(query, [id]).then((response) => {
    return response.rows[0];
  });
};
// returns array
const queryGetAllListingsData = function (db) {
  let query = `SELECT * FROM listings`;
  return db.query(query).then((response) => {
    return response.rows;
  });
};

const updateListingById = (db, id, newFields) => {
  console.log("Newfields OG : ", newFields);
  let query = `UPDATE listings SET
  description = ${newFields.description},
  image_url = ${newFields.image_url},
  price = ${newFields.price},
  sold = ${newFields.sold},
  active = ${newFields.active}
  WHERE id = ${id}`;
  return db.query(query).then((response) => {
    console.log("This is a update complete", response.rows);
    return response.rows;
  });
};

// ***********************************QUERIES **************************************
module.exports = (db) => {
  // home
  router.get("/", (req, res) => {
    queryGetAllListingsData(db)
      .then((data) => {
        res.json(listings);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  // GET /api/listing/:id render a page with just that posting, will show comments (if any) for that posting
  router.get("/:id", (req, res) => {
    queryGetListingById(db, req.params.id)
      .then((listing) => {
        res.json(listing);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });
  //POST /listings/id/edit
  router.post("/:id/edit", (req, res) => {
    console.log("req is :", req.body);
    updateListingById(db, req.params.id, req.body.newFields)
      .then((data) => {
        console.log("update complete:", data);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
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
