# Taskify - Task Management App

[![License](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![GitHub stars](https://img.shields.io/github/stars/ahmedmohmd/taskify)](https://github.com/ahmedmohmd/taskify/stargazers)

Taskify is a task management application built with Node.js, Express, Prisma, and PostgreSQL. It allows users to create, update, read, and delete tasks and sub-tasks efficiently.

> :information_source:
> This project is solely for showcasing my skills and is not intended for public deployment or use.

## Table of Contents

- [App Features](#app-features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Routes](#routes)
  - [Home Route](#home-route)
  - [Auth Route](#auth-route)
  - [Users Route](#users-route)
  - [Tasks Route](#tasks-route)
  - [Sub Tasks Route](#sub-tasks-route)

## Features

- **User Authentication**: Secure user registration and login functionality.
- **Task Management**: Create, update, read, and delete tasks.
- **Subtask Handling**: Manage subtasks associated with each task.
- **User Profile**: View and update user profiles.

## Getting Started

### Prerequisites

Before running Taskify, make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [PostgreSQL](https://www.postgresql.org/) database

### Installation

1. Clone the repository:

   ```shell
   git clone https://github.com/yourusername/taskify.git
   cd taskify
   ```

2. Install dependencies:

   ```shell
   npm install
   ```

3. Create a `.env` file in the project root directory and set the following environment variables:

   ```
   DATABASE_URL=postgresql://yourusername:yourpassword@localhost:5432/yourdatabase
   JWT_SECRET=yourjwtsecret
   ```

4. Run database migrations:

   ```shell
   npx prisma migrate dev
   ```

5. Start the application:

   ```shell
   npm start
   ```

Your Taskify app should now be running at [http://localhost:3000](http://localhost:3000).

## Usage

To use Taskify, users need to authenticate. You can register a new account or log in with existing credentials using the following routes:

- `POST /api/auth/register` - Register a new user.
- `POST /api/auth/login` - Log in with an existing user.

## Routes

### Home Route

- `GET /api` - Welcome to Taskify! This route provides a simple welcome message.

### Auth Route

- `POST /api/auth/register` - Register a new user.
- `POST /api/auth/login` - Log in with an existing user.

### Users Route

- `GET /api/users/:userId` - Retrieve user information.
- `PATCH /api/users/:userId` - Update user information.
- `DELETE /api/users/:userId` - Delete user account.

### Tasks Route

- `GET /api/tasks` - Get a list of all tasks.
- `POST /api/tasks` - Create a new task.
- `GET /api/tasks/:taskId` - Get details of a specific task.
- `PATCH /api/tasks/:taskId` - Update a task.
- `DELETE /api/tasks/:taskId` - Delete a task.

### Sub Tasks Route

- `GET /api/subtasks` - Get a list of all sub-tasks.
- `POST /api/subtasks` - Create a new sub-task.
- `GET /api/subtasks/:subTaskId` - Get details of a specific sub-task.
- `PATCH /api/subtasks/:subTaskId` - Update a sub-task.
- `DELETE /api/subtasks/:subTaskId` - Delete a sub-task.
