require('dotenv').config();
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'loanmarket',
});
 
connection.connect((err) => {
    if(err) console.log(`Error MYSQL : ${err}`)
});

module.exports = connection