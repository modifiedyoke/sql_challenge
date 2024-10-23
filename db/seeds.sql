-- Seed data for department table
INSERT INTO department (department_name) VALUES
('Engineering'),
('Marketing'),
('Sales'),
('Human Resources');

-- Seed data for role table
INSERT INTO role (title, salary, department_id) VALUES
('Software Engineer', 80000, 1),
('Product Manager', 90000, 1),
('Marketing Coordinator', 60000, 2),
('Sales Representative', 50000, 3),
('HR Manager', 70000, 4);

-- Seed data for employee table
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
('Alice', 'Johnson', 1, 2),
('Bob', 'Smith', 2, NULL),
('Carol', 'Williams', 3, NULL),
('David', 'Brown', 4, NULL),
('Eve', 'Davis', 5, NULL);