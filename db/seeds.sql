INSERT INTO department (name)
VALUES
    ("Marketing"),
    ("Sales"),
    ("Creative"),
    ("Project Manager"),
    ("Human Resources");

INSERT INTO role (title, salery, department_id)
VALUES
-- Marketing Department linking with department_id of 1 --
    ("Marketing Director", 95000, 1),
    ("Digital Marketing Specalist", 75000, 1),
    ("Marketing Intern", 45000, 1),

-- Sales Department linking with department_id of 2 --
    ("Director of Sales", 120000, 2),
    ("Lead Sales Strategist", 100000, 2),
    ("Salesman", 60000, 2),

-- Creative Department linking with department_id of 3 --
    ("Creative Director", 95000, 3),
    ("Lead Designer", 65000, 3),
    ("Graphic Design Intern", 40000, 3),

-- Project Manager Departmentment linking with department_id of 4 --
    ("Senior Project Manager", 80000, 4),
    ("Assistant Project Manager", 75000, 4),
    ("Junior Project Manager", 70000, 4),

-- Human Resources Department linking with department_id of 5 --
    ("Head of Human Resources", 60000, 5),
    ("Confilct Prevention Team", 50000, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
-- Employee name with link to role_id and and manager_id (if applicble) --

-- Marketing Employees --
    ("Big", "Bird", 1, NULL),
    ("Oscar", "Grouch", 2, 1),
    ("Bert", "Ernie", 3, 1),
    ("Ernie", "Bert", 3, 1),

-- Sales Employees --
    ("Harry", "Potter", 4, NULL),
    ("Hermonie", "Granger", 5, 5),
    ("Ron", "Weadsley", 6, 5),

-- Creative Employees --
    ("Gandalf", "White", 7, NULL),
    ("Gimli", "Greenleaf", 8, 8)
    ("Frodo", "Baggins", 9, 8),

-- Project Manager Employees --
    ("Geralt", "Rivia", 10, NULL),
    ("Ciri", "Cintra", 11, 11),
    ("Triss", "Merrigold", 12, 11),

-- Human Resources Employees --
    ("Bob", "Belcher", 13, NUll),
    ("Gene", "Belcher", 14, 14),
    ("Louise", "Belcher", 14, 14);