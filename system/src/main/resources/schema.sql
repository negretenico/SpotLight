CREATE TABLE Users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) UNIQUE NOT NULL,
    username VARCHAR(50) UNIQUE NOT NULL,
    password TEXT NOT NULL
);

CREATE TABLE BlacklistToken (
    id INT PRIMARY KEY AUTO_INCREMENT,
    token TEXT UNIQUE NOT NULL,
    expirationTime DATETIME
);

CREATE TABLE Followers (
    id INT PRIMARY KEY AUTO_INCREMENT,
    follower_id INT,
    following_id INT,
    FOREIGN KEY (follower_id) REFERENCES Users(id) ON DELETE CASCADE,
    FOREIGN KEY (following_id) REFERENCES Users(id) ON DELETE CASCADE,
    UNIQUE (follower_id, following_id)
);

CREATE TABLE Post (
    id INT PRIMARY KEY AUTO_INCREMENT,
    userId INT,
    content TEXT,
    image TEXT,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES Users(id) ON DELETE CASCADE
);

CREATE TABLE Comment (
    id INT PRIMARY KEY AUTO_INCREMENT,
    postId INT,
    userId INT,
    content TEXT,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (postId) REFERENCES Post(id) ON DELETE CASCADE,
    FOREIGN KEY (userId) REFERENCES Users(id) ON DELETE CASCADE
);

CREATE TABLE Likes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    userId INT,
    postId INT NULL,
    commentId INT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES Users(id) ON DELETE CASCADE,
    FOREIGN KEY (postId) REFERENCES Post(id) ON DELETE CASCADE,
    FOREIGN KEY (commentId) REFERENCES Comment(id) ON DELETE CASCADE,
    CHECK (postId IS NOT NULL OR commentId IS NOT NULL)
);


----number of follwowers for a user
--SELECT COUNT(*) AS follower_count
--FROM Followers
--WHERE following_id = 1;  -- Replace 1 with the specific user ID
--
---- who follows user
--SELECT u.id, u.username
--FROM Users u
--JOIN Followers f ON u.id = f.follower_id
--WHERE f.following_id = 1;  -- Replace 1 with the specific user ID
--
----posts for a user and likes and comments
--SELECT
--    p.id AS post_id,
--    p.content,
--    p.createdAt,
--    (SELECT COUNT(*) FROM Likes WHERE postId = p.id) AS like_count,
--    (SELECT COUNT(*) FROM Comment WHERE postId = p.id) AS comment_count
--FROM Post p
--WHERE p.userId = 1  -- Replace 1 with the specific user ID
--ORDER BY p.createdAt DESC;
--
---- signle post  with likes and comments
--SELECT
--    p.id AS post_id,
--    p.content,
--    p.createdAt,
--    (SELECT COUNT(*) FROM Likes WHERE postId = p.id) AS like_count,
--    (SELECT COUNT(*) FROM Comment WHERE postId = p.id) AS comment_count,
--    (SELECT GROUP_CONCAT(c.content SEPARATOR '; ')
--     FROM Comment c
--     WHERE c.postId = p.id) AS comments
--FROM Post p
--WHERE p.id = 1;  -- Replace 1 with the specific post ID
--
--
---- news feed
--SELECT
--    p.id AS post_id,
--    p.content,
--    p.createdAt,
--    u.username,
--    (SELECT COUNT(*) FROM Likes WHERE postId = p.id) AS like_count,
--    (SELECT COUNT(*) FROM Comment WHERE postId = p.id) AS comment_count
--FROM Post p
--JOIN Users u ON p.userId = u.id
--JOIN Followers f ON p.userId = f.following_id
--WHERE f.follower_id = 1  -- Replace 1 with the current user's ID
--ORDER BY p.createdAt DESC
--LIMIT 50;  -- Limit to 50 most recent posts, adjust as needed