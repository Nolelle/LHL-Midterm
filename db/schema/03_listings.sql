-- CREATE the Listings table

DROP TABLE IF EXISTS listings CASCADE;
CREATE TABLE listings (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id),
  favourite_id INTEGER REFERENCES favourites(id),
  image_url VARCHAR(255),
  condition VARCHAR(255),
  price INTEGER,
  description VARCHAR (500),
  date_created DATE,
  date_modified DATE,
  sold BOOLEAN,
  active BOOLEAN
);

