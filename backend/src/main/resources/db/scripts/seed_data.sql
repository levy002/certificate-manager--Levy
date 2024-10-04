-- Seed Departments
INSERT INTO certificates.departments (name) VALUES
('ITM'),
('HR'),
('Sales'),
('Engineering');

-- Seed Suppliers
INSERT INTO certificates.suppliers (name, city) VALUES
('Supplier A', 'Berlin'),
('Supplier B', 'Munich'),
('Supplier C', 'Vienna'),
('Supplier D', 'Graz'),
('Supplier E', 'Sarajevo'),
('Supplier F', 'Graz'),
('Supplier G', 'Sarajevo');

-- Seed Users
INSERT INTO certificates.users (user_id, first_name, last_name, department_id, plant, email) VALUES
('JHNDOE', 'John', 'Doe', (SELECT id FROM certificates.departments WHERE name = 'ITM'), 'Plant 1', 'john.doe@example.com'),
('JNSMTH', 'Jane', 'Smith', (SELECT id FROM certificates.departments WHERE name = 'HR'), 'Plant 2', 'jane.smith@example.com'),
('ALCJHN', 'Alice', 'Johnson', (SELECT id FROM certificates.departments WHERE name = 'Sales'), 'Plant 3', 'alice.johnson@example.com'),
('BOBBRN', 'Bob', 'Brown', (SELECT id FROM certificates.departments WHERE name = 'Engineering'), 'Plant 4', 'bob.brown@example.com'),
('CHLDVS', 'Charlie', 'Davis', (SELECT id FROM certificates.departments WHERE name = 'ITM'), 'Plant 5', 'charlie.davis@example.com'),
('DVDWLS', 'David', 'Wilson', (SELECT id FROM certificates.departments WHERE name = 'HR'), 'Plant 6', 'david.wilson@example.com'),
('EVMORE', 'Eve', 'Moore', (SELECT id FROM certificates.departments WHERE name = 'Sales'), 'Plant 7', 'eve.moore@example.com'),
('FRKCLK', 'Frank', 'Clark', (SELECT id FROM certificates.departments WHERE name = 'Engineering'), 'Plant 8', 'frank.clark@example.com'),
('GRCLEE', 'Grace', 'Lee', (SELECT id FROM certificates.departments WHERE name = 'ITM'), 'Plant 9', 'grace.lee@example.com'),
('HNRMTN', 'Henry', 'Martin', (SELECT id FROM certificates.departments WHERE name = 'Sales'), 'Plant 10', 'henry.martin@example.com');
