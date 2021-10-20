// load .env data into process.env
require("dotenv").config();

// Web server config
const PORT = process.env.PORT || 8080;
const sassMiddleware = require("./lib/sass-middleware");
const express = require("express");
const app = express();
const morgan = require("morgan");
const makeRequest = require("request-promise-native");
const cookieParser = require("cookie-parser");

// PG database client/connection setup
const { Pool } = require("pg");
const dbParams = require("./lib/db.js");
const db = new Pool(dbParams);
db.connect();

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan("dev"));
app.use(cookieParser());
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.use(
  "/styles",
  sassMiddleware({
    source: __dirname + "/styles",
    destination: __dirname + "/public/styles",
    isSass: false, // false => scss, true => sass
  })
);

app.use(express.static("public"));

// require routes
const indexRoutes = require("./routes/templates/index");
const listingRoutes = require("./routes/templates/listings");
const createListingRoutes = require("./routes/templates/createListing");
const loginRoutes = require("./routes/templates/login");
const logoutRoutes = require("./routes/templates/logout");
const favouritesRoutes = require("./routes/templates/favourites");

const userAPIRoutes = require("./routes/resources/users");
const favouriteAPIRoutes = require("./routes/resources/favourites");
const commentAPIRoutes = require("./routes/resources/comments");
const listingAPIRoutes = require("./routes/resources/listings");
const loginAPIRoutes = require("./routes/resources/login");
// use Routes
// resource routes
app.use("/api/favourites", favouriteAPIRoutes(db));
app.use("/api/comments", commentAPIRoutes(db));
app.use("/api/listings", listingAPIRoutes(db));
app.use("/api/users", userAPIRoutes(db));
app.use("/api/login", loginAPIRoutes(db));

// template routes
app.use("/", indexRoutes(makeRequest));
app.use("/login", loginRoutes(makeRequest));
app.use("/logout", logoutRoutes());
app.use("/favourites", favouritesRoutes(makeRequest));
app.use("/createListing", createListingRoutes());
app.use("/listings", listingRoutes(makeRequest));

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
