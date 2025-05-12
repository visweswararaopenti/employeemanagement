USE emp_db;
CREATE TABLE department (
    deptid INT AUTO_INCREMENT PRIMARY KEY,
    deptname VARCHAR(50) NOT NULL
);
INSERT INTO department (deptname) VALUES
('Human Resources'),
('Information Technology'),
('Finance'),
('Marketing'),
('Operations');

