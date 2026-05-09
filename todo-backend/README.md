# Bun Todo Backend

A simple REST API for managing todos, built with [Bun](https://bun.sh) and [Hono](https://hono.dev/). Uses SQLite for data storage.

## Features

- RESTful API for CRUD operations on todos
- SQLite database with automatic table creation
- CORS enabled for frontend integration
- Fast runtime with Bun

## API Endpoints

### GET /todos
Retrieve all todos.

**Response:**
```json
[
  {
    "id": 1,
    "content": "Buy groceries",
    "completed": false
  }
]
```

### POST /todos
Create a new todo.

**Request Body:**
```json
{
  "content": "Task description"
}
```

**Response:**
```json
{
  "id": 2,
  "content": "Task description",
  "completed": false
}
```

### PATCH /todos/:id
Toggle the completion status of a todo.

**Response:**
```json
{
  "success": true,
  "id": 1,
  "completed": true
}
```

### DELETE /todos/:id
Delete a todo by ID.

**Response:**
```json
{
  "success": true
}
```

## Installation

To install dependencies:

```bash
bun install
```

## Running the Server

To run:

```bash
bun run index.ts
```

The server will start on `http://localhost:3000`.

## Database

The application uses SQLite with a file named `todos.sqlite`. The database and table are created automatically on first run.

## Technologies

- [Bun](https://bun.sh) - JavaScript runtime
- [Hono](https://hono.dev/) - Web framework
- SQLite - Database
