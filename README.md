# Todo-App-HTML-CSS-JS-Express.js

A full-stack **To-Do List Application** using **HTML**, **CSS**, **JavaScript** for the frontend, and **Node.js** with **Express.js** for the backend. This app allows users to create, read, and delete tasks with server-side handling.

## ✅ Features

- **Add Tasks:** Input and save new tasks to the backend server.
- **Delete Tasks:** Remove tasks via API calls to the backend.
- **Fetch Tasks:** On load, fetches all saved tasks from the server.
- **Clean UI:** Intuitive and responsive interface using vanilla HTML, CSS, and JS.
- **Backend with Express.js:** RESTful APIs handle all task operations.
- **Modular Codebase:** Separate frontend and backend folders for clarity and scalability.

## 📁 Project Structure

Todo-App-HTML-CSS-JS-Express.js/
├── frontend/
│ ├── index.html
│ ├── style.css
│ └── script.js
│
├── backend/
│ ├── server.js
│ └── todo.js
│
└── README.md

## 🔌 How It Works

1. **Frontend**

   - The user interacts with the UI to add or delete tasks.
   - JavaScript sends requests to the backend using `fetch()`.

2. **Backend (Express.js)**
   - `server.js` handles incoming HTTP requests.
   - `todo.js` manages task logic/storage (e.g., in-memory or file/database).
   - Returns appropriate responses to the frontend.

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) installed on your machine

### Installation

1. Clone the Repository

```bash
git clone https://github.com/your-username/Todo-App-HTML-CSS-JS-Express.js.git
cd Todo-App-HTML-CSS-JS-Express.js
```

2. Set Up Backend

```bash
cd backend
npm install express nodemon
nodemon server.js
```

The server will typically run at: http://localhost:3000

3. Run Frontend

   Open frontend/index.html in your browser.
   (Ensure your backend is running so the frontend can connect to it.)

🌐 API Endpoints

- GET/todo - Retrieve all tasks
- POST/todo/create - Add a new task
- PATCH/todo/edit/:id - Edit a task text
- PATCH/todo/toggle/:id - Toggle a task active status
- DELETE/todo/:id - Delete a task
- DELETE/todo - Delete all tasks
