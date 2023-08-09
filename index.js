// imports all the dependencies 
const mysql = require('mysql2');
const showTable = require('console.table');
require('dotenv').config();
const inquirer = require('inquirer');
const figlet = require('figlet');

// connects to database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password:'Josefka06',
    database:'employee_db'
});

connection.connect(err => {
    if (err) throw err;
    console.log('connected as id' + connection.threadId);
   starterPage();
   promptUser(); 

} );

function starterPage () {
    figlet('Employee tracker', function(err, data) {
        if (err) {
          console.log('Error, ASCII art not loaded!');
        } else {
          console.log(data);
        }  
      });
}; 

const promptUser = () => {
    inquirer
    .prompt ([
        {
            type:'list',
            name: 'choices',
            message: 'What would you like to do?',
            choices: ['View all departments',
            'View all roles',
            'View all employees', 
            'Add a department', 
            'Add a role', 
            'Add an employee', 
            'Update an employee role',
            'Update an employee manager',
            "View employees by department",
            'Delete a department',
            'Delete a role',
            'Delete an employee',
            'View department budgets',
            'No Action']
        }
    ])
    .then((answers) => {
        const { choices } = answers; 
  
        if (choices === "View all departments") {
          displayDepartments();
        }
  
        if (choices === "View all roles") {
          displayRoles();
        }
  
        if (choices === "View all employees") {
          displayEmployees();
        }
  
        if (choices === "Add a department") {
          addDepartment();
        }
  
        if (choices === "Add a role") {
          addRole();
        }
  
        if (choices === "Add an employee") {
          addEmployee();
        }
  
        if (choices === "Update an employee role") {
          updateEmployee();
        }
  
        if (choices === "Update an employee manager") {
          updateManager();
        }
  
        if (choices === "View employees by department") {
          employeeDepartment();
        }
  
        if (choices === "Delete a department") {
          deleteDepartment();
        }
  
        if (choices === "Delete a role") {
          deleteRole();
        }
  
        if (choices === "Delete an employee") {
          deleteEmployee();
        }
  
        if (choices === "View department budgets") {
          checkBudget();
        }
  
        if (choices === "No Action") {
          connection.end()
      };
    });
}

// displays roles
function displayRoles (){
    console.log('Showing all roles');
    const sql = `SELECT role.id, role.title, department.name AS department
                FROM role
                INNER JOIN department ON role.department_id = department.id`;
    connection.query(sql, (err, response)=>{
        if (err) throw err;
        console.table(response);
        promptUser();
    })            
     
};

// adds a role
function addRole () {
const departments = [];
  connection.query("SELECT * FROM DEPARTMENT", (err, res) => {
    if (err) throw err;

    res.forEach(department => {
      const params = {
        name: department.name,
        value: department.id
      }
      departments.push(params);
    });

    const  questions = [
      {
        type: "input",
        name: "title",
        message: "What would you like the title of this role to be?"
      },
      {
        type: "input",
        name: "salary",
        message: "what would you like the salary of this role to be?"
      },
      {
        type: "list",
        name: "department",
        choices: departments,
        message: "which department is this role in?"
      }
    ];

    inquirer
    .prompt(questions)
    .then(response => {
      const query = `INSERT INTO ROLE (title, salary, department_id) VALUES (?)`;
      connection.query(query, [[response.title, response.salary, response.department]], (err, res) => {
        if (err) throw err;
        console.log(`Successfully added ${response.title} role `);
        promptUser();
      });
    })
    .catch(err => {
      console.error(err);
    });
  });

};

function  addEmployee ()  {
  // gets all employees
  connection.query("SELECT * FROM EMPLOYEE", (err, employeeResponse) => {
    if (err) throw err;
    const employeesList = [
      {
        name: '',
        value: 0
      }
    ]; 
    employeeResponse.forEach(({ first_name, last_name, id }) => {
      employeesList.push({name: first_name + " " + last_name,value: id});
    });
    
    //get all the role list so that we can select the role of the new employee
    connection.query("SELECT * FROM ROLE", (err, roleResponse) => {
      if (err) throw err;
      const rolesList = [];
      roleResponse.forEach(({ title, id }) => {
        rolesList.push({name: title, value: id });
        });
     
      const questions = [
        {
          type: "input",
          name: "first_name",
          message: "What is the employee's first name?"
        },
        {
          type: "input",
          name: "last_name",
          message: "What is the employee's last name?"
        },
        {
          type: "list",
          name: "role_id",
          choices: rolesList,
          message: "What would you like the employee's role to be?"
        },
        {
          type: "list",
          name: "manager_id",
          choices: employeesList,
          message: "Who is the employee's manager? (could be null)"
        }
      ]
  
      inquirer
      .prompt(questions)
        .then(response => {
          const query = `INSERT INTO EMPLOYEE (first_name, last_name, role_id, manager_id) VALUES (?)`;
          const manager_id = response.manager_id !== 0? response.manager_id: null;
          connection.query(query, [[response.first_name, response.last_name, response.role_id, manager_id]], (err, res) => {
            if (err) throw err;
            console.log(` You have successfully added ${response.first_name} ${response.last_name} to your workforce!`);
            promptUser();
          });
        })
        .catch(err => {
          console.error(err);
        });
    })
  });
};

// updated  employee's role 
function updateEmployee () {
  //grabs employees list 
  connection.query("SELECT * FROM EMPLOYEE", (err, employeeResponse) => {
    if (err) throw err;
    const employeesList = [];
    employeeResponse.forEach(({ first_name, last_name, id }) => {
      employeesList.push({
        name: first_name + " " + last_name,
        value: id
      });
    });
    
    //grabs all the roles to allow us to update the role 
    connection.query("SELECT * FROM ROLE", (err, roleResponse) => {
      if (err) throw err;
      const rolesList = [];
      roleResponse.forEach(({ title, id }) => {
        rolesList.push({
          name: title,
          value: id
          });
        });
     
      let questions = [
        {
          type: "list",
          name: "id",
          choices: employeesList,
          message: "Whose role would you like to update?"
        },
        {
          type: "list",
          name: "role_id",
          choices: rolesList,
          message: "What is the new role going to be?"
        }
      ]
  
      inquirer
      .prompt(questions)
        .then(response => {
          const query = `UPDATE EMPLOYEE SET ? WHERE ?? = ?;`;
          connection.query(query, [{role_id: response.role_id}, "id", response.id],
           (err, res) => {
            if (err) throw err;
            
            console.log("You have successfully updated employee's role!");
            promptUser();
          });
        })
        .catch(err => {
          console.error(err);
        });
      })
  });
};

// displays all the departments 
function  displayDepartments  () {
  console.log('Showing all departments.');
  const query = `SELECT department.id AS id, department.name AS department FROM department`; 

  connection.promise().query(query, (err, res) => {
    if (err) throw err;
    console.table(res);
    promptUser();
  });
};





