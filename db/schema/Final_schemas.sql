-- RUN THIS file
-- Grant privliges to database user
ALTER USER labber WITH SUPERUSER;

-- CREATE table users
DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  phone_number VARCHAR (255) NOT NULL
);

--CREATE favourites table
DROP TABLE IF EXISTS favourites CASCADE;
CREATE TABLE favourites (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id),
  liked BOOLEAN
  );


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

DROP TABLE IF EXISTS comments CASCADE;
CREATE TABLE comments (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id),
  listing_id INTEGER REFERENCES listings(id),
  msg_text VARCHAR(255),
  date_created DATE
  );


ALTER TABLE favourites
ADD listing_id INTEGER REFERENCES listings(id);

ALTER TABLE listings
ADD comment_id INTEGER REFERENCES comments(id);




