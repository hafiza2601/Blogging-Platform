# Blog Application API

## Overview

This is a RESTful API for a blogging platform built using Node.js, Express, and MongoDB. It includes endpoints for user authentication, blog post management, and comment handling. The API supports JWT-based authentication and role-based authorization.

## Table of Contents

1. [Setup](#setup)
2. [Endpoints](#endpoints)
3. [Authentication and Authorization](#authentication-and-authorization)
4. [Running the Application](#running-the-application)

## Setup

### Prerequisites

Ensure you have the following installed:
- Node.js (v18 or higher)
- MongoDB
- npm

### Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/yourusername/your-repository.git
    cd Blogging-Platform
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

3. **Configure environment variables:**

    Create a `.env` file in the root directory and copy .env.sample file:


4. **Set up the database:**

    Ensure MongoDB is running on your local machine or provide a connection string in the `.env` file.

## Endpoints

### 1. **Register User**

- **Endpoint:** `POST /api/auth/register`
- **Description:** Registers a new user.
- **Request Body:**

    ```json
    {
      "username": "string",
      "email": "string",
      "password": "string"
    }
    ```

- **Responses:**

    - **Success (201):**

        ```json
        {
          "message": "Account successfully created"
        }
        ```

    - **Error (400):**

        ```json
        {
          "message": "User already exists",
          "success": false
        }
        ```

    - **Error (500):**

        ```json
        {
          "error": "error details",
          "message": "Server error"
        }
        ```

### 2. **Login User**

- **Endpoint:** `POST /api/auth/login`
- **Description:** Authenticates a user and returns a JWT token.
- **Request Body:**

    ```json
    {
      "username": "string",
      "password": "string"
    }
    ```

- **Responses:**

    - **Success (200):**

        ```json
        {
          "accessToken": "jwt_token"
        }
        ```

    - **Error (401):**

        ```json
        {
          "message": "Invalid credentials",
          "success": false
        }
        ```

### 3. **Create Post**

- **Endpoint:** `POST /api/posts`
- **Description:** Creates a new blog post. Requires authentication.
- **Request Body:**

    ```json
    {
      "title": "string",
      "content": "string"
    }
    ```

- **Responses:**

    - **Success (201):**

        ```json
        {
          "message": "Post created successfully",
          "post": { /* post details */ }
        }
        ```

    - **Error (401):**

        ```json
        {
          "message": "Unauthorized",
          "success": false
        }
        ```

    - **Error (500):**

        ```json
        {
          "error": "error details",
          "message": "Server error"
        }
        ```

### 4. **Update Post**

- **Endpoint:** `PUT /api/posts/:id`
- **Description:** Updates an existing blog post. Requires authentication.
- **Request Body:**

    ```json
    {
      "title": "string",
      "content": "string"
    }
    ```

- **Responses:**

    - **Success (200):**

        ```json
        {
          "message": "Post updated successfully",
          "post": { /* post details */ }
        }
        ```

    - **Error (401):**

        ```json
        {
          "message": "Unauthorized",
          "success": false
        }
        ```

    - **Error (404):**

        ```json
        {
          "message": "Post not found",
          "success": false
        }
        ```

    - **Error (500):**

        ```json
        {
          "error": "error details",
          "message": "Server error"
        }
        ```

### 5. **Delete Post**

- **Endpoint:** `DELETE /api/posts/:id`
- **Description:** Deletes a blog post. Requires authentication.
- **Responses:**

    - **Success (200):**

        ```json
        {
          "message": "Post deleted successfully"
        }
        ```

    - **Error (401):**

        ```json
        {
          "message": "Unauthorized",
          "success": false
        }
        ```

    - **Error (404):**

        ```json
        {
          "message": "Post not found",
          "success": false
        }
        ```

    - **Error (500):**

        ```json
        {
          "error": "error details",
          "message": "Server error"
        }
        ```

### 6. **Add Comment**

- **Endpoint:** `POST /api/posts/:id/comments`
- **Description:** Adds a comment to a blog post. Requires authentication.
- **Request Body:**

    ```json
    {
      "content": "string"
    }
    ```

- **Responses:**

    - **Success (201):**

        ```json
        {
          "message": "Comment added successfully",
          "comment": { /* comment details */ }
        }
        ```

    - **Error (401):**

        ```json
        {
          "message": "Unauthorized",
          "success": false
        }
        ```

    - **Error (404):**

        ```json
        {
          "message": "Post not found",
          "success": false
        }
        ```

    - **Error (500):**

        ```json
        {
          "error": "error details",
          "message": "Server error"
        }
        ```

**Other Post API**
  1. DELETE /api/post/:id
  2. GET /api/post
  3. GET /api/post/:id
     
**Comments API**
  1. POST /api/post/:postId/comment
  2. PUT /api/post/:postId/comment/:commentId
  3. GET /api/post/:postId/comment
  4. DELETE /api/post/:postId/comment/:commentId
     

## Authentication and Authorization

### Authentication

- **JWT Authentication:** Users must provide a valid JWT token in the `Authorization` header for endpoints that require authentication.
- **Token Generation:** Tokens are generated upon successful login and are valid for a defined period (e.g., 1 hour).

### Authorization

- **Role-Based Access:** Authorization is based on user roles. Currently, the API supports user creation and modification of their own posts. Future enhancements can include admin roles for managing all posts and users.

## Running the Application

1. **Start the server:**

    ```bash
    npm start
    ```

2. **Visit the API in your browser or use tools like Postman to test the endpoints:**

    - Local Development URL: `http://localhost:3000/api`
