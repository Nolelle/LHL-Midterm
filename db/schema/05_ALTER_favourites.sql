
ALTER TABLE favourites
ADD listing_id INTEGER REFERENCES listings(id);
