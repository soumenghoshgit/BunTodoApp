import { Database } from "bun:sqlite";

// This creates a file named 'todos.sqlite' if it doesn't exist
const db = new Database("todos.sqlite");

// Initialize the table
db.run(`
  CREATE TABLE IF NOT EXISTS todos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    content TEXT NOT NULL,
    completed BOOLEAN DEFAULT 0
  )
`);

export default db;