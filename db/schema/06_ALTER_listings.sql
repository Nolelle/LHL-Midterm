ALTER TABLE listings
ADD comment_id INTEGER REFERENCES comments(id);

