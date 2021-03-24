DELETE FROM reviews;
DELETE FROM products;
DELETE FROM roasters;
DELETE FROM users;
DELETE FROM orders;
DELETE FROM order_items;
DELETE FROM locations;
DELETE FROM likes;
DELETE FROM images;

ALTER SEQUENCE users_id_seq RESTART WITH 4;
ALTER SEQUENCE roasters_id_seq RESTART WITH 3;
ALTER SEQUENCE reviews_id_seq RESTART WITH 7;
ALTER SEQUENCE products_id_seq RESTART WITH 5;
-- ALTER SEQUENCE orders_id_seq RESTART WITH 6;
-- ALTER SEQUENCE order_items_id_seq RESTART WITH 6;
-- ALTER SEQUENCE locations_id_seq RESTART WITH 6;
-- ALTER SEQUENCE likes_id_seq RESTART WITH 6;
-- ALTER SEQUENCE images_id_seq RESTART WITH 6;

INSERT INTO users (id, username, email, hashed_password, profile_image_url, bio, street_address, city, state, zipcode) VALUES
	(1, 'Demo', 'demo@aa.io','pbkdf2:sha256:150000$GtzjKro6$003744a0881a55478d18722781dffe9549a3fb5a10e248c4599c8a0c8c0df9b5', 'http://coffeeroasting.s3.amazonaws.com/426337', 'I Love Coffee, Tea, Match and donuts', '800 Main St.', 'troy', 'AL', 32333);

INSERT INTO users (id, username, email, hashed_password, bio) VALUES
    (2, 'demo2', 'demo2@aa.io', 'pbkdf2:sha256:150000$yq4TJIyR$c56fef0518261355713771a08bd6ef83187832c843b46801b99b5b83992b1f7f', 'I LOVE COFFEE'),
    (3, 'demo3', 'demo3@aa.io', 'pbkdf2:sha256:150000$Six1OmqQ$7cdc92926d57791befc9b29a9c3af0c44b03f4e68d320eff34b936023d9ec885', 'I LOVE COFFEE');

INSERT INTO roasters (id, name, user_id) VALUES
	(1, 'Counter Coffee', 1),
    (2, 'Coffee Counter', 2);
    
INSERT INTO products (id, name, roaster_id, price, description, sweetness, acidity, mouthfeel, flavour) VALUES
    (1, 'Afternoon Blend', 1, 10, 'Delicous morning coffee to perfectly pair with a donut!', 9, 5, 9, '{"Chocolate","Cherry","Lemon Zest"}'),
    (2, 'Best Blend',      1, 10, 'Delicous morning coffee to perfectly pair with a donut!', 9, 5, 9, '{"Chocolate","Cherry","Lemon Zest"}'),
    (3, 'Morning Blend',   1, 10, 'Delicous morning coffee to perfectly pair with a donut!', 9, 5, 9, '{"Chocolate","Cherry","Lemon Zest","Orange Peel"}'),
    (4, 'Donut Shop',      1, 10, 'Delicous morning coffee to perfectly pair with a donut!', 9, 5, 9, '{"Chocolate","Cherry","Lemon Zest"}');

INSERT INTO reviews (id, product_id, user_id, content, roast_rating) VALUES
    (1, 1, 3, 'Delicous morning coffee! It went really well with my office donuts!!!', 9),
    (2, 3, 3, 'Delicous morning coffee! It went really well with my office donuts!!!', 9),
    (3, 3, 2, 'Delicous morning coffee! It went really well with my office donuts!!!', 9),
    (4, 3, 2, 'Delicous morning coffee! It went really well with my office donuts!!!', 10),
    (5, 4, 2, 'Delicous morning coffee! It went really well with my office donuts!!!', 8),
    (6, 1, 3, 'Delicous morning coffee! It went really well with my office donuts!!!', 9);