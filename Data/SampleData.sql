USE El_Harrifa;

-- Insert sample categories
INSERT INTO Categories (name, description) VALUES
('Fiber Crafts', 'Handmade fiber art and crafts'),
('Handcrafted Toys', 'Unique handmade toys'),
('Paper Goods', 'Handmade paper products'),
('Accessories', 'Handmade accessories'),
('Art Collectibles', 'Unique art pieces'),
('Home Decor', 'Handmade home decoration items');

-- Insert sample admin user
INSERT INTO Users (nameuser, email, passworduser, is_admin, created_at) VALUES
('Admin User', 'admin@el-harrifa.com', '$2a$11$YourHashedPasswordHere', TRUE, NOW());

-- Insert sample regular user
INSERT INTO Users (nameuser, email, passworduser, address, created_at) VALUES
('Test User', 'test@example.com', '$2a$11$YourHashedPasswordHere', '123 Test Street', NOW());

-- Insert sample products
INSERT INTO Products (name, price, image_url, category, details, seller_id, created_at) VALUES
('Handmade Scarf', 29.99, 'products/scarf.jpg', 'Fiber Crafts', '{"color": "Blue", "material": "Wool"}', 1, NOW()),
('Wooden Toy Car', 19.99, 'products/toy-car.jpg', 'Handcrafted Toys', '{"age": "3+", "material": "Wood"}', 1, NOW()),
('Decorative Card', 4.99, 'products/card.jpg', 'Paper Goods', '{"occasion": "Birthday", "style": "Vintage"}', 1, NOW());

-- Insert sample review
INSERT INTO Reviews (user_id, product_id, rating, comment, created_at) VALUES
(2, 1, 5, 'Beautiful quality!', NOW()); 