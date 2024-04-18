# Node.js TypeScript Application with OAuth 2.0 Security

This is a sample Node.js application built with TypeScript that demonstrates how to implement OAuth 2.0 security for securing APIs. The application uses Express.js for the web server, Sequelize as the ORM for interacting with the database, and JWT for token-based authentication.

## Features

- User registration and login functionality with password hashing.
- Token-based authentication using JWT (JSON Web Tokens).
- Support for multiple tokens per user.
- Token refresh and revocation functionality.

## Libraries Used

- Express.js: Web framework for Node.js
- Sequelize: ORM for Node.js
- JWT (JSON Web Tokens): For token-based authentication
- bcryptjs: For hashing passwords securely

## Setup

1. **Clone the Repository**:

   ```bash
   git clone <repository_url>
   ```

2. **Install Dependencies**:

   ```bash
   npm install
   ```

3. **Database Configuration**:

   - Set up your MySQL database and update the connection details in the `config.ts` file.
   - Run the database migrations to create the necessary tables:

     ```bash
     npm run migrate
     ```

4. **Environment Variables**:

   Create a `.env` file in the root directory and add the following environment variables:

   ```
   PORT=3000
   ACCESS_TOKEN_SECRET=your_access_token_secret
   REFRESH_TOKEN_SECRET=your_refresh_token_secret
   DB_NAME=your_database_name
   DB_USER=your_database_user
   DB_PASSWORD=your_database_password
   DB_HOST=your_database_host
   ```

5. **Start the Server**:

   ```bash
   npm start
   ```

   The server will start running on port 3000 by default. You can access the API endpoints at `http://localhost:3000`.

## API Endpoints

- `POST /oauth/register`: Register a new user.
- `POST /oauth/token`: Login with email and password to obtain access and refresh tokens.
- `POST /oauth/token/refresh`: Refresh access token using refresh token.
- `POST /oauth/token/revoke`: Revoke a specific refresh token.

