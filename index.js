// imports all the dependencies 
const mysql = require('mysql');
const showTable = require('console.table');
require('dotenv').config();
const inquirer = ('inquirer');

// connects to database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: process.env.Password,
    database:'employee_db'
});

