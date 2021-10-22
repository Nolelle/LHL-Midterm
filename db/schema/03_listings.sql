-- CREATE the Listings table
CREATE TYPE categories_type AS ENUM ('Sports Goods','Vehicles','Electronics','Apparel','FREE','Toys & Games', 'Music & Instruments',
'Home and Garden','Family','Office','Office Supplies');
CREATE TYPE condition_type AS ENUM ('N/A', 'Poor', 'Good/Fair', 'Excellent', 'Near Mint');
DROP TABLE IF EXISTS listings CASCADE;

CREATE TABLE listings (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id),
  title VARCHAR(255),
  image_url VARCHAR(255),
  condition condition_type,
  price decimal(12,2),
  description VARCHAR(500),
  categories categories_type,
  date_created DATE,
  date_modified DATE,
  sold BOOLEAN,
  active BOOLEAN
);

