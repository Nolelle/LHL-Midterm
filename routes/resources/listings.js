const express = require("express");
const router = express.Router();

// ***********************************QUERIES **************************************
const queryGetListingsById = function (db, id) {
  let query = `SELECT * FROM listings where id = $1 ORDER BY date_created DESC;`;
  return db.query(query, [id]).then((response) => {
    return response.rows[0];
  });
};

const queryGetListingsBySearchParams = function (db, searchParams) {
  return queryGetAllListingsDataOrderByDate(db)
    .then((listings) => {
      let result = JSON.parse(JSON.stringify(listings))
      // title
      if (searchParams.title) {
        result = result.filter(listing => listing.title.toLowerCase().search(searchParams.title.toLowerCase()) !== -1)
      }
      // minimum
      if (parseFloat(searchParams.minimum_price)) {

        let floatMin = parseFloat(searchParams.minimum_price)
        result = result.filter(listing => listing.price >= floatMin)
        console.log("floatMin:", result)
      }
      // maximum
      if (parseFloat(searchParams.maximum_price)) {
        let floatMax = parseFloat(searchParams.maximum_price)
        result = result.filter(listing => listing.price <= floatMax)
        console.log("floatMax:", result)
      }
      // condition
      if (searchParams.condition) {
        result = result.filter(listing => listing.condition.toLowerCase().search(searchParams.condition.toLowerCase()) !== -1)

      }
      return result
    })
};

const queryGetAllListingsDataOrderByDate = function (db) {
  let query = `SELECT * FROM listings ORDER BY date_created DESC;`;
  return db.query(query).then((response) => {
    return response.rows;
  });
};

// const queryGetNextSixListingsDataOrderByDate = function (db) {
//   let query = `SELECT * FROM listings ORDER BY date_created DESC OFFSET 6 FETCH NEXT 6 ROWS ONLY`;
//   return db.query(query).then((response) => {
//     return response.rows;
//   });
// };

const updateListingById = (db, id, newFields) => {
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
  // GET api/listings/
  router.get("/", (req, res) => {
    queryGetAllListingsDataOrderByDate(db)
      .then((listings) => {
        res.json(listings);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  router.get("/search", (req, res) => {
    queryGetListingsBySearchParams(db, req.query)
      .then((listings) => {
        res.json(listings);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });
  router.get("/page", (req, res) => {
    queryGetAllListingsDataOrderByDate(db, req.query)
      .then((listings) => {
        res.json(listings);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  // GET /api/listing/:id render a page with just that posting, will show comments (if any) for that posting
  router.get("/", (req, res) => {
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
