CREATE TABLE Users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    email TEXT UNIQUE NOT NULL,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
);

CREATE TABLE BlacklistToken(
    id INT PRIMARY KEY AUTO_INCREMENT,
    token TEXT UNIQUE NOT NULL,
    expirationTime DATE
)