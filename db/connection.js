//boilerplate code to allow access to server
const mysql = require('mysql2');

const connection = mysql.createConnection(
	{
		host: 'localhost',
		user: 'root',
		password: 'Nov@2022!',
		database: 'companylist_db',
	},
	console.log(`Connected to the companylist_db database.`)
);

module.exports = connection;
