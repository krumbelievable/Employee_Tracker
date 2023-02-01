const connection = require('./connection.js'); // I call the connecton here.

class db {
	constructor(connection) {
		// here I create a class that holds all of my .query that i need to pull from the database.
		this.connection = connection;
	}

	allEmployees() {
		return this.connection
			.promise()
			.query(
				"SELECT employee.id, employee.first_name, employee.last_name, member_role.role_title, departments.department_name AS departments, member_role.role_salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN member_role on employee.role_id = member_role.id LEFT JOIN departments on member_role.department_id = departments.id LEFT JOIN employee manager on manager.id = employee.manager_id;"
			);
	}

	addEmployee(employee) {
		return this.connection
			.promise()
			.query('INSERT INTO employee SET ?', employee);
	}

	employeeRole(employee) {
		return this.connection
			.promise()
			.query(
				'SELECT employee.last_name, employee.first_name, role.title FROM employee JOIN role ON employee.role_id = role.id;',
				employee
			);
	}

	allRoles() {
		return this.connection.promise().query('SELECT * from member_role');
	}

	addRole(member_role) {
		return this.connection
			.promise()
			.query('INSERT INTO member_role SET ?', member_role);
	}

	allDepartments() {
		return this.connection.promise().query('SELECT * from departments');
	}

	addDepartment(departments) {
		return this.connection
			.promise()
			.query('INSERT INTO departments SET ?', departments);
	}
}

module.exports = new db(connection); // Exporting my database connection so that it connects to the inquire questions.
