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


