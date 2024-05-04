
const mysql = require('mysql2/promise')
const env = require('dotenv').config()

const pool = mysql.createPool({
    
    host: process.env.DBHOST,
    user: process.env.DBUSER,
    password: process.env.DBPASSWORD,
    database:process.env.DATABASE,
    multipleStatements:true,
    namedPlaceholders:true
  
  })  

  module.exports = pool