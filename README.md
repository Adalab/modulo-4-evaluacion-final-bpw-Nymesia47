#  modulo-4-evaluacion-final-bpw- Gabriella Calvano (Nymesia47)

## Description

Final project of the Adalab bootcamp, fourth module. The goalwas to create a REST API using Express.js, Node.js, and MySQL to manage information for a selected main entity. I have decided to create an Expense Tracker API that allows users to track their expenses. 

## Basic Requirements

 1. Develop an API that supports CRUD operations (Create, Read, Update, Delete) on the main entity of the selected theme.
 2. Use of Express.js for the server, Node.js for backend handling, and MySQL for the DATABASE.

 ## API Endpoints

 ### CRUD Operations for Exppenses

 | Method | Endpoint       | Description                   |
 | ------ | -------------- | ----------------------------- |
 | POST   | /expenses      | Add a new expense             |
 | GET    | /expenses      | Get all expenses              |
 | GET    | /expenses/:id  | Get an expense from id        |
 | PUT    | /expenses/:id  | Update an existing expense    |
 | DELETE | /expenses/:id  | Delete an expense             |
 | GET    | //exp/user     | Get all expenses per user     |

 ### Authentication (Bonus)

 | Method | Endpoint       | Description                   |
 | ------ | -------------- | ----------------------------- |
 | POST   | /register      | Register a new user           |
 | POST   | /login         | Log in and obtain a JWT token |

 
## Technologies Used

- Node.js

- Express.js

- MySQL

- JWT (JSON Web Tokens)

- dotenv (for environment variables)

## Additional Libraries and Tools

- bcrypt

- jsonwebtoken

## Contact
For any questions or suggestions, feel free to reach out:

Maintainer: Gabriella Calvano
Email: gabcalvano@gmail.com
GitHub: Nymesia47