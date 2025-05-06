-- Step 1: Create the database if it doesn't exist
CREATE DATABASE IF NOT EXISTS emp_db;

-- Step 2: Switch to the database
USE emp_db;

-- Step 3: Create the user table
CREATE TABLE IF NOT EXISTS emp_db.user (
    userid INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL
);
