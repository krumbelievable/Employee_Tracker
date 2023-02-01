const db = require('./db/index');
const inquirer = require('inquirer'); // Here I call what I need to run the app, db which is my database, inquirer and consoletable.
const consoleTable = require('console.table');

init();

function init() {
	console.log(' ');
	console.log('******************************');
	console.log('*                            *');
	console.log('*      EMPLOYEE MANAGER      *');
	console.log('*                            *');
	console.log('******************************');
	console.log(' ');

	inquirer
		.prompt([
			{
				type: 'list',
				name: 'userChoice',
				message: 'What would you like to do?',
				choices: [
					'Add Employee',
					'View All Employees',
					'Update Employee Role',
					'View All Roles',
					'Add Role',
					'View All Departments',
					'Add Department',
				],
			},
		])
		.then((data) => {
			const { userChoice } = data;
			switch (
				userChoice // switch statement for all of my choices.
			) {
				case 'Add Employee':
					addEmployee();
					break;
				case 'View All Employees':
					allEmployees();
					break;
				case 'Update Employee Role':
					employeeRole();
					break;
				case 'View All Roles':
					allRoles();
					break;
				case 'Add Role':
					addRole();
					break;
				case 'View All Departments':
					allDepartments();
					break;
				case 'Add Department':
					addDepartment();
					break;
				default:
					break;
			}
		})
		.catch((error) => {
			console.log(error);
		});
}

//here i use async and await to call my database for all aspects of my database that need to be called.
const addEmployee = async () => {
	const [roles] = await db.allRoles();
	const [employees] = await db.allEmployees();

	// here I am maping through the different employees and roles to pull them all.
	const roleChoices = roles.map(({ id, role_title }) => ({
		name: role_title,
		value: id,
	}));

	const managerChoices = employees.map(({ id, first_name, last_name }) => ({
		name: `${first_name} ${last_name}`,
		value: id,
	}));

	managerChoices.unshift({ name: 'None', value: null });

	let answers = await inquirer.prompt([
		{
			type: 'input',
			name: 'first_name',
			message: 'What is employees first name?',
		},
		{
			type: 'input',
			name: 'last_name',
			message: 'What is employees last name?',
		},
		{
			type: 'list',
			name: 'role_id',
			message: 'What role is the employee?',
			choices: roleChoices,
		},
		{
			type: 'list',
			name: 'manager_id',
			message: 'Who is the manager of the employee?',
			choices: managerChoices,
		},
	]);

	await db.addEmployee(answers);
	console.log('Employee has been added successfully!!!!!😊😊');

	init();
};

const allEmployees = () => {
	// This db. is used throughout my app to call what i need from my database.
	db.allEmployees().then(([data]) => {
		console.table(data);
	});
	init();
};

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

const allRoles = () => {
	db.allRoles().then(([data]) => {
		console.table(data);
	});
	init();
};

const addRole = async () => {
	const [departments] = await db.allDepartments();

	// This is called to pull my departments for my add role function.
	const departmentChoice = departments.map(({ id, department_name }) => ({
		name: department_name,
		value: id,
	}));

	let answers = await inquirer.prompt([
		{
			type: 'input',
			name: 'role_title',
			message: 'What is the new role you would like to add?',
		},
		{
			type: 'input',
			name: 'role_salary',
			message: 'What is the roles salary?',
		},
		{
			type: 'list',
			name: 'department_id',
			message: 'What department is the role in?',
			choices: departmentChoice,
		},
	]);

	await db.addRole(answers);
	console.log('Role successfully added!');

	init();
};

const allDepartments = () => {
	db.allDepartments().then(([data]) => {
		console.table(data);
	});
	init();
};

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
