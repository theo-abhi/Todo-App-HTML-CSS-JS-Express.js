let express = require("express");
let router = express.Router();

// todoList Array to simulate a database
// In a real application, you would use a database to store tasks
let todoList = [
  { id: 1, text: "task 1", disabled: false },
  { id: 2, text: "task 2", disabled: false },
  { id: 3, text: "task 3", disabled: false },
  { id: 4, text: "task 4", disabled: false },
  { id: 5, text: "task 5", disabled: false },
  { id: 6, text: "task 6", disabled: false },
];

// Get all tasks from the database
router.get("/", function (req, res) {
  res.json(todoList);
});

// Create a new task in the database
router.post("/create", function (req, res) {
  const { text, disabled } = req.body;
  const newTodoItem = { id: todoList.length + 1, text, disabled };
  todoList.push(newTodoItem);
  res.status(201).json(newTodoItem);
});

// Toggle the completion status of a specific task by Id
router.patch("/toggle/:id", function (req, res) {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) {
    return res.status(400).json({ error: "Invalid ID format" });
  }
  const item = todoList.find((item) => item.id === id);
  if (!item) {
    return res.status(404).json({ error: "Task not found" });
  }
  item.disabled = !item.disabled;
  res.status(200).json(item);
});

// Update a specific task text by Id
router.patch("/edit/:id", function (req, res) {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) {
    return res.status(400).json({ error: "Invalid ID format" });
  }
  const { text } = req.body;
  const todoItem = todoList.find((item) => item.id === id);
  if (!todoItem) {
    return res.status(404).json({ error: "Task not found" });
  }
  todoItem.text = text;
  res.status(200).json(todoItem);
});

// Delete a specific task from the database
router.delete("/:id", function (req, res) {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) {
    return res.status(400).json({ error: "Invalid ID format" });
  }
  const todoIndex = todoList.findIndex((item) => item.id === id);
  if (todoIndex === -1) {
    return res.status(404).json({ error: "Task not found" });
  }
  todoList.splice(todoIndex, 1);
  res.status(204).send();
});

// Delete all tasks in the database
router.delete("/", function (req, res) {
  todoList = [];
  res.status(200).send();
});

module.exports = router;
