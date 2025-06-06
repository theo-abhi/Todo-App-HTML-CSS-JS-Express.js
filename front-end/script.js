// Retrieve todo from local storage or initialize an empty array
let todoArray = [];

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
    todoArray = data;
    displayTasks();
  } catch (error) {
    console.error("Error fetching todo:", error);
  }
}

// Function to display the tasks in the todo list
function displayTasks() {
  todoList.innerHTML = "";
  todoArray.forEach((item) => {
    const p = document.createElement("p");
    p.innerHTML = `
      <div class="todo-container">
        <input type="checkbox" class="todo-checkbox" id="input-${item.id}" ${
      item.disabled ? "checked" : ""
    }>
        <p id="todo-${item.id}" class="${item.disabled ? "disabled" : ""}" >${
      item.text
    }</p>
    <div id="button-container">
        <button class="edit-button" onClick="editTask(${
          item.id
        })"><i class="fa-solid fa-edit"></i></button>
        <button class="delete-button" onClick="deleteTask(${
          item.id
        })"><i class="fa-solid fa-trash"></i></button> 
        </div>
      </div>
    `;
    p.querySelector(".todo-checkbox").addEventListener("change", () =>
      toggleTask(item.id)
    );
    todoList.appendChild(p);
  });
  todoCount.textContent = todoArray.length;
}

// function to add a new task
async function addTask() {
  const newTask = todoInput.value.trim();
  if (newTask !== "") {
    try {
      const response = await fetch("http://localhost:3000/todo/create", {
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
      todoArray.push(data);
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
function editTask(itemId) {
  const item = todoArray.find((item) => item.id === itemId);
  const todoItem = document.getElementById(`todo-${itemId}`);
  const existingText = item.text;
  const inputElement = document.createElement("input");
  inputElement.value = existingText;
  todoItem.replaceWith(inputElement);
  inputElement.focus();
  inputElement.addEventListener("keydown", async function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      const updatedText = inputElement.value.trim();
      if (updatedText) {
        item.text = updatedText;
        // inputElement.replaceWith(todoItem);
        try {
          const response = await fetch(
            `http://localhost:3000/todo/edit/${itemId}`,
            {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ text: item.text }),
            }
          );
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
    }
  });
}

// function to toggle the completion status of a specific task
async function toggleTask(itemId) {
  const item = todoArray.find((item) => item.id === itemId);
  if (item) {
    item.disabled = !item.disabled;
  }
  try {
    const response = await fetch(
      `http://localhost:3000/todo/toggle/${itemId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: item.text,
          disabled: item.disabled,
        }),
      }
    );
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
async function deleteTask(itemId) {
  try {
    const response = await fetch(`http://localhost:3000/todo/${itemId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    console.log(response.status);
    // find the item by id and remove it from the todo array
    todoArray = todoArray.filter((item) => item.id !== itemId);
    console.log(todoArray);
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
    todoArray = [];
    todoInput.value = "";
    displayTasks();
  } catch (error) {
    console.error("Error deleting all tasks", error);
  }
}
