CREATE TABLE users (
    id SERIAL NOT NULL PRIMARY KEY,
    email varchar(50) UNIQUE NOT NULL,
    password varchar(8) NOT NULL,
    username varchar(20) NOT NULL UNIQUE,
    "profilePic" TEXT NOT NULL
)