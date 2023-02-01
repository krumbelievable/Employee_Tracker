const mysql = require('mysql2'); //this is where mysql is called and where I create the connection to the database.

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
