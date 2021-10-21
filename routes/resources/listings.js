const express = require("express");
const router = express.Router();

// ***********************************QUERIES **************************************
const queryGetListingsById = function (db, id) {
  let query = `SELECT * FROM listings where id = $1 ORDER BY date_created DESC;`;
  return db.query(query, [id]).then((response) => {
    return response.rows[0];
  });
};


const queryGetAllListingsDataOrderByDate = function (db) {
  let query = `SELECT * FROM listings ORDER BY date_created DESC;`;
  return db.query(query).then((response) => {
    return response.rows;
  });
};


const updateListingById = (db, id, body) => {
  let query = `UPDATE listings  SET
  title = $1,
  price = $2,
  description = $3,
  condition = $4,
  image_url = $5,
  categories = $6
  WHERE id = $7;`;
  return db.query(query, [body.title, body.price, body.description, body.condition, body.image_url, body.categories, id]).then((response) => {
    return response.rows;
  });
};


const addNewListing = (db, body, userIDcookie) => {
  let query = `INSERT INTO listings (user_id,title,image_url,condition,price,description,categories,date_created,sold,active)
  VALUES ($1,$2,$3,$4,$5,$6,$7,to_timestamp($8),$9,$10)`

  return db.query(query, [userIDcookie,
    body.title,
    body.image_url,
    body.condition,
    body.price,
    body.description,
    body.categories,
    Date.now(),
    false,
    true])
    .then((response) => {
      return response.rows;
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
      }
      // maximum
      if (parseFloat(searchParams.maximum_price)) {
        let floatMax = parseFloat(searchParams.maximum_price)
        result = result.filter(listing => listing.price <= floatMax)
      }
      // condition
      if (searchParams.condition) {
        result = result.filter(listing => listing.condition.toLowerCase().search(searchParams.condition.toLowerCase()) !== -1)
      }
      return result
    })
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
      .then(() => {
        res.redirect(`/listings/${req.params.id}`)
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });
  router.post("/new", (req, res) => {
    console.log("req is :", req.body);
    addNewListing(db, req.body, req.cookies.userID)
      .then((data) => {
        res.redirect("/")
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });


  return router;
};
