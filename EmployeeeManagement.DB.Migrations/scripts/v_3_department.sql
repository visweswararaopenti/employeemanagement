-- Create the department table
CREATE TABLE IF NOT EXISTS public."department" (
    deptid SERIAL PRIMARY KEY,
    deptname VARCHAR(50) NOT NULL
);

-- Insert data into department table
INSERT INTO public."department" (deptname) VALUES
('Human Resources'),
('Information Technology'),
('Finance'),
('Marketing'),
('Operations');
