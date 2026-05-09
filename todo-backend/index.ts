import { Hono } from "hono";
import db from "./db";
import { cors } from "hono/cors";

const app = new Hono();

app.use("/*", cors()); // Enable CORS for all routes

// GET all todos
app.get("/todos", (c) => {
  const todos = db.query("SELECT * FROM todos").all();
  return c.json(todos);
});

// POST a new todo
app.post("/todos", async (c) => {
  const { content } = await c.req.json();
  
  if (!content) return c.json({ error: "Content is required" }, 400);

  const query = db.prepare("INSERT INTO todos (content) VALUES (?) RETURNING *");
  const newTodo = query.get(content);
  
  return c.json(newTodo, 201);
});

// PATCH: Toggle a todo's completion status
app.patch("/todos/:id", (c) => {
  const id = c.req.param("id");

  // 1. First, find the current status
  const todo = db.query("SELECT completed FROM todos WHERE id = ?").get(id) as { completed: number } | null;

  if (!todo) {
    return c.json({ error: "Todo not found" }, 404);
  }

  // 2. Toggle the value (SQLite uses 0 for false, 1 for true)
  const newStatus = todo.completed === 1 ? 0 : 1;

  // 3. Execute the UPDATE
  db.run("UPDATE todos SET completed = ? WHERE id = ?", [newStatus, id]);

  return c.json({ success: true, id, completed: !!newStatus });
});

// DELETE a todo
app.delete("/todos/:id", (c) => {
  const id = c.req.param("id");
  db.run("DELETE FROM todos WHERE id = ?", [id]);
  return c.json({ message: `Deleted todo ${id}` });
});

export default {
  port: 3000,
  fetch: app.fetch,
};