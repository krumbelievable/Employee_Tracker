const db = require('./db/index');
// brings in inquirer which will help run our databse
const inquirer = require('inquirer');

init();

// intro screen
function init() {
	console.log(' ');
	console.log('******************************');
	console.log('*                            *');
	console.log('*      EMPLOYEE MANAGER      *');
	console.log('*                            *');
	console.log('******************************');
	console.log(' ');

	// first prompt for the user
	inquirer
		.prompt([
			{
				type: 'list',
				name: 'startMenu',
				message: 'What action would you like to perform?',
				choices: [
					'Add Employee',
					'Update Employee Role',
					'View Employees',
					'Add Role',
					'View All Roles',
					'Add Department',
					'View All Departments',
				],
			},
		])
		.then((data) => {
			const { userChoice } = data;

			// I utilize a switch to catch all the user choices

			switch (userChoice) {
				case 'Add Employee':
					addEmployee();
					break;
				case 'Update Employee Role':
					employeeRole();
					break;
				case 'View Employees':
					allEmployees();
					break;
				case 'Add Role':
					addRole();
					break;
				case 'View All Roles':
					allRoles();
					break;
				case 'Add Department':
					addDepartment();
					break;
				case 'View All Departments':
					allDepartments();
					break;
				default:
					break;
			}
		})
		.catch((error) => {
			console.log(error);
		});
}

// creates an Employee, uses async statments to no clog event flow

const addEmployee = async () => {
	const [roles] = await db.allRoles();
	const [employees] = await db.allEmployees();

	// grabs all the choices for an eployee usign a map function
	const roleChoices = roles.map(({ id, role_title }) => ({
		name: role_title,
		value: id,
	}));

	const managerChoices = employees.map(({ id, first_name, last_name }) => ({
		name: `${first_name} ${last_name}`,
		value: id,
	}));

	managerChoices.unshift({ name: 'None', value: null });

	// propmots for creating an employee

	let answers = await inquirer.prompt([
		{
			type: 'input',
			name: 'first_name',
			message: 'First name of Employee.',
		},
		{
			type: 'input',
			name: 'last_name',
			message: 'Last name of Employee.',
		},
		{
			type: 'list',
			name: 'role_id',
			message: 'Role of the Employee.',
			choices: roleChoices,
		},
		{
			type: 'list',
			name: 'manager_id',
			message: 'Manager of Employee',
			choices: managerChoices,
		},
	]);

	await db.addEmployee(answers);
	console.log('Employee has been added successfully!!!!!😊😊');

	init();
};

// Grabs all employees to be used by other funcitons
const allEmployees = () => {
	db.allEmployees().then(([data]) => {
		console.table(data);
	});
	init();
};
// Changes employee role
const employeeRole = async () => {
	const [employees] = await db.allEmployees();
	const [roles] = await db.allRoles();

	const employeeChoice = employees.map(({ id, first_name, last_name }) => ({
		name: `${first_name} ${last_name}`,
		value: id,
	}));

	const roleChoices = roles.map(({ id, role_title }) => ({
		name: role_title,
		value: id,
	}));

	// variable to hold changes role request prompts
	let answers = await inquirer.prompt([
		{
			type: 'list',
			name: 'employee_id',
			message: 'Which employee would you like to change roles to?',
			choices: employeeChoice,
		},
		{
			type: 'list',
			name: 'role_id',
			message: 'What is employees new role?',
			choices: roleChoices,
		},
	]);

	await db.employeeRole(answers);
	console.log('Employee role successfully changed!');

	init();
};

// Grabs all employees roles to be used by other funcitons
const allRoles = () => {
	db.allRoles().then(([data]) => {
		console.table(data);
	});
	init();
};

// adds employee roles
const addRole = async () => {
	// Allows the addRole function access to an array of departments
	const [departments] = await db.allDepartments();

	const departmentChoice = departments.map(({ id, department_name }) => ({
		name: department_name,
		value: id,
	}));
	// answers for role assignment
	let answers = await inquirer.prompt([
		{
			type: 'input',
			name: 'role_title',
			message: 'Role?',
		},
		{
			type: 'input',
			name: 'role_salary',
			message: 'Salary?',
		},
		{
			type: 'list',
			name: 'department_id',
			message: 'Department?',
			choices: departmentChoice,
		},
	]);

	await db.addRole(answers);
	console.log('Role successfully added!');

	init();
};

// Grabs all departments to be used by other funcitons
const allDepartments = () => {
	db.allDepartments().then(([data]) => {
		console.table(data);
	});
	init();
};

//adds department
const addDepartment = async () => {
	let answers = await inquirer.prompt([
		{
			type: 'input',
			name: 'department_name',
			message: 'What is the new department you would like to add?',
		},
	]);

	await db.addDepartment(answers);
	console.log('Department has been added!!!!');

	init();
};
