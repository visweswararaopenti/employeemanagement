USE emp_db;
CREATE TABLE employee (
    empid INT AUTO_INCREMENT PRIMARY KEY,
    empname VARCHAR(100) NOT NULL,
    dob DATE NOT NULL,
    date_of_joining DATETIME NOT NULL,
    departmentid INT,
    FOREIGN KEY (departmentid) REFERENCES department(deptid)
);
INSERT INTO employee (empname, dob, date_of_joining, departmentid) VALUES
('John Smith', '1985-03-15', '2020-01-10 09:00:00', 1),
('Mary Johnson', '1990-07-22', '2019-06-15 10:30:00', 2),
('Robert Brown', '1988-11-30', '2021-03-01 08:45:00', 3),
('Lisa Davis', '1992-04-18', '2022-09-20 09:15:00', 4),
('Michael Wilson', '1983-09-05', '2018-11-11 11:00:00', 5);