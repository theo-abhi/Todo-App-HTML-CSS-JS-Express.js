let express = require("express");
let router = express.Router();

let todoList = [
  { text: "task 1", disabled: false },
  { text: "task 2", disabled: false },
  { text: "task 3", disabled: false },
  { text: "task 4", disabled: false },
  { text: "task 5", disabled: false },
  { text: "task 6", disabled: false },
];

// Get All Tasks
router.get("/", function (req, res) {
  res.json(todoList);
});

// Create a new task
router.post("/", function (req, res) {
  console.log(req.body);
  const { text, disabled } = req.body;
  const newTodoItem = { text, disabled };
  todoList.push(newTodoItem);
  res.status(201).json(newTodoItem);
});

// Toggle the completion status of a specific task
router.put("/:index", function (req, res) {
  const index = parseInt(req.params.index, 10); // Parse index to integer
  const { text, disabled } = req.body;
  const updatedTodoItem = { text, disabled };
  todoList[index] = updatedTodoItem;
  // console.log(todoList[index]);
  res.status(200).json(updatedTodoItem);
});

// Update a specific task text
router.patch("/:index", function (req, res) {
  const index = parseInt(req.params.index, 10); // Parse index to integer
  const { text } = req.body;
  todoList[index].text = text;
  res.status(200).json(todoList[index]);
});

// Delete a specific task
router.delete("/:index", function (req, res) {
  const index = parseInt(req.params.index, 10); // Parse index to integer
  todoList.splice(index, 1);
  res.status(200).send();
});

// Delete all tasks
router.delete("/", function (req, res) {
  todoList = [];
  res.status(200).send();
});

module.exports = router;
