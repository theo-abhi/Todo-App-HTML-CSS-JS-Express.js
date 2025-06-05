const express = require("express");
const cors = require("cors");
let todo = require("./todo.js");

const app = express();
const port = 3000;

// Header : Specific origin
const corsOptions = {
  origin: "http://127.0.0.1:5500", //Port: 5500 for live server
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  optionsSuccessStatus: 200, // For legacy browser compatibility
};
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("<h1>Welcome!</h1>");
});

app.use("/todo", todo);

app.listen(port, () => {
  console.log(`Todo-app listening at http://localhost:${port}`);
});

module.exports = app;
