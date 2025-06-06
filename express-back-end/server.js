const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;

// import the todo router
let todo = require("./todo.js");

// Header : Specific origin
const corsOptions = {
  origin: "http://127.0.0.1:5500",
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  optionsSuccessStatus: 200, // For legacy browser compatibility
};
app.use(cors(corsOptions));

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("<h1>Welcome!</h1>");
});

// Use the todo router for all routes starting with /todos
app.use("/todo", todo);

app.listen(port, () => {
  console.log(`Todo app listening at http://localhost:${port}`);
});

module.exports = app;
