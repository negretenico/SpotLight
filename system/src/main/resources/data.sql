-- Users
INSERT INTO Users (email, username, password) VALUES
('john.doe@email.com', 'johndoe', '$2a$10$xPPF1P2k1B2B2B2B2B2B2O2B2B2B2B2B2B2B2B2B2B2B2B2B2B2'),
('jane.smith@email.com', 'janesmith', '$2a$10$xPPF1P2k1B2B2B2B2B2B2O2B2B2B2B2B2B2B2B2B2B2B2B2B2B2'),
('mike.wilson@email.com', 'mikewilson', '$2a$10$xPPF1P2k1B2B2B2B2B2B2O2B2B2B2B2B2B2B2B2B2B2B2B2B2B2'),
('sarah.parker@email.com', 'sarahp', '$2a$10$xPPF1P2k1B2B2B2B2B2B2O2B2B2B2B2B2B2B2B2B2B2B2B2B2B2'),
('alex.turner@email.com', 'alexturner', '$2a$10$xPPF1P2k1B2B2B2B2B2B2O2B2B2B2B2B2B2B2B2B2B2B2B2B2B2'),
('emily.white@email.com', 'emilywhite', '$2a$10$xPPF1P2k1B2B2B2B2B2B2O2B2B2B2B2B2B2B2B2B2B2B2B2B2B2'),
('david.brown@email.com', 'davidbrown', '$2a$10$xPPF1P2k1B2B2B2B2B2B2O2B2B2B2B2B2B2B2B2B2B2B2B2B2B2'),
('lisa.garcia@email.com', 'lisagarcia', '$2a$10$xPPF1P2k1B2B2B2B2B2B2O2B2B2B2B2B2B2B2B2B2B2B2B2B2B2'),
('chris.lee@email.com', 'chrislee', '$2a$10$xPPF1P2k1B2B2B2B2B2B2O2B2B2B2B2B2B2B2B2B2B2B2B2B2B2'),
('amanda.taylor@email.com', 'amandataylor', '$2a$10$xPPF1P2k1B2B2B2B2B2B2O2B2B2B2B2B2B2B2B2B2B2B2B2B2');

-- Followers
INSERT INTO Followers (follower_id, following_id) VALUES
(1, 2), (1, 3), (1, 4), (1, 5),
(2, 1), (2, 3), (2, 4),
(3, 1), (3, 2), (3, 5),
(4, 1), (4, 2), (4, 5),
(5, 1), (5, 3), (5, 4),
(6, 1), (6, 2), (6, 7),
(7, 6), (7, 8), (7, 9),
(8, 7), (8, 9), (8, 10),
(9, 7), (9, 8), (9, 10),
(10, 6), (10, 7), (10, 8);

-- Posts
INSERT INTO Post (user_id, content, image) VALUES
(1, 'Just had an amazing coffee at the new cafe downtown!', NULL),
(2, 'Beautiful sunset today! #nature', '/images/sunset.jpg'),
(3, 'Working on a new project. So excited!', NULL),
(4, 'Found this awesome hiking trail! #outdoors', '/images/trail.jpg'),
(5, 'Just finished reading an incredible book', NULL),
(1, 'Making progress on my fitness goals', NULL),
(2, 'Trying out a new recipe tonight', '/images/food.jpg'),
(3, 'Great day at the beach!', '/images/beach.jpg'),
(4, 'Just adopted a puppy! Meet Max', '/images/puppy.jpg'),
(5, 'Celebrating my birthday with friends!', '/images/party.jpg'),
(6, 'First day at my new job!', NULL),
(7, 'Finally finished that painting I have been working on', '/images/art.jpg'),
(8, 'Movie night with the family', NULL),
(9, 'Just ran my first marathon!', '/images/marathon.jpg'),
(10, 'Learning to play guitar', NULL),
(1, 'Visited the new museum exhibition today', '/images/museum.jpg'),
(2, 'Made my first homemade pasta!', '/images/pasta.jpg'),
(3, 'Early morning yoga session', NULL),
(4, 'Started a new garden project', '/images/garden.jpg'),
(5, 'Exploring the city on my new bike', NULL);

-- Comments
INSERT INTO Comment (post_id, user_id, content) VALUES
(1, 2, 'Which cafe? I need to try it!'),
(1, 3, 'Looks cozy!'),
(2, 1, 'Stunning view!'),
(2, 4, 'Perfect timing for that shot!'),
(3, 5, 'Cannot wait to hear more about it!'),
(4, 1, 'Where is this trail?'),
(5, 2, 'What book was it?'),
(6, 3, 'Keep it up!'),
(7, 4, 'Recipe please!'),
(8, 5, 'Perfect beach day!');

-- Likes
INSERT INTO Likes (user_id, post_id, comment_id) VALUES
(2, 1, NULL),
(3, 1, NULL),
(4, 1, NULL),
(1, 2, NULL),
(3, 2, NULL),
(5, 3, NULL),
(1, 4, NULL),
(2, 5, NULL),
(3, 6, NULL),
(4, 7, NULL),
(1, NULL, 1),
(3, NULL, 1),
(2, NULL, 3),
(4, NULL, 5),
(5, NULL, 7);