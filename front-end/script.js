// Retrieve todo from local storage or initialize an empty array
let todo = [];

const todoInput = document.getElementById("todoInput");
const todoList = document.getElementById("todoList");
const todoCount = document.getElementById("todoCount");
const addButton = document.querySelector(".add-button");
const deleteAllButton = document.getElementById("deleteAllButton");

// Initialize
document.addEventListener("DOMContentLoaded", function () {
  addButton.addEventListener("click", addTask);
  todoInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevents default Enter key behavior
      addTask();
    }
  });
  deleteAllButton.addEventListener("click", deleteAllTasks);
  fetchTodoList();
  displayTasks();
});

// Function to fetch the todo list from the server
async function fetchTodoList() {
  try {
    const response = await fetch("http://localhost:3000/todo");
    if (!response.ok) throw new Error("Network response was not ok");
    const data = await response.json();
    todo = data;
    displayTasks();
  } catch (error) {
    console.error("Error fetching todo:", error);
  }
}

// Function to display the tasks in the todo list
function displayTasks() {
  todoList.innerHTML = "";
  todo.forEach((item, index) => {
    const p = document.createElement("p");
    p.innerHTML = `
      <div class="todo-container">
        <input type="checkbox" class="todo-checkbox" id="input-${index}" ${
      item.disabled ? "checked" : ""
    }>
        <p id="todo-${index}" class="${item.disabled ? "disabled" : ""}" >${
      item.text
    }</p>
    <div id="button-container">
        <button class="edit-button" onClick="editTask(${index})"><i class="fa-solid fa-edit"></i></button>
        <button class="delete-button" onClick="deleteTask(${index})"><i class="fa-solid fa-trash"></i></button> 
        </div>
      </div>
    `;
    p.querySelector(".todo-checkbox").addEventListener("change", () =>
      toggleTask(index)
    );
    todoList.appendChild(p);
  });
  todoCount.textContent = todo.length;
}

// function to add a new task
async function addTask() {
  const newTask = todoInput.value.trim();
  if (newTask !== "") {
    try {
      const response = await fetch("http://localhost:3000/todo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: newTask,
          disabled: false,
        }),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log(data);
      todo.push(data);
      todoInput.value = "";
      displayTasks();
    } catch (error) {
      console.error("Error adding task:", error);
    }
  } else {
    alert("Please enter a task");
  }
}

// function to edit a specific task
function editTask(index) {
  const todoItem = document.getElementById(`todo-${index}`);
  const existingText = todo[index].text;
  const inputElement = document.createElement("input");
  inputElement.value = existingText;
  todoItem.replaceWith(inputElement);
  inputElement.focus();
  inputElement.addEventListener("keydown", async function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      const updatedText = inputElement.value.trim();
      if (updatedText) {
        todo[index].text = updatedText;
        // inputElement.replaceWith(todoItem);
        try {
          const response = await fetch(`http://localhost:3000/todo/${index}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(todo[index]),
          });
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          console.log(response.status);
          todoInput.value = "";
          displayTasks();
        } catch (error) {
          console.error("Error editing task:", error);
        }
      }
      displayTasks();
    }
  });
}

// function to toggle the completion status of a specific task
async function toggleTask(index) {
  todo[index].disabled = !todo[index].disabled;
  try {
    const response = await fetch(`http://localhost:3000/todo/${index}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todo[index]),
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    console.log(response.status);
    todoInput.value = "";
    displayTasks();
  } catch (error) {
    console.error("Error editing task:", error);
  }
}

// function to delete a specific task
async function deleteTask(index) {
  try {
    const response = await fetch(`http://localhost:3000/todo/${index}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    console.log(response.status);
    todo.splice(index, 1);
    todoInput.value = "";
    displayTasks();
  } catch (error) {
    console.error("Error deleting task:", error);
  }
}

// function to delete all tasks
async function deleteAllTasks() {
  try {
    const response = await fetch("http://localhost:3000/todo", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    console.log(response.status);
    todo = [];
    todoInput.value = "";
    displayTasks();
  } catch (error) {
    console.error("Error deleting all tasks", error);
  }
}
