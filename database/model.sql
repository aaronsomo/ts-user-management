DROP DATABASE IF EXISTS users;

CREATE DATABASE users;

\c users;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name varchar(255),
    email varchar(255),
    dob varchar(255)
);