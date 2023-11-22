# Bytive_assignment_stretch

check Deployed Full-Stack web Application :- [Home](https://tiny-lokum-3ee10e.netlify.app)

## Bytive Backend Documentation

Welcome to the backend documentation for the Bytive application.

-check [ swagger_documentation](https://bytive-assignment-stretch-frn4.vercel.app/api-docs/) for better experience

## Table of Contents

- [Getting Started](#getting-started)
- [Authentication](#authentication)
- [Endpoints](#endpoints)
  - [1. Fetch User Profiles](#1-fetch-user-profiles)
  - [2. Search Profiles](#2-search-profiles)
  - [3. Update User Profile](#3-update-user-profile)
  - [4. User Registration](#4-user-registration)
  - [5. User Login](#5-user-login)
  - [6. Edit User Profile](#6-edit-user-profile)
  - [6. Get User Profile](#6-get-user-profile)
  - [7. Delete User Account](#7-delete-user-account)
  - [8. Logout User](#8-logout-user)

## Getting Started

1. **Clone the repository:**

    ```bash
    git clone https://github.com/Uselessme21/Bytive_assignment_stretch.git
    cd your-repository
    ```

2. **Install Dependencies:**

    ```bash
    npm install
    ```

3. **Set Environment Variables:**

    Create a `.env` file in the root of your project and add the necessary environment variables. 

4. **Start the Server:**

    ```bash
    npm start
    ```

    This command will start the server. 

5. **Access the API:**

    Open your browser or a tool like [Postman](https://www.postman.com/) and access the API at the specified port (e.g., `http://localhost:3000`).

## Authentication

Authentication is required for accessing private routes. The authentication process involves obtaining a JSON Web Token (JWT) by logging in. This token must be included in the headers of requests to private APIs.

### Obtaining a JWT

To obtain a JWT, make a `POST` request to the `/user/login` endpoint with valid credentials.

```http
POST /api/user/login or /api/user/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

If the login is successful, the response will include a JWT token.
```http
{
  "message": "Login successful",
  "token": "your-jwt-token",
  "profile": "user-id"
}
```
### Using the JWT
Include the obtained JWT in the headers of requests to private routes. The header key should be Authorization, and the value should be Bearer your-jwt-token.

```http
GET /api/user/private/route
Authorization: your-jwt-token

```
  # API Documentation

This document provides information about the API endpoints and their usage.


# Endpoints 
## Get List of Profiles

- **Endpoint:** `/api/getusers`
- **Method:** GET
- **Description:** Fetches a list of user profiles.
- **Privacy:** Public

## Search Profiles

- **Endpoint:** `/api/searchusers`
- **Method:** GET
- **Description:** Searches user profiles based on provided parameters.
- **Privacy:** Public

## Update User Profile

- **Endpoint:** `/api/updateusers`
- **Method:** PUT
- **Description:** Updates the user profile.
- **Privacy:** Public

## Register User

- **Endpoint:** `/api/user/register`
- **Method:** POST
- **Description:** Registers a new user.
- **Privacy:** Public

## User Login

- **Endpoint:** `/api/user/login`
- **Method:** POST
- **Description:** Logs in an existing user.
- **Privacy:** Public

## Edit User Profile

- **Endpoint:** `/api/user/editprofile/:userId`
- **Method:** PUT
- **Description:** Edits the user profile.
- **Privacy:** Private

## Get User Profile

- **Endpoint:** `/api/user/userprofile/:userId`
- **Method:** GET
- **Description:** Fetches the profile of a specific user.
- **Privacy:** Private

## Delete User Profile

- **Endpoint:** `/api/user/deleteprofile/:userId`
- **Method:** DELETE
- **Description:** Deletes the user account.
- **Privacy:** Private

## User Logout

- **Endpoint:** `/api/user/logout`
- **Method:** GET
- **Description:** Logs out the user.
- **Privacy:** Private


