﻿# EmployeesDetails

## Installation

Ensure you have the required dependencies installed

## .env File

To configure your environment variables, create a `.env` file in the root directory of your project. Add the following variables:

NODE_ENV=development
PORT=3000
DATABASE=your_database_connection_string
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=7d
JWT_COOKIE_EXPIRES_IN=7d


Make sure to replace `your_database_connection_string` with the connection string of your database and `your_jwt_secret_key` with your desired JWT secret key. Adjust the expiration times (`JWT_EXPIRES_IN` and `JWT_COOKIE_EXPIRES_IN`) as needed.
