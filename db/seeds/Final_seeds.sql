-- Users table seeds here (Example)
INSERT INTO users (name,email,password,phone_number)
VALUES ('Michael Dock', 'md@boyer.tv','JBIDRh70tGevYzYzQgFId2u','778-866-4000');
INSERT INTO users (name,email,password,phone_number)
VALUES ('Kelly Mcdonalds', 'kmc@live.tv','JBIDRh70tGevYzYzQgFId2u','778-866-5000');

-- Favourites table seeds here (Example)
INSERT INTO favourites (user_id,liked) VALUES (1,TRUE);
INSERT INTO favourites (user_id,liked) VALUES (2,TRUE);

-- Listing table seeds here
INSERT INTO listings (user_id,favourite_id,image_url,condition,price,description,date_created,date_modified,sold,active)
VALUES (1,1,'https://ibb.co/VCx1ZWF','new', '200','description','2021-10-16','2021-10-16',FALSE, TRUE);
INSERT INTO listings (user_id,favourite_id,image_url,condition,price,description,date_created,date_modified,sold,active)
VALUES (2,1,'https://ibb.co/VCx1ZWF','new', '200','description','2021-10-16','2021-10-16',FALSE,TRUE);

-- Comments table seeds here (Example)
INSERT INTO comments (user_id,listing_id,msg_text,date_created) VALUES (1,1,'Hello I want buy it!','2021-10-16');
INSERT INTO comments (user_id,listing_id,msg_text,date_created) VALUES (1,1,'Okay!','2021-10-16');

-- FK Favourites table seeds
UPDATE favourites
SET listing_id = 1 WHERE user_id IN (1,2);

-- FK listing table seeds
UPDATE listings
SET comment_id = 1
WHERE user_id = 1;

UPDATE listings
SET comment_id = 2
WHERE user_id =2;
