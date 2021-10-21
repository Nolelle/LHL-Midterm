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

const updateListingById = (db, id, body) => {
  console.log("body",body)
  let query = `UPDATE listings  SET
  title = '${body.title}',
  price = '${body.price}',
  description = '${body.description}',
  condition = '${body.condition}',
  image_url = '${body.image_url}',
  categories = '${body.categories}'
  WHERE id = $1;`;

  console.log("myQuery:",query)
  return db.query(query, [id]).then((response) => {
    console.log("This is a update complete", response.rows);
    return response.rows;
  });
};
// UPDATE listings SET description = 'newDescriptpion', image_url = 'https://avatars.githubusercontent.com/u/38992135?v=4' ,price = 250, sold = FALSE, active = FALSE WHERE id = 7;
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
  router.get("/:id", (req, res) => {
    queryGetListingsById(db, req.params.id)
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
    updateListingById(db, req.params.id, req.body)
      .then((data) => {
        console.log("update complete:", data);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  return router;
};
