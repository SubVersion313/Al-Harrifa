USE El_Harrifa;

-- Test 1: Verify Categories
SELECT 'Test 1: Categories' as Test;
SELECT COUNT(*) as CategoryCount FROM Categories;
SELECT * FROM Categories LIMIT 3;

-- Test 2: Verify Users
SELECT 'Test 2: Users' as Test;
SELECT COUNT(*) as UserCount FROM Users;
SELECT nameuser, email, is_admin FROM Users;

-- Test 3: Verify Products
SELECT 'Test 3: Products' as Test;
SELECT COUNT(*) as ProductCount FROM Products;
SELECT p.name, p.price, c.name as Category 
FROM Products p 
JOIN Categories c ON p.category = c.name 
LIMIT 3;

-- Test 4: Verify Reviews
SELECT 'Test 4: Reviews' as Test;
SELECT COUNT(*) as ReviewCount FROM Reviews;
SELECT r.rating, r.comment, u.nameuser, p.name as ProductName
FROM Reviews r
JOIN Users u ON r.user_id = u.id
JOIN Products p ON r.product_id = p.id;

-- Test 5: Verify Relationships
SELECT 'Test 5: Relationships' as Test;
SELECT 
    (SELECT COUNT(*) FROM Products WHERE seller_id IN (SELECT id FROM Users)) as ProductsWithValidSellers,
    (SELECT COUNT(*) FROM Reviews WHERE user_id IN (SELECT id FROM Users)) as ReviewsWithValidUsers,
    (SELECT COUNT(*) FROM Reviews WHERE product_id IN (SELECT id FROM Products)) as ReviewsWithValidProducts;

-- Test 6: Data Integrity
SELECT 'Test 6: Data Integrity' as Test;
SELECT 
    (SELECT COUNT(*) FROM Products WHERE price < 0) as InvalidPrices,
    (SELECT COUNT(*) FROM Reviews WHERE rating < 1 OR rating > 5) as InvalidRatings,
    (SELECT COUNT(*) FROM Users WHERE email NOT LIKE '%@%.%') as InvalidEmails; 