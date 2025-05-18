USE El_Harrifa;
GO

-- Test 1: Verify Categories
PRINT 'Test 1: Categories';
SELECT COUNT(*) as CategoryCount FROM Categories;
SELECT TOP 3 * FROM Categories;
GO

-- Test 2: Verify Users
PRINT 'Test 2: Users';
SELECT COUNT(*) as UserCount FROM Users;
SELECT nameuser, email, is_admin FROM Users;
GO

-- Test 3: Verify Products
PRINT 'Test 3: Products';
SELECT COUNT(*) as ProductCount FROM Products;
SELECT TOP 3 p.name, p.price, c.name as Category 
FROM Products p 
JOIN Categories c ON p.category = c.name;
GO

-- Test 4: Verify Reviews
PRINT 'Test 4: Reviews';
SELECT COUNT(*) as ReviewCount FROM Reviews;
SELECT r.rating, r.comment, u.nameuser, p.name as ProductName
FROM Reviews r
JOIN Users u ON r.user_id = u.id
JOIN Products p ON r.product_id = p.id;
GO

-- Test 5: Verify Relationships
PRINT 'Test 5: Relationships';
SELECT 
    (SELECT COUNT(*) FROM Products WHERE seller_id IN (SELECT id FROM Users)) as ProductsWithValidSellers,
    (SELECT COUNT(*) FROM Reviews WHERE user_id IN (SELECT id FROM Users)) as ReviewsWithValidUsers,
    (SELECT COUNT(*) FROM Reviews WHERE product_id IN (SELECT id FROM Products)) as ReviewsWithValidProducts;
GO

-- Test 6: Data Integrity
PRINT 'Test 6: Data Integrity';
SELECT 
    (SELECT COUNT(*) FROM Products WHERE price < 0) as InvalidPrices,
    (SELECT COUNT(*) FROM Reviews WHERE rating < 1 OR rating > 5) as InvalidRatings,
    (SELECT COUNT(*) FROM Users WHERE email NOT LIKE '%@%.%') as InvalidEmails;
GO 