const inquirer = require('inquirer');
const mysql = require('mysql2');
const consoleTable = require('console.table');

// Connect to database
const db = mysql.createConnection(
    {
      host: 'localhost',
      user: DB_USER,
      password: DB_PASSWORD,
      database: DB_NAME,
    },
    console.log('Connected to the database!')
  );

  const mainMenu = () => {
    inquirer.createPromptModule({
        message: 'Choose one of the following options',
        name: 'menu',
        type: 'list',
        choices: [
            'View all departments', 
            'View all roles', 
            'View all employees', 
            'Add a department', 
            'Add a role', 
            'Add an employee', 
            'Update an employee role',
            'Quit',
        ]
    })

    .then(response => {
        if (response.menu === 'View all departments') {
            viewAll();
        } else if (response.menu === 'View all roles') {
            viewRoles();
        } else if (response.menu === 'View all employees'){
            viewEmployees();
        } else if (response.menu === 'Add a deparrtment') {
            addDept();
        } else if (response.menu === 'Add a role'){
            addRole();
        } else if (response.menu === 'Add an employee') {
            addEmployee();
        } else if (response.menu === 'Update employee role') {
            updateEmployee();
        } else {
            connection.end();
        }
    });
  };

  const viewAll = () => {
    connection.query(`SELECT * FROM department`, function (res, err) {
        console.table(res);
        mainMenu();
    });
  };

  const viewRoles = () => {
    connection.query(`SELECT 
        r.id, r.title, r.salary, 
        d.name AS department,
    FROM role r JOIN department d ON r.department_id = d.id`, (res, err) => {
        
    console.table(res);
    mainMenu();
    });
};

  const viewEmployees = () => {
    connection.query(`SELECT
        e.id, e.first_name, e.last_name,
        r.title, r.salary,
        d.name AS department,
    CONCAT(m.fitst_name, ' ', m.last_name) AS manager FROM employee e
    JOIN role r ON e.role_id = r.id
    JOIN department d ON r.department_id = d.id
    LEFT JOIN employee m ON e.manager_id - m.id`, (res, err) => {

    console.table(res);
    mainMenu();
    });
};

  const addDept = () => {
    inquirer.prompt({
        name: 'addDepartment',
        type: 'input',
        message: 'Enter a department you want to add.',
    })

    .then(response => {
        connection.query('INSERT INTO department (name) VALUES (?)',
            [addDepartment.department], (res, err) => {
                console.log('Department added!');
                mainMenu();
            }
        );
    });
  };

  const addRole = () => {
    connection.query('SELECT id, name FROM department', (res, err) => {
        inquirer.prompt([
            {
                name: 'role',
                type: 'input',
                message: 'Enter new role.',
            },
            {
                name: 'salary',
                type: 'input',
                message: 'Enter starting salary.',  
            },
            {
                name: 'department',
                type: 'input',
                message: 'Select department for role.',
                choices: Object.keys(department_id.name),
            },        
        ])
        .then(response => {
            connection.query('INSERT INTO role (title, salary, depaertment_id) VALUES (?, ?, ?', 
            [response.role, response.salary, response.department_id.name], function (res, err) {
                console.log('Role added!'),
                mainMenu();
            });

        })
    });
  };

  const addEmployee = () => {
    connection.query('SELECT id, title FROM role', (res, err) => {
        inquirer.prompt([
            {
                name: 'first_name',
                type: 'input',
                message: 'Enter first name.',
            },
            {
                name: 'last_name',
                type: 'input',
                message: 'Enter last name.',
            },
            {
                name: 'role',
                type: 'input',
                message: 'Select role for employee.',
                choices: Object.keys(role_id.title),
            },
            {
                name: 'manager',
                type: 'input',
                message: 'Enter manager ID.',
            },
        ])
        .then(response => {
            connection.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)',
            [response.first_name, response.last_name, response.role_id.title, response.manager_id], function (res, err) {
                console.log('Employee added!'),
                mainMenu();
            });
        });
    });
  };

  const updateEmployee = () => {
    connection.query('SELECT id, title FROM role', (res, err) => {
        inquirer.prompt([
            {
                name: 'employee',
                type: 'input',
                message: 'Select employee to update.',
            },
            {
                name: 'role',
                type: 'input',
                message: 'Select new role for employee.',
                choices: Object.keys(role_id.title),
            },
        ])
        .then(response => {
            connection.query('UPDATE employee SET role_id = ? WHERE id = ?', [response.role_id.title, response.employee], function (res, err) {
                console.log('Employee role updated!'),
                mainMenu();
            });
        });
    }); 
  };