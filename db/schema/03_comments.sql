DROP TABLE IF EXISTS comments CASCADE;
CREATE TABLE comments (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id),
  listing_id INTEGER REFERENCES Listings(id),
  msg_text VARCHAR(255),
  date_created DATE,
  );
