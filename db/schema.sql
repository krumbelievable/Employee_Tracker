DROP DATABASE IF EXISTS companylist_db;  /* Here is my database being created */
CREATE DATABASE companylist_db;

USE companylist_db;

CREATE TABLE departments (   /* here 3 tables are created with all aspects I want to add to it */
id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
department_name VARCHAR(30) NOT NULL
);

CREATE TABLE member_role (
id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
role_title VARCHAR(30) NOT NULL,
role_salary DECIMAL NOT NULL,
department_id INT,
FOREIGN KEY (department_id)
REFERENCES departments(id)
ON DELETE SET NULL
);

CREATE TABLE employee (
id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
first_name VARCHAR(30) NOT NULL,
last_name VARCHAR(30) NOT NULL,
role_id INT NOT NULL,
manager_id INT DEFAULT NULL,
FOREIGN KEY (role_id) REFERENCES member_role(id),
FOREIGN KEY (manager_id) REFERENCES employee(id),
UNIQUE (first_name, last_name)
);