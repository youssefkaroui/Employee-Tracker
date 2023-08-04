INSERT INTO department (name)
VALUES 
('Kitchen'),
('Front-of-the-house'),
('Management');

INSERT INTO role (title, salary, department_id)
VALUES
('General manager', 180000, 3),
('Assistant general manager', 120000, 3),
('Floor manager', 90000, 3),
('Admin manager', 60000, 3),
('Executive chef', 200000, 1),
('Sous-chef', 100000, 1),
('Line cook', 80000,1),
('dish-washer', 50000, 1),
('Host', 60000, 2),
('Server', 95000,2),
('Back-server', 50000,2),
('Bartender', 95000, 2),
('Bar-back', 50000, 2);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
('Peter', 'Serious', 1, Null),
('Robert', 'Funny', 2, 1),
('Ben', 'Active', 3, 1),
('Keysi', 'Happy', 4, 1),
('Laurent', 'Frenchy', 5, 1),
('Diego', 'Angry', 6, 5),
('Marck', 'Cold', 7, 5),
('Panos', 'Fast', 8, 5),
('Topher', 'Calm', 9, 3),
('Dave', 'late', 10, 3),
('Dina', 'Efficeint', 10, 3),
('Phil', 'Jumpy', 11, 3),
('Katie', 'Smiles', 12, 3),
('Micky', 13, 3);





